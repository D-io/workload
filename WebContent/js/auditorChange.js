function importWorkload(){
    $.ajaxSetup({
        async : false
    });
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=auditor/auditorcontent',{test : 12},function (result) {
        $('.right_hole').append(result);
        $(".hiddendistrict").empty();
    });
        $.get(itemAuditorUrl,{test : 12},function (data) {
          var parent = $("<ul></ul>");
          showimportall(data.data.importCategories,parent);
          $("#tab_content1").append(parent);

          function  showimportall(item,parent) {
                for(var i=0;i<item.length;i++){

                    //如果有子节点，则遍历该子节点
                    if (item[i].children!=null&&item[i].children.length >0) {
                        var isShow = traverseNode(item[i], 1);
                        if (isShow == 1) {
                            var li = $("<li></li>");
                            $(li).append( item[i].name ).append("<ul></ul>").appendTo(parent);

                        }
                        showimportall(item[i].children, $(li).children().eq(0));
                    }

                    else if(item[i].importRequired==1){
                        $("<li class='catInfo_"+item[i].categoryId+"'></li>").append( "<div class='itemMessage'><span class='itemName'>" + item[i].name + "</span>&nbsp;-&nbsp;<span class='itemDesc'>" + item[i].desc + "</span></div>" +
                            "<div style='float: right;'><a class='btn importList btn-info' id='import_"+ item[i].categoryId + "' data-toggle='modal' data-target='#importNewModal' style='float: right; margin-top: 2px;'>点击导入</a>" +
                            "<div class='dropdown' style='float: right; margin-top: 2px; margin-right: 10px;'><a class='btn btn-primary dropdown-toggle' data-toggle='dropdown' id='dropdownMenu2'>下载模板</a><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu2'><li><a href='" + downloadInfoUrl+ "?categoryId=" + item[i].categoryId+"&type=group'>小组类模板</a></li><li><a href='"+downloadInfoUrl+"?categoryId="+item[i].categoryId+"&type=single'>个人类模板</a></li></ul></div>" +
                            "<p class='deadline' style='margin-right: 20px'> 上传截止时间: <span class='time_"+item[i].categoryId+"'>"+item[i].reviewDeadline +
                            "</span></p></div><div style='clear: both;'></div></li>").appendTo(parent);
                        if(item[i].formulaParameterList!=null&&item[i].formulaParameterList.length>0){
                            //    var obj = eval ("(" + item[i].jsonParameters + ")");
                            var obj=item[i].formulaParameterList;
                            for(var paraCount=0;paraCount<obj.length;paraCount++){
                                $(".hiddendistrict").append("<div class='importParaDesc paraDesc_"+item[i].categoryId+"' id='"+item[i].categoryId+"_"+obj[paraCount].symbol+"'>"+obj[paraCount].desc+"</div>");

                            }
                        }
                        if(item[i].otherJsonParameters!=null&&item[i].otherJsonParameters.length>0){
                            //  var otherobj = eval ("(" + item[i].jsonParameters + ")");

                            var otherobj=item[i].otherJsonParameters;

                            for(var otherCount=0;otherCount<otherobj.length;otherCount++){
                                $(".hiddendistrict").append("<div class='importParaDesc otherparaDesc_"+item[i].categoryId+"'>"+otherobj[otherCount].key+"</div>");

                            }
                        }
                    }


                    // $('#tab_content1').append("<li id='catInfo_"+item[i].categoryId+"'>"+item[i].name+":"+item[i].desc+
                    //     "<div style='float: right; margin-top: 6px;'><a class='btn importList btn-info' id='import_"+ item[i].categoryId + "' data-toggle='modal' data-target='#importNewModal' style='float: right; margin-top: 6px;'>点击导入</a>" +
                    //     "<div class='dropdown' style='float: right; margin-top: 6px;'><a class='btn btn-primary dropdown-toggle' data-toggle='dropdown' id='dropdownMenu2'>下载模板</a><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu2'><li><a href='" + downloadInfoUrl+ "?categoryId=" + item[i].categoryId+"&type=group'>小组类模板</a></li><li><a href='"+downloadInfoUrl+"?categoryId="+item[i].categoryId+"&type=single'>个人类模板</a></li></ul></div>" +
                    //     "<p class='deadline'> 上传截止时间: <span class='time_"+item[i].categoryId+"'>"+item[i].reviewDeadline +
                    //     "</span></p></div><div style='clear: both;'></div></li>");


                    /*     var tablestr='<table class="showImportThead table dataTable no-footer table-bordered" id="showImportThead_'+item[i].categoryId+'" style="display: none;"> <thead> <tr role="row"> <th>序号</th><th>文件名称</th><th>上传时间</th><th>提交状态</th><th>操作</th> </tr> </thead> <tbody class="showImportDesc_'+item[i].categoryId+'"></tbody> </table>';
                         $('#catInfo_' + item[i].categoryId).append(tablestr);*/
                    if(item[i].children){
                        showimportall(item[i].children);
                    }
                }
            }
        });
        $.get(TeacherInfoUrl,{test : 12},function (data) {
        teacherInfo=data.data.teacherList;
        var selectdata=new Array();
        for(var i=0;i<teacherInfo.length;i++){
            $('#itemMember').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');
            $('#itemmanager').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');

        }
    });
        $("#itemMember").select2({
            placeholder:"",
            allowClear: true,
            width:"100%",
    });
        $("#itemmanager").select2({
            placeholder:"",
            allowClear: true,
            width:"100%",
    });



}
function auditworkload() {
    $.ajaxSetup({
        async : false
    });
    $('.right_hole').empty();

   $.get(pageManageUrl+"?"+'regionName=auditor/auditworkload',{test : 12},function (result) {
      $('.right_hole').append(result);
   });
       $.get(workloadAuditUrl,{test : 12},function (data) {
           var showimport=  $("<ul></ul>");
            showall(data.data.applyCategories, showimport);
            $("#tab_content1").append(showimport);
           $(document).off("click",".pass");
            $(document).on("click",".pass",function () {
                var flag=this.id;
                var passItemId=flag.match(/\d+/g);
                $.post(reviewerCheckUrl+"?"+"itemId="+passItemId+"&status=2",function () {
                    alert('操作成功！');
                    $("#reviewe_"+passItemId).text("审核通过");
                    $("#pass_"+passItemId).attr("disabled","disabled");
                    $("#refuse_"+passItemId).attr("disabled","disabled");
                })
            });
            $(document).off("click",".refuse");
           $(document).on("click",".refuse",function () {
               var reflag=this.id;
               var refuItemId=reflag.match(/\d+/g);
               $("#refusedesc").val(null);
               $(document).off("click","#refucommit");
               $(document).on("click","#refucommit",function () {
                   var refudesc=$("#refusedesc").val();
                   $.post(reviewerCheckUrl+"?"+"itemId="+refuItemId+"&status=5"+"&message="+refudesc,function () {
                       alert('操作成功！');
                       $("#reviewe_"+refuItemId).text("审核拒绝");
                       $("#pass_"+refuItemId).attr("disabled","disabled");
                       $("#refuse_"+refuItemId).attr("disabled","disabled");
                       $("#refuseModal").modal("hide");
                   })
               });

           });
        });


}
function showimportRec() {

    $(".reviewerRec").show();
    $(".reviewerRecTbody").empty();
    /*$.get(itemTeacherInfo+"?"+"importedRequired=1&status=3",function (data) {
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
    });*/
    var doubtedItem='';
    var doubleChecked='';

    $.get(auditorManageItemUrl+"?"+"importRequired=1",function (data) {
        doubtedItem=data.data.doubtedItem;
        doubleChecked=data.data.doubtedCheckedItem;
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        var Count_double=0;
        if(doubleChecked&&doubleChecked.length){
            var analyseList= doubleChecked;
            var listLength= doubleChecked.length;
            for(var i=0;i<listLength;i++)
            {
                Count_double++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                $(".reviewerRecTbody tr:last td:eq(0)").text( Count_double);
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
        if(doubtedItem&&doubtedItem.length){
            var analyseList= doubtedItem;
            var listLength= doubtedItem.length;
            for(var i=0;i<listLength;i++)
            {
                Count_double++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                $(".reviewerRecTbody tr:last td:eq(0)").text( Count_double);
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
                $(".reviewerRecTbody tr:last td:eq(10)").text("存疑解决");
                $(".reviewerRecTbody tr:last td:eq(11)").text();

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

        for (var j = 0; j < 9; j++)//单元格
        {
            $(".showDesc tr:last").append(cellInfo);
        }
        var id = t;
        $(".showDesc tr:last").css("text-align","center");
        $(".showDesc tr:last td:eq(0)").text(id + 1);
        $(".showDesc tr:last td:eq(1)").text(Info.teacherName);
        $(".showDesc tr:last td:eq(2)").text(Info.itemName);
        $(".showDesc tr:last td:eq(3)").text(Info.jsonChildWeight);

        /* 申报描述 */
        // $(".showDesc tr:last td:eq(4)").text(Info.applyDesc);

        var applyType='';
        switch (Info.isGroup){
            case 1:applyType="小组形式";
            break;
            case 0:applyType="个人申报";
            break;
        }
        $(".showDesc tr:last td:eq(4)").text(applyType);    //申报形式

        $(".showDesc tr:last td:eq(5)").text(Info.workload);    //工作当量

        /* 计算公式*/
        //$(".showDesc tr:last td:eq(7)").text(Info.formula);

        /* 主要参数 */
        // var paramArray = Info.parameterValues;
        // var str = '';
        // for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {
        //
        //     str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
        // }
        // $(".showDesc tr:last td:eq(8)").text(str);


        /* 其他参数 */
        // var otherparamArray = Info.otherJsonParameters;
        // var otherstr = '';
        // if(otherparamArray!=null){
        //     for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
        //         otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
        //     }
        // }
        //$(".showDesc tr:last td:eq(9)").text(otherstr);

        /* 版本 */
        //$(".showDesc tr:last td:eq(10)").text(Info.version);

       /* $(".showDesc tr:last td:eq(11)").text($(".checkDeadT_"+Info.categoryId).text());*/
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
        $(".showDesc tr:last td:eq(6)").text(statusName);
        $(".showDesc tr:last td:eq(6)").attr("id","reviewe_"+Info.itemId);

        var act = "<a class='btn btn-primary showContent' data-toggle='modal' data-target='#viewdetail_audit' id='btn-viewdetail'>查看详情</a><a class='btn btn-success pass' id='pass_" + Info.itemId + "'>审核通过</a><a class='btn btn-danger refuse' data-toggle='modal' data-target='#refuseModal' id='refuse_" + Info.itemId + "'>审核拒绝</a> ";
        $(".showDesc tr:last td:eq(7)").append(act);

        $(".showDesc tr:last td:eq(8)").text(JSON.stringify(Info));
        $(".showDesc tr:last td:eq(8)").css("display","none");
        // console.log($(".showDesc tr:last td:eq(8)").text());

    }

    $(document).on("click","#btn-viewdetail",function (){
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        $("#viewdetail_audit .project").empty();
        $("#viewdetail_audit .message").empty();
        $("#viewdetail_audit tbody").empty();

        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);

        var auditStatus = $(this).parent().prev().text();
        var applicant = $(this).parent().parent().find("tr:eq(1)").text();
        var weight = $(this).parent().parent().find("tr:eq(3)").text();
        var form = $(this).parent().prev().prev().prev().text();

        $("#viewdetail_audit .project").append( "<span class='itemName'>" + jsonInfo.itemName +"</span>" );
        $("#viewdetail_audit .message").append(
            "工作当量：" + jsonInfo.workload +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报人：" + applicant +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所占权重：" + weight +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核状态：" + auditStatus);

        $(".viewDetailTbody").append(rowInfo);
        for( var i=0; i<4; i++){
            $(".viewDetailTbody tr:last").append(cellInfo);
        }
        $(".viewDetailTbody tr:last").css("text-align","center");
        /* 计算公式 */
        $(".viewDetailTbody tr:last td:eq(0)").text(jsonInfo.formula);

        /* 计算参数 */
        var praValues='';
        for( var m = 0; m < jsonInfo.parameterValues.length; m++ ){
            praValues = jsonInfo.paramDesc[m].desc + "：" + jsonInfo.parameterValues[m].value;
            $(".viewDetailTbody tr:last td:eq(1)").append( praValues + "<br>");
        }

        /* 项目属性 */
        var projectProperties='';
        if( jsonInfo.otherJsonParameters && jsonInfo.otherJsonParameters.length ){
            for( var n = 0; n < jsonInfo.otherJsonParameters.length; n++ ){
                projectProperties = jsonInfo.otherJsonParameters[n].key + ":" + jsonInfo.otherJsonParameters[n].value;
                $(".viewDetailTbody tr:last td:eq(2)").append( projectProperties + "<br>");
            }
        }

        $(".viewDetailTbody tr:last td:eq(1)").css("line-height","28px");
        $(".viewDetailTbody tr:last td:eq(2)").css("line-height","28px");

        $(".viewDetailTbody tr:last td:eq(3)").text(jsonInfo.version);      //版本
    });
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
            $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append( "<p class='itemMessage'><span class='itemName'>" + menu_list[menu].name + "</span>&nbsp;-&nbsp;<span class='itemDesc'>" + menu_list[menu].desc + "</span></p>" +
                "<p class='deadline'> 审核截止时间:<span class='time_" + menu_list[menu].categoryId + "'>" + menu_list[menu].reviewDeadline + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<button  id='auditor_" + menu_list[menu].categoryId + "' class='btn btn-primary auditor' data-toggle='modal' data-target='.bs-example-modal-lg' style='float: right;'>点击审核</button></p><div style='clear: both;'></div>").appendTo(parent);
      /* $(".hiddendistrict").append("<span class='checkDeadT_"+menu_list[menu].categoryId+"' style='display: none;'>"+getLocalTime(menu_list[menu].reviewDeadline)+"</span>");
  */      }

    }
}