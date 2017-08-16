function ztree() {

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
            enable:true,
            chkboxType: { "Y": "s", "N": "s" }
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
    var zNodes = new Array();
    $.get(categoryAllUrl,function (data) {
            for (var m = 0; m < data.data.categoryTree.length; m++) {

                createTree(data.data.categoryTree[m]);
            }
            function createTree(item) {

                var x=item.reviewDeadline;
                var y=item.applyDeadline;
                var a=x.match(/\d+/g);
                var b=y.match(/\d+/g);
                var appDeadline=b[1]+'/'+b[2]+'/'+b[0];
                var rewDeadline=a[1]+'/'+a[2]+'/'+a[0];

                var nodes = {
                    'name': item.name,
                    'id': item.categoryId,
                    'parentId': item.parentId,
                    'desc': item.desc,
                    'reviewDeadline': rewDeadline,
                    'applyDeadline': appDeadline,
                    'formula': item.formula,
                    'reviewerId':item.reviewerId,
                    'formulaParameterList':item.formulaParameterList,
                    'otherJsonParameters':item.otherJsonParameters,
                    'isLeaf':item.isLeaf,
                    'importRequired':item.importRequired,
                    'open':true
                };
                var zTree=$.fn.zTree.getZTreeObj("treeDemo");

                zNodes.push(nodes);
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);

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

            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var sNodes = zTree.getSelectedNodes();

            if (sNodes.length > 0) {
                var parentNode = sNodes[0].getParentNode();
                var parNodeId;
                var parNodeName;
                if(parentNode==null){
                    parNodeId=0;
                    parNodeName='';
                }
                else{
                    parNodeId=parentNode.id;
                    parNodeName=parentNode.name;
                }

            }

            $("#importRequired option").each(function() {
                if($(this).val() == treeNode.importRequired){
                    $(this).attr("selected",true);
                }
            });
            /*$("#teacherName option").each(function() {
                if($(this).val() == treeNode.reviewerId){
                    $(this).attr("selected",true);
                }
            });*/
            $("#teacherName option[value='"+treeNode.reviewerId+"']").attr("selected","selected");

            $("input:radio[name='hasChildNode']").each(function (){
                if($(this).val()==treeNode.isLeaf){
                    $(this).attr("checked",true);
                }

            });
            $('.addOtherPramter').empty();
            var otherjsonstrArray='';
            if(treeNode.otherJsonParameters!=null) {
                otherjsonstrArray = treeNode.otherJsonParameters;
            }
            /*else {
                jsonstrArray='';
            }*/
            var addOtherStr='';

            for(var pramterCount=0;pramterCount<otherjsonstrArray.length;pramterCount++){

                addOtherStr+="<tr><td><input type='text' class='otherParameterName' name='otherParameterName'></td></tr>";

            }
            $('.addOtherPramter').append(addOtherStr);

            $('.AddPramter').empty();
            var jsonstrArray='';
            if(treeNode.formulaParameterList!=null) {
                jsonstrArray = treeNode.formulaParameterList;
            }
            /*else {
             jsonstrArray='';
             }*/
            var addStr='';
            for(var pramterCount=0;pramterCount<jsonstrArray.length;pramterCount++){

                addStr+="<tr><td><input type='text' class='parameterName' name='parameterName'></td><td><input type='text' class='parameterSymbol' name='parameterSymbol'></td></tr>";

            }
            $('.AddPramter').append(addStr);

            for(var count=0;count<jsonstrArray.length;count++){
                $(".parameterName").eq(count).val(jsonstrArray[count].desc);
                $(".parameterSymbol").eq(count).val(jsonstrArray[count].symbol);
            }
            for(var othercount=0;othercount<otherjsonstrArray.length;othercount++){
                $(".otherParameterName").eq(othercount).val(otherjsonstrArray[othercount].key);

            }

            $('#itemName').val(treeNode.name);
            $('#desc').val(treeNode.desc);
            $('#applyDeadline').val(treeNode.applyDeadline);
            $('#reviewDeadline').val(treeNode.reviewDeadline);
            $('#parentId').val(parNodeName);
            $('#formula').val(treeNode.formula);
            $("#parentId").attr("disabled","disabled");


            $('#addModal').modal('show');
            $('#save').unbind("click");
            $('#save').bind("click", function () {
                var parametername = $('.parameterName');
                var newArray=new Array();
                for(var i=0;i<parametername.length;i++){

                    newArray.push({desc:$(".parameterName").eq(i).val(),symbol:$(".parameterSymbol").eq(i).val()});

                }
                var otherParamterName=$(".otherParameterName");
                var otherArray=new Array();
                for(var m=0;m<otherParamterName.length;m++){
                    otherArray.push({key:$(".otherParameterName").eq(m).val(),value:""});
                }
                newArray=JSON.stringify(newArray);
                otherArray=JSON.stringify(otherArray);
                var reviewTimetodate = $('#reviewDeadline').val();
                var applyTimetodate = $('#applyDeadline').val();

                var radio=$("#importRequired option:selected");
                var ischild=$("input:radio[name='hasChildNode']:checked").val();
                var reviewerid=$('#teacherName option:selected');

                $.post(categoryEditUrl,
                    {
                        name: $('#itemName').val(),
                        desc: $('#desc').val(),
                        parentId: parNodeId,
                        isLeaf: ischild,
                        reviewDeadline: format(reviewTimetodate),
                        applyDeadline: format(applyTimetodate),
                        reviewerId: reviewerid.val(),
                        formula: $('#formula').val(),
                        importRequired: radio.val(),
                        version: $('#version').val(),
                        categoryId: treeNode.id,
                        jsonParameters: newArray,
                        otherJson:otherArray
                    },
                    function (data) {
                        var x=data.data.category.reviewDeadline;
                        var y=data.data.category.applyDeadline;
                        var a=x.match(/\d+/g);
                        var b=y.match(/\d+/g);
                        var appDeadline=b[1]+'/'+b[2]+'/'+b[0];
                        var rewDeadline=a[1]+'/'+a[2]+'/'+a[0];

                        for (var i = 0; i < zNodes.length; i++) {
                            if (zNodes[i].id == data.data.category.categoryId) {

                                var newNode = {
                                    'name': data.data.category.name,
                                    'id': data.data.category.categoryId,
                                    'parentId': data.data.category.parentId,
                                    'desc': data.data.category.desc,
                                    'reviewDeadline': rewDeadline,
                                    'applyDeadline': appDeadline,
                                    'formula': data.data.category.formula,
                                    'reviewerId':data.data.category.reviewerId,
                                    'formulaParameterList':data.data.category.formulaParameterList,
                                    'isLeaf':data.data.category.isLeaf,
                                    'importRequired':data.data.category.importRequired,
                                    'otherJsonParameters':data.data.category.otherJsonParameters
                                };

                                zTree.updateNode(zNodes[i]);
                                $('#'+treeNode.tId+'_span').text(newNode.name);

                                zNodes.splice(i, 1, newNode);
                                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
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

                    for(var m=0;m<window.zNodes.length;m++){
                        if(window.zNodes[m].id==data.data.oldategory.categoryId){
                            window.zNodes.splice(i-1,1);
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
                $('#teacherName').val(null);
                $("#parentId").attr("disabled","disabled");
                $('#parentId').val(treeNode.name);
                $('#applyDeadline').val(null);
                $('#reviewDeadline').val(null);
                $('#formula').val(null);
               /* $('.parameterSymbol').val(null);
                $('.parameterName').val(null);*/
                $(".addOtherPramter").empty();
                $(".addOtherPramter").empty();

             //   $('.AddPramter').empty();
                $('#save').unbind('click');
                $('#save').bind('click', function () {
                    var parametername = $('.parameterName');
                    var newArray=new Array();
                    for(var i=0;i<parametername.length;i++){

                        newArray.push({desc:$(".parameterName").eq(i).val(),symbol:$(".parameterSymbol").eq(i).val()});

                    }
                    var otherParamterName=$(".otherParameterName");
                    var otherArray=new Array();
                    for(var m=0;m<otherParamterName.length;m++){
                        otherArray.push({key:$(".otherParameterName").eq(m).val(),value:""});
                    }
                    newArray=JSON.stringify(newArray);
                    otherArray=JSON.stringify(otherArray);
                    var reviewTimetodate = $('#reviewDeadline').val();
                    var applyTimetodate = $('#applyDeadline').val();
                    var radio=$("#importRequired option:selected");
                    var ischild=$("input:radio[name='hasChildNode']:checked").val();
                    var reviewerid=$('#teacherName option:selected');

                    $.post(categoryManageUrl, {
                        name: $('#itemName').val(),
                        desc: $('#desc').val(),
                        parentId: treeNode.id,
                        isLeaf: ischild,
                        reviewDeadline: format(reviewTimetodate),
                        applyDeadline: format(applyTimetodate),
                        reviewerId:reviewerid.val() ,
                        formula: $('#formula').val(),
                        importRequired: radio.val(),
                        version: $('#version').val(),
                        jsonParameters: newArray,
                        otherJson:otherArray
                    }, function (data) {
                        var x=data.data.category.reviewDeadline;
                        var y=data.data.category.applyDeadline;
                        var a=x.match(/\d+/g);
                        var b=y.match(/\d+/g);
                        var appDeadline=b[1]+'/'+b[2]+'/'+b[0];
                        var rewDeadline=a[1]+'/'+a[2]+'/'+a[0];
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                        var newNode = {
                            'name': data.data.category.name,
                            'id': data.data.category.categoryId,
                            'parentId': data.data.category.parentId,
                            'desc': data.data.category.desc,
                            'reviewDeadline': rewDeadline,
                            'applyDeadline': appDeadline,
                            'formula': data.data.category.formula,
                            'reviewerId':data.data.category.reviewerId,
                            'formulaParameterList':data.data.category.formulaParameterList,
                            'otherJsonParameters':data.data.category.otherJsonParameters,
                            'isLeaf':data.data.category.isLeaf,
                            'importRequired':data.data.category.importRequired
                        };

                        newNode = zTree.addNodes(treeNode, newNode);

                        zNodes.push(newNode);

                    });
                    $('#addModal').modal('hide');
                });


            });

    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    function selectAll() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
    }
    $(document).ready(function(){
        $(document).on('click','#addToTable',function() {
          //  $('.AddPramter').empty();
            $('#itemName').val(null);
            $('#desc').val(null);
            $('#reviewerId').val(null);
            $("#parentId").attr("disabled","disabled");
            $('#parentId').val(null);
            $('#applyDeadline').val(null);
            $('#reviewDeadline').val(null);
            $('#formula').val(null);
            $('.parameterSymbol').val(null);
            $('.parameterName').val(null);
          //  $('#addModal').modal('show');

            $(document).off('click','#save');
            $(document).on('click','#save',function () {
                var parametername =$(".parameterName") ;
                var newArray=new Array();
                for(var i=0;i<parametername.length;i++){

                    newArray.push({desc:$(".parameterName").eq(i).val(),symbol:$(".parameterSymbol").eq(i).val()});

                }
                var otherParamterName=$(".otherParameterName");
                var otherArray=new Array();
                for(var m=0;m<otherParamterName.length;m++){
                    otherArray.push({key:$(".otherParameterName").eq(m).val(),value:""});
                }
                newArray=JSON.stringify(newArray);
                otherArray=JSON.stringify(otherArray);
                var reviewTimetodate = $('#reviewDeadline').val();
                var applyTimetodate = $('#applyDeadline').val();
                var radio=$("#importRequired option:selected");
                var ischild=$("input:radio[name='hasChildNode']:checked").val();
                var reviewerid=$('#teacherName option:selected');

                $.post(categoryManageUrl, {
                    name: $('#itemName').val(),
                    desc: $('#desc').val(),
                    parentId: 0,
                    isLeaf: ischild,
                    reviewDeadline: format(reviewTimetodate),
                    applyDeadline: format(applyTimetodate),
                    reviewerId:reviewerid.val() ,
                    formula: $('#formula').val(),
                    importRequired: radio.val(),
                    version: $('#version').val(),
                    jsonParameters: newArray,
                    otherJson:otherArray
                }, function (data) {

                    var x=data.data.category.reviewDeadline;
                    var y=data.data.category.applyDeadline;
                    var a=x.match(/\d+/g);
                    var b=y.match(/\d+/g);
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                    var newNode= {'name': data.data.category.name,
                        'id': data.data.category.categoryId,
                        'parentId': data.data.category.parentId,
                        'desc':data.data.category.desc,
                        'reviewDeadline':x[1]/x[2]/x[0],
                        'applyDeadline':y[1]/y[2]/y[0],
                        'formula':data.data.category.formula,
                        'reviewerId':data.data.category.reviewerId,
                        'formulaParameterList':data.data.category.formulaParameterList,
                        'otherJsonParameters':data.data.category.otherJsonParameters,
                        'isLeaf':data.data.category.isLeaf,
                        'importRequired':data.data.category.importRequired
                    };
                    newNode = zTree.addNodes(null, newNode);
                    zNodes.push(newNode);
                }, "json");

                $('#addModal').modal('hide');


            });


        });
    });
    function add0(m){return m<10?'0'+m:m }
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
        $(document).off("click","#submit");
        $(document).on("click","#submit",function () {
            $.post(categorySubmitUrl+"?"+str,function (data){
                if(data.status==200)
                    return confirm("提交节点成功！");
                else
                    alert("提交节点失败！");
            } )
        });

        $(document).off("click","#unlock");
        $(document).on("click","#unlock",function () {
            $.post(unlockCateUrl+"?"+str,function (data){
                if(data.status==200)
                    return confirm("解锁节点成功！");
                else
                    alert("解锁节点失败！");
            } )
        });



    }
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
   // $("#selectAll").bind("click", selectAll);
}

