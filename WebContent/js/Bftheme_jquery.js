$(document).ready(function(){

  $('#clickToggle1').click(function(){
    $("#ck1").toggle("slow");
    

  });
  
  $('#clickToggle2').click(function(){
    $("#ck2").toggle("slow");

  });
   $('#clickToggle3').click(function(){
    $("#ck3").toggle("slow");
    $("#ck4").toggle("slow");

  });
   $('.btn-sm').click(function(){
    $('.hidden-addedText').show();

   });
   $('.btn-md').click(function(){
    $('.hidden-addedText').hide();

   });
   $(".collapse-link").click(function(){
    $(".x_content").slideToggle("slow");
  });
   $(".collapse-link").click(function(){
    $(".fa-chevron-up").toggleClass("fa-chevron-down");
  });
   $(".close-link").click(function(){
    $(".x_panel").hide();
   });
        $(".sorting1").click(function(){
    $(".sorting1").toggleClass("sorting_asc");

   });     
  $(".sorting2").click(function(){
    $(".sorting2").toggleClass("sorting_asc");
    
   });

     $(".sorting_asc").click(function(){
    $(".sorting_asc").toggleClass("sorting_desc");
   });


});

function jumpToSum() {
    $('.panel-body').empty();
    $('#addToTable').remove();
    $('#submit').remove();
    $.get("/category/list", function (data) {
        var showlist = $("<ul></ul>");
        showall(data.data.categoryTree, showlist);
        $(".panel-body").append(showlist);
        function showall(item, parent) {
            for (var menu in item) {
                //如果有子节点，则遍历该子节点
                if (item[menu].children.length > 0) {
                    //创建一个子节点li
                    var li = $("<li class='itemlist'></li>");
                    if(item[menu].formula){
                        $(li).append(item[menu].name).append("<ul></ul>").appendTo(parent);

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

                        $("<li class='itemList'></li>").append(item[menu].name).appendTo(parent);
                    }
                    else{
                        $("<li class='itemList'></li>").append(item[menu].name).appendTo(parent);
                    }
                }
            }
        }


    });


}

function jumpToAdd() {
    var btnstr="<button id='addToTable' class='btn btn-primary'  data-target='#addModal' >Add <i class='fa fa-plus'></i></button> <button id='submit' class='btn btn-primary'>Submit</button>";
    var treestr=" <div class='zTreeDemoBackground left'> <ul id='treeDemo' class='ztree'></ul> </div>";
    $('#addToTable').remove();
    $('#submit').remove();
    $('.panel-body').empty();
    $('#tree').prepend(btnstr);
    $('.panel-body').append(treestr);
    var setting = {
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
        },
        edit: {
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: showRemoveBtn,
            showRenameBtn: showRenameBtn
        },
        data: {
            key : {
                name : "name"
            },
            simpleData: {
                enable: true,
                idKey : "id",
                pIdKey : "parentId"
            }
        },
        check:{
            enable:true
        },
        callback: {
            beforeDrag: beforeDrag,
            beforeEditName: beforeEditName,
            beforeRemove:beforeRemove,
            beforeRename: beforeRename,
            onCheck: zTreeOnClick,
            onRename: onRename

        }



    };
//动态添加节点信息
    var znodes = new Array();
    $.get("/category/all",function (data) {
            for (var m = 0; m < data.data.categoryTree.length; m++) {

                createTree(data.data.categoryTree[m]);
            }
            function createTree(item) {


                var nodes = {
                    'name': item.name,
                    'id': item.categoryId,
                    'parentId': item.parentId,
                    'desc': item.desc,
                    'reviewDeadline': item.reviewDeadline,
                    'applyDeadline': item.applyDeadline,
                    'formula': item.formula,
                    'open':true
                };
                var zTree=$.fn.zTree.getZTreeObj("treeDemo");

                znodes.push(nodes);
                $.fn.zTree.init($("#treeDemo"), setting, znodes);

                if (item.children) {
                    for(var i=0;i<item.children.length;i++) {
                        createTree(item.children[i]);
                    }
                }



            }
        }

    );

    var log, className = "dark";
//捕获节点被拖拽前回调
    function beforeDrag(treeId, treeNodes) {
        return false;
    }
