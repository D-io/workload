/**
 * Created by SBWang on 2017/7/20.
 */
function importWorkload(){
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=auditor/auditorcontent',function (result) {
        $('.right_hole').append(result);
    });
        $.get(itemAuditorUrl,function (data) {
            var showimport=  $("<ul></ul>");
            showimportall(data.data.importCategories, showimport);

            $("#tab_content1").append(showimport);
            /*
            $('.view_detail').text('导入文件');
            */
            function  showimportall(item) {
                for(var i=0;i<item.length;i++){

                        $('#tab_content1').append("<li id='catInfo_"+item[i].categoryId+"'>"+item[i].name+":"+item[i].desc+"<table  class='table table-striped table-bordered dataTable no-footer' style='float: right;width: 40%; '> <thead style='font-size: 14px;'> <tr role='row'> <th class='sorting' style='padding: 5px;'>上传截止时间:<span class='time_"+item[i].categoryId+"'>"+getLocalTime(item[i].reviewDeadline)+"</span></th> <th class='sorting' style='padding: 5px;'><div class='dropdown' style='display: inline'><a class='btn btn-primary dropdown-toggle' data-toggle='dropdown' id='dropdownMenu2'>下载模板</a><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu2'><li><a href='/file/template?categoryId="+item[i].categoryId+"&type=group'>小组类模板</a></li><a href='/file/template?categoryId="+item[i].categoryId+"&type=single'>个人类模板</a></li></ul></div><a class='btn importList btn-info' id='import_"+item[i].categoryId+"' data-toggle='modal' data-target='#myModal'>导入数据</a></th> </table><div style='clear: both;'></div></li>");
                     /* if(item[i].formula){

                          var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer" style="float: right;"> <thead style="font-size: 14px;"> <tr role="row"> ' +
                            '<th class="sorting" style="width: 78px;">上传截止时间:<span class="time_'+item[i].categoryId+'"></span></th> <th class="sorting" style="width: 278px;"><div class="dropdown" style="display: inline"><a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="dropdownMenu2">下载模板</a><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2"><li><a href="/file/template?categoryId='+item[i].categoryId+'&type=isGroup">小组类模板</a></li><a href="/file/template?categoryId='+item[i].categoryId+'&type=isGroup">个人类模板</a></li></ul></div><a class="btn btn-info import_'+item[i].categoryId+'"  data-toggle="modal" data-target="#importModal">导入数据</a></th> </table>';
                           $('#catInfo_' + item[i].categoryId).append(tablestr);


                     }*/
                    var tablestr='<table class="showImportThead table dataTable no-footer table-bordered" id="showImportThead_'+item[i].categoryId+'" style="display: none;"> <thead style="font-size: 14px;"> <tr role="row"> <th>序号</th><th>文件名称</th><th>上传时间</th><th>提交状态</th><th>操作</th> </tr> </thead> <tbody class="showImportDesc_'+item[i].categoryId+'"></tbody> </table>';
                    $('#catInfo_' + item[i].categoryId).append(tablestr);
                 /*   $(document).on("click",".import_"+item[i].categoryId,function () {
                        $(".modal-header").empty();
                        $(".modal-header").append(item[i].name);

                    });*/

                    if(item[i].children){
                        showimportall(item[i].children);
                    }
                }
            }

        });
    var myFlag='';
    $(document).on("click",".importList");
    $(document).on("click",".importList",function () {
        var flag = this.id;
        window.myFlag = parseInt(flag.match(/\d+/g));
        $("#file").empty();
    });
        $(document).off("click","#commit");
        $(document).on("click","#commit",function () {
            var data=new FormData;
            data.append("file",$("#file")[0].files[0]);
            $.ajax({
                url:fileInfoUrl+"?fileId=4",
                type:"POST",
                dataType:"JSON",
                data:data,
                contentType: false,
                processData: false,
                success:function (file) {

                    alert("上传成功！");
                    var creatTime=getLocalTime(file.data.fileInfo.createTime);
                    var statusname="";
                    switch(file.data.fileInfo.status){
                        case 0:statusname="未提交";
                            break;
                    }
                    $("#showImportThead_"+window.myFlag).show();
                    $(".showImportDesc_"+window.myFlag).append("<tr><td>1</td><td>"+file.data.fileInfo.path+"</td><td>"+creatTime+"</td><td class='submitstatus'>"+statusname+"</td><td><a>重传</a><a class='submitImport' id='submitImport_"+file.data.fileInfo.fileInfoId+"'>提交文件</a><a class='submitImportItem' id='submitImportItem_"+file.data.fileInfo.fileInfoId+"' data-toggle='modal' data-target='.bs-example-modal-lg'>提交</a></td></tr>");
                },
                error:function () {
                    alert("上传失败！");
                }
            });
            $("#myModal").modal("hide");

        });
        $(document).off("click",".submitImportItem");
        $(document).on("click",".submitImportItem",function () {
            var importList=this.id;
            var reg=parseInt(importList.match(/\d+/g));
            $(".showImportTable").show();
            $(".showImportbodyList").empty();
            $.post(fileTempUrl+"?categoryId="+window.myFlag+"&fileInfoId="+reg,function (data) {

                var rowInfo="<tr></tr>";
                var cellInfo="<td></td>";
                var analyseList= data.data.itemList;
                var listLength= data.data.itemList.length;
                for(var i=0;i<listLength;i++)
                {
                    var Info=analyseList[i];
                    $(".showImportbodyList").append(rowInfo);
                    //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                    for(var j=0;j<11;j++)//单元格
                    {
                        $(".showImportbodyList tr:last").append(cellInfo);
                    }
                    var id=i;
                    $(".showImportbodyList tr:last td:eq(0)").text(id+1);
                    $(".showImportbodyList tr:last td:eq(1)").text(Info.itemName);
                    $(".showImportbodyList tr:last td:eq(2)").text(Info.teacherName);
                    var praValues='';
                    for(var m=0;m<Info.parameterValues.length;m++){
                        praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
                    }
                    var otherpraValue='';
                    for(var n=0;n<Info.otherJsonParameters.length;n++){
                        otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                    }
                    $(".showImportbodyList tr:last td:eq(3)").text(praValues);

                    $(".showImportbodyList tr:last td:eq(4)").text(otherpraValue);
                    var showtype='';
                    switch (Info.isGroup){

                        case 1:showtype="小组形式";
                            break;
                        case 0:showtype="个人形式";
                            break;

                    }
                    $(".showImportbodyList tr:last td:eq(5)").text(showtype);

                    $(".showImportbodyList tr:last td:eq(6)").text(Info.jobDesc);
                    $(".showImportbodyList tr:last td:eq(7)").text(Info.jsonChildWeight);
                    $(".showImportbodyList tr:last td:eq(8)").text(Info.workload);
                    var statusName='';
                    switch (Info.status){
                        case 1:statusName="已提交";
                            break;
                        case 0:statusName="未提交";
                    }

                    $(".showImportbodyList tr:last td:eq(9)").text(statusName);
                    var act="<a class='btn btn-primary itemToImport' id='itemToImport_"+Info.itemId+"'>提交</a> ";
                    $(".showImportbodyList tr:last td:eq(10)").append(act);
                }
            })

        });
    $(document).off("click",".submitImport");
    $(document).on("click",".submitImport",function () {
        var importList=this.id;
        var reg=parseInt(importList.match(/\d+/g));
        $("#submitImport_"+reg).css("disabled","true");
        $.post(fileSubmitUrl+"?"+"fileInfoId="+reg,function () {
            alert("提交文件成功！");
            $(".submitstatus").text("已提交");
        });
        /* $(".showImportTable").show();
         $(".showImportbodyList").empty();
         $.post("/file/import-template?categoryId="+flagId+"&fileInfoId="+reg,function (data) {

         var rowInfo="<tr></tr>";
         var cellInfo="<td></td>";
         var analyseList= data.data.itemList;
         var listLength= data.data.itemList.length;
         for(var i=0;i<listLength;i++)
         {
         var Info=analyseList[i];
         $(".showImportbodyList").append(rowInfo);
         //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
         for(var j=0;j<10;j++)//单元格
         {
         $(".showImportbodyList tr:last").append(cellInfo);
         }
         var id=i;
         $(".showImportbodyList tr:last td:eq(0)").text(id+1);
         $(".showImportbodyList tr:last td:eq(1)").text(Info.itemName);
         $(".showImportbodyList tr:last td:eq(2)").text(Info.teacherName);
         var praValues='';
         for(var m=0;m<Info.parameterValues.length;m++){
         praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
         }
         var otherpraValue='';
         for(var n=0;n<Info.otherJsonParameters.length;otherpraValue++){
         otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
         }
         $(".showImportbodyList tr:last td:eq(3)").text(praValues);

         $(".showImportbodyList tr:last td:eq(4)").text(otherpraValue);
         var showtype='';
         switch (Info.isGroup){

         case 1:showtype="小组形式";
         break;
         case 0:showtype="个人形式";
         break;

         }
         $(".showImportbodyList tr:last td:eq(5)").text(showtype);

         $(".showImportbodyList tr:last td:eq(6)").text(Info.jobDesc);
         $(".showImportbodyList tr:last td:eq(7)").text(Info.jsonChildWeight);
         $(".showImportbodyList tr:last td:eq(8)").text(Info.workload);
         var statusName='';
         switch (Info.status){
         case 1:statusName="已提交";
         break;
         case 0:statusName="未提交";
         }

         $(".showImportbodyList tr:last td:eq(9)").text(statusName);
         var act="<a class='btn btn-primary' class='itemToImport' id='itemToImport_"+Info.itemId+"'>提交</a> ";
         $(".showImportbodyList tr:last td:eq(10)").append(act);
         }
         })
         */    });

