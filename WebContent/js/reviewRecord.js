function workRevie(){

    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=PrimTeachers/reviewerWorkload',function (result) {
        $('.right_hole').append(result);

    });
    $.get(itemImportUrl, function (data) {
       var showlist=$("<ul></ul>");
        showimportall(data.data.categoryTree,showlist);

        $('#tab_content1').append(showlist);
/*function  showimportall(item) {
    for(var i=0;i<item.length;i++){
        if(item[i].importRequired==1){
            $('#tab_content1').append("<li id='catInfo_"+item[i].categoryId+"'>"+item[i].name+":"+item[i].desc+"</li>");
            if(item[i].formula){
                $.get("/item/info/item-group?" + 'categoryId=' + item[i].categoryId, function (data) {
                    if(data.data.itemList){

                            var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer"> <thead> <tr role="row"> <th  class="sorting" style="width: 60px;">序号</th> <th  class="sorting" style="width: 278px;">条目名称</th> ' +
                                '<th class="sorting" style="width: 78px;">工作量</th> <th class="sorting" style="width: 160px;">计算公式</th><th class="sorting" style="width: 200px;">主要参数</th> <th class="sorting" style="width: 93px;">' +
                                '复核截止时间 </th> <th class="sorting"  id="review_' + data.data.itemList[applyItemCount].itemId + '" style="width: 83px;">复核状态 </th> <th class="sorting"  style="width: 183px;">操作</th> </tr> </thead> <tbody class="tbody_' + data.data.itemList[applyItemCount].itemId + '"></tbody></table>';
                            $('#catInfo_' + item[i].categoryId).append(tablestr);

                        var rowInfo = "<tr></tr>";
                        var cellInfo = "<td></td>";
                        var analyseList = data.data.itemList;
                        var listLength = data.data.itemList.length;
                        for (var t = 0; t < listLength; t++) {
                            var Info = analyseList[t];
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId).append(rowInfo);

                            for (var j = 0; j < 7; j++)//单元格
                            {
                                $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last").append(cellInfo);
                            }
                            var id = t;
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(0)").text(id + 1);
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(1)").text(Info.itemName);
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(2)").text(Info.workload);
                            $(".tbody_" + data.data.itemList[applyItemCount].itemId + " tr:last td:eq(3)").text();
                            var paramArray = Info.parameterValues;
                            var str = '';
                            for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

                                str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
                            }
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(4)").text(str);
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(5)").text('2017-12-31');
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
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(6)").text(statusName);

                            var act = "<a class=\"btn btn-success sure\" id=\"pass_'" + Info.itemId + "'\">确认通过</a><a class=\"btn btn-danger LeaveQues\" data-toggle=\"modal\" data-target=\"#refuModal\" id=\"refuse_'" + Info.itemId + "'\">存疑提交</a> ";
                            $(".tbody_" + data.data.itemList[applyItemCount].categoryId + " tr:last td:eq(7)").append(act);
                        }

                         var abnormaldata = showdata(data.data.itemList);
                         $('.mymodaldata').append(abnormaldata);
                         $(".btn-success").on("click", function () {
                         var v = this.className;
                         var b = v.match(/\d+/g);
                         var itemstr = 'itemId=' + b + '&status=2';
                         $.ajax({
                         type: "POST",
                         url: "/item/manage/status-update?" + itemstr

                         });
                         $('#status_' + b).val('通过');
                         });
                         $(".btn-info").on("click", function () {
                         var message = $('#refusedesc').val();
                         var x = this.className;
                         var a = x.match(/\d+/g);
                         var itemstr = 'itemId=' + a + '&status=3' + '&message=' + message;
                         $(".commit").on("click", function () {
                         $.ajax({
                         type: "POST",
                         url: "/item/manage/status-update?" + itemstr

                         });
                         $('#refuseModal').modal('hide');
                         $('#status_' + a).val('存疑状态');
                         });

                         })


                    }
                });
            }
        }
        if(item[i].children){
            showimportall(item[i].children);
        }
    }
}*/
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

  $.get(itemTeacherInfo+"?"+"importedRequired=1&status=2",function (data) {
      var rowInfo="<tr></tr>";
      var cellInfo="<td></td>";
      if(data.data.itemList&&data.data.itemList.length){
          var analyseList= data.data.itemList;
          var listLength= data.data.itemList.length;
          for(var i=0;i<listLength;i++)
          {
              var Info=analyseList[i];
              $(".reviewerRecTbody").append(rowInfo);
              for(var j=0;j<12;j++)//单元格
              {
                  $(".reviewerRecTbody tr:last").append(cellInfo);
              }
              var id=i;
              $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
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
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
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
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
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
                   $("<li class='item_"+menu_list[menu].categoryId+"'></li>").append(menu_list[menu].name+":"+menu_list[menu].desc+ "<span class='applyDeadline_"+menu_list[menu].categoryId+"' style='display: none;'>"+menu_list[menu].applyDeadline+"</span> <span class='revieDeadline_"+menu_list[menu].categoryId+"' style='display: none;'>"+menu_list[menu].reviewDeadline+"</span><button  id='apply_" + menu_list[menu].categoryId + "' class='btn btn-primary apply' data-toggle='modal' data-target='.bs-example-modal-lg' style='float: right;'>点击申报</button><div style='clear: both;'></div>").appendTo(parent);
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
                   var tablestr = '<table  class="table table-striped table-bordered dataTable no-footer newTable" style="font-size: 14px;"> <thead> <tr role="row"> <th  class="sorting" >序号</th> <th  class="sorting">条目名称</th> ' +
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
                        $(".tbody tr:last td:eq(1)").text(Info.itemName);
                        $(".tbody tr:last td:eq(2)").text(Info.workload);
                        $(".tbody tr:last td:eq(3)").attr("class","applyDead")
                      //  $(".tbody tr:last td:eq(3)").text($(""));
                        $(".applyDead").text($(".applyDeadline_"+reg).text());
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

                        var act = "<a class=\"btn btn-primary showContent\" data-toggle=\"modal\" data-target=\"#showContent\" id=\"show_" + id+ "\">查看详情</a> ";
                        $(".tbody tr:last td:eq(5)").append(act);

                    }
                }
                window.Temp=data.data.itemList;
            });

            $(".modal-header").empty();
            $(".modal-header").append($(".item_"+reg).text());
            ownerApply(reg);
           $('.parameterTh').empty();
           $('.otherParaTh').empty();
            $('.AddPramter').empty();
            $("#AddOtherPramter").empty();
            $(".showparameterTh").empty();
            $(".showotherParaTh").empty();
            $('.showAddPramter').empty();
            $('#showAddOtherPramter').empty();
            comparePara(data.data.categoryTree,reg);
        });

        function comparePara(item,para){
            for(var comp=0;comp<item.length;comp++){
                if(item[comp].categoryId==para&&item[comp].formulaParameterList&&item[comp].otherJsonParameters){

                    for(var t=0;t<item[comp].formulaParameterList.length;t++){
                        var symbolname=item[comp].formulaParameterList[t].symbol;
                        $('.parameterTh').append("<th class='pramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                        $('.AddPramter').append("<td><input type='text' class='parameterName'></td>");
                        $('.showparameterTh').append("<th class='showpramterDesc' id='"+symbolname+"'>"+item[comp].formulaParameterList[t].desc+"</th>");
                        $('.showAddPramter').append("<td><input type='text' class='showparameterName'></td>");
                    }
                    for(var s=0;s<item[comp].otherJsonParameters.length;s++){

                        $('.otherParaTh').append("<th class='otherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                        $('#AddOtherPramter').append( "<td><input type='text' class='otherparameterName'></td>");
                        $('.showotherParaTh').append("<th class='showotherPramterkey'>"+item[comp].otherJsonParameters[s].key+"</th>");
                        $('#showAddOtherPramter').append("<td><input type='text' class='showotherparameterName'></td>");

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

    $.get(itemTeacherInfo+"?importedRequired=0&status=1",function (data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(data.data.itemList){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
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
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
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
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<12;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;
                $(".reviewerRecTbody tr:last td:eq(0)").text(id+1);
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
            var type="审核操作";
            switch (Info.type){
                case "admin":type="管理员操作";
                    break;
                case "import":type="本人操作";
                    break;
            }
            $(".historyRecTbody tr:last td:eq(3)").text(type);
        }
    }
}