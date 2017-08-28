function ownerApply(domId) {

    $(document).ready(function() {
        $('.add').unbind('click');
        $('.add').bind('click', function () {
          //  $(".applymodalbody").empty();
            $(".form-control").removeAttr("disabled");
            $(".savemyApply").removeAttr("id");
            $(".parameterName").removeAttr("disabled","disabled");
            $('.otherparameterName').removeAttr("disabled","disabled");
            $('#itemName').val(null);
            $('#applyDesc').val(null);
            $('#workload').val(null);
            $("#AddgroupPramter").empty();
            $("#itemmanager").val(null);
            $('.parameterName').val(null);
            $('.otherparameterName').val(null);
            $(".radioChange").eq(0).attr("checked","true");
            $(".radioChange").eq(1).removeAttr("checked");
            $(".item_manager").hide();
            $(".item_group").hide();
            $(".dismiss").show();
            $(".saveAgain").hide();
            $(".savemyApply").show();
            $(".newsubmit").hide();
            $(".neweditor").hide();
        });
      /*  var CurrentName='';
        $.get(currentTeaIdUrl,function (data) {
            CurrentName =data.data.teacher.name;
        });*/
        $(document).off("click",".savemyApply");
        $(document).on("click", ".savemyApply", function () {

            var $parametername = $(".pramterDesc");
            var newArray = new Array();
            for (var i = 0; i < $(".parameterName").length; i++) {
                var dom = $(".pramterDesc").eq(i).attr("id");
                newArray.push({symbol: dom, value: parseInt($(".parameterName").eq(i).val())});

            }
            newArray = JSON.stringify(newArray);
            var otherArray = new Array();
            var otherPramterkey = $(".otherPramterkey");
            for (var j = 0; j < otherPramterkey.length; j++) {
                var otherKey = $(".otherPramterkey").eq(j);
                otherArray.push({key: otherKey.text(), value: $(".otherparameterName").eq(j).val()});

            }
            otherArray = JSON.stringify(otherArray);

            if($("#groupMessageTable").find("td").length>0){
                var grouparray = new Array();
                //   var sumArray=new Array();
                var groupmessageArray = $('.groupMemberName');
                for (var c = 0; c < groupmessageArray.length; c++) {
                    grouparray.push({
                        userId: parseInt($(".groupMemberName option:selected").eq(c).val()),
                        jobDesc: $(".groupMemberSymbol").eq(c).val()
                    });
                    /* sumArray.push({
                     userId: parseInt($(".showgroupMemberName option:selected").eq(c).val()),
                     userName: $(".showgroupMemberName option:selected").eq(c).text(),
                     jobDesc: $(".showgroupMemberSymbol").eq(c).val(),
                     weight: parseFloat($(".showgroupMemberWeight").eq(c).val())
                     })*/
                }
                grouparray = JSON.stringify(grouparray);
                //  sumArray=JSON.stringify(sumArray);
                /*  if(!window.localStorage){
                 alert("浏览器支持localstorage");
                 }else{
                 var storage=window.localStorage;
                 if(storage.item_+saveReg){
                 storage.removeItem(storage.item_+saveReg);
                 }
                 storage.setItem("item_"+saveReg,sumArray);

                 }*/
                var childWeight = new Array();
                for (m = 0; m < groupmessageArray.length; m++) {
                    childWeight.push({
                        userId: parseInt($(".groupMemberName option:selected").eq(m).val()),
                        weight: parseFloat($(".groupMemberWeight").eq(m).val())
                    });
                }
                childWeight = JSON.stringify((childWeight));
            }
            else{
                var childWeight = new Array();
                childWeight=[{userId:userId,weight:1}];
                childWeight = JSON.stringify((childWeight));
            }

            var radio = $("input:radio[name='optionsRadios']:checked");
            //  var applicant = $('#applicant option:selected');
            var itemmanager = $('#itemmanager option:selected');
            if($(".savemyApply").attr("id")){
                var thisId=parseInt(this.id.match(/\d+/g));
                if(radio.val()==1){
                    $.ajax({
                        type: "POST",
                        url: itemManageUrl,
                        data: {
                            categoryId: domId,
                            itemId:thisId,
                            itemName: $('#itemName').val(),
                            applyDesc: $('#applyDesc').val(),
                            //   workload: $('#workload').val(),
                            //   ownerId: applicant.val(),
                            groupManagerId: itemmanager.val(),
                            isGroup: 1,
                            jsonParameter: newArray,
                            otherJson: otherArray,
                            jobDesc: grouparray,
                            jsonChildWeight: childWeight
                            //   file:formdata

                        },
                        success: function (data) {
                            var rowInfo = "<tr></tr>";
                            var cellInfo = "<td></td>";
                            var Info = data.data.item;
                            $(".neweditor").show();
                            $(".neweditor").attr("id","neweditor_"+Info.itemId);
                            $(".newsubmit").show();
                            $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                            $(".savemyApply").hide();
                            $(".dismiss").hide();
                            $(".form-control").attr("disabled","disabled");
                            $(".parameterName").attr("disabled","disabled");
                            $(".otherparameterName").attr("disabled","disabled");
                            $(".groupMemberName").attr("disabled","disabled");
                            $(".groupMemberSymbol").attr("disabled","disabled");
                            $(".groupMemberWeight").attr("disabled","disabled");
                            $("#year").removeAttr("disabled");
                            $("#term").removeAttr("disabled");
                            $(".itemname_"+Info.itemId).text(Info.itemName);
                            $(".workload_"+Info.itemId).text(Info.workload);


                         //   $(".savemyApply").attr("id","savemyApply_"+Info.itemId);
                       /*     if ($(".newTable").length>0) {
                                $(".tbody").append(rowInfo);

                                for (var j = 0; j < 5; j++)//单元格
                                {
                                    $(".tbody tr:last").append(cellInfo);
                                }
                                var $itemCt=$(".itemCount");
                                $(".tbody tr:last td:eq(0)").text(parseInt($itemCt.eq($itemCt.length-1).text())+1);
                                $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                                $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                /!*   var count="";
                                 var CountId="";
                                 var CategId="";
                                 var CateValue="";
                                 for (var i = 0; i < listLength; i++) {
                                 if (Info[i].teacherName == userNameUrl) {
                                 count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                 CategId = Info[i].categoryId;
                                 CateValue=Info[i].ownerId;
                                 }
                                 }
                                 *!/
                                $(".tbody tr:last td:eq(2)").text(Info.workload);

                                $(".tbody tr:last td:eq(3)").text("暂未提交");
                                $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + CountId);


                                var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + Info.itemId + "\">查看详情</a>";
                                $(".tbody tr:last td:eq(4)").append(act);

                            }
                            else {

                                var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                    '<th class="sorting">工作量</th><th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                                // $(".applymodalbody").empty();
                                $(".applymodalbody").append(tablestr);

                                $(".tbody").append(rowInfo);

                                for (var j = 0; j < 5; j++)//单元格
                                {
                                    $(".tbody tr:last").append(cellInfo);
                                }
                                /!* var count="";
                                 var CountId="";
                                 var CategId="";*!/

                                $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                                $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                                /!* $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                 for (var i = 0; i < listLength; i++) {
                                 if (Info[i].teacherName == userNameUrl)
                                 count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                 CategId=Info[i].categoryId;
                                 }
                                 if(!window.localStorage){
                                 alert("浏览器支持localstorage");
                                 }else{
                                 var storage=window.localStorage;
                                 storage.setItem("item_"+CountId,sumArray);
                                 *!/
                                // }
                                $(".tbody tr:last td:eq(2)").text(Info.workload);
                                //  $(".tbody tr:last td:eq(3)").text();

                                $(".tbody tr:last td:eq(3)").text("暂未提交");
                                $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);


                                var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + CountId + "\">查看详情</a>";
                                $(".tbody tr:last td:eq(4)").append(act);
                            }
*/
                            /*         var formdata = new FormData;
                             formdata.append("file", $("#formName")[0].files[0]);
                             $('#addContent').modal('hide');
                             for(var hideCount=0;hideCount<listLength;hideCount++){
                             if (Info[hideCount].teacherName == userNameUrl) {
                             /!* var count = Info[i].workload;
                             var CategId = Info[i].categoryId;*!/

                             var CountId = Info[hideCount].itemId;
                             }
                             $(".hiddendistrict").append("<div class='groupMember_"+CountId+"'>"+Info[hideCount].teacherName+"</div><div class='jobDesc_"+CountId+"'>"+Info[hideCount].jobDesc+"</div><div class='jobWeight_"+CountId+"'>"+Info[hideCount].jsonChildWeight+"</div>")

                             }*/
                            $(document).on("click","#show_"+Info.itemId,function () {
                                var newId=this.id;
                                var newReg=parseInt(newId.match(/\d+/g));
                                $(".savemyApplyAgain").hide();
                                $(".savemyEdit").hide();
                                if($("#statusChange_"+newReg).text()=="暂未提交"){
                                    $(".editApply").show();
                                    $(".editApply").attr("id","editApply_"+newReg);
                                    $(".editSubmit").show();
                                    $(".editSubmit").attr("id","editSubmit_"+newReg);
                                    //  $(".editDelete").show();
                                    // $(".editDelete").attr("id","editDelete"+newReg);
                                }
                                else{
                                    $(".editApply").hide();
                                    //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                                    $(".editSubmit").hide();

                                }
                                $("#showitemName").val(Info.itemName);
                                $("#showitemName").attr("disabled","true");
                                $("#showapplyDesc").val(Info.applyDesc);
                                $("#showapplyDesc").attr("disabled","true");
                                if(Info.isGroup==0){
                                    $("#single").attr("checked",'checked');
                                    $("#group").attr("disabled","true");

                                }
                                else{
                                    $("#group").attr("checked",'checked');
                                    $("#single").attr("disabled","true");
                                    $(".showitem_manager").show();
                                    $(".showitem_group").show();
                                }
                                var showPram=Info.parameterValues;
                                for(var i=0;i<showPram.length;i++){
                                    $(".showparameterName").eq(i).val(showPram[i].value);
                                    $(".showparameterName").eq(i).attr("disabled","true");

                                }
                                var showOtherPara=Info.otherJsonParameters;
                                for(var n=0;n<showOtherPara.length;n++){
                                    $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                    $(".showotherparameterName").eq(n).attr("disabled","true");

                                }
                                $("#showitemmanager").attr("disabled","true");
                                $("#showitemmanager").select2().val(Info.groupManagerId).trigger("change");
                                $('#showAddgroupPramter').empty();
                                var addStr='';
                                //    var b = localStorage.getItem("item_"+window.Temp[newReg-1].itemId);
                                //    b=JSON.parse(b);

                                for(var pramterCount=0;pramterCount<Info.jobDescList.length;pramterCount++){

                                    var addStr="<tr><td><select class='showgroupMemberName teacherName'></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                                    $('#showAddgroupPramter').append(addStr);
                                    $.get(TeacherInfoUrl,{test:12},function (data) {
                                        for(var i=0;i<data.data.teacherList.length;i++){
                                            $('.showgroupMemberName:last').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
                                        }

                                    });
                                    $(".teacherName").select2({
                                        allowClear: true,
                                        width:"100%",
                                    });
                                    //  $(".showgroupMemberName").eq(pramterCount).append("<option value='"+window.Temp[newReg-1].jobDescList[pramterCount].userId+"' selected='selected'></option>");
                                    $(".showgroupMemberName").eq(pramterCount).select2().val(Info.jobDescList[pramterCount].userId).trigger("change");
                                    $(".showgroupMemberSymbol").eq(pramterCount).val(Info.jobDescList[pramterCount].jobDesc);
                                    $(".showgroupMemberWeight").eq(pramterCount).val(Info.childWeightList[pramterCount].weight);
                                }
                                $(".showgroupMemberName").attr("disabled","disabled");
                                $(".showgroupMemberSymbol").attr("disabled","disabled");
                                $(".showgroupMemberWeight").attr("disabled","disabled");
                            });
                        }

                    })
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: itemManageUrl,
                        data: {
                            categoryId: domId,
                            itemId:thisId,
                            itemName: $('#itemName').val(),
                            applyDesc: $('#applyDesc').val(),
                            //   workload: $('#workload').val(),
                            //   ownerId: applicant.val(),
                            //  groupManagerId: ,
                            isGroup: 0,
                            jsonParameter: newArray,
                            otherJson: otherArray,
                            jsonChildWeight:childWeight
                            // jobDesc: grouparray,
                            //  jsonChildWeight: childWeight,
                            //   file:formdata

                        }
                        , success: function (data) {
                            var Info = data.data.item;
                            $(".neweditor").show();
                            //  $(".neweditor").attr("id","neweditor_"+Info.itemId);
                            $(".newsubmit").show();
                            $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                            $(".savemyApply").hide();
                            $(".dismiss").hide();
                            /*$(".saveAgain").hide();
                             $(".saveAgain").attr("id","saveAgain_"+Info.itemId);*/
                            $(".savemyApply").attr("id","savemyApply_"+Info.itemId);
                            $(".form-control").attr("disabled","disabled");
                            $("#year").removeAttr("disabled");
                            $("#term").removeAttr("disabled");
                            $("#itemname_"+Info.itemId).text(Info.itemName);
                            $("#workload_"+Info.itemId).text(Info.workload);
                            $(document).on("click","#show_"+Info.itemId,function () {
                                var newId=this.id;
                                var newReg=parseInt(newId.match(/\d+/g));
                                $(".savemyApplyAgain").hide();
                                $(".savemyEdit").hide();
                                if($("#statusChange_"+newReg).text()=="暂未提交"){
                                    $(".editApply").show();
                                    $(".editApply").attr("id","editApply_"+newReg);
                                    $(".editSubmit").show();
                                    $(".editSubmit").attr("id","editSubmit_"+newReg);
                                }
                                else{
                                    $(".editApply").hide();
                                    //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                                    $(".editSubmit").hide();
                                }
                                $("#showitemName").val(Info.itemName);
                                $("#showitemName").attr("disabled","true");
                                $("#showapplyDesc").val(Info.applyDesc);
                                $("#showapplyDesc").attr("disabled","true");
                                if(Info.isGroup==0){
                                    $("#single").attr("checked",'checked');
                                    $("#group").attr("disabled","true");

                                }
                                else{
                                    $("#group").attr("checked",'checked');
                                    $("#single").attr("disabled","true");
                                    $(".showitem_manager").show();
                                    $(".showitem_group").show();
                                }
                                var showPram=Info.parameterValues;
                                for(var i=0;i<showPram.length;i++){
                                    $(".showparameterName").eq(i).val(showPram[i].value);
                                    $(".showparameterName").eq(i).attr("disabled","true");

                                }
                                var showOtherPara=Info.otherJsonParameters;
                                for(var n=0;n<showOtherPara.length;n++){
                                    $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                    $(".showotherparameterName").eq(n).attr("disabled","true");

                                }
                                $(".showitem_manager").hide();
                                $(".showitem_group").hide();


                            });
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
                            categoryId: domId,
                            itemName: $('#itemName').val(),
                            applyDesc: $('#applyDesc').val(),
                            //   workload: $('#workload').val(),
                            //   ownerId: applicant.val(),
                            groupManagerId: itemmanager.val(),
                            isGroup: 1,
                            jsonParameter: newArray,
                            otherJson: otherArray,
                            jobDesc: grouparray,
                            jsonChildWeight: childWeight
                            //   file:formdata

                        },
                        success: function (data) {
                            var rowInfo = "<tr></tr>";
                            var cellInfo = "<td></td>";
                            var Info = data.data.item;
                            $(".neweditor").show();
                            $(".neweditor").attr("id","neweditor_"+Info.itemId);
                            $(".newsubmit").show();
                            $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                            $(".savemyApply").hide();
                            $(".dismiss").hide();
                         /*   $(".saveAgain").hide();
                            $(".saveAgain").attr("id","saveAgain_"+Info.itemId);*/
                            $(".form-control").attr("disabled","disabled");
                            $(".parameterName").attr("disabled","disabled");
                            $(".otherparameterName").attr("disabled","disabled");
                            $(".groupMemberName").attr("disabled","disabled");
                            $(".groupMemberSymbol").attr("disabled","disabled");
                            $(".groupMemberWeight").attr("disabled","disabled");

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
                                $(".tbody tr:last td:eq(0)").text(parseInt($itemCt.eq($itemCt.length-1).text())+1);
                                $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                                $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);
                                /*   var count="";
                                 var CountId="";
                                 var CategId="";
                                 var CateValue="";
                                 for (var i = 0; i < listLength; i++) {
                                 if (Info[i].teacherName == userNameUrl) {
                                 count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                 CategId = Info[i].categoryId;
                                 CateValue=Info[i].ownerId;
                                 }
                                 }
                                 */
                                $(".tbody tr:last td:eq(2)").text(Info.workload);
                                $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);
                                $(".tbody tr:last td:eq(3)").text("暂未提交");
                                $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);


                                var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + Info.itemId + "\">查看详情</a>";
                                $(".tbody tr:last td:eq(4)").append(act);

                            }
                            else {

                                var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                    '<th class="sorting">工作量</th><th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                                // $(".applymodalbody").empty();
                                $(".applymodalbody").append(tablestr);

                                $(".tbody").append(rowInfo);

                                for (var j = 0; j < 5; j++)//单元格
                                {
                                    $(".tbody tr:last").append(cellInfo);
                                }
                                /* var count="";
                                 var CountId="";
                                 var CategId="";*/

                                $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                                $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                                /* $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                 for (var i = 0; i < listLength; i++) {
                                 if (Info[i].teacherName == userNameUrl)
                                 count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                 CategId=Info[i].categoryId;
                                 }
                                 if(!window.localStorage){
                                 alert("浏览器支持localstorage");
                                 }else{
                                 var storage=window.localStorage;
                                 storage.setItem("item_"+CountId,sumArray);
                                 */
                                // }
                                $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                $(".tbody tr:last td:eq(2)").text(Info.workload);
                                $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);
                                $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);
                                //  $(".tbody tr:last td:eq(3)").text();

                                $(".tbody tr:last td:eq(3)").text("暂未提交");
                                $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);


                                var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + Info.itemId + "\">查看详情</a>";
                                $(".tbody tr:last td:eq(4)").append(act);
                            }

                            /*         var formdata = new FormData;
                             formdata.append("file", $("#formName")[0].files[0]);
                             $('#addContent').modal('hide');
                             for(var hideCount=0;hideCount<listLength;hideCount++){
                             if (Info[hideCount].teacherName == userNameUrl) {
                             /!* var count = Info[i].workload;
                             var CategId = Info[i].categoryId;*!/

                             var CountId = Info[hideCount].itemId;
                             }
                             $(".hiddendistrict").append("<div class='groupMember_"+CountId+"'>"+Info[hideCount].teacherName+"</div><div class='jobDesc_"+CountId+"'>"+Info[hideCount].jobDesc+"</div><div class='jobWeight_"+CountId+"'>"+Info[hideCount].jsonChildWeight+"</div>")

                             }*/
                            $(document).on("click","#show_"+Info.itemId,function () {
                                var newId=this.id;
                                var newReg=parseInt(newId.match(/\d+/g));
                                $(".savemyApplyAgain").hide();
                                $(".savemyEdit").hide();
                                if($("#statusChange_"+newReg).text()=="暂未提交"){
                                    $(".editApply").show();
                                    $(".editApply").attr("id","editApply_"+newReg);
                                    $(".editSubmit").show();
                                    $(".editSubmit").attr("id","editSubmit_"+newReg);
                                    //  $(".editDelete").show();
                                    // $(".editDelete").attr("id","editDelete"+newReg);
                                }
                                else{
                                    $(".editApply").hide();
                                    //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                                    $(".editSubmit").hide();
                                    //  $(".editSubmit").attr("id","editSubmit_"+window.Temp[newReg-1].itemId);
                                    //   $(".editDelete").hide();
                                    //  $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);
                                }
                                $("#showitemName").val(Info.itemName);
                                $("#showitemName").attr("disabled","true");
                                $("#showapplyDesc").val(Info.applyDesc);
                                $("#showapplyDesc").attr("disabled","true");
                                if(Info.isGroup==0){
                                    $("#single").attr("checked",'checked');
                                    $("#group").attr("disabled","true");

                                }
                                else{
                                    $("#group").attr("checked",'checked');
                                    $("#single").attr("disabled","true");
                                    $(".showitem_manager").show();
                                    $(".showitem_group").show();
                                }
                                var showPram=Info.parameterValues;
                                for(var i=0;i<showPram.length;i++){
                                    $(".showparameterName").eq(i).val(showPram[i].value);
                                    $(".showparameterName").eq(i).attr("disabled","true");

                                }
                                var showOtherPara=Info.otherJsonParameters;
                                for(var n=0;n<showOtherPara.length;n++){
                                    $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                    $(".showotherparameterName").eq(n).attr("disabled","true");

                                }
                                $("#showitemmanager").attr("disabled","true");
                                $("#showitemmanager").select2().val(Info.groupManagerId).trigger("change");
                                $('#showAddgroupPramter').empty();

                                var addStr='';
                                //    var b = localStorage.getItem("item_"+window.Temp[newReg-1].itemId);
                                //    b=JSON.parse(b);

                                for(var pramterCount=0;pramterCount<Info.jobDescList.length;pramterCount++){

                                    var addStr="<tr><td><select class='showgroupMemberName teacherName'></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                                    $('#showAddgroupPramter').append(addStr);
                                    $.get(TeacherInfoUrl,{test:12},function (data) {
                                        for(var i=0;i<data.data.teacherList.length;i++){
                                            $('.showgroupMemberName:last').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
                                        }

                                    });
                                    $(".teacherName").select2({
                                        allowClear: true,
                                        width:"100%",
                                    });
                                    //  $(".showgroupMemberName").eq(pramterCount).append("<option value='"+window.Temp[newReg-1].jobDescList[pramterCount].userId+"' selected='selected'></option>");
                                    $(".showgroupMemberName").eq(pramterCount).select2().val(Info.jobDescList[pramterCount].userId).trigger("change");
                                    $(".showgroupMemberSymbol").eq(pramterCount).val(Info.jobDescList[pramterCount].jobDesc);
                                    $(".showgroupMemberWeight").eq(pramterCount).val(Info.childWeightList[pramterCount].weight);
                                }
                                $(".groupMemberName").attr("disabled","disabled");
                                $(".groupMemberSymbol").attr("disabled","disabled");
                                $(".groupMemberWeight").attr("disabled","disabled");

                            });
                        }

                    })
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: itemManageUrl,
                        data: {
                            categoryId: domId,
                            itemName: $('#itemName').val(),
                            applyDesc: $('#applyDesc').val(),
                            //   workload: $('#workload').val(),
                            //   ownerId: applicant.val(),
                            //  groupManagerId: ,
                            isGroup: 0,
                            jsonParameter: newArray,
                            otherJson: otherArray,
                            jsonChildWeight:childWeight
                            // jobDesc: grouparray,
                            //  jsonChildWeight: childWeight,
                            //   file:formdata

                        }
                        , success: function (data) {
                            var Info = data.data.item;
                            var rowInfo = "<tr></tr>";
                            var cellInfo = "<td></td>";
                            $(".neweditor").show();
                            //  $(".neweditor").attr("id","neweditor_"+Info.itemId);
                            $(".newsubmit").show();
                            $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                            $(".savemyApply").hide();
                            $(".dismiss").hide();
                            /*$(".saveAgain").hide();
                            $(".saveAgain").attr("id","saveAgain_"+Info.itemId);*/
                            $(".savemyApply").attr("id","savemyApply_"+Info.itemId);
                            $(".form-control").attr("disabled","disabled");
                            $(".parameterName").attr("disabled","disabled");
                            $(".otherparameterName").attr("disabled","disabled");
                         /*   $(".groupMemberName").attr("disabled","disabled");
                            $(".groupMemberSymbol").attr("disabled","disabled");
                            $(".groupMemberWeight").attr("disabled","disabled");*/
                            $("#year").removeAttr("disabled");
                            $("#term").removeAttr("disabled");
                             if ($(".newTable").length>0) {
                                $(".tbody").append(rowInfo);

                                for (var j = 0; j < 5; j++)//单元格
                                {
                                    $(".tbody tr:last").append(cellInfo);
                                }
                                var $itemCt=$(".itemCount");
                                $(".tbody tr:last td:eq(0)").text(parseInt($itemCt.eq($itemCt.length-1).text())+1);
                                $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                                $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);
                                $(".tbody tr:last td:eq(2)").text(Info.workload);
                                $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);

                                $(".tbody tr:last td:eq(3)").text("暂未提交");
                                $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);


                                var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + Info.itemId + "\">查看详情</a>";
                                $(".tbody tr:last td:eq(4)").append(act);

                            }
                            else {

                                var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                    '<th class="sorting">工作量</th><th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                                // $(".applymodalbody").empty();
                                $(".applymodalbody").append(tablestr);

                                $(".tbody").append(rowInfo);

                                for (var j = 0; j < 5; j++)//单元格
                                {
                                    $(".tbody tr:last").append(cellInfo);
                                }

                                $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                                $(".tbody tr:last td:eq(1)").text(Info.itemName);
                                $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);
                                /* var count="";
                                 var CountId="";
                                 var CategId="";
                                 for (var i = 0; i < listLength; i++) {
                                 if (Info[i].teacherName == CurrentName)
                                 count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                 CategId = Info[i].categoryId;
                                 }*/
                                $(".tbody tr:last td:eq(2)").text(Info.workload);
                                $(".tbody tr:last td:eq(1)").attr("id","workload_"+Info.itemId);
                                $(".tbody tr:last td:eq(3)").text("暂未提交");
                                $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);


                                var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + Info.itemId + "\">查看详情</a>";
                                $(".tbody tr:last td:eq(4)").append(act);
                            }

                            /*     var formdata = new FormData;
                             formdata.append("file", $("#formName")[0].files[0]);
                             $.ajax({
                             url: importProofUrl + "?itemId=" + Info.itemId,
                             type: "POST",
                             dataType: "JSON",
                             data: formdata,
                             contentType: false,
                             processData: false,
                             success: function () {
                             }

                             });*/

                            $(document).on("click","#show_"+Info.itemId,function () {
                                var newId=this.id;
                                var newReg=parseInt(newId.match(/\d+/g));
                                $(".savemyApplyAgain").hide();
                                $(".savemyEdit").hide();
                                if($("#statusChange_"+newReg).text()=="暂未提交"){
                                    $(".editApply").show();
                                    $(".editApply").attr("id","editApply_"+newReg);
                                    $(".editSubmit").show();
                                    $(".editSubmit").attr("id","editSubmit_"+newReg);
                                }
                                else{
                                    $(".editApply").hide();
                                    //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                                    $(".editSubmit").hide();
                                }
                                $("#showitemName").val(Info.itemName);
                                $("#showitemName").attr("disabled","true");
                                $("#showapplyDesc").val(Info.applyDesc);
                                $("#showapplyDesc").attr("disabled","true");
                                if(Info.isGroup==0){
                                    $("#single").attr("checked",'checked');
                                    $("#group").attr("disabled","true");

                                }
                                else{
                                    $("#group").attr("checked",'checked');
                                    $("#single").attr("disabled","true");
                                    $(".showitem_manager").show();
                                    $(".showitem_group").show();
                                }
                                var showPram=Info.parameterValues;
                                for(var i=0;i<showPram.length;i++){
                                    $(".showparameterName").eq(i).val(showPram[i].value);
                                    $(".showparameterName").eq(i).attr("disabled","true");

                                }
                                var showOtherPara=Info.otherJsonParameters;
                                for(var n=0;n<showOtherPara.length;n++){
                                    $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                    $(".showotherparameterName").eq(n).attr("disabled","true");

                                }
                                $(".showitem_manager").hide();
                                $(".showitem_group").hide();


                            });
                        }

                    });
                }
            }


        });
        $(document).on("click",".neweditor",function () {
            $(".form-control").removeAttr("disabled");
            $(".parameterName").removeAttr("disabled");
            $(".otherparameterName").removeAttr("disabled");
            $(".groupMemberName").removeAttr("disabled");
            $(".groupMemberSymbol").removeAttr("disabled");
            $(".groupMemberWeight").removeAttr("disabled");
            $(".savemyApply").show();
            $(".dismiss").show();
            $(".neweditor").hide();
            $(".newsubmit").hide();
        })


})
}
