/**
 * Created by SBWang on 2017/9/13.
 */
/*审核工作当量*/
function auditworkload() {
    $.ajaxSetup({
        async : false
    });
    $('.right_hole').empty();

    $.get(pageManageUrl+"?"+'regionName=auditor/auditworkload',{test : 12},function (result) {
        $('.right_hole').append(result);
    });
    $.get(workloadAuditUrl,{test : 12},function (data) {
        if(data.data!=null&&data.data.applyCategories){
            var showimport=  $("<ul></ul>");
            showall(data.data.applyCategories, showimport);
            $("#tab_content1").append(showimport);
        }
        /*确认通过操作*/
        $(document).off("click",".pass");
        $(document).on("click",".pass",function () {
            var flag=this.id;
            var passItemId=flag.match(/\d+/g);
            if(confirm("确认通过？")) {
                $.post(reviewerCheckUrl + "?" + "itemId=" + passItemId + "&status=2", function () {
                    alert('操作成功！');
                    $("#reviewe_" + passItemId).text("已通过");
                   /* $("#pass_" + passItemId).attr("disabled", "disabled");
                    $("#refuse_" + passItemId).attr("disabled", "disabled");*/
                    $("#pass_" + passItemId).remove();
                    $("#refuse_" + passItemId).remove();
                })
            }
        });
        /*审核拒绝操作*/
        $(document).off("click",".refuse");
        $(document).on("click",".refuse",function () {
            var reflag=this.id;
            var refuItemId=reflag.match(/\d+/g);
            $("#refusedesc").val(null);
            $(document).off("click","#refucommit");
            /*提交存疑理由等*/
            $(document).on("click","#refucommit",function () {
                var refudesc=$("#refusedesc").val();
                $.post(reviewerCheckUrl+"?"+"itemId="+refuItemId+"&status=5"+"&message="+refudesc,function () {
                    alert('操作成功！');
                    $("#reviewe_"+refuItemId).text("已拒绝");
                   /* $("#pass_"+refuItemId).attr("disabled","disabled");
                    $("#refuse_"+refuItemId).attr("disabled","disabled");*/
                    $("#pass_"+refuItemId).remove();
                    $("#refuse_"+refuItemId).remove();
                    $("#refuseModal").modal("hide");
                })
            });
        });
    });
}
/*审核操作日志*/
function showReviewerHis() {
    $.get(historyUrl+"?role=reviewer&type=apply",function (data) {
        showhistory(data);
    });
}