/**
 * Created by SBWang on 2017/8/10.
 */
$(document).ready(function () {
    getSideBar(currentRole,roleList);
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
    $(document).on("click",".reviewerApply",function () {
        var subject=this.id;
        var subjectList=parseInt(subject.match(/\d+/g));
        $.get(itemInfoSubUrl+"?"+"itemId="+subjectList,function (data) {

            $(".reviewerApply").popover({
                placement:"top",
                trigger:"focus",
                html:true,
                title:"回复信息",
                content:'<div>发送人：<span class="sendName">'+data.data.subjectList[0].sendFromName+'</span></div><hr/><div>回复描述：<span class="sendDesc">'+data.data.subjectList[0].msgContent+'</span></div><hr/><div>回复时间：<span class="sendTime">'+data.data.subjectList[0].sendTime+'</span></div><hr/>'

            })

        });
    });

});
function getSideBar(role,roleList) {
    if(role=="ADMIN"){
        $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
        });
        $.get(pageManageUrl+"?"+"regionName=manager/Manager-right-col",function (html) {
            $(".right_hole").empty();
            $(".right_hole").append(html);
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
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
            });
           /* $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });*/
            applyworkload();

        }
        else {
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
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
        $.get(pageManageUrl+"?"+"regionName=manager/PrimaryTeacher-left-sidebar",function (html) {
            $(".scroll-view").empty();
            $(".scroll-view").append(html);
        });
        $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
            /*$(".right_hole").empty();
            $(".right_hole").append(html);*/
        });
        applyworkload();
    }
}
function changeSideBar(role,roleList) {

        if(roleList.length==3){
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
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
                    $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",function (html) {
                        $(".scroll-view").empty();
                        $(".scroll-view").append(html);
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
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-left-sidebar",function (html) {
        $(".scroll-view").empty();
        $(".scroll-view").append(html);
    });
    $.get(pageManageUrl+"?"+"regionName=manager/Manager-right-col",function (html) {
           $(".right_hole").empty();
         $(".right_hole").append(html);
    });
    ztree();
}
/*function getSubjectList(item) {

    $.get(itemInfoSubUrl+"?"+"itemId="+subjectList,function (data) {
        $(".reviewerApply").popover().click(function() {
            $(".sendName").text(data.data.subjectList[0].sendFromName);
            $(".sendDesc").text(data.data.subjectList[0].msgContent);
            $(".sendTime").text(data.data.subjectList[0].sendTime);
    });

    });
}*/


