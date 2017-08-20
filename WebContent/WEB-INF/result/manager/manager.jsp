<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 17:47
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
    <meta name="keywords" content="HTML5 Admin Template" />
    <meta name="description" content="Porto Admin - Responsive HTML5 Template">
    <meta name="author" content="okler.net">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Web Fonts  -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">
    <title>教学工作量计算系统 | </title>

    <!-- Bootstrap -->
    <link href="${contextPath}/css/bootstrap.css" rel="stylesheet" type="text/css">
    <!-- Font Awesome -->
    <link href="${contextPath}/vendor/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <!-- bootstrap-progressbar -->
    <link href="${contextPath}/vendor/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" type="text/css" href="${contextPath}/css/bootstrap-timepicker.css" />

   <link rel="stylesheet" type="text/css" href="${contextPath}/vendor/bootstrap-datepicker/css/datepicker3.css" />
    <!-- Theme CSS -->
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/panel-content.css" />

   <%-- <link rel="stylesheet" type="text/css" href="${contextPath}/css/normalize.css" />--%>


    <!-- Skin CSS (颜色)-->
   <%-- <link rel="stylesheet" href="${contextPath}/css/default.css" />--%>

    <!-- ztree -->
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/zTreeStyle/zTreeStyle.css" type="text/css">

    <!-- Custom Theme Style -->
    <link href="${contextPath}/css/custom.css" rel="stylesheet">
    <style>

        .btn,.btn-primary{
            padding: 1px;
            font-size: 12px;
        }
        .ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position:-144px 0; vertical-align:top; *vertical-align:middle}
        .bs-example-modal-lg .modal-dialog {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

       .bs-example-modal-lg .modal-content {
            /*overflow-y: scroll; */
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }

       .bs-example-modal-lg .modal-body {
            overflow-y: scroll;
            position: absolute;
            top: 55px;
            bottom: 65px;
            width: 100%;
        }
       .bs-example-modal-lg .modal-header{
           position: absolute;

       }
        .bs-example-modal-lg .modal-footer {
            position: absolute;
            width: 100%;
            bottom: 0;
        }
    </style>
    <jsp:include page="path-variable.jsp"/>



</head>

<body class="nav-md">
<div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col">
        <div class="left_col scroll-view">

</div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
            <div class="nav_menu">
                <nav>
                    <div class="nav toggle">
                        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                    </div>

                    <ul class="nav navbar-nav navbar-right">
                        <li class="">
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">

                                <i class="fa fa-sign-out pull-right"></i><span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">

                                <li><a href="${contextPath}/auth/logout">退出系统</a></li>
                            </ul>
                        </li>

                                   <div class="col-md-4 col-sm-4 col-xs-12" style="margin-left:400px;width:160px">
                                       <select class="form-control" id="year">
                                         <%--  <option value="1">2017-2018</option>
                                           <option value="0">2016-2017</option>
                                           <option value="2">2018-2019</option>--%>
                                       </select>
                                   </div>
                        <div class="col-md-2 col-sm-2 col-xs-12" style="margin-left:0px;width: 80px;">
                            <select class="form-control" id="term">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div>
                            <a href="javascript:;" class="badge bg-green" id="itemChange">
                                <%--<i class="fa fa-envelope-o"></i>--%>
                                学期切换
                            </a>
                        </div>

                    </ul>
                </nav>
            </div>
        </div>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
            <div class="">
                <div class="clearfix"></div>

                <div class="right_hole">


                </div>
                <div class="clearfix"></div>


            </div>
        </div>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
            <div class="pull-right">
                <a href="https://colorlib.com"></a>
            </div>
            <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
    </div>
</div>

<div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
</div>
<div class="hiddendistrict" style="display: none;">

</div>

<!-- jQuery -->
<%--<script language='javascript' src="${contextPath}/vendor/js/jquery.js"></script>--%>
<script language='javascript' src="${contextPath}/js/jquery.min.js"></script>
<!-- Bootstrap -->
<script language='javascript' src="${contextPath}/js/bootstrap.min.js"></script>
<%--<script language='javascript' src="${contextPath}/vendor/js/bootstrap.js"></script>--%>

<!-- bootstrap-progressbar -->
<script src="${contextPath}/vendor/bootstrap-progressbar/js/bootstrap-progressbar.min.js"></script>

<!-- Custom Theme Scripts -->

<script src="${contextPath}/js/custom.min.js"></script>
<script src="${contextPath}/js/reviewRecord.js"></script>
<script src="${contextPath}/js/treenodeList.js"></script>
<script src="${contextPath}/js/reviewerSummary.js"></script>
<script src="${contextPath}/js/auditorChange.js"></script>
<script src="${contextPath}/js/common.js"></script>
<script src="${contextPath}/js/ajax-ztree.js"></script>
<script src="${contextPath}/js/Bftheme_jquery.js"></script>

<script language='javascript' src="${contextPath}/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script language='javascript' src="${contextPath}/vendor/js/datapicker.js"></script>

<script language='javascript'src="${contextPath}/js/jquery.ztree.core.js"></script>
<script language='javascript' src="${contextPath}/js/jquery.ztree.excheck.js"></script>
<script language='javascript' src="${contextPath}/js/jquery.ztree.exedit.js"></script>

</body>
</html>