//捕获节点编辑按钮回调函数
    function beforeEditName(treeId, treeNode) {
        className = (className === "dark" ? "" : "dark");
        showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);

        setTimeout(function () {


            $('#itemName').val(treeNode.name);
            $('#desc').val(treeNode.desc);

            $('#parentId').val(treeNode.parentId);
            $('#applyDeadline').val(treeNode.applyDeadline);
            $('#reviewDeadline').val(treeNode.reviewDeadline);
            $('#formula').val(treeNode.formula);

            $('#addModal').modal('show');
            $('#save').unbind("click");
            $('#save').bind("click", function () {
                var parametername = $('#parameterName').val();
                var parameterSymbol = $('#parameterSymbol').val();
                var reviewTimetodate = $('#reviewDeadline').val();

                var applyTimetodate = $('#applyDeadline').val();

                var radio;
                if ($('#importRequired').val() == '导入类') {
                    radio = 1;
                }
                else
                    radio = 0;

                $.post("/category/modify",
                    {
                        name: $('#itemName').val(),
                        desc: $('#desc').val(),
                        parentId: treeNode.parentId,
                        isLeaf: $('#isLeaf').val(),
                        reviewDeadline: format(reviewTimetodate),
                        applyDeadline: format(applyTimetodate),
                        reviewerId: $('#reviewerId').val(),
                        formula: $('#formula').val(),
                        importRequired: radio,
                        version: $('#version').val(),
                        categoryId: treeNode.id,
                        jsonParameters: '{' + parametername + ':' + parameterSymbol + '}'
                    },
                    function (data) {

                        for (var i = 0; i < znodes.length; i++) {
                            if (znodes[i].id == data.data.category.categoryId) {

                                var newNode = {
                                    'name': data.data.category.name,
                                    'id': data.data.category.categoryId,
                                    'parentId': data.data.category.parentId,
                                    'desc': data.data.category.desc,
                                    'reviewDeadline': data.data.category.reviewDeadline,
                                    'applyDeadline': data.data.category.applyDeadline,
                                    'formula': data.data.category.formula,
                                    'reviewerId':data.data.category.reviewerId
                                };

                                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                                zTree.updateNode(znodes[i]);
                                $('#'+treeNode.tId+'_span').val(newNode.name);

                                znodes.splice(i, 1, newNode);
                            }
                        }

                    }
                );
                $('#addModal').modal('hide');
            });
        },0);
        return false;

    }
//捕获移除节点回调函数
    function beforeRemove(treeId, treeNode) {

        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);
        alert("确认删除 " + treeNode.name + " 吗？");
        var str='categoryId'+'='+treeNode.id;
        $.ajax({
            type:"DELETE",
            url:"/category?"+ str,
            data:{
                categoryId:treeNode.id
            },
            datatype:'json',
            success:function(data){
                if(data.status==1004) {
                    alert('非解锁条目不可删！');
                    jumpToAdd();
                    return false;

                }
                else {
                    return confirm("删除节点成功！");

                    for(var m=0;m<znodes.length;m++){
                        if(znodes[m].id==data.data.oldategory.categoryId){
                            znodes.splice(i-1,1);
                        }
                    }
                    $('#'+treeNode.tId).remove();
                }

            },
            error:function () {
                return false;
            }
        });
    }


//更新节点名称之前的回调函数
    function beforeRename(treeId, treeNode, newName, isCancel) {
        className = (className === "dark" ? "":"dark");
        showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
        if (newName.length == 0) {
            setTimeout(function() {
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.cancelEditName();
                alert("节点名称不能为空.");
            }, 0);
            return false;
        }
        return true;
    }
//节点名称编辑只有的回调函数
    function onRename(e, treeId, treeNode, isCancel) {
        showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    }
//是否显示移除按钮
    function showRemoveBtn(treeId, treeNode) {
        return treeNode;
    }
