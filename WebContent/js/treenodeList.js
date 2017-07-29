function ownerApply(domId) {
    var setting = {
        view: {
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
         //   beforeEditName: beforeEditName,
            beforeRemove:beforeRemove,
            beforeRename: beforeRename,
            onCheck: zTreeOnClick,
            onRename: onRename

        }



    };
    var zNodes = new Array();
        $.get("/item/info/item-group?"+'categoryId='+domId,function (data) {
            if(data.data.itemList) {
                for (var m = 0; m < data.data.itemList.length; m++) {

                    createTree(data.data.itemList[m]);
                }
            }
            function createTree(item) {
                var nodes = {
                    'jsonParameters':item.jsonParameters,
                    'open':true,
                    'name': item.itemName,
                    'id': item.itemId,
                    'parentId': 0,
                    'applyDesc':item.applyDesc,
                    'ownerId':item.ownerId,
                    'workload':item.workload,
                    'isGroup':item.isGroup,
                    'groupManagerId':item.groupManagerId,
                    'jsonParameters':item.jsonParameters,
                    'otherParameters':item.otherJsonParameters,
                    'jobDesc':item.jobDesc,
                    'jsonChildWeight':item.jobDesc

                };
                var zTree=$.fn.zTree.getZTreeObj("treeDemo");

                window.zNodes.push(nodes);
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);


            }
        });


    var log, className = "dark";
//捕获节点被拖拽前回调
    function beforeDrag(treeId, treeNodes) {
        return false;
    }
//捕获节点编辑按钮回调函数
    /*
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
            $("#teacherName option").each(function() {
                if($(this).val() == treeNode.reviewerId){
                    $(this).attr("selected",true);
                }
            });
            $("input:radio[name='hasChildNode']").each(function (){
                if($(this).val()==treeNode.isLeaf){
                    $(this).attr("checked",true);
                }

            });
            $('.AddPramter').empty();
            var jsonstrArray;
            if(treeNode.jsonParameters) {
                jsonstrArray = JSON.parse(treeNode.jsonParameters);
            }
            else {
                jsonstrArray='';
            }
            var addStr='';
            for(var pramterCount=0;pramterCount<jsonstrArray.length;pramterCount++){

                addStr+="<tr><td><input type='text' class='parameterName' name='parameterName'></td><td><input type='text' class='parameterSymbol' name='parameterSymbol'></td></tr>";

            }
            $('.AddPramter').append(addStr);

            for(var count=0;count<jsonstrArray.length;count++){
                $(".parameterName").eq(count).val(jsonstrArray[count].desc);
                $(".parameterSymbol").eq(count).val(jsonstrArray[count].symbol);
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
                newArray=JSON.stringify(newArray);
                var reviewTimetodate = $('#reviewDeadline').val();
                var applyTimetodate = $('#applyDeadline').val();

                var radio=$("#importRequired option:selected");
                var ischild=$("input:radio[name='hasChildNode']:checked").val();
                var reviewerid=$('#teacherName option:selected');

                $.post("/category/manage/modify",
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
                        jsonParameters: newArray
                    },
                    function (data) {
                        var x=data.data.category.reviewDeadline;
                        var y=data.data.category.applyDeadline;
                        var a=x.match(/\d+/g);
                        var b=y.match(/\d+/g);
                        var appDeadline=b[1]+'/'+b[2]+'/'+b[0];
                        var rewDeadline=a[1]+'/'+a[2]+'/'+a[0];

                        for (var i = 0; i < window.zNodes.length; i++) {
                            if (window.zNodes[i].id == data.data.category.categoryId) {

                                var newNode = {
                                    'name': data.data.category.name,
                                    'id': data.data.category.categoryId,
                                    'parentId': data.data.category.parentId,
                                    'desc': data.data.category.desc,
                                    'reviewDeadline': rewDeadline,
                                    'applyDeadline': appDeadline,
                                    'formula': data.data.category.formula,
                                    'reviewerId':data.data.category.reviewerId,
                                    'jsonParameters':data.data.category.jsonParameters,
                                    'isLeaf':data.data.category.isLeaf,
                                    'importRequired':data.data.category.importRequired
                                };

                                zTree.updateNode(window.zNodes[i]);
                                $('#'+treeNode.tId+'_span').text(newNode.name);

                                window.zNodes.splice(i, 1, newNode);
                                $.fn.zTree.init($("#treeDemo"), setting, window.zNodes);
                            }
                        }

                    }
                );
                $('#addModal').modal('hide');
            });
        },0);
        return false;

    }
    */
