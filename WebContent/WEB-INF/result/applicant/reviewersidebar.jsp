<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/17
  Time: 17:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="left_col scroll-view">
    <div class="navbar nav_title">
        <a href="#" class="site_title"><span><img src="css/images/logo.png" alt="..." class="left_span"></span><span class="right_span">教师工作量系统</span></a>

    </div>

    <div class="clearfix"></div>

    <!-- menu profile quick info -->

    <div class="profile clearfix">
        <div class="profile_pic">
            <img src="css/images/img.jpg" alt="..." class="img-circle profile_img">

        </div>
        <div class="profile_info">
            <span>欢迎,</span>
            <h2>John Doe</h2>

        </div>
        <div class="dropdown" id="changerole">
            <button type="button" class="btn dropdown-toggle" id="dropdownMenu1"
                    data-toggle="dropdown">
                切换角色
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation">
                    <a id="reviewer" tabindex="-1" class="swift-role" onclick="changeRole(this)">复核人</a>
                </li>
                <li role="presentation">
                    <a id="auditor" tabindex="-1" class="swift-role" onclick="changeRole(this)">审核人</a>
                </li>
                <li role="presentation">
                    <a id="manager" tabindex="-1" class="swift-role" onclick="changeRole(this)">管理员</a>
                </li>

            </ul>
        </div>

    </div>

    <!-- /menu profile quick info -->

    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
            <ul class="nav side-menu">
                <li class="active"><a id="clickToggle1"><i class="fa fa-home"></i> 复核 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li class="ck1" onclick="workRevie()"><a><span>工作量复核</span></a></li>
                        <li class="ck1" onclick="reviewerRec()"><a><span>复核记录</span></a></li>
                    </ul>
                </li>

                <li class="active"><a id="clickToggle2"><i class="fa fa-edit"></i> 申报 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li class="ck2" onclick="applyworkload()"><a><span>工作量申报</span></a></li>
                        <li class="ck2" onclick="applyRec()"><a><span>查看申报记录</span></a></li>
                    </ul>
                </li>

                <li class="active"><a id="clickToggle3"><i class="fa fa-desktop"></i> 统计 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">

                        <li  class="ck3"><a ><span>工作量统计</span></a></li>

                    </ul>
                </li>
            </ul>
        </div>


    </div>
</div>

<!-- /sidebar menu -->
