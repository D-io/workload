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
            $('.parameterName').val(null);
            $('.otherparameterName').val(null);

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
                var otherKey=$(".otherPramterkey").eq(j);
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
            $.ajax({
                type:"POST",
                url:itemManageUrl,
                data:{
                categoryId:domId,
                itemName: $('#itemName').val(),
                applyDesc: $('#applyDesc').val(),
             //   workload: $('#workload').val(),
             //   ownerId: applicant.val(),
                groupManagerId: itemmanager.val(),
                isGroup: radio.val(),
                jsonParameter: newArray,
                otherJson: otherArray,
                jobDesc: grouparray,
                jsonChildWeight: childWeight,
             //   file:formdata

            },
                success:function (data) {
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
                    if($(".applymodalbody").innerHTML==null||$(".applymodalbody").innerHTML==""){
                        var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                            '<th class="sorting">工作量</th> <th class="sorting">' +
                            '申报截止时间 </th> <th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                        // $(".applymodalbody").empty();
                        $(".applymodalbody").append(tablestr);

                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";

                        var Info = analyseList;
                        $(".tbody").append(rowInfo);

                        for (var j = 0; j < 6; j++)//单元格
                        {
                            $(".tbody tr:last").append(cellInfo);
                        }

                        $(".tbody tr:last td:eq(0)").text(parseInt("1"));
                        $(".tbody tr:last td:eq(1)").text(Info[0].itemName);
                        for(var i=0;i<listLength;i++){
                            if(Info[i].teacherName==$("#itemowner").text())
                                var count=Info[i].workload;
                            var CountId=Info[i].itemId;
                        }
                        $(".tbody tr:last td:eq(2)").text(count);
                      //  $(".tbody tr:last td:eq(3)").text();
                        $(".tbody tr:last td:eq(3)").attr("class","applyDead");
                        /* var statusName;
                         switch (Info[0].status) {
                         case 0:
                         statusName = '未提交';
                         break;
                         case 1:
                         statusName = '已提交';
                         break;
                         }*/
                        $(".tbody tr:last td:eq(4)").text("未提交");
                        $(".tbody tr:last td:eq(4)").attr("id","statusChange_"+CountId);


                        var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + CountId+ "\">查看详情</a> ";
                        $(".tbody tr:last td:eq(5)").append(act);

                    }
                    else {
                        var rowInfoAgain = "<tr></tr>";
                        var cellInfoAgain = "<td></td>";
                        var analyseListAgain = data.data.itemList;
                        var listLengthAgain = data.data.itemList.length;
                        var InfoAgain = analyseListAgain;
                        $(".tbody").append(rowInfoAgain);

                        for (var j = 0; j < 6; j++)//单元格
                        {
                            $(".tbody tr:last").append(cellInfoAgain);
                        }

                        $(".tbody tr:last td:eq(0)").text(parseInt($(".tbody tr:last td:eq(0)").text())+1);
                        $(".tbody tr:last td:eq(1)").text(InfoAgain[0].itemName);
                        for(var i=0;i<listLengthAgain;i++){
                            if(InfoAgain[i].teacherName==$("#itemowner").text())
                                var count=InfoAgain[i].workload;
                            var CountId=InfoAgain[i].itemId;
                            var CategId=InfoAgain[i].categoryId;
                        }
                        $(".tbody tr:last td:eq(2)").text(count);
                        $(".tbody tr:last td:eq(3)").attr("class","applyDead");
                        $(".applyDead").text($(".applyDeadline_"+CategId).text());
                        /* var statusName;
                         switch (Info[0].status) {
                         case 0:
                         statusName = '未提交';
                         break;
                         case 1:
                         statusName = '已提交';
                         break;
                         }*/
                        $(".tbody tr:last td:eq(4)").text("未提交");
                        $(".tbody tr:last td:eq(4)").attr("id","statusChange_"+CountId);


                        var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" +CountId + "\">查看详情</a> ";
                        $(".tbody tr:last td:eq(5)").append(act);

                    }
                    $(document).on("click",".showaddContent",function () {
                            var newId=this.id;
                            var newReg=parseInt(newId.match(/\d+/g));
                            if($("#statusChange_"+newreg).text()=="未提交"){
                                $(".editApply").show();
                              //  $(".editApply").display=="";
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
                            $("#showitemName").val(analyseList[0].itemName);
                            $("#showitemName").attr("disabled","true");
                            $("#showapplyDesc").val(analyseList[0].applyDesc);
                            $("#showapplyDesc").attr("disabled","true");
                            if(analyseList[0].isGroup==0){
                                $("#single").attr("checked",'checked');
                                $("#group").attr("disabled","true");

                            }
                            else{
                                $("#group").attr("checked",'checked');
                                $("#single").attr("disabled","true");
                                $(".item_manager").show();
                                $(".item_group").show();
                            }
                            var showPram=analyseList[0].parameterValues;
                            for(var i=0;i<showPram.length;i++){
                                $(".showparameterName").eq(i).val(showPram[i].value);
                                $(".showparameterName").eq(i).attr("disabled","true");

                            }
                            var showOtherPara=analyseList[0].otherJsonParameters;
                            for(var n=0;n<showOtherPara.length;n++){
                                $(".showotherparameterName").eq(n).val(showOtherPara[n].value);
                                $(".showotherparameterName").eq(n).attr("disabled","true");

                            }
                            $("#showitemmanager").attr("disabled","true");
                            $("#showitemmanager option[value='"+analyseList[0].groupManagerId+"']").attr("selected","selected");


                    })                    

                 }
             //   processData: false,
             //   contentType:false
            });

                 $('#addContent').modal('hide');

            });

        });

}
