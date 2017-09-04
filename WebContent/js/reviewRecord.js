function workRevie(){

    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=PrimTeachers/reviewerWorkload',function (result) {
        $('.right_hole').append(result);

    });
    $.get(itemImportUrl, function (data) {
       var showlist=$("<ul></ul>");
        showimportall(data.data.categoryTree,showlist);

        $('#tab_content1').append(showlist);

        function showimportall(menu_list,parent) {
            for (var menu=0;menu<menu_list.length;menu++) {
                //如果有子节点，则遍历该子节点
                if (menu_list[menu].children.length > 0) {
                    var isShow=traverseNode(menu_list[menu],1);
                    if(isShow==1) {
                        var li = $("<li></li>");
                        $(li).append(menu_list[menu].name).append("<ul></ul>").appendTo(parent);

                    }
                    showimportall(menu_list[menu].children, $(li).children().eq(0));
                }
                else if(menu_list[menu].importRequired==1){
                    $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append( "<p class='itemMessage'><span class='itemName'>" + menu_list[menu].name + "</span>&nbsp;-&nbsp;<span class='itemDesc'>" + menu_list[menu].desc + "</span></p>" +
                        "<p class='deadline'> 复核截止时间： <span class='time_" + menu_list[menu].categoryId + "'>" + menu_list[menu].applyDeadline + "</span> &nbsp;&nbsp;&nbsp;&nbsp; <button  id='reviewer_" + menu_list[menu].categoryId + "' class='btn btn-primary reviewer' data-toggle='modal' data-target='#importModal' style='float: right; margin-top: -3px;'>点击复核</button><div style='clear: both;'></div>").appendTo(parent);

                }

            }
        }

    });

}
function  reviewerRec() {

  $(".reviewerRec").show();
  $(".reviewerRecTbody").empty();
    var RevNum=0;
  $.get(itemTeacherInfo+"?"+"importedRequired=1&status=2",function (data) {
      var rowInfo="<tr></tr>";
      var cellInfo="<td></td>";
      if(data.data.itemList&&data.data.itemList.length){
          var analyseList= data.data.itemList;
          var listLength= data.data.itemList.length;
          for(var i=0;i<listLength;i++)
          {
              RevNum++;
              var Info=analyseList[i];
              $(".reviewerRecTbody").append(rowInfo);
              for(var j=0;j<12;j++)//单元格
              {
                  $(".reviewerRecTbody tr:last").append(cellInfo);
              }
           //   var id=i;
              $(".reviewerRecTbody tr:last td:eq(0)").text(RevNum);
              $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
              $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
              $(".reviewerRecTbody tr:last td:eq(3)").text(Info.formula);
              var showtype='';
              switch (Info.isGroup){

                  case 1:showtype="小组形式";
                      break;
                  case 0:showtype="个人形式";
                      break;

              }
              $(".reviewerRecTbody tr:last td:eq(4)").text(showtype);

              var praValues='';
              for(var m=0;m<Info.parameterValues.length;m++){
                  praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
              }
              var otherpraValue='';
              for(var n=0;n<Info.otherJsonParameters.length;n++){
                  otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
              }
              $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);
              var itemDesc='';
              for(var item=0;item<Info.paramDesc.length;item++){
                  itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
              }
              $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);
              $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);

              $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
              $(".reviewerRecTbody tr:last td:eq(9)").attr("class","revieRec_"+Info.categoryId);
              $(".revieRec_"+Info.categoryId).text($(".applyD_"+Info.categoryId).text());
              $(".reviewerRecTbody tr:last td:eq(10)").text("确认通过");
              $(".reviewerRecTbody tr:last td:eq(10)").css({"background-color":"#1ABB9C","color":"#ffffff"});
              $(".reviewerRecTbody tr:last td:eq(11)").text();

          }
      }

  });
    $.get(itemTeacherInfo+"?"+"importedRequired=1&status=3",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                RevNum++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(RevNum);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(3)").text(Info.formula);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组形式";
                        break;
                    case 0:showtype="个人形式";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(4)").text(showtype);

                var praValues='';
                for(var m=0;m<Info.parameterValues.length;m++){
                    praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
                }
                var otherpraValue='';
                for(var n=0;n<Info.otherJsonParameters.length;n++){
                    otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                }
                $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);
                var itemDesc='';
                for(var item=0;item<Info.paramDesc.length;item++){
                    itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);
                $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(9)").attr("class","revieRec_"+Info.categoryId);
                $(".revieRec_"+Info.categoryId).text($(".applyD_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(10)").text("提交存疑");
                $(".reviewerRecTbody tr:last td:eq(10)").css({"background-color":"#70c8e2","color":"#ffffff"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/
                $(".reviewerRecTbody tr:last td:eq(11)").text();
                //   var act="<a class='btn btn-primary reviewerRec' id='reviewerRec_"+Info.itemId+"'>查看回复</a> ";
                //   $(".reviewerRecTbody tr:last td:eq(10)").text(act);
            }
        }

    });
    $.get(itemTeacherInfo+"?importedRequired=1&status=4",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                RevNum++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
             //   var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(RevNum);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(3)").text(Info.formula);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组形式";
                        break;
                    case 0:showtype="个人形式";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(4)").text(showtype);

                var praValues='';
                for(var m=0;m<Info.parameterValues.length;m++){
                    praValues+=Info.parameterValues[m].symbol+":"+Info.parameterValues[m].value;
                }
                var otherpraValue='';
                for(var n=0;n<Info.otherJsonParameters.length;n++){
                    otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                }
                $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);
                var itemDesc='';
                for(var item=0;item<Info.paramDesc.length;item++){
                    itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);
                $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(9)").attr("class","revieRec_"+Info.categoryId);
                $(".revieRec_"+Info.categoryId).text($(".applyD_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(10)").text("存疑解决");
                $(".reviewerRecTbody tr:last td:eq(10)").css({"background-color":"#f0ad4e","color":"#ffffff"});

                var act="<a class='btn btn-primary reviewerApply' id='reviewerRec_"+Info.itemId+"'>查看回复</a> ";
                $(".reviewerRecTbody tr:last td:eq(11)").append(act);
                $("[data-toggle='popover']").popover();
                $(".reviewerApply").popover({
                    placement: "top",
                    trigger: "click",
                    html: true,
                    title: "回复信息",
                    content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

                });

            }
        }
    });
}
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
                        "<p class='deadline'> 申报截止时间：<span class='time_" + menu_list[menu].categoryId + "'>" + menu_list[menu].applyDeadline + "</span> <span style='display: none;' class='revieDeadline_" + menu_list[menu].categoryId + "'>" + menu_list[menu].reviewDeadline + "</span> &nbsp;&nbsp;&nbsp;&nbsp; <button  id='apply_" + menu_list[menu].categoryId + "' class='btn btn-primary apply' data-toggle='modal' data-target='#applyModal' style='float: right; margin-top: -2px;'>点击申报</button> </p> <div style='clear: both;'></div>").appendTo(parent);
                }

            }
        }

        $(document).off("click", ".apply");
        var Temp = new Array();
        var Categry = "";

        $(document).on("click", ".apply", function () {
            //$(".panel-default").toggle("show");
            $('.applymodalbody').empty();
            var myseleFlag = this.id;
            var reg = parseInt(myseleFlag.match(/\d+/g));
            window.Categry = reg;
            $.get(itemGroupUrl + "?" + 'categoryId=' + reg, function (data) {
                if (data.data.itemList && data.data.itemList.length > 0) {
                    var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable"><thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                        '<th class="sorting">工作当量</th><th class="sorting">审核状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                    // $(".applymodalbody").empty();
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
                        $(".tbody tr:last td:eq(1)").text(Info.itemName);
                        $(".tbody tr:last td:eq(1)").attr("id", "itemname_" + Info.itemId);
                        $(".tbody tr:last td:eq(2)").text(Info.workload);
                        $(".tbody tr:last td:eq(2)").attr("id", "workload_" + Info.itemId);
                        var act = "<a class='btn btn-primary showContent' data-toggle='modal' data-target=''#showContent' id='show_" + id + "'>查看详情</a><a class='btn btn-primary delemyself delemyself_" + Info.itemId + "' id='delemyself_" + id + "'>删除操作</a> ";
                        var newAct="<a class='btn btn-primary showContent' data-toggle='modal' data-target='#showContent' id='show_" + id + "'>查看详情</a>";
                        var statusName;
                        switch (Info.status) {
                            case 0:
                                statusName = '暂未提交';
                                $(".tbody tr:last td:eq(4)").append(act);
                                break;
                            case 1:
                                statusName = '有待审核';
                                $(".tbody tr:last td:eq(4)").append(newAct);
                                break;
                            case 2:
                                statusName = '确认通过';
                                $(".tbody tr:last td:eq(4)").append(newAct);
                                break;
                            case 3:
                                statusName = '存疑提交';
                                $(".tbody tr:last td:eq(4)").append(newAct);
                                break;
                            case 4:
                                statusName = '存疑解决';
                                $(".tbody tr:last td:eq(4)").append(newAct);
                                break;
                            case 5:
                                statusName = '审核拒绝';
                                $(".tbody tr:last td:eq(4)").append(newAct);
                                break;
                        }
                        $(".tbody tr:last td:eq(3)").text(statusName);
                        $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);

                    }
                }
                window.Temp=[];
                window.Temp = data.data.itemList;

            });
            $("#myModalLabel").empty();
            $("#myModalLabel").append( "<p class='page-nav'><i class='fa fa-bar-chart' style='z-index: 100'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class='current-page'>工作当量申报</span></p>" +
                "<p class='project'><span class='itemName'> " + $(this).parent().prev().find(".itemName").text() + "</span></p>" +
                "<p class='message'>规则详情描述：" + $(this).parent().prev().find(".itemDesc").text() + "</p> " +
                "<p class='message'>申报截止时间：" + $(this).prev().prev().text() +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核截止时间：" + $(this).prev().text() + "</p>"
            );
         //   ownerApply(reg);
            $("#parameterTable").empty();
            $("#otherparameterTable").empty();
            $("#showparameterTable").empty();
            $("#showotherparameterTable").empty();
            comparePara(data.data.categoryTree, reg);

        });

    });
    function comparePara(item, para) {
        for (var comp = 0; comp < item.length; comp++) {
            if (item[comp].categoryId == para && item[comp].formulaParameterList && item[comp].otherJsonParameters) {

                for (var t = 0; t < item[comp].formulaParameterList.length; t++) {
                    var symbolname = item[comp].formulaParameterList[t].symbol;
                    /*$('.parameterTh').append("<th class='pramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                     $('.AddPramter').append("<td><input type='text' class='parameterName'></td>");
                     $('.showparameterTh').append("<th class='showpramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                     $('.showAddPramter').append("<td><input type='text' class='showparameterName'></td>");*/
                    $('#parameterTable').append("<tr><th class='pramterDesc' id='" + symbolname + "' style='font-size: 13px;'>" + item[comp].formulaParameterList[t].desc + "</th><td><input type='text' class='parameterName'></td></tr>");
                    $("#showparameterTable").append("<tr><th class='showpramterDesc' id='" + symbolname + "' style='font-size: 13px;'>" + item[comp].formulaParameterList[t].desc + "</th><td><input type='text' class='showparameterName'></td></tr>")
                }
                for (var s = 0; s < item[comp].otherJsonParameters.length; s++) {

                    /*  $('.otherParaTh').append("<th class='otherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                     $('#AddOtherPramter').append( "<td><input type='text' class='otherparameterName'></td>");
                     $('.showotherParaTh').append("<th class='showotherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                     $('#showAddOtherPramter').append("<td><input type='text' class='showotherparameterName'></td>");*/
                    $('#otherparameterTable').append("<tr><th class='otherPramterkey' style='font-size: 13px'>" + item[comp].otherJsonParameters[s].key + "</th><td><input type='text' class='otherparameterName'></td></tr>");
                    $('#showotherparameterTable').append("<tr><th class='showotherPramterkey' style='font-size: 13px;'>" + item[comp].otherJsonParameters[s].key + "</th><td><input type='text' class='showotherparameterName'></td></tr>");
                }

            }
            else if (item[comp].children) {
                comparePara(item[comp].children, para);
            }
        }
    }

    var contentCount = 0;
    $(document).on("click", ".showContent", function () {
        var newId = this.id;
        var newReg = parseInt(newId.match(/\d+/g));
        window.contentCount=newReg;
        console.log(window.contentCount);
        $(".savemyApplyAgain").hide();
        $(".dismissagain").hide();
        if ($("#statusChange_" + window.Temp[newReg-1].itemId).text() == "暂未提交") {
            $(".editApply").show();
            $(".editApply").attr("id", "editApply_" + window.Temp[newReg - 1].itemId);
            $(".editSubmit").show();
            $(".editSubmit").attr("id", "editSubmit_" + window.Temp[newReg - 1].itemId);
            /*  $(".editDelete").show();
             $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);*/
            if (window.Temp[newReg - 1].isGroup == 0) {
                $("#single").attr("checked", 'checked');
                $("#group").attr("disabled", "true");
                $(".item_manager").hide();
                $(".item_group").hide();
                $("#showAddgroupPramter").empty();
            }
            else {
                $("#group").attr("checked", 'checked');
                $("#single").attr("disabled", "true");
                $(".showitem_manager").show();
                $(".showitem_group").show();

                $("#showitemmanager").select2().val(window.Temp[newReg - 1].groupManagerId).trigger("change");
                $("#showitemmanager").attr("disabled", "true");
                $('#showAddgroupPramter').empty();
                var addStr = '';
                //    var b = localStorage.getItem("item_"+window.Temp[newReg-1].itemId);
                //    b=JSON.parse(b);

                for (var pramterCount = 0; pramterCount < window.Temp[newReg - 1].jobDescList.length; pramterCount++) {

                    var addStr = "<tr><td><select class='showgroupMemberName teacherName'></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                    $('#showAddgroupPramter').append(addStr);
                    $.get(TeacherInfoUrl, {test: 12}, function (data) {
                        for (var i = 0; i < data.data.teacherList.length; i++) {
                            $('.showgroupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
                        }

                    });
                    $(".teacherName").select2({
                        placeholder:"",
                        allowClear: true,
                        width: "100%",
                    });
                    //  $(".showgroupMemberName").eq(pramterCount).append("<option value='"+window.Temp[newReg-1].jobDescList[pramterCount].userId+"' selected='selected'></option>");
                    $(".showgroupMemberName").eq(pramterCount).select2().val(window.Temp[newReg - 1].jobDescList[pramterCount].userId).trigger("change");
                    $(".showgroupMemberSymbol").eq(pramterCount).val(window.Temp[newReg - 1].jobDescList[pramterCount].jobDesc);
                    $(".showgroupMemberWeight").eq(pramterCount).val(window.Temp[newReg - 1].childWeightList[pramterCount].weight);


                }


                //    $('#showAddgroupPramter').append(addStr);

                $(".showgroupMemberName").attr("disabled", "true");
                $(".showgroupMemberSymbol").attr("disabled", "true");
                $(".showgroupMemberWeight").attr("disabled", "true");

            }

        }
        else {
            $(".editApply").hide();
            //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
            $(".editSubmit").hide();
            //  $(".editSubmit").attr("id","editSubmit_"+window.Temp[newReg-1].itemId);
            /*  $(".editDelete").hide();*/
            //  $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);
            if (window.Temp[newReg-1].isGroup == 0) {
                $("#single").attr("checked", 'checked');
                $("#group").attr("disabled", "true");
                $(".showitem_manager").hide();
                $(".showitem_group").hide();
                $("#showAddgroupPramter").empty();
            }
            else {
                $("#group").attr("checked", 'checked');
                $("#single").attr("disabled", "true");
                $(".showitem_manager").show();
                $(".showitem_group").show();

                $("#showitemmanager").select2().val(window.Temp[newReg - 1].groupManagerId).trigger("change");
                $("#showitemmanager").attr("disabled", "true");
                $('#showAddgroupPramter').empty();

                var addStr = "<tr><td><select class='showgroupMemberName teacherName'></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                $('#showAddgroupPramter').append(addStr);
                $.get(TeacherInfoUrl, {test: 12}, function (data) {
                    for (var i = 0; i < data.data.teacherList.length; i++) {
                        $('.showgroupMemberName:last').append('<option value=\"' + data.data.teacherList[i].teacherId + '\">' + data.data.teacherList[i].name + '</option>');
                    }

                });
                $(".teacherName").select2({
                    placeholder:"",
                    allowClear: true,
                    width: "100%",
                });
                //  $(".showgroupMemberName").eq(pramterCount).append("<option value='"+window.Temp[newReg-1].jobDescList[pramterCount].userId+"' selected='selected'></option>");
                $(".showgroupMemberName").eq(0).select2().val(window.Temp[newReg-1].ownerId).trigger("change");
                $(".showgroupMemberSymbol").eq(0).val(window.Temp[newReg-1].jobDesc);
                $(".showgroupMemberWeight").eq(0).val(window.Temp[newReg-1].jsonChildWeight);


                //    $('#showAddgroupPramter').append(addStr);

                $(".showgroupMemberName").attr("disabled", "true");
                $(".showgroupMemberSymbol").attr("disabled", "true");
                $(".showgroupMemberWeight").attr("disabled", "true");

            }

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
    $(document).off("click", ".savemyApplyAgain");
    $(document).on("click", ".savemyApplyAgain", function () {
        var saveId = this.id;
        var saveReg = parseInt(saveId.match(/\d+/g));
        var $parametername = $(".showpramterDesc");
        var newArray = new Array();
        for (var i = 0; i < $(".showparameterName").length; i++) {
            var dom = $(".showpramterDesc").eq(i).attr("id");
            newArray.push({symbol: dom, value: parseInt($(".showparameterName").eq(i).val())});

        }
        newArray = JSON.stringify(newArray);
        var otherArray = new Array();
        var otherPramterkey = $(".showotherPramterkey");
        for (var j = 0; j < otherPramterkey.length; j++) {
            var otherKey = $(".showotherPramterkey").eq(j);
            otherArray.push({key: otherKey.text(), value: $(".showotherparameterName").eq(j).val()});

        }
        otherArray = JSON.stringify(otherArray);
        if ($("#showAddgroupPramter").find("td").length > 0) {
            var grouparray = new Array();
            //   var sumArray=new Array();
            var groupmessageArray = $('.showgroupMemberName');
            for (var c = 0; c < groupmessageArray.length; c++) {
                grouparray.push({
                    userId: parseInt($(".showgroupMemberName option:selected").eq(c).val()),
                    jobDesc: $(".showgroupMemberSymbol").eq(c).val()
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
                    userId: parseInt($(".showgroupMemberName option:selected").eq(m).val()),
                    weight: parseFloat($(".showgroupMemberWeight").eq(m).val())
                });
            }
            childWeight = JSON.stringify((childWeight));
        }
        else {
            var childWeight = new Array();
            childWeight = [{userId: parseInt(userId), weight: 1}];
            childWeight = JSON.stringify((childWeight));
        }

        var radio = $("input:radio[name='showoptionsRadios']:checked");
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
                    alert("修改成功!");
                    /*  $("#applyModal").modal('hide');
                     $('#showContent').modal('hide');*/
                    $(".editApply").show();
                    $(".editSubmit").show();
                    var msg = data.data.item;

                    window.Temp.splice(window.contentCount - 1, 1, msg);
                    $("#workload_" + msg.itemId).text(msg.workload);
                    $("#itemname_" + msg.itemId).text(msg.itemName);
                    $(".form-control").attr("disabled", "disabled");
                    $(".showparameterName").attr("disabled","disabled");
                    $(".showotherparameterName").attr("disabled","disabled");
                    $(".showgroupMemberName ").attr("disabled","disabled");
                    $(".showgroupMemberSymbol").attr("disabled","disabled");
                    $(".showgroupMemberWeight").attr("disabled","disabled");
                    $("#year").removeAttr("disabled", "disabled");
                    $("#term").removeAttr("disabled", "disabled");
                    $("#revfile").attr("disabled","disabled");
                    $(".dismissagain").hide();
                    $(".savemyApplyAgain").hide();
                    $(".editApply").show();
                    $(".editSubmit").show();
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
                                    var file = $("#revfile")
                                    file.after(file.clone().val(""));
                                    file.remove();
                                    $("#revfile").attr("disabled","disabled");
                                    $("input[name='revfile']").css({"color":"transparent","width":"80px"});
                                    $(".showagain").text(data.data.itemDto.fileName);
                                    window.Temp.splice(window.contentCount - 1,1,data.data.itemDto);
                                }

                                else{
                                    alert("文件已存在！请修改文件名火文件内容后重新上传！");
                                }
                            }

                        });
                    }
                    /* var analyseList = data.data.itemList;
                     var listLength = data.data.itemList.length;
                     var rowInfo = "<tr></tr>";
                     var cellInfo = "<td></td>";
                     var Info = analyseList;*/
                    /*     var formdata = new FormData;
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

                     });*/
                    //  $('#addContent').modal('hide');
                    /*    for(var hideCount=0;hideCount<listLength;hideCount++){
                     if (Info[hideCount].teacherName == userNameUrl) {
                     /!* var count = Info[i].workload;
                     var CategId = Info[i].categoryId;*!/

                     var CountId = Info[hideCount].itemId;
                     }
                     // $(".hiddendistrict").append("<div class='groupMember_"+CountId+"'>"+Info[hideCount].teacherName+"</div><div class='jobDesc_"+CountId+"'>"+Info[hideCount].jobDesc+"</div><div class='jobWeight_"+CountId+"'>"+Info[hideCount].jsonChildWeight+"</div>")

                     $(".groupMember_"+CountId).text(Info[hideCount].teacherName);
                     $("jobDesc_"+CountId).text(Info[hideCount].jobDesc);
                     $("jobWeight_"+CountId).text(Info[hideCount].jsonChildWeight);
                     }*/

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
                    //   workload: $('#workload').val(),
                    //   ownerId: applicant.val(),
                    //  groupManagerId: ,
                    isGroup: 0,
                    jsonParameter: newArray,
                    otherJson: otherArray,
                    jsonChildWeight: childWeight,
                    option: "modify"
                    // jobDesc: grouparray,
                    //  jsonChildWeight: childWeight,
                    //   file:formdata

                }
                , success: function (data) {
                    alert("修改成功!");
                    var msg = data.data.item;
                    window.Temp.splice(window.contentCount-1, 1, msg);
                    $("#workload_" + msg.itemId).text(msg.workload);
                    $("#itemname_" + msg.itemId).text(msg.itemName);
                    $(".form-control").attr("disabled", "disabled");
                    $(".showparameterName").attr("disabled","disabled");
                    $(".showotherparameterName").attr("disabled","disabled");
                    $(".showgroupMemberName ").attr("disabled","disabled");
                    $(".showgroupMemberSymbol").attr("disabled","disabled");
                    $(".showgroupMemberWeight").attr("disabled","disabled");
                    $("#revfile").attr("disabled","disabled");
                    $("#year").removeAttr("disabled");
                    $("term").removeAttr("disabled");
                    $(".dismissagain").hide();
                    $(".savemyApplyAgain").hide();
                    $(".editApply").show();
                    $(".editSubmit").show();
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
                                    var file = $("#revfile")
                                    file.after(file.clone().val(""));
                                    file.remove();
                                    $("#revfile").attr("disabled","disabled");
                                    $("input[name='revfile']").css({"color":"transparent","width":"80px"});
                                    $(".showagain").text(data.data.itemDto.fileName);
                                    window.Temp.splice(window.contentCount - 1,1,data.data.itemDto);
                                }

                                else{
                                    alert("文件已存在！请修改文件名火文件内容后重新上传！");
                                }
                            }

                        });
                    }
                }

            });
        }


    });
    $(document).off('click','.add');
    $(document).on('click','.add',function () {
        //  $(".applymodalbody").empty();
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
        $("#itemmanager").select2().val(null).trigger("change");
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
            childWeight=[{userId:parseInt(userId),weight:1}];
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
                        categoryId: window.Categry,
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
                        jsonChildWeight: childWeight,
                        option:"modify"
                        //   file:formdata

                    },
                    success: function (data) {

                        var Info = data.data.item;
                        var newCount=$(".neweditor").attr("id");
                        newCount=newCount.match(/\d+/g);
                        window.Temp.splice(newCount-1,1,Info);

                        $(".neweditor").show();
                      //  $(".neweditor").attr("id","neweditor_"+Info.itemId);
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
                        $("#testfile").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#itemname_"+Info.itemId).text(Info.itemName);
                        $("#workload_"+Info.itemId).text(Info.workload);
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
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[name='testfile']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newcount-1,1,data.data.itemDto);
                                    }

                                    else{
                                        alert("文件已存在！请修改文件名火文件内容后重新上传！");
                                    }
                                }

                            });
                        }
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
                       /* $(document).on("click","#show_"+Info.itemId,function () {
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
                        });*/
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
                        //   workload: $('#workload').val(),
                        //   ownerId: applicant.val(),
                        //  groupManagerId: ,
                        isGroup: 0,
                        jsonParameter: newArray,
                        otherJson: otherArray,
                        jsonChildWeight:childWeight,
                        option:"modify"
                        // jobDesc: grouparray,
                        //  jsonChildWeight: childWeight,
                        //   file:formdata

                    }
                    , success: function (data) {
                        var Info = data.data.item;
                        var newCount=$(".neweditor").attr("id");
                        newCount=newCount.match(/\d+/g);
                        window.Temp.splice(newCount-1,1,Info);
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
                        $(".groupMemberName").attr("disabled","disabled");
                        $(".groupMemberSymbol").attr("disabled","disabled");
                        $(".groupMemberWeight").attr("disabled","disabled");
                        $("#testfile").attr("disabled","disabled");
                        $("#year").removeAttr("disabled");
                        $("#term").removeAttr("disabled");
                        $("#itemname_"+Info.itemId).text(Info.itemName);
                        $("#workload_"+Info.itemId).text(Info.workload);
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
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[name='testfile']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newcount-1,1,data.data.itemDto);
                                    }
                                    else{
                                        alert("文件已存在！请修改文件名火文件内容后重新上传！");
                                    }

                                }

                            });
                        }
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
                        window.Temp.push(Info);
                        var newcount=$(".showContent").length;
                        newcount++;

                        $(".neweditor").show();
                        $(".neweditor").attr("id","neweditor_"+newcount);
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

                            var act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary  delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";

                            $(".tbody tr:last td:eq(4)").append(act);

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
                            /* var count="";
                             var CountId="";
                             var CategId="";*/
                            $(".tbody tr:last").attr("class","tbodyTr_"+newcount).css("text-align","center");
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
                          /*  var newcount=$(".showContent").length;
                            newcount++;*/
                            var act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount + "\">查看详情</a><a class=\"btn btn-primary delemyself delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";
                            $(".tbody tr:last td:eq(4)").append(act);
                        }
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
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[type='file']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newcount-1,1,data.data.itemDto);
                                    }
                                    else{
                                        alert("文件已存在！请修改文件名火文件内容后重新上传！");
                                    }

                                }

                            });
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
                        var newcount=$(".showContent").length;
                        newcount++;
                        window.Temp.push(Info);
                        $(".neweditor").show();
                        $(".neweditor").attr("id","neweditor_"+newcount);
                        $(".newsubmit").show();
                        $(".newsubmit").attr("id","newsubmit_"+Info.itemId);
                        $(".savemyApply").hide();
                        $(".dismiss").hide();
                       /* $(".downloadFile").show();
                        $(".revieFile").show();*/

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
                            $(".tbody tr:last td:eq(1)").text(Info.itemName);
                            $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);
                            $(".tbody tr:last td:eq(2)").text(Info.workload);
                            $(".tbody tr:last td:eq(2)").attr("id","workload_"+Info.itemId);

                            $(".tbody tr:last td:eq(3)").text("暂未提交");
                            $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);

                            var act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary delemyself delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";
                            $(".tbody tr:last td:eq(4)").append(act);


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
                            $(".tbody tr:last td:eq(1)").text(Info.itemName);
                            $(".tbody tr:last td:eq(1)").attr("id","itemname_"+Info.itemId);

                            $(".tbody tr:last td:eq(2)").text(Info.workload);
                            $(".tbody tr:last td:eq(1)").attr("id","workload_"+Info.itemId);
                            $(".tbody tr:last td:eq(3)").text("暂未提交");
                            $(".tbody tr:last td:eq(3)").attr("id", "statusChange_" + Info.itemId);

                            var act = "<a class=\"btn btn-primary showaddContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + newcount+ "\">查看详情</a><a class=\"btn btn-primary  delemyself_"+Info.itemId+"\" id=\"delemyself_" + newcount+ "\">删除操作</a>";
                            $(".tbody tr:last td:eq(4)").append(act);

                        }
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
                                        var file = $("#testfile")
                                        file.after(file.clone().val(""));
                                        file.remove();
                                        $("input[name='testfile']").css({"color":"transparent","width":"80px"})
                                        $(".showhidden").text(data.data.itemDto.fileName);
                                        window.Temp.splice(newcount-1,1,data.data.itemDto);
                                    }
                                   else{
                                        alert("文件已存在！请修改文件名火文件内容后重新上传！");
                                    }
                                }

                            });
                        }

                        /*$(document).on("click","#show_"+Info.itemId,function () {
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


                        });*/
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
        $("#testfile").removeAttr("disabled");
    });
    $(document).on("click","#testfile",function () {
       $(".showhidden").text("");
       $("input[name='testfile']").css({"color":"","width":""});
    });
    $(document).on("click","#revfile",function () {
        $(".showagain").text("");
        $("input[name='revfile']").css({"color":"","width":""});
    });
    $(document).off("click",".delemyself");
    $(document).on("click",".delemyself",function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        var itemid=window.Temp[thisId-1].itemId;
        if(confirm("确认删除该条目吗？")){
            $.ajax({
                url:itemManageUrl+"?itemId="+itemid,
                type:"DELETE",
                data:{
                    itemId:itemid
                },
                success:function () {
                    $(".tbodyTr_"+thisId).remove();
                    for(;thisId<=$(".itemCount").length;thisId++){
                        $(".itemCount").eq(thisId-1).text(thisId);

                    }

                }

            });
        };

    });
    /*$(document).on("click",".revieFile",function () {
        $("#testfile").show();
        $(".revieFile").hide();
    })*/
}
function showApplyHistory() {
$.get(historyUrl+"?type=apply",function (data) {
    showhistory(data);
});
}
function showRevieHistory() {
$.get(historyUrl+"?type=import",function (data) {
    showhistory(data);
 });
}
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
                for(var j=0;j<8;j++)//单元格
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

                $(".reviewerRecTbody tr:last td:eq(4)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(5)").text("待审核");
                $(".reviewerRecTbody tr:last td:eq(5)").css({"color":"#2e6da4","font-weight":"700"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_apply' id='btn-viewdetail'>查看详情</a> ";
                $(".reviewerRecTbody tr:last td:eq(6)").append(act);

                $(".reviewerRecTbody tr:last td:eq(7)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(7)").css("display","none");
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
                for(var j=0;j<8;j++)//单元格
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

                $(".reviewerRecTbody tr:last td:eq(4)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(5)").text("已通过");
                $(".reviewerRecTbody tr:last td:eq(5)").css({"color":"#f5871f","font-weight":"700"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                // id='reviewerRec_"+Info.itemId+"
                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_apply' id='btn-viewdetail'>查看详情</a> ";
                $(".reviewerRecTbody tr:last td:eq(6)").append(act);

                $(".reviewerRecTbody tr:last td:eq(7)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(7)").css("display","none");
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
                for(var j=0;j<8;j++)//单元格
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

                $(".reviewerRecTbody tr:last td:eq(4)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(5)").text("已拒绝");
                $(".reviewerRecTbody tr:last td:eq(5)").css({"color":"#d64742","font-weight":"700"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_apply' id='btn-viewdetail'>查看详情</a><button class='btn btn-primary reviewerApply source' id='reviewerRec_"+Info.itemId+"'>查看回复</button><a class='btn btn-info apply' data-toggle='modal' data-target='#applyModal' id='applyAgain_"+Info.categoryId+"'><i class='fa fa-pencil'></i>重新申请</a> ";
                $(".reviewerRecTbody tr:last td:eq(6)").append(act);

                    $("[data-toggle='popover']").popover();

                        $(".reviewerApply").popover({
                            placement: "top",
                            trigger: "click",
                            html: true,
                            title: "回复信息",
                            content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

                        });

                $(".reviewerRecTbody tr:last td:eq(7)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(7)").css("display","none");
            }
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
        var form = $(this).parent().prev().prev().prev().text();

        $("#viewdetail_apply .project").append( "<span class='itemName'>" + jsonInfo.itemName +"</span>" );
        $("#viewdetail_apply .message").append(
            "工作当量：" + jsonInfo.workload +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核状态：" + auditStatus +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核截止时间：" + deadline );

        $(".viewDetailTbody").append(rowInfo);
        for( var i=0; i<4; i++){
            $(".viewDetailTbody tr:last").append(cellInfo);
        }
        $(".viewDetailTbody tr:last").css("text-align","center");
        /* 计算公式 */
        $(".viewDetailTbody tr:last td:eq(0)").text(jsonInfo.formula);

        /* 计算参数 */
        var praValues='';
        for( var m = 0; m < jsonInfo.parameterValues.length; m++ ){
            praValues = jsonInfo.paramDesc[m].desc + "：" + jsonInfo.parameterValues[m].value;
            $(".viewDetailTbody tr:last td:eq(1)").append( praValues + "<br>");
        }

        /* 项目属性 */
        var projectProperties='';
        if( jsonInfo.otherJsonParameters && jsonInfo.otherJsonParameters.length ){
            for( var n = 0; n < jsonInfo.otherJsonParameters.length; n++ ){
                projectProperties = jsonInfo.otherJsonParameters[n].key + ":" + jsonInfo.otherJsonParameters[n].value;
                $(".viewDetailTbody tr:last td:eq(2)").append( projectProperties + "<br>");
            }
        }

        $(".viewDetailTbody tr:last td:eq(1)").css("line-height","28px");
        $(".viewDetailTbody tr:last td:eq(2)").css("line-height","28px");

        $(".viewDetailTbody tr:last td:eq(3)").text(jsonInfo.version);      //版本
    });
}

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

          /*  var type="审核人操作";
            switch (Info.type){
                case "admin":type="管理员操作";
                    break;
                case "import":type="本人操作";
                    break;
            }
            $(".historyRecTbody tr:last td:eq(3)").text(type);*/
        }
    }
}