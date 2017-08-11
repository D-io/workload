/*
$(document).on("click","#clickToggle1",function () {
    $(".ck1").toggle("slow");

});
$(document).on("click","#clickToggle2",function () {
    $(".ck2").toggle("slow");

});
$(document).on("click","#clickToggle3",function () {
    $(".ck3").toggle("slow");

});
$(document).on("click",".btn-sm",function () {
    $('.hidden-addedText').show();

});

    $('.btn-md').on("click", function () {
        $('.hidden-addedText').hide();

    });
$(document).on("click",".collapse-link",function () {
    $(".x_content").toggle("slow");
    $(".fa-chevron-up").toggleClass("fa-chevron-down");
});

    $(".close-link").on("click", function () {
        $(".x_panel").hide();
    });
    $(".sorting1").on("click", function () {
        $(".sorting1").toggleClass("sorting_asc");

    });
    $(".sorting2").on("click", function () {
        $(".sorting2").toggleClass("sorting_asc");

    });

    $(".sorting_asc").on("click", function () {
        $(".sorting_asc").toggleClass("sorting_desc");
    });
*/

function jumpToSum() {

    var resetStr='regionName=Realmanager/sum';
    $.get(pageManageUrl+"?"+resetStr,function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);

    });
    $.get(categoryInfoListUrl, function (data) {
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
                    showall(item[menu].children, $(li).children().eq(0));
                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else {
                    if(item[menu].formula) {

                        $("<li class='itemList'></li>").append(item[menu].name+":"+item[menu].desc).appendTo(parent);
                    }
                    else{
                        $("<li class='itemList'></li>").append(item[menu].name+":"+item[menu].desc).appendTo(parent);
                    }
                }
            }
        }


    });

}

function jumpToAdd() {

    var resetStr='regionName=manager/Manager-right-col';
    $.get(pageManageUrl+"?"+resetStr,function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);

    });
  /*  var setting = {
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
    $.get(categoryAllUrl,function (data) {
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

                $.post(categoryEditUrl,
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
            url:categoryManageUrl+"?"+ str,
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

                    $.post(categoryManageUrl, {
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
        $.get(TeacherInfoUrl,function (data) {
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
                $.post(categoryManageUrl, {
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

            $.post(categorySubmitUrl,str,function (data){
                if(data.status==200)
                    alert("提交节点成功！");
                else
                    alert("提交节点失败！");
            } )
        });
    }
    $.fn.zTree.init($("#treeDemo"), setting, znodes);
    $("#selectAll").bind("click", selectAll);*/
  ztree();


}
function reset() {
    var resetStr = 'regionName=Realmanager/reviewer_reset';
    $.get(pageManageUrl+"?"+resetStr, function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);
        $.get(itemAllUrl+"?"+"status=5", function (data) {
            reviewerResetItem(data);
        });
        $.get(itemAllUrl+"?"+"status=0", function (data) {
            reviewerResetItem(data);
        });

    });
    $(document).on("click", ".reset_reviewer", function () {
        var flag = this.id;
        var item_id = flag.match(/\d+/g);
        var someparamster = "itemId=" + item_id + "&role=reviewer";
        $.ajax({
            type: "DELETE",
            url: itemResetUrl+"?" + someparamster,
            succes: function (data) {
                if (data.status == 200) {
                    alert('重置成功！');

                }
                else alert('重置失败！');
            },
            error:
                alert('重置失败！')
        });

    });
    $(document).on("click", ".reset_applicant", function () {
        var appflag = this.id;
        var myitemid = appflag.match(/\d+/g);
        var someparamster = "itemId=" + myitemid + "&role=proposer";
        $.ajax({
            type: "DELETE",
            url: itemResetUrl+"?" + someparamster,
            succes: function (data) {
                if (data.status == 200) {
                    alert('重置成功！');

                }
                else alert('重置失败！');
            },
            error:
            alert('重置失败！')

        });
    });
}
function itemSummary() {
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=Realmanager/itemSummary',function (result) {
        $('.right_hole').append(result);
        $.get(itemAllUrl+"?"+"status=2",function (data) {
            appendAllItem(data);

        });
    });
    $(document).ready(function () {
        $.get(TeacherInfoUrl,function (data) {
            for(var i=0;i<data.data.teacherList.length;i++){
                $('#teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+data.data.teacherList[i].teacherId+'</option>');
            }
        });

    });
    $(document).ready(function () {
        $.get(itemAuditorUrl,function (data) {
            for(var i=0;i<data.data.categoryList.length;i++){
                $('#itemRequired').append('<option value=\"'+data.data.categoryList[i].categoryId+'\">'+data.data.categoryList[i].categoryName+'</option>');
            }
        });

    });
    $(document).on("click","#sumItemSearch",function () {
        var option0=$("#ispassed option:selected");
        var option1=$("#itemRequired option:selected");
        var option2=$("#teacherName option:selected");
        var option3=$("#datatable_length option:selected");

        $.get(itemAllUrl+"?"+"categoryId="+option1.val()+"&ispassed="+option0.val()+"&ownerId="+option2.val()+"&pageNum=1&pageSize="+option3.val(),function (data) {
            $(".sumItemSort").empty();
            appendAllItem(data);

        });
    });
}

function appendAllItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    var analyseList= data.data.itemDtoList;
    var listLength= data.data.itemDtoList.length;
    for(var i=0;i<listLength;i++)
    {
        var Info=analyseList[i];
        $(".sumItemSort").append(rowInfo);
        $(".sumItemSort tr:last").attr("id",Info.itemId);
        for(var j=0;j<8;j++)//单元格
        {
            $(".sumItemSort tr:last").append(cellInfo);
        }
        var id=i;
        $(".sumItemSort tr:last td:eq(0)").text(id+1);
        $(".sumItemSort tr:last td:eq(1)").text(Info.teacherName);
        $(".sumItemSort tr:last td:eq(2)").text(Info.itemName);
        $(".sumItemSort tr:last td:eq(3)").text(Info.workload);
        var paramArray = Info.parameterValues;
        var str = '';
        for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

            str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
        }
        $(".sumItemSort tr:last td:eq(4)").text(str);
        var otherparamArray = Info.otherJsonParameters;
        var otherstr = '';
        for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
            otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
        }
        $(".sumItemSort tr:last td:eq(5)").text(otherstr);
        var isGroup='';
        switch(Info.isGroup){
            case 1:isGroup="小组申报";
            break;
            case 0:isGroup="个人申报";
            break;
        }
        $(".sumItemSort tr:last td:eq(6)").text(isGroup);
      //  var act="<a href=\"#\" class=\"pass btn btn-primary\" type=\"button\">查看详情</a> ";
        $(".sumItemSort tr:last td:eq(7)").text("确认通过");
    }

}
function reviewerResetItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    var analyseList= data.data.itemDtoList;
    var listLength= data.data.itemDtoList.length;
    for(var i=0;i<listLength;i++)
    {
        var Info=analyseList[i];
        $(".ResetItem").append(rowInfo);
        $(".ResetItem tr:last").attr("id",Info.itemId);
        for(var j=0;j<8;j++)//单元格
        {
            $(".ResetItem tr:last").append(cellInfo);
        }
        var id=i;
        var paramArray=Info.parameterValues;
        var str='';
        for(var paramCount=0;paramCount<paramArray.length;paramCount++){

            str+=paramArray[paramCount].symbol+':'+paramArray[paramCount].value;
        }
        var otherparamArray = Info.otherJsonParameters;
        var otherstr = '';
        if(otherparamArray&&otherparamArray.length>0){
            for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
            }
        }

        var statusName;
        if(Info.importRequired==0) {
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
        }
        else {
            switch (Info.status) {
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
                    statusName = '复核通过';
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
        }

        $(".ResetItem tr:last td:eq(0)").text(id+1);
        $(".ResetItem tr:last td:eq(1)").text(Info.teacherName);
        $(".ResetItem tr:last td:eq(2)").text(Info.itemName);
        $(".ResetItem tr:last td:eq(3)").text(str);
        $(".ResetItem tr:last td:eq(4)").text(otherstr);
        $(".ResetItem tr:last td:eq(5)").text(Info.workload);
        $(".ResetItem tr:last td:eq(6)").text(statusName);
        var act="<a class=\"btn btn-info btn-xs reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 重置审核人</a> <a class=\"btn btn-info btn-xs reset_applicant\" id=\"applyReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 重置申报人</a>";
        $(".ResetItem tr:last td:eq(7)").append(act);
    }

}
$(document).on("click","#addParameter",function () {
    var addStr="<tr><td><input type='text' class='parameterName' name='parameterName'></td><td><input type='text' class='parameterSymbol' name='parameterSymbol'></td></tr>";
    $('.AddPramter').append(addStr);
});
$(document).ready(function () {
    $.get(TeacherInfoUrl,function (data) {
        for(var i=0;i<data.data.teacherList.length;i++){
            $('#teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
        }
    });

});


