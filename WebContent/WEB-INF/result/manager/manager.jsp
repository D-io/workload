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
    <meta name="keywords" content="workload " />

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Web Fonts  -->
  <%--  <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">
 --%>   <title>教学工作当量计算系统 | </title>

    <!-- Bootstrap -->
    <link href="${contextPath}/css/bootstrap.css" rel="stylesheet" type="text/css">
    <!-- Font Awesome -->
    <link href="${contextPath}/vendor/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <!-- bootstrap-progressbar -->
    <link href="${contextPath}/vendor/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" type="text/css" href="${contextPath}/css/bootstrap-datetimepicker.css" />

    <link rel="stylesheet" type="text/css" href="${contextPath}/css/select2.min.css" />

    <!-- Theme CSS -->
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/panel-content.css" />

   <%-- <link rel="stylesheet" type="text/css" href="${contextPath}/css/datatables.css" />--%>

   <%-- <link rel="stylesheet" type="text/css" href="${contextPath}/css/normalize.css" />--%>


    <!-- Skin CSS (颜色)-->
   <%-- <link rel="stylesheet" href="${contextPath}/css/default.css" />--%>

    <!-- ztree -->
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/zTreeStyle/zTreeStyle.css" type="text/css">

    <!-- Custom Theme Style -->
    <link href="${contextPath}/css/custom.css" rel="stylesheet">
    <style>

        .btn,.btn-primary{
            padding: 2px;
            font-size: 12px;
        }
        .ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position:-144px 0; vertical-align:top; *vertical-align:middle}
        .ztree li span.button.icon02_ico_docu{margin-right:2px; background: url(${contextPath}/css/images/newChecked.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
        .ztree li span.button.icon06_ico_docu{margin-right:2px; background: url(${contextPath}/css/images/newImport.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
        .ztree li span.button.icon04_ico_docu{margin-right:2px; background: url(${contextPath}/css/images/childNode.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
        .ztree li span.button.icon04_ico_open{margin-right:2px; background: url(${contextPath}/css/images/childNode.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}

        table.table thead .teacher_Sort { background: url(${contextPath}/css/images/sort_both.png) no-repeat center right; }
        table.table thead .sorting_asc { background: url(${contextPath}/css/images/sort_asc.png) no-repeat center right; }
        table.table thead .sorting_desc { background: url(${contextPath}/css/images/sort_desc.png) no-repeat center right; }
        table.table thead .sorting_asc_disabled { background: url(${contextPath}/css/images/sort_asc_disabled.png) no-repeat center right; }
        table.table thead .sorting_desc_disabled { background: url(${contextPath}/css/images/sort_desc_disabled.png) no-repeat center right;}
        .bs-example-modal-lg .modal-dialog {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

       .bs-example-modal-lg .modal-content {
            /*overflow-y: auto;*/
           height: 626px;
            width: 100%;
        }

       .bs-example-modal-lg .modal-body {
            overflow-y: auto;
            max-height: 430px;
            width: 100%;
        }
       .bs-example-modal-lg .modal-header{


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
                    <div class="nav toggle" style="float: left;">
                        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                    </div>
                    <%--<span style="float: left">
                    <img src="<%=request.getContextPath()%>/css/images/logo+xueyuan-workload.png" alt="..." class="left_span" style="width: 210px;margin-top: 6px;margin-right: 30px;">
                </span>--%>
                    <div class="showZhContent" style="float: left"><h4>教学工作当量计算系统</h4></div>



                    <ul class="nav navbar-nav navbar-right">
                        <li class="">
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false" style="padding: 8px 18px 0px 12px">

                                <span class="userName"></span><span class=" fa fa-angle-down" style="margin-right: 10px"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">
                                <li><a href="">个人信息</a></li>
                                <li><a href="">查看帮助</a></li>
                                <li><a href="${contextPath}/auth/logout">退出系统</a></li>
                            </ul>
                        </li>
                       <%-- <div style="float: right;padding-top: 15px;padding-left: 10px;">
                            <span>欢迎,</span>

                        </div>--%>
<%--<li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="images/img.jpg" alt="">John Doe
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="javascript:;"> Profile</a></li>
                    <li>
                      <a href="javascript:;">
                        <span class="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                      </a>
                    </li>
                    <li><a href="javascript:;">Help</a></li>
                    <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>--%>
                        <div style="float: right;padding-top: 10px;">
                            <a href="javascript:;" class="badge bg-green" id="itemChange">
                                <%--<i class="fa fa-envelope-o"></i>--%>
                                学期切换
                            </a>
                        </div>

                        <div class="col-md-2 col-sm-2 col-xs-12" style="float:right;width: 80px;padding-top: 10px;">
                            <select class="form-control" id="term">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12 showcalendar" style="float:right;width:160px;padding-top: 10px;">
                            <input class="form-control" id="year" readonly="true" style="background-color: #fff">
                            <div class="calendar-bar" style="display: none">
                                <table>
                                    <tbody class="calendar-tbody">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="dropdown" id="changerole"  style="float:right;padding-top: 13px;">
                            <button type="button" class="btn dropdown-toggle btn-primary" id="dropdownMenu1"
                                    data-toggle="dropdown" style="margin: 2px;padding: 1px;">
                                切换角色
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation">
                                    <a id="manager" tabindex="-1" class="swift-role">教务管理</a>
                                </li>
                                <li role="presentation">
                                    <a id="teachers" tabindex="-1" class="swift-role">学院教师</a>
                                </li>
                            </ul>
                        </div>

                        <div style="clear: both;"></div>

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
           <div style="text-align: center">电子科技大学信息与软件工程学院卓越工程师实验教育中心（OSTEC@ISE）</div>
            <div style="text-align: center">Copyright © 2014-2017 SynX Studio, All Rights Reserved</div>
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
<div class="hiddenstrict1" style="display: none">

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

<script src="${contextPath}/js/custom_test.js"></script>
<script src="${contextPath}/js/reviewRecord.js"></script>
<script src="${contextPath}/js/reviewerSummary.js"></script>
<script src="${contextPath}/js/auditorChange.js"></script>
<script src="${contextPath}/js/common.js"></script>
<script src="${contextPath}/js/ajax-ztree.js"></script>
<script src="${contextPath}/js/Bftheme_jquery.js"></script>


<script language='javascript' src="${contextPath}/vendor/bootstrap-datepicker/js/bootstrap-datetimepicker.js"></script>
<script language='javascript' src="${contextPath}/vendor/js/select2.min.js"></script>
<script language='javascript' src="${contextPath}/vendor/js/jquery-datatables/jquery.dataTables.min.js"></script>
<script language='javascript'src="${contextPath}/js/jquery.ztree.core.js"></script>
<script language='javascript' src="${contextPath}/js/jquery.ztree.excheck.js"></script>
<script language='javascript' src="${contextPath}/js/jquery.ztree.exedit.js"></script>

</body>
</html>