$(document).off("click","itemToImport");
$(document).on("click",".itemToImport",function () {
   var flag=this.id;
   var flagId=parseInt(flag.match(/\d+/g));
   $.post(itemSubmitUrl+"?itemId="+flagId,function () {
       alert("提交成功！");

       $("#itemToImport_"+flagId).css("disabled","true");
   })
});

}
/*function importRec() {
    $('#tab_content2').empty();
    $.get("/region?"+'regionName=auditor/importRec',function (result) {
        $('#tab_content2').append(result);

    });
    $.get("/reviewer/info/items?"+'importRequired=1&option=uncommitted',function (data) {
        var importRec=showimportRec(data.data.unCommittedItem);
        $('.unconmmitItem').append(importRec);
        $('.edit').click(function () {
            for(var i=0;i<data.data.unCommittedItem.length;i++)
            if(this.id='edit_'+i){
                var revDeadline=$('#time_'+i).text();
            $('.oldreviewertime').text(revDeadline);
            }
        });

        

    });


}*/
/*function importQue() {
    $('#tab_content3').empty();
    $.get("/region?"+'regionName=auditor/importQue',function (result) {
        $('#tab_content3').append(result);

    });
    $.get("/reviewer/info/items?importRequired=1",function (data) {
        var importQue=showimportQue(data.data.doubtedItem);
        $('.doubtedItem').append(importQue);
        $('.queReason').click(function () {
            for(var n=0;n<data.data.doubtedItem.length;n++) {
                if (this.id == 'queReason' +n){
                    $('.madal-body').expend(data.data.doubtedItem[n].applyDesc);
                }
                    }
        });
        $('.editworkval').click(function () {

            for(var t=0;t<data.data.doubtedItem.length;t++) {

                if (this.id == 'editworkval_' +t){
                    var workload=$('#workload_'+t).text();
                    $('.oldworkload').text(workload);

                }
            }

        });
    });

}*/
function auditworkload() {
    $('.right_hole').empty();

   $.get(pageManageUrl+"?"+'regionName=auditor/auditworkload',function (result) {
      $('.right_hole').append(result);
   });
       $.get(itemAuditorUrl,function (data) {
           var showimport=  $("<ul></ul>");
            showall(data.data.applyCategories, showimport);
            $("#tab_content1").append(showimport);
            $(document).on("click",".auditor",function () {
                $(".showThead").show();
                var flag=this.id;
                var reg=parseInt(flag.match(/\d+/g));
                $(".modal-header").text($(".item_"+reg).text());
                $.get(auditorManageItemUrl+"?"+'importRequired=0',function (data) {
                    $(".showDesc").empty();
                    var dataArray=new Array;
                    for(var applyItemCount=0;applyItemCount<data.data.nonCheckedItem.length;applyItemCount++){
                       /* var tablestr='<table  class="table table-striped table-bordered dataTable no-footer" id="table_'+data.data.applyCategories[applyItemCount].categoryId+'"> <thead> <tr role="row"> <th  class="sorting" style="width: 60px;">序号</th> <th  class="sorting" style="width: 278px;">条目名称</th> ' +
                            '<th class="sorting" style="width: 78px;">工作量</th> <th class="sorting" style="width: 160px;">申报描述</th><th class="sorting" style="width: 200px;">主要参数</th> <th class="sorting" style="width: 93px;">' +
                            '审核截止时间 </th> <th class="sorting"  style="width: 83px;">审核状态 </th> <th class="sorting"  style="width: 183px;">操作</th> </tr> </thead> <tbody class="tbody_'+data.data.applyCategories[applyItemCount].categoryId+'"></tbody></table>';
                        $('#check_'+data.data.applyCategories[applyItemCount].categoryId).append(tablestr);
                  */
                       if(data.data.nonCheckedItem[applyItemCount].categoryId==reg){
                           dataArray.push(data.data.nonCheckedItem[applyItemCount]);
                       }
                    };
                    showapplydata(dataArray);
                });
            });

            $(document).on("click",".pass",function () {
                var flag=this.id;
                var passItemId=flag.match(/\d+/g);
                $.post(reviewerCheckUrl+"?"+"itemId="+passItemId+"&status=2",function () {
                    alert('操作成功！');
                    $("reviewe_"+refuItemId).text("审核通过");
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
                       $("reviewe_"+refuItemId).text("审核拒绝");
                   })
               });

           });
        });
        //item为json数据
        //parent为要组合成html的容器
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
}
/*function sumItem() {
    $('.right_col').empty();
    $.get("/region?"+'regionName=auditor/workloadsum',function (result) {
        $('.right_col').append(result);
        $.get("reviewer/info/items-all?"+"isGroup=0&pageNum=1&pageSize=10",function (data) {
            appendItem(data);
            $('.totalWorkload').text(data.data.totalWorkload);
        });
    });
    $(document).ready(function () {
       $.get("/common/teachers",function (data) {
           for(var i=0;i<data.data.teacherList.length;i++){
               $('#teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
           }
       });

    });
    $(document).ready(function () {
        $.get("/reviewer/info/categories",function (data) {
            for(var i=0;i<data.data.categoryList.length;i++){
                $('#itemRequired').append('<option value=\"'+data.data.categoryList[i].categoryId+'\">'+data.data.categoryList[i].categoryName+'</option>');
            }
        });

    });
    $(document).on("click","#sumItemSearch",function () {
        var option0=$("#isgroup option:selected");
        var option1=$("#itemRequired option:selected");
        var option2=$("#teacherName option:selected");
        var option3=$("#datatable_length option:selected");

        $.get("/reviewer/info/items-all?"+"categoryId="+option1.val()+"&isGroup="+option0.val()+"&ownerId="+option2.val()+"&pageNum=1&pageSize="+option3.val(),function (data) {
            $(".sumItemSort").empty();
            appendItem(data);
            $('.totalWorkload').text(data.data.totalWorkload);
        });
    });
    $(document).on("click","#authior_output",function () {
        var option0 = $("#isgroup option:selected");
        var option1 = $("#itemRequired option:selected");
        var option2 = $("#teacherName option:selected");
        get("/reviewer/info/items-all", {categoryId: option1.val() ,
        isGroup: option0.val() ,
        ownerId:option2.val() ,
        isExport:yes},
        function(){
            });
    });


}*/

