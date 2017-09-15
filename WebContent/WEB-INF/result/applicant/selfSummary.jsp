<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/24
  Time: 10:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>我的工作当量</a></li>
            <li class="active curentPage" id="selfSummary">工作当量汇总 </li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>

    </div>

    <div class="x_content">
        <div class="x_content" id="showsumitem" style="display: block;">

            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="sumTab" class="nav nav-tabs bar_tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#sumTerm" id="term-tab" role="tab" data-toggle="tab" aria-expanded="true">学期工作当量</a>
                    </li>
                    <li role="presentation"><a href="#sumYear" role="tab" id="year-tab" data-toggle="tab" aria-expanded="false">学年工作当量</a>
                    </li>

                </ul>
                <div id="mysumContent" class="tab-content">
                    <%--学期tab--%>
                    <div role="tabpanel" class="tab-pane fade active in" id="sumTerm" aria-labelledby="home-tab">

                            <div class="show-all-count"  style="background-color: #5ab1ef;margin-left: 190px">预期总工作当量：<span  class="totalWorkload "></span></div>
                            <div class="show-all-count"  style="background-color: #2ec7c9;">已通过工作当量：<span  class="checkedWorkload "></span></div>
                            <div class="show-all-count"  style="background-color: #ffb980;">待核定工作当量：<span  class="uncheckedWorkload "></span></div>

                        <div class="clearfix"></div>
                        <%--style="float: left; margin-right: 20px;"--%>
                        <%-- <div class="switch switch-success">
                             <div class="ios-switch on"><div class="on-background background-fill"></div><div class="state-background background-fill"></div><div class="handle"></div></div><input type="checkbox" name="switch" data-plugin-ios-switch="" checked="checked" style="display: none;">
                         </div>--%>
                        <%--学期饼图--%>
                        <div id="echart_pie" style="height:300px;border-bottom: 1px solid"></div>

                        <span><p style="text-align: center;padding-top:15px;font-weight: 700;font-size:18px">本学期教学工作当量一览表</p> <span style="float: right">
                        <span class="dropdown" id="changerole" style="float:right;padding-top: 13px;">
                            <button type="button" class="btn dropdown-toggle btn-primary" id="dropdownMenu1" data-toggle="dropdown" style="margin: 2px;padding: 1px;" aria-expanded="false">
                                切换方式
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation">
                                    <a id="all" tabindex="-1" class="swift-role">展示全部</a>
                                </li>
                                <li role="presentation">
                                    <a id="sort" tabindex="-1" class="swift-role">分类展示</a>
                                </li>
                            </ul>
                        </span>
                    </span>
                        </span>

                        <div class="sort" role="tabpanel" data-example-id="togglable-tabs" style="padding-top: 20px;">
                            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">审核通过(<span id="check_passed"></span>)</a>
                                </li>
                                <li role="presentation"><a href="#tab_content3" role="tab" id="import-tab" data-toggle="tab" aria-expanded="false">审核待定(<span id="check_no_passed"></span>)</a>
                                </li>
                                <li role="presentation" ><a href="#tab_content2" role="tab" id="history-tab" data-toggle="tab" aria-expanded="false">复核通过(<span id="rev_passed"></span>)</a>
                                </li>

                                <li role="presentation"><a href="#tab_content4" role="tab" id="apply-tab" data-toggle="tab" aria-expanded="false">复核待定(<span id="rev_no_passed"></span>)</a>
                                </li>
                            </ul>
                            <div id="myTabContent" class="tab-content">
                                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                    <table  class="table table-striped table-bordered dataTable no-footer" >
                                        <thead>
                                        <tr role="row">
                                            <th  class="sorting" >序号</th>
                                            <th class="sorting" >规则名称</th>
                                            <th class="sorting" >规则类别</th>
                                            <th class="sorting" >项目名称</th>
                                            <th class="sorting">工作当量</th>
                                            <th class="sorting" >项目状态</th>
                                            <th class="sorting">操作</th>

                                        </tr>
                                        </thead>
                                        <tbody class="sumCheckedItem">
                                        </tbody>
                                    </table>
                                </div>

                                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="history-tab">
                                    <table  class="table table-striped table-bordered dataTable no-footer" >
                                        <thead>
                                        <tr role="row">
                                            <th  class="sorting" >序号</th>
                                            <th class="sorting" >规则名称</th>
                                            <th class="sorting" >规则类别</th>
                                            <th class="sorting" >项目名称</th>
                                            <th class="sorting">工作当量</th>
                                            <th class="sorting" >项目状态</th>
                                            <th class="sorting">操作</th>

                                        </tr>
                                        </thead>
                                        <tbody class="sumrevieItem">
                                        </tbody>
                                    </table>

                                </div>
                                <div role="tabpanel" class="tab-pane fade " id="tab_content3" aria-labelledby="import-tab">
                                    <table  class="table table-striped table-bordered dataTable no-footer" >
                                        <thead>
                                        <tr role="row">
                                            <th  class="sorting" >序号</th>
                                            <th class="sorting" >规则名称</th>
                                            <th class="sorting" >规则类别</th>
                                            <th class="sorting" >项目名称</th>
                                            <th class="sorting">工作当量</th>
                                            <th class="sorting" >项目状态</th>
                                            <th class="sorting">操作</th>


                                        </tr>
                                        </thead>
                                        <tbody class="sumnorevieItem">
                                        </tbody>
                                    </table>
                                </div>
                                <div role="tabpanel" class="tab-pane fade " id="tab_content4" aria-labelledby="apply-tab">
                                    <table  class="table table-striped table-bordered dataTable no-footer" >
                                        <thead>
                                        <tr role="row">
                                            <th  class="sorting" >序号</th>
                                            <th class="sorting" >规则名称</th>
                                            <th class="sorting" >规则类别</th>
                                            <th class="sorting" >项目名称</th>
                                            <th class="sorting">工作当量</th>
                                            <th class="sorting" >项目状态</th>
                                            <th class="sorting">操作</th>

                                        </tr>
                                        </thead>
                                        <tbody class="sumnoItemSort">
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <table  class="table table-striped table-bordered dataTable no-footer all" style="display: none">
                            <thead>
                            <tr role="row">
                                <th  class="sorting" >序号</th>
                                <th class="sorting" >规则名称</th>
                                <th class="sorting" >规则类别</th>
                                <th class="sorting" >项目名称</th>
                                <th class="sorting">工作当量</th>
                                <th class="sorting" >项目状态</th>
                                <th class="sorting">操作</th>

                            </tr>
                            </thead>
                            <tbody class="sumall">
                            </tbody>
                        </table>
                    </div>
                    <%--学年tab--%>
                    <div role="tabpanel" class="tab-pane fade" id="sumYear" aria-labelledby="profile-tab">

                            <div class="show-all-count" style="background-color: #5ab1ef;margin-left: 190px">预期总工作当量：<span  class="year_totalWorkload "></span></div>
                            <div class="show-all-count" style="background-color: #2ec7c9;">已通过工作当量：<span  class="year_checkedWorkload "></span></div>
                            <div class="show-all-count" style="background-color: #ffb980;">待核定工作当量：<span  class="year_uncheckedWorkload "></span></div>
                            <div style="float: right"><select class="btn btn-primary" id="allyear_To_change"><option>学年选择</option></select></div>
                        <div class="clearfix"></div>
                        <%--学年饼图--%>
                        <div id="year_echart_pie" style="height:300px;margin-top: 20px"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%--查看详情--%>
<div class="modal fade" id="showdetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 600px;">
        <div class="modal-content">
            <div class="modal-header" style="position: relative">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="header" style="width:96%;float: left;">
                    <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class="current-page">工作当量汇总&nbsp;/&nbsp;查看详情</span></p>
                    <p class="project">
                        <span class="name" style="font-size: 20px;font-weight: 700;"></span>
                    </p>
                    <p class="message">

                    </p>
                </div>
            </div>
            <div class="modal-body">
                <table  class="table table-striped table-bordered dataTable no-footer">
                    <thead>
                    <tr role="row">

                        <th class="sorting">计算公式</th>
                        <th  class="sorting">计算参数</th>
                        <th class="sorting">项目属性</th>

                    </tr>
                    </thead>
                    <tbody class="revDetail">
                    </tbody>
                </table>

            </div>

        </div>
    </div>
</div>
