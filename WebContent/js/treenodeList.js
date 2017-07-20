function showitemgroup(dom) {
    $('.mymodaldata').empty();
        $.get("/item/info/item-group?"+'categoryId='+dom.id,function (data) {
            var abnormaldata=showdata(data.data.itemList);
            $('.mymodaldata').append(abnormaldata);
            $(".btn-success").on("click",function () {
                var v=this.className;
                var b=v.match(/\d+/g);
                var itemstr='itemId='+b+'&status=2';
                $.ajax({
                    type:"POST",
                    url:"/item/manage/status-update?"+itemstr

                });
                $('#status_'+b).val('通过');
            });
            $(".btn-info").on("click",function () {
                var message=$('#refusedesc').val();
                var x=this.className;
                var a=x.match(/\d+/g);
                var itemstr='itemId='+a+'&status=3'+'&message='+message;
                $(".commit").on("click",function(){
                    $.ajax({
                        type:"POST",
                        url:"/item/manage/status-update?"+itemstr

                    });
                    $('#refuseModal').modal('hide');
                    $('#status_'+a).val('存疑状态');
                });

            })


        })

}
function ownerApply(dom) {

        $('#applytree').toggle();
        $.get("/item/info/item-group?"+'categoryId='+dom.id,function (data) {
            for (var m = 0; m < data.data.itemList.length; m++) {

                createTree(data.data.itemList[m]);
            }
        });
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
        var applyzNodes=new Array();

//动态添加节点信息

        function createTree(item) {
            var nodes = {
                'name': item.itemName,
                'id': item.itemId,
                'parentId': 0,
                'desc': item.applyDesc,
                'formula': item.formula,
                'open':true
            };
            var zTree=$.fn.zTree.getZTreeObj("applytreeDemo");

            applyzNodes.push(nodes);
            $.fn.zTree.init($("#applytreeDemo"), setting, applyzNodes);

        }

        var log, className = "dark";
//捕获节点被拖拽前回调
        function beforeDrag(treeId, treeNodes) {
            return false;
        }
//捕获节点编辑按钮回调函数
        /* function beforeEditName(treeId, treeNode) {
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

         $.post("/category/manage/modify",
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

         for (var i = 0; i < applyzNodes.length; i++) {
         if (applyzNodes[i].id == data.data.category.categoryId) {

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
         zTree.updateNode(applyzNodes[i]);
         $('#'+treeNode.tId+'_span').val(newNode.name);

         applyzNodes.splice(i, 1, newNode);
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

            var zTree = $.fn.zTree.getZTreeObj("applytreeDemo");
            zTree.selectNode(treeNode);
            alert("确认删除 " + treeNode.name + " 吗？");
            var str='itemId'+'='+treeNode.id;
            $.ajax({
                type:"DELETE",
                url:"/item/manage?"+ str,
                data:{
                    itemId:treeNode.id
                },
                datatype:'json',
                success:function(data){
                    if(data.status==1004) {
                        alert('非解锁条目不可删！');
                        ownerApply();
                        return false;

                    }
                    else {
                        return confirm("删除节点成功！");

                        for(var m=0;m<applyzNodes.length;m++){
                            if(applyzNodes[m].id==data.data.item.itemId){
                                applyzNodes.splice(i-1,1);
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
        /*
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
         */
//节点名称编辑只有的回调函数
        /*
         function onRename(e, treeId, treeNode, isCancel) {
         showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
         }
         */
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


        /* function addHoverDom(treeId, treeNode){
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

         $.post("/category/manage", {
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

         applyzNodes.push(newNode);

         });
         $('#addModal').modal('hide');
         });


         });

         };
         */
        function showTeacherInfo(){
            $.get("/common/teachers",function (data) {
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
            var zTree = $.fn.zTree.getZTreeObj("applytreeDemo");
            zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
        }

         $(document).ready(function(){
         $('#applyaddToTable').bind('click',function() {
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
         $.post("/category/manage", {
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
         applyzNodes.push(newNode);
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
            var zTree= $.fn.zTree.getZTreeObj("applytreeDemo");
            var nodes = zTree.getCheckedNodes(true);
            var str='';
            for(var i=0;i<nodes.length;i++){

                if(i==nodes.length-1){
                    str+="itemId="+nodes[i].id;

                }
                else
                    str+="itemId="+nodes[i].id+"&";

            }

            $('#submit').click(function(){

                $.post("/item/manage/public-selective",str,function (data){
                    if(data.status==200)
                        alert("提交节点成功！");
                    else
                        alert("提交节点失败！");
                } )
            });
        }
        $.fn.zTree.init($("#applytreeDemo"), setting, applyzNodes);
        $("#selectAll").bind("click", selectAll);



}




