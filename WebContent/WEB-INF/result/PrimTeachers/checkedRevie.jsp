<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/9/5
  Time: 9:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>工作当量管理</a></li>
            <%--<li class="active curentPage" id="WorkloadApply">工作当量申报</li>--%>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
        <!-- <div class="clearfix"></div>-->
    </div>
    <div class="x_content">

        <div class="col-md-6 col-sm-12 col-xs-12 form-group revContent" style="margin-left: 20%;">
            <div class="spanTitle" style="margin-left: 30%;">工作当量导入</div><hr/>
            <a type="button" class="btn btn-default" aria-label="Left Align" onclick="importWorkload()" style="border: 0px;margin-left: 20%;margin-top: 20px">
                <span class="glyphicon glyphicon-import" aria-hidden="true" style="color:#ffe746"></span>
            </a><%--<span class="glyphicon glyphicon-check" aria-hidden="true" onclick="applyworkload()"></span>--%>
            <span class="showrevieContent"><p style="margin-top: 40px;padding-left: 20%;">工作当量导入工作当量导入工作当量导入工作当量导入</p></span>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 form-group revContent">
            <div class="spanTitle" style="margin-left: 30%;">工作当量审核</div><hr/>
            <a type="button" class="btn btn-default" aria-label="Left Align" onclick="auditworkload()" style="border: 0px;margin-left: 20%;margin-top: 20px">
                <span class="glyphicon glyphicon-saved" aria-hidden="true" style="color:#1ABB9C "></span>
            </a>
            <span class="showrevieContent"><p style="margin-top: 40px;padding-left: 20%;">工作当量审核工作当量审核工作当量审核工作当量审核</p></span>
        </div>

        <div class="clearfix"></div>
    </div>
</div>
