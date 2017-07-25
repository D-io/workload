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
    <!-- 日历 -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap-timepicker.css" />
    <link rel="stylesheet" type="text/css" href="css/datepicker3.css" />
    <!-- Theme CSS -->
    <link rel="stylesheet" type="text/css" href="css/panel-content.css" />

    <!-- Skin CSS (颜色)-->
    <link rel="stylesheet" href="css/default.css" />

    <!-- ztree -->
    <link rel="stylesheet" type="text/css" href="css/zTreeStyle/zTreeStyle.css" type="text/css">
    <style type="text/css">
        .ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position:-144px 0; vertical-align:top; *vertical-align:middle}
    </style>


    <!-- theme css -->
    <link rel="stylesheet" type="text/css" href="css/Bftheme.css">

    <title>教师工作量系统 | </title>

</head>

<body class="nav-md">
<div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col menu_fixed" id="left_col">
            <div class="left_col scroll-view">
                <div class="navbar nav_title">
                    <a href="#" class="site_title"><span><img src="css/images/logo.png" alt="..." class="left_span"></span><span class="right_span">教师工作量系统</span></a>

                </div>

                <div class="clearfix"></div>

                <!-- menu profile quick info -->

                <div class="profile clearfix">
                    <div class="profile_pic">

                    </div>
                    <div class="profile_info">
                        <span>欢迎,</span>
                        <h2>管理员</h2>
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
                            <li class="active"><a id="clickToggle1"><i class="fa fa-home"></i> 管理 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li class="ck1" onclick="jumpToAdd()"><a><span>条目管理</span></a></li>
                                </ul>
                            </li>

                            <li class="active"><a id="clickToggle2"><i class="fa fa-edit"></i> 重置 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">
                                    <li class="ck2" onclick="reset()"><a><span>审核人重置</span></a></li>
                                </ul>
                            </li>

                            <li class="active"><a id="clickToggle3"><i class="fa fa-desktop"></i> 统计 <span class="fa fa-chevron-down"></span></a>
                                <ul class="nav child_menu">

                                    <li  class="ck3" onclick="jumpToSum()"><a ><span>条目统计</span></a></li>
                                    <li  class="ck3" onclick="itemSummary()"><a ><span>工作量统计</span></a></li>

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
                                <span class="dropdown_name">John Doe</span>
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
            <section class="panel panel-primary" id="tree">
                <button id="addToTable" class="btn btn-primary"  data-target="#addModal">Add <i class="fa fa-plus"></i></button>
                <button id="submit" class="btn btn-primary">Submit</button>
                <header class="panel-heading">
                    <div class="panel-actions">
                        <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
                        <!--<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>-->
                    </div>
                    <h2 class="panel-title">教学工作当量计算方式：</h2>
                </header>

                <!-- Modal -->
                <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">添加信息</h4>
                            </div>
                            <div class="modal-body">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">条目名称</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="itemName" name ="name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label ">条目简介</label>
                                        <div class="col-sm-9">
                                            <textarea class="form-control" id="desc" rows="3" name="desc"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">条目类别</label>
                                        <div class="col-sm-9">
                                            <select class="form-control" id="importRequired" name="sorting">
                                                <option value="1">导入类</option>
                                                <option value="0">审核类</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">审核人</label>
                                        <div class="col-sm-9">
                                            <select class="form-control" id="teacherName">
                                            <option></option>

                                            </select>
                                        </div>
                                        <div id="prompt" style="width: 400px;padding-top: 40px;padding-left:100px;text-align: center"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">父条目</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="parentId" name="parentId">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">是否为叶子节点</label>
                                        <div class="col-sm-9">
                                            <input type="radio" class="isLeaf" name="hasChildNode" value="Y">是
                                            <input type="radio" class="isLeaf" name="hasChildNode"  value="N">否
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">申请截止时间</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                                <input type="text" data-plugin-datepicker class="form-control" id="applyDeadline">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">审核截止时间</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                                <input type="text" data-plugin-datepicker class="form-control" id="reviewDeadline">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">适用学期</label>
                                        <div class="col-sm-9">
                                            <select class="form-control" id="version">
                                                <option>2017-2018-1</option>
                                                <option>2017-2018-2</option>
                                                <option>2016-2017-1</option>
                                                <option>2016-2017-2</option>
                                                <option>2015-2016-1</option>
                                                <option>2015-2016-2</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">计算公式参数配置</label>
                                        <div class="col-sm-9">

                                            <a class="btn btn-primary" role="button" data-toggle="collapse" href="#parameter" aria-expanded="false" aria-controls="collapseExample">
                                                <i class="fa fa-plus"></i>
                                            </a>
                                            <div class="collapse" id="parameter">
                                                <div class="well">
                                                    <table class="table" id="parameterTable">
                                                        <thead>
                                                        <tr>

                                                            <th>参数名称</th>
                                                            <th>参数符号<span style="float: right;"><a class="btn btn-primary" id="addParameter"><i class="fa fa-plus"></i></a></span></th>


                                                        </tr>

                                                        </thead>
                                                        <tbody class="AddPramter">
                                                        <tr>

                                                            <td><input type="text" class="parameterName" name="parameterName"></td>
                                                            <td><input type="text" class="parameterSymbol" name="parameterSymbol"></td>

                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">计算公式</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="formula">
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" id="save">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="allTree">


                    <div class="panel-body">
                        <div class="zTreeDemoBackground left">
                            <ul id="treeDemo" class="ztree"></ul>
                        </div>

                    </div>

                </div>
            </section>
            <div class="x_panel">
                <div class="x_title">
                    <h2><i class="fa fa-bars"></i> Tabs <small>Float left</small></h2>
                    <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#">Settings 1</a>
                                </li>
                                <li><a href="#">Settings 2</a>
                                </li>
                            </ul>
                        </li>
                        <li><a class="close-link"><i class="fa fa-close"></i></a>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>
                <div class="x_content">


                    <div class="" role="tabpanel" data-example-id="togglable-tabs">
                        <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Home</a>
                            </li>
                            <li role="presentation" class=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">Profile</a>
                            </li>
                            <li role="presentation" class=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">Profile</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                                    synth. Cosby sweater eu banh mi, qui irure terr.</p>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo
                                    booth letterpress, commodo enim craft beer mlkshk aliquip</p>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">
                                <p>xxFood truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo
                                    booth letterpress, commodo enim craft beer mlkshk </p>
                            </div>
                        </div>
                    </div>

                </div>
                <fieldset>
                    <div class="control-group">
                        <div class="controls">
                            <div class="col-md-11 xdisplay_inputx form-group has-feedback">
                                <input type="text" class="form-control has-feedback-left" id="single_cal2" placeholder="First Name" aria-describedby="inputSuccess2Status2">
                                <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                                <span id="inputSuccess2Status2" class="sr-only">(success)</span>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

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
<!-- 日历 -->

<script language='javascript' src="vendor/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script language='javascript' src="vendor/js/modernizr.js"></script>
<!-- Theme Base, Components and Settings -->
<script language='javascript' src="js/theme.js"></script>

<!-- Theme Custom -->
<script language='javascript' src="js/theme.custom.js"></script>

<!-- Theme Initialization Files -->
<script language='javascript' src="js/theme.init.js"></script>

<!-- ztree-->

<script language='javascript'src="js/jquery.ztree.core.js"></script>

<script language='javascript' src="js/jquery.ztree.excheck.js"></script>

<script language='javascript' src="js/jquery.ztree.exedit.js"></script>

<!-- Examples (实现复选框)-->
<script language='javascript' src="js/ajax-ztree.js"></script>
<!-- Theme Jquery -->
<script type="text/javascript" src="js/Bftheme_jquery.js"></script>

<script type="text/javascript" src="js/treenodeList.js"></script>

<script type="text/javascript" src="js/changerole.js"></script>

<script type="text/javascript" src="js/reviewRecord.js"></script>

<script type="text/javascript" src="js/auditorChange.js"></script>

<script type="text/javascript" src="js/reviewerSummary.js"></script>
</body>
</html>