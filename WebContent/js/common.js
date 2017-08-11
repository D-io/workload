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
    })
    $(document).on("click","#itemChange",function () {
        $.post(thisTermUrl+"?year="+$("#year").find("option:selected").text()+"&scheme="+parseInt($("#term").val()),function (data) {
            
        });
    })

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
    }
    else if(role=="RE"){
        $("#dropdownMenu1").hide();
        if(roleList.length==2){
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
            });
            $.get(pageManageUrl+"?"+"regionName=manager/Teachers-right-col",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });
            applyworkload();

        }
        else {
            $.get(pageManageUrl+"?"+"regionName=manager/SpecialTeacher1-left-sidebar",function (html) {
                $(".scroll-view").empty();
                $(".scroll-view").append(html);
            });
            $.get(pageManageUrl+"?"+"regionName=auditor/auditorcontent",function (html) {
                $(".right_hole").empty();
                $(".right_hole").append(html);
            });
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
            $(".right_hole").empty();
            $(".right_hole").append(html);
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

