/**
 * Created by SBWang on 2017/9/13.
 */
/*申报人复核*/
function workRevie(){

    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=PrimTeachers/reviewerWorkload',function (result) {
        $('.right_hole').append(result);

    });
    $.get(itemImportUrl, function (data) {
        if(data.data!=null&&data.data.categoryTree){
            var showlist=$("<ul></ul>");
            showimportall(data.data.categoryTree,showlist);

            $('#tab_content1').append(showlist);
        }

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
/*查看导入复核情况*/
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
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                //   var id=i;
                $(".reviewerRecTbody tr:last").css("text-align","center");

                $(".reviewerRecTbody tr:last td:eq(0)").text(RevNum);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);

                /* 计算公式 */
                // $(".reviewerRecTbody tr:last td:eq(3)").text(Info.formula);

                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(3)").text(showtype);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.applyTime);
                /* 复核截止时间 */
                $(".reviewerRecTbody tr:last td:eq(5)").attr("class","revieRec_"+Info.categoryId);
                $(".revieRec_"+Info.categoryId).text($(".time_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("已通过");

                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_review' id='btn-viewdetail'>查看详情</a> ";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-two");

                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");
                //   console.log($(".reviewerRecTbody tr:last td:eq(7)").text());


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
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                var id=i;

                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text(RevNum);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);

                /* 计算公式 */
                // $(".reviewerRecTbody tr:last td:eq(3)").text(Info.formula);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(3)").text(showtype);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.applyTime);

                /* 参数描述 */
                // var itemDesc='';
                // for(var item=0;item<Info.paramDesc.length;item++){
                //     itemDesc+=Info.paramDesc[item].symbol+":"+Info.paramDesc[item].desc;
                // }
                // $(".reviewerRecTbody tr:last td:eq(6)").text(itemDesc);

                /* 版本 */
                //  $(".reviewerRecTbody tr:last td:eq(8)").text(Info.version);

                $(".reviewerRecTbody tr:last td:eq(5)").attr("class","revieRec_"+Info.categoryId);
                $(".revieRec_"+Info.categoryId).text($(".time_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("尚存疑");

                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_review' id='btn-viewdetail'>查看详情</a> ";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-two");

                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");

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
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                //   var id=i;
                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text(RevNum);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.workload);
                // $(".reviewerRecTbody tr:last td:eq(3)").text(Info.formula);

                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(3)").text(showtype);
                $(".reviewerRecTbody tr:last td:eq(4)").text(Info.applyTime);
                $(".reviewerRecTbody tr:last td:eq(5)").attr("class","revieRec_"+Info.categoryId);
                $(".revieRec_"+Info.categoryId).text($(".time_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("已解惑");


                var act="<a class='btn btn-primary viewDetail' data-toggle='modal' data-target='#viewdetail_review' id='btn-viewdetail'>查看详情</a><a class='btn btn-primary reviewerApply' id='reviewerRec_"+Info.itemId+"'>查看回复</a> ";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-two");

                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");

            }
            $("[data-toggle='popover']").popover();
            $(".reviewerApply").popover({
                placement: "top",
                trigger: "click",
                html: true,
                title: "回复信息",
                content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

            });
        }
    });
    /* 查看回复修复 */
    //$(".reviewerApply").off("click");
    $(".reviewerApply").on("click",function () {
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
            && !target.hasClass('reviewerApply')
            && !target.hasClass('popover-content')
            && !target.hasClass('popover-title')
            && !target.hasClass('arrow')) {
            /* $('#folder').popover('hide');*/
            $(".reviewerApply").popover('hide');
        }

    });
    $(document).on("click","#btn-viewdetail",function (){
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        $("#viewdetail_review .project").empty();
        $("#viewdetail_review .message").empty();
        $("#viewdetail_review tbody").empty();
        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);
        var deadline = $(this).parent().prev().prev().text();
        var auditStatus = $(this).parent().prev().text();
        var form = $(this).parent().prev().prev().prev().prev().text();

        $("#viewdetail_review .project").append( "<span class='itemName'>" + jsonInfo.itemName +"</span>" );
        $("#viewdetail_review .message").append(
            "工作当量：" + jsonInfo.workload +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复核状态：" + auditStatus +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复核截止时间：" + deadline );

        $(".viewDetailTbody").append(rowInfo);
        for( var i=0; i<3; i++){
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
                projectProperties = jsonInfo.otherJsonParameters[n].key + "：" + jsonInfo.otherJsonParameters[n].value;
                $(".viewDetailTbody tr:last td:eq(2)").append( projectProperties + "<br>");
            }
        }
        $(".viewDetailTbody tr:last td:eq(1)").css("line-height","28px");
        $(".viewDetailTbody tr:last td:eq(2)").css("line-height","28px");
    });
}
/*复核操作日志*/
function showRevieHistory() {
    $.get(historyUrl+"?type=import",function (data) {
        showhistory(data);
    });
}