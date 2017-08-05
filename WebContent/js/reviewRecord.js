/**
 * Created by SBWang on 2017/7/16.
 */
function workRevie(){
    /*
    $('.right_col').empty();
    $.get("/region?"+'regionName=applicant/reviewercontent',function (result) {
        $('.right_col').append(result);

    });
    */
    $('.right_hole').empty();
    $.get("/region?"+'regionName=PrimTeachers/reviewerWorkload',function (result) {
        $('.right_hole').append(result);

    });
    $.get("/category/info/list", function (data) {
       var showlist=$("<ul></ul>");
        showimportall(data.data.categoryTree,showlist);
        $('#tab_content1').append(showlist);

/*function  showimportall(item) {
    for(var i=0;i<item.length;i++){
        if(item[i].importRequired==1){
            $('#tab_content1').append("<li id='catInfo_"+item[i].categoryId+"'>"+item[i].name+":"+item[i].desc+"</li>");
            if(item[i].formula){
                $.get("/item/info/item-group?" + 'categoryId=' + item[i].categoryId, function (data) {
                    if(data.data.itemList){

                            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer"> <thead> <tr role="row"> <th  class="sorting" style="width: 60px;">序号</th> <th  class="sorting" style="width: 278px;">条目名称</th> ' +
                                '<th class="sorting" style="width: 78px;">工作量</th> <th class="sorting" style="width: 160px;">计算公式</th><th class="sorting" style="width: 200px;">主要参数</th> <th class="sorting" style="width: 93px;">' +
                                '复核截止时间 </th> <th class="sorting"  id="review_' + data.data.itemList[applyItemCount].itemId + '" style="width: 83px;">复核状态 </th> <th class="sorting"  style="width: 183px;">操作</th> </tr> </thead> <tbody class="tbody_' + data.data.itemList[applyItemCount].itemId + '"></tbody></table>';
                            $('#catInfo_' + item[i].categoryId).append(tablestr);

                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";
                        var analyseList = data.data.itemList;
                        var listLength = data.data.itemList.length;
                        for (var t = 0; t < listLength; t++) {
                            var Info = analyseList[t];
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId).append(rowInfo);

                            for (var j = 0; j < 7; j++)//单元格
                            {
                                $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last").append(cellInfo);
                            }
                            var id = t;
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(0)").text(id + 1);
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(1)").text(Info.itemName);
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(2)").text(Info.workload);
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(3)").text();
                            var paramArray = Info.parameterValues;
                            var str = '';
                            for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

                                str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
                            }
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(4)").text(str);
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(5)").text('2017-12-31');
                            var statusName;
                            switch (Info.status) {
                                case -1:
                                    statusName = '删除状态';
                                    break;
                                case 0:
                                    statusName = '未提交状态';
                                    break;
                                case 1:
                                    statusName = '首次复核';
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
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(6)").text(statusName);

                            var act = "<a class=\"btn btn-success sure\" id=\"pass_'" + Info.itemId + "'\">确认通过</a><a class=\"btn btn-danger LeaveQues\" data-toggle=\"modal\" data-target=\"#refuModal\" id=\"refuse_'" + Info.itemId + "'\">存疑提交</a> ";
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(7)").append(act);
                        }

                         var abnormaldata = showdata(data.data.itemList);
                         $('.mymodaldata').append(abnormaldata);
                         $(".btn-success").on("click", function () {
                         var v = this.className;
                         var b = v.match(/\d+/g);
                         var itemstr = 'itemId=' + b + '&status=2';
                         $.ajax({
                         type: "POST",
                         url: "/item/manage/status-update?" + itemstr

                         });
                         $('#status_' + b).val('通过');
                         });
                         $(".btn-info").on("click", function () {
                         var message = $('#refusedesc').val();
                         var x = this.className;
                         var a = x.match(/\d+/g);
                         var itemstr = 'itemId=' + a + '&status=3' + '&message=' + message;
                         $(".commit").on("click", function () {
                         $.ajax({
                         type: "POST",
                         url: "/item/manage/status-update?" + itemstr

                         });
                         $('#refuseModal').modal('hide');
                         $('#status_' + a).val('存疑状态');
                         });

                         })


                    }
                });
            }
        }
        if(item[i].children){
            showimportall(item[i].children);
        }
    }
}*/
        function showimportall(menu_list, parent) {
            for (var menu in menu_list) {
                //如果有子节点，则遍历该子节点
                if (menu_list[menu].children.length > 0) {
                    var isShow=traverseNode(menu_list[menu],1);
                    if(isShow==1) {
                        var li = $("<li></li>");
                        $(li).append(menu_list[menu].name).append("<ul></ul>").appendTo(parent);


                    }
                    showimportall(menu_list[menu].children, $(li).children().eq(0));
                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else if(menu_list[menu].importRequired==1){
                    $("<li></li>").append(menu_list[menu].name).appendTo(parent);
                }
            }
        }
/*        function returnType(menu_list) {
            for (var menu in menu_list) {
                if (menu_list[menu].children&&menu_list[menu].children.length>0) {
                    return returnType(menu_list[menu].children);
                }
                else if(menu_list[menu].importRequired==1){
                    return menu_list[menu].importRequired;
                }
            }

        }*/


    });
/*
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
    */

    $(document).on("click",".sure",function () {
        var flag=this.id;
        var passItemId=flag.match(/\d+/g);
        var itemstr='itemId='+passItemId+'&status=2';
        $.ajax({
            type:"POST",
            url:"/item/manage/status-update?"+itemstr

        });
        $('#reviewe_'+passItemId).text('确认通过');
    });
    $(document).on("click",".LeaveQues",function () {
        var reflag=this.id;
        var refuItemId=reflag.match(/\d+/g);
        $(document).on("click",".conmmit",function () {
            var refudesc=$("#refusedesc").val();
            $.get("reviewer/manage/check?"+"itemId="+refuItemId+"&status=3"+"&message="+refudesc,function () {
                $('#reviewe_'+refuItemId).text('存疑提交');
            })
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
       /* $('.btn-info').text('查看回复');
        $('.btn-success').remove();
        */
        $('.explain').click(function () {
            $('.modal-body').empty();
            for(var m=0;m<data.data.abnormalItemList.length;m++)
            if(this.id=='explain_'+data.data.abnormalItemList[m].itemId) {
                $('.modal-body').append(data.data.abnormalItemList[m].applyDesc);
            }
        });
/*
        var normaldata=showdata(data.data.normalItemList);
        $('.normalbodydata').append(normaldata);
        */



    })

}
function applyworkload() {
    $('.right_hole').empty();
    $.get("/region?"+'regionName=PrimTeachers/applyWorkload',function (result) {
        $('.right_hole').append(result);

    });
    /*$.get("/category/info/list", function (data) {
        var showlist = $("<ul></ul>");
        showApply(data.data.categoryTree, showlist);
        $("#tab_content1").append(showlist);


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
                            $(li).append("<span style='font-size: 14px;'>"+item[menu].name + item[menu].desc + "</span><button type='button' id='" + item[menu].categoryId + "' class='btn btn-primary apply_detail' onclick='ownerApply(this)' style='float: right;margin-right: 0px;'>点击申报</button>").append("<ul></ul>").appendTo(parent);

                        }
                        else
                            $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);


                    }
                    //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                    else {
                        $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);
                    }
                    //将空白的ul作为下一个递归遍历的父亲节点传入
                    showApply(item[menu].children, $(li));
                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else {
                    if (item[menu].formula) {

                        if (item[menu].importRequired == 0) {
                            $("<li class='itemList'></li>").append("<span style='font-size: 14px;'>"+item[menu].name + item[menu].desc + "</span><button type='button' id='" + item[menu].categoryId + " 'class='btn btn-primary apply_detail' onclick='ownerApply(this)' style='float: right;margin-right: 0px;'>点击申报</button>").appendTo(parent);
                        }
                        else
                            $("<li class='itemList'></li>").append("<span style='font-size: 14px;'>"+item[menu].name + item[menu].desc+"</span>").appendTo(parent);
                    }
                    else {
                        $("<li class='itemList'></li>").append("<span style='font-size: 14px;'>"+item[menu].name + item[menu].desc+"</span>").appendTo(parent);
                    }
                }

            }
        }


    });
    */
    $.get("/category/info/list", function (data) {
        var parent=$("<ul></ul>");
        showapplyall(data.data.categoryTree,parent);
       $("#tab_content1").append(parent);
       function showapplyall(menu_list,parent) {
           for (var menu=0;menu<menu_list.length;menu++) {
               //如果有子节点，则遍历该子节点
               if (menu_list[menu].children.length > 0) {
                   var isShow=traverseNode(menu_list[menu],0);
                   if(isShow==0) {
                       var li = $("<li></li>");
                       $(li).append(menu_list[menu].name).append("<ul></ul>").appendTo(parent);

                   }
                   showapplyall(menu_list[menu].children, $(li).children().eq(0));
               }
               else if(menu_list[menu].importRequired==0){
                   $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append(menu_list[menu].name+":"+menu_list[menu].desc+ "<button  id='apply_" + menu_list[menu].categoryId + "' class='btn btn-primary apply' data-toggle='modal' data-target='#applyModal' style='float: right;'>点击申报</button><div style='clear: both;'></div>").appendTo(parent);
               }

           }
        }
 /*                   for(var menu=0;menu<menu_list.children.length;menu++) {
                        if(menu_list.children[menu].importRequired == 0) {
                            break;
                        }
                         else {
                            returnType(menu_list.children[menu]);
                        }
                    }
            return 0;*/

 /* function showapplyall(item, parent) {
             for (var menu in item) {

             //如果有子节点，则遍历该子节点
             if (item[menu].children.length > 0) {
             //创建一个子节点li
             var li = $("<li class='"+item[menu].categoryId+"'></li>");
             if (item[menu].formula) {
             if(item[menu].importRequired==1) {
             $(li).append(item[menu].name +"</hr>"+item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + "' class='btn btn-primary view_detail' data-toggle='modal' data-target='#myModal' onclick='showitemgroup(this)'>查看明细</button></div>").append("<ul></ul>").appendTo(parent);
             }
             else
             $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);



             }
             //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
             else {
             $(li).append(item[menu].name + item[menu].desc).append("<ul></ul>").appendTo(parent);
             }
             //将空白的ul作为下一个递归遍历的父亲节点传入
             showapplyall(item[menu].children, $(li).children().eq(0));
             }

             //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
             else {
             if (item[menu].formula) {

             if (item[menu].importRequired == 1) {
             $("<li class='"+item[menu].categoryId+"'></li>").append(item[menu].name + "</hr>"+item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + " 'class='btn btn-primary view_detail'data-toggle='modal' data-target='#myModal' onclick='showitemgroup(this)'>查看明细</button></div>").appendTo(parent);
             }
             else
             $("<li class='"+item[menu].categoryId+"'></li>").append(item[menu].name + item[menu].desc).appendTo(parent);

             }
             else {
             $("<li class='"+item[menu].categoryId+"'></li>").append(item[menu].name + "</hr>"+item[menu].desc).appendTo(parent);
             }
             }

             }
             }*/

/*
        function showimportall(menu_list, parent) {
            for (var menu in menu_list) {
                //如果有子节点，则遍历该子节点
                if (menu_list[menu].children.length > 0) {
                    //创建一个子节点li
                    var li = $("<li></li>");
                    //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                    if(menu_list[menu].importRequired==0) {
                        if(menu_list.formula) {
                            $(li).append("<span class='catInfo_" + menu_list[menu].categoryId + "'>" + menu_list[menu].name + ':' + menu_list[menu].desc + "</span><button type='button' id='" + item[menu].categoryId + "' class='btn btn-primary apply_detail' onclick='ownerApply(this)' style='float: right;margin-right: 0px;'>点击申报</button>").append("<ul></ul>").appendTo(parent);
                        }
                        else {
                            $(li).append("<span class='catInfo_" + menu_list[menu].categoryId + "'>" + menu_list[menu].name + ':' + menu_list[menu].desc + "</span>").append("<ul></ul>").appendTo(parent);

                        }
                        showimportall(menu_list[menu].children, $(li));
                    }
                    else {
                        showimportall(menu_list[menu].children, $(li));
                    }

                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else {
                    if (menu_list[menu].importRequired == 0) {
                        $("<li></li>").append("<span class='catInfo_"+menu_list[menu].categoryId+"'>"+menu_list[menu].name+':'+menu_list[menu].desc+"</span>").appendTo(parent);
                    }
                }
            }
        }
        */

/*        function  showapplyall(item) {
            for(var i=0;i<item.length;i++){
                if(item[i].importRequired==0){
                    $('#tab_content1').append("<li class='item_"+item[i].categoryId+"'>"+item[i].name+":"+item[i].desc+"<button class='btn btn-primary apply' id='apply_"+item[i].categoryId+"' style='float: right;' data-toggle='modal' data-target='#applyModal'>点击申报</button><div style='clear: both;'></div></li>");

                }
                if(item[i].children){
                    showapplyall(item[i].children);
                }
            }
        }*/

        $(document).on("click",".apply",function () {
            //$(".panel-default").toggle("show");
            $('.applymodalbody').empty();

            var myseleFlag=this.id;
            var reg=myseleFlag.match(/\d+/g)[0];
            reg=parseInt(reg);
            $(".modal-header").empty();
            $(".modal-header").append($(".item_"+reg).text());
            ownerApply(reg);
           $('.parameterTh').empty();
           $('.otherParaTh').empty();
            $('#AddPramter').empty();
            comparePara(data.data.categoryTree,reg);
        });

        function comparePara(item,para){
            for(var comp=0;comp<item.length;comp++){
                if(item[comp].categoryId==para&&item[comp].formulaParameterList&&item[comp].otherJsonParameters){

                    for(var t=0;t<item[comp].formulaParameterList.length;t++){
                        var symbolname=item[comp].formulaParameterList[t].symbol;
                        $('.parameterTh').append("<th class='pramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                        $('#AddPramter').append("<td><input type='text' class='parameterName'></td>");


                    }
                    for(var s=0;s<item[comp].otherJsonParameters.length;s++){

                        $('.otherParaTh').append("<th class='otherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                        $('#AddOtherPramter').append( "<td><input type='text' class='otherparameterName'></td>");

                    }

                }
                else if(item[comp].children){
                    comparePara(item[comp].children,para);
                }
            }
        }


    });
    $(document).on("click",".apply",function () {
        $.get("/common/teachers",function (data) {
            for(var i=0;i<data.data.teacherList.length;i++){
                $('.teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
            }
        });

    });

    $(document).on("click","#addGroupMessage",function () {
        var addMessage="<tr><td><select class='groupMemberName teacherName' style='width: 30%;'><option value=''></option> </select></td><td><input type='text' class='groupMemberSymbol'></select></select></td><td><input type='text' class='groupMemberWeight'></td></tr>";
        $('#AddgroupPramter').append(addMessage);
    });
    $(document).on("click",".groupMemberName",function () {
        $.get("/common/teachers",function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.groupMemberName').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
                 }
        })
    });
    }

function applyRec() {
    $('#tab_content2').empty();
    $.get("/region?"+'regionName=applicant/applyRec',function (html) {
        $('#tab_content2').append(html);
    });
    $.get("/item/info/apply-list", function (data) {

        var addbtnstr="<a href='#' class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> 删除申请</a>"
        var abnormaldata=showdata(data.data.abnormalItemList);
        $('.abnorbodyItem').append(abnormaldata);
        $('.btn-info').text('重新申请');
        $('.addbtn').append(addbtnstr);
        var normaldata=showapplydata(data.data.normalItemList);
        $('.normalbodyItem').append(normaldata);


    });

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
                statusName = '首次复核';
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

        };

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'</td><td>'+item[i].workload+'</td><td id=\"status_'+item[i].itemId+'\">'+statusName+'</td><td class=\"addbtn\" ><a class=\"btn btn-info btn-xs explain\" id=\"explain_'+item[i].itemId+'\"data-toggle=\"modal\" data-target=\"#explainModal\"><i class=\"fa fa-pencil\"></i> 提交疑问</a><a class=\"btn btn-success btn-xs '+item[i].itemId+'\">确认通过</a></td></tr>';


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
                statusName = '审核通过';
                break;
            case 3:
                statusName = '存疑提交';
                break;
            case 4:
                statusName = '存疑已解决';
                break;
            case 5:
                statusName = '拒绝';
                break;

        };

        abnormaldata += '<tr role=\"row\" class=\"odd\"><td class=\"sort\">'+m+'</td><td class=\"sorting_1\">'+item[i].itemName+'</td><td>'+item[i].workload+'</td><td id=\"status_'+item[i].itemId+'\">'+statusName+'</td></tr>';

    }
    return abnormaldata;
}
function traverseNode(rootNode,targetType)
{
    var resultType=2; //using as the flag of partent node's type
    //开始遍历
    if(rootNode.children.length==0&&rootNode.importRequired==targetType)
    {
        //this means rootnode is leaf node
        return rootNode.importRequired;
    }else
    {
        //recursion
        for(var i=0;i<rootNode.children.length;i++)
        {
            //there we can print the child type
            //和目标类型对比，只要有一个一样，就把当前节点的 reslulate 设置为目标类型
            if(targetType == traverseNode(rootNode.children[i],targetType))
                resultType=targetType;

        }

    }
    return resultType;

}