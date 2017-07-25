/**
 * Created by SBWang on 2017/7/20.
 */
function importWorkload(){
    $('.right_col').empty();
    $.get("/region?"+'regionName=auditor/auditorcontent',function (result) {
        $('.right_col').append(result);
        $.get("/reviewer/info/categories",function (data) {
            var showimport=  $("<ul></ul>");
            showall(data.data.importCategories, showimport);
            $("#showRevitem").append(showimport);
            $('.view_detail').text('导入文件');


        });
    });


}
function importRec() {
    $('.right_col').empty();
    $.get("/region?"+'regionName=auditor/importRec',function (result) {
        $('.right_col').append(result);

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


}
function importQue() {
    $('.right_col').empty();
    $.get("/region?"+'regionName=auditor/importQue',function (result) {
        $('.right_col').append(result);

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

}
function auditworkload() {
    $('.right_col').empty();

   $.get("/region?"+'regionName=auditor/auditworkload',function (result) {
      $('.right_col').append(result);
       $.get("/reviewer/info/categories",function (data) {
           var showimport=  $("<ul></ul>");
            var categoriesId=new Array();

            showall(data.data.applyCategories, showimport);
            $("#showapplyitem").append(showimport);
            $.get("/reviewer/info/items?"+'importRequired=0',function (result) {
            var checkitem=showapplydata(result.nonCheckedItem);
            });


        });
        //item为json数据
        //parent为要组合成html的容器
        function showall(item, parent) {
            for (var menu in item) {

                //如果有子节点，则遍历该子节点
                if (item[menu].children) {
                    //创建一个子节点li
                    var li = $("<li class='itemlist' id='check_"+item[menu].categoryId+"'></li>");
                    if (item[menu].formula) {
                        if(item[menu].importRequired==0) {
                            $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);
                        }


                    }
                    //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                    else {
                        $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);
                    }
                    //将空白的ul作为下一个递归遍历的父亲节点传入
                    showall(item[menu].children, $(li).children().eq(0));
                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else {
                    if (item[menu].formula) {

                        if (item[menu].importRequired == 0) {
                            $("<li class='itemList' id='check_"+item[menu].categoryId+"'></li>").append(item[menu].name + item[menu].desc).appendTo(parent);
                        }

                    }

                }

            }
        }

    });

}
function sumItem() {
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


}

function showimportRec(item) {
    var abnormaldata;

    for (var i = 0; i < item.length; i++) {
        var statusName = '';
        var m=i+1;

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'<a href=\"#\" class=\"btn btn-primary btn-xs\" style=\"float: right;\"><i class=\"fa fa-folder\" id=\"showitem_' + i +'\"></i>查看详情</a></td><td></td><td id="time_'+i+'\" class=\"reviewerdeadline\" >2017-12-30</td><td>2017-12-30</td><td class="operation" style="width: 30%"><a type="button" class="download">下载</a><a class="update" type="button">更新</a><a class="commit" type="button">提交</a><a class="edit" type="button" id="edit_'+i+'\" data-toggle=\"modal\" data-target=\"#edittimeModal\" >修改复核时间</a></td></tr>';

    }
    return abnormaldata;
}
function showimportQue(item) {
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
}
function showapplydata(item) {
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
                statusName = '待审核';
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

        var tablestr='<table  class="table table-striped table-bordered dataTable no-footer" id="table_'+item[i].itemId+'"> <thead> <tr role="row"> <th  class="sorting" style="width: 50px;">序号</th> <th  class="sorting" style="width: 78px;">申报描述</th> <th class="sorting" style="width: 78px;">工作量</th> <th class="sorting" style="width: 360px;">负责人</th> <th class="sorting" style="width: 83px;">审核截止时间 </th> <th class="sorting"  style="width: 83px;">审核状态 </th> <th class="sorting"  style="width: 183px;">操作</th> </tr> </thead> <tbody>';
        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'<a href=\"#\" class=\"btn btn-primary btn-xs\" style=\"float: right;\"><i class=\"fa fa-folder\" id=\"showitem_' + i +'\"></i>查看详情</a></td><td>'+item[i].workload+'</td><td></td>'+item[i].groupManagerName+'</td><td>2017-12-31</td></td><td id=\"status_'+item[i].itemId+'\">'+statusName+'</td><td class=\"addbtn\" ><a class=\"btn btn-info btn-xs explain\" id=\"explain_'+item[i].itemId+'\"data-toggle=\"modal\" data-target=\"#\"><i class=\"fa fa-pencil\"></i> 拒绝</a><a class=\"btn btn-success btn-xs '+item[i].itemId+'\">确定</a></td>\"><i class=\"fa fa-pencil\"></i> 修改审核截止时间</a><a class=\"btn btn-success btn-xs '+item[i].itemId+'\">通过</a></td></tr>';

    }
    return abnormaldata;
}
function appendItem(data) {
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

}
