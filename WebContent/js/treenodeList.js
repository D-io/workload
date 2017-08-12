function ownerApply(domId) {

    $(document).ready(function() {
        $('.add').unbind('click');
        $('.add').bind('click', function () {
          //  $(".applymodalbody").empty();
            $('#itemName').val(null);
            $('#applyDesc').val(null);
            $('#workload').val(null);
            $('.groupMemberSymbol').val(null);
            $('.groupMemberWeight').val(null);
            $(".groupMemberName").val(null);
            $(".item_manager").val(null);
            $('.parameterName').val(null);
            $('.otherparameterName').val(null);

        });
        var CurrentName='';
        $.get(currentTeaIdUrl,function (data) {
            CurrentName =data.data.teacher.name;
        });
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
            var radio = $("input:radio[name='optionsRadios']:checked");
            //  var applicant = $('#applicant option:selected');
            var itemmanager = $('#itemmanager option:selected');
            //  var formdata=new FormData();
            // formdata.append("file",$("#fileName")[0]);
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
                        /*var $showThead=$(".showThead");
                         if($showThead.css("display")=="none"){
                         $(".showThead").show();
                         }

                         $(".showDesc").append("<tr><td>'+data.data.itemList.itemId+'</td><td>'+data.data.itemList.itemName+'</td><td>data.data.itemList.workload</td><td>未提交状态</td><td><a class='btn btn-primary"+data.data.itemList.itemId+"' data-target='#showContent' data-toggle='modal'>查看详情</a></td></tr>")
                         $(document).on("click","."+data.data.itemList.itemId,function () {
                         $(".changeDis").attr("disabled","true");
                         $("#showitemName").val(data.data.itemList.itemName);
                         $("#showapplyDesc").val(data.data.itemList.applyDesc);

                         });
                         $(document).on("click",".editApply",function () {
                         $(".changeDis").attr("disabled","false");
                         })*/
                        var analyseList = data.data.itemList;
                        var listLength = data.data.itemList.length;
                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";
                        var Info = analyseList;

                        if ($(".newTable").length>0) {
                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 6; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }

                            $(".tbody tr:last td:eq(0)").text(parseInt($(".tbody tr:last td:eq(0)").text()) + 1);
                            $(".tbody tr:last td:eq(1)").text(Info[0].itemName);
                            var count="";
                            var CountId="";
                            var CategId="";
                            for (var i = 0; i < listLength; i++) {
                                if (Info[i].teacherName == CurrentName) {
                                     count = Info[i].workload;
                                     CountId = Info[i].itemId;
                                     CategId = Info[i].categoryId;
                                }
                            }
                            $(".tbody tr:last td:eq(2)").text(count);
                            $(".tbody tr:last td:eq(3)").attr("class", "applyDead");
                            $(".applyDead").text($(".applyDeadline_" + CategId).text());

                            $(".tbody tr:last td:eq(4)").text("未提交");
                            $(".tbody tr:last td:eq(4)").attr("id", "statusChange_" + CountId);


                            var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + CountId + "\">查看详情</a> ";
                            $(".tbody tr:last td:eq(5)").append(act);


                        }
                        else {

                            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                '<th class="sorting">工作量</th> <th class="sorting">' +
                                '申报截止时间 </th> <th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                            // $(".applymodalbody").empty();
                            $(".applymodalbody").append(tablestr);

                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 6; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }
                            var count="";
                            var CountId="";
                            var CategId="";

                            $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                            $(".tbody tr:last td:eq(1)").text(Info[0].itemName);
                            for (var i = 0; i < listLength; i++) {
                                if (Info[i].teacherName == CurrentName)
                                     count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                CategId=Info[i].categoryId;
                            }
                            $(".tbody tr:last td:eq(2)").text(count);
                            //  $(".tbody tr:last td:eq(3)").text();
                            $(".tbody tr:last td:eq(3)").attr("class", "applyDead");
                            $(".applyDead").text($(".applyDeadline_" + CategId).text());

                            $(".tbody tr:last td:eq(4)").text("未提交");
                            $(".tbody tr:last td:eq(4)").attr("id", "statusChange_" + CountId);


                            var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + CountId + "\">查看详情</a> ";
                            $(".tbody tr:last td:eq(5)").append(act);
                        }

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
                            if (Info[hideCount].teacherName == CurrentName) {
                                /* var count = Info[i].workload;
                                 var CategId = Info[i].categoryId;*/

                                var CountId = Info[i].itemId;
                            }
                            $(".hiddendistrict").append("<div class='groupMember_"+CountId+"'>"+Info[hideCount].teacherName+"</div><div class='jobDesc_"+CountId+"'>"+Info[hideCount].jobDesc+"</div><div class='jobWeight_"+CountId+"'>"+Info[hideCount].jsonChildWeight+"</div>")
                        }
                        $(document).on("click",".showaddContent",function () {
                            var newId=this.id;
                            var newReg=parseInt(newId.match(/\d+/g));
                            if($("#statusChange_"+newReg).text()=="未提交"){
                                $(".editApply").show();
                                $(".editApply").display=="";
                                $(".editApply").attr("id","editApply_"+newReg);
                                $(".editSubmit").show();
                                $(".editSubmit").attr("id","editSubmit_"+newReg);
                                $(".editDelete").show();
                                $(".editDelete").attr("id","editDelete"+newReg);
                            }
                            if($("#statusChange_"+newReg).text()=="已提交"){
                                $(".editApply").hide();
                                //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                                $(".editSubmit").hide();
                                //  $(".editSubmit").attr("id","editSubmit_"+window.Temp[newReg-1].itemId);
                                $(".editDelete").hide();
                                //  $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);
                            }
                            $("#showitemName").val(Info[0].itemName);
                            $("#showitemName").attr("disabled","true");
                            $("#showapplyDesc").val(Info.applyDesc);
                            $("#showapplyDesc").attr("disabled","true");
                            if(Info[0].isGroup==0){
                                $("#single").attr("checked",'checked');
                                $("#group").attr("disabled","true");

                            }
                            else{
                                $("#group").attr("checked",'checked');
                                $("#single").attr("disabled","true");
                                $(".item_manager").show();
                                $(".item_group").show();
                            }
                            var showPram=Info[0].parameterValues;
                            for(var i=0;i<showPram.length;i++){
                                $(".showparameterName").eq(i).val(showPram[i].value);
                                $(".showparameterName").eq(i).attr("disabled","true");

                            }
                            var showOtherPara=Info[0].otherJsonParameters;
                            for(var n=0;n<showOtherPara.length;n++){
                                $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                $(".showotherparameterName").eq(n).attr("disabled","true");

                            }
                            $("#showitemmanager").attr("disabled","true");
                            $("#showitemmanager option[value='"+Info[0].groupManagerId+"']").attr("selected","selected");

                            $('#showAddgroupPramter').empty();
                            var addStr='';
                            var $group=$(".groupMember_"+newReg);
                            if($group&&$group.length){
                                for(var pramterCount=0;pramterCount<$(".groupMember_"+newReg).length;pramterCount++){

                                    addStr="<tr><td><select class='showgroupMemberName teacherName' style='width: 30%;'><option>"+$(".groupMember_"+newReg).text()+"</option></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                                    $('#showAddgroupPramter').append(addStr);
                                    $(".showgroupMemberSymbol").eq(pramterCount).val($(".jobDesc_"+newReg).eq(pramterCount).text());
                                    $(".showgroupMemberWeight").eq(pramterCount).val($(".jobWeight_"+newReg).eq(pramterCount).text());
                                }
                            }


                            $(".showgroupMemberName").attr("disabled","true");
                            $(".showgroupMemberSymbol").attr("disabled","true");
                            $(".showgroupMemberWeight").attr("disabled","true");
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
                        // groupManagerId: itemmanager.val(),
                        isGroup: 0,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        // jobDesc: grouparray,
                        //  jsonChildWeight: childWeight,
                        //   file:formdata

                    }
                    , success: function (data) {
                        var analyseList = data.data.itemList;
                        var listLength = data.data.itemList.length;
                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";
                        var Info = analyseList;

                        if ($(".newTable").length>0) {
                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 6; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }

                            $(".tbody tr:last td:eq(0)").text(parseInt($(".tbody tr:last td:eq(0)").text()) + 1);
                            $(".tbody tr:last td:eq(1)").text(Info[0].itemName);
                            var count="";
                            var CountId="";
                            var CategId="";
                            for (var i = 0; i < listLength; i++) {
                                if (Info[i].teacherName == CurrentName) {
                                     count = Info[i].workload;
                                     CountId = Info[i].itemId;
                                     CategId = Info[i].categoryId;
                                }
                            }
                            $(".tbody tr:last td:eq(2)").text(count);
                            $(".tbody tr:last td:eq(3)").attr("class", "applyDead");
                            $(".applyDead").text($(".applyDeadline_" + CategId).text());

                            $(".tbody tr:last td:eq(4)").text("未提交");
                            $(".tbody tr:last td:eq(4)").attr("id", "statusChange_" + CountId);


                            var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + CountId + "\">查看详情</a> ";
                            $(".tbody tr:last td:eq(5)").append(act);


                        }
                        else {

                            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                                '<th class="sorting">工作量</th> <th class="sorting">' +
                                '申报截止时间 </th> <th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                            // $(".applymodalbody").empty();
                            $(".applymodalbody").append(tablestr);

                            $(".tbody").append(rowInfo);

                            for (var j = 0; j < 6; j++)//单元格
                            {
                                $(".tbody tr:last").append(cellInfo);
                            }

                            $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                            $(".tbody tr:last td:eq(1)").text(Info[0].itemName);
                            var count="";
                            var CountId="";
                            var CategId="";
                            for (var i = 0; i < listLength; i++) {
                                if (Info[i].teacherName == CurrentName)
                                     count = Info[i].workload;
                                 CountId = Info[i].itemId;
                                CategId = Info[i].categoryId;
                            }
                            $(".tbody tr:last td:eq(2)").text(count);
                            //  $(".tbody tr:last td:eq(3)").text();
                            $(".tbody tr:last td:eq(3)").attr("class", "applyDead");
                            $(".applyDead").text($(".applyDeadline_"+CategId).text());

                            $(".tbody tr:last td:eq(4)").text("未提交");
                            $(".tbody tr:last td:eq(4)").attr("id", "statusChange_" + CountId);


                            var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + CountId + "\">查看详情</a> ";
                            $(".tbody tr:last td:eq(5)").append(act);
                        }

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

                        $(document).on("click",".showaddContent",function () {
                            var newId=this.id;
                            var newReg=parseInt(newId.match(/\d+/g));
                            if($("#statusChange_"+newReg).text()=="未提交"){
                                $(".editApply").show();
                                $(".editApply").display=="";
                                $(".editApply").attr("id","editApply_"+newReg);
                                $(".editSubmit").show();
                                $(".editSubmit").attr("id","editSubmit_"+newReg);
                                $(".editDelete").show();
                                $(".editDelete").attr("id","editDelete"+newReg);
                            }
                            if($("#statusChange_"+newReg).text()=="已提交"){
                                $(".editApply").hide();
                                //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                                $(".editSubmit").hide();
                                //  $(".editSubmit").attr("id","editSubmit_"+window.Temp[newReg-1].itemId);
                                $(".editDelete").hide();
                                //  $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);
                            }
                            $("#showitemName").val(Info[0].itemName);
                            $("#showitemName").attr("disabled","true");
                            $("#showapplyDesc").val(Info.applyDesc);
                            $("#showapplyDesc").attr("disabled","true");
                            if(Info[0].isGroup==0){
                                $("#single").attr("checked",'checked');
                                $("#group").attr("disabled","true");

                            }
                            else{
                                $("#group").attr("checked",'checked');
                                $("#single").attr("disabled","true");
                                $(".item_manager").show();
                                $(".item_group").show();
                            }
                            var showPram=Info[0].parameterValues;
                            for(var i=0;i<showPram.length;i++){
                                $(".showparameterName").eq(i).val(showPram[i].value);
                                $(".showparameterName").eq(i).attr("disabled","true");

                            }
                            var showOtherPara=Info[0].otherJsonParameters;
                            for(var n=0;n<showOtherPara.length;n++){
                                $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                $(".showotherparameterName").eq(n).attr("disabled","true");

                            }
                           /* $("#showitemmanager").attr("disabled","true");
                            $("#showitemmanager option[value='"+Info[0].groupManagerId+"']").attr("selected","selected");

                            $('#showAddgroupPramter').empty();*/
                           $(".item_manager").hide();
                           $(".item_group").hide();


                        });
                    }

                });
            }
        })

})
}
