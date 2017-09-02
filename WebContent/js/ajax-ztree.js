function ztree() {

    var setting = {
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false,
            fontCss: getFont,
            nameIsHTML: true
        },
        edit: {
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: showRemoveBtn,
            showRenameBtn: showRenameBtn
        },
        data: {
            showTitle:true,
            key : {
                name : "name",
                "title":"title"
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
            beforeEditName: beforeEditName,
            beforeRemove:beforeRemove,
            //  beforeRename: beforeRename,
            onCheck: zTreeOnClick,
            beforeDrag: zTreeBeforeDrag,
           onRemove: onRemove,
          //  onDblClick: onClick,
          //  onNodeCreated: zTreeOnNodeCreated
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
                var appDeadline=x;
                var rewDeadline=y;

                    if(item.status==1){
                        if(item.importRequired==1){
                            var nodes = {
                               /* 'name':'<span style="background-color:#6fcd54;color:#fff">'+item.name+ '</span><span style="margin-right: 5px;">【复核截止：'+appDeadline+'</span><span style="margin-right: 5px;">导入截止：'+rewDeadline+'】</span>',
                              */ name:item.name,
                                'realName':item.name,
                                 'font':{'background-color':'#6fcd54','color':'#fff'},
                                'id': item.categoryId,
                                'parentId': item.parentId,
                                'desc': item.desc,
                                'title':'【规则描述】'+item.desc+ '&#10【导入截止】'+rewDeadline+'&#10【复核截止】'+appDeadline,
                                'reviewDeadline': rewDeadline,
                                'applyDeadline': appDeadline,
                                'formula': item.formula,
                                'reviewerId':item.reviewerId,
                                'formulaParameterList':item.formulaParameterList,
                                'otherJsonParameters':item.otherJsonParameters,
                                'isLeaf':item.isLeaf,
                                'importRequired':item.importRequired,
                                'iconSkin':"icon06",
                                'status':item.status,
                                //  'status':item.status,
                                'open':true
                            };
                        }
                        else if(item.importRequired==0){
                            var nodes = {
                              /*  'name': '<span style="margin-right: 5px;">申报截止：'+appDeadline+'</span><span style="margin-right: 5px;">审核截止：'+rewDeadline+'</span>'+item.name,
                           */
                                'name':item.name,
                                /*<span style="background-color:#6fcd54;color:#fff">'+item.name+ '</span><span style="margin-right: 5px;>【申报截止：'+appDeadline+'</span><span style="margin-right: 5px;>审核截止：'+rewDeadline+'】</span>',
                            */    'realName':item.name,
                                  'font':{'background-color':'#6fcd54','color':'#fff'},
                                'id': item.categoryId,
                                'parentId': item.parentId,
                                'desc': item.desc,
                                'title':'【规则描述】'+item.desc+ '&#10【申报截止】'+appDeadline+'&#10【审核截止】'+rewDeadline,
                                'status':item.status,
                                'reviewDeadline': rewDeadline,
                                'applyDeadline': appDeadline,
                                'formula': item.formula,
                                'reviewerId':item.reviewerId,
                                'formulaParameterList':item.formulaParameterList,
                                'otherJsonParameters':item.otherJsonParameters,
                                'isLeaf':item.isLeaf,
                                'importRequired':item.importRequired,
                                'iconSkin':"icon02",
                                //  'status':item.status,
                                'open':true
                            };
                        }
                        else {
                            var nodes = {
                                'name': item.name,
                                'realName':item.name,
                             //   'font':{'background-color':'#6fcd54','color':'#fff'},
                                'id': item.categoryId,
                                'parentId': item.parentId,
                                'desc': item.desc,
                                'title':'【规则描述】'+item.desc,
                                'reviewDeadline': rewDeadline,
                                'applyDeadline': appDeadline,
                                'formula': item.formula,
                                'reviewerId':item.reviewerId,
                                'formulaParameterList':item.formulaParameterList,
                                'otherJsonParameters':item.otherJsonParameters,
                                'isLeaf':item.isLeaf,
                                'status':item.status,
                                'importRequired':item.importRequired,
                                'font':{'background-color':'#6fcd54','color':'#fff'},
                                'iconSkin':"icon04",
                                'open':true
                            };
                        }

                    }
                    else {
                        if(item.importRequired==1){
                            var nodes = {
                               /* 'name': '<span style="margin-right: 5px;">复核截止：'+appDeadline+'</span><span style="margin-right: 5px;">导入截止：'+rewDeadline+'</span>'+item.name,
                              */
                                'name':item.name,/*'<span style="background-color:#ffe746;color:#2A3F54">'+item.name+ '</span><span style="margin-right: 5px;">【复核截止：'+appDeadline+'</span><span style="margin-right: 5px;">导入截止：'+rewDeadline+'】</span>',
*/
                                'realName':item.name,
                              'font':{'background-color':'#ffe746','color':'#2A3F54'},
                                'id': item.categoryId,
                                'parentId': item.parentId,
                                'desc': item.desc,
                                'title':'【规则描述】'+item.desc+ '&#10【导入截止】'+rewDeadline+'&#10【复核截止】'+appDeadline,
                                'status':item.status,
                                'reviewDeadline': rewDeadline,
                                'applyDeadline': appDeadline,
                                'formula': item.formula,
                                'reviewerId':item.reviewerId,
                                'formulaParameterList':item.formulaParameterList,
                                'otherJsonParameters':item.otherJsonParameters,
                                'isLeaf':item.isLeaf,
                                'importRequired':item.importRequired,
                                'iconSkin':"icon06",
                                //  'status':item.status,
                                'open':true
                            };
                        }
                        else if(item.importRequired==0){
                            var nodes = {
                               /* 'name': '<span style="margin-right: 5px;">申报截止：'+appDeadline+'</span><span style="margin-right: 5px;">审核截止：'+rewDeadline+'</span>'+item.name,
                            */  'name':item.name,/*'<span style="background-color:#ffe746;color:#2A3F54">'+item.name+ '</span><span style="margin-right: 5px;">【申报截止：'+appDeadline+'</span><span style="margin-right: 5px;">审核截止：'+rewDeadline+'】</span>',
*/
                                'realName':item.name,
                               'font':{'background-color':'#ffe746','color':'#2A3F54'},
                                'id': item.categoryId,
                                'parentId': item.parentId,
                                'desc': item.desc,
                                'title':'【规则描述】'+item.desc+ '&#10【申报截止】'+appDeadline+'&#10【审核截止】'+rewDeadline,

                                'status':item.status,
                                'reviewDeadline': rewDeadline,
                                'applyDeadline': appDeadline,
                                'formula': item.formula,
                                'reviewerId':item.reviewerId,
                                'formulaParameterList':item.formulaParameterList,
                                'otherJsonParameters':item.otherJsonParameters,
                                'isLeaf':item.isLeaf,
                                'importRequired':item.importRequired,
                                'iconSkin':"icon02",
                                //  'status':item.status,
                                'open':true
                            };
                        }
                        else {
                            var nodes = {
                                'name': item.name,
                                'realName':item.name,
                                'title':'【规则描述】'+item.desc,
                                'font':{'background-color':'#ffe746','color':'#2A3F54'},
                           //     'font':{'background-color':'#ffe746','color':'#2A3F54'},
                                'id': item.categoryId,
                                'parentId': item.parentId,
                                'desc': item.desc,
                                'status':item.status,
                                'reviewDeadline': rewDeadline,
                                'applyDeadline': appDeadline,
                                'formula': item.formula,
                                'reviewerId':item.reviewerId,
                                'formulaParameterList':item.formulaParameterList,
                                'otherJsonParameters':item.otherJsonParameters,
                                'isLeaf':item.isLeaf,
                                'importRequired':item.importRequired,
                                'iconSkin':"icon04",
                                'open':true
                            };
                        }

                    }

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

//捕获节点编辑按钮回调函数
    function beforeEditName(treeId, treeNode) {

        className = (className === "dark" ? "" : "dark");
        showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.desc);
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);

        setTimeout(function () {
            var editCount=0;
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var sNodes = zTree.getSelectedNodes();
            $(".manageEdit").show();
            if (treeNode.status == 0) {
                $(".submitEdit").show();
                $(".submitEdit").attr("id", "submitEdit_" + treeNode.id);
            }
            else {
                $(".submitEdit").hide();
            }
            $(".manageEdit").attr("id","edit_"+treeNode.id);
            $("#cancel").hide();
            $("#save").hide();
            $(".form-control").attr("disabled", "disabled");
            $("#addParameter").attr("disabled", "disabled");
            $("#addOtherParameter").attr("disabled", "disabled");
            $(".editOtherRow").attr("disabled","disabled");
            $(".editParaRow").attr("disabled","disabled");
            $("#year").removeAttr("disabled");
            $("#term").removeAttr("disabled");
            var parNodeId=0;
            var parNodeName='';
            if(treeNode.parentId!=null){
                if (sNodes.length > 0) {
                    var parentId = sNodes[0].parentId;
                   for(var z=0;z<zNodes.length;z++){
                       if(zNodes[z].id==parentId){
                           var parentNode=zNodes[z];
                       }
                   }


                   /* if (parentNode == null) {
                           parNodeId = 0;
                        parNodeName = '';
                    }*/
                    if(parentNode!=null){
                        parNodeId = parentNode.id;
                        parNodeName = parentNode.realName;
                    }

                }
            }


            $("#importRequired option").each(function () {
                if ($(this).val() == treeNode.importRequired) {
                    $(this).attr("selected", true);

                    if ($(this).val() == 1) {
                        $(".requiredtime").show();
                        $(".select2").show();
                        $(".applyDeadLabel").text("复核截止时间");
                        $(".revDeadLabel").text("导入截止时间");
                        $("#importManager").text("负责人");
                    }
                    else if ($(this).val() == 0) {
                        $(".fomulaPara").show();
                        $(".requiredtime").show();
                        $(".select2").show();
                        $(".applyDeadLabel").text("申报截止时间");
                        $(".revDeadLabel").text("审核截止时间");
                        $("#importManager").text("审核人");
                    }
                    else {
                        $(".requiredtime").hide();
                        $(".select2").hide();
                    }
                }
                else {
                    $(this).removeAttr("selected");
                }
            });
            /*$("#teacherName option").each(function() {
             if($(this).val() == treeNode.reviewerId){
             $(this).attr("selected",true);
             }
             });*/
            //   $("#teacherName option[value='"+treeNode.reviewerId+"']").attr("selected","selected");
            $("#teacherName").val(treeNode.reviewerId);

            $("input:radio[name='hasChildNode']").each(function () {
                if ($(this).val() == treeNode.isLeaf) {
                    $(this).attr("checked", true);
                }

            });
            $('.addOtherPramter').empty();
            $("#teacherName").select2().val(treeNode.reviewerId).trigger("change");
            $(".select2-container").css("width","405px");
            var otherjsonstrArray = '';
            if (treeNode.otherJsonParameters != null) {
                otherjsonstrArray = treeNode.otherJsonParameters;
            }
            /*else {
             jsonstrArray='';
             }*/
            var addOtherStr = '';

            for (var pramterCount = 0; pramterCount < otherjsonstrArray.length; pramterCount++) {
                editCount++;
                addOtherStr += "<tr class='editOtherCount_" + editCount + "'><td style='position:relative'><input type='text' class='form-control otherParameterName' name='otherParameterName'><button type='button' class='btn btn-danger editOtherRow' id='editOtherRow_" + editCount + "' style='position: absolute;top:10px;right: -24px;' ><i class='fa fa-trash'></i></button></td></tr>";

            }
            $('.addOtherPramter').append(addOtherStr);

            $('.AddPramter').empty();
            var jsonstrArray = '';
            if (treeNode.formulaParameterList != null) {
                jsonstrArray = treeNode.formulaParameterList;
            }
            /*else {
             jsonstrArray='';
             }*/
            var addStr = '';
            for (var pramterCount = 0; pramterCount < jsonstrArray.length; pramterCount++) {
                editCount++;
                addStr += "<tr class='editParaCount_" + editCount + "'><td><input type='text' class='form-control parameterName' name='parameterName'></td><td style='position:relative'><input type='text' class='form-control parameterSymbol' name='parameterSymbol'><button type='button' class='btn btn-danger editParaRow' id='editParaRow_" + editCount + "' style='position: absolute;top:10px;right: -24px;'><i class='fa fa-trash'></i></button></td></tr>";

            }
            $('.AddPramter').append(addStr);

            for(var count=0;count<jsonstrArray.length;count++){
                $(".parameterName").eq(count).val(jsonstrArray[count].desc);
                $(".parameterSymbol").eq(count).val(jsonstrArray[count].symbol);
            }
            for (var othercount = 0; othercount < otherjsonstrArray.length; othercount++) {
                $(".otherParameterName").eq(othercount).val(otherjsonstrArray[othercount].key);

            }
            $(".parameterName").attr("disabled", "disabled");
            $(".parameterSymbol").attr("disabled", "disabled");
            $(".otherParameterName").attr("disabled", "disabled");

            $('#itemName').val(treeNode.realName);
            $('#desc').val(treeNode.desc);
            $('#applyDeadline').val(treeNode.applyDeadline);
            $('#reviewDeadline').val(treeNode.reviewDeadline);
            $('#parentId').val(parNodeName);
            $('#formula').val(treeNode.formula);
            $("#parentId").attr("disabled","disabled");


            $('#addModal').modal('show');
            $(document).off("click",".manageEdit");
            $(document).on("click",".manageEdit",function () {
                $.ajaxSetup({
                    async : false
                });
                var str=this.id.match(/\d+/g);
                $.post(unlockCateUrl+"?categoryId="+str,{test:12},function (data){
                    if(data.status==200){

                        $("#save").show();
                        $("#cancel").show();
                        $(".manageEdit").hide();
                        $(".submitEdit").hide();
                        $(".form-control").removeAttr("disabled");
                        $("#parentId").attr("disabled","disabled");
                        $(".parameterName").removeAttr("disabled");
                        $(".parameterSymbol").removeAttr("disabled");
                        $(".otherParameterName").removeAttr("disabled");
                        $("#addParameter").removeAttr("disabled");
                        $("#addOtherParameter").removeAttr("disabled");
                        $(".editOtherRow").removeAttr("disabled");
                        $(".editParaRow").removeAttr("disabled");
                       // $('#' + treeNode.tId + '_a').css({'background-color': '#ffe746', "color": "#2A3F54"});
                        //   return confirm("解锁节点成功！");
                        ztree();
                    }

                    else
                        alert("解锁规则失败！");
                } );

            });
            $(document).off("click",'#save');
            $(document).on("click",'#save', function () {

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
                        reviewDeadline: reviewTimetodate,
                        applyDeadline: applyTimetodate,
                        reviewerId: reviewerid.val(),
                        formula: $('#formula').val(),
                        importRequired: radio.val(),
                        version: $('#version').val(),
                        categoryId: treeNode.id,
                        jsonParameters: newArray,
                        otherJson:otherArray
                    },
                    function (data) {

                        /*    var a=x.match(/\d+/g);
                         var b=y.match(/\d+/g);
                         var appDeadline=b[1]+'/'+b[2]+'/'+b[0];
                         var rewDeadline=a[1]+'/'+a[2]+'/'+a[0];*/
                        if(data.status==200){
                            alert("规则已保存！");
                            ztree();

                            $.get(categoryAllUrl,function (data) {
                                    for (var m = 0; m < data.data.categoryTree.length; m++) {

                                        createTree(data.data.categoryTree[m]);
                                    }
                                    function createTree(item) {
                                        var appDeadline=item.applyDeadline;
                                        var rewDeadline=item.reviewDeadline;
                                        if(item.categoryId==treeNode.id){
                                            if(item.importRequired==1){
                                                var newnode={
                                                    'name':item.name,
                                                    'realName':item.name,
                                                    'font':{'background-color':'#6fcd54','color':'#fff'},
                                                    'id': item.categoryId,
                                                    'parentId': item.parentId,
                                                    'desc': item.desc,
                                                    'title':'【规则描述】'+item.desc+ '&#10【导入截止】'+rewDeadline+'&#10【复核截止】'+appDeadline,
                                                    'reviewDeadline': item.reviewDeadline,
                                                    'applyDeadline': item.applyDeadline,
                                                    'formula': item.formula,
                                                    'reviewerId':item.reviewerId,
                                                    'formulaParameterList':item.formulaParameterList,
                                                    'otherJsonParameters':item.otherJsonParameters,
                                                    'isLeaf':item.isLeaf,
                                                    'importRequired':item.importRequired,
                                                    'iconSkin':"icon06",
                                                    'status':item.status,
                                                    //  'status':item.status,
                                                    'open':true}
                                            }
                                            else if(item.importRequired==0){
                                                var newnode={
                                                    'name':item.name,
                                                    'realName':item.name,
                                                    'font':{'background-color':'#6fcd54','color':'#fff'},
                                                    'id': item.categoryId,
                                                    'parentId': item.parentId,
                                                    'desc': item.desc,
                                                    'title':'【规则描述】'+item.desc+ '&#10【申报截止】'+rewDeadline+'&#10【审核截止】'+appDeadline,
                                                    'reviewDeadline': item.reviewDeadline,
                                                    'applyDeadline': item.applyDeadline,
                                                    'formula': item.formula,
                                                    'reviewerId':item.reviewerId,
                                                    'formulaParameterList':item.formulaParameterList,
                                                    'otherJsonParameters':item.otherJsonParameters,
                                                    'isLeaf':item.isLeaf,
                                                    'importRequired':item.importRequired,
                                                    'iconSkin':"icon06",
                                                    'status':item.status,
                                                    //  'status':item.status,
                                                    'open':true}
                                            }
                                            else{
                                                var newnode={
                                                    'name':item.name,
                                                    'realName':item.name,
                                                     'font':{'background-color':'#6fcd54','color':'#fff'},
                                                    'id': item.categoryId,
                                                    'parentId': item.parentId,
                                                    'desc': item.desc,
                                                    'title':'【规则描述】'+item.desc,
                                                    'reviewDeadline': item.reviewDeadline,
                                                    'applyDeadline': item.applyDeadline,
                                                    'formula': item.formula,
                                                    'reviewerId':item.reviewerId,
                                                    'formulaParameterList':item.formulaParameterList,
                                                    'otherJsonParameters':item.otherJsonParameters,
                                                    'isLeaf':item.isLeaf,
                                                    'importRequired':item.importRequired,
                                                  //  'iconSkin':"icon06",
                                                    'status':item.status,
                                                    'iconSkin':"icon04",
                                                    //  'status':item.status,
                                                    'open':true}
                                            }

                                            treeNode=newnode;
                                        }
                                        else if (item.children) {
                                            for(var i=0;i<item.children.length;i++) {
                                                createTree(item.children[i]);
                                            }
                                        }
                                    }
                                }

                            );
                            beforeEditName("treeDemo",treeNode);

                        }

                    }
                );
             //   $('#addModal').modal('hide');
            });
        },0);
        return false;

    }
