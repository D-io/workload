$(document).ready(function () {
    $(function () {
        $(".datepicker").datepicker({
            language: "zh-CN",
            autoclose: true,//选中之后自动隐藏日期选择框
            clearBtn: true,//清除按钮
            todayBtn: true,//今日按钮
            format: "yyyy-mm-dd"//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
        });
    });
    getSideBar(currentRole,roleList);
    $.get(commonYearsUrl,function (data) {
        var arry=new Array;
        arry=data.data.info;
        for(var yearLength=0;yearLength<arry.length;yearLength++){

            if(arry[yearLength]==currentYearUrl){
                $("#year").append("<option selected='true'>"+arry[yearLength]+"</option>");
            }
            else
                $("#year").append("<option>"+arry[yearLength]+"</option>");
        }

        $("#term").find("option[text=currentScheme]").attr("selected",true);

   });
    $(document).on("click",".swift-role",function () {
        var str=this.id;
        switch (str){
            case "teachers":
                changeSideBar(currentRole,roleList);
                break;
            case "manager":
                changeToManager();
                break;

        }
    });
    $(document).on("click","#itemChange",function () {
        $.post(thisTermUrl+"?year="+$("#year").find("option:selected").text()+"&scheme="+parseInt($("#term").val()),function (data) {
         //   window.location.reload();
            var $currentContent=$(".curentPage").attr("id");
            switch ($currentContent){
                case "WorkloadApply":
                    applyworkload();
                break;
                case "WorkloadRevie":
                    workRevie();
                    break;
                case "selfSummary":
                    reviewerSumItem();
                break;
                case "Workloadimport":
                    importWorkload();
                    break;
                case "WorkloadAuditor":
                    auditworkload();
                    break;
                case "CategoryManage":
                    jumpToAdd();
                    break;
                case "CategorySum":
                    jumpToSum();
                break;
                case "Managerreset":
                    reset();
                    break;
                case "ItemSummary":
                    itemSummary();
                    break;

            }
        });
    });
    $(document).on("click",".reviewerApply",function (data) {
        var element = this.id;
        thisId=element.match(/\d+/g);
        $.get(itemInfoSubUrl+"?"+"itemId="+thisId,function (data) {
            if(data.data.subjectList.length){
                $(".sendFromName").text(data.data.subjectList[0].sendFromName);
                $(".msgContent").text(data.data.subjectList[0].msgContent);
                $(".sendTime").text(data.data.subjectList[0].sendTime);

            }

        });
    });

    /*auditor-import*/

    var myFlag='';
    $(document).off("click",".importList");
    $(document).on("click",".importList",function () {
        var flag = this.id;
        window.myFlag = parseInt(flag.match(/\d+/g));
        $("#file").empty();
    });
    $(document).off("click",".commit");
    $(document).on("click",".commit",function () {
        var data=new FormData;
        data.append("file",$("#file")[0].files[0]);
        $.ajax({
            url:fileInfoUrl+"?fileId=4",
            type:"POST",
            dataType:"JSON",
            data:data,
            contentType: false,
            processData: false,
            success:function (file) {

                alert("上传成功！");
                var creatTime=getLocalTime(file.data.fileInfo.createTime);
                var statusname="";
                switch(file.data.fileInfo.status){
                    case 0:statusname="未提交";
                        break;
                }
                $("#showImportThead_"+window.myFlag).show();
                $(".showImportDesc_"+window.myFlag).append("<tr><td>1</td><td>"+file.data.fileInfo.path+"</td><td>"+creatTime+"</td><td class='submitstatus'>"+statusname+"</td><td><a data-toggle='modal' data-target='#myModal' style='color: #337ab7;margin-left:5px;'>重传</a><a class='submitImport' id='submitImport_"+file.data.fileInfo.fileInfoId+"' style='color: #337ab7;margin-left:5px;'>提交文件</a><a class='submitImportItem' id='submitImportItem_"+file.data.fileInfo.fileInfoId+"' data-toggle='modal' data-target='.bs-example-modal-lg' style='color: #337ab7;margin-left:5px;'>提交条目</a></td></tr>");
            },
            error:function () {
                alert("上传失败！");
            }
        });
        $("#myModal").modal("hide");

    });
    $(document).off("click",".submitImportItem");
    $(document).on("click",".submitImportItem",function () {
        var importList=this.id;
        var reg=parseInt(importList.match(/\d+/g));
        $(".showImportTable").show();
        $(".showImportbodyList").empty();
        $.post(fileTempUrl+"?categoryId="+window.myFlag+"&fileInfoId="+reg,function (data) {

            var rowInfo="<tr></tr>";
            var cellInfo="<td></td>";
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                var Info=analyseList[i];
                $(".showImportbodyList").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<11;j++)//单元格
                {
                    $(".showImportbodyList tr:last").append(cellInfo);
                }
                var id=i;
                $(".showImportbodyList tr:last td:eq(0)").text(id+1);
                $(".showImportbodyList tr:last td:eq(1)").text(Info.itemName);
                $(".showImportbodyList tr:last td:eq(2)").text(Info.teacherName);
                var praValues='';
                for(var m=0;m<Info.parameterValues.length;m++){
                    praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
                }
                var otherpraValue='';
                for(var n=0;n<Info.otherJsonParameters.length;n++){
                    otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                }
                $(".showImportbodyList tr:last td:eq(3)").text(praValues);

                $(".showImportbodyList tr:last td:eq(4)").text(otherpraValue);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组形式";
                        break;
                    case 0:showtype="个人形式";
                        break;

                }
                $(".showImportbodyList tr:last td:eq(5)").text(showtype);

                $(".showImportbodyList tr:last td:eq(6)").text(Info.jobDesc);
                $(".showImportbodyList tr:last td:eq(7)").text(Info.jsonChildWeight);
                $(".showImportbodyList tr:last td:eq(8)").text(Info.workload);
                var statusName='';
                switch (Info.status){
                    case 1:statusName="已提交";
                        break;
                    case 0:statusName="未提交";
                }

                $(".showImportbodyList tr:last td:eq(9)").text(statusName);
                $(".showImportbodyList tr:last td:eq(9)").attr("class","status_"+Info.itemId);
                var act="<a class='btn btn-primary itemToImport' id='itemToImport_"+Info.itemId+"'>提交</a> ";
                $(".showImportbodyList tr:last td:eq(10)").append(act);
            }
        })

    });
    $(document).off("click",".submitImport");
    $(document).on("click",".submitImport",function () {
        var importList=this.id;
        var reg=parseInt(importList.match(/\d+/g));
        $("#submitImport_"+reg).css("disabled","true");
        $.post(fileSubmitUrl+"?"+"fileInfoId="+reg,function () {
            alert("提交文件成功！");
            $(".submitstatus").text("已提交");
        });
    });

    $(document).off("click","itemToImport");
    $(document).on("click",".itemToImport",function () {
        var flag=this.id;
        var flagId=parseInt(flag.match(/\d+/g));
        $.post(itemSubmitUrl,
            {
                itemId: flagId
            }
            ,function () {
                alert("提交成功！");
                $(".status_"+flagId).text("已提交");
                $("#itemToImport_"+flagId).css("disabled","true");
            })
    });

    /*auditor-check*/

    $(document).on("click",".auditor",function () {
        $(".showThead").show();
        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        $(".modal-header").text($(".item_"+reg).text());
        $.get(auditorManageItemUrl+"?"+'importRequired=0',function (data) {
            $(".showDesc").empty();
            var dataArray=new Array;
            for(var applyItemCount=0;applyItemCount<data.data.nonCheckedItem.length;applyItemCount++){

                if(data.data.nonCheckedItem[applyItemCount].categoryId==reg){
                    dataArray.push(data.data.nonCheckedItem[applyItemCount]);
                }
            };
            showapplydata(dataArray);
        });
    });
    $(document).on("click",".uploadAdded",function () {
        var CountId=this.id.match(/\d+/g);
        $.ajax({
            url: importProofUrl + "?itemId=" + CountId,
            type: "POST",
            dataType: "JSON",
            data: formdata,
            contentType: false,
            processData: false,
            success: function () {
                alert("上传成功！");
             //   $("#downLoadAdd_"+CountId).attr("id","")
            }

        });
    });
   /* $(document).on("click",".downloadAdded",function () {


    });*/

    /*reviewer-reviewe*/

    $(document).off("click",".reviewer");
    $(document).on("click",".reviewer",function () {
        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        $(".modal-header").text($(".item_"+reg).text());

        $.get(itemGroupUrl+"?" + 'categoryId=' + reg, function (data) {

            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                '<th class="sorting">工作量</th> <th class="sorting">计算公式</th><th class="sorting">主要参数</th><th>其他参数</th><th>版本</th> <th class="sorting">' +
                '复核截止时间 </th> <th class="sorting">复核状态 </th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';
            $(".applymodalbody").empty();
            $(".applymodalbody").append(tablestr);

            var rowInfo = "<tr></tr>";
            var cellInfo = "<td></td>";
            if(data.data.itemList){
                var analyseList = data.data.itemList;
                var listLength = data.data.itemList.length;
                for (var t = 0; t < listLength; t++) {
                    var Info = analyseList[t];
                    $(".tbody").append(rowInfo);

                    for (var j = 0; j < 10; j++)//单元格
                    {
                        $(".tbody tr:last").append(cellInfo);
                    }
                    var id = t;
                    $(".tbody tr:last td:eq(0)").text(id + 1);
                    $(".tbody tr:last td:eq(1)").text(Info.itemName);
                    $(".tbody tr:last td:eq(2)").text(Info.workload);
                    $(".tbody tr:last td:eq(3)").text(Info.formula);
                    var paramArray = Info.parameterValues;
                    var str = '';
                    for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

                        str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
                    }
                    $(".tbody tr:last td:eq(4)").text(str);
                    var otherparamArray = Info.otherJsonParameters;
                    var otherstr = '';
                    for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                        otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
                    }
                    $(".tbody tr:last td:eq(5)").text(otherstr);
                    $(".tbody tr:last td:eq(6)").text(Info.version);
                    $(".tbody tr:last td:eq(7)").text('2017-12-31');
                    var statusName;
                    switch (Info.status) {
                        case -1:
                            statusName = '删除状态';
                            break;
                        case 0:
                            statusName = '未提交状态';
                            break;
                        case 1:
                            statusName = '首次复核';
                            break;
                        case 2:
                            statusName = '确认通过';
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
                    $(".tbody tr:last td:eq(8)").text(statusName);
                    $(".tbody tr:last td:eq(8)").attr("id","reviewe_"+Info.itemId);

                    var act = "<a class=\"btn btn-success sure\" id=\"pass_" + Info.itemId + "\">确认通过</a><a class=\"btn btn-danger LeaveQues\" data-toggle=\"modal\" data-target=\"#refuModal\" id=\"refuse_" + Info.itemId + "\">存疑提交</a> ";
                    $(".tbody tr:last td:eq(9)").append(act);
                }
            }

        });

    });
    $(document).on("click",".sure",function () {
        var flag=this.id;
        var passItemId=parseInt(flag.match(/\d+/g));
        var itemstr='itemId='+passItemId+'&status=2';
        $.ajax({
            type:"POST",
            url:itemStatusUrl+"?"+itemstr,
            success:function () {
                alert("操作成功！");
            }

        });
        $('#reviewe_'+passItemId).text('确认通过');
    });
    $(document).on("click",".LeaveQues",function () {
        var reflag=this.id;
        var refuItemId=parseInt(reflag.match(/\d+/g));
        $(document).on("click",".commit",function () {
            var refudesc=$("#refusedesc").val();
            $.ajax({
                url:itemStatusUrl+"?"+"itemId="+refuItemId+"&status=3"+"&message="+refudesc,
                type:"POST",
                success:function (data) {
                    alert("操作成功！");
                    $('#reviewe_'+refuItemId).text('存疑提交');
                }
            });
        });

    });
    /*reviewer-apply*/
    $(document).on("click",".radioChange",function () {
        var selectedvValue=$("input[name='optionsRadios']:checked").val();
        if(selectedvValue=="1"){
            $(".item_manager").show();
            $(".item_group").show();

        }
        else {
            $(".item_manager").css("display","none");
            $(".item_group").css("display","none");

        }
    });
    $(document).on("click",".showradioChange",function () {
        var selectedvValue=$("input[name='showoptionsRadios']:checked").val();
        if(selectedvValue=="1"){
            $(".showitem_manager").show();
            $(".showitem_group").show();

        }
        else {
            $(".showitem_manager").css("display","none");
            $(".showitem_group").css("display","none");

        }
    });
    $(document).off("click","#addGroupMessage");
    $(document).on("click","#addGroupMessage",function () {
        var addMessage="<tr><td><select class='groupMemberName teacherName' style='width: 30%;'><option value=''></option> </select></td><td><input type='text' class='groupMemberSymbol'></td><td><input type='text' class='groupMemberWeight'></td></tr>";
        $('#AddgroupPramter').append(addMessage);
    });
    $(document).off("click","#showaddGroupMessage");
    $(document).on("click","#showaddGroupMessage",function () {
        var addMessage="<tr><td><select class='showgroupMemberName teacherName'><option value=''></option> </select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
        $('#showAddgroupPramter').append(addMessage);
    });
    $(document).on("click",".groupMemberName",function () {
        $.get(TeacherInfoUrl,function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.groupMemberName').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }
        })
    });

    $(document).on("click",".showgroupMemberName",function () {
        $.get(TeacherInfoUrl,function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.showgroupMemberName').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }
        })
    });

    /*$(document).on("click",".add",function () {
       if()
    });*/

 /*   var currentId='';
    var CurrentName='';
    $.get(currentTeaIdUrl,function (data) {
        CurrentName =data.data.teacher.name;
    });*/
    $(document).on("click",".editApply",function () {
        var editId=parseInt(this.id.match(/\d+/g));
        $(".savemyApplyAgain").attr("id",editId);
        $("#showitemName").removeAttr("disabled");
        $("#showapplyDesc").removeAttr("disabled");
        $("#showaddGroupMessage").removeAttr("disabled");
        $(".showparameterName").removeAttr("disabled");
       /* if($("#single").disabled=="true"){
            $("#single").removeAttr("disabled");
        }
        else{
            $("#group").removeAttr("disabled");
        }*/
        $("#single").removeAttr("disabled");
        $("#group").removeAttr("disabled");
        $(".showotherparameterName").removeAttr("disabled");
        $("#showitemmanager").removeAttr("disabled");
    /*    $.get(currentTeaIdUrl,function (data) {
            window.currentId=data.data.teacher.name;
        })*/
        $(".showgroupMemberName").removeAttr("disabled");
        $(".showgroupMemberSymbol").removeAttr("disabled");
        $(".showgroupMemberWeight").removeAttr("disabled");
    });
    $(document).off("click",".savemyApplyAgain");
    $(document).on("click",".savemyApplyAgain",function () {
        var saveId=this.id;
        var saveReg=parseInt(saveId.match(/\d+/g));
        var $parametername = $(".showpramterDesc");
        var newArray = new Array();
        for (var i = 0; i < $(".showparameterName").length; i++) {
            var dom = $(".showpramterDesc").eq(i).attr("id");
            newArray.push({symbol: dom, value:parseInt($(".showparameterName").eq(i).val())});

        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();
        var otherPramterkey = $(".showotherPramterkey");
        for (var j = 0; j < otherPramterkey.length; j++) {
            var otherKey=$(".showotherPramterkey").eq(j);
            otherArray.push({key: otherKey.text(), value: $(".showotherparameterName").eq(j).val()});

        }
        otherArray = JSON.stringify(otherArray);
        var grouparray = new Array();
        var sumArray=new Array();
        var groupmessageArray = $('.showgroupMemberName');
        for (var c = 0; c < groupmessageArray.length; c++) {
            grouparray.push({
                userId: parseInt($(".showgroupMemberName option:selected").eq(c).val()),
                jobDesc: $(".showgroupMemberSymbol").eq(c).val()
            });
            sumArray.push({
                userId: parseInt($(".showgroupMemberName option:selected").eq(c).val()),
                userName: $(".showgroupMemberName option:selected").eq(c).text(),
                jobDesc: $(".showgroupMemberSymbol").eq(c).val(),
                weight: parseFloat($(".showgroupMemberWeight").eq(c).val())
            })
        }
        grouparray = JSON.stringify(grouparray);
        sumArray=JSON.stringify(sumArray);
        if(!window.localStorage){
            alert("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            if(storage.item_+saveReg){
                storage.removeItem(storage.item_+saveReg);
            }
            storage.setItem("item_"+saveReg,sumArray);

        }
        var childWeight = new Array();
        for (m = 0; m < groupmessageArray.length; m++) {
            childWeight.push({
                userId: parseInt($(".showgroupMemberName option:selected").eq(m).val()),
                weight: parseFloat($(".showgroupMemberWeight").eq(m).val())
            });
        }
        childWeight = JSON.stringify((childWeight));

        var radio = $("input:radio[name='showoptionsRadios']:checked");
        // var applicant = $('#applicant option:selected');
        var itemmanager = $('#showitemmanager option:selected');

        if(radio.val()==1){
            $.ajax({
                type: "POST",
                url: itemManageUrl,
                data: {
                    categoryId: window.Categry,
                    itemId:saveReg,
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
                    option:"modify"

                },
                success: function (data) {
                    alert("修改成功!");
                    $("#applyModal").modal('hide');
                    $('#showContent').modal('hide');

                    var analyseList = data.data.itemList;
                    var listLength = data.data.itemList.length;
                    var rowInfo = "<tr></tr>";
                    var cellInfo = "<td></td>";
                    var Info = analyseList;
                    var formdata = new FormData;
                    formdata.append("file", $("#formName")[0].files[0]);
                    $.ajax({
                        url: importProofUrl + "?itemId=" + analyseList,
                        type: "POST",
                        dataType: "JSON",
                        data: formdata,
                        contentType: false,
                        processData: false,
                        success: function () {
                        }

                    });

                    $('#addContent').modal('hide');
                    for(var hideCount=0;hideCount<listLength;hideCount++){
                        if (Info[hideCount].teacherName == userNameUrl) {
                            /* var count = Info[i].workload;
                             var CategId = Info[i].categoryId;*/

                            var CountId = Info[hideCount].itemId;
                        }
                       // $(".hiddendistrict").append("<div class='groupMember_"+CountId+"'>"+Info[hideCount].teacherName+"</div><div class='jobDesc_"+CountId+"'>"+Info[hideCount].jobDesc+"</div><div class='jobWeight_"+CountId+"'>"+Info[hideCount].jsonChildWeight+"</div>")

                        $(".groupMember_"+CountId).text(Info[hideCount].teacherName);
                        $("jobDesc_"+CountId).text(Info[hideCount].jobDesc);
                        $("jobWeight_"+CountId).text(Info[hideCount].jsonChildWeight);
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
                    itemId:saveReg,
                    itemName: $('#itemName').val(),
                    applyDesc: $('#applyDesc').val(),
                    //   workload: $('#workload').val(),
                    //   ownerId: applicant.val(),
                    //  groupManagerId: ,
                    isGroup: 0,
                    jsonParameter: newArray,
                    otherJson: otherArray,
                    jsonChildWeight:1,
                    option:"modify"
                    // jobDesc: grouparray,
                    //  jsonChildWeight: childWeight,
                    //   file:formdata

                }
                , success: function (data) {
                    alert("修改成功!");
                    $("#applyModal").modal('hide');
                    $('#showContent').modal('hide');
                }

            });
        }


    });

    $(document).off("click",".editSubmit");
    $(document).on("click",".editSubmit",function () {
        var submitId=parseInt(this.id.match(/\d+/g));
        $.post(itemManaPublicUrl+"?itemId="+submitId,function () {
            alert("提交成功！");
            $("#statusChange_"+submitId).text("已提交");
            $("#downLoadAdd_"+submitId).hide();
            $("#showContent").modal("hide");

        })
    });
    $(document).off("click",".editDelete");
    $(document).on("click",".editDelete",function () {
        var deleteId=parseInt(this.id.match(/\d+/g));
        $.ajax({
            url:itemManageUrl+"?itemId="+deleteId,
            type:"DELETE",
            data:{
                itemId:deleteId
            },
            success:function () {
                alert("操作成功！");
                $("#statusChange_"+deleteId).text("已删除");
                $("#upLAdd_"+deleteId).hide();
                $("#downLoadAdd_"+deleteId).hide();
                $("#showContent").modal("hide");
                var storage=window.localStorage;
                storage.removeItem("item_"+deleteId);
            }

        });
    });
});
function getSideBar(role,roleList) {
    if(role=="ADMIN"){
        $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
        });
        $.get(pageManageUrl+"?"+"regionName=manager/Manager-right-col",function (html) {
            $(".right_hole").empty();
            $(".right_hole").append(html);
        });
       /* $(".scroll-view").append("<jsp:include page='Manager-left-sidebar.jsp'/>");
        $(".right_hole").append("<jsp:include page='Manager-right-col.jsp'/>");*/
        ztree();
        if(roleList.length==1){
            $("#dropdownMenu1").hide();
        }
    }
    else if(role=="RE"){
        $("#dropdownMenu1").hide();
        if(roleList.length==2){
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
            });
           /* $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });*/
            applyworkload();

        }
        else {
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
            });
           /* $.get(pageManageUrl+"?"+"regionName=auditor/auditorcontent",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });*/
            importWorkload();

        }

    }
    else{
        $("#dropdownMenu1").hide();
        $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher-left-sidebar",function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
        });
        $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
            /*$(".right_hole").empty();
            $(".right_hole").append(html);*/
        });
        applyworkload();
    }
}
function changeSideBar(role,roleList) {

        if(roleList.length==3){
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
            });
          /*  $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });*/
            applyworkload();

        }
        else {
            for(var leng=0;leng<roleList.length;leng++){
                if(roleList[leng].role=="RE"){
                    $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",function (html) {
                        $(".scroll-view").empty();
                        $(".scroll-view").append(html);
                    });
                    /*$.get(pageManageUrl+"?"+"regionName=auditor/auditorcontent",function (html) {
                       $(".right_hole").empty();
                        $(".right_hole").append(html);
                    });*/
                    importWorkload();
                    return;
                }
            }
        }
}
function changeToManager() {
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",function (html) {
        $(".scroll-view").empty();
        $(".scroll-view").append(html);
    });
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-right-col",function (html) {
           $(".right_hole").empty();
         $(".right_hole").append(html);
    });
    ztree();
}