/*添加或查看规则信息时移除表单验证提示信息*/
function initRemoveAttr() {
    $("#myname").removeClass("has-error");
    $("#mydesc").removeClass("has-error");
    $("#myformula").removeClass("has-error");
    $("#mypara").removeClass("has-error");
    $("#myrevie").removeClass("has-error");
    $("#myapply").removeClass("has-error");
    $("#mymanager").removeClass("has-error");
    $(".experient").hide();
    console.log($(".experient").css("display"));
    if($(".experient").css("display")!="none"){
        $(".experient").css("display","none");
    }
}
/*获取当前年份的最后一天*/
function format() {
    var time = new Date();
    var y = time.getFullYear();
    return y+'-12-31 00:00:00';
}
/*获取当前年份的前两天*/
function importFormat() {
    var time = new Date();
    var y = time.getFullYear();
    return y+'-12-28 00:00:00';
}
/*添加规则信息时移除表单禁用*/
function initModal() {
    $(".form-control").removeAttr("disabled");
    $('#itemName').val(null);
    $('#desc').val(null);
  /*  $('#teacherName').select2('data',null);*/
    $("#teacherName").select2().val(null).trigger("change");
    $("#experient_manager").hide();
    $("#mymanager").removeClass("has-error");
    $(".select2-container").css("width","405px");
    $("#parentId").attr("disabled", "disabled");
    $(".requiredtime").hide();
    $(".maxWork").hide();
    $(".apply_style").hide();
    $("#importRequired option").each(function () {
        console.log($(this).val());
        if ($(this).val() == 2) {
            $(this).attr("selected", true);
        }
        else {
            $(this).removeAttr("selected");
        }
    });
    $("#importRequired").val("2");
    /*          $("#importRequired").find("option[value='1']").removeAttr("selected");
     $("#importRequired").find("option[value='0']").removeAttr("selected");
     $("#importRequired").find("option[value='2']").attr("selected","selected");*/

    $(".AddPramter").empty();
    $(".addOtherPramter").empty();
    $("#addParameter").show();
    $("#addOtherParameter").show();
    $('#applyDeadline').val(format());
    $('#reviewDeadline').val(importFormat());
    $('#formula').val(null);
    /*    $(".addOtherPramter").empty();
     $(".addOtherPramter").empty();*/
    $("#save").show();
    $("#cancel").show();
    $(".manageEdit").hide();
    $(".submitEdit").hide();
}
/*表单验证时的显示函数*/
function reminder(obj) {
    var objValue=obj.value;
     if(!objValue){
        $("#experient_"+obj.name).show();
       $(obj).parent().parent(".form-group").addClass("has-error");
         if(obj.name=="weight"||obj.name=="showweight"||obj.name=="applyweight"){
             $("#experient_"+obj.name).hide();
         }

    }
    else{
        $("#experient_"+obj.name).hide();
        if(obj.name=='para'||obj.name=='parameterSymbol'){
            $("#mypara").removeClass("has-error");
        }
       else {
            $(obj).parent().parent(".form-group").removeClass("has-error");
        }
    }
}
/*移除申报时表单验证的提示信息*/
function removeApplyAttr(){

    $('#itemName').parent().parent(".form-group").removeClass("has-error");
    $('#applyDesc').parent().parent(".form-group").removeClass("has-error");
    $('.parameterName').parent().parent(".form-group").removeClass("has-error");
    $('.otherparameterName').parent().parent(".form-group").removeClass("has-error");
    $('#itemMember').parent().parent(".form-group").removeClass("has-error");
    $('.groupMemberSymbol').parent().parent(".form-group").removeClass("has-error");
    $(".experient").hide();
   /* console.log($(".experient").css("display"));*/
    if($(".experient").css("display")!="none"){
        $(".experient").css("display","none");
    }
}
/*移除重新申请时表单验证的提示信息*/
function removeApplyAgain(){

    $('#applyAgainName').parent().parent(".form-group").removeClass("has-error");
    $('#applyAgainDesc').parent().parent(".form-group").removeClass("has-error");
    $('.applyparameterName').parent().parent(".form-group").removeClass("has-error");
    $('.applyotherparameterName').parent().parent(".form-group").removeClass("has-error");
    $('.showapplyMemberSymbol').parent().parent(".form-group").removeClass("has-error");
    $(".experient").hide();
    if($(".experient").css("display")!="none"){
        $(".experient").css("display","none");
    }
}
/*移除查看申报详情时表单验证的提示信息*/
function removeShowapply() {
    $('#showitemName').parent().parent(".form-group").removeClass("has-error");
    $('#showapplyDesc').parent().parent(".form-group").removeClass("has-error");
    $('.showparameterName').parent().parent(".form-group").removeClass("has-error");
    $('.showotherparameterName').parent().parent(".form-group").removeClass("has-error");
    $('.showgroupMemberSymbol').parent().parent(".form-group").removeClass("has-error");
    $(".experient").hide();
    if($(".experient").css("display")!="none"){
        $(".experient").css("display","none");
    }
}
/*申报/导入时按父子级别展示规则信息*/
function traverseNode(rootNode,targetType) {
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
/*操作日志表格信息*/
function showhistory(data) {
    $(".historyRecTbody").empty();
    var rowInfo = "<tr></tr>";
    var cellInfo = "<td></td>";
    if(data.data.historyList&&data.data.historyList.length>0){
        var analyseList = data.data.historyList;
        var listLength = data.data.historyList.length;
        for (var t = 0; t < listLength; t++) {
            var Info = analyseList[t];
            $(".historyRecTbody").append(rowInfo);

            for (var j = 0; j < 4; j++)//单元格
            {
                $(".historyRecTbody tr:last").append(cellInfo);

            }
            var id = t;
            $(".historyRecTbody tr:last td:eq(0)").text(id+1);
            $(".historyRecTbody tr:last td:eq(1)").text(Info.createTime);
            $(".historyRecTbody tr:last td:eq(2)").text(Info.userName);
            $(".historyRecTbody tr:last td:eq(3)").text(Info.operation);

        }
    }
}
/*申报审核情况的表格信息展示*/
function showapplydata(item) {

    var rowInfo = "<tr></tr>";
    var cellInfo = "<td></td>";
    var listLength = item.length;
    for (var t = 0; t < listLength; t++) {
        var Info = item[t];
        $(".showDesc").append(rowInfo);

        for (var j = 0; j < 8; j++)//单元格
        {
            $(".showDesc tr:last").append(cellInfo);
        }
        var id = t;
        $(".showDesc tr:last").css("text-align","center");
        $(".showDesc tr:last td:eq(0)").text(id + 1);
        $(".showDesc tr:last td:eq(1)").text(Info.teacherName);
        if(Info.proof!=null){
            $(".showDesc tr:last td:eq(2)").append("<span>"+Info.itemName+"</span>"+"<a href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"' style='float: right;cursor: pointer' title='下载附件'><i class='fa fa-download'></i></a>");

        }
        else{
            $(".showDesc tr:last td:eq(2)").append("<span>"+Info.itemName+"</span>"+"<a style='float: right;cursor: pointer' title='下载附件'><i class='fa fa-download'></i></a>");

        }
        var applyType='';
        switch (Info.isGroup){
            case 1:applyType="小组形式";
                break;
            case 0:applyType="个人申报";
                break;
        }
        $(".showDesc tr:last td:eq(3)").text(applyType);    //申报形式

        $(".showDesc tr:last td:eq(4)").text(Info.workload);    //工作当量

        var statusName='';
        switch (Info.status) {
            case -1:
                statusName = '删除状态';
                break;
            case 0:
                statusName = '未提交';
                break;
            case 1:
                statusName = '待审核';
                break;
            case 2:
                statusName = '已通过';
                break;
            case 3:
                statusName = '尚存疑';
                break;
            case 4:
                statusName = '已解惑';
                break;
            case 5:
                statusName = '已拒绝';
                break;
        }
        $(".showDesc tr:last td:eq(5)").text(statusName);
        $(".showDesc tr:last td:eq(5)").attr("id","reviewe_"+Info.itemId);
        var act='';
        switch (Info.status){
            case 1:act = "<a class='btn btn-primary' data-toggle='modal' data-target='#viewdetail_audit' id='btn-audit-viewdetail'>查看详情</a><button class='btn btn-success pass' id='pass_" + Info.itemId + "'>审核通过</button><button class='btn btn-danger refuse' data-toggle='modal' data-target='#refuseModal' id='refuse_" + Info.itemId + "'>审核拒绝</button> ";
            break;
            case 2:act = "<a class='btn btn-primary' data-toggle='modal' data-target='#viewdetail_audit' id='btn-audit-viewdetail'>查看详情</a>";
            break;
            case 5:act = "<a class='btn btn-primary' data-toggle='modal' data-target='#viewdetail_audit' id='btn-audit-viewdetail'>查看详情</a>";
            break;
        }

           $(".showDesc tr:last td:eq(6)").append(act).attr("class","operation-btn-three");

        $(".showDesc tr:last td:eq(7)").text(JSON.stringify(Info));
        $(".showDesc tr:last td:eq(7)").css("display","none");
        // console.log($(".showDesc tr:last td:eq(8)").text());

    }
    var teacherName=new Array();
    $.get(TeacherInfoUrl, {test: 12}, function (data) {
        window.teacherName=data.data.teacherList;
    });
    $(document).on("click","#btn-audit-viewdetail",function (){
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        $("#viewdetail_audit .project").empty();
        $("#viewdetail_audit .message").empty();
        $("#viewdetail_audit tbody").empty();

        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);

        var auditStatus = $(this).parent().prev().text();
        var applicant = $(this).parent().parent().find("td:eq(1)").text();
        var form = $(this).parent().prev().prev().prev().text();

        $("#viewdetail_audit .project").append( "<p class='itemName'>【项目名称】" + jsonInfo.itemName +"</p>");
        $("#viewdetail_audit .message").append(
            "工作当量：" + jsonInfo.workload +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报人：" + applicant +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核状态：" + auditStatus+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报时间："+jsonInfo.applyTime);

        $(".viewDetailTbody").append(rowInfo);
        for( var i=0; i<6; i++){
            $(".viewDetailTbody tr:last").append(cellInfo);
        }
        $(".viewDetailTbody tr:last").css("text-align","center");

        /* 申报描述 */
        $(".viewDetailTbody tr:last td:eq(0)").text(jsonInfo.applyDesc);

        /* 计算公式 */
        $(".viewDetailTbody tr:last td:eq(1)").text(jsonInfo.formula);

        /* 计算参数 */
        var praValues='';
        for( var m = 0; m < jsonInfo.parameterValues.length; m++ ){
            praValues = jsonInfo.paramDesc[m].desc + "（"+jsonInfo.parameterValues[m].symbol +"）：" + jsonInfo.parameterValues[m].value;
            $(".viewDetailTbody tr:last td:eq(2)").append( praValues + "<br>");
        }

        /* 项目属性 */
        var projectProperties='';
        if( jsonInfo.otherJsonParameters && jsonInfo.otherJsonParameters.length ){
            for( var n = 0; n < jsonInfo.otherJsonParameters.length; n++ ){
                projectProperties = jsonInfo.otherJsonParameters[n].key + ":" + jsonInfo.otherJsonParameters[n].value;
                $(".viewDetailTbody tr:last td:eq(3)").append( projectProperties + "<br>");
            }
        }
        if(jsonInfo.isGroup==1){
            $('.checkedView tr').find('td:eq(4)').show();
            $('.checkedView tr').find('td:eq(5)').show();
            $(".groupDesc").show();
            $(".groupWeight").show();
            var countArray=new Array();
            if(jsonInfo.childWeightList!=null){
                for(var p=0;p<jsonInfo.childWeightList.length;p++){
                    for(var q=0;q<window.teacherName.length;q++){
                        if(jsonInfo.childWeightList[p].userId==window.teacherName[q].teacherId){
                            countArray.push(window.teacherName[q].name);
                        }

                    }

                }
            }

            /* 成员权重 */
            var childWeight='';
            if( jsonInfo.childWeightList!=null && jsonInfo.childWeightList.length ){
                for( var t = 0; t < jsonInfo.childWeightList.length; t++ ){
                    childWeight = countArray[t] + "：" + jsonInfo.childWeightList[t].weight;
                    $(".viewDetailTbody tr:last td:eq(4)").append( childWeight + "<br>");
                }
            }
            /* 职责描述 */
            var jobdesc='';
            if( jsonInfo.jobDescList!=null && jsonInfo.jobDescList.length ){
                for( var z = 0; z < jsonInfo.jobDescList.length; z++ ){
                    jobdesc = jsonInfo.jobDescList[z].jobDesc;
                    $(".viewDetailTbody tr:last td:eq(5)").append( jobdesc + "<br>");
                }
            }
            $(".viewDetailTbody tr:last td:eq(4)").css("line-height","28px");
            $(".viewDetailTbody tr:last td:eq(5)").css("line-height","28px");
        }
        else{
            $('.checkedView tr').find('td:eq(4)').hide();
            $('.checkedView tr').find('td:eq(5)').hide();
            $(".groupDesc").hide();
            $(".groupWeight").hide();
        }
        $(".viewDetailTbody tr:last td:eq(2)").css("line-height","28px");
        $(".viewDetailTbody tr:last td:eq(3)").css("line-height","28px");


    });
}
/*审核人负责的导入规则信息展示*/
function showall(menu_list, parent) {
    for (var menu=0;menu<menu_list.length;menu++) {
        //如果有子节点，则遍历该子节点
        if (menu_list[menu].children&&menu_list[menu].children.length > 0) {
            var isShow=traverseNode(menu_list[menu],0);
            if(isShow==0) {
                var li = $("<li></li>");
                $(li).append(menu_list[menu].name).append("<ul></ul>").appendTo(parent);

            }
            showall(menu_list[menu].children, $(li).children().eq(0));
        }
        else if(menu_list[menu].importRequired==0){
            $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append( "<p class='itemMessage'><span class='itemName'>" + menu_list[menu].name + "</span>&nbsp;-&nbsp;<span class='itemDesc'>" + menu_list[menu].desc + "</span></p>" +
                "<p class='deadline'> 审核截止时间:<span class='time_" + menu_list[menu].categoryId + "'>" + menu_list[menu].reviewDeadline + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<button  id='auditor_" + menu_list[menu].categoryId + "' class='btn btn-primary auditor' data-toggle='modal' data-target='.bs-example-modal-lg' style='float: right; margin-top: -3px;'>点击审核</button></p><div style='clear: both;'></div>").appendTo(parent);
            /* $(".hiddendistrict").append("<span class='checkDeadT_"+menu_list[menu].categoryId+"' style='display: none;'>"+getLocalTime(menu_list[menu].reviewDeadline)+"</span>");
             */      }

    }
}
/*审核人负责的审核规则展示*/
function  showimportall(item,parent) {
    for(var i=0;i<item.length;i++){

        //如果有子节点，则遍历该子节点
        if (item[i].children!=null&&item[i].children.length >0) {
            var isShow = traverseNode(item[i], 1);
            if (isShow == 1) {
                var li = $("<li></li>");
                $(li).append( item[i].name ).append("<ul></ul>").appendTo(parent);

            }
            showimportall(item[i].children, $(li).children().eq(0));
        }

        else if(item[i].importRequired==1){
            $("<li class='catInfo_"+item[i].categoryId+"'></li>").append( "<div class='itemMessage'><span class='itemName'>" + item[i].name + "</span>&nbsp;-&nbsp;<span class='itemDesc'>" + item[i].desc + "</span></div>" +
                "<div style='float: right;'><a class='btn importList btn-danger' id='import_"+ item[i].categoryId + "' data-toggle='modal' data-target='#importNewModal' style='float: right; margin-top: 2px;'>点击导入</a>" +
                "<div class='dropdown' style='float: right; margin-top: 2px; margin-right: 10px;'><a class='btn btn-primary dropdown-toggle' href='"+downloadInfoUrl+"?categoryId="+item[i].categoryId+"&type=single'>下载模板</a></div>" +
                "<p class='deadline' style='margin-right: 20px'> 上传截止时间: <span class='time_"+item[i].categoryId+"'>"+item[i].reviewDeadline +
                "</span></p></div><div style='clear: both;'></div></li>").appendTo(parent);

            if(item[i].formulaParameterList!=null&&item[i].formulaParameterList.length>0){

                var obj=item[i].formulaParameterList;
                for(var paraCount=0;paraCount<obj.length;paraCount++){
                    if($("#"+item[i].categoryId+"_"+obj[paraCount].symbol).length<0||$("#"+item[i].categoryId+"_"+obj[paraCount].symbol).length==0){
                        $(".hiddendistrict").append("<div class='importParaDesc paraDesc_"+item[i].categoryId+"' id='"+item[i].categoryId+"_"+obj[paraCount].symbol+"'>"+obj[paraCount].desc+"</div>");

                    }

                }
            }
            if(item[i].otherJsonParameters!=null&&item[i].otherJsonParameters.length>0){

                var otherobj=item[i].otherJsonParameters;
                for(var otherCount=0;otherCount<otherobj.length;otherCount++){
                    if($("#other_"+item[i].categoryId+"_"+otherCount).length<0||$("#other_"+item[i].categoryId+"_"+otherCount).length==0){
                        $(".hiddendistrict").append("<div class='importParaDesc otherparaDesc_"+item[i].categoryId+"' id='other_"+item[i].categoryId+"_"+otherCount+"'>"+otherobj[otherCount].key+"</div>");

                    }
                }
            }
        }

        if(item[i].children.length>0){
            showimportall(item[i].children);
        }
    }
}
/*获取侧边栏和右侧页面信息*/
function getSideBar(role,roleList) {
    $.ajaxSetup({
        async : false
    });
    if(role=="ADMIN"){

        $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",{test : 12},function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
            $(".userName").text(userNameUrl);
            $(".userTeacher").text(userNameUrl+"老师！");
        });
        $.get(pageManageUrl+"?"+"regionName=manager/Manager-right-col",{test : 12},function (html) {
            $(".right_hole").empty();
            $(".right_hole").append(html);

            var teacherInfo='';
            $.get(TeacherInfoUrl,{test : 12},function (data) {
                teacherInfo=data.data.teacherList;
                var selectdata=new Array();
                for(var i=0;i<teacherInfo.length;i++){
                    $('#teacherName').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');
                }
            });
            $("#teacherName").select2({
                placeholder:"",
                allowClear: true,
                width:"100%",
            });

        });

        ztree();
        if(roleList.length==1){
            $("#dropdownMenu1").hide();
        }
    }
    else if(role=="RE"){
        $("#dropdownMenu1").hide();
        if(roleList.length==3){
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher2-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
                $(".userTeacher").text(userNameUrl+"老师！");
            });
            $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });
        }
        else if(roleList.length==2){
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
                $(".userTeacher").text(userNameUrl+"老师！");
            });
            $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });

        }
        else {
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
                $(".userTeacher").text(userNameUrl+"老师！");
            });
            $.get(pageManageUrl+"?"+"regionName=PrimTeachers/checkedRevie",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });
        }
    }
    else{
        if(roleList.length==2){
            $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
                $(".userTeacher").text(userNameUrl+"老师！");
            });
        }

        else{
            $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher1-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
                $(".userTeacher").text(userNameUrl+"老师！");
            });
        }
        $("#dropdownMenu1").hide();
        $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
            $(".right_hole").empty();
            $(".right_hole").append(html);
        });
    }
}
/*从管理员切换到其他角色*/
function changeSideBar(role,roleList) {
    $.ajaxSetup({
        async : false
    });
    if(roleList.length==4){
        $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher2-left-sidebar",{test:12},function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
            $(".userName").text(userNameUrl);
            $(".userTeacher").text(userNameUrl+"老师！");
            pageshow();

        });

        /* applyworkload();*/
        $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
            $(".right_hole").empty();
            $(".right_hole").append(html);
        });

    }
    else if(roleList.length==3){
        for(var t=0;t<roleList.length;t++){
            if(roleList[t].role=="RE"){
                $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",{test:12},function (html) {
                    $(".scroll-view").empty();
                    $(".scroll-view").append(html);
                    $(".userName").text(userNameUrl);
                    $(".userTeacher").text(userNameUrl+"老师！");
                    pageshow();

                });

                /* applyworkload();*/
                $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
                    $(".right_hole").empty();
                    $(".right_hole").append(html);
                });

            }
            else if(roleList[t].role=="LEADER"){
                $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher-left-sidebar",{test:12},function (html) {
                    $(".scroll-view").empty();
                    $(".scroll-view").append(html);
                    $(".userName").text(userNameUrl);
                    $(".userTeacher").text(userNameUrl+"老师！");
                });
                $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
                    $(".right_hole").empty();
                    $(".right_hole").append(html);
                });
            }
        }

    }

    else {
        for(var leng=0;leng<roleList.length;leng++){
            if(roleList[leng].role=="RE"){
                $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",{test:12},function (html) {
                    $(".scroll-view").empty();
                    $(".scroll-view").append(html);
                    $(".userName").text(userNameUrl);
                    $(".userTeacher").text(userNameUrl+"老师！");
                    pageshow();
                });
                $.get(pageManageUrl+"?"+"regionName=PrimTeachers/checkedRevie",function (html) {
                    $(".right_hole").empty();
                    $(".right_hole").append(html);
                });
                //   importWorkload();
                return;
            }
            else if(roleList[leng].role=="TE"){
                $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher1-left-sidebar",{test:12},function (html) {
                    $(".scroll-view").empty();
                    $(".scroll-view").append(html);
                    $(".userName").text(userNameUrl);
                    $(".userTeacher").text(userNameUrl+"老师！");
                });
                $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
                    $(".right_hole").empty();
                    $(".right_hole").append(html);
                });
            }
        }
    }
}
/*从其他角色切换至管理员*/
function changeToManager() {
    $.ajaxSetup({
        async : false
    });
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",{test:12},function (html) {
        $(".scroll-view").empty();
        $(".scroll-view").append(html);
        $(".userName").text(userNameUrl);
        $(".userTeacher").text(userNameUrl+"老师！");
        pageshow();
    });
    jumpToAdd();
}
/*导入工作当量部分展示表格信息*/
function showImportPreview(data,itemCount) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";

    if(data&&data.length>0){
        var analyseList= data;
        var listLength= data.length;
        for(var i=0;i<listLength;i++)
        {
            var Info=analyseList[i];
            $(".importItemTbody").append(rowInfo);
            $(".importItemTbody tr:last").attr("class","resetNum");
            for(var j=0;j<6;j++)//单元格
            {
                $(".importItemTbody tr:last").append(cellInfo);
                $(".importItemTbody tr:last").attr("class","trDele_"+Info.itemId);
            }

            $(".importItemTbody tr:last").css("text-align","center");
              var checkboxStr='<input type="checkbox" name="checkbox1" value="checkbox" class="submitmyself" id="'+Info.itemId+'">' ;
            var anotherboxStr='<input type="checkbox" name="checkbox1" value="checkbox" class="anothersubmit" id="'+Info.itemId+'">' ;

            $(".importItemTbody tr:last td:eq(1)").text(Info.itemName);
            $(".importItemTbody tr:last td:eq(1)").attr("id","itemName_"+itemCount);

            $(".importItemTbody tr:last td:eq(2)").text(Info.workload);
            $(".importItemTbody tr:last td:eq(2)").attr("id","workload_"+itemCount);
            $(".importItemTbody tr:last td:eq(3)").text(Info.teacherName);
            $(".importItemTbody tr:last td:eq(3)").attr("id","teacherName_"+itemCount);
            var str="<a class='btn btn-primary showImportAll' id='showImportAll_"+ itemCount+"' data-toggle='modal' data-target='#addContent'>查看详情</a><a class='btn btn-primary deleteAll delet_"+itemCount+"' id='deleteAll_"+ Info.itemId+"'>删除操作</a>";
            var anotherstr="<a class='btn btn-primary showImportAll' id='showImportAll_"+ itemCount+"' data-toggle='modal' data-target='#addContent'>查看详情</a>";

            var statusName='';
            switch (Info.status){
                case 0:statusName="未提交";
                    $(".importItemTbody tr:last td:eq(0)").append(checkboxStr);
                    $(".importItemTbody tr:last td:eq(5)").append(str);

                    break;
                case 1:statusName="待复核";
                    $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                    $(".anothersubmit:last").attr("disabled","disabled");
                    $(".importItemTbody tr:last td:eq(5)").append(anotherstr);
                    break;
                case 2:statusName="已通过";
                    $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                    $(".anothersubmit:last").attr("disabled","disabled");
                    $(".importItemTbody tr:last td:eq(5)").append(anotherstr);

                    break;
                case 3:statusName="尚存疑";
                    $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                    $(".anothersubmit:last").attr("disabled","disabled");
                    $(".importItemTbody tr:last td:eq(5)").append(anotherstr);

                    break;
                case 4:statusName="已解惑";
                    $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                    $(".anothersubmit:last").attr("disabled","disabled");
                    $(".importItemTbody tr:last td:eq(5)").append(anotherstr);

                    break;
                case 5:statusName="已拒绝";
                    break;
            }

            $(".importItemTbody tr:last td:eq(4)").text(statusName);
            $(".importItemTbody tr:last td:eq(4)").attr("class","status_"+Info.itemId);

            $(".importItemTbody tr:last td:eq(5)").attr("class","operation-btn-two");

            itemCount++;

        }
    }
    else if(typeof(data)!="undefined"){
        $(".importItemTbody").append(rowInfo);
        $(".importItemTbody tr:last").attr("class","resetNum");
        for(var j=0;j<6;j++)//单元格
        {
            $(".importItemTbody tr:last").append(cellInfo);
            $(".importItemTbody tr:last").attr("class","trDele_"+data.itemId);
        }
        $(".importItemTbody tr:last").css("text-align","center");
        /* var checkboxStr='<div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>'
         */   var checkboxStr='<input type="checkbox" name="checkbox1" value="checkbox" class="submitmyself" id="'+data.itemId+'">' ;
        var anotherboxStr='<input type="checkbox" name="checkbox1" value="checkbox" class="anothersubmit" id="'+data.itemId+'">' ;

        $(".importItemTbody tr:last td:eq(1)").text(data.itemName);
        $(".importItemTbody tr:last td:eq(1)").attr("id","itemName_"+itemCount);

        $(".importItemTbody tr:last td:eq(2)").text(data.workload);
        $(".importItemTbody tr:last td:eq(2)").attr("id","workload_"+itemCount);
        $(".importItemTbody tr:last td:eq(3)").text(data.teacherName);
        $(".importItemTbody tr:last td:eq(3)").attr("id","teacherName_"+itemCount);
        var str="<a class='btn btn-primary showImportAll' id='showImportAll_"+ itemCount+"' data-toggle='modal' data-target='#addContent'>查看详情</a><a class='btn btn-primary deleteAll delet_"+itemCount+"' id='deleteAll_"+ data.itemId+"'>删除操作</a>";
        var anotherstr="<a class='btn btn-primary showImportAll' id='showImportAll_"+ itemCount+"' data-toggle='modal' data-target='#addContent'>查看详情</a>";

        var statusName='';
        switch (data.status){
            case 0:statusName="未提交";
                $(".importItemTbody tr:last td:eq(0)").append(checkboxStr);
                $(".importItemTbody tr:last td:eq(5)").append(str);

                break;
            case 1:statusName="待复核/待审核";
                $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                $(".anothersubmit:last").attr("disabled","disabled");
                $(".importItemTbody tr:last td:eq(5)").append(anotherstr);
                break;
            case 2:statusName="已通过";
                $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                $(".anothersubmit:last").attr("disabled","disabled");
                $(".importItemTbody tr:last td:eq(5)").append(anotherstr);

                break;
            case 3:statusName="尚存疑";
                $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                $(".anothersubmit:last").attr("disabled","disabled");
                $(".importItemTbody tr:last td:eq(5)").append(anotherstr);

                break;
            case 4:statusName="已解惑";
                $(".importItemTbody tr:last td:eq(0)").append(anotherboxStr);
                $(".anothersubmit:last").attr("disabled","disabled");
                $(".importItemTbody tr:last td:eq(5)").append(anotherstr);

                break;
            case 5:statusName="已拒绝";
                break;
        }

        $(".importItemTbody tr:last td:eq(4)").text(statusName);
        $(".importItemTbody tr:last td:eq(4)").attr("class","status_"+data.itemId);

        $(".importItemTbody tr:last td:eq(5)").attr("class","operation-btn-two");

        itemCount++;

    }

}
/*判断切换角色时样式*/
function pageshow() {
    if ($BODY.hasClass('nav-sm'))  {
        $SIDEBAR_MENU.find('li.active-sm ul').show();
        $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        $(".profile_info").show();
        $(".child_menu").show();
        $BODY.toggleClass('nav-md nav-sm');
    }
}
/*获取展示页面信息*/
function revieMyWorkload() {
    $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
        $(".right_hole").empty();
        $(".right_hole").append(html);
    });
}
function checkedRevie() {
    $.get(pageManageUrl+"?"+"regionName=PrimTeachers/checkedRevie",function (html) {
        $(".right_hole").empty();
        $(".right_hole").append(html);
    });
}
/*验证导入时上传文件是否为excell格式*/
function getFileType(obj) {
    var photoExt=obj.value.substr(obj.value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
    console.log(photoExt);
    if(photoExt==".xls"||photoExt==".xlsx"){

    }
    else{
        alert("请上传正确格式的Excell表格！");
        return false;
    }
}