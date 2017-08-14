function importWorkload(){
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=auditor/auditorcontent',function (result) {
        $('.right_hole').append(result);
    });
        $.get(itemAuditorUrl,function (data) {
          showimportall(data.data.importCategories);

        });
    function  showimportall(item) {
        for(var i=0;i<item.length;i++){

            $('#tab_content1').append("<li id='catInfo_"+item[i].categoryId+"'>"+item[i].name+":"+item[i].desc+"<table class='table table-striped table-bordered dataTable no-footer' style='float: right;width: 40%; '> <thead> <tr role='row'> <th class='sorting' style='padding: 5px;'>上传截止时间:<span class='time_"+item[i].categoryId+"'>"+getLocalTime(item[i].reviewDeadline)+"</span></th> <th class='sorting' style='padding: 5px;'><div class='dropdown' style='display: inline'><a class='btn btn-primary dropdown-toggle' data-toggle='dropdown' id='dropdownMenu2'>下载模板</a><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu2'><li><a href='"+downloadInfoUrl+"?categoryId="+item[i].categoryId+"&type=group'>小组类模板</a></li><a href='"+downloadInfoUrl+"?categoryId="+item[i].categoryId+"&type=single'>个人类模板</a></li></ul></div><a class='btn importList btn-info' id='import_"+item[i].categoryId+"' data-toggle='modal' data-target='#myModal'>导入数据</a></th> </table><div style='clear: both;'></div></li>");
            if(item[i].jsonParameters.length>0){
                var obj = eval ("(" + item[i].jsonParameters + ")");
                for(var paraCount=0;paraCount<obj.length;paraCount++){
                    $(".hiddendistrict").append("<div class='paraDesc_"+item[i].categoryId+"' id='"+item[i].categoryId+"_"+obj[paraCount].symbol+"'>"+obj[paraCount].desc+"</div>");

                }
            }
            var tablestr='<table class="showImportThead table dataTable no-footer table-bordered" id="showImportThead_'+item[i].categoryId+'" style="display: none;"> <thead> <tr role="row"> <th>序号</th><th>文件名称</th><th>上传时间</th><th>提交状态</th><th>操作</th> </tr> </thead> <tbody class="showImportDesc_'+item[i].categoryId+'"></tbody> </table>';
            $('#catInfo_' + item[i].categoryId).append(tablestr);
            if(item[i].children){
                showimportall(item[i].children);
            }
        }
    }

}
function auditworkload() {
    $('.right_hole').empty();

   $.get(pageManageUrl+"?"+'regionName=auditor/auditworkload',function (result) {
      $('.right_hole').append(result);
   });
       $.get(itemAuditorUrl,function (data) {
           var showimport=  $("<ul></ul>");
            showall(data.data.applyCategories, showimport);
            $("#tab_content1").append(showimport);

            $(document).on("click",".pass",function () {
                var flag=this.id;
                var passItemId=flag.match(/\d+/g);
                $.post(reviewerCheckUrl+"?"+"itemId="+passItemId+"&status=2",function () {
                    alert('操作成功！');
                    $("reviewe_"+passItemId).text("审核通过");

                })
            });
           $(document).on("click",".refuse",function () {
               var reflag=this.id;
               var refuItemId=reflag.match(/\d+/g);
               $(document).off("click","#refucommit");
               $(document).on("click","#refucommit",function () {
                   var refudesc=$("#refusedesc").val();
                   $.post(reviewerCheckUrl+"?"+"itemId="+refuItemId+"&status=5"+"&message="+refudesc,function () {
                       alert('操作成功！');
                       $(".reviewe_"+refuItemId).text("审核拒绝");
                       $("#refuseModal").modal("hide");
                   })
               });

           });
        });


}
function showimportRec() {

    $(".reviewerRec").show();
    $(".reviewerRecTbody").empty();
    $.get(itemTeacherInfo+"?"+"importedRequired=1&status=3",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList&&data.data.itemList.length){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.teacherName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(3)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(3)").attr("id","workload_"+Info.itemId);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.formula);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组形式";
                        break;
                    case 0:showtype="个人形式";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(5)").text(showtype);

                var praValues='';
                for(var m=0;m<Info.parameterValues.length;m++){
                    praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
                    $(".hiddendistrict").append("<div class='paraValues_"+Info.categoryId+"'>"+Info.parameterValues[m].value+"</div>")

                }
                var otherpraValue='';
                for(var n=0;n<Info.otherJsonParameters.length;n++){
                    otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                    $(".hiddendistrict").append("<div class='otherParaKey_"+Info.categoryId+"'>"+Info.otherJsonParameters[n].key+"</div><div class='otherParaValue_"+Info.categoryId+"'>"+Info.otherJsonParameters[n].value+"</div>")

                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(praValues);

                $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(9)").text($(".time_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(10)").text("提交存疑");
                var act="<a class='btn btn-primary reviewerApply' id='showImportRec_"+Info.itemId+"'>存疑原因</a><a class='btn btn-info editInfo "+Info.itemId+"' id='editInfo_"+Info.categoryId+"' data-target='#editModal' data-toggle='modal'><i class='fa fa-pencil'></i>修改存疑</a> ";
                $(".reviewerRecTbody tr:last td:eq(11)").append(act);
                $("[data-toggle='popover']").popover();
                $(".reviewerApply").popover({
                    placement: "top",
                    trigger: "click",
                    html: true,
                    title: "回复信息",
                    content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

                });
            }
        }
    });
    $(document).on("click",".editInfo",function () {
        $(".parameterTh").empty();
        $(".editorPram").empty();
        $(".otherParaTh").empty();
        $(".editorotherPara").empty();
        var realId=$(".editInfo").attr("class");
        var Realreg=parseInt(realId.match(/\d+/g));
       var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        for(var count=0;count<$(".paraDesc_"+reg).length;count++){
            var symbolId=$(".paraDesc_"+reg).eq(count).attr("id");
           // var Reg=/_\/([\s\S]*)/;
            var Reg=/_[a-zA-Z]*/;
           // /appVersion\/([\d\.]*)/
           // symbolId=Reg.exec(symbolId);
            symbolId=symbolId.match(Reg)[0];
            if (symbolId.substr(0,1)=='_'){
                symbolId=symbolId.substr(1);
            }

            $(".parameterTh").append("<th class='pramterDesc' id='"+symbolId+"'>"+$(".paraDesc_"+reg).eq(count).text()+"</th>")
           $(".editorPram").append("<td><input type='text' class='parameterName'></td>");
          //  console.log($(".paraValues_"+reg).eq(count).text());
            $(".parameterName").eq(count).val($(".paraValues_"+reg).eq(count).text());

        }
        for(var othercount=0;othercount<$(".otherParaKey_"+reg).length;othercount++){
            $(".otherParaTh").append("<th class='otherPramterkey'>"+$(".otherParaKey_"+reg).eq(othercount).text()+"</th>")
            $(".editorotherPara").append("<td><input type='text' class='otherparameterName'></td>");
            $(".otherparameterName").eq(othercount).val($(".otherParaValue_"+reg).eq(othercount).text());

        }
        $(".parameterName").attr("disabled","true");
        $(".otherparameterName").attr("disabled","true");
        $(".editorSubmit").attr("id","editorSubmit_"+Realreg);
    });
    $(document).on("click",".editApplyInfo",function () {
        $(".parameterName").removeAttr("disabled","true");
        $(".otherparameterName").removeAttr("disabled","true");
    });
    $(document).on("click",".editorSubmit",function () {
        var submitId=parseInt(this.id.match(/\d+/g));
        var newArray = new Array();
        for (var i = 0; i < $(".pramterDesc").length; i++) {
            var dom = $(".pramterDesc").eq(i).attr("id");
            newArray.push({symbol: dom, value:parseInt($(".parameterName").eq(i).val())});

        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();
        var otherPramterkey = $(".otherPramterkey");
        for (var j = 0; j < otherPramterkey.length; j++) {
            var otherKey=$(".otherPramterkey").eq(j);
            otherArray.push({key: otherKey.text(), value: $(".otherparameterName").eq(j).val()});

        }
        otherArray = JSON.stringify(otherArray);
        $.post(reviDoubleCheckUrl, {
            itemId:submitId,
            parameterValues:newArray,
            otherParameters:otherArray,
            message:$("#showitemName").val()
        },function () {
            showimportRec();
            alert("操作成功！");
            $("#editModal").modal("hide");
        })
    });
}
function showImportHis() {
    $.get(historyUrl+"?role=reviewer&type=import",function (data) {
        showhistory(data);
    });
}
function showReviewerHis() {
    $.get(historyUrl+"?role=reviewer&type=apply",function (data) {
        showhistory(data);
    });
}
function showapplydata(item) {

    var rowInfo = "<tr></tr>";
    var cellInfo = "<td></td>";
    var listLength = item.length;
    for (var t = 0; t < listLength; t++) {
        var Info = item[t];
        $(".showDesc").append(rowInfo);

        for (var j = 0; j < 12; j++)//单元格
        {
            $(".showDesc tr:last").append(cellInfo);
        }
        var id = t;
        $(".showDesc tr:last td:eq(0)").text(id + 1);
        $(".showDesc tr:last td:eq(1)").text(Info.itemName);
        $(".showDesc tr:last td:eq(2)").text(Info.applyDesc);
        var applyType='';
        switch (Info.isGroup){
            case 1:applyType="小组形式";
            break;
            case 0:applyType="个人申报";
            break;
        }
        $(".showDesc tr:last td:eq(3)").text(applyType);
        $(".showDesc tr:last td:eq(4)").text(Info.workload);
        $(".showDesc tr:last td:eq(5)").text();
        var paramArray = Info.parameterValues;
        var str = '';
        for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

            str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
        }
        $(".showDesc tr:last td:eq(6)").text(str);
        var otherparamArray = Info.otherJsonParameters;
        var otherstr = '';
        if(otherparamArray!=null){
            for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
            }
        }

        $(".showDesc tr:last td:eq(7)").text(otherstr);
        $(".showDesc tr:last td:eq(8)").text(Info.version);
        $(".showDesc tr:last td:eq(9)").text('2017-12-31');
        var statusName;
        switch (Info.status) {
            case -1:
                statusName = '删除状态';
                break;
            case 0:
                statusName = '未提交状态';
                break;
            case 1:
                statusName = '未审核';
                break;
            case 2:
                statusName = '确认通过';
                break;
            case 3:
                statusName = '存疑提交';
                break;
            case 4:
                statusName = '存疑已解决';
                break;
            case 5:
                statusName = '审核拒绝';
                break;
        }
        $(".showDesc tr:last td:eq(10)").text(statusName);
        $(".showDesc tr:last td:eq(10)").attr("id","reviewe_"+Info.itemId);

        var act = "<a class=\"btn btn-success pass\" id=\"pass_" + Info.itemId + "\">审核通过</a><a class=\"btn btn-danger refuse\" data-toggle=\"modal\" data-target=\"#refuseModal\" id=\"refuse_" + Info.itemId + "\">审核拒绝</a> ";
        $(".showDesc tr:last td:eq(11)").append(act);
    }

}
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
function showall(menu_list, parent) {
    for (var menu=0;menu<menu_list.length;menu++) {
        //如果有子节点，则遍历该子节点
        if (menu_list[menu].children&&menu_list[menu].children.length > 0) {
            var isShow=traverseNode(menu_list[menu],0);
            if(isShow==0) {
                var li = $("<li></li>");
                $(li).append(menu_list[menu].name).append("<ul></ul>").appendTo(parent);

            }
            showall(menu_list[menu].children, $(li).children().eq(0));
        }
        else if(menu_list[menu].importRequired==0){
            $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append(menu_list[menu].name+":"+menu_list[menu].desc+ "<button  id='auditor_" + menu_list[menu].categoryId + "' class='btn btn-primary auditor' data-toggle='modal' data-target='.bs-example-modal-lg' style='float: right;'>点击审核</button><div style='clear: both;'></div>").appendTo(parent);
        }

    }
}