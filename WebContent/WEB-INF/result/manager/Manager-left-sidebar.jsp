<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 18:17
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
       </div>

</div>

        <br />

        <!-- sidebar menu -->
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu" style="margin-top: 50px;">
            <div class="menu_section">
                <ul class="nav side-menu" style="margin-top: 0px;">
                    <li class="active firstToggleLi" ><a id="clickToggle1"><i class="fa fa-home"></i> 教务管理 <span class="fa fa-chevron-down"></span></a>
                        <ul class="nav child_menu "id='child_one_menu' style="display: block;">
                            <li class="ck1"><a onclick="jumpToAdd()">计算规则管理</a></li>
                            <%--<li><a onclick="jumpToSum()">类目统计</a></li>--%>
                            <li class="ck1"><a onclick="reset()">教师项目管理</a></li>
                            <li class="ck1"><a onclick="itemSummary()">工作当量统计</a></li>

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

