/**
 * Created by SBWang on 2017/7/17.
 */

function changeRole(dom) {
    var role = dom.id;
    switch (role) {
        case 'reviewer':
            var revsidebar = 'regionName=applicant/reviewersidebar';
            var revcontent = 'regionName=applicant/reviewercontent';
            $.get("/region?" + revsidebar, function (data) {
                $('#left_col').empty();
                $('#left_col').append(data);

            });
            $.get("/region?" + revcontent, function (result) {
                $('.right_col').empty();
                $('.right_col').append(result);

            });
            $.get("/category/info/list", function (data) {
                var showlist = $("<ul></ul>");
                showall(data.data.categoryTree, showlist);
                $("#showRevitem").append(showlist);


                //item为json数据
                //parent为要组合成html的容器
                function showall(item, parent) {
                    for (var menu in item) {

                        //如果有子节点，则遍历该子节点
                        if (item[menu].children.length > 0) {
                            //创建一个子节点li
                            var li = $("<li class='itemlist'></li>");
                            if (item[menu].formula) {
                                if (item[menu].importRequired == 1) {
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
                            showall(item[menu].children, $(li));
                        }
                        //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                        else {
                            if (item[menu].formula) {

                                if (item[menu].importRequired == 1) {
                                    $("<li class='itemList'></li>").append(item[menu].name + item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + " 'class='btn btn-primary view_detail' data-toggle='modal' data-target='#myModal' onclick='showitemgroup(this)'>查看明细</button></div>").appendTo(parent);
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
            break;
        case 'manager':
            var managersidebar = 'regionName=manager/managersidebar';
            var managercontent = 'regionName=manager/add';
            $.get("/region?" + managersidebar, function (data) {
                $('#left_col').empty();
                $('#left_col').append(data);

            });
            $.get("/region?" + managercontent, function (result) {
                $('.right_col').empty();
                $('.right_col').append(result);

            });
            break;
        case 'auditor':

            $.get("/region?" + 'regionName=auditor/auditorsidebar', function (data) {
                $('#left_col').empty();
                $('#left_col').append(data);

            });
            $.get("/region?" + 'regionName=auditor/auditorcontent', function (result) {
                $('.right_col').empty();
                $('.right_col').append(result);

            });
            $.get("/category/info/list", function (data) {
                var showlist = $("<ul></ul>");
                showall(data.data.categoryTree, showlist);
                $("#showRevitem").append(showlist);


                //item为json数据
                //parent为要组合成html的容器
                function showall(item, parent) {
                    for (var menu in item) {

                        //如果有子节点，则遍历该子节点
                        if (item[menu].children.length > 0) {
                            //创建一个子节点li
                            var li = $("<li class='itemlist'></li>");
                            if (item[menu].formula) {
                                if (item[menu].importRequired == 1) {
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
                            showall(item[menu].children, $(li));
                        }
                        //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                        else {
                            if (item[menu].formula) {

                                if (item[menu].importRequired == 1) {
                                    $("<li class='itemList'></li>").append(item[menu].name + item[menu].desc + "<div class='col-sm-12'><button type='button' id='" + item[menu].categoryId + " 'class='btn btn-primary view_detail' data-toggle='modal' data-target='#myModal' onclick='showitemgroup(this)'>查看明细</button></div>").appendTo(parent);
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
}



