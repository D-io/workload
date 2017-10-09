/**
 * Created by SBWang on 2017/9/13.
 */
/*申报人申报工作当量*/
function applyworkload() {
    $.ajaxSetup({
        async: false
    });
    $('.right_hole').empty();
    $.get(pageManageUrl + "?" + 'regionName=PrimTeachers/applyWorkload', {test: 12}, function (result) {
        $('.right_hole').append(result);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.teacherName').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }
        });
        $(".teacherName").select2({
            placeholer:"",
            allowClear: true,
            width: "100%",
        });

    });
    $(".x_panel").css('min-height',$('.right_col').height());
    /*声明一个数组Temp保存某一规则下的所有条目*/
    var Temp = new Array();
    /*声明变量Categry来记录数组下标*/
    var Categry = "";
    $.get(categoryInfoListUrl, {test: 12}, function (data) {
        var parent = $("<ul></ul>");
        showapplyall(data.data.categoryTree, parent);
        $("#tab_content1").append(parent);
        function showapplyall(menu_list, parent) {
            for (var menu = 0; menu < menu_list.length; menu++) {
                //如果有子节点，则遍历该子节点
                if (menu_list[menu].children.length > 0) {
                    var isShow = traverseNode(menu_list[menu], 0);
                    if (isShow == 0) {
                        var li = $("<li></li>");
                        $(li).append( menu_list[menu].name ).append("<ul></ul>").appendTo(parent);

                    }
                    showapplyall(menu_list[menu].children, $(li).children().eq(0));
                }
                else if (menu_list[menu].importRequired == 0) {
                    $("<li class='item_" + menu_list[menu].categoryId + "'></li>").append( "<p class='itemMessage'><span class='itemName'>" + menu_list[menu].name + "</span>&nbsp;-&nbsp;<span class='itemDesc'>" + menu_list[menu].desc + "</span></p>" +
                        "<p class='deadline'> 申报截止时间：<span class='time_" + menu_list[menu].categoryId + "'>" + menu_list[menu].applyDeadline + "</span> <span style='display: none;' class='revieDeadline_" + menu_list[menu].categoryId + "'>" + menu_list[menu].reviewDeadline + "</span> &nbsp;&nbsp;&nbsp;&nbsp; <button  id='apply_" + menu_list[menu].categoryId + "' class='btn btn-primary apply "+ menu_list[menu].isSingle+"' data-toggle='modal' data-target='#applyModal' style='float: right; margin-top: -2px;'>点击申报</button> </p> <div style='clear: both;'></div>").appendTo(parent);
                }
            }
        }
        $(document).off("click", ".apply");
        $(document).on("click", ".apply", function () {
            //$(".panel-default").toggle("show");
            var thisclass=parseInt($(this).attr("class").match(/\d+/g));
            $("#mygroup").prop("checkded","false");
            $("#mysingle").prop("checkded","checked");
            $("#group").prop("checkded","false");
            $("#single").prop("checkded","checked");
            if(thisclass==1){
                $(".applyradio").hide();

            }
            else{
                $(".applyradio").show();
            }
            $('.applymodalbody').empty();
            var myseleFlag = this.id;
            var reg = parseInt(myseleFlag.match(/\d+/g));
            window.Categry = reg;
            $.get(itemGroupUrl + "?" + 'categoryId=' + reg, function (data) {
                if (data.data.itemList && data.data.itemList.length > 0) {
                    var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable"><thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">项目名称</th> ' +
                        '<th class="sorting">工作当量</th><th class="sorting">审核状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                    $(".applymodalbody").append(tablestr);

                    var rowInfo = "<tr></tr>";
                    var cellInfo = "<td></td>";
                    var analyseList = data.data.itemList;
                    var listLength = data.data.itemList.length;
                    for (var t = 0; t < listLength; t++) {
                        var Info = analyseList[t];
                        $(".tbody").append(rowInfo);

                        for (var j = 0; j < 5; j++)//单元格
                        {
                            $(".tbody tr:last").append(cellInfo);
                        }
                        var id = t + 1;
                        $(".tbody tr:last").attr("class","tbodyTr_"+id).css("text-align","center");
                        $(".tbody tr:last td:eq(0)").text(id);
                        $(".tbody tr:last td:eq(0)").attr("class", "itemCount");
                        $(".tbody tr:last td:eq(1)").append("<span id='itemname_"+Info.itemId+"'>"+Info.itemName+"</span><a href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"' style='float: right'></a>");
                        $(".tbody tr:last td:eq(2)").text(Info.workload);
                        $(".tbody tr:last td:eq(2)").attr("id", "workload_" + Info.itemId);
                        var act='';
                           var statusName='';
                        if(Info.status==0){
                            if(Info.proof!=null){
                                 act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + id + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + id + "'>删除操作</a><a class='btn btn-primary' id='proof_"+Info.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"'>下载附件</a>";

                            }
                            else{
                                act = "<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + id + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + id + "'>删除操作</a> ";

                            }
                        }
                        else{
                            if(Info.proof!=null){
                                act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + id + "'>查看详情</a><a class='btn btn-primary' id='proof_"+Info.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"'>下载附件</a>";

                            }
                            else{
                                 act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + id + "'>查看详情</a>";

                            }
                        }

                        switch (Info.status) {
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
                        $(".tbody tr:last td:eq(3)").text(statusName);
                        $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);
                        $(".tbody tr:last td:eq(4)").append(act);
                        $(".tbody tr:last td:eq(4)").attr("class","operation-btn-three").attr("id","three_"+Info.itemId);
                    }
                }
                window.Temp=[];
                window.Temp = data.data.itemList;
                if(data.data.itemList==null){
                    window.Temp=[];
                }

            });
            $(".appendArial").empty();
            $(".appendArial").append("<p class='project'><p class='itemName'>【规则名称】 " + $(this).parent().prev().find(".itemName").text() + "</p></p>" +
                "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
                "<p class='message'>申报截止时间：" + $(this).prev().prev().text() + "</p>"
            );

            $("#parameterTable").empty();
            $("#otherparameterTable").empty();
            $("#showparameterTable").empty();
            $("#showotherparameterTable").empty();
            comparePara(data.data.categoryTree, reg);

        });

    });

    function comparePara(item, para) {
        for (var comp = 0; comp < item.length; comp++) {
            if (item[comp].categoryId == para) {
                if(item[comp].formulaParameterList!=null&&item[comp].formulaParameterList!=''){
                    for (var t = 0; t < item[comp].formulaParameterList.length; t++) {
                        var symbolname = item[comp].formulaParameterList[t].symbol;

                        $('#parameterTable').append("<tr><th class='pramterDesc' id='" + symbolname + "' style='font-size: 13px;'>" + item[comp].formulaParameterList[t].desc + "</th><td><input type='text' class='parameterName form-control' name='para' onblur='reminder(this)'></td></tr>");
                        $("#showparameterTable").append("<tr><th class='showpramterDesc' id='" + symbolname + "' style='font-size: 13px;'>" + item[comp].formulaParameterList[t].desc + "</th><td><input type='text' class='showparameterName form-control' name='showpara' onblur='reminder(this)'></td></tr>")
                    }
                }
               if(item[comp].otherJsonParameters!=null&&item[comp].otherJsonParameters!=''){
                   for (var s = 0; s < item[comp].otherJsonParameters.length; s++) {

                       $('#otherparameterTable').append("<tr><th class='otherPramterkey' style='font-size: 13px'>" + item[comp].otherJsonParameters[s].key + "</th><td><input type='text' class='otherparameterName form-control' name='otherpara' onblur='reminder(this)'></td></tr>");
                       $('#showotherparameterTable').append("<tr><th class='showotherPramterkey' style='font-size: 13px;'>" + item[comp].otherJsonParameters[s].key + "</th><td><input type='text' class='showotherparameterName form-control' name='showotherpara' onblur='reminder(this)'></td></tr>");
                   }
               }

            }
            else if (item[comp].children) {
                comparePara(item[comp].children, para);
            }
        }
    }

    var contentCount = 0;
    var teacherList='';
    $.get(TeacherInfoUrl, {test: 12}, function (data) {
        window.teacherList=data.data.teacherList;
    });
    /*根据Temp数组的内容和按钮对应的index查看详情*/
    $(document).on("click", ".showContent", function () {
        var newId = this.id;
        var newReg = parseInt(newId.match(/\d+/g));
        removeShowapply();
        window.contentCount=newReg;

        $(".savemyApplyAgain").hide();
        $(".dismissagain").hide();
        $("#showitemmanager").select2().val(userId).trigger("change");
        $("#showitemmanager").attr("disabled","disabled");
        $(".select2-container").css("width","100%");
        $(".editApply").hide();
        $(".editSubmit").hide();

        if ($("#statusChange_" + window.Temp[newReg-1].itemId).text() == "未提交") {
            $(".editApply").show();
            $(".editApply").attr("id", "editApply_" + window.Temp[newReg - 1].itemId);
            $(".editSubmit").show();
            $(".editSubmit").attr("id", "editSubmit_" + window.Temp[newReg - 1].itemId);
        }
        if (window.Temp[newReg - 1].isGroup == 0) {
            $("#single").attr("checked", 'checked');
            $("#group").attr("disabled", "true");
            $(".showitem_manager").hide();
            $(".showitem_group").hide();
            $(".showgroupDiv").hide();
           // $(".applyradio").hide();
            $("#showAddgroupPramter").empty();
        }
        else {
            $("#group").attr("checked", 'checked');
            $("#single").attr("disabled", "true");
            $(".showitem_manager").show();
            $(".showitem_group").show();
            $(".showgroupDiv").show();
            $(".applyradio").show();
            $("#showgroupWorkload").empty();

         //   $("#showitemmanager").select2().val(window.Temp[newReg - 1].groupManagerId).trigger("change");
            $("#showitemmanager").attr("disabled", "true");
            $("#showcalculator").attr("disabled", "true");
            $('#showAddgroupPramter').empty();
            var matchArry=new Array();
            for(var p=0;p<window.Temp[newReg-1].childWeightList.length;p++){
                for(var q=0;q<window.teacherList.length;q++){
                    if(window.Temp[newReg-1].childWeightList[p].userId==window.teacherList[q].teacherId){
                        matchArry.push(window.teacherList[q].name);
                    }

                }

            }
            var addStr = '';

            for (var pramterCount = 0; pramterCount < window.Temp[newReg - 1].jobDescList.length; pramterCount++) {

                var addStr = "<tr><td><select class='showgroupMemberName teacherName'></select></td><td><input type='text' class='showgroupMemberSymbol' name='showpara' onblur='reminder(this)'></td><td style='position: absolute'><input type='text' class='showgroupMemberWeight' name='showotherpara' onblur='reminder(this)'><button type='button' class='btn btn-danger removeOtherRow removeRow' style='position: absolute; top: 12px; right: -22px;'><i class='fa fa-trash'></i></button></td></tr>";
                $('#showAddgroupPramter').append(addStr);

                for (var i = 0; i < window.teacherList.length; i++) {
                    $('.showgroupMemberName:last').append('<option value=\"' + window.teacherList[i].teacherId + '\">' + window.teacherList[i].name + '</option>');
                }

                $(".teacherName").select2({
                    placeholder:"",
                    allowClear: true,
                    width: "100%",
                });
                $(".showgroupMemberName").eq(pramterCount).select2().val(window.Temp[newReg - 1].jobDescList[pramterCount].userId).trigger("change");
                $(".showgroupMemberSymbol").eq(pramterCount).val(window.Temp[newReg - 1].jobDescList[pramterCount].jobDesc);
                $(".showgroupMemberWeight").eq(pramterCount).val(window.Temp[newReg - 1].childWeightList[pramterCount].weight);
                $("#showgroupWorkload").append("<tr><td style='width: 190px;text-align: center'>"+matchArry[pramterCount]+"</td><td style='width: 190px;text-align: center'>"+window.Temp[newReg-1].childWeightList[pramterCount].workload+"</td></tr>");

            }
            $(".removeRow").attr("disabled","disabled");
            $(".select2-container").css("width","100%");
            $(".showgroupMemberName").attr("disabled", "true");
            $(".showgroupMemberSymbol").attr("disabled", "true");
            $(".showgroupMemberWeight").attr("disabled", "true");

        }

        $("#revfile").attr("disabled","disabled");
        $("input[name='revfile']").css({"color":"transparent","width":"80px"});
        $(".showagain").text(window.Temp[newReg-1].fileName).css("line-height","26px");
        $("#showitemName").val(window.Temp[newReg - 1].itemName);
        $("#showitemName").attr("disabled", "true");
        $("#showapplyDesc").val(window.Temp[newReg - 1].applyDesc);
        $("#showapplyDesc").attr("disabled", "true");
        $("#showaddGroupMessage").attr("disabled", "true");
        var showPram = window.Temp[newReg - 1].parameterValues;
        for (var i = 0; i < showPram.length; i++) {
            $(".showparameterName").eq(i).val(showPram[i].value);
            $(".showparameterName").eq(i).attr("disabled", "true");

        }
        var showOtherPara = window.Temp[newReg - 1].otherJsonParameters;
        if (showOtherPara != null) {
            for (var n = 0; n < showOtherPara.length; n++) {
                $(".showotherparameterName").eq(n).val(showOtherPara[n].value);

            }
        }
        $(".showotherparameterName").attr("disabled", "true");

    });
    /*编辑保存*/
    $(document).off("click", ".savemyApplyAgain");
    $(document).on("click", ".savemyApplyAgain", function () {
        var saveId = this.id;
        var saveReg = parseInt(saveId.match(/\d+/g));

        if(!$('#showitemName').val()){
            $('#showitemName').parent().parent(".form-group").addClass("has-error");
            $("#experient_showname").show();
            return false;
        }
        if(!$('#showapplyDesc').val()){
            $('#showapplyDesc').parent().parent(".form-group").addClass("has-error");
            $("#experient_showdesc").show();
            return false;
        }
        if($('.showparameterName').length>0){
            if(!$('.showparameterName').val()){
                $('.showparameterName').parent().parent(".form-group").addClass("has-error");
                $("#experient_showpara").show();
                return false;
            }
            else{
                var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
                for(var z=0;z<$('.showparameterName').val().length;z++){
                    var nubmer = $('.showparameterName').eq(z).val();
                    if (!re.test(nubmer)) {
                        alert("计算参数请填写数字！");
                        return false;
                    }
                }

            }
        }
        if($('.showotherparameterName').length>0){
            if(!$('.showotherparameterName').val()){
                $('.showotherparameterName').parent().parent(".form-group").addClass("has-error");
                $("#experient_showotherpara").show();
                return false;
            }
        }
        var radio = $("input:radio[name='showoptionsRadios']:checked");
        if(radio.val()==1){
            if($(".showgroupMemberSymbol").length>1){
                if(!$('.showgroupMemberSymbol').val()){
                    $('.showgroupMemberSymbol').parent().parent(".form-group").addClass("has-error");
                    $("#experient_showgroup").show();
                    $("#experient_showweight").hide();
                    return false;
                }
                if(!$('.showgroupMemberWeight').val()){
                    $('.showgroupMemberWeight').parent().parent(".form-group").addClass("has-error");
                    $("#experient_showgroup").show();
                    $("#experient_showweight").hide();
                    return false;
                }
                else{
                    var sumCount=0;
                    for(var t=0;t<$('.showgroupMemberWeight').length;t++){
                        console.log($('.showgroupMemberWeight').eq(t).val());
                        sumCount+=parseFloat($('.showgroupMemberWeight').eq(t).val());
                    }
                    if(sumCount!=1){
                        $('.showgroupMemberWeight').parent().parent(".form-group").addClass("has-error");
                        $("#experient_showgroup").hide();
                        $("#experient_showweight").show();
                        return false;
                    }
                    else {
                        $("#experient_showweight").hide();
                    }
                }
            }
            else {
                alert("小组人数应不少于2！");
                return false;
            }
        }

        var $parametername = $(".showpramterDesc");
        var newArray = new Array();
        for (var i = 0; i < $(".showparameterName").length; i++) {
            var dom = $(".showpramterDesc").eq(i).attr("id");
            newArray.push({symbol: dom, value: parseInt($(".showparameterName").eq(i).val())});

        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();
        var otherPramterkey = $(".showotherPramterkey");
        if(otherPramterkey.length>0){
            for (var j = 0; j < otherPramterkey.length; j++) {
                var otherKey = $(".showotherPramterkey").eq(j);
                otherArray.push({key: otherKey.text(), value: $(".showotherparameterName").eq(j).val()});

            }
            otherArray = JSON.stringify(otherArray);
        }
       else{
            otherArray =null;
        }
        if ($("#showAddgroupPramter").find("td").length > 0) {
            var grouparray = new Array();
            //   var sumArray=new Array();
            var groupmessageArray = $('.showgroupMemberName');
            for (var c = 0; c < groupmessageArray.length; c++) {
                grouparray.push({
                    userId: parseInt($(".showgroupMemberName option:selected").eq(c).val()),
                    jobDesc: $(".showgroupMemberSymbol").eq(c).val()
                });

            }
            grouparray = JSON.stringify(grouparray);

            var childWeight = new Array();
            for (m = 0; m < groupmessageArray.length; m++) {
                childWeight.push({
                    userId: parseInt($(".showgroupMemberName option:selected").eq(m).val()),
                    weight: parseFloat($(".showgroupMemberWeight").eq(m).val())
                });
            }
            childWeight = JSON.stringify(childWeight);
        }
        else {
            var childWeight = new Array();
            childWeight = [{userId: parseInt(userId), weight: 1}];
            childWeight = JSON.stringify(childWeight);
        }

        // var applicant = $('#applicant option:selected');
        var itemmanager = $('#showitemmanager option:selected');

        if (radio.val() == 1) {
            $.ajax({
                type: "POST",
                url: itemManageUrl,
                data: {
                    categoryId: window.Categry,
                    itemId: saveReg,
                    itemName: $('#showitemName').val(),
                    applyDesc: $('#showapplyDesc').val(),
                    //   workload: $('#workload').val(),
                    //   ownerId: applicant.val(),
                    groupManagerId: itemmanager.val(),
                    isGroup: 1,
                    jsonParameter: newArray,
                    otherJson: otherArray,
                    jobDesc: grouparray,
                    jsonChildWeight: childWeight,
                    option: "modify"

                },
                success: function (data) {

                    var msg = data.data.item;
                    window.Temp.splice(window.contentCount - 1, 1, msg);
                    if($("#revfile").val()){
                        var formdata = new FormData;
                        formdata.append("file", $("#revfile")[0].files[0]);
                        $.ajax({
                            url: importProofUrl + "?itemId=" + msg.itemId,
                            type: "POST",
                            dataType: "JSON",
                            data: formdata,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                if(data.status==200){
                                    alert("修改成功!");
                                    var file = $("#revfile")
                                    file.after(file.clone().val(""));
                                    file.remove();
                                    $("#revfile").attr("disabled","disabled");
                                    $("input[name='revfile']").css({"color":"transparent","width":"80px"});
                                    $(".showagain").text(data.data.itemDto.fileName);
                                    window.Temp.splice(window.contentCount - 1,1,data.data.itemDto);
                                    msg=data.data.itemDto;
                                    if($("#proof_"+data.data.itemDto.itemId).length>0){
                                        $("#proof_"+data.data.itemDto.itemId).attr("href",fileInfoUrl+"?fileInfoId="+data.data.fileInfo.fileInfoId);
                                    }
                                    else{

                                        $("#three_"+data.data.itemDto.itemId).append("<a class='btn btn-primary' id='proof_"+data.data.itemDto.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+data.data.itemDto.proof+"'>下载附件</a>")
                                    }
                                }

                                else{
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                    return false;
                                }
                            },
                            error:function () {
                                alert("文件已存在！请修改文件名或文件内容后重新上传！");
                            }

                        });
                    }
                    else{
                        alert("修改成功!");
                    }
                    $(".editApply").show();
                    $(".editSubmit").show();

                    $("#workload_" + msg.itemId).text(msg.workload);
                    $("#itemname_" + msg.itemId).text(msg.itemName);
                    $(".form-control").attr("disabled", "disabled");
                    $(".removeRow").attr("disabled","disabled");
                    $("#showaddGroupMessage").attr("disabled","disabled");
                    $("#showcalculator").attr("disabled","disabled");
                    $(".showgroupMemberName ").attr("disabled","disabled");
                    $(".showgroupMemberSymbol").attr("disabled","disabled");
                    $(".showgroupMemberWeight").attr("disabled","disabled");
                    $("#year").removeAttr("disabled");
                    $("#term").removeAttr("disabled");
                    $("#revfile").attr("disabled","disabled");
                    $(".dismissagain").hide();
                    $(".savemyApplyAgain").hide();
                    $(".editApply").show();
                    $(".editSubmit").show();

                }

            })
        }
        else {
            $.ajax({
                type: "POST",
                url: itemManageUrl,
                data: {
                    categoryId: window.Categry,
                    itemId: saveReg,
                    itemName: $('#showitemName').val(),
                    applyDesc: $('#showapplyDesc').val(),
                    isGroup: 0,
                    jsonParameter: newArray,
                    otherJson: otherArray,
                    //  jsonChildWeight: childWeight,
                    option: "modify"

                }
                , success: function (data) {
                    var msg = data.data.item;
                    window.Temp.splice(window.contentCount-1, 1, msg);
                    if($("#revfile").val()){
                        var formdata = new FormData;
                        formdata.append("file", $("#revfile")[0].files[0]);
                        $.ajax({
                            url: importProofUrl + "?itemId=" + msg.itemId,
                            type: "POST",
                            dataType: "JSON",
                            data: formdata,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                if(data.status==200){
                                    alert("修改成功!");
                                    var file = $("#revfile")
                                    file.after(file.clone().val(""));
                                    file.remove();
                                    $("#revfile").attr("disabled","disabled");
                                    $("input[name='revfile']").css({"color":"transparent","width":"80px"});
                                    $(".showagain").text(data.data.itemDto.fileName);
                                    window.Temp.splice(window.contentCount - 1,1,data.data.itemDto);
                                    msg=data.data.itemDto;
                                    if($("#proof_"+data.data.itemDto.itemId).length>0){
                                        $("#proof_"+data.data.itemDto.itemId).attr("href",fileInfoUrl+"?fileInfoId="+data.data.fileInfo.fileInfoId);
                                    }
                                    else{

                                        $("#three_"+data.data.itemDto.itemId).append("<a class='btn btn-primary' id='proof_"+data.data.itemDto.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+data.data.itemDto.proof+"'>下载附件</a>")
                                    }
                                }

                                else{
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                    // return false;
                                }

                            },
                            error:function () {
                                alert("文件已存在！请修改文件名或文件内容后重新上传！");
                            }

                        });
                    }
                    else{
                        alert("修改成功!");
                    }

                    $("#workload_" + msg.itemId).text(msg.workload);
                    $("#itemname_" + msg.itemId).text(msg.itemName);
                    $(".form-control").attr("disabled", "disabled");
                    $(".showgroupMemberName ").attr("disabled","disabled");
                    $(".showgroupMemberSymbol").attr("disabled","disabled");
                    $(".showgroupMemberWeight").attr("disabled","disabled");
                    $("#revfile").attr("disabled","disabled");
                    $("#year").removeAttr("disabled");
                    $("#term").removeAttr("disabled");
                    $(".dismissagain").hide();
                    $(".savemyApplyAgain").hide();
                    $(".editApply").show();
                    $(".editSubmit").show();
                }
            });
        }
    });
    /*添加条目信息时清除表单信息*/
    $(document).off('click','.add');
    $(document).on('click','.add',function () {

        removeApplyAttr();
        $(".form-control").removeAttr("disabled");
        $(".savemyApply").removeAttr("id");
        $(".parameterName").removeAttr("disabled");
        $("#testfile").removeAttr("disabled");
        $(".showhidden").text("");
        $('.otherparameterName').removeAttr("disabled");
        $('#itemName').val(null);
        $('#applyDesc').val(null);
        $('#workload').val(null);
        $("#AddgroupPramter").empty();
        $("#itemmanager").select2().val(userId).trigger("change").css("width","100%");
        $(".select2-container").css("width","100%");
        $("#itemmanager").attr("disabled","disabled");
        $('.parameterName').val(null);
        $('.otherparameterName').val(null);
        $(".radioChange").eq(0).attr("checked","true");
        $(".radioChange").eq(1).removeAttr("checked");
        $(".item_manager").hide();
        $("#addGroupMessage").removeAttr("disabled");
        $("#calculator").removeAttr("disabled");
        $(".item_group").hide();
        $(".groupDiv").hide();
        $(".dismiss").show();
        $(".saveAgain").hide();
        $(".savemyApply").show();
        $(".newsubmit").hide();
        $(".neweditor").hide();
    });
    /*申报时保存修改*/
    $(document).off("click",".savemyApply");
    $(document).on("click", ".savemyApply", function () {
        if(!$('#itemName').val()){
            $('#itemName').parent().parent(".form-group").addClass("has-error");
            $("#experient_name").show();
            return false;
        }
        if(!$('#applyDesc').val()){
            $('#applyDesc').parent().parent(".form-group").addClass("has-error");
            $("#experient_desc").show();
            return false;
        }
        if($('.parameterName').length>0){
            if(!$('.parameterName').val()){
                $('.parameterName').parent().parent(".form-group").addClass("has-error");
                $("#experient_para").show();
                return false;
            }
            else{
                var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
                for(var z=0;z<$('.parameterName').val().length;z++){
                    var nubmer = $('.parameterName').eq(z).val();
                    if (!re.test(nubmer)) {
                        alert("计算参数请填写数字！");
                        return false;
                    }
                }

            }
        }
        if($('.otherparameterName').length>0){
            if(!$('.otherparameterName').val()){
                $('.otherparameterName').parent().parent(".form-group").addClass("has-error");
                $("#experient_otherpara").show();
                return false;
            }
        }
        var radio = $("input:radio[name='optionsRadios']:checked");
        if(radio.val()==1){
            if($(".groupMemberSymbol")&&$(".groupMemberSymbol").length>1){
                if(!$('.groupMemberSymbol').val()){
                    $('.groupMemberSymbol').parent().parent(".form-group").addClass("has-error");
                    $("#experient_group").show();
                    $("#experient_weight").hide();
                    return false;
                }
                if(!$('.groupMemberWeight').val()){
                    $('.groupMemberWeight').parent().parent(".form-group").addClass("has-error");
                    $("#experient_group").show();
                    $("#experient_weight").hide();
                    return false;
                }
                else{
                    var sumCount=0;
                    for(var t=0;t<$('.groupMemberWeight').length;t++){
                        sumCount+=parseFloat($('.groupMemberWeight').eq(t).val());
                    }
                    if(sumCount!=1){
                        $('.groupMemberWeight').parent().parent(".form-group").addClass("has-error");
                        $("#experient_group").hide();
                        $("#experient_weight").show();
                        return false;
                    }
                }
            }
            else {
                alert("小组人数应不少于2！");
                return false;
            }
        }

        var $parametername = $(".pramterDesc");
        var newArray = new Array();
        for (var i = 0; i < $(".parameterName").length; i++) {
            var dom = $(".pramterDesc").eq(i).attr("id");
            newArray.push({symbol: dom, value: parseInt($(".parameterName").eq(i).val())});

        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();
        var otherPramterkey = $(".otherPramterkey");
        if(otherPramterkey.length>0){
            for (var j = 0; j < otherPramterkey.length; j++) {
                var otherKey = $(".otherPramterkey").eq(j);
                otherArray.push({key: otherKey.text(), value: $(".otherparameterName").eq(j).val()});

            }
            otherArray = JSON.stringify(otherArray);
        }
        else{
            otherArray =null;
        }

        if($("#groupMessageTable").find("td").length>0){
            var grouparray = new Array();
            //   var sumArray=new Array();
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
            childWeight = JSON.stringify(childWeight);
        }
        else{
            var childWeight = new Array();
            childWeight=[{userId:parseInt(userId),weight:1}];
            childWeight = JSON.stringify(childWeight);
        }

        //  var applicant = $('#applicant option:selected');
        var itemmanager = $('#itemmanager option:selected');

        if($(".savemyApply").attr("id")){
            var thisId=parseInt(this.id.match(/\d+/g));
            if(radio.val()==1){
                $.ajax({
                    type: "POST",
                    url: itemManageUrl,
                    data: {
                        categoryId: window.Categry,
                        itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        groupManagerId: itemmanager.val(),
                        isGroup: 1,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        jobDesc: grouparray,
                        jsonChildWeight: childWeight,
                        option:"modify"

                    },
                    success: function (data) {

                        var Info = data.data.item;
                        var newCount=$(".neweditor").attr("id");
                        newCount=parseInt(newCount.match(/\d+/g));
                        window.Temp.splice(newCount-1,1,Info);
                        if($("#testfile").val()){
                            var formdata = new FormData;
                            formdata.append("file", $("#testfile")[0].files[0]);
                            $.ajax({
                                url: importProofUrl + "?itemId=" + Info.itemId,
                                type: "POST",
                                dataType: "JSON",
                                data: formdata,
                                contentType: false,
                                processData: false,
                                success: function (data) {
                                    if(data.status==200){
                                        alert("修改成功！");
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[name='testfile']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newCount-1,1,data.data.itemDto);
                                        Info=data.data.itemDto;
                                        if($("#proof_"+data.data.itemDto.itemId).length>0){
                                            $("#proof_"+data.data.itemDto.itemId).attr("href",fileInfoUrl+"?fileInfoId="+data.data.fileInfo.fileInfoId);
                                        }
                                        else{

                                            $("#three_"+data.data.itemDto.itemId).append("<a class='btn btn-primary' id='proof_"+data.data.itemDto.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+data.data.itemDto.proof+"'>下载附件</a>")
                                        }

                                    }

                                    else{
                                        alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                        //  return false;
                                    }
                                },
                                error:function () {
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                }

                            });
                        }
                        else{
                            alert("修改成功！");
                        }


                        $(".neweditor").show();
                        //  $(".neweditor").attr("id","neweditor_"+Info.itemId);
                        $(".newsubmit").show();
                        $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                        $(".savemyApply").hide();
                        $(".dismiss").hide();
                        $(".form-control").attr("disabled","disabled");
                        $(".removeRow").attr("disabled","disabled");
                        $("#addGroupMessage").attr("disabled","disabled");
                        $("#calculator").attr("disabled","disabled");
                        $(".groupMemberName").attr("disabled","disabled");
                        $(".groupMemberSymbol").attr("disabled","disabled");
                        $(".groupMemberWeight").attr("disabled","disabled");
                        $("#testfile").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#itemname_"+Info.itemId).text(Info.itemName);
                        $("#workload_"+Info.itemId).text(Info.workload);

                    }

                })
            }
            else {
                $.ajax({
                    type: "POST",
                    url: itemManageUrl,
                    data: {
                        categoryId: window.Categry,
                        itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        isGroup: 0,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        option:"modify"

                    }
                    , success: function (data) {

                        var Info = data.data.item;
                        var newCount=$(".neweditor").attr("id");
                        newCount=parseInt(newCount.match(/\d+/g));

                        window.Temp.splice(newCount-1,1,Info);
                        if($("#testfile").val()){
                            var formdata = new FormData;
                            formdata.append("file", $("#testfile")[0].files[0]);
                            $.ajax({
                                url: importProofUrl + "?itemId=" + Info.itemId,
                                type: "POST",
                                dataType: "JSON",
                                data: formdata,
                                contentType: false,
                                processData: false,
                                success: function (data) {
                                    if(data.status==200){
                                        alert("修改成功！");
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[name='testfile']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newCount-1,1,data.data.itemDto);
                                        Info=data.data.itemDto;
                                        if($("#proof_"+data.data.itemDto.itemId).length>0){
                                            $("#proof_"+data.data.itemDto.itemId).attr("href",fileInfoUrl+"?fileInfoId="+data.data.fileInfo.fileInfoId);
                                        }
                                        else{

                                            $("#three_"+data.data.itemDto.itemId).append("<a class='btn btn-primary' id='proof_"+data.data.itemDto.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+data.data.itemDto.proof+"'>下载附件</a>")
                                        }
                                    }
                                    else{
                                        alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                        return false;
                                    }

                                },
                                error:function () {
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                }

                            });
                        }
                        else {
                            alert("修改成功！");
                        }

                        $(".neweditor").show();
                        $(".newsubmit").show();
                        $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                        $(".savemyApply").hide();
                        $(".dismiss").hide();
                        $(".savemyApply").attr("id","savemyApply_"+Info.itemId);
                        $(".form-control").attr("disabled","disabled");
                        $(".parameterName").attr("disabled","disabled");
                        $(".otherparameterName").attr("disabled","disabled");
                        $(".groupMemberName").attr("disabled","disabled");
                        $(".groupMemberSymbol").attr("disabled","disabled");
                        $(".groupMemberWeight").attr("disabled","disabled");
                        $("#testfile").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#itemname_"+Info.itemId).text(Info.itemName);
                        $("#workload_"+Info.itemId).text(Info.workload);

                    }
                });
            }
        }
        else{
            if(radio.val()==1){
                $.ajax({
                    type: "POST",
                    url: itemManageUrl,
                    data: {
                        categoryId: window.Categry,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        groupManagerId: itemmanager.val(),
                        isGroup: 1,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        jobDesc: grouparray,
                        jsonChildWeight: childWeight

                    },
                    success: function (data) {

                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";
                        var Info = data.data.item;
                        var newcount=$(".showContent").length;
                        newcount++;
                        window.Temp.splice(newcount-1,1,Info);
                        if($("#testfile").val()){
                            var formdata = new FormData;
                            formdata.append("file", $("#testfile")[0].files[0]);
                            $.ajax({
                                url: importProofUrl + "?itemId=" + Info.itemId,
                                type: "POST",
                                dataType: "JSON",
                                data: formdata,
                                contentType: false,
                                processData: false,
                                success: function (data) {
                                    if(data.status==200){
                                        alert("添加成功！");
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[type='file']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newcount-1,1,data.data.itemDto);
                                        Info=data.data.itemDto;
                                    }
                                    else{
                                        alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                        return false;
                                    }

                                },
                                error:function () {
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                }

                            });
                        }
                        else{
                            alert("添加成功！");
                        }
                        $(".neweditor").show();
                        $(".neweditor").attr("id","neweditor_"+newcount);
                        $(".newsubmit").show();
                        $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                        $(".savemyApply").hide();
                        $(".dismiss").hide();
                        $(".form-control").attr("disabled","disabled");
                        $(".parameterName").attr("disabled","disabled");
                        $("#addGroupMessage").attr("disabled","disabled");
                        $("#calculator").attr("disabled","disabled");
                        $(".removeRow").attr("disabled","disabled");
                        $(".otherparameterName").attr("disabled","disabled");
                        $(".groupMemberName").attr("disabled","disabled");
                        $(".groupMemberSymbol").attr("disabled","disabled");
                        $(".groupMemberWeight").attr("disabled","disabled");
                        $("#testfile").attr("disabled","disabled");

                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $(".savemyApply").attr("id","savemyApply_"+Info.itemId);

                        if ($(".newTable").length>0) {
                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 5; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }
                            var $itemCt=$(".itemCount");
                            $(".tbody tr:last").attr("class","tbodyTr_"+newcount).css("text-align","center");
                            $(".tbody tr:last td:eq(0)").text(parseInt($itemCt.eq($itemCt.length-1).text())+1);
                            $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                            $(".tbody tr:last td:eq(1)").append("<span id='itemname_"+Info.itemId+"'>"+Info.itemName+"</span><a href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"' style='float: right'></a>");
                            $(".tbody tr:last td:eq(2)").text(Info.workload);
                            $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);
                            $(".tbody tr:last td:eq(3)").text("未提交");
                            $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);
                            var act='';
                            if(Info.proof!=null){
                                act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + newcount + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + newcount + "'>删除操作</a><a class='btn btn-primary' id='proof_"+Info.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"'>下载附件</a>";

                            }
                            else{
                                 act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary delemyself delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";

                            }

                            $(".tbody tr:last td:eq(4)").append(act).css("width","200px");
                            $(".tbody tr:last td:eq(4)").attr("class","operation-btn-three").attr("id","three_"+Info.itemId);

                        }
                        else {

                            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                '<th class="sorting">工作当量</th><th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                            // $(".applymodalbody").empty();
                            $(".applymodalbody").append(tablestr);

                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 5; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }

                            $(".tbody tr:last").attr("class","tbodyTr_"+newcount).css("text-align","center");
                            $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                            $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                            $(".tbody tr:last td:eq(1)").append("<span id='itemname_"+Info.itemId+"'>"+Info.itemName+"</span><a href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"' style='float: right'></a>");
                            $(".tbody tr:last td:eq(2)").text(Info.workload);
                            $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);

                            $(".tbody tr:last td:eq(3)").text("未提交");
                            $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);
                            var act='';
                            if(Info.proof!=null){
                                act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + newcount + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + newcount + "'>删除操作</a><a class='btn btn-primary' id='proof_"+Info.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"'>下载附件</a>";

                            }
                            else{
                                act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary delemyself delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";

                            }
                              $(".tbody tr:last td:eq(4)").append(act).attr("class","operation-btn-three").attr("id","three_"+Info.itemId);
                        }

                    }

                })
            }
            else {
                $.ajax({
                    type: "POST",
                    url: itemManageUrl,
                    data: {
                        categoryId: window.Categry,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        isGroup: 0,
                        jsonParameter: newArray,
                        otherJson: otherArray
                        //  jsonChildWeight:childWeight

                    }
                    , success: function (data) {
                        var newcount=$(".showContent").length;
                        console.log(newcount);
                        console.log( window.Temp);
                        newcount++;
                        var Info = data.data.item;
                        window.Temp.splice(newcount-1,1,Info);

                        if($("#testfile").val()){
                            var formdata = new FormData;
                            formdata.append("file", $("#testfile")[0].files[0]);
                            $.ajax({
                                url: importProofUrl + "?itemId=" + Info.itemId,
                                type: "POST",
                                dataType: "JSON",
                                data: formdata,
                                contentType: false,
                                processData: false,
                                success: function (data) {
                                    if(data.status==200){
                                        alert("添加成功！");
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[name='testfile']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newcount-1,1,data.data.itemDto);
                                        Info=data.data.itemDto;
                                        if($("#proof_"+data.data.itemDto.itemId).length>0){
                                            $("#proof_"+data.data.itemDto.itemId).attr("href",fileInfoUrl+"?fileInfoId="+data.data.fileInfo.fileInfoId);
                                        }
                                        else{

                                            $("#three_"+data.data.itemDto.itemId).append("<a class='btn btn-primary' id='proof_"+data.data.itemDto.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+data.data.itemDto.proof+"'>下载附件</a>")
                                        }
                                    }
                                    else{
                                        alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                        return false;
                                    }
                                },
                                error:function () {
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                }

                            });
                        }
                        else{
                            alert("添加成功！");
                        }
                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";

                        $(".neweditor").show();
                        $(".neweditor").attr("id","neweditor_"+newcount);
                        $(".newsubmit").show();
                        $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                        $(".savemyApply").hide();
                        $(".dismiss").hide();
                        $(".savemyApply").attr("id","savemyApply_"+Info.itemId);
                        $(".form-control").attr("disabled","disabled");
                        $(".parameterName").attr("disabled","disabled");
                        $(".otherparameterName").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#testfile").attr("disabled","disabled");
                        if ($(".newTable").length>0) {
                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 5; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }
                            var $itemCt=$(".itemCount");
                            $(".tbody tr:last").attr("class","tbodyTr_"+newcount).css("text-align","center");
                            $(".tbody tr:last td:eq(0)").text(parseInt($itemCt.eq($itemCt.length-1).text())+1);
                            $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                            $(".tbody tr:last td:eq(1)").append("<span id='itemname_"+Info.itemId+"'>"+Info.itemName+"</span><span href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"' style='float: right'></span>");
                            $(".tbody tr:last td:eq(2)").text(Info.workload);
                            $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);

                            $(".tbody tr:last td:eq(3)").text("未提交");
                            $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);
                            var act='';
                            if(Info.proof!=null){
                                act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + newcount + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + newcount + "'>删除操作</a><a class='btn btn-primary' id='proof_"+Info.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"'>下载附件</a>";

                            }
                            else{
                                act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary delemyself delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";

                            }
                             $(".tbody tr:last td:eq(4)").append(act).attr("class","operation-btn-three").attr("id","three_"+Info.itemId);


                        }
                        else {

                            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                '<th class="sorting">工作当量</th><th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                            // $(".applymodalbody").empty();
                            $(".applymodalbody").append(tablestr);

                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 5; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }
                            $(".tbody tr:last").css("text-align","center");
                            $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                            $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                            $(".tbody tr:last td:eq(1)").text(Info.itemName);
                            $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);

                            $(".tbody tr:last td:eq(2)").text(Info.workload);
                            $(".tbody tr:last td:eq(1)").attr("id","workload_"+Info.itemId);
                            $(".tbody tr:last td:eq(3)").text("未提交");
                            $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);
                            var act='';
                            if(Info.proof!=null){
                                act="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + newcount + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + newcount + "'>删除操作</a><a class='btn btn-primary' id='proof_"+Info.itemId+"' href='"+fileInfoUrl+"?fileInfoId="+Info.proof+"'>下载附件</a>";

                            }
                            else{
                                act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary delemyself delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";

                            }
                            $(".tbody tr:last td:eq(4)").append(act).attr("class","operation-btn-three").attr("id","three_"+Info.itemId);

                        }
                    }
                });
            }
        }
    });
    /*申报信息表单计算小组成员工作当量*/
    $(document).on("click","#calculator",function () {
        var newArray = new Array();
        if($(".parameterName")&&$(".parameterName").length>0){
            for (var i = 0; i < $(".parameterName").length; i++) {
                var dom = $(".pramterDesc").eq(i).attr("id");
                newArray.push({symbol: dom, value: parseInt($(".parameterName").eq(i).val())});

            }
            newArray=JSON.stringify(newArray);
        }
        else {
            alert("请填写计算参数！");
            return false;
        }
        if($(".groupMemberSymbol").length>0){

            if(!$('.groupMemberWeight').val()){
                alert("请填写成员权重！");
                return false;
            }
            else{
                var sumCount=0;
                for(var t=0;t<$('.groupMemberWeight').length;t++){
                    sumCount+=parseFloat($('.groupMemberWeight').eq(t).val());
                }
                if(sumCount!=1){
                    alert("请保持成员权重相加为1！");
                    return false;
                }
            }
        }
        else {
            alert("请填写成员信息！");
        }
        var childWeight = new Array();
        var groupmessageArray = $('.groupMemberName');
        for (m = 0; m < groupmessageArray.length; m++) {
            childWeight.push({
                userId: parseInt($(".groupMemberName option:selected").eq(m).val()),
                weight: parseFloat($(".groupMemberWeight").eq(m).val())
            });
        }
        childWeight = JSON.stringify(childWeight);
        $.get(calculateUrl,{
            categoryId:window.Categry,
            jsonParameters:newArray,
            jsonChildWeight:childWeight
        },function (msg) {
            $("#groupWorkload").empty();
            var newArry=new Array();
            for(var p=0;p<msg.data.childWeightList.length;p++){
                for(var q=0;q<window.teacherList.length;q++){
                    if(msg.data.childWeightList[p].userId==window.teacherList[q].teacherId){
                        newArry.push(window.teacherList[q].name);
                    }

                }

            }
            for(var t=0;t<msg.data.childWeightList.length;t++){
                $("#groupWorkload").append("<tr><td style='width: 190px;text-align: center'>"+newArry[t]+"</td><td style='width: 190px;text-align: center'>"+msg.data.childWeightList[t].workload+"</td></tr>");
            }
            $(".groupDiv").show();
        });

    });
    /*编辑的表单计算小组成员工作当量*/
    $(document).on("click","#showcalculator",function () {
        if($(".showparameterName")&&$(".showparameterName").length>0){
            var newArray = new Array();
            for (var i = 0; i < $(".showparameterName").length; i++) {
                var dom = $(".showpramterDesc").eq(i).attr("id");
                newArray.push({symbol: dom, value: parseInt($(".showparameterName").eq(i).val())});

            }
            newArray=JSON.stringify(newArray);
        }
        else {
            alert("请填写计算参数！");
            return false;
        }
        if($(".showgroupMemberSymbol").length>0){

            if(!$('.showgroupMemberWeight').val()){
                alert("请填写成员权重！");
                return false;
            }
            else{
                var sumCount=0;
                for(var t=0;t<$('.showgroupMemberWeight').length;t++){
                    sumCount+=parseFloat($('.showgroupMemberWeight').eq(t).val());
                }
                if(sumCount!=1){
                    alert("请保持成员权重相加为1！");
                    return false;
                }

            }
        }
        else {
            alert("请填写成员信息！");
        }
        var childWeight = new Array();
        var groupmessageArray = $('.showgroupMemberName');
        for (m = 0; m < groupmessageArray.length; m++) {
            childWeight.push({
                userId: parseInt($(".showgroupMemberName option:selected").eq(m).val()),
                weight: parseFloat($(".showgroupMemberWeight").eq(m).val())
            });
        }
        childWeight = JSON.stringify(childWeight);
        $.get(calculateUrl,{
            categoryId:window.Categry,
            jsonParameters:newArray,
            jsonChildWeight:childWeight
        },function (msg) {
            $("#showgroupWorkload").empty();
            var newArry=new Array();
            for(var p=0;p<msg.data.childWeightList.length;p++){
                for(var q=0;q<window.teacherList.length;q++){
                    if(msg.data.childWeightList[p].userId==window.teacherList[q].teacherId){
                        newArry.push(window.teacherList[q].name);
                    }

                }

            }
            for(var t=0;t<msg.data.childWeightList.length;t++){
                $("#showgroupWorkload").append("<tr><td style='width: 190px;text-align: center'>"+newArry[t]+"</td><td style='width: 190px;text-align: center'>"+msg.data.childWeightList[t].workload+"</td></tr>");
            }
            $(".showgroupDiv").show();
        });


    });
    /*编辑时解禁*/
    $(document).on("click",".neweditor",function () {
        $(".form-control").removeAttr("disabled");
        $("#itemmanager").attr("disabled","true");
        $(".parameterName").removeAttr("disabled");
        $(".otherparameterName").removeAttr("disabled");
        $(".groupMemberName").removeAttr("disabled");
        $(".groupMemberSymbol").removeAttr("disabled");
        $(".groupMemberWeight").removeAttr("disabled");
        $(".removeRow").removeAttr("disabled");
        $("#calculator").removeAttr("disabled");
        $("#addGroupMessage").removeAttr("disabled");
        $(".savemyApply").show();
        $(".dismiss").show();
        $(".neweditor").hide();
        $(".newsubmit").hide();
        $("#testfile").removeAttr("disabled");
    });
    /*申报时上传文件后将文件的input背景置为透明*/
    $(document).on("click","#testfile",function () {
        $(".showhidden").text("");
        $("input[name='testfile']").css({"color":"","width":""});
    });
    $(document).on("click","#revfile",function () {
        $(".showagain").text("");
        $("input[name='revfile']").css({"color":"","width":""});
    });
    /*删除条目信息*/
    $(document).off("click",".delemyself");
    $(document).on("click",".delemyself",function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        var itemid=window.Temp[thisId-1].itemId;
        var $removeTr=$(this).parent().parent('tr');
        if(confirm("确认删除该条目吗？")){
            $.ajax({
                url:itemManageUrl+"?itemId="+itemid,
                type:"DELETE",
                data:{
                    itemId:itemid
                },
                success:function () {

                    $removeTr.remove();
                   // $(".tbodyTr_"+thisId).remove();
                    for(;thisId<=$(".itemCount").length;thisId++){
                        $(".itemCount").eq(thisId-1).text(thisId);
                    }
                }
            });
        };
    });
}
/*申报操作日志*/
function showApplyHistory() {
    $.get(historyUrl+"?type=apply",function (data) {
        showhistory(data);
    });
}
/*查看申报审核情况*/
function applyRec() {
    $(".reviewerRec").show();
    $(".reviewerRecTbody").empty();
    var Num=0;

    /* 待审核 */
    $.get(itemTeacherInfo+"?importedRequired=0&status=1",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                Num++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                // var id=i;
                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text(Num);
                $(".reviewerRecTbody tr:last td:eq(0)").attr("class","applyNum");
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);

                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(3)").text(showtype);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.applyTime);

                $(".reviewerRecTbody tr:last td:eq(5)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("待审核")
                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_apply' id='btn-viewdetail'>查看详情</a> ";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-three");

                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");
            }
        }

    });

    /* 已通过 */
    $.get(itemTeacherInfo+"?importedRequired=0&status=2",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                Num++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                // var id=i;
                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text(Num);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(3)").text(showtype);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.applyTime);
                $(".reviewerRecTbody tr:last td:eq(5)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("已通过");
                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_apply' id='btn-viewdetail'>查看详情</a> ";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-three");

                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");
            }
        }

    });

    /* 已拒绝 */
    $.get(itemTeacherInfo+"?importedRequired=0&status=5",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                Num++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                // var id=i;
                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text(Num);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);

                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(3)").text(showtype);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.applyTime);
                $(".reviewerRecTbody tr:last td:eq(5)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("已拒绝");

                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_apply' id='btn-viewdetail'>查看详情</a><button class='btn btn-primary reviewerApply source' id='reviewerRec_"+Info.itemId+"'>查看回复</button><a class='btn btn-info applyrefuseApply' data-toggle='modal' data-target='#refuse_To_Apply' id='applyAgain_"+Info.categoryId+"'>重新申请</a> ";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-three");
                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");
            }

            $("[data-toggle='popover']").popover();

            $(".reviewerApply").popover({
                placement: "top",
                trigger: "click",
                html: true,
                title: "回复信息",
                content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

            });
        }
    });

    /* 查看回复修复 */
    $(".reviewerApply").on("click",function () {
        $(this).popover("toggle");
        var element = this.id;
        var thisId=element.match(/\d+/g);
        $.get(itemInfoSubUrl+"?"+"itemId="+thisId,function (data) {
            if(data.data!=null&&data.data.subjectList!=null&&data.data.subjectList.length){
                $(".sendFromName").text(data.data.subjectList[0].sendFromName);
                $(".msgContent").text(data.data.subjectList[0].msgContent);
                $(".sendTime").text(data.data.subjectList[0].sendTime);

            }
            else {
                $(".sendFromName").text("暂无");
                $(".msgContent").text("暂无");
                $(".sendTime").text("暂无");
            }
        });

    });
    var teacherName=new Array();
    $.get(TeacherInfoUrl, {test: 12}, function (data) {
        window.teacherName=data.data.teacherList;
    });
    $(document).on("click","body",function (event) {
        var target = $(event.target); // One jQuery object instead of 3

        // Compare length with an integer rather than with
        if (!target.hasClass('popover')
            && !target.hasClass('reviewerApply')
            && !target.hasClass('popover-content')
            && !target.hasClass('popover-title')
            && !target.hasClass('arrow')) {
            /* $('#folder').popover('hide');*/
            $(".reviewerApply").popover('hide');
        }

    });
    $(document).on("click","#btn-viewdetail",function (){
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        $("#viewdetail_apply .project").empty();
        $("#viewdetail_apply .message").empty();
        $("#viewdetail_apply tbody").empty();
        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);
        var deadline = $(this).parent().prev().prev().text();
        var auditStatus = $(this).parent().prev().text();
        var form = $(this).parent().prev().prev().prev().prev().text();

        $("#viewdetail_apply .project").append( "<p class='itemName'>【项目名称】" + jsonInfo.itemName +"</p>" );
        $("#viewdetail_apply .message").append(
            "工作当量：" + jsonInfo.workload +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核状态：" + auditStatus +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核截止时间：" + deadline );

        $(".viewDetailTbody").append(rowInfo);
        for( var i=0; i<6; i++){
            $(".viewDetailTbody tr:last").append(cellInfo);
        }
        $(".viewDetailTbody tr:last").css("text-align","center");
        $(".viewDetailTbody tr:last td:eq(0)").text(jsonInfo.applyDesc);
        /* 计算公式 */
        $(".viewDetailTbody tr:last td:eq(1)").text(jsonInfo.formula);

        /* 计算参数 */
        var praValues='';
        for( var m = 0; m < jsonInfo.parameterValues.length; m++ ){
            praValues = jsonInfo.paramDesc[m].desc + "（"+jsonInfo.parameterValues[m].symbol +"）："+ jsonInfo.parameterValues[m].value;
            $(".viewDetailTbody tr:last td:eq(2)").append( praValues + "<br>");
        }

        /* 项目属性 */
        var projectProperties='';
        if( jsonInfo.otherJsonParameters && jsonInfo.otherJsonParameters.length ){
            for( var n = 0; n < jsonInfo.otherJsonParameters.length; n++ ){
                projectProperties = jsonInfo.otherJsonParameters[n].key + "：" + jsonInfo.otherJsonParameters[n].value;
                $(".viewDetailTbody tr:last td:eq(3)").append( projectProperties + "<br>");
            }
        }
        if(jsonInfo.isGroup==1){
            $('.checkedView tr').find('td:eq(4)').show();
            $('.checkedView tr').find('td:eq(5)').show();
            $(".groupDesc").show();
            $(".groupWeight").show();

            /* 成员权重 */
            if(userId==jsonInfo.groupManagerId){
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
            }
            else {
                $(".viewDetailTbody tr:last td:eq(5)").text(jsonInfo.jobDesc);
                $(".viewDetailTbody tr:last td:eq(4)").text(jsonInfo.jsonChildWeight );
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