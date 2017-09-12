<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 23:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

    <div class="navbar nav_title" style="border: 0;">
        <div class="profile_pic">
                <span>
                    <img src="<%=request.getContextPath()%>/css/images/img.png" alt="..." class="img-circle profile_img">
                </span>
        </div>
        <div class="profile_info">
            <span style="font-size: 14px;">欢迎,</span>
            <span class="userTeacher" style="font-size: 14px;"></span>
        </div>   </div>

    <br />

    <!-- sidebar menu -->
    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu" style="margin-top: 50px">
        <div class="menu_section">
            <ul class="nav side-menu" style="margin-top: 0px;">

                <li class="active"><a id="clickToggle2" onclick="checkedRevie()"><i class="fa fa-edit"></i> 工作当量管理 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu" style="display: block;">
                        <li class="ck2"><a  onclick="importWorkload()">工作当量导入</a></li>
                        <li class="ck2"><a onclick="auditworkload()">工作当量审核</a></li>
                    </ul>
                </li>

            </ul>
        </div>

    </div>
    <!-- /sidebar menu -->
<div class="sidebar-footer hidden-small">
     <span>
                    <img src="<%=request.getContextPath()%>/css/images/workloadlogo.png" alt="..." class="left_span bottomImg" >
                </span>
</div>
    <!-- /menu footer buttons -->

