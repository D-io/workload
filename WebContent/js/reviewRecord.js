/**
 * Created by SBWang on 2017/7/16.
 */
function workRevie(){
    $('.right_col').empty();
    $.get("/region?"+'regionName=applicant/reviewercontent',function (result) {
        $('.right_col').append(result);

    });
    $.get("/category/info/list", function (data) {
        var showlist = $("<ul></ul>");
        showimportall(data.data.categoryTree, showlist);
        $(".x_content").append(showlist);


        //item为json数据
        //parent为要组合成html的容器
        function showimportall(item, parent) {
            for (var menu in item) {

                //如果有子节点，则遍历该子节点
                if (item[menu].children.length > 0) {
                    //创建一个子节点li
                    var li = $("<li class='"+item[menu].categoryId+"'></li>");
                    if (item[menu].formula) {
                        if(item[menu].importRequired==1) {
                            $(li).append(item[menu].name + item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + "' class='btn btn-primary view_detail' data-toggle='modal' data-target='#myModal' onclick='showitemgroup(this)'>查看明细</button></div>").append("<ul></ul>").appendTo(parent);
                        }
                        else
                            $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);


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

                        if (item[menu].importRequired == 1) {
                            $("<li class='"+item[menu].categoryId+"'></li>").append(item[menu].name + item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + " 'class='btn btn-primary view_detail'data-toggle='modal' data-target='#myModal' onclick='showitemgroup(this)'>查看明细</button></div>").appendTo(parent);
                        }
                        else
                            $("<li class='"+item[menu].categoryId+"'></li>").append(item[menu].name + item[menu].desc).appendTo(parent);
                    }
                    else {
                        $("<li class='"+item[menu].categoryId+"'></li>").append(item[menu].name + item[menu].desc).appendTo(parent);
                    }
                }

            }
        }


    });
    $('.confirm').click(function () {
        var classname=this.id;
       $.post("/file?"+"fileId=3",function (data) {
           var lineStr="<table><thead class='addLine'><tr role='row'><th>序号</th><th>文件名称</th><th>上传时间</th><th>提交时间</th><th>提交状态</th><th>操作</th></thead><tbody class='sumItemSort'></tbody></table>";
           $('.'+classname).append(lineStr);
           var rowInfo="<tr></tr>";
           var cellInfo="<td></td>";
           var analyseList= data.data.fileInfo;
           var listLength= data.data.fileInfo.length;
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
               $(".sumItemSort tr:last td:eq(1)").text(Info.path);
               $(".sumItemSort tr:last td:eq(2)").text(Info.createTime);
               $(".sumItemSort tr:last td:eq(3)").text();
               var submitstatus='';
               if(Info.status==0){
                   submitstatus='未提交';
               }
               else submitstatus='提交成功';
               $(".sumItemSort tr:last td:eq(4)").text(submitstatus);
               var act="<a href=\"#\" class=\"pass\"style=\"color: blue; \" type=\"button\">更新</a> <a href=\"#\" class=\"pass\"style=\"color: blue; \" type=\"button\">下载</a><a href=\"#\" class=\"pass\"style=\"color: blue; \" type=\"button\">提交</a>";
               $(".sumItemSort tr:last td:eq(5)").append(act);
           }
       });



    });



}
function  reviewerRec() {
    $('.right_col').empty();
    $.get("/region?"+'regionName=applicant/revRecord',function (html) {

        $('.right_col').append(html);
    });
    $.get("/item/info/import-list",function (data) {

        var abnormaldata=showexplaindata(data.data.abnormalItemList);
        $('.abnormaldata').append(abnormaldata);
        $('.btn-info').text('查看回复');
        $('.btn-success').remove();
        $('.explain').click(function () {
            $('.modal-body').empty();
            for(var m=0;m<data.data.abnormalItemList.length;m++)
            if(this.id=='explain_'+data.data.abnormalItemList[m].itemId) {
                $('.modal-body').append(data.data.abnormalItemList[m].applyDesc);
            }
        });

        var normaldata=showdata(data.data.normalItemList);
        $('.normalbodydata').append(normaldata);



    })

}
function applyworkload() {
    $('.right_col').empty();
    $.get("/region?"+'regionName=applicant/reviewercontent',function (result) {
        $('.right_col').append(result);

    });
    $.get("/category/info/list", function (data) {
        var showlist = $("<ul></ul>");
        showApply(data.data.categoryTree, showlist);
        $("#showRevitem").append(showlist);


        //item为json数据
        //parent为要组合成html的容器
        function showApply(item, parent) {
            for (var menu in item) {

                //如果有子节点，则遍历该子节点
                if (item[menu].children.length > 0) {
                    //创建一个子节点li
                    var li = $("<li class='itemlist'></li>");
                    if (item[menu].formula) {
                        if(item[menu].importRequired==0) {
                            $(li).append(item[menu].name + item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + "' class='btn btn-primary apply_detail' onclick='ownerApply(this)' style='float: right;'>点击申报</button></div>").append("<ul></ul>").appendTo(parent);
                            $('#hiddencontent').append(item[menu].formula);
                            $('#hiddencontent').append(item[menu].jsonParameters);

                        }
                        else
                            $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);


                    }
                    //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                    else {
                        $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);
                    }
                    //将空白的ul作为下一个递归遍历的父亲节点传入
                    showApply(item[menu].children, $(li).children().eq(0));
                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else {
                    if (item[menu].formula) {

                        if (item[menu].importRequired == 0) {
                            $("<li class='itemList'></li>").append(item[menu].name + item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + " 'class='btn btn-primary apply_detail' onclick='ownerApply(this)' style='float: right;'>点击申报</button></div>").appendTo(parent);
                        }
                        else
                            $("<li class='itemList'></li>").append(item[menu].name + item[menu].desc).appendTo(parent);
                    }
                    else {
                        $("<li class='itemList'></li>").append(item[menu].name + item[menu].desc).appendTo(parent);
                    }
                }

            }
        }


    });

}
function applyRec() {
    $('.right_col').empty();
    $.get("/region?"+'regionName=applicant/applyRec',function (html) {
        $('.right_col').append(html);
    });
    $.get("/item/info/apply-list", function (data) {

        var addbtnstr="<a href='#' class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> 删除申请</a>"
        var abnormaldata=showdata(data.data.abnormalItemList);
        $('.abnorbodyItem').append(abnormaldata);
        $('.btn-info').text('重新申请');
        $('.addbtn').append(addbtnstr);
        var normaldata=showapplydata(data.data.normalItemList);
        $('.normalbodyItem').append(normaldata);


    })
}
function showdata(item) {
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

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'<a href=\"#\" class=\"btn btn-primary btn-xs\" style=\"float: right;\"><i class=\"fa fa-folder\" id=\"showitem_' + i +'\"></i>查看详情</a></td><td>'+item[i].workload+'</td><td id=\"status_'+item[i].itemId+'\">'+statusName+'</td><td class=\"addbtn\" ><a class=\"btn btn-info btn-xs '+item[i].itemId+'\" data-toggle=\"modal\" data-target=\"#refuseModal\"><i class=\"fa fa-pencil\"></i> 存疑</a><a class=\"btn btn-success btn-xs '+item[i].itemId+'\"\">确定</a></td></tr>';

    }
    return abnormaldata;
}
function showexplaindata(item) {
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

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'<a href=\"#\" class=\"btn btn-primary btn-xs\" style=\"float: right;\"><i class=\"fa fa-folder\" id=\"showitem_' + i +'\"></i>查看详情</a></td><td>'+item[i].workload+'</td><td id=\"status_'+item[i].itemId+'\">'+statusName+'</td><td class=\"addbtn\" ><a class=\"btn btn-info btn-xs explain\" id=\"explain_'+item[i].itemId+'\"data-toggle=\"modal\" data-target=\"#explainModal\"><i class=\"fa fa-pencil\"></i> 存疑</a><a class=\"btn btn-success btn-xs '+item[i].itemId+'\">确定</a></td></tr>';


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

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'<a href=\"#\" class=\"btn btn-primary btn-xs\" style=\"float: right;\"><i class=\"fa fa-folder\" id=\"showitem_' + i +'\"></i>查看详情</a></td><td>'+item[i].workload+'</td><td id=\"status_'+item[i].itemId+'\">'+statusName+'</td></tr>';

    }
    return abnormaldata;
}












