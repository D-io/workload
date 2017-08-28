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
         format: "yyyy-mm-dd hh:ii:ss"//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
         });

       /* data-plugin-datepicker*/
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
    var allItem=[];
    var itemCount=0;
    var cateId=0;
    var countToCount=0;
    /*$(document).off("click",".importList");
    $(document).on("click",".importList",function () {
        var flag = this.id;
        window.myFlag = parseInt(flag.match(/\d+/g));
        $("#file").empty();
    });*/
    $(document).off("click",".importList");
    $(document).on("click",".importList",function () {
        var flag = this.id;
        flag = parseInt(flag.match(/\d+/g));
        window.cateId=flag;
        console.log(window.cateId);
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
            if(msg.data.itemList.length>0){
            //    $(".parameterTh").append("")
                $(".parameterTh").empty();
                $(".otherParaTh").empty();
                $(".submitItem").show();
             //    showPara(msg.data.unCommittedItem[0]);

                $(".importItemTbody").empty();
                showImportPreview(msg.data.itemList,itemCount);
                if(itemCount<msg.data.itemList.length){
                    itemCount++;
                }
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
       console.log(window.countToCount);
       console.log(countToCount);

        if($(".status_"+thisId).text()=="已提交"){
            $(".savemyEdit").hide();
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
        $("#itemMember").select2().val(allItem[thisId].groupManagerId).trigger("change");
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
            $("#itemmanager").select2().val(allItem[thisId].groupManagerId).trigger("change");
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
            if(radioGroup==1){
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
            else {
                $.post(itemManageUrl,{
                        categoryId: window.cateId,
                        itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        //   groupManagerId: $("#itemmanager").val(),
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
            }
        }
           else{
            if(radioGroup==1){
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
                       /* $(".form-control").attr("disabled","disabled");
                         $("#year").removeAttr("disabled");
                         $("#term").removeAttr("disabled");*/
                    }

                })
            }
            else {
                $.post(itemManageUrl,{
                        categoryId: window.cateId,
                        //   itemId:thisId,
                        itemName: $('#itemName').val(),
                        applyDesc: $('#applyDesc').val(),
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        //   groupManagerId: $("#itemmanager").val(),
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
            }

        }

    });

   /* $(document).off("click",".commit");
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

    });*/
   $(document).off("click",".importNewFile");
    $(document).on("click",".importNewFile",function () {
        var thisId=this.id.match(/\d+/g);
        var data=new FormData;
        data.append("file",$("#file")[0].files[0]);
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
                if(itemCount<msg.data.itemList.length){
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
    });
    $(document).off("click",".submitTo");
    $(document).on("click",".submitTo",function () {
       var thisId=parseInt(this.id.match(/\d+/g));
        $.post(itemManaPublicUrl+"?itemId="+thisId,function () {
            confirm("确认成功？");
          //  $("#statusChange_"+submitId).text("已提交");
            $(".status_"+thisId).text("已提交");
            $("#deleteAll_"+thisId).remove();
            $("#addContent").modal("hide");

        })
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
        $("#itemMember").val(null);
        $(".select2").val(null);
        $("#groupMember").val(null);
        $(".importpara").val(null);
        $(".otherimportpara").val(null);
        $(".required").hide();
        $("#jobDesc").val(null);
        $("#childWeight").val(null);
        $("#itemmanager").val(null);

    });

/*
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

    /!*auditor-check*!/

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
        var addMessage="<tr><td><select class='groupMemberName teacherName' style='width: 30%;'><option value=''></option> </select></td><td><input type='text' class='groupMemberSymbol'></td><td><input type='text' class='groupMemberWeight'></td></tr>";
        $('#AddgroupPramter').append(addMessage);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.groupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }

        });
        $(".groupMemberName").select2({
            allowClear: true,
            width: "100%",
        });
    });
    $(document).off("click","#showaddGroupMessage");
    $(document).on("click","#showaddGroupMessage",function () {
        var addMessage="<tr><td><select class='showgroupMemberName teacherName'><option value=''></option> </select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
        $('#showAddgroupPramter').append(addMessage);
        $.get(TeacherInfoUrl, {test: 12}, function (data) {
            for (var i = 0; i < data.data.teacherList.length; i++) {
                $('.showgroupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
            }

        });
        $(".showgroupMemberName").select2({
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
        $(".editApply").hide();
        $(".editSubmit").hide();
        $(".dismissagain").show();
        $(".savemyApplyAgain").show();
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
    $(document).off("click",".editSubmit");
    $(document).on("click",".editSubmit",function () {
        var submitId=parseInt(this.id.match(/\d+/g));
        $.post(itemManaPublicUrl+"?itemId="+submitId,function () {
            confirm("确认提交？");
            $("#statusChange_"+submitId).text("有待审核");
           // $("#downLoadAdd_"+submitId).hide();
            $("#showContent").modal("hide");

        })
    });
    $(document).on("click",".newsubmit",function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        $.post(itemManaPublicUrl+"?itemId="+thisId,function () {
            confirm("确认提交？");
            $("#statusChange_"+thisId).text("有待审核");
          //  $("#downLoadAdd_"+submitId).hide();
            $("#addContent").modal("hide");

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
    $.ajaxSetup({
        async : false
    });
    if(role=="ADMIN"){

        $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",{test : 12},function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
            $(".userName").text(userNameUrl);
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
                allowClear: true,
                width:"100%",
            });
        /*    $("#firstteacherName").select2({
                allowClear: true,
                width:"100%",
            });*/

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
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
            });
           /* $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });*/
            applyworkload();

        }
        else {
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",{test:12},function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
                $(".userName").text(userNameUrl);
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
        $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher-left-sidebar",{test:12},function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
            $(".userName").text(userNameUrl);
        });
        $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",{test:12},function (html) {
            /*$(".right_hole").empty();
            $(".right_hole").append(html);*/
        });
        applyworkload();
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
                    $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",{test:12},function (html) {
                        $(".scroll-view").empty();
                        $(".scroll-view").append(html);
                        $(".userName").text(userNameUrl);
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
    $.ajaxSetup({
        async : false
    });
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",{test:12},function (html) {
        $(".scroll-view").empty();
        $(".scroll-view").append(html);
        $(".userName").text(userNameUrl);
    });
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-right-col",{test:12},function (html) {
           $(".right_hole").empty();
         $(".right_hole").append(html);
        $(".userName").text(userNameUrl);
    });
    ztree();
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

            var checkboxStr='<div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>'
            $(".importItemTbody tr:last td:eq(0)").append(checkboxStr);
            $(".importItemTbody tr:last td:eq(0)").attr("class","a-center");
            $(".importItemTbody tr:last td:eq(1)").text(Info.itemName);
            $(".importItemTbody tr:last td:eq(1)").attr("id","itemName_"+itemCount);

            $(".importItemTbody tr:last td:eq(2)").text(Info.workload);
            $(".importItemTbody tr:last td:eq(2)").attr("id","workload_"+itemCount);
            $(".importItemTbody tr:last td:eq(3)").text(Info.teacherName);
            $(".importItemTbody tr:last td:eq(3)").attr("id","teacherName_"+itemCount);
            $(".importItemTbody tr:last td:eq(4)").text("未提交");
            $(".importItemTbody tr:last td:eq(4)").attr("class","status_"+Info.itemId);
            var str="<a class=\"btn btn-primary showImportAll\" id=\"showImportAll_"+ itemCount+"\" data-toggle='modal' data-target='#addContent'>查看详情</a><a class=\"btn btn-primary deleteAll\" id=\"deleteAll_"+ Info.itemId+"\">删除操作</a>";
            $(".importItemTbody tr:last td:eq(5)").append(str);
            itemCount++;

        }
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
