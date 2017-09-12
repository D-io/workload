/**
 * Created by SBWang on 2017/8/30.
 */

$(document).ready(function () {
        $BODY = $('body'),
        $MENU_TOGGLE = $('#menu_toggle'),
        $SIDEBAR_MENU = $('#sidebar-menu'),
        $SIDEBAR_FOOTER = $('.sidebar-footer'),
        $LEFT_COL = $('.left_col'),
        $RIGHT_COL = $('.right_col'),
        $NAV_MENU = $('.nav_menu'),
        $FOOTER = $('footer');
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $MENU_TOGGLE.on('click', function() {

        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            $(".profile_info").hide();
            $(".child_menu").hide();
            del_mousover();

        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            $(".profile_info").show();
            $(".child_menu").show();

            $(".firstToggleLi").unbind("mouseenter").unbind("mouseleave");
            $(".secondToggleLi").unbind("mouseenter").unbind("mouseleave");
            $(".thirdToggleLi").unbind("mouseenter").unbind("mouseleave");
            $(".fourthToggleLi").unbind("mouseenter").unbind("mouseleave");

        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
    });
    $(document).on("click",".collapse-link",function () {
        $(".x_content").toggle("slow");
        $(".fa-chevron-up").toggleClass("fa-chevron-down");
    });
    $(document).on("click", ".close-link",function () {
        $(".x_panel").hide();
    });
});
function del_mousover() {
    $(".firstToggleLi").hover(function () {
        $("#child_one_menu").show();
    },function () {
        $("#child_one_menu").hide();
    });
    $(".secondToggleLi").hover(function () {
        $("#child_two_menu").show();
    },function () {
        $("#child_two_menu").hide();
    });
    $(".thirdToggleLi").hover(function () {
        $("#child_third_menu").show();
    },function () {
        $("#child_third_menu").hide();
    });
    $(".fourthToggleLi").hover(function () {
        $("#child_fourth_menu").show();
    },function () {
        $("#child_fourth_menu").hide();
    });
}


