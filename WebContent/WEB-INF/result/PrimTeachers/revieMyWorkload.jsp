<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/9/5
  Time: 8:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>我的工作当量</a></li>
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

    <div class="col-md-4 col-sm-12 col-xs-12 form-group revContent">
    <span class="spanTitle">工作当量申报</span><hr/>
        <a type="button" class="btn btn-default" aria-label="Left Align" onclick="applyworkload()" style="border: 0px;margin-left: 10%">
            <span class="glyphicon glyphicon-edit" aria-hidden="true" style="color:#ffe746"></span>
        </a><%--<span class="glyphicon glyphicon-check" aria-hidden="true" onclick="applyworkload()"></span>--%>
        <span class="showrevieContent"><p style="margin-top: 40px">工作当量申报工作当量申报工作当量申报工作当量申报工作当量申报工作当量申报</p></span>
    </div>
        <div class="col-md-4 col-sm-12 col-xs-12 form-group revContent">
            <span class="spanTitle">工作当量复核</span><hr/>
            <a type="button" class="btn btn-default" aria-label="Left Align" onclick="workRevie()" style="border: 0px;margin-left: 10%">
            <span class="glyphicon glyphicon-check" aria-hidden="true" style="color:#1ABB9C "></span>
            </a>
                <span class="showrevieContent"><p style="margin-top: 40px">工作当量复核工作当量复核工作当量复核工作当量复核</p></span>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12 form-group revContent">
            <span class="spanTitle">工作当量汇总</span><hr/>
            <a type="button" class="btn btn-default" aria-label="Left Align"onclick="reviewerSumItem()" style="border: 0px;margin-left: 10%">
            <span class="glyphicon glyphicon-stats" aria-hidden="true" style="color: #337ab7;"></span>
            </a>
                <span class="showrevieContent"><p style="margin-top: 40px">工作当量汇总工作当量汇总工作当量汇总</p></span>
        </div>

        <div class="clearfix"></div>
    </div>
</div>