//捕获移除节点回调函数
    function beforeRemove(treeId, treeNode) {

        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);
        alert("确认删除 " + treeNode.name + " 吗？");
        var str='itemId'+'='+treeNode.id;
        $.ajax({
            type:"DELETE",
            url:"/category/manage?"+ str,
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

    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    function selectAll() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
    }
    $(document).ready(function() {
        $('.add').unbind('click');
        $('.add').bind('click', function () {

            $('#itemName').val(null);
            $('#applyDesc').val(null);
            $('#workload').val(null);
            //   $("#AddgroupPramter").empty();

            $('.groupMemberSymbol').val(null);
            $('.groupMemberWeight').val(null);
            $('.parameterName').val(null);
            $('.otherparameterName').val(null);

        });

        $(document).on("click", ".savemyApply", function () {

            var parametername = $(".pramterDesc");
            var newArray = new Array();
            for (var i = 0; i < parametername.length; i++) {
                var dom = $(".pramterDesc").eq(i).attr("id");
                newArray.push({symbol: dom, value: parseInt($(".parameterName").eq(i).val())});

            }
            newArray = JSON.stringify(newArray);
            var otherArray = new Array();
            var otherPramterkey = $(".otherPramterkey");
            for (var j = 0; j < otherPramterkey.length; j++) {
                var otherKey=$(".otherPramterkey").eq(j);
                otherArray.push({key: otherKey.text(), value: $(".otherparameterName").eq(j).val()});

            }
            otherArray = JSON.stringify(otherArray);
            var grouparray = new Array();
            var groupmessageArray = $('.groupMemberName');
            for (var c = 0; c < groupmessageArray.length; c++) {
                grouparray.push({
                    userId: parseInt($(".groupMemberName option:selected").eq(c).val()),
                    jobDesc: $(".groupMemberSymbol").eq(c).val()
                });
            }
            grouparray = JSON.stringify(grouparray);
            var childWeight = new Array();
            for (m = 0; m < groupmessageArray.length; m++) {
                childWeight.push({
                    userId: parseInt($(".groupMemberName option:selected").eq(m).val()),
                    weight: parseFloat($(".groupMemberWeight").eq(m).val())
                });
            }
            childWeight = JSON.stringify((childWeight));

            // var reviewTimetodate = $('#reviewDeadline').val();
            //var applyTimetodate = $('#applyDeadline').val();
            var radio = $("#isGroup option:selected");
            var applicant = $('#applicant option:selected');
            var itemmanager = $('#itemmanager option:selected');

            $.post("/item/manage", {
                categoryId:domId,
                itemName: $('#itemName').val(),
                applyDesc: $('#applyDesc').val(),
             //   workload: $('#workload').val(),
                ownerId: applicant.val(),
                groupManagerId: itemmanager.val(),
                isGroup: radio.val(),
                jsonParameters: newArray,
                otherJsonParameters: otherArray,
                jobDesc: grouparray,
                jsonChildWeight: childWeight

            }, function (data) {

                /* var x=data.data.category.reviewDeadline;
                 var y=data.data.category.applyDeadline;
                 var a=x.match(/\d+/g);
                 var b=y.match(/\d+/g);
                 */

                 var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                 var newNode= {'name': data.data.itemList.itemName,
                 'id': data.data.itemList.itemId,
                 'parentId': 0,
                 'applyDesc':data.data.itemList.applyDesc,
                 //  'reviewDeadline':x[1]/x[2]/x[0],
                 //  'applyDeadline':y[1]/y[2]/y[0],
                 'ownerId':data.data.itemList.ownerId,
                 'workload':data.data.itemList.workload,
                 'isGroup':data.data.itemList.isGroup,
                 'groupManagerId':data.data.itemList.groupManagerId,
                 'jsonParameters':data.data.itemList.jsonParameters,
                 'otherParameters':data.data.itemList.otherJsonParameters,
                 'jobDesc':data.data.itemList.jobDesc,
                 'jsonChildWeight':data.data.itemList.jobDesc
                 //  'isLeaf':data.data.category.isLeaf,
                 // 'importRequired':data.data.category.importRequired
                 };
                 newNode = zTree.addNodes(null, newNode);
                 window.zNodes.push(newNode);
                 }, "json");

                 $('#addContent').modal('hide');


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

        $('#submit').click(function(){

            $.post("/category/manage/public-selective?"+str,function (data){
                if(data.status==200)
                    return confirm("提交节点成功！");
                else
                    alert("提交节点失败！");
            } )
        });
    }
    $.fn.zTree.init($("#treeDemo"), setting, window.zNodes);
    $("#selectAll").bind("click", selectAll);





}
