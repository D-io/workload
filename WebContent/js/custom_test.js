/**
 * Created by SBWang on 2017/8/30.
 */

// Sidebar
$(document).ready(function () {
   // var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
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

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    /* $SIDEBAR_MENU.find('a').on('click', function(ev) {
     console.log('clicked - sidebar_menu');
     var $li = $(this).parent();

     if ($li.is('.active')) {
     $li.removeClass('active active-sm');
     $('ul:first', $li).slideUp(function() {
     setContentHeight();
     });
     } else {
     // prevent closing menu if we are on child menu
     if (!$li.parent().is('.child_menu')) {
     $SIDEBAR_MENU.find('li').removeClass('active active-sm');
     $SIDEBAR_MENU.find('li ul').slideUp();
     }else
     {
     if ( $BODY.is( ".nav-sm" ) )
     {
     $SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
     $SIDEBAR_MENU.find( "li ul" ).slideUp();
     }
     }
     $li.addClass('active');

     $('ul:first', $li).slideDown(function() {
     setContentHeight();
     });
     }
     });*/

// toggle small or large menu


    $MENU_TOGGLE.on('click', function() {

        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            $(".profile_info").hide();
            //$(".child_menu").toggle();
            $(".child_menu").hide();
            del_mousover();

        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            $(".profile_info").show();
            $(".child_menu").show();
            /* $("#clickToggle1").on("click",function () {
             $(".ck1").toggle("slow");

             });*/
            $(".firstToggleLi").unbind("mouseenter").unbind("mouseleave");
            $(".secondToggleLi").unbind("mouseenter").unbind("mouseleave");
            $(".thirdToggleLi").unbind("mouseenter").unbind("mouseleave");
            $(".fourthToggleLi").unbind("mouseenter").unbind("mouseleave");
            /*	$(".active").attr("onmouseout");
             $(".active").attr("onmouseover");
             $(".active").mouseout(function () {
             var s = event.toElement || event.relatedTarget;
             if (!$(".child_menu").contains(s)) { $(".child_menu").hide("slow"); }
             });
             $(".active").mouseover(function () {
             var s = event.fromElement || event.relatedTarget;
             if (!$(".child_menu").contains(s)) { $(".child_menu").show("slow"); }
             });*/
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
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