//自定义节点颜色
    function getFont(treeId, node) {
        return node.font ? node.font : {};
    }

//捕获移除节点回调函数
    function beforeRemove(treeId, treeNode) {

        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);
        return confirm("确认删除 " + treeNode.name + " 吗？");

    }
    function onRemove(e, treeId, treeNode) {
        var str='categoryId'+'='+treeNode.id;
        $.ajax({
            type:"POST",
            url:categoryDeleteUrl+"?"+ str,
            data:{
                categoryId:treeNode.id
            },
            datatype:'json',
            success:function(data){
                if(data.status==200) {
                    for(var m=0;m<zNodes.length;m++){
                        if(zNodes[m].id==data.data.categoryList.categoryId){
                            zNodes.splice(m-1,1);
                        }
                    }
                    $('#'+treeNode.tId).remove();
                    return confirm("删除节点成功！");
                }
                else {

                    alert('非解锁条目不可删！');
                    ztree();
                    return false;
                }

            },
            error:function () {
                return false;
            }
        });
    }
//更新节点名称之前的回调函数
    /*    function beforeRename(treeId, treeNode, newName, isCancel) {
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
     }*/
//禁止节点的拖拽函数

    function zTreeBeforeDrag(treeId, treeNodes) {
        return false;
    };
//是否显示移除按钮
    function showRemoveBtn(treeId, treeNode) {
        return treeNode;
    }
