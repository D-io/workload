<%--
Created by IntelliJ IDEA.
User: Administrator
Date: 2017/7/5 0005
Time: 16:06
To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Web Fonts  -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">

    <!-- Vendor CSS 供应商(类似于框架配的)-->
    <link rel="stylesheet" type="text/css" href="vendor/css/bootstrap.css "/>

    <!-- 图标 -->
    <link rel="stylesheet"type="text/css"  href="vendor/font-awesome/css/font-awesome.css"  />


    <!-- Theme CSS -->
    <link rel="stylesheet" type="text/css" href="css/theme.css" />

    <!-- Skin CSS (颜色)-->
    <link rel="stylesheet" href="css/default.css" />

    <!-- theme css -->
    <link rel="stylesheet" type="text/css" href="css/Bftheme.css">

    <title>教师工作量系统 | </title>

</head>

<body class="nav-md">
<div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col menu_fixed">
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
                                <a id="reviewer" tabindex="-1" class="swift-role">复核人</a>
                            </li>
                            <li role="presentation">
                                <a id="auditor" tabindex="-1" class="swift-role">审核人</a>
                            </li>
                            <li role="presentation">
                                <a id="manager" tabindex="-1" class="swift-role">管理员</a>
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
                                    <li id="ck1" class="jspToChange"><a><span>工作量复核</span></a></li>
                                    <li id="ck2" class="jspToChange"><a><span>复核记录</span></a></li>
                                </ul>
                            </li>

                            <li class="active"><a id="clickToggle2"><i class="fa fa-edit"></i> 申报 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li class="jspToChange"><a><span>审核人重置</span></a></li>
                                </ul>
                            </li>

                            <li class="active"><a id="clickToggle3"><i class="fa fa-desktop"></i> 查看 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">

                                    <li  class="jspToChange" ><a ><span>已完成工作量</span></a></li>


                                </ul>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>

            <!-- /sidebar menu -->


        </div>
        <!-- left_col-->

        <!-- top_nav -->
        <div class="top_nav">
            <div class="nav_menu">
                <nav>
                    <div class="nav toggle">
                        <a id="menu_toggle"><i class="fa fa-bars"></i></a>

                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="">
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="css/images/img.jpg" alt=""><span class="dropdown_name">John Doe</span>
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">

                                <li><a href="javascript:;">Help</a></li>
                                <li><a href="#"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                            </ul>
                        </li>
                        <li role="presentation" class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-envelope-o"></i>
                                <span class="badge bg-green">6</span>
                            </a>
                            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                                <li>
                                    <a href="#">
                                        <span class="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                                        <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                                        <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span></span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- page content -->
        <div class="right_col" role="main">
            <section class="panel panel-primary" >
            </section>
        </div>
    </div>

    <!-- /page content -->

    <!-- footer content -->
    <footer>
        <div>
            <p>电子科技大学 信息与软件工程学院 卓越工程师实验教育中心 (OSTEC@ISE)</p>
            <p>Outstanding Engineer Experimental Education Center, School of Information and Software Engineering, UESTC </p>
            <p>Copyright © 2014-2017 SynX Studio, All Rights Reserved<a href="#"></a></p>
        </div>
        <div class="clearfix"></div>
    </footer>
    <!-- /footer content -->

</div>

<!-- Vendor -->
<script language='javascript' src="vendor/js/jquery.js"></script>

<script language='javascript' src="vendor/js/jquery.browser.mobile.js"></script>
<script language='javascript' src="vendor/js/bootstrap.js"></script>
<!-- 收缩 -->
<script language='javascript' src="vendor/js/nanoscroller.js"></script>

<script language='javascript' src="vendor/js/modernizr.js"></script>
<!-- Theme Base, Components and Settings -->
<script language='javascript' src="js/theme.js"></script>

<!-- Theme Custom -->
<script language='javascript' src="js/theme.custom.js"></script>

<!-- Theme Initialization Files -->
<script language='javascript' src="js/theme.init.js"></script>

<!-- Theme Jquery -->
<script type="text/javascript" src="js/Bftheme_jquery.js"></script>

<script type="text/javascript" src="js/treenodeList.js"></script>

</body>
</html>