
    $.get("/category/list", function (data) {
         var showlist = $("<ul></ul>");
         showall(data.data.categoryTree, showlist);
         $(".panel-primary").append(showlist);


         //item为json数据
         //parent为要组合成html的容器
         function showall(item, parent) {
             for (var menu in item) {
                 //如果有子节点，则遍历该子节点
                 if (item[menu].children.length > 0) {
                     //创建一个子节点li
                     var li = $("<li class='itemlist'></li>");
                     if(item[menu].formula){
                         $(li).append(item[menu].name+"<div class='col-sm-12'><button type='button' class='btn btn-round btn-primary'>查看明细</button></div>").append("<ul></ul>").appendTo(parent);

                     }
                     //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                     else {
                         $(li).append(item[menu].name).append("<ul></ul>").appendTo(parent);
                     }
                     //将空白的ul作为下一个递归遍历的父亲节点传入
                     showall(item[menu].children, $(li));
                 }
                 //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                 else {
                     if(item[menu].formula) {

                         $("<li class='itemList'></li>").append(item[menu].name+"<div class='col-sm-12'><button type='button' class='btn btn-round btn-primary'>查看明细</button></div>").appendTo(parent);
                     }
                     else{
                         $("<li class='itemList'></li>").append(item[menu].name).appendTo(parent);
                     }
                 }
             }
         }

     });



