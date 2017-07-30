<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/25
  Time: 19:07
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
    <link href="vendor/css/bootstrap.css" rel="stylesheet" type="text/css">
    <!-- Font Awesome -->
    <link href="vendor/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <!-- bootstrap-progressbar -->
    <link href="vendor/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.css" rel="stylesheet" type="text/css">

    <!-- Custom Theme Style -->
    <link href="css/custom.css" rel="stylesheet">
    <style>

        .btn,.btn-primary{
            padding: 1px;
            font-size: 12px;
        }

    </style>
</head>

<body class="nav-md">
<div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
                <div class="navbar nav_title" style="border: 0;">
                    <a class="site_title" ><span><img src="css/images/logo.png" alt="..." class="left_span" ></span><span style="font-size: 14px;">教学工作当量计算系统</span></a>
                </div>

                <div class="clearfix"></div>

                <!-- menu profile quick info -->
                <div class="profile clearfix">
                    <div class="profile_pic">
                        <div class="dropdown" id="changerole" >
                            <button type="button" class="btn dropdown-toggle" id="dropdownMenu1"
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
                    </div>
                    <div class="profile_info">
                        <span>欢迎,</span>
                        <h2>学院教师</h2>
                    </div>
                </div>
                <!-- /menu profile quick info -->

                <br />

                <!-- sidebar menu -->
                <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                    <div class="menu_section">
                        <ul class="nav side-menu" style="margin-top: 0px;">
                            <li class="active"><a><i class="fa fa-home"></i> 我的工作当量 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu" style="display: block;">
                                    <li><a onclick="applyworkload()">工作当量申报</a></li>
                                    <li><a onclick="workRevie()">工作当量复核</a></li>
                                    <li><a onclick="reviewerSumItem()">工作当量汇总</a></li>
                                </ul>
                            </li>
                            <li class="active"><a><i class="fa fa-edit"></i> 工作当量管理 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu" style="display: block;">
                                    <li onclick="importWorkload()"><a>工作当量导入</a></li>
                                    <li onclick="auditworkload()"><a>工作当量审核</a></li>
                                </ul>
                            </li>
                            <li class="active"><a><i class="fa fa-desktop"></i> 工作当量统计<span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu" style="display: block">
                                    <li><a>  </a></li>
                                    <li><a>  </a></li>

                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>
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

                        <li role="presentation" class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-envelope-o"></i>
                                <span class="badge bg-green">6</span>
                            </a>
                            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                                <li>
                                    <a>
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
                            </ul>
                        </li>
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

                        <div class="x_panel" style="width: 100%;padding: 10px 17px;">
                            <div class="x_title">
                                <h2><i class="fa fa-bars"></i> 工作量复核 </h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                    </li>
                                    <li><a class="close-link"><i class="fa fa-close"></i></a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">


                                <div class="" role="tabpanel" data-example-id="togglable-tabs">
                                    <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                                        <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">待复核</a>
                                        </li>
                                        <li role="presentation" class=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">尚存疑</a>
                                        </li>
                                        <li role="presentation" class=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">已通过</a>
                                        </li>
                                    </ul>
                                    <div id="myTabContent" class="tab-content">
                                        <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                                        </div>
                                        <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                                        </div>
                                        <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    <div class="clearfix"></div>


            <div class="modal fade" id="refuModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 class="modal-title" >
                                备注信息
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info">


                                            <div class="form-group">
                                                <label class="col-sm-3 control-label ">存疑说明</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control" id="refusedesc" rows="3" name="desc"></textarea>
                                                </div>
                                            </div>

                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary commit">提交</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>


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



<!-- jQuery -->
<script language='javascript' src="vendor/js/jquery.js"></script>
<!-- Bootstrap -->
<script language='javascript' src="vendor/js/bootstrap.js"></script>
<!-- bootstrap-progressbar -->
<script src="vendor/bootstrap-progressbar/js/bootstrap-progressbar.min.js"></script>
<!-- Custom Theme Scripts -->

<script src="vendor/js/custom.js"></script>
<script src="js/reviewRecord.js"></script>
<script src="js/treenodeList.js"></script>
<script src="js/reviewerSummary.js"></script>
<script src="js/auditorChange.js"></script>
<script language='javascript'src="js/jquery.ztree.core.js"></script>
<script language='javascript' src="js/jquery.ztree.excheck.js"></script>
<script language='javascript' src="js/jquery.ztree.exedit.js"></script>

</body>
</html>