function showimportRec() {
 /*   var abnormaldata;

    for (var i = 0; i < item.length; i++) {
        var statusName = '';
        var m=i+1;

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'</td><td></td><td id="time_'+i+'\" class=\"reviewerdeadline\" >2017-12-30</td><td>2017-12-30</td><td class="operation" style="width: 30%"><button class="btn btn-success commit" type="button">提交</button><button class="btn btn-info edit" type="button" id="edit_'+i+'\" data-toggle=\"modal\" data-target=\"#edittimeModal\" >修改复核时间</button></td></tr>';

    }
    return abnormaldata;*/
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
                for(var j=0;j<11;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);
                $(".reviewerRecTbody tr:last td:eq(3)").text();
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组形式";
                        break;
                    case 0:showtype="个人形式";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(4)").text(showtype);

                var praValues='';
                for(var m=0;m<Info.parameterValues.length;m++){
                    praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
                }
                var otherpraValue='';
                for(var n=0;n<Info.otherJsonParameters.length;n++){
                    otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                }
                $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);

                $(".reviewerRecTbody tr:last td:eq(6)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(7)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(8)").text();
                $(".reviewerRecTbody tr:last td:eq(9)").text("提交存疑");
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                var act="<a class='btn btn-primary showImportRec' id='showImportRec_"+Info.itemId+"'>存疑原因</a><a class='btn btn-info editInfo' id='editInfo_"+Info.itemId+"' data-target='#editModal' data-toggle='modal'><i class='fa fa-pencil'></i>修改存疑</a> ";
                $(".reviewerRecTbody tr:last td:eq(10)").append(act);
            }
        }

    });
    $(document).on("click",".editInfo",function () {

        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));

        $(".oldworkload").text($("#workload_"+reg).text());

        $(document).on("click","#save",function () {
            var str=parseInt($(".newworkload").val());
            $.get(reviewerModifyUrl+"?"+"itemId="+reg+"&workload="+str,function () {
                alert("修改成功！");
                $("#editModal").modal("hide");
                $(".oldworkload").text(str);
            });
        })

    });

}
/*function showimportQue(item) {
    var abnormaldata;

    for (var i = 0; i < item.length; i++) {
        var statusName = '';
        var m=i+1;
        switch (item[i].status) {
            case -1:
                statusName = '删除状态';
                break;
            case 0:
                statusName = '未提交状态';
                break;
            case 1:
                statusName = '待复核';
                break;
            case 2:
                statusName = '通过';
                break;
            case 3:
                statusName = '存疑状态';
                break;
            case 4:
                statusName = '存疑已解决';
                break;
            case 5:
                statusName = '拒绝';
                break;

        };
        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'<a href=\"#\" class=\"btn btn-primary btn-xs\" style=\"float: right;\"><i class=\"fa fa-folder\" id=\"showitem_' + i +'\"></i>查看详情</a></td><td>'+item[i].teacherName+'</td><td id=\"workload_'+i+'\">'+item[i].workload+'</td><td></td><td>'+statusName+'</td><td style="width: 30%"><a  class=\"btn btn-primary btn-xs queReason\" id="queReason_'+i+'\" data-toggle=\"modal\" data-target=\"#queReasonModal\"><i class=\"fa fa-folder\"></i>存疑理由</a><a class=\"btn btn-info btn-xs editworkval\" id="editworkval_'+i+'\" data-toggle=\"modal\" data-target=\"#editModal\"><i class=\"fa fa-pencil\"></i> 修改</a><a class=\"btn btn-success btn-xs \" id=\"commit_'+item[i].itemId+'\">提交</a></td></tr>';


    }
    return abnormaldata;
}*/
function showapplydata(item) {
/*
    var listLength= item.length;
    for(var i=0;i<listLength;i++) {
        var category = new Array();
        category.push(item[i].categoryId);
    }
        Array.prototype.distinct = function(){
            var self = this;
            var _a = this.concat().sort();
            _a.sort(function(a,b){
                if(a == b){
                    var n = self.indexOf(a);
                    self.splice(n,1);
                }
            });
            return self;
        };
        category.distinct();

        for(var index=0;index<category.length;index++){
            for(var catCount=0;catCount<listLength;catCount++){
                if(category[index]==item[catCount].categoryId){
                    var rowInfo="<tr></tr>";
                    var cellInfo="<td></td>";
                    var Info=item[catCount];
                    $(".tbody_"+category[index]).append(rowInfo);
                    for(var j=0;j<8;j++)//单元格
                    {
                        $(".tbody_"+category[index]+' tr:last').append(cellInfo);
                       // console.log( ".tbody_"+category[index]+'tr:last');
                    }
                    var id=catCount;

                    $(".tbody_"+category[index]+" tr:last td:eq(0)").text(id+1);
                    $(".tbody_"+category[index]+" tr:last td:eq(1)").text(Info.itemName);
                    $(".tbody_"+category[index]+" tr:last td:eq(2)").text(Info.workload);
                    $(".tbody_"+category[index]+" tr:last td:eq(3)").text(Info.applyDesc);
                    var paramArray=Info.parameterValues;
                    var str='';
                    for(var paramCount=0;paramCount<paramArray.length;paramCount++){

                        str+=paramArray[paramCount].symbol+':'+paramArray[paramCount].value;
                    }
                    $(".tbody_"+category[index]+" tr:last td:eq(4)").text(str);
                    $(".tbody_"+category[index]+" tr:last td:eq(5)").text('2017-12-31');
                    var statusName;
                    switch (Info.status) {
                        case -1:
                            statusName = '删除状态';
                            break;
                        case 0:
                            statusName = '未提交状态';
                            break;
                        case 1:
                            statusName = '待审核';
                            break;
                        case 2:
                            statusName = '审核通过';
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
                    $(".tbody_"+category[index]+" tr:last td:eq(6)").text(statusName);
                    var act="<a class=\"btn btn-success pass\" id=\"pass_'"+Info.itemId+"'\">通过</a><a class=\"btn btn-danger refuse\" data-toggle=\"modal\" data-target=\"#refuseModal\" id=\"refuse_"+Info.itemId+"\">拒绝</a>";
                    $(".tbody_"+category[index]+" tr:last td:eq(7)").append(act);
                }
            }
        }*/
    var rowInfo = "<tr></tr>";
    var cellInfo = "<td></td>";
   // var analyseList = data.data.itemList;
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
/*function appendItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    var analyseList= data.data.itemDtoList;
    var listLength= data.data.itemDtoList.length;
    for(var i=0;i<listLength;i++)
    {
        var Info=analyseList[i];
        $(".sumItemSort").append(rowInfo);
        $(".sumItemSort tr:last").attr("id",Info.itemId);
        for(var j=0;j<6;j++)//单元格
        {
            $(".sumItemSort tr:last").append(cellInfo);
        }
        var id=i;
        $(".sumItemSort tr:last td:eq(0)").text(id+1);
        $(".sumItemSort tr:last td:eq(1)").text(Info.teacherName);
        $(".sumItemSort tr:last td:eq(2)").text(Info.itemName);
        $(".sumItemSort tr:last td:eq(3)").text(Info.workload);

        $(".sumItemSort tr:last td:eq(4)").text();
        var act="<a href=\"#\" class=\"pass\"style=\"color: blue; \" type=\"button\">查看详情</a> ";
        $(".sumItemSort tr:last td:eq(5)").append(act);
    }

}*/
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
