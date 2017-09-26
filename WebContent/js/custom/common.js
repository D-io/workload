$(document).ready(function () {
    /*初始化日期插件*/
    $(function () {
        $(".datetimepicker").datetimepicker({
         autoclose: true,
         todayBtn: true,
         pickerPosition: "bottom-left",
         format: "yyyy-mm-dd hh:ii:ss",
            weekStart: 1,
            pickerPosition: "top-left",
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showSecond:1,
            minuteStep:1,
        });
    });
    /*获取侧边栏*/
    getSideBar(currentRole,roleList);
    /*获取当前学年*/

    $("#year").val(currentYearUrl);
    $.get(commonYearsUrl,function (data) {
        var arry=new Array;
        arry=data.data.info;
        var trLength=Math.ceil(arry.length/3);
        for(var yearLength=0;yearLength<trLength;yearLength++){

           var countOne=yearLength*3;
            var countTwo=yearLength*3+1;
            var countThree=yearLength*3+2;
            if(!arry[countTwo]){
                 arry[countTwo]='';
            }
            if(!arry[countThree]){
                 arry[countThree]='';
            }
           $(".calendar-tbody").append("<tr><td class='calendar-bar-td' id='calendar-bar-td_"+countOne+"'>"+arry[countOne]+"</td><td class='calendar-bar-td' id='calendar-bar-td_"+countTwo+"'>"+arry[countTwo]+"</td><td class='calendar-bar-td' id='calendar-bar-td_"+countThree+"'>"+arry[countThree]+"</td></tr>")
        }

        $("#term").find("option[text=currentScheme]").attr("selected",true);

   });
    /*切换学期*/
    $(".showcalendar").hover(function () {
        $(".calendar-bar").css("display","block");
    },function () {
        $(".calendar-bar").css("display","none");
    })
    $(".calendar-bar-td").hover(function () {
        var thisId=this.id.match(/\d+/g);
        $("#calendar-bar-td_"+thisId).removeClass("calendar-bar-td").addClass("calendar-bar-tdHover");
    },function () {
        var thisId=this.id.match(/\d+/g);
        $("#calendar-bar-td_"+thisId).removeClass("calendar-bar-tdHover").addClass("calendar-bar-td");
    });
    $(document).on("click",".calendar-bar-tdHover",function () {
        var thisId=this.id.match(/\d+/g);
        $("#year").val($("#calendar-bar-td_"+thisId).text());
        });
    /*切换角色*/
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
    /*切换学年时对应的刷新页面*/
    $(document).on("click","#itemChange",function () {
        $.post(thisTermUrl+"?year="+$("#year").val()+"&scheme="+parseInt($("#term").val()),function (data) {

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

    /*审核人导入工作当量页面的一些绑定事件*/
    var myFlag='';
    /*定义一个数组保存同一规则下的所有条目信息*/
    var allItem=[];
    var itemCount=0;
    /*定义一个变量存放当前规则id*/
    var cateId=0;
    /*定义一个变量记录数组元素index*/
   // var countToCount=0;
    /*点击导入按钮--改变表单主要参数和附加属性*/
    $(document).off("click",".importList");
    $(document).on("click",".importList",function () {

        $(".appendArial").empty();
        $(".appendArial").append("<p class='project'><p class='itemName'> 【规则名称】" + $(this).parent().prev().find(".itemName").text() + "</p></p>" +
            "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
            "<p class='message'>" + $(this).next().next().text() + "</p>");

        var flag = this.id;
        flag = parseInt(flag.match(/\d+/g));
        window.cateId=flag;
        var file = $("#file")
        file.after(file.clone().val(""));
        file.remove();
        allItem=[];
        window.itemCount=0;
        $(".importNewFile").attr("id","importNewFile_"+flag);
        $(".importItemShow").show();
        var $paraDesc=$(".paraDesc_"+flag);
        $(".parameterThead").empty();
        $('.otherParaThead').empty();
        for(var t=0;t<$paraDesc.length;t++){
            var symbolPara=$paraDesc.eq(t).attr("id");
            var Reg=/_[a-zA-Z]*/;

            symbolPara=symbolPara.match(Reg)[0];
            if (symbolPara.substr(0,1)=='_'){
                symbolPara=symbolPara.substr(1);
            }

            $('.parameterThead').append("<tr><th class='pramterDesc' id='"+symbolPara+"' style='font-size: 13px;'>"+$paraDesc.eq(t).text()+"</th><td><input type='text' class='importpara form-control importpara_"+t+"' name='para' onblur='reminder(this)'></td></tr>");

        }
        var $otherDesc=$(".otherparaDesc_"+flag);
        if($(".otherparaDesc_"+flag).length&&$(".otherparaDesc_"+flag).length>0){

            for(var s=0;s<$otherDesc.length;s++){
                $('.otherParaThead').append("<tr><th class='otherPramterkey' style='font-size: 13px'>"+$otherDesc.eq(s).text()+"</th><td><input type='text' class='otherimportpara form-control otherimportpara_"+s+"' name='otherpara' onblur='reminder(this)'></td></tr>");
            }

        }
        $.get(itemGroupImportUrl + "?" + 'categoryId=' + flag, function (msg) {
            $(".importItemTbody").empty();
            if(msg.data.itemList.length>0){
            //    $(".parameterTh").append("")
                $(".parameterTh").empty();
                $(".otherParaTh").empty();
                $(".submitItem").show();
                showImportPreview(msg.data.itemList,window.itemCount);
             
                    window.itemCount+=msg.data.itemList.length;
                
                for(var key in msg.data.itemList){
                    allItem.push(msg.data.itemList[key]);
                }
                JSON.stringify(allItem);
            }
        });
        if($(".showImportAll").length>0){
            $(".submitItem").show();
        }
        else{
            $(".submitItem").hide();
        }
    });
    /*上传文件*/
    $(document).off("click",".importNewFile");
    $(document).on("click",".importNewFile",function () {
        var thisId=this.id.match(/\d+/g);
        $(this).hide();
        $(".showHiddenImport").show();
        var data=new FormData;
        data.append("file",$("#file")[0].files[0]);
        if($('#file').val()){
            var filestr=($('#file').val().split('.'));
            if(filestr[filestr.length-1]=='xls'||filestr[filestr.length-1]=='xlsx'){
                $.ajax({
                    url:importFileUrl+"?categoryId="+thisId,
                    type:"POST",
                    dataType:"JSON",
                    data:data,
                    contentType: false,
                    processData: false,
                    success:function (msg) {
                        if(msg.status=="200"){
                            if(msg.data.errorData==""||msg.data.errorData==null){
                                alert("上传成功！");
                                $(".submitItem").show();
                                $(".importItemShow").show();
                                showImportPreview(msg.data.itemList,window.itemCount);
                                $(".submitItem").show();
                             
                             	window.itemCount+=msg.data.itemList.length;
                               
                                for(var key in msg.data.itemList){
                                    allItem.push(msg.data.itemList[key]);
                                }
                                JSON.stringify(allItem);
                            }
                            else{
                                alert(msg.data.errorData);
                            }
                        }
                        else{
                            alert("上传失败！请检查文件内容及格式是否正确！");
                        }

                    },
                    error:function () {
                        alert("上传失败！");
                    }
                });
            }
            else{
                alert("请上传正确格式的Excell表格！")
            }
        }
        else{
            alert("请先选择文件!");
        }
        $(this).show();
        $(".showHiddenImport").hide();

    });
    /*查看条目详情*/
    $(document).on("click",".showImportAll",function () {
       var thisId=parseInt(this.id.match(/\d+/g));
    //   window.countToCount=thisId;
        $(".changetext").text("查看详情");
        $(".editor").show();
        $(".editor").attr("id","toeditor_"+thisId);
        $(".submitTo").show();
        $(".dismiss").hide();
        $(".savemyEdit").hide();
        if($(".status_"+allItem[thisId].itemId).text()!="未提交"){
            $(".editor").hide();
            $(".submitTo").hide();
        }

        $(".savemyEdit").attr("id","savemyEdit_"+allItem[thisId].itemId);
        $(".submitTo").attr("id","submitTo_"+allItem[thisId].itemId);
        $("#itemName").val(allItem[thisId].itemName);
        $("#itemName").attr("disabled","disabled");
        $("#applyDesc").val(allItem[thisId].applyDesc);
        $("#applyDesc").attr("disabled","disabled");
        $(".select2").attr("disabled","disabled");

        var showPram=allItem[thisId].parameterValues;
        for(var i=0;i<showPram.length;i++){
            $(".importpara_"+i).val(showPram[i].value);

        }
      $(".importpara").attr("disabled","true");
        var showOtherPara=allItem[thisId].otherJsonParameters;
        if(showOtherPara!=null){
            for(var n=0;n<showOtherPara.length;n++){
                $(".otherimportpara_"+n).val(showOtherPara[n].value);
            }
        }
      //  $("#groupMember").val(allItem[thisId].ownerId);
      //  $("#groupMember").attr("disabled","disabled");
        $("#itemMember").select2().val(allItem[thisId].groupManagerId).trigger("change").css("width","100%");
        removeApplyAttr();
        $(".select2-container").css("width","100%");
        $("#itemMember").attr("disabled","disabled");
       $(".otherimportpara").attr("disabled","disabled");
        if(allItem[thisId].isGroup==1){
            $("input:radio[name='optionsRadios']").each(function () {
                if ($(this).val() == 1) {
                    $(this).attr("checked", true);
                }

            });
            $("#isSingle").attr("disabled","disabled");
            $(".required").show();
            $("#jobDesc").val(allItem[thisId].jobDesc[1]);
            $("#jobDesc").attr("disabled","disabled");
            $("#childWeight").val(allItem[thisId].jsonChildWeight);
            $("#childWeight").attr("disabled","disabled");
            $("#itemmanager").select2().val(allItem[thisId].groupManagerId).trigger("change").css("width","100%");
            $("#itemmanager").attr("disabled","disabled");
        }
        else {
            $("input:radio[name='optionsRadios']").each(function () {
                if ($(this).val() == 0) {
                    $(this).attr("checked", true);
                }

            });
            $("#isSingle").attr("checked","checked");
            $("#isGroup").attr("disabled","disabled");
            $(".required").hide();
        }

    });

    $(document).off("click",".submitTo");
    $(document).on("click",".submitTo",function () {
       var thisId=parseInt(this.id.match(/\d+/g));
        if(confirm("确认提交？")){
            $.post(itemManaPublicUrl+"?itemId="+thisId,function (data) {
                if(data.data.errorData!=""&&data.data.errorData!=null){
                    alert(data.data.errorData);
                }
                //  $("#statusChange_"+submitId).text("已提交");
                $(".status_"+data.data.itemList[0].itemId).text("已提交");
                $("#deleteAll_"+data.data.itemList[0].itemId).remove();
                $("#addContent").modal("hide");
                $("#"+data.data.itemList[0].itemId).prop("disabled","true");
                $("#"+data.data.itemList[0].itemId).attr('class',"anothersubmit");

            })
        };

    });

    /*删除条目操作*/
    $(document).off("click",".deleteAll");
    $(document).on("click",".deleteAll",function () {
       var thisId=parseInt(this.id.match(/\d+/g));
        $.ajax({
            url:itemManageUrl+"?itemId="+thisId,
            type:"DELETE",
            data:{
                itemId:thisId
            },
            success:function () {
              //  alert("操作成功！");
                $(".trDele_"+thisId).remove();
              //  allItem.splice(deletCount,1)
            }

        });

    });
    $(document).off("click",".addNewItem");
    /*审核人添加导入类条目*/
    $(document).on("click",".addNewItem",function () {
        $(".form-control").removeAttr("disabled");
        $(".dismiss").show();
        $(".changetext").text("添加项目");
        $(".savemyEdit").show();
        if($(".savemyEdit").attr("id")){
            $(".savemyEdit").removeAttr("id");
        }

        $(".editor").hide();
        $(".submitTo").hide();
        $("#itemName").val(null);
        $("#applyDesc").val(null);
        $("input:radio[name='optionsRadios']").each(function () {
            if ($(this).val() == 0) {
                $(this).attr("checked", true);
            }

        });
        $("#isGroup").removeAttr("checked");

        $("#isGroup").removeAttr("disabled");
        $("#isSingle").removeAttr("disabled");
        $("#itemMember").select2().val(null).trigger("change").css("width","100%");
        removeApplyAttr();
        $(".select2-container").css("width","100%");
        $("#groupMember").val(null);
        $(".importpara").val(null);
        $(".otherimportpara").val(null);
        $(".required").hide();
        $("#jobDesc").val(null);
        $("#childWeight").val(null);
        $("#itemmanager").val(null);

    });
    /*点击编辑*/
    $(document).on("click",".editor",function () {
        $(".form-control").removeAttr("disabled");
        $(".editor").hide();
        $(".submitTo").hide();
        $(".dismiss").show();
        $(".savemyEdit").show();

    });
    /*编辑条目*/
    $(document).off("click",".savemyEdit");
    $(document).on("click",".savemyEdit",function () {
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
        if(!$('#itemMember').val()){
            $('#itemMember').parent().parent(".form-group").addClass("has-error");
            $("#experient_userId").show();
            return false;
        }

        var radioGroup=$("input:radio[name='optionsRadios']:checked").val();
        var $parametername = $(".pramterDesc");
        var newArray = new Array();
        for (var i = 0; i < $(".importpara").length; i++) {
            var dom = $(".pramterDesc").eq(i).attr("id");
            newArray.push({symbol: dom, value:parseInt($(".importpara").eq(i).val())});
        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();

        if($(".otherParaThead:has(tr)").length==0){
            otherArray=null;
        }
        else {
            var otherPramterkey = $(".otherimportpara");
            for (var j = 0; j < otherPramterkey.length; j++) {
                var otherKey=$(".otherPramterkey").eq(j);
                otherArray.push({key: otherKey.text(), value: $(".otherimportpara").eq(j).val()});
            }
            otherArray = JSON.stringify(otherArray);
        }
        var grouparray = new Array();

        if($(".savemyEdit").attr("id")){
            var thisId=parseInt(this.id.match(/\d+/g));
            $.post(itemManageUrl,{
                categoryId: window.cateId,
                itemId:thisId,
                itemName: $('#itemName').val(),
                applyDesc: $('#applyDesc').val(),
                ownerId: parseInt($("#itemMember option:selected").val()),
                isGroup: 0,
                jsonParameter: newArray,
                otherJson: otherArray,
            //    jsonChildWeight: sumArray,
                option:"modify"

            }, function (data) {
                alert("修改成功!");
                $(".form-control").attr("disabled","disabled");
                $("#year").removeAttr("disabled");
                $("#term").removeAttr("disabled");
                $("#file").removeAttr("disabled");
                $(".dismiss").hide();
                $(".savemyEdit").hide();
                $(".editor").show();
                $(".submitTo").show();
                var strId=parseInt($(".editor").attr("id").match(/\d+/g));
                allItem.splice(strId,1,data.data.item);
                $("#itemName_"+strId).text(data.data.item.itemName);
                $("#workload_"+strId).text(data.data.item.workload);
                $("#teacherName_"+strId).text(data.data.item.teacherName);
            })
        }
        else{

            $.post(itemManageUrl,{
                categoryId: window.cateId,
                itemName: $('#itemName').val(),
                applyDesc: $('#applyDesc').val(),
                ownerId: parseInt($("#itemMember option:selected").val()),
                isGroup: 0,
                jsonParameter: newArray,
                otherJson: otherArray,
            }, function (data) {
                alert("添加成功!");

                allItem.push(data.data.item);
                showImportPreview(data.data.item,window.itemCount);
                $(".editor").attr("id","toeditor_"+window.itemCount);
                window.itemCount++;
                $(".submitTo").attr("id","submitTo_"+data.data.item.itemId);
                $(".savemyEdit").attr("id","savemyEdit_"+data.data.item.itemId);
                $(".form-control").attr("disabled","disabled");
                $("#year").removeAttr("disabled");
                $("#term").removeAttr("disabled");
                $(".dismiss").hide();
                $("#file").removeAttr("disabled");
                $(".savemyEdit").hide();
                $(".editor").show();
                $(".submitItem").show();
                $(".submitTo").show();
            })
        }

    });
    $(document).off("click",".submitItem");
    /*单条提交项目*/
    $(document).on("click",".submitItem",function () {
        var chooseitem=$(".submitmyself");
        var isCheckedItem = new Array();
        var itemStr='';
        for(var i=0;i<chooseitem.length;i++){

                if(chooseitem.eq(i).is(':checked')){
                    isCheckedItem.push(chooseitem.eq(i).attr("id"));
                  //  itemStr+="itemId="+chooseitem.eq(i).attr("id")+"&";
                }
        }

        for(var n=0;n<isCheckedItem.length;n++){
            if(n!=isCheckedItem.length-1){
                itemStr+="itemId="+isCheckedItem[n]+"&";
            }

            else {
                itemStr+="itemId="+isCheckedItem[n];
            }
        }

        if(confirm("确认提交？")){
            $.post(itemManaPublicUrl+"?"+itemStr,function (data) {
                if(data.data.errorData!=""&&data.data.errorData!=null){
                    alert(data.data.errorData);
                }
                var Info=data.data.itemList;
                for(var i=0;i<Info.length;i++){

                        $(".status_"+Info[i].itemId).text("已提交");
                        $("#deleteAll_"+Info[i].itemId).remove();
                        $(".submitall").removeAttr('checked');
                        $("#"+Info[i].itemId).removeAttr('checked');
                        $("#"+Info[i].itemId).attr('disabled',"true");
                        $("#"+Info[i].itemId).attr('class',"anothersubmit");
                }
                /*for(var i=0;i<chooseitem.length;i++){
                    if(chooseitem.eq(i).is(':checked')){
                        $(".status_"+chooseitem.eq(i).attr("id")).text("已提交");
                        $("#deleteAll_"+chooseitem.eq(i).attr("id")).remove();
                        chooseitem.eq(i).removeAttr('checked');
                        chooseitem.eq(i).attr('disabled',"true");
                      //  $(".submitItem").removeAttr('checked');
                    }
                }*/
            })
        };
    });
    $(document).off("click",".submitall");
    /*全选提交*/
    $(document).on("click",".submitall",function () {
        var chooseitem=$(".submitmyself");
        for(var i=0;i<chooseitem.length;i++){
          //  console.log($(this).is(":checked"));
            if($(this).is(":checked")){
                chooseitem.eq(i).prop("checked","checked");
            }
            else{
                  //  chooseitem.eq(i).removeAttr("checked");
                chooseitem.eq(i).prop("checked",false);

            }
        }
    });

    /*审核人审核工作当量*/
    $(document).on("click",".auditor",function () {
        $(".showThead").show();
        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        $("#myModalLabel").empty();
        $("#myModalLabel").append("<p class='page-nav'><i class='fa fa-bar-chart' style='z-index: 100'></i>&nbsp;工作当量管理&nbsp;/&nbsp;<span class='current-page'>工作当量审核</span></p>" +
            "<p class='project'><p class='itemName'>【规则名称】 " + $(this).parent().prev().find(".itemName").text() + "</p></p>" +
            "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
            "<p class='message'>审核截止时间：" + $(this).prev().text() + "</p>");
        $.get(auditorCheckedUrl+"?"+'categoryId='+reg,function (data) {
            $(".showDesc").empty();
            showapplydata(data.data.itemList);
        });
    });

    /*申报人复核*/
    /*查看某一规则下对应的条目信息*/
    $(document).off("click",".reviewer");
    $(document).on("click",".reviewer",function () {
        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        $("#myModalLabel").empty();
        $("#myModalLabel").append( "<p class='page-nav'><i class='fa fa-bar-chart' style='z-index: 100'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class='current-page'>工作当量复核</span></p>" +
            "<p class='project'><p class='itemName'>【规则名称】 " + $(this).parent().prev().find(".itemName").text() + "</p></p>" +
            "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
            "<p class='message'>复核截止时间：" + $(this).prev().text() +"</p>");


        $.get(itemGroupUrl+"?" + 'categoryId=' + reg, function (data) {

            $(".tbody").empty();

            var rowInfo = "<tr></tr>";
            var cellInfo = "<td></td>";
            if(data.data.itemList){
                var analyseList = data.data.itemList;
                var listLength = data.data.itemList.length;
                for (var t = 0; t < listLength; t++) {
                    var Info = analyseList[t];
                    $(".tbody").append(rowInfo);

                    for (var j = 0; j < 6; j++)//单元格
                    {
                        $(".tbody tr:last").append(cellInfo);
                    }
                    var id = t;
                    $(".tbody tr:last").css("text-align","center");
                    $(".tbody tr:last td:eq(0)").text(id + 1);
                    $(".tbody tr:last td:eq(1)").text(Info.itemName);
                    $(".tbody tr:last td:eq(2)").text(Info.workload);
                    var statusName='';

                    var act = " <button class='btn btn-success sure' id='pass_" + Info.itemId + "'>确认通过</button><button class='btn btn-danger LeaveQues' data-toggle='modal' data-target='#refuModal' id='refuse_" + Info.itemId + "'>存疑提交</button> ";
                    var addedact = "<a class='btn btn-warning revi_Apply' id='reviewerRec_"+Info.itemId+"'>存疑回复</a><button class='btn btn-success sure' id='pass_" + Info.itemId + "'>确认通过</button><button class='btn btn-danger LeaveQues' data-toggle='modal' data-target='#refuModal' id='refuse_" + Info.itemId + "'>存疑提交</button> ";
                    var newAct = "<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_reviewer' id='btn-viewdetail-reviewer'>查看详情</a>" ;
                    $(".tbody tr:last td:eq(4)").append(newAct).attr("class","operation-btn-four");

                    switch (Info.status) {
                        case -1:
                            statusName = '已删除';
                            break;
                        case 0:
                            statusName = '未提交';
                            $(".tbody tr:last td:eq(3)");
                            break;
                        case 1:
                            statusName = '待复核';
                            $(".tbody tr:last td:eq(4)").append(act);
                            $(".tbody tr:last td:eq(3)");
                            break;
                        case 2:
                            statusName = '已通过';
                            $(".tbody tr:last td:eq(3)");
                            break;
                        case 3:
                            statusName = '尚存疑';
                            $(".tbody tr:last td:eq(3)");
                            break;
                        case 4:
                            statusName = '已解惑';
                            $(".tbody tr:last td:eq(3)");
                            $(".tbody tr:last td:eq(4)").append(addedact);
                            break;
                        case 5:
                            statusName = '已拒绝';
                            $(".tbody tr:last td:eq(3)");
                            break;
                    }
                    $(".tbody tr:last td:eq(3)").text(statusName);
                    $(".tbody tr:last td:eq(3)").attr("id","reviewe_"+Info.itemId);


                    $(".tbody tr:last td:eq(5)").text(JSON.stringify(Info));
                    $(".tbody tr:last td:eq(5)").css("display","none");
                }
                $("[data-toggle='popover']").popover();
                $(".revi_Apply").popover({
                    placement: "bottom",
                    trigger: "click",
                    html: true,
                    title: "回复信息",
                    content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

                });
            }

        });
        /*查看存疑回复*/
        $(".revi_Apply").on("click",function () {
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
        $(document).on("click","body",function (event) {
            var target = $(event.target); // One jQuery object instead of 3

            if (!target.hasClass('popover')
                && !target.hasClass('revi_Apply')
                && !target.hasClass('popover-content')
                && !target.hasClass('popover-title')
                && !target.hasClass('arrow')) {
                /* $('#folder').popover('hide');*/
                $(".revi_Apply").popover('hide');
            }

        });
    });

    /*查看某一条目信息详情*/
    $(document).on("click","#btn-viewdetail-reviewer",function (){
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        $("#viewdetail_reviewer .project").empty();
        $("#viewdetail_reviewer .message").empty();
        $("#viewdetail_reviewer tbody").empty();
        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);
        var deadline = $("#myModalLabel .message:last").text();
        var auditStatus = $(this).parent().prev().text();
        // var form = $(this).parent().prev().prev().prev().text();

        $("#viewdetail_reviewer .project").append( "<p class='itemName'>【项目名称】" + jsonInfo.itemName +"</p>" );
        $("#viewdetail_reviewer .message").append(
            "工作当量：" + jsonInfo.workload +
            // "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核状态：" + auditStatus + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + deadline );

        $(".viewDetailbody").append(rowInfo);
        for( var i=0; i<3; i++){
            $(".viewDetailbody tr:last").append(cellInfo);
        }
        $(".viewDetailbody tr:last").css("text-align","center");

        /* 计算公式 */
        $(".viewDetailbody tr:last td:eq(0)").text(jsonInfo.formula);

        /* 计算参数 */
        var praValues='';
        for( var m = 0; m < jsonInfo.parameterValues.length; m++ ){
            praValues = jsonInfo.paramDesc[m].desc + "（"+jsonInfo.parameterValues[m].symbol +"）：" + jsonInfo.parameterValues[m].value;
            $(".viewDetailbody tr:last td:eq(1)").append( praValues + "<br>");
        }

        /* 项目属性 */
        var projectProperties='';
        if( jsonInfo.otherJsonParameters && jsonInfo.otherJsonParameters.length ){
            for( var n = 0; n < jsonInfo.otherJsonParameters.length; n++ ){
                projectProperties = jsonInfo.otherJsonParameters[n].key + "：" + jsonInfo.otherJsonParameters[n].value;
                $(".viewDetailbody tr:last td:eq(2)").append( projectProperties + "<br>");
            }
        }

        $(".viewDetailbody tr:last td:eq(1)").css("line-height","28px");
        $(".viewDetailbody tr:last td:eq(2)").css("line-height","28px");

    });
    /*确认通过*/
    $(document).off("click",".sure");
    $(document).on("click",".sure",function () {
        var flag=this.id;
        var passItemId=parseInt(flag.match(/\d+/g));
        var itemstr='itemId='+passItemId+'&status=2';
        $.ajax({
            type:"POST",
            url:itemStatusUrl+"?"+itemstr,
            success:function () {
                alert("操作成功！");
               /* $("#pass_"+passItemId).attr("disabled","disabled");
                $("#refuse_"+passItemId).attr("disabled","disabled");*/
                $("#pass_"+passItemId).remove();
                $("#refuse_"+passItemId).remove();

            }

        });
        $('#reviewe_'+passItemId).text('已通过');
    });
    /*复核存疑*/
    $(document).off("click",".LeaveQues");
    $(document).on("click",".LeaveQues",function () {
        var reflag=this.id;
        var refuItemId=parseInt(reflag.match(/\d+/g));
        $("#refusedesc").val(null);
        $(document).on("click",".commit",function () {
            var refudesc=$("#refusedesc").val();
            $.ajax({
                url:itemStatusUrl+"?"+"itemId="+refuItemId+"&status=3"+"&message="+refudesc,
                type:"POST",
                success:function (data) {
                    alert("操作成功！");
                    $("#refuModal").modal("hide");
                    $('#reviewe_'+refuItemId).text('尚存疑');
                   /* $("#pass_"+refuItemId).attr("disabled","disabled");
                    $("#refuse_"+refuItemId).attr("disabled","disabled");*/
                    $("#pass_"+refuItemId).remove();
                    $("#refuse_"+refuItemId).remove();
                }
            });
        });

    });

    /*申报人申报*/
    /*添加申报表单点击小组申报时显示小组信息*/
    $(document).on("click",".radioChange",function () {
        var selectedvValue=$("input[name='optionsRadios']:checked").val();
        if(selectedvValue=="1"){
            $(".item_manager").show();
            $(".item_group").show();
            $(".required").show();
        }
        else {
            $(".item_manager").css("display","none");
            $(".item_group").css("display","none");
            $(".required").hide();
        }
    });
    /*查看详情表单点击小组申报时显示小组信息*/
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
    /*重新申请表单点击小组申报时显示小组信息*/
    $(document).on("click",".applyRadios",function () {
        var selectedvValue=$("input[name='applyRadios']:checked").val();
        if(selectedvValue=="1"){
            $(".item_apply_manager").show();
            $(".item_apply_group").show();

        }
        else {
            $(".item_apply_manager").hide();
            $(".item_apply_group").hide();

        }
    });
    /*添加申报表单添加小组成员信息*/
    $(document).off("click","#addGroupMessage");
    $(document).on("click","#addGroupMessage",function () {
        var addMessage="<tr><td style='width: 120px;'><select class='groupMemberName teacherName' ><option value=''></option> </select></td><td><input type='text' class='groupMemberSymbol' name='group' onblur='reminder(this)' style='width:120px; height: 38px; padding-left: 8px;'></td><td style='position: absolute;'><input type='text' class='groupMemberWeight' name='weight' onblur='reminder(this)'  style='width:120px; height: 38px; padding-left: 8px;'><button type='button' class='btn btn-danger removeOtherRow removeRow' style='position: absolute; top: 12px; right: -22px;'><i class='fa fa-trash'></i></button></td></tr>";
        $('#AddgroupPramter').append(addMessage);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.groupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }

        });
        $(".groupMemberName").select2({
            placeholder:"",
            allowClear: true,
            width: "100%",
        });

    });
    /*移除小组成员信息*/
    $(document).on("click",".removeRow",function () {
        this.closest("tr").remove();
    });
    /*查看详情表单添加小组成员信息*/
    $(document).off("click","#showaddGroupMessage");
    $(document).on("click","#showaddGroupMessage",function () {
        var addMessage="<tr><td><select class='showgroupMemberName teacherName'><option value=''></option> </select></td><td><input type='text' class='showgroupMemberSymbol' name='showpara' onblur='reminder(this)'></td><td style='position: absolute;'><input type='text' class='showgroupMemberWeight' name='showotherpara' onblur='reminder(this)'><button type='button' class='btn btn-danger removeOtherRow removeRow' style='position: absolute; top: 12px; right: -22px;'><i class='fa fa-trash'></i></button></td></tr>";
        $('#showAddgroupPramter').append(addMessage);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.showgroupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }

        });
        $(".showgroupMemberName").select2({
            placeholder:"",
            allowClear: true,
            width: "100%"

        });
    });
    /*重新申请表单添加小组成员信息*/
    $(document).off("click","#applyAddGroupMessage");
    $(document).on("click","#applyAddGroupMessage",function () {

        var addStr = "<tr><td><select class='showapplyMemberName teacherName'><option value=''></option> </select></td><td><input type='text' class='showapplyMemberSymbol' name='applygroup' onblur='reminder(this)' style='width: 120px;min-height:38px;padding-left: 8px' ></td><td style='position: absolute'><input type='text' class='showgapplyMemberWeight' name='applyweight' onblur='reminder(this)' style='width: 120px;min-height: 38px;padding-left: 8px'><button type='button' class='btn btn-danger removeOtherRow removeRow' style='position: absolute; top: 12px; right: -22px;'><i class='fa fa-trash'></i></button></td></tr>";
        $('#AddgroupApplyPramter').append(addStr);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.showapplyMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }

        });
        $(".showapplyMemberName").select2({
            placeholder:"",
            allowClear: true,
            width: "100%",

        });
    });

    /*编辑申报信息*/
    $(document).on("click",".editApply",function () {
        var editId=parseInt(this.id.match(/\d+/g));
        $(".editApply").hide();
        $(".editSubmit").hide();
        $(".dismissagain").show();
        $(".savemyApplyAgain").show();
        $(".savemyApplyAgain").attr("id",editId);
        $("#showitemName").removeAttr("disabled");
        $("#showapplyDesc").removeAttr("disabled");
        $(".removeRow").removeAttr("disabled");
        $("#showaddGroupMessage").removeAttr("disabled");
        $("#showcalculator").removeAttr("disabled");
        $(".showparameterName").removeAttr("disabled");
        $("#revfile").removeAttr("disabled");
        $("#single").removeAttr("disabled");
        $("#group").removeAttr("disabled");
        $(".showotherparameterName").removeAttr("disabled");
      //  $("#showitemmanager").removeAttr("disabled");
        $(".showgroupMemberName").removeAttr("disabled");
        $(".showgroupMemberSymbol").removeAttr("disabled");
        $(".showgroupMemberWeight").removeAttr("disabled");
    });
    /*提交申报信息*/
    $(document).off("click",".editSubmit");
    $(document).on("click",".editSubmit",function () {
        var submitId=parseInt(this.id.match(/\d+/g));
       if(confirm("确认提交？")){
           $.post(itemManaPublicUrl+"?itemId="+submitId,function () {

               $("#statusChange_"+submitId).text("待审核");
               $(".delemyself_"+submitId).remove();
               // $("#downLoadAdd_"+submitId).hide();
               $("#showContent").modal("hide");

           })
       };

    });
    $(document).off("click",".newsubmit");
    $(document).on("click",".newsubmit",function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        if(confirm("确认提交？")){
            $.post(itemManaPublicUrl+"?itemId="+thisId,function () {

                $("#statusChange_"+thisId).text("待审核");
                $(".delemyself_"+thisId).remove();
                //  $("#downLoadAdd_"+submitId).hide();
                $("#addContent").modal("hide");

            })
        };

    });
    /*重新申请*/
    $(document).on("click",".applyrefuseApply",function () {
      //  $(".applydismiss").hide();

        $(".applySave").hide();
        $(".applyeditor").show();
        $(".applydismiss").show();
        $(".form-control").attr("disabled","disabled");
        $("#term").removeAttr("disabled");
        $("#year").removeAttr("disabled");
        removeApplyAgain();
        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);

        if(userId!=jsonInfo.groupManagerId){
            $("#refuse_To_Apply").modal("hide");
            alert("请由小组组长重新申请！");
        }
        $(".applySave").attr("id","applySave_"+jsonInfo.itemId);
        $(".applydismiss").attr("id","applydismiss_"+jsonInfo.categoryId);

        /*name desc and fileName*/
      //  $(".cateName").text(jsonInfo.categoryName);
        $("#applyAgainName").val(jsonInfo.itemName);
        $("#applyAgainDesc").val(jsonInfo.applyDesc);
        $(".showhiddenapply").text(jsonInfo.fileName);
        $("#applyfile").attr("disabled","disabled");
        $("input[name='applyfile']").css({"color":"transparent","width":"80px"});
        $('.applyparameterTh').empty();
        $('.applyotherParaTh').empty();
        $("#AddgroupApplyPramter").empty();
        /*para and otherPara*/
        for (var t = 0; t < jsonInfo.paramDesc.length; t++) {
            var symbolname = jsonInfo.paramDesc[t].symbol;

            $('.applyparameterTh').append("<tr><th class='applypramterDesc' id='" + symbolname + "' style='font-size: 13px;'>" + jsonInfo.paramDesc[t].desc + "</th><td><input type='text' class='applyparameterName form-control' name='applyAgainpara' onblur='reminder(this)'></td></tr>");
          $(".applyparameterName").eq(t).val(jsonInfo.parameterValues[t].value);
             }
        for (var s = 0; s < jsonInfo.otherJsonParameters.length; s++) {

            $('.applyotherParaTh').append("<tr><th class='applyotherPramterkey' style='font-size: 13px'>" + jsonInfo.otherJsonParameters[s].key + "</th><td><input type='text' class='applyotherparameterName form-control' name='otherApplypara' onblur='reminder(this)'></td></tr>");
            $(".applyotherparameterName").eq(s).val(jsonInfo.otherJsonParameters[s].value);
          //  $('#showotherparameterTable').append("<tr><th class='showotherPramterkey' style='font-size: 13px;'>" + item[comp].otherJsonParameters[s].key + "</th><td><input type='text' class='showotherparameterName form-control' name='showotherpara' onblur='reminder(this)'></td></tr>");
        }
        $(".applyparameterName").attr("disabled","true");
        $(".applyotherparameterName").attr("disabled","true");
        /*isGroup*/
        if (jsonInfo.isGroup == 0) {
            $("#is_single").attr("checked", "checked");
           /* $("#is_group").prop("checked", "false");
            $("#is_group").removeAttr("checked");*/
            $("#is_group").attr("disabled", "true");
            $(".item_apply_manager").hide();
            $(".item_apply_group").hide();
            $(".applygroupDiv").hide();
            $(".radio").hide();

        }
        else {
            $(".radio").show();
            $("#is_group").attr("checked", "checked");
            /*$("#is_single").prop("checked", "false");
            $("#is_single").removeAttr("checked");*/
            $("#is_single").attr("disabled", "true");
            $("#applyAddGroupMessage").attr("disabled","true");
            $("#applyCalculator").attr("disabled","true");
            $(".item_apply_manager").show();
            $(".item_apply_group").show();
            $("#apply_Workload").empty();

            $("#applyitemmanager").select2().val(jsonInfo.groupManagerId).trigger("change");
            $(".select2-container").css("width","100%");
            $("#applyitemmanager").attr("disabled", "true");
            $("#applyCalculator").attr("disabled", "true");
            var addStr = '';
            var teacherInfo=new Array();
            $.get(TeacherInfoUrl, {test: 12}, function (data) {
                teacherInfo=data.data.teacherList;
            });
            for (var pramterCount = 0; pramterCount < jsonInfo.jobDescList.length; pramterCount++) {

                var addStr = "<tr><td><select class='showapplyMemberName teacherName'></select></td><td><input type='text' class='showapplyMemberSymbol' name='applygroup' onblur='reminder(this)' style='width: 120px;min-height:38px;padding-left: 8px'></td><td style='position: absolute'><input type='text' class='showgapplyMemberWeight' name='applyweight' onblur='reminder(this)' style='width: 120px;min-height:38px;padding-left: 8px'><button type='button' class='btn btn-danger removeOtherRow removeRow' style='position: absolute; top: 12px; right: -22px;'><i class='fa fa-trash'></i></button></td></tr>";
                $('#AddgroupApplyPramter').append(addStr);

                for (var i = 0; i < teacherInfo.length; i++) {
                    $('.showapplyMemberName:last').append('<option value=\"' + teacherInfo[i].teacherId + '\">' +teacherInfo[i].name + '</option>');
                }

                $(".showapplyMemberName").eq(pramterCount).select2().val(jsonInfo.jobDescList[pramterCount].userId).trigger("change");
                $(".showapplyMemberSymbol").eq(pramterCount).val(jsonInfo.jobDescList[pramterCount].jobDesc);
                $(".showgapplyMemberWeight").eq(pramterCount).val(jsonInfo.childWeightList[pramterCount].weight);
            }
            $(".teacherName").select2({
                placeholder:"",
                allowClear: true,
                width: "100%"
            });
            $(".removeRow").attr("disabled","disabled");
            $(".select2-container").css("width","100%");
            $(".showapplyMemberName").attr("disabled", "true");
            $(".showapplyMemberSymbol").attr("disabled", "true");
            $(".showgapplyMemberWeight").attr("disabled", "true");

        }
    });
    /*重新申请编辑*/
    $(document).on("click",".applyeditor",function () {
        $(".form-control").removeAttr("disabled");
        $("#applyitemmanager").attr("disabled","disabled");
        $(".applyparameterName").removeAttr("disabled");
        $(".applyotherparameterName").removeAttr("disabled");
        $("#is_group").removeAttr("disabled");
        $("#is_single").removeAttr("disabled");
        $(".removeRow").removeAttr("disabled");
       // $("#revfile").removeAttr("disabled");
        $("#applyfile").removeAttr("disabled");
        $("#applyAddGroupMessage").removeAttr("disabled");
        $("#applyCalculator").removeAttr("disabled");
        $(".showapplyMemberName").removeAttr("disabled", "true");
        $(".showapplyMemberSymbol").removeAttr("disabled", "true");
        $(".showgapplyMemberWeight").removeAttr("disabled", "true");
        $(".applySave").show();
        $(".applyeditor").hide();
        $(".applydismiss").show();
    });
    /*保存重新申请*/
    $(document).on("click",".applySave",function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        var saveId= parseInt($(".applydismiss").attr("id").match(/\d+/g));
        /*verify the form*/

        if(!$('#applyAgainName').val()){
            $('#applyAgainName').parent().parent(".form-group").addClass("has-error");
            $("#experient_apply_name").show();
            return false;
        }
        if(!$('#applyAgainDesc').val()){
            $('#applyAgainDesc').parent().parent(".form-group").addClass("has-error");
            $("#experient_apply_desc").show();
            return false;
        }
        if($('.applyparameterName ').length>0){
            if(!$('.applyparameterName ').val()){
                $('.applyparameterName ').parent().parent(".form-group").addClass("has-error");
                $("#experient_applyAgainpara").show();
                return false;
            }
            else{
                var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
                for(var z=0;z<$('.applyparameterName').val().length;z++){
                    var nubmer = $('.applyparameterName').eq(z).val();
                    if (!re.test(nubmer)) {
                        return false;
                    }
                }

            }
        }
        if($('.applyotherparameterName ').length>0){
            if(!$('.applyotherparameterName ').val()){
                $('.applyotherparameterName ').parent().parent(".form-group").addClass("has-error");
                $("#experient_otherApplypara").show();
                return false;
            }
        }
      //  var radio = $("input:radio[name='applyRadios']:checked");
        var radio=0;
        $("input:radio[name='applyRadios']:checked").each(function () {
            if($(this).is(':checked')){
                radio=$(this).val();
            }
        });

        if(radio==1){
            if($(".showapplyMemberSymbol").length>1){
                if(!$('.showapplyMemberSymbol').val()){
                    $('.showapplyMemberSymbol').parent().parent(".form-group").addClass("has-error");
                    $("#experient_applygroup").show();
                    $("#experient_applyweight").hide();
                    return false;
                }
                if(!$('.showgapplyMemberWeight').val()){
                    $('.showgapplyMemberWeight').parent().parent(".form-group").addClass("has-error");
                    $("#experient_applygroup").show();
                    $("#experient_applyweight").hide();
                    return false;
                }
                else{
                    var sumCount=0;
                    for(var t=0;t<$('.showgapplyMemberWeight').length;t++){
                        //   console.log($('.groupMemberWeight').eq(t).val());
                        sumCount+=parseFloat($('.showgapplyMemberWeight').eq(t).val());
                    }
                    if(sumCount!=1){
                        $('.showgapplyMemberWeight').parent().parent(".form-group").addClass("has-error");
                        $("#experient_applygroup").hide();
                        $("#experient_applyweight").show();
                        return false;
                    }
                }
            }
            else {
                alert("小组人数应不少于2！");
                return false;
            }
        }

        /*collect the message*/
        var $parametername = $(".applypramterDesc");
        var newArray = new Array();
        for (var i = 0; i < $(".applypramterDesc").length; i++) {
            var dom = $parametername.eq(i).attr("id");
            newArray.push({symbol: dom, value: parseInt($(".applyparameterName").eq(i).val())});

        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();
        var otherPramterkey = $(".applyotherPramterkey");
        for (var j = 0; j < otherPramterkey.length; j++) {
            var otherKey = otherPramterkey.eq(j);
            otherArray.push({key: otherKey.text(), value: $(".applyotherparameterName").eq(j).val()});

        }
        otherArray = JSON.stringify(otherArray);
        if ($("#AddgroupApplyPramter").find("td").length > 0) {
            var grouparray = new Array();
            //   var sumArray=new Array();
            var groupmessageArray = $('.showapplyMemberName');
            for (var c = 0; c < groupmessageArray.length; c++) {
                grouparray.push({
                    userId: parseInt($(".showapplyMemberName option:selected").eq(c).val()),
                    jobDesc: $(".showapplyMemberSymbol").eq(c).val()
                });

            }
            grouparray = JSON.stringify(grouparray);

            var childWeight = new Array();
            for (m = 0; m < groupmessageArray.length; m++) {
                childWeight.push({
                    userId: parseInt($(".showapplyMemberName option:selected").eq(m).val()),
                    weight: parseFloat($(".showgapplyMemberWeight").eq(m).val())
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
        var itemmanager = $('#applyitemmanager option:selected');

        if (radio == 1) {
            $.ajax({
                type: "POST",
                url: applyAgainUrl,
                data: {
                    categoryId: saveId,
                    itemId: thisId,
                    itemName: $("#applyAgainName").val(),
                    applyDesc: $('#applyAgainDesc').val(),
                    groupManagerId: itemmanager.val(),
                    isGroup: 1,
                    jsonParameter: newArray,
                    otherJson: otherArray,
                    jobDesc: grouparray,
                    jsonChildWeight: childWeight
                },
                success: function (data) {

                    var msg = data.data.newItemDto;
                    if($("#applyfile").val()){
                        var formdata = new FormData;
                        formdata.append("file", $("#applyfile")[0].files[0]);
                        $.ajax({
                            url: importProofUrl + "?itemId=" + msg.itemId,
                            type: "POST",
                            dataType: "JSON",
                            data: formdata,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                if(data.status==200){
                                    alert("提交申请成功!");
                                    $("#refuse_To_Apply").modal("hide");
                                    var file = $("#applyfile")
                                    file.after(file.clone().val(""));
                                    file.remove();
                                    applyRec();
                                }

                                else{
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                    return false;
                                }
                            }

                        });
                    }
                    else{
                        alert("提交申请成功!");
                        $("#refuse_To_Apply").modal("hide");
                        applyRec();
                    }

                }
            })
        }
        else {
            $.ajax({
                type: "POST",
                url: applyAgainUrl,
                data: {
                    categoryId: saveId,
                    itemId: thisId,
                    itemName:$("#applyAgainName").val(),
                    applyDesc: $('#applyAgainDesc').val(),
                    isGroup: 0,
                    jsonParameter: newArray,
                    otherJson: otherArray,
                    ownerId:userId
                   // jsonChildWeight: childWeight
                }
                , success: function (data) {
                    var msg = data.data.newItemDto;
                    if($("#applyfile").val()){
                        var formdata = new FormData;
                        formdata.append("file", $("#applyfile")[0].files[0]);
                        $.ajax({
                            url: importProofUrl + "?itemId=" + msg.itemId,
                            type: "POST",
                            dataType: "JSON",
                            data: formdata,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                if(data.status==200){
                                    alert("提交规则成功!");
                                    var file = $("#applyfile")
                                    file.after(file.clone().val(""));
                                    file.remove();
                                   applyRec();
                                    }

                                else{
                                    alert("文件已存在！请修改文件名或文件内容后重新上传！");
                                    return false;
                                }
                            }
                        });
                    }
                    else{
                        alert("提交申请成功!");
                        applyRec();
                    }
                }
            });
        }
    })
});