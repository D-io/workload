/**
 * Created by SBWang on 2017/9/13.
 */
/*导入工作当量*/
function importWorkload(){
    $.ajaxSetup({
        async : false
    });
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=auditor/auditorcontent',{test : 12},function (result) {
        $('.right_hole').append(result);
        $(".hiddendistrict").empty();
    });
    $.get(itemAuditorUrl,{test : 12},function (data) {
        if(data.data!=null&&data.data.importCategories){
            var parent = $("<ul></ul>");
            showimportall(data.data.importCategories,parent);
            $("#tab_content1").append(parent);
        }
    });
    $.get(TeacherInfoUrl,{test : 12},function (data) {
        var teacherInfo=data.data.teacherList;
        var selectdata=new Array();
        for(var i=0;i<teacherInfo.length;i++){
            $('#itemMember').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');
           // $('#itemmanager').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');

        }
    });
    $("#itemMember").select2({
        placeholder:"",
        allowClear: true,
        width:"100%",
    });
   /* $("#itemmanager").select2({
        placeholder:"",
        allowClear: true,
        width:"100%",
    });*/
}
/*查看导入复核情况*/
function showimportRec() {

    $(".reviewerRec").show();
    $(".reviewerRecTbody").empty();
    var doubtedItem='';
    var uncommited='';
    var Count_double=0;
    $.get(auditorManageItemUrl+"?"+"importRequired=1",function (data) {
        doubtedItem=data.data.itemList;
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";

        if(doubtedItem&&doubtedItem.length){
            var analyseList= doubtedItem;
            var listLength= doubtedItem.length;
            for(var i=0;i<listLength;i++)
            {
                Count_double++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text( Count_double);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.teacherName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(3)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(3)").attr("id","workload_"+Info.itemId);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(4)").text(showtype);

                $(".reviewerRecTbody tr:last td:eq(5)").text($(".time_"+Info.categoryId).text());
                var statusName='';
                var editact="<a class='btn btn-primary' data-toggle='modal' data-target='#viewdetail_import' id='btn-viewimportdetail'>查看详情</a><a class='btn btn-primary reviewerApply' id='showImportRec_"+Info.itemId+"'>存疑原因</a><a class='btn btn-info editInfo "+Info.itemId+"' id='editInfo_"+Info.categoryId+"' data-target='#editModal' data-toggle='modal'>修改存疑</a> ";
                var act="<a class='btn btn-primary' data-toggle='modal' data-target='#viewdetail_import' id='btn-viewimportdetail'>查看详情</a>";

                switch(Info.status){
                    case 1:statusName='待复核';
                        $(".reviewerRecTbody tr:last td:eq(7)").append(act);
                        break;
                    case 2:statusName='已通过';
                        $(".reviewerRecTbody tr:last td:eq(7)").append(act);
                        break;
                    case 3:statusName='尚存疑';
                        $(".reviewerRecTbody tr:last td:eq(7)").append(editact);
                        break;
                    case 4:statusName='已解决';
                        $(".reviewerRecTbody tr:last td:eq(7)").append(act);
                        break;
                }
                $(".reviewerRecTbody tr:last td:eq(6)").text(statusName);

                $(".reviewerRecTbody tr:last td:eq(7)").attr("class","operation-btn-three");
                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");
            }
            /*初始化popover*/
            $("[data-toggle='popover']").popover();
            $(".reviewerApply").popover({
                placement: "top",
                trigger: "click",
                html: true,
                title: "回复信息",
                content: '<div>回复人：<span class="sendFromName"></span></div><div>回复内容:<span class="msgContent"></span></div><hr/><div>回复时间：<span class="sendTime"></span></div>'

            });
        }

        /* 查看回复信息 */

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
        /*点击空白处popover消失*/
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
    });
    $.get(auditorManageItemUrl+"?"+"importRequired=1&&option=uncommitted",function (data) {
        uncommited=data.data.unCommittedItem;

        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";

        if(uncommited&&uncommited.length){
            var analyseList= uncommited;
            var listLength= uncommited.length;
            for(var i=0;i<listLength;i++)
            {
                Count_double++;
                var Info=analyseList[i];
                $(".reviewerRecTbody").append(rowInfo);
                //  $(".showImportbodyList tr:last").attr("id",Info.itemId);
                for(var j=0;j<9;j++)//单元格
                {
                    $(".reviewerRecTbody tr:last").append(cellInfo);
                }
                $(".reviewerRecTbody tr:last").css("text-align","center");
                $(".reviewerRecTbody tr:last td:eq(0)").text( Count_double);
                $(".reviewerRecTbody tr:last td:eq(1)").text(Info.teacherName);
                $(".reviewerRecTbody tr:last td:eq(2)").text(Info.itemName);
                $(".reviewerRecTbody tr:last td:eq(3)").text(Info.workload);
                $(".reviewerRecTbody tr:last td:eq(3)").attr("id","workload_"+Info.itemId);
                // $(".reviewerRecTbody tr:last td:eq(4)").text(Info.formula);
                var showtype='';
                switch (Info.isGroup){

                    case 1:showtype="小组申报";
                        break;
                    case 0:showtype="个人申报";
                        break;

                }
                $(".reviewerRecTbody tr:last td:eq(4)").text(showtype);

                $(".reviewerRecTbody tr:last td:eq(5)").text($(".time_"+Info.categoryId).text());
                $(".reviewerRecTbody tr:last td:eq(6)").text("未提交");
                var act="<a class='btn btn-primary' data-toggle='modal' data-target='#viewdetail_import' id='btn-viewimportdetail'>查看详情</a>";
                $(".reviewerRecTbody tr:last td:eq(7)").append(act).attr("class","operation-btn-three");

                $(".reviewerRecTbody tr:last td:eq(8)").text(JSON.stringify(Info));
                $(".reviewerRecTbody tr:last td:eq(8)").css("display","none");
            }
        }


    });
    /*查看详情按钮*/
    $(document).on("click","#btn-viewimportdetail",function (){
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        $("#viewdetail_import .project").empty();
        $("#viewdetail_import .message").empty();
        $("#viewdetail_import tbody").empty();
        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);
        var deadline = $(this).parent().prev().prev().text();
        var auditStatus = $(this).parent().prev().text();
        var form = $(this).parent().prev().prev().prev().text();

        $("#viewdetail_import .project").append( "<p class='itemName'>【项目名称】" + jsonInfo.itemName +"</p>" );
        $("#viewdetail_import .message").append(
            "工作当量：" + jsonInfo.workload +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申报形式：" + form +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复核状态：" + auditStatus +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复核截止时间：" + deadline );

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
            praValues = jsonInfo.paramDesc[m].desc + "（"+jsonInfo.parameterValues[m].symbol +"）："  + jsonInfo.parameterValues[m].value;
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
    $(document).off("click",".editInfo");
    /*修改存疑*/
    $(document).on("click",".editInfo",function () {
        $(".parameterTh").empty();
        $(".editorPram").empty();
        $(".otherParaTh").empty();
        $(".editorotherPara").empty();
        var Info = $(this).parent().next().text();
        var jsonInfo = JSON.parse(Info);

        if(jsonInfo.descAndValues!=null){
            for(var count=0;count<jsonInfo.descAndValues.length;count++){

                $(".parameterTh").append("<tr><th class='addpramterDesc' id='"+jsonInfo.parameterValues[count].symbol+"'>"+jsonInfo.descAndValues[count].desc+"</th><td><input type='text' class='addparameterName form-control'></td></tr>")
                // $(".editorPram").append("<td><input type='text' class='parameterName form-control'></td>");

                $(".addparameterName").eq(count).val(jsonInfo.descAndValues[count].value);
            }
            $(".addparameterName").attr("disabled","true");
        }
        if(jsonInfo.otherJsonParameters!=null){
            for(var othercount=0;othercount<jsonInfo.otherJsonParameters.length;othercount++){
                $(".otherParaTh").append("<tr><th class='addotherPramterkey'>"+jsonInfo.otherJsonParameters[othercount].key+"</th><td><input type='text' class='addotherparameterName form-control'></td></tr>")
                //    $(".editorotherPara").append("<td><input type='text' class='otherparameterName form-control'></td>");
                $(".addotherparameterName").eq(othercount).val(jsonInfo.otherJsonParameters[othercount].value);

            }
            $(".addotherparameterName").attr("disabled","true");
        }
        $("#showitemName").val(null);
        $("#showitemName").attr("disabled","true");
        $(".editorSubmit").attr("id","editorSubmit_"+jsonInfo.itemId);
    });
    $(document).off("click",".editApplyInfo");
    /*编辑项目信息*/
    $(document).on("click",".editApplyInfo",function () {
        $(".addparameterName").removeAttr("disabled");
        $(".addotherparameterName").removeAttr("disabled");
        $("#showitemName").removeAttr("disabled");
    });
    $(document).off("click",".editorSubmit");
    /*提交修改存疑信息*/
    $(document).on("click",".editorSubmit",function () {
        var submitId=parseInt(this.id.match(/\d+/g));
        var newArray = new Array();
        if( $(".addpramterDesc").length>0){
            for (var i = 0; i < $(".addparameterName").length; i++) {
                var dom = $(".addpramterDesc").eq(i).attr("id");
                newArray.push({symbol: dom, value:parseInt($(".addparameterName").eq(i).val())});

            }
            newArray = JSON.stringify(newArray);
        }
        else {
            newArray=null;
        }
        var otherArray = new Array();
        var otherPramterkey = $(".addotherPramterkey");
        if(otherPramterkey.length>0){
            for (var j = 0; j < otherPramterkey.length; j++) {
                var otherKey=$(".addotherPramterkey").eq(j);
                otherArray.push({key: otherKey.text(), value: $(".addotherparameterName").eq(j).val()});

            }
            otherArray = JSON.stringify(otherArray);
        }
        else {
            otherArray=null;
        }
        $.post(reviDoubleCheckUrl, {
            itemId:submitId,
            parameterValues:newArray,
            otherParameters:otherArray,
            message:$("#showitemName").val()
        },function () {
            showimportRec();
            alert("操作成功！");
            $("#editModal").modal("hide");
        })
    });
}
function showImportHis() {
    $.get(historyUrl+"?role=reviewer&type=import",function (data) {
        showhistory(data);
    });
}