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
                    $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append(menu_list[menu].name+":"+menu_list[menu].desc+ "<span class='applyD_"+menu_list[menu].categoryId+"'style='display:none'>"+menu_list[menu].applyDeadline+"</span><button  id='reviewer_" + menu_list[menu].categoryId + "' class='btn btn-primary reviewer' data-toggle='modal' data-target='.bs-example-modal-lg' style='float: right;'>点击复核</button><div style='clear: both;'></div>").appendTo(parent);
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
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=PrimTeachers/applyWorkload',function (result) {
        $('.right_hole').append(result);

    });

    $.get(categoryInfoListUrl, function (data) {
        var parent=$("<ul></ul>");
        showapplyall(data.data.categoryTree,parent);
       $("#tab_content1").append(parent);
       function showapplyall(menu_list,parent) {
           for (var menu=0;menu<menu_list.length;menu++) {
               //如果有子节点，则遍历该子节点
               if (menu_list[menu].children.length > 0) {
                   var isShow=traverseNode(menu_list[menu],0);
                   if(isShow==0) {
                       var li = $("<li></li>");
                       $(li).append(menu_list[menu].name).append("<ul></ul>").appendTo(parent);

                   }
                   showapplyall(menu_list[menu].children, $(li).children().eq(0));
               }
               else if(menu_list[menu].importRequired==0){
                   $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append(menu_list[menu].name+":"+menu_list[menu].desc+"<span class='applyDeadline_"+menu_list[menu].categoryId+"' style='display: none;'>"+menu_list[menu].applyDeadline+"</span> <span class='revieDeadline_"+menu_list[menu].categoryId+"' style='display: none;'>"+menu_list[menu].reviewDeadline+"</span><button  id='apply_" + menu_list[menu].categoryId + "' class='btn btn-primary apply' data-toggle='modal' data-target='.bs-example-modal-lg' style='float: right;'>点击申报</button><div style='clear: both;'></div>").appendTo(parent);
                   }

           }
        }

        $(document).off("click",".apply");
        var Temp=new Array();
        var Categry="";
        $(document).on("click",".apply",function () {
            //$(".panel-default").toggle("show");
           $('.applymodalbody').empty();
            var myseleFlag=this.id;
            var reg=parseInt(myseleFlag.match(/\d+/g));
            window.Categry=reg;
            $.get(itemGroupUrl+"?" + 'categoryId=' + reg, function (data) {
                if(data.data.itemList&&data.data.itemList.length>0) {
                   var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable"><thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
                        '<th class="sorting">工作量</th> <th class="sorting">' +
                        '申报截止时间 </th> <th class="sorting">提交状态</th> <th class="sorting">操作</th> </tr> </thead> <tbody class="tbody"></tbody></table>';

                   // $(".applymodalbody").empty();
                    $(".applymodalbody").append(tablestr);

                    var rowInfo = "<tr></tr>";
                    var cellInfo = "<td></td>";
                    var analyseList = data.data.itemList;
                    var listLength = data.data.itemList.length;
                    for (var t = 0; t < listLength; t++) {
                        var Info = analyseList[t];
                        $(".tbody").append(rowInfo);

                        for (var j = 0; j < 6; j++)//单元格
                        {
                            $(".tbody tr:last").append(cellInfo);
                        }
                        var id = t+1;
                        $(".tbody tr:last td:eq(0)").text(id);
                        $(".tbody tr:last td:eq(0)").attr("class","itemCount");
                        $(".tbody tr:last td:eq(1)").text(Info.itemName);
                        $(".tbody tr:last td:eq(2)").text(Info.workload);
                      //  $(".tbody tr:last td:eq(3)").attr("class","applyDead");
                      //  $(".tbody tr:last td:eq(3)").text($(""));
                        $(".tbody tr:last td:eq(3)").text($(".applyDeadline_"+reg).text());
                        var statusName;
                        switch (Info.status) {
                            case 0:
                                statusName = '未提交';
                                break;
                            case 1:
                                statusName = '已提交';
                                break;
                        }
                        $(".tbody tr:last td:eq(4)").text(statusName);
                        $(".tbody tr:last td:eq(4)").attr("id","statusChange_"+Info.itemId);

                        var act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + id+ "\">查看详情</a> <a class='btn btn-primary uploadAdded' id='upLAdd_"+Info.itemId+"'>上传附件</a><a class='btn btn-primary downloadAdded' id='downLoadAdd_"+Info.itemId+"'>下载附件</a>";
                        $(".tbody tr:last td:eq(5)").append(act);

                    }
                }
                window.Temp=data.data.itemList;
            });

            $(".modal-header").empty();
            $(".modal-header").append($(".item_"+reg).text());
            ownerApply(reg);
           /*$('.parameterTh').empty();
           $('.otherParaTh').empty();
            $('.AddPramter').empty();
            $("#AddOtherPramter").empty();
            $(".showparameterTh").empty();
            $(".showotherParaTh").empty();
            $('.showAddPramter').empty();
            $('#showAddOtherPramter').empty();*/
            $("#parameterTable").empty();
            $("#otherparameterTable").empty();
            $("#showparameterTable").empty();
            $("#showotherparameterTable").empty();
            comparePara(data.data.categoryTree,reg);
        });
        $(document).on("click",".showContent",function () {
            var newId=this.id;
            var newReg=parseInt(newId.match(/\d+/g));
            if($("#statusChange_"+window.Temp[newReg-1].itemId).text()=="未提交"){
                $(".editApply").show();
                $(".editApply").display=="";
                $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                $(".editSubmit").show();
                $(".editSubmit").attr("id","editSubmit_"+window.Temp[newReg-1].itemId);
                $(".editDelete").show();
                $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);
            }
            else{
                $(".editApply").hide();
                //  $(".editApply").attr("id","editApply_"+window.Temp[newReg-1].itemId);
                $(".editSubmit").hide();
                //  $(".editSubmit").attr("id","editSubmit_"+window.Temp[newReg-1].itemId);
                $(".editDelete").hide();
                //  $(".editDelete").attr("id","editDelete"+window.Temp[newReg-1].itemId);
            }
            $("#showitemName").val(window.Temp[newReg-1].itemName);
            $("#showitemName").attr("disabled","true");
            $("#showapplyDesc").val(window.Temp[newReg-1].applyDesc);
            $("#showapplyDesc").attr("disabled","true");
            $("#showaddGroupMessage").attr("disabled","true");
            if(window.Temp[newReg-1].isGroup==0){
                $("#single").attr("checked",'checked');
                $("#group").attr("disabled","true");
                $(".item_manager").hide();
                $(".item_group").hide();

            }
            else{
                $("#group").attr("checked",'checked');
                $("#single").attr("disabled","true");
                $(".showitem_manager").show();
                $(".showitem_group").show();
            }
            var showPram=window.Temp[newReg-1].parameterValues;
            for(var i=0;i<showPram.length;i++){
                $(".showparameterName").eq(i).val(showPram[i].value);
                $(".showparameterName").eq(i).attr("disabled","true");

            }
            var showOtherPara=window.Temp[newReg-1].otherJsonParameters;
            if(showOtherPara!=null){
                for(var n=0;n<showOtherPara.length;n++){
                    $(".showotherparameterName").eq(n).val(showOtherPara[n].value);

                }
            }
            $(".showotherparameterName").attr("disabled","true");

            $("#showitemmanager").attr("disabled","true");
            $("#showitemmanager option[value='"+window.Temp[newReg-1].groupManagerId+"']").attr("selected","selected");
            $('#showAddgroupPramter').empty();
            var addStr='';
           /* var $group=$(".groupMember_"+window.Temp[newReg-1].itemId);
            if($group&&$group.length){
                for(var pramterCount=0;pramterCount<$group.length;pramterCount++){

                    addStr="<tr><td><select class='showgroupMemberName teacherName' style='width: 30%;'><option selected='true'>"+$(".groupMember_"+newReg).eq(pramterCount).text()+"</option></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                    $('#showAddgroupPramter').append(addStr);
                    $(".showgroupMemberSymbol").eq(pramterCount).val($(".jobDesc_"+window.Temp[newReg-1].itemId).eq(pramterCount).text());
                    $(".showgroupMemberWeight").eq(pramterCount).val($(".jobWeight_"+window.Temp[newReg-1].itemId).eq(pramterCount).text());
                }
            }*/
           $("#showAddgroupPramter").empty();
            var b = localStorage.getItem("item_"+window.Temp[newReg-1].itemId);
            b=JSON.parse(b);
            if(b&&b.length){
                for(var pramterCount=0;pramterCount<b.length;pramterCount++){

                   var addStr="<tr><td><select class='showgroupMemberName teacherName'></select></td><td><input type='text' class='showgroupMemberSymbol'></td><td><input type='text' class='showgroupMemberWeight'></td></tr>";
                    $('#showAddgroupPramter').append(addStr);
                    $(".showgroupMemberName").eq(pramterCount).append("<option value='"+b[pramterCount].userId+"' selected='selected'>"+b[pramterCount].userName+"</option>");
                    $(".showgroupMemberSymbol").eq(pramterCount).val(b[pramterCount].jobDesc);
                    $(".showgroupMemberWeight").eq(pramterCount).val(b[pramterCount].weight);
                }
            }

            $('#showAddgroupPramter').append(addStr);

            $(".showgroupMemberName").attr("disabled","true");
            $(".showgroupMemberSymbol").attr("disabled","true");
            $(".showgroupMemberWeight").attr("disabled","true");
        });
        function comparePara(item,para){
            for(var comp=0;comp<item.length;comp++){
                if(item[comp].categoryId==para&&item[comp].formulaParameterList&&item[comp].otherJsonParameters){

                    for(var t=0;t<item[comp].formulaParameterList.length;t++){
                        var symbolname=item[comp].formulaParameterList[t].symbol;
                        /*$('.parameterTh').append("<th class='pramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                        $('.AddPramter').append("<td><input type='text' class='parameterName'></td>");
                        $('.showparameterTh').append("<th class='showpramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                        $('.showAddPramter').append("<td><input type='text' class='showparameterName'></td>");*/
                        $('#parameterTable').append("<tr><th class='pramterDesc' id='"+symbolname+"' style='font-size: 13px;'>"+item[comp].formulaParameterList[t].desc+"</th><td><input type='text' class='parameterName'></td></tr>");
                        $("#showparameterTable").append("<tr><th class='showpramterDesc' id='"+symbolname+"' style='font-size: 13px;'>"+item[comp].formulaParameterList[t].desc+"</th><td><input type='text' class='showparameterName'></td></tr>")
                    }
                    for(var s=0;s<item[comp].otherJsonParameters.length;s++){

                      /*  $('.otherParaTh').append("<th class='otherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                        $('#AddOtherPramter').append( "<td><input type='text' class='otherparameterName'></td>");
                        $('.showotherParaTh').append("<th class='showotherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                        $('#showAddOtherPramter').append("<td><input type='text' class='showotherparameterName'></td>");*/
                        $('#otherparameterTable').append("<tr><th class='otherPramterkey' style='font-size: 13px'>"+item[comp].otherJsonParameters[s].key+"</th><td><input type='text' class='otherparameterName'></td></tr>");
                        $('#showotherparameterTable').append("<tr><th class='showotherPramterkey' style='font-size: 13px;'>"+item[comp].otherJsonParameters[s].key+"</th><td><input type='text' class='showotherparameterName'></td></tr>");
                    }

                }
                else if(item[comp].children){
                    comparePara(item[comp].children,para);
                }
            }
        }
        $.get(TeacherInfoUrl,function (data) {
            for(var i=0;i<data.data.teacherList.length;i++){
                $('.teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
            }
        });

    });

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
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
               // var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(Num);
                $(".reviewerRecTbody tr:last td:eq(0)").attr("class","applyNum");
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
                if(Info.otherJsonParameters&&Info.otherJsonParameters.length) {
                    for (var n = 0; n < Info.otherJsonParameters.length; n++) {
                        otherpraValue += Info.otherJsonParameters[n].key + ":" + Info.otherJsonParameters[n].value;
                    }
                }
                $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);
                var itemDesc='';
                for(var item=0;item<Info.paramDesc.length;item++){
                    itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);
                $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(9)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(10)").text("待审核");
                $(".reviewerRecTbody tr:last td:eq(10)").css({"background-color":"#70c8e2","color":"#ffffff"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                $(".reviewerRecTbody tr:last td:eq(11)").text();
                //   var act="<a class='btn btn-primary itemToImport' id='itemToImport_"+Info.itemId+"'>提交</a> ";
                //   $(".reviewerRecTbody tr:last td:eq(11)").text();
            }
        }

    });
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
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
               // var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(Num);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(3)").text();
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
                if(Info.otherJsonParameters&&Info.otherJsonParameters.length>0){
                    for(var n=0;n<Info.otherJsonParameters.length;n++){
                        otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                    }
                }

                $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);
                var itemDesc='';
                for(var item=0;item<Info.paramDesc.length;item++){
                    itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);
                $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(9)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(10)").text("已通过");
                $(".reviewerRecTbody tr:last td:eq(10)").css({"background-color":"#1ABB9C","color":"#ffffff"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                //   var act="<a class='btn btn-primary reviewerRec' id='reviewerRec_"+Info.itemId+"'>查看回复</a> ";
                //   $(".reviewerRecTbody tr:last td:eq(10)").text(act);
                $(".reviewerRecTbody tr:last td:eq(10)").text();
            }
        }

    });
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
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
               // var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(Num);
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
                if(Info.otherJsonParameters&&Info.otherJsonParameters.length){
                    for(var n=0;n<Info.otherJsonParameters.length;n++){
                        otherpraValue+=Info.otherJsonParameters[n].key+":"+Info.otherJsonParameters[n].value;
                    }
                }

                $(".reviewerRecTbody tr:last td:eq(5)").text(praValues);
                var itemDesc='';
                for(var item=0;item<Info.paramDesc.length;item++){
                    itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);
                $(".reviewerRecTbody tr:last td:eq(7)").text(otherpraValue);


                $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);
                $(".reviewerRecTbody tr:last td:eq(9)").attr("class","revieDead_"+Info.categoryId);
                $(".revieDead_"+Info.categoryId).text($(".revieDeadline_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(10)").text("已拒绝");
                $(".reviewerRecTbody tr:last td:eq(10)").css({"background-color":"#f0ad4e","color":"#ffffff"});
                /*  var statusName='';
                 switch (Info.status){
                 case 1:statusName="已提交";
                 break;
                 case 0:statusName="未提交";
                 }*/

                var act="<button class='btn btn-primary reviewerApply source' id='reviewerRec_"+Info.itemId+"'>查看回复</button><a class='btn btn-info apply' data-toggle='modal' data-target='#applyModal' id='applyAgain_"+Info.categoryId+"'><i class='fa fa-pencil'></i>重新申请</a> ";
                $(".reviewerRecTbody tr:last td:eq(11)").append(act);
                $(".reviewerRecTbody tr:last td:eq(11)").attr("width","150px");

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
            $(".historyRecTbody tr:last td:eq(2)").text(Info.operation);
            $(".historyRecTbody tr:last td:eq(3)").text(Info.userName);
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