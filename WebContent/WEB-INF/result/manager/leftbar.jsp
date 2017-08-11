<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 13:56
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

    <title>教学工作量计算系统 | </title>

    <!-- Bootstrap -->
    <link href="${contextPath}/css/bootstrap.css" rel="stylesheet" type="text/css">
    <!-- Font Awesome -->
    <link href="${contextPath}/vendor/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <!-- bootstrap-progressbar -->
    <link href="${contextPath}/vendor/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.css" rel="stylesheet" type="text/css">
    <!--PNotify-->
    <link href="${contextPath}/css/PNotify/pnotify.buttons.css" rel="stylesheet" type="text/css">
    <link href="${contextPath}/css/PNotify/pnotify.nonblock.css" rel="stylesheet" type="text/css">
    <link href="${contextPath}/css/PNotify/pnotify.css" rel="stylesheet" type="text/css">

    <!-- Custom Theme Style -->
    <link href="${contextPath}/css/custom.css" rel="stylesheet">
    <style>

        .btn,.btn-primary{
            padding: 1px;
            font-size: 12px;
        }

    </style>
    <jsp:include page="path-variable.jsp"/>
</head>

<body class="nav-md">
<div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col">
            <div class="left_col scroll-view">

                <!-- /sidebar menu -->

                <!-- /menu footer buttons -->
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
                                John Doe
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">

                                <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i>退出系统</a></li>
                            </ul>
                        </li>

                        <%--       <div>
                                   <label>学年学期</label>
                                   <div class="col-md-6 col-sm-6 col-xs-12" style="padding: 13px 15px 12px; float: right;">
                                       <select class="form-control" id="isGroup">
                                           <option value="1">2016-2017-1</option>
                                           <option value="0">2016-2017-2</option>
                                           <option value="0">2017-2018-1</option>
                                           <option value="0">2017-2018-2</option>
                                       </select>
                                   </div>
                               </div>--%>
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
                <!--
                      <div class="hiddendistrict">
                          <table>
                              <thead>
                              <tr>

                                  <th>json_parameters</th>
                                  <th>other_parameters</th>
                              </tr>
                              </thead>
                              <tbody class="hidestr">

                              </tbody>
                          </table>
                      </div>
                      -->

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
    <table>
        <thead>
        <tr><th>itemName</th><th>itemDesc</th><th>isGroup</th><th>mainPara</th><th>otherPara</th><th>groupManager</th><th>groupMember</th><th>groupDesc</th><th>groupWeight</th></tr>
        </thead>
        <tbody class="addTbody">

        </tbody>
    </table>
</div>

<!-- jQuery -->
<script language='javascript' src="${contextPath}/vendor/js/jquery.js"></script>
<!-- Bootstrap -->
<script language='javascript' src="${contextPath}/vendor/js/bootstrap.js"></script>
<!-- bootstrap-progressbar -->
<script src="${contextPath}/vendor/bootstrap-progressbar/js/bootstrap-progressbar.min.js"></script>
<!--PNotify-->
<script src="${contextPath}/vendor/PNotify/pnotify.buttons.js"></script>
<script src="${contextPath}/vendor/PNotify/pnotify.nonblock.js"></script>
<script src="${contextPath}/vendor/PNotify/pnotify.js"></script>
<!-- Custom Theme Scripts -->

<script src="${contextPath}/vendor/js/custom.js"></script>
<script src="${contextPath}/js/reviewRecord.js"></script>
<script src="${contextPath}/js/treenodeList.js"></script>
<script src="${contextPath}/js/reviewerSummary.js"></script>
<script src="${contextPath}/js/auditorChange.js"></script>
<script language='javascript'src="${contextPath}/js/jquery.ztree.core.js"></script>
<script language='javascript' src="${contextPath}/js/jquery.ztree.excheck.js"></script>
<script language='javascript' src="${contextPath}/js/jquery.ztree.exedit.js"></script>

</body>
</html>