//是否显示重命名按钮
    function showRenameBtn(treeId, treeNode) {
        return treeNode;
    }
//选中时
    /*function onClick(event, treeId, treeNode){
        beforeEditName(treeId, treeNode) ;
        $(".manageEdit").hide();
        $(".submitEdit").hide();
    }*/
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
        if(treeNode.importRequired==2 ) {
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;


            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                + "' title='添加子规则' data-target='#addModal' data-toggle='modal' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn)
                btn.bind("click", function () {
                    $('#parentId').val(treeNode.name);
                    initRemoveAttr();
                    initModal();
                    $(document).off('click', '#save');
                    $(document).on('click', '#save', function () {
                        var radio=$("#importRequired option:selected");
                        if(!$("#itemName").val()){
                            $("#myname").addClass("has-error");
                            $("#experient_name").show();
                        }
                        var reviewTimetodate = $('#reviewDeadline').val();
                        var applyTimetodate = $('#applyDeadline').val();
                        if(radio.val()!=2) {
                            initChecked();

                            var parametername = $('.parameterName');
                            var newArray = new Array();
                            for (var i = 0; i < parametername.length; i++) {

                                newArray.push({
                                    desc: $(".parameterName").eq(i).val(),
                                    symbol: $(".parameterSymbol").eq(i).val()
                                });

                            }
                            var otherParamterName = $(".otherParameterName");
                            var otherArray = new Array();
                            for (var m = 0; m < otherParamterName.length; m++) {
                                otherArray.push({key: $(".otherParameterName").eq(m).val(), value: ""});
                            }
                            newArray = JSON.stringify(newArray);
                            if(newArray=='[]'){
                                newArray=null;
                            }
                            otherArray = JSON.stringify(otherArray);
                            if(otherArray=='[]'){
                                newArray=null;
                            }
                            var reviewerid = $('#teacherName option:selected');
                            if($('#formula').val()!=null){
                                $.post(categoryManageUrl, {
                                    name: $('#itemName').val(),
                                    desc: $('#desc').val(),
                                    parentId: treeNode.id,
                                    reviewDeadline: reviewTimetodate,
                                    applyDeadline: applyTimetodate,
                                    reviewerId: reviewerid.val(),
                                    formula: $('#formula').val(),
                                    importRequired: radio.val(),
                                    jsonParameters: newArray,
                                    otherJson: otherArray

                                }, function (data) {
                                    if (data.status == 200&&data.data.category) {
                                        alert("添加规则成功！");
                                        var rewDeadline = data.data.category.reviewDeadline;
                                        var appDeadline = data.data.category.applyDeadline;

                                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                                        if (data.data.category.importRequired == 1) {
                                            var newNode = {
                                                'name': data.data.category.name,
                                                'realName': data.data.category.name,
                                                'id': data.data.category.categoryId,
                                                'parentId': data.data.category.parentId,
                                                'status': data.data.category.status,
                                                'desc': data.data.category.desc,
                                                'title': '【规则描述】' + data.data.category.desc + '&#10【导入截止】' + appDeadline + '&#10【复核截止】' + rewDeadline,
                                                'reviewDeadline': rewDeadline,
                                                'applyDeadline': appDeadline,
                                                'formula': data.data.category.formula,
                                                'reviewerId': data.data.category.reviewerId,
                                                'formulaParameterList': data.data.category.formulaParameterList,
                                                'otherJsonParameters': data.data.category.otherJsonParameters,
                                                'isLeaf': data.data.category.isLeaf,
                                                'importRequired': data.data.category.importRequired,
                                                'font': {'background-color': '#ffe746', 'color': '#2A3F54'},
                                                'iconSkin': "icon06"
                                            };
                                        }
                                        else if (data.data.category.importRequired == 0) {
                                            var newNode = {
                                                'name': data.data.category.name,
                                                'realName': data.data.category.name,
                                                'id': data.data.category.categoryId,
                                                'parentId': data.data.category.parentId,
                                                'desc': data.data.category.desc,
                                                'title': '【规则描述】' + data.data.category.desc + '&#10【申报截止】' + appDeadline + '&#10【审核截止】' + rewDeadline,
                                                'status': data.data.category.status,
                                                'reviewDeadline': rewDeadline,
                                                'applyDeadline': appDeadline,
                                                'formula': data.data.category.formula,
                                                'reviewerId': data.data.category.reviewerId,
                                                'formulaParameterList': data.data.category.formulaParameterList,
                                                'otherJsonParameters': data.data.category.otherJsonParameters,
                                                'isLeaf': data.data.category.isLeaf,
                                                'importRequired': data.data.category.importRequired,
                                                'font': {'background-color': '#ffe746', 'color': '#2A3F54'},
                                                'iconSkin': "icon02"
                                            };
                                        }

                                        newNode = zTree.addNodes(treeNode, newNode);

                                        zNodes.push(newNode);
                                        beforeEditName("treeDemo", zNodes[zNodes.length - 1][0]);
                                    }
                                })
                            }

                        }
                         else{
                            $.post(categoryManageUrl, {
                                name: $('#itemName').val(),
                                desc: $('#desc').val(),
                                parentId: treeNode.id,
                                reviewDeadline: reviewTimetodate,
                                applyDeadline: applyTimetodate,
                                reviewerId: null,
                                formula: null,
                                importRequired:2,
                                jsonParameters: null,
                                otherJson: null
                            }, function (data) {
                                if (data.status == 200&&data.data.category) {
                                    alert("添加规则成功！");
                                    var rewDeadline = data.data.category.reviewDeadline;
                                    var appDeadline = data.data.category.applyDeadline;
                                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                                        var newNode = {
                                            'name': data.data.category.name,
                                            'realName': data.data.category.name,
                                            'id': data.data.category.categoryId,
                                            'parentId': data.data.category.parentId,
                                            'title': '【规则描述】' + data.data.category.desc,
                                            'desc': data.data.category.desc,
                                            'status': data.data.category.status,
                                            'reviewDeadline': rewDeadline,
                                            'applyDeadline': appDeadline,
                                            'formula': data.data.category.formula,
                                            'reviewerId': data.data.category.reviewerId,
                                            'formulaParameterList': data.data.category.formulaParameterList,
                                            'otherJsonParameters': data.data.category.otherJsonParameters,
                                            'isLeaf': data.data.category.isLeaf,
                                            'importRequired': data.data.category.importRequired,
                                            'iconSkin':"icon04",
                                            'font': {'background-color': '#ffe746', 'color': '#2A3F54'}
                                        };

                                    newNode = zTree.addNodes(treeNode, newNode);

                                    zNodes.push(newNode);
                                    beforeEditName("treeDemo", zNodes[zNodes.length - 1][0]);
                                }

                            });
                        }
                    });
                });
        }

    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    function selectAll() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
    }
    $(document).ready(function(){
        $(document).off("click","#addToTable");
        $(document).on('click','#addToTable',function() {
            initRemoveAttr();
            $('#parentId').val(null);
           initModal();
            $(document).off('click','#save');
            $(document).on('click','#save',function () {
                var radio=$("#importRequired option:selected");
                if(!$("#itemName").val()){
                    $("#myname").addClass("has-error");
                    $("#experient_name").show();
                }
                var reviewTimetodate = $('#reviewDeadline').val();
                var applyTimetodate = $('#applyDeadline').val();
            if(radio.val()!=2){
                initChecked();
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
                if(newArray=='[]'){
                    newArray=null;
                }
                otherArray=JSON.stringify(otherArray);
                if(otherArray=='[]'){
                    otherArray=null;
                }
                //   var ischild=$("input:radio[name='hasChildNode']:checked").val();
                var reviewerid=$('#teacherName option:selected');
                if($('#formula').val()!=null){
                    $.post(categoryManageUrl, {
                        name: $('#itemName').val(),
                        desc: $('#desc').val(),
                        parentId: 0,
                        reviewDeadline: reviewTimetodate,
                        applyDeadline: applyTimetodate,
                        reviewerId:reviewerid.val() ,
                        formula: $('#formula').val(),
                        importRequired: radio.val(),
                        jsonParameters: newArray,
                        otherJson:otherArray
                    }, function (data) {
                        if(data.status==200&&data.data.category){
                            alert("添加规则成功！");

                            var x=data.data.category.reviewDeadline;
                            var y=data.data.category.applyDeadline;
                            /* var a=x.match(/\d+/g);
                             var b=y.match(/\d+/g);*/
                            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                            if(data.data.category.importRequired==1){
                                var newNode= {
                                    'name':data.data.category.name,
                                    'realName':data.data.category.name,
                                    'id': data.data.category.categoryId,
                                    'parentId': data.data.category.parentId,
                                    'desc':data.data.category.desc,
                                    'title':'【规则描述】'+data.data.category.desc+ '&#10【导入截止】'+y+'&#10【复核截止】'+x,
                                    'reviewDeadline':x,
                                    'applyDeadline':y,
                                    'formula':data.data.category.formula,
                                    'status':data.data.category.status,
                                    'reviewerId':data.data.category.reviewerId,
                                    'formulaParameterList':data.data.category.formulaParameterList,
                                    'otherJsonParameters':data.data.category.otherJsonParameters,
                                    'isLeaf':data.data.category.isLeaf,
                                    'importRequired':data.data.category.importRequired,
                                    'font':{'background-color':'#ffe746','color':'#2A3F54'},
                                    'iconSkin':'icon06'
                                };
                            }
                            else if(data.data.category.importRequired==0){
                                var newNode= {
                                    'name':data.data.category.name,
                                    'realName':data.data.category.name,
                                    'title':'【规则描述】'+data.data.category.desc+ '&#10【申报截止】'+y+'&#10【审核截止】'+x,
                                    'id': data.data.category.categoryId,
                                    'parentId': data.data.category.parentId,
                                    'status':data.data.category.status,
                                    'desc':data.data.category.desc,
                                    'reviewDeadline':x,
                                    'applyDeadline':y,
                                    'formula':data.data.category.formula,
                                    'reviewerId':data.data.category.reviewerId,
                                    'formulaParameterList':data.data.category.formulaParameterList,
                                    'otherJsonParameters':data.data.category.otherJsonParameters,
                                    'isLeaf':data.data.category.isLeaf,
                                    'importRequired':data.data.category.importRequired,
                                    'font':{'background-color':'#ffe746','color':'#2A3F54'},
                                    'iconSkin':'icon02'
                                };
                            }

                            newNode = zTree.addNodes(null, newNode);
                            zNodes.push(newNode);
                            beforeEditName("treeDemo",zNodes[zNodes.length-1][0]);
                        }

                 }, "json");
                }
            }
            else{
                $.post(categoryManageUrl, {
                    name: $('#itemName').val(),
                    desc: $('#desc').val(),
                    parentId: 0,
                    //   isLeaf: ischild,
                    reviewDeadline: reviewTimetodate,
                    applyDeadline: applyTimetodate,
                    reviewerId:null,
                    formula:null,
                    importRequired:2,
                 //   version: $('#version').val(),
                    jsonParameters: null,
                    otherJson:null
                }, function (data) {
                    if(data.status==200&&data.data.category){
                        alert("添加规则成功！");
                        var x=data.data.category.reviewDeadline;
                        var y=data.data.category.applyDeadline;
                        /* var a=x.match(/\d+/g);
                         var b=y.match(/\d+/g);*/
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                            var newNode= {
                                'name': data.data.category.name,
                                'realName':data.data.category.name,
                                'id': data.data.category.categoryId,
                                'parentId': data.data.category.parentId,
                                'desc':data.data.category.desc,
                                'title':'【规则描述】'+data.data.category.desc,
                                'status':data.data.category.status,
                                'reviewDeadline':x,
                                'applyDeadline':y,
                                'formula':data.data.category.formula,
                                'reviewerId':data.data.category.reviewerId,
                                'formulaParameterList':data.data.category.formulaParameterList,
                                'otherJsonParameters':data.data.category.otherJsonParameters,
                                'isLeaf':data.data.category.isLeaf,
                                'importRequired':data.data.category.importRequired,
                                'iconSkin':"icon04",
                                'font':{'background-color':'#ffe746','color':'#2A3F54'}
                            };


                        newNode = zTree.addNodes(null, newNode);
                        zNodes.push(newNode);


                        beforeEditName("treeDemo",zNodes[zNodes.length-1][0]);
                    }

                }, "json");
            }
            });

        });
        $(".icon02_ico_docu").bind("hover",function () {
           $(this).attr("title","申报审核类");
        });
        $(".icon06_ico_docu").bind("hover",function () {
            $(this).attr("title","导入复核类");
        });
        $(document).on("click","#importRequired",function () {
            var options=$("#importRequired option:selected");
            if(options.val()==1){
                $(".applyDeadLabel").text("复核截止时间");
                $(".revDeadLabel").text("导入截止时间");
                $("#importManager").text("负责人");
                $(".requiredtime").show();
                $(".select2").show();
            }
            else if(options.val()==0){
                $(".applyDeadLabel").text("申报截止时间");
                $(".revDeadLabel").text("审核截止时间");
                $("#importManager").text("审核人");
                $(".requiredtime").show();
                $(".select2").show();
            }
            else {
                $(".requiredtime").hide();
                $(".select2").hide();
            }

        });
        $(document).off("click",".submitEdit");
        $(document).on("click",".submitEdit",function () {
            var thisId=this.id.match(/\d+/g);
             if(confirm("确认提交？")){
                 $.post(categorySubmitUrl+"?categoryId="+thisId,function (data){
                     if(data.status==200){
                         //  window.location.reload();
                         ztree();
                         alert("提交规则成功！");
                         /*for(var m=0;m<nodes.length;nodes++){
                          $('#'+nodes[m].tId+'_span').attr("color","rgba(29,125,228,0.74)");
                          }*/

                     }
                     else
                         alert("提交规则失败！");
                     $("#addModal").modal("hide");
                 } )
             };


        });
       /* $("#novaiForm").validate({

         /!*  { highlight: function( label ) {
         $(label).closest('.experient').removeClass('has-success').addClass('has-error');
         },
         success: function( label ) {
         $(label).closest('.experient').removeClass('has-error');
         label.remove();
         },
         errorPlacement: function( error, element ) {
         var placement = element.closest('.experient');
         if (!placement.get(0)) {
         placement = element;
         }
         if (error.text() !== '') {
         placement.after(error);
         }
         }
         rules:
         itemName: {
         required: true,
         /!*maxlength: 16,
         minlength: 3*!/
         },
         desc:{
         required:"true",
         maxlength:48
         },
         formula:{
         required:"true"
         },
         applyDeadline:{
         required:"true"
         },
         reviewDeadline:{
         required:"true"
         },
         teacherName:{
         required:"true"
         }
         },
         message:{
         itemName:{
         required:"项目名称不能为空！",
         remote:"项目名称不能为空！"
         }
         }*!/
         });*/
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};

    });
   /* function add0(m){return m<10?'0'+m:m }*/
    function format()
    {
        var time = new Date();
        var y = time.getFullYear();
       /* var m = time.getMonth()+1;
        var d = time.getDate();*/

        return y+'-12-31 00:00:00';
    }
    function initRemoveAttr() {
        $("#myname").removeClass("has-error");
        $("#myformula").removeClass("has-error");
        $("#mypara").removeClass("has-error");
        $("#myrevie").removeClass("has-error");
        $("#myapply").removeClass("has-error");
        $("#mymanager").removeClass("has-error");
        $(".experient").hide();
    }
    function initChecked() {
        if(!$("#formula").val()){
            $("#myformula").addClass("has-error");
            $("#experient_formula").show();
        }
        if(!$("#teacherName").val()){
            $("#mymanager").addClass("has-error");
            $("#experient_manager").show();
        }
        if(!$("#applyDeadline").val()){
            $("#myapply").addClass("has-error");
            $("#experient_apply").show();
        }
        if(!$("#reviewDeadline").val()){
            $("#myrevie").addClass("has-error");
            $("#experient_revie").show();
        }
        if(!$(".parameterName").val()){
            $("#mypara").addClass("has-error");
            $("#experient_para").show();
        }
    }
    function initModal() {
        $(".form-control").removeAttr("disabled");
        $('#itemName').val(null);
        $('#desc').val(null);
        $('#teacherName').select2('data',null);
        $("#parentId").attr("disabled", "disabled");
        $(".requiredtime").hide();
        $("#importRequired").find("option[value='1']").removeAttr("selected");
        $("#importRequired").find("option[value='0']").removeAttr("selected");
        $("#importRequired").find("option[value='2']").attr("selected","selected");

        $(".AddPramter").empty();
        $(".addOtherPramter").empty();
        $("#addParameter").removeAttr("disabled");
        $("#addOtherParameter").removeAttr("disabled");
        $('#applyDeadline').val(format());
        $('#reviewDeadline').val(importFormat());
        $('#formula').val(null);
        $(".addOtherPramter").empty();
        $(".addOtherPramter").empty();
        $("#save").show();
        $("#cancel").show();
        $(".manageEdit").hide();
        $(".submitEdit").hide();
    }
    function importFormat() {
        var time = new Date();
        var y = time.getFullYear();
        /* var m = time.getMonth()+1;
         var d = time.getDate();*/

        return y+'-12-28 00:00:00';
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
            $.ajaxSetup({
                async : false
            });
             if(confirm("确认提交？")){
                 $.post(categorySubmitUrl+"?"+str,{test:12},function (data){
                     if(data.status==200){
                         // window.location.reload();
                         ztree();
                         alert("提交规则成功！");

                         /*for(var m=0;m<nodes.length;nodes++){
                          $('#'+nodes[m].tId+'_span').attr("color","rgba(29,125,228,0.74)");
                          }*/

                     }
                     else
                         alert("提交规则失败！");
                     $("#addModal").hide();
                 } )
             };


        });

    }
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    // $("#selectAll").bind("click", selectAll);
}
function reminder(obj) {
    var objValue=obj.value;
    if(!objValue){
        $("#experient_"+obj.name).show();
       $(obj).parent().parent(".form-group").addClass("has-error");

    }
    else{
        $("#experient_"+obj.name).hide();
        $(obj).parent().parent(".form-group").removeClass("has-error");
    }
}
