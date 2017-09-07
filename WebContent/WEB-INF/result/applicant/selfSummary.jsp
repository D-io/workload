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
      <%--  <h4>总工作量：</h4><span class="totalWorkload"></span>--%>
      <!--  <div class="clearfix"></div>-->
    </div>

    <div class="x_content">
        <div class="x_content" id="showsumitem" style="display: block;">

            <div style="float: left">
                <h4 style="font-size: 13px;">已通过工作当量：<span  class="checkedWorkload passed"></span></h4>
                <h4 style="font-size: 13px;">待核定工作当量：<span  class="uncheckedWorkload pending-audit"></span></h4>
                <h4 style="font-size: 13px;">预期总工作当量：<span  class="totalWorkload expected"></span></h4>
            </div>
            <div style="float: right">
                <div class="dropdown" id="changerole" style="float:right;padding-top: 13px;">
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
                </div>
            </div>
            <div class="clearfix"></div>
            <%--style="float: left; margin-right: 20px;"--%>
           <%-- <div class="switch switch-success">
                <div class="ios-switch on"><div class="on-background background-fill"></div><div class="state-background background-fill"></div><div class="handle"></div></div><input type="checkbox" name="switch" data-plugin-ios-switch="" checked="checked" style="display: none;">
            </div>--%>
            <div id="echart_pie" style="height:350px;"></div>
           <%-- <div class="clearfix"></div>--%>
            <div class="sort" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">审核通过(<span id="check_passed"></span>)</a>
                    </li>
                    <li role="presentation"><a href="#tab_content3" role="tab" id="import-tab" data-toggle="tab" aria-expanded="false">审核待定(<span id="check_no_passed"></span>)</a>
                    </li>
                    <%-- <li role="presentation" onclick="jumpToSum()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">计算规则预览</a>
                     </li>--%>
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

                             <%--   <th class="sorting">计算公式</th>
                                <th class="sorting">公式描述</th>
                                <th  class="sorting">其他参数</th>--%>
                                <th class="sorting">工作当量</th>
                                <th class="sorting" >项目状态</th>
                                <th class="sorting">操作</th>

                            </tr>
                            </thead>
                            <tbody class="sumCheckedItem">
                            </tbody>
                        </table>
                    </div>
                    <%--<div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                    </div>--%>
                    <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="history-tab">
                        <table  class="table table-striped table-bordered dataTable no-footer" >
                            <thead>
                            <tr role="row">
                                <th  class="sorting" >序号</th>
                                <th class="sorting" >规则名称</th>
                                <th class="sorting" >规则类别</th>
                                <th class="sorting" >项目名称</th>

                                <%--   <th class="sorting">计算公式</th>
                                   <th class="sorting">公式描述</th>
                                   <th  class="sorting">其他参数</th>--%>
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

                                <%--   <th class="sorting">计算公式</th>
                                   <th class="sorting">公式描述</th>
                                   <th  class="sorting">其他参数</th>--%>
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

                                <%--   <th class="sorting">计算公式</th>
                                   <th class="sorting">公式描述</th>
                                   <th  class="sorting">其他参数</th>--%>
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
    </div>
</div>
<div class="modal fade" id="showdetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" style="width:96%;float: left;">
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
            <%--   <div class="modal-footer">
                   <button type="button" class="btn btn-primary " data-dismiss="modal" id="cancel">取消</button>
                   <button type="button" class="btn btn-primary" id="save">保存</button>
                   <button class="btn btn-primary manageEdit" style="display: none;">编辑</button>
                   <button class="btn btn-primary submitEdit" style="display: none;">提交</button>
               </div>--%>
        </div>
    </div>
</div>
