$(document).ready(function () {
    $(function () {
        $(".datetimepicker").datetimepicker({
         /* language: "zh-CN",
         autoclose: true,//选中之后自动隐藏日期选择框
         clearBtn: true,//清除按钮
         todayBtn: true,//今日按钮*/
         autoclose: true,
         todayBtn: true,
         pickerPosition: "bottom-left",
         format: "yyyy-mm-dd hh:ii:ss",//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
            weekStart: 1,

            pickerPosition: "top-left",
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showSecond:1,
            minuteStep:1,
        });

       /* data-plugin-datepicker*/
    });

    getSideBar(currentRole,roleList);
    $("#year").val(currentYearUrl);
    $.get(commonYearsUrl,function (data) {
        var arry=new Array;
        arry=data.data.info;
        var trLength=Math.ceil(arry.length/3)
        for(var yearLength=0;yearLength<trLength;yearLength++){

           /* if(arry[yearLength]==currentYearUrl){
                $("#year").append("<option selected='true' style='font-size: 15px;'>"+arry[yearLength]+"</option>");
            }
            else
                $("#year").append("<option style='font-size: 15px;'>"+arry[yearLength]+"</option>");*/
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
        }
    )
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
        $.post(thisTermUrl+"?year="+$("#year").text()+"&scheme="+parseInt($("#term").val()),function (data) {
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

    /*auditor-import*/

    var myFlag='';
    var allItem=[];
    var itemCount=0;
    var cateId=0;
    var countToCount=0;
    $(document).off("click",".importList");
    $(document).on("click",".importList",function () {

        $("#myModalLabel").empty();
        $("#myModalLabel").append("<p class='page-nav'><i class='fa fa-bar-chart' style='z-index: 100'></i>&nbsp;工作当量管理&nbsp;/&nbsp;<span class='current-page'>工作当量导入</span></p>" +
            "<p class='project'><span class='itemName'> " + $(this).parent().prev().find(".itemName").text() + "</span></p>" +
            "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
            "<p class='message'>" + $(this).next().next().text() + "</p>");

        var flag = this.id;
        flag = parseInt(flag.match(/\d+/g));
        window.cateId=flag;
    //    console.log(window.cateId);
        var file = $("#file")
        file.after(file.clone().val(""));
        file.remove();
        allItem=[];
        itemCount=0;
        $(".importNewFile").attr("id","importNewFile_"+flag);
        $(".importItemShow").show();
        var $paraDesc=$(".paraDesc_"+flag);
        $(".parameterThead").empty();
        $('.otherParaThead').empty();
        for(var t=0;t<$paraDesc.length;t++){
            var symbolPara=$paraDesc.eq(t).attr("id");
            var Reg=/_[a-zA-Z]*/;
            // /appVersion\/([\d\.]*)/
            // symbolId=Reg.exec(symbolId);
            symbolPara=symbolPara.match(Reg)[0];
            if (symbolPara.substr(0,1)=='_'){
                symbolPara=symbolPara.substr(1);
            }

            $('.parameterThead').append("<tr><th class='pramterDesc' id='"+symbolPara+"' style='font-size: 13px;'>"+$paraDesc.eq(t).text()+"</th><td><input type='text' class='importpara form-control importpara_"+t+"'></td></tr>");

        }
        var $otherDesc=$(".otherparaDesc_"+flag);
        if($(".otherparaDesc_"+flag).length&&$(".otherparaDesc_"+flag).length>0){

            for(var s=0;s<$otherDesc.length;s++){
                $('.otherParaThead').append("<tr><th class='otherPramterkey' style='font-size: 13px'>"+$otherDesc.eq(s).text()+"</th><td><input type='text' class='otherimportpara form-control otherimportpara_"+s+"'></td></tr>");
            }

        }
        $.get(itemGroupUrl + "?" + 'categoryId=' + flag, function (msg) {
            $(".importItemTbody").empty();
            if(msg.data.itemList.length>0){
            //    $(".parameterTh").append("")
                $(".parameterTh").empty();
                $(".otherParaTh").empty();
                $(".submitItem").show();
             //    showPara(msg.data.unCommittedItem[0]);


                showImportPreview(msg.data.itemList,itemCount);
                while(itemCount<msg.data.itemList.length){
                    itemCount++;

                }
                console.log(itemCount);
              //  window.itemDouble=msg.data.unCommittedItem;
                for(var key in msg.data.itemList){
                    allItem.push(msg.data.itemList[key]);
                }
                JSON.stringify(allItem);
                console.log(allItem);
            }
        });
    });
    $(document).on("click",".showImportAll",function () {
       var thisId=parseInt(this.id.match(/\d+/g));
       window.countToCount=thisId;
        $(".editor").show();
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
    $(document).on("click",".editor",function () {
       $(".form-control").removeAttr("disabled");
        $(".editor").hide();
        $(".submitTo").hide();
       $(".dismiss").show();
       $(".savemyEdit").show();

    });
    $(document).on("click",".savemyEdit",function () {

            $(".form-control").attr("disabled","disabled");
            $("#year").removeAttr("disabled");
            $("#term").removeAttr("disabled");
            $("#file").removeAttr("disabled");
            $(".dismiss").hide();
            $(".savemyEdit").hide();
            $(".editor").show();
            $(".submitTo").show();
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
                    var otherPramterkey = $(".otherParaThead");
                    for (var j = 0; j < otherPramterkey.length; j++) {
                        var otherKey=$(".otherPramterkey").eq(j);
                        otherArray.push({key: otherKey.text(), value: $(".otherimportpara").eq(j).val()});
                    }
                    otherArray = JSON.stringify(otherArray);
                }


            var grouparray = new Array();
            var sumArray=new Array();
            //  var groupmessageArray = $('.showgroupMemberName');

            grouparray=[{
                userId: parseInt($("#itemMember option:selected").val()),
                jobDesc: $("#jobDesc").val()
            }];
            var childWeight=0;
          //  console.log($("#childWeight").val());
            if($("#childWeight").is(":empty")){
                childWeight=1;

            }
            else{
                childWeight=parseFloat($("#childWeight").val())
            }

            sumArray=[{
                userId: parseInt($("#itemMember option:selected").val()),
                weight: childWeight
            }];
            grouparray = JSON.stringify(grouparray);
            sumArray=JSON.stringify(sumArray);

        if($(".savemyEdit").attr("id")){
            var thisId=parseInt(this.id.match(/\d+/g));
            /*if(radioGroup==1){
                $.ajax({
                    type: "POST",
                    url: itemManageUrl,
                    data: {
                        categoryId: window.cateId,
                        itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        groupManagerId: parseInt($("#itemmanager").val()),
                        isGroup: 1,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        jobDesc: grouparray,
                        jsonChildWeight: sumArray,
                        option:"modify"

                    },
                    success: function (data) {
                        alert("修改成功!");
                        $(".form-control").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#file").removeAttr("disabled");
                        allItem.splice(window.countToCount,1,data.data.item);
                        $("#itemName_"+window.countToCount).text(data.data.item.itemName);
                        $("#workload_"+window.countToCount).text(data.data.item.workload);
                        $("#teacherName_"+window.countToCount).text(data.data.item.teacherName);

                    }

                })
            }
            else {*/
                $.post(itemManageUrl,{
                        categoryId: window.cateId,
                        itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        //   ownerId: $("#itemmanager").val(),
                        isGroup: 0,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        //   jobDesc: grouparray,
                        jsonChildWeight: sumArray,
                        option:"modify"

                    }, function (data) {
                        alert("修改成功!");
                        $(".form-control").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#file").removeAttr("disabled");
                        allItem.splice(window.countToCount,1,data.data.item);
                        $("#itemName_"+window.countToCount).text(data.data.item.itemName);
                        $("#workload_"+window.countToCount).text(data.data.item.workload);
                        $("#teacherName_"+window.countToCount).text(data.data.item.teacherName);

                    }

                )
           /* }*/
        }
           else{
           /* if(radioGroup==1){
                $.ajax({
                    type: "POST",
                    url: itemManageUrl,
                    data: {
                        categoryId: window.cateId,
                     //   itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        groupManagerId:  parseInt($("#itemmanager").val()),
                        isGroup: 1,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        jobDesc: grouparray,
                        jsonChildWeight: sumArray
                        //   option:"modify"

                    },
                    success: function (data) {
                        alert("添加成功!");
                        allItem.push(data.data.item);
                        showImportPreview(data.data.item,itemCount);
                        itemCount++;
                        $(".submitTo").attr("id","submitTo_"+data.data.item.itemId);
                        $(".savemyEdit").attr("id","savemyEdit_"+data.data.item.itemId);
                       /!* $(".form-control").attr("disabled","disabled");
                         $("#year").removeAttr("disabled");
                         $("#term").removeAttr("disabled");*!/
                    }

                })
            }
            else {*/
                $.post(itemManageUrl,{
                        categoryId: window.cateId,
                        //   itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        //   ownerId: $("#itemmanager").val(),
                        isGroup: 0,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        //   jobDesc: grouparray,
                        jsonChildWeight: sumArray
                        //   option:"modify"

                    }, function (data) {
                        alert("添加成功!");

                        allItem.push(data.data.item);
                        showImportPreview(data.data.item,itemCount);
                        itemCount++;
                        $(".submitTo").attr("id","submitTo_"+data.data.item.itemId);
                        $(".savemyEdit").attr("id","savemyEdit_"+data.data.item.itemId);
                       /* $(".form-control").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");*/
                    }

                )
          /*  }*/

        }

    });
   $(document).off("click",".importNewFile");
    $(document).on("click",".importNewFile",function () {
        var thisId=this.id.match(/\d+/g);
        var data=new FormData;
        data.append("file",$("#file")[0].files[0]);
        if($('#file').val()){
            $.ajax({
                url:importFileUrl+"?categoryId="+thisId,
                type:"POST",
                dataType:"JSON",
                data:data,
                contentType: false,
                processData: false,
                success:function (msg) {
                    alert("上传成功！");
                    $(".submitItem").show();
                    //     window.itemDiv=  msg.data.itemList;
                    /* window.itemDiv.push(msg.data.itemList);*/
                    $(".importItemShow").show();
                    //   $(".importItemTbody").append()
                    showImportPreview(msg.data.itemList,itemCount);
                    while(itemCount<msg.data.itemList.length){
                        itemCount++;
                    }

                    for(var key in msg.data.itemList){
                        allItem.push(msg.data.itemList[key]);
                    }
                    JSON.stringify(allItem);
                    console.log(allItem);
                },
                error:function () {
                    alert("上传失败！");
                }
            });
        }
        else{
            alert("请先选择文件!");
        }

    });
    $(document).off("click",".submitTo");
    $(document).on("click",".submitTo",function () {
       var thisId=parseInt(this.id.match(/\d+/g));
        if(confirm("确认提交？")){
            $.post(itemManaPublicUrl+"?itemId="+thisId,function () {

                //  $("#statusChange_"+submitId).text("已提交");
                $(".status_"+thisId).text("已提交");
                $("#deleteAll_"+thisId).remove();
                $("#addContent").modal("hide");

            })
        };

    });
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
    $(document).on("click",".addNewItem",function () {
        $(".form-control").removeAttr("disabled");
        $(".dismiss").show();
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
        $(".select2-container").css("width","100%");
        $("#groupMember").val(null);
        $(".importpara").val(null);
        $(".otherimportpara").val(null);
        $(".required").hide();
        $("#jobDesc").val(null);
        $("#childWeight").val(null);
        $("#itemmanager").val(null);

    });
    $(document).on("click",".submitItem",function () {
        var chooseitem=$(".submitmyself");
        var itemStr='';
        for(var i=0;i<chooseitem.length;i++){
            if(i!=chooseitem.length-1){
                if(chooseitem.eq(i).is(':checked')){
                    itemStr+="itemId="+chooseitem.eq(i).attr("id")+"&";
                }
            }
            else {
                itemStr+="itemId="+chooseitem.eq(i).attr("id");
            }

        }
        if(confirm("确认提交？")){
            $.post(itemManaPublicUrl+"?"+itemStr,function () {

                //  $("#statusChange_"+submitId).text("已提交");

                for(var i=0;i<chooseitem.length;i++){
                    if(chooseitem.eq(i).is(':checked')){
                        $(".status_"+chooseitem.eq(i).attr("id")).text("已提交");
                        $("#deleteAll_"+chooseitem.eq(i).attr("id")).remove();
                        chooseitem.eq(i).removeAttr('checked');
                        $(".submitItem").removeAttr('checked');
                    }

                }

            })
        };


    });
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
    /*auditor-check*/

    $(document).on("click",".auditor",function () {
        $(".showThead").show();
        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        $("#myModalLabel").empty();
        $("#myModalLabel").append("<p class='page-nav'><i class='fa fa-bar-chart' style='z-index: 100'></i>&nbsp;工作当量管理&nbsp;/&nbsp;<span class='current-page'>工作当量审核</span></p>" +
            "<p class='project'><span class='itemName'> " + $(this).parent().prev().find(".itemName").text() + "</span></p>" +
            "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
            "<p class='message'>审核截止时间：" + $(this).prev().text() + "</p>");
        $.get(auditorManageItemUrl+"?"+'importRequired=0',function (data) {
            $(".showDesc").empty();
            var dataArray=new Array();
            for( var applyItemCount = 0; applyItemCount < data.data.nonCheckedItem.length; applyItemCount++){

                if(data.data.nonCheckedItem[applyItemCount].categoryId==reg){
                    dataArray.push(data.data.nonCheckedItem[applyItemCount]);
                }
            };
            showapplydata(dataArray);
        });
    });

    /*reviewer-reviewe*/

    $(document).off("click",".reviewer");
    $(document).on("click",".reviewer",function () {
        var flag=this.id;
        var reg=parseInt(flag.match(/\d+/g));
        $("#myModalLabel").empty();
        $("#myModalLabel").append( "<p class='page-nav'><i class='fa fa-bar-chart' style='z-index: 100'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class='current-page'>工作当量复核</span></p>" +
            "<p class='project'><span class='itemName'> " + $(this).parent().prev().find(".itemName").text() + "</span></p>" +
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
                    var newAct = "<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_reviewer' id='btn-viewdetail-reviewer'>查看详情</a>" ;
                    $(".tbody tr:last td:eq(4)").append(newAct).attr("class","operation-btn-three");

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
                            $(".tbody tr:last td:eq(4)").append(act).attr("class","operation-btn-three");
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
            }

        });

    });

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

        $("#viewdetail_reviewer .project").append( "<span class='itemName'>" + jsonInfo.itemName +"</span>" );
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
            praValues = jsonInfo.paramDesc[m].desc + "：" + jsonInfo.parameterValues[m].value;
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

    $(document).on("click",".sure",function () {
        var flag=this.id;
        var passItemId=parseInt(flag.match(/\d+/g));
        var itemstr='itemId='+passItemId+'&status=2';
        $.ajax({
            type:"POST",
            url:itemStatusUrl+"?"+itemstr,
            success:function () {
                alert("操作成功！");
                $("#pass_"+passItemId).attr("disabled","disabled");
                $("#refuse_"+passItemId).attr("disabled","disabled");

            }

        });
        $('#reviewe_'+passItemId).text('已通过');
    });
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
                    $("#pass_"+refuItemId).attr("disabled","disabled");
                    $("#refuse_"+refuItemId).attr("disabled","disabled");
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
            $(".required").show();


        }
        else {
            $(".item_manager").css("display","none");
            $(".item_group").css("display","none");
            $(".required").hide();

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
        var addMessage="<tr><td style='width: 120px;'><select class='groupMemberName teacherName' ><option value=''></option> </select></td><td><input type='text' class='groupMemberSymbol' name='group' onblur='reminder(this)' style='width:120px; height: 38px; padding-left: 8px;'></td><td style='position: relative;'><input type='text' class='groupMemberWeight' name='weight' onblur='reminder(this)'  style='width:120px; height: 38px; padding-left: 8px;'><button type='button' class='btn btn-danger removeOtherRow removeRow' style='position: absolute; top: 12px; right: -22px;'><i class='fa fa-trash'></i></button></td></tr>";
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
    $(document).on("click",".removeRow",function () {
        this.closest("tr").remove();
    });
    $(document).off("click","#showaddGroupMessage");
    $(document).on("click","#showaddGroupMessage",function () {
        var addMessage="<tr><td><select class='showgroupMemberName teacherName'><option value=''></option> </select></td><td><input type='text' class='showgroupMemberSymbol' style='width: 100px;'></td><td><input type='text' class='showgroupMemberWeight' style='width: 100px'></td></tr>";
        $('#showAddgroupPramter').append(addMessage);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.showgroupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }

        });
        $(".showgroupMemberName").select2({
            placeholder:"",
            allowClear: true,
            width: "100%",

        });
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

});
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
                    /* $('#firstteacherName').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');

                     */       }
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
        if(roleList.length==2){
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
          //  applyworkload();

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
          //  importWorkload();

        }

    }
    else{
        $("#dropdownMenu1").hide();
        $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher-left-sidebar",{test:12},function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
            $(".userName").text(userNameUrl);
            $(".userTeacher").text(userNameUrl+"老师！");
        });
        /*$.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",{test:12},function (html) {
            /!*$(".right_hole").empty();
            $(".right_hole").append(html);*!/
        });
        applyworkload();*/
        $.get(pageManageUrl+"?"+"regionName=PrimTeachers/revieMyWorkload",function (html) {
            $(".right_hole").empty();
            $(".right_hole").append(html);
        });
    }
}
function changeSideBar(role,roleList) {
    $.ajaxSetup({
        async : false
    });
        if(roleList.length==3){
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
            }
        }
}
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
function showImportPreview(data,itemCount) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    /*if($(".resetNum").length>0){
     $(".ResetItem tr:last td:eq(0)").text();
     }*/
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
           /* var checkboxStr='<div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>'
      */   var checkboxStr='<input type="checkbox" name="checkbox1" value="checkbox" class="submitmyself" id="'+Info.itemId+'">' ;
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
    else{
        $(".importItemTbody").append(rowInfo);
        $(".importItemTbody tr:last").attr("class","resetNum");
        for(var j=0;j<6;j++)//单元格
        {
            $(".importItemTbody tr:last").append(cellInfo);
            $(".importItemTbody tr:last").attr("class","trDele_"+data.itemId);
        }

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
function showPara(item) {

    for(var t=0;t<item.parameterValues.length;t++){
        var symbolname=item.parameterValues[t].symbol;
        $('.parameterThead').append("<tr><th class='pramterDesc' id='"+symbolname+"' style='font-size: 13px;'>"+item.descAndValues[t].desc+"</th><td><input type='text' class='importpara form-control importpara_"+t+"'></td></tr>");
      //  $(".otherParaTh").append("<tr><th class='showpramterDesc' id='"+symbolname+"' style='font-size: 13px;'>"+item[comp].formulaParameterList[t].desc+"</th><td><input type='text' class='showparameterName'></td></tr>")

    }
    if(item.otherJsonParameters!=null){
        for(var s=0;s<item.otherJsonParameters.length;s++){
            $('.otherParaThead').append("<tr><th class='otherPramterkey' style='font-size: 13px'>"+item.otherJsonParameters[s].key+"</th><td><input type='text' class='otherimportpara form-control otherimportpara_"+s+"'></td></tr>");
            //  $('#showotherparameterTable').append("<tr><th class='showotherPramterkey' style='font-size: 13px;'>"+item[comp].otherJsonParameters[s].key+"</th><td><input type='text' class='showotherparameterName'></td></tr>");
        }
    }
    else {
        $(".hiddenRequired").hide();
    }

}
function pageshow() {
    if ($BODY.hasClass('nav-sm'))  {
        $SIDEBAR_MENU.find('li.active-sm ul').show();
        $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        $(".profile_info").show();
        $(".child_menu").show();
       /* $("#clickToggle1").on("click",function () {
            $(".ck1").toggle("slow");

        });*/
      //  $(".firstToggleLi").unbind("mouseenter").unbind("mouseleave");

        /*	$(".active").attr("onmouseout");
         $(".active").attr("onmouseover");
         $(".active").mouseout(function () {
         var s = event.toElement || event.relatedTarget;
         if (!$(".child_menu").contains(s)) { $(".child_menu").hide("slow"); }
         });
         $(".active").mouseover(function () {
         var s = event.fromElement || event.relatedTarget;
         if (!$(".child_menu").contains(s)) { $(".child_menu").show("slow"); }
         });*/
        $BODY.toggleClass('nav-md nav-sm');
    }


}
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