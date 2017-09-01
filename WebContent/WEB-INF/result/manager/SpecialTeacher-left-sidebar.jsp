<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 18:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

        <div class="navbar nav_title" style="border: 0;">
            <div class="profile_pic">
                <span>
                    <img src="<%=request.getContextPath()%>/css/images/img.png" alt="..." class="img-circle profile_img">
                </span>
            </div>
            <div class="profile_info" style="padding-top: 17px;">
                <span style="font-size: 14px;">欢迎,</span>
                <span class="userTeacher" style="font-size: 14px;"></span>
            </div>   </div>

        <%--<div class="clearfix"></div>--%>

        <!-- menu profile quick info -->
       <%-- <div class="profile clearfix">
            <div class="profile_pic" style="padding: 25px 0px;">
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
                <h2 class="userName">学院教师</h2>
            </div>
        </div>--%>
        <!-- /menu profile quick info -->

        <br />

        <!-- sidebar menu -->
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu" style="margin-top: 50px;">
            <div class="menu_section">
                <ul class="nav side-menu" style="margin-top: 0px;">
                    <li class="active secondToggleLi"><a id="clickToggle1"><i class="fa fa-home"></i> 我的工作当量 <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu" id='child_two_menu' style="display: block;">
                            <li class="ck1"><a onclick="applyworkload()">工作当量申报</a></li>
                            <li class="ck1"><a onclick="workRevie()">工作当量复核</a></li>
                            <li class="ck1"><a onclick="reviewerSumItem()">工作当量汇总</a></li>
                        </ul>
                    </li>
                    <li class="active thirdToggleLi"><a id="clickToggle2"><i class="fa fa-edit"></i> 工作当量管理 <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu"id='child_third_menu' style="display: block;">
                            <li class="ck2"><a onclick="importWorkload()">工作当量导入</a></li>
                            <li class="ck2"><a onclick="auditworkload()">工作当量审核</a></li>
                        </ul>
                    </li>
                    <li class="active fourthToggleLi"><a id="clickToggle3"><i class="fa fa-desktop"></i> 工作当量统计<span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu"id='child_fourth_menu' style="display: block">
                            <li class="ck3"><a>  </a></li>
                            <li class="ck3"><a>  </a></li>

                        </ul>
                    </li>
                </ul>
            </div>

        </div>
        <!-- /sidebar menu -->
<div class="sidebar-footer hidden-small">
     <span>
                    <img src="<%=request.getContextPath()%>/css/images/workloadlogo.png" alt="..." class="left_span bottomImg">
                </span>
</div>
        <!-- /menu footer buttons -->