//是否显示重命名按钮
    function showRenameBtn(treeId, treeNode) {
        return treeNode;
    }
    function showLog(str) {
        if (!log) log = $("#log");
        log.append("<li class='"+className+"'>"+str+"</li>");
        if(log.children("li").length > 8) {
            log.get(0).removeChild(log.children("li")[0]);
        }
    }
    function getTime() {
        var now= new Date(),
            h=now.getHours(),
            m=now.getMinutes(),
            s=now.getSeconds(),
            ms=now.getMilliseconds();
        return (h+":"+m+":"+s+ " " +ms);
    }


    function addHoverDom(treeId, treeNode){
        var sObj = $("#" + treeNode.tId + "_span");

        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='add node' data-target='#addModal' data-toggle='modal' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if(btn)
            btn.bind("click", function() {

                $('#itemName').val(null);
                $('#desc').val(null);
                $('#reviewerId').val(null);
                $('#formula').val(null);
                $('#parentId').val(treeNode.name);
                $('#applyDeadline').val(null);
                $('#reviewDeadline').val(null);

                $('#save').unbind('click');
                $('#save').bind('click', function () {
                    var parametername = $('#parameterName').val();
                    var parameterSymbol = $('#parameterSymbol').val();
                    var reviewTimetodate = $('#reviewDeadline').val();

                    var applyTimetodate = $('#applyDeadline').val();

                    var radio = 0;
                    if ($('#importRequired').val() == '导入类') {
                        radio = 1;
                    }
                    else
                        radio = 0;

                    $.post("/category", {
                        name: $('#itemName').val(),
                        desc: $('#desc').val(),
                        parentId: treeNode.id,
                        isLeaf: $('#isLeaf').val(),
                        reviewDeadline: format(reviewTimetodate),
                        applyDeadline: format(applyTimetodate),
                        reviewerId: $('#reviewerId').val(),
                        formula: $('#formula').val(),
                        importRequired: radio,
                        version: $('#version').val(),
                        jsonParameters: '{' + parametername + ':' + parameterSymbol + '}'
                    }, function (data) {
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                        var newNode = {
                            'name': data.data.category.name,
                            'id': data.data.category.categoryId,
                            'parentId': data.data.category.parentId,
                            'desc': data.data.category.desc,
                            'reviewDeadline': data.data.category.reviewDeadline,
                            'applyDeadline': data.data.category.applyDeadline,
                            'formula': data.data.category.formula
                        };

                        newNode = zTree.addNodes(treeNode, newNode);

                       znodes.push(newNode);

                    });
                    $('#addModal').modal('hide');
                });


            });

    };
    function showTeacherInfo(){
        $.get("/category/teachers",function (data) {
            var str="<div class='well well-sm'><ul class='list-group'>";
            var TeacherInfo=data.data.teacherList;
            for(var count=0;count<TeacherInfo.length;count++){
                str+="<li class='list-group-item'>"+TeacherInfo[count].teacherId+'-'+TeacherInfo[count].name+"</li>";
            }
            str+="</ul></div>"
            $('#prompt').append(str);
        });
    }
    function hideTeacherInfo() {
        $('#prompt').hide();
    }
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    function selectAll() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
    }
    $(document).ready(function(){
        $('#addToTable').bind('click',function() {
            $('#itemName').val(null);
            $('#desc').val(null);
            $('#reviewerId').val(null);
            $('#parentId').val(null);
            $('#applyDeadline').val(null);
            $('#reviewDeadline').val(null);
            $('#formula').val(null);
            $('#parameterSymbol').val(null);
            $('#parameterName').val(null);
            $('#addModal').modal('show');

            $('#save').unbind('click');
            $('#save').bind('click', function () {
                var parametername = $('#parameterName').val();
                var parameterSymbol = $('#parameterSymbol').val();
                var reviewTimetodate = $('#reviewDeadline').val();

                var applyTimetodate = $('#applyDeadline').val();

                var radio;
                if ($('#importRequired').val() == '导入类') {
                    radio = 1;
                }
                else
                    radio = 0;
                $.post("/category", {
                    name: $('#itemName').val(),
                    desc: $('#desc').val(),
                    parentId: 0,
                    isLeaf: $('#isLeaf').val(),
                    reviewDeadline: format(reviewTimetodate),
                    applyDeadline: format(applyTimetodate),
                    reviewerId: $('#reviewerId').val(),
                    formula: $('#formula').val(),
                    importRequired: radio,
                    version: $('#version').val(),
                    jsonParameters: '{' + parametername + ':' + parameterSymbol + '}'
                }, function (data) {


                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                    var newNode= {'name': data.data.category.name,
                        'id': data.data.category.categoryId,
                        'parentId': data.data.category.parentId,
                        'desc':data.data.category.desc,
                        'reviewDeadline':data.data.category.reviewDeadline,
                        'applyDeadline':data.data.category.applyDeadline,
                        'formula':data.data.category.formula
                    };
                    alert(newNode.parentId);
                    newNode = zTree.addNodes(null, newNode);
                    znodes.push(newNode);
                }, "json");

                $('#addModal').modal('hide');


            });


        });
    });

    function add0(m){return m<10?'0'+m:m };
    function format(shijianchuo)

    {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();

        return y+'年'+add0(m)+'月'+add0(d)+'日';
    }
    function zTreeOnClick(event, treeId, treeNode) {
        var zTree= $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = zTree.getCheckedNodes(true);
        var str='';
        for(var i=0;i<nodes.length;i++){

            if(i==nodes.length-1){
                str+="categoryId="+nodes[i].id;

            }
            else
                str+="categoryId="+nodes[i].id+"&";

        }

        $('#submit').click(function(){

            $.post("/category/public-selective",str,function (data){
                if(data.status==200)
                    alert("提交节点成功！");
                else
                    alert("提交节点失败！");
            } )
        });
    }
    $.fn.zTree.init($("#treeDemo"), setting, znodes);
    $("#selectAll").bind("click", selectAll);


}
