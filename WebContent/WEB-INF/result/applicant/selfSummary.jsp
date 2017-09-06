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
            <li class="active curentPage" id="selfSummary">个人工作量汇总 </li>
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

            <div>
                <h4 style="float: left; margin-right: 20px;">已通过工作当量：<span  class="checkedWorkload passed"></span></h4>
                <h4 style="float: left; margin-right: 20px;">待审核（复核）工作当量：<span  class="uncheckedWorkload pending-audit"></span></h4>
                <h4 style="float: left">预期总工作当量：<span  class="totalWorkload expected"></span></h4>
            </div>
           <%-- <div class="switch switch-success">
                <div class="ios-switch on"><div class="on-background background-fill"></div><div class="state-background background-fill"></div><div class="handle"></div></div><input type="checkbox" name="switch" data-plugin-ios-switch="" checked="checked" style="display: none;">
            </div>--%>
            <div class="clearfix"></div>
            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">审核通过</a>
                    </li>
                    <%-- <li role="presentation" onclick="jumpToSum()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">计算规则预览</a>
                     </li>--%>
                    <li role="presentation" ><a href="#tab_content2" role="tab" id="history-tab" data-toggle="tab" aria-expanded="false">复核通过</a>
                </li>
                    <li role="presentation"><a href="#tab_content3" role="tab" id="import-tab" data-toggle="tab" aria-expanded="false">待审核通过</a>
                    </li>
                    <li role="presentation"><a href="#tab_content4" role="tab" id="apply-tab" data-toggle="tab" aria-expanded="false">待复核通过</a>
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

           <%-- <div class="accordion" id="accordion" role="tablist" aria-multiselectable="true" style="margin-top:40px ">
                <div class="panel">
                    <a class="panel-heading collapsed" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <h4 class="panel-title">总工作当量汇总</h4>
                    </a>
                    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="height: 0px;">
                        <div class="panel-body">
                            <div class="col-xs-3">
                                <!-- required for floating -->
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs tabs-left">
                                    <li class=""><a href="#home" data-toggle="tab" aria-expanded="false" style="
    /* width: 20px; */
">导入复核类</a>
                                    </li>
                                    <li class=""><a href="#profile" data-toggle="tab" aria-expanded="false">申报审核类</a>
                                    </li>

                                </ul>
                            </div>
                            <div class="col-xs-9">
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane" id="home">
                                        <table  class="table table-striped table-bordered dataTable no-footer" >
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting" >序号</th>
                                                <th class="sorting" >规则名称</th>
                                                <th class="sorting" >项目名称</th>
                                                <th class="sorting" >项目类别</th>
                                                <th class="sorting" >条目名称</th>
                                                <th class="sorting">计算公式</th>
                                                <th class="sorting">公式描述</th>
                                                <th  class="sorting">其他参数</th>
                                                <th class="sorting">工作当量</th>
                                                <th class="sorting">状态</th>

                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane" id="profile">
                                        <table  class="table table-striped table-bordered dataTable no-footer" >
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting" >序号</th>
                                                <th class="sorting" >规则名称</th>
                                                <th class="sorting" >项目名称</th>
                                                <th class="sorting" >项目类别</th>
                                                <th class="sorting" >条目名称</th>
                                                <th class="sorting">计算公式</th>
                                                <th class="sorting">公式描述</th>
                                                <th  class="sorting">其他参数</th>
                                                <th class="sorting">工作当量</th>
                                                <th class="sorting">状态</th>

                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <a class="panel-heading collapsed" role="tab" id="headingTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <h4 class="panel-title">审核(复核)通过工作当量</h4>
                    </a>
                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" aria-expanded="false" style="height: 0px;">
                        <div class="panel-body">
                            <div class="col-xs-3">
                                <!-- required for floating -->
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs tabs-left">
                                    <li class=""><a href="#message" data-toggle="tab" aria-expanded="false" style="
    /* width: 20px; */
">导入复核类</a>
                                    </li>
                                    <li class=""><a href="#setting" data-toggle="tab" aria-expanded="false">申报审核类</a>
                                    </li>

                                </ul>
                            </div>
                            <div class="col-xs-9">
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane" id="message">
                                        <table  class="table table-striped table-bordered dataTable no-footer" >
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting" >序号</th>
                                                <th class="sorting" >规则名称</th>
                                                <th class="sorting" >项目名称</th>
                                                <th class="sorting" >项目类别</th>
                                                <th class="sorting" >条目名称</th>
                                                <th class="sorting">计算公式</th>
                                                <th class="sorting">公式描述</th>
                                                <th  class="sorting">其他参数</th>
                                                <th class="sorting">工作当量</th>
                                                <th class="sorting">状态</th>

                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane" id="setting">
                                        <table  class="table table-striped table-bordered dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting" >序号</th>
                                                <th class="sorting" >规则名称</th>
                                                <th class="sorting" >项目名称</th>
                                                <th class="sorting" >项目类别</th>
                                                <th class="sorting" >条目名称</th>
                                                <th class="sorting">计算公式</th>
                                                <th class="sorting">公式描述</th>
                                                <th  class="sorting">其他参数</th>
                                                <th class="sorting">工作当量</th>
                                                <th class="sorting">状态</th>

                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <a class="panel-heading collapsed" role="tab" id="headingThree" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <h4 class="panel-title">有待审核(复核)工作当量</h4>
                    </a>
                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree" aria-expanded="false">
                        <div class="panel-body">
                            <div class="col-xs-3">
                                <!-- required for floating -->
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs tabs-left">
                                    <li class=""><a href="#collapse_import" data-toggle="tab" aria-expanded="false" style="
    /* width: 20px; */
">导入复核类</a>
                                    </li>
                                    <li class=""><a href="#collapse_checked" data-toggle="tab" aria-expanded="false">申报审核类</a>
                                    </li>

                                </ul>
                            </div>
                            <div class="col-xs-9">
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane" id="collapse_import">
                                        <table  class="table table-striped table-bordered dataTable no-footer" >
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting" >序号</th>
                                                <th class="sorting" >规则名称</th>
                                                <th class="sorting" >项目名称</th>
                                                <th class="sorting" >项目类别</th>
                                                <th class="sorting" >条目名称</th>
                                                <th class="sorting">计算公式</th>
                                                <th class="sorting">公式描述</th>
                                                <th  class="sorting">其他参数</th>
                                                <th class="sorting">工作当量</th>
                                                <th class="sorting">状态</th>

                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane" id="collapse_checked">
                                        <table  class="table table-striped table-bordered dataTable no-footer" >
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting" >序号</th>
                                                <th class="sorting" >规则名称</th>
                                                <th class="sorting" >项目名称</th>
                                                <th class="sorting" >项目类别</th>
                                                <th class="sorting" >条目名称</th>
                                                <th class="sorting">计算公式</th>
                                                <th class="sorting">公式描述</th>
                                                <th  class="sorting">其他参数</th>
                                                <th class="sorting">工作当量</th>
                                                <th class="sorting">状态</th>

                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>--%>
           <%-- <table  class="table table-striped table-bordered dataTable no-footer" style="font-size: 14px;">
                <thead>
                <tr role="row">
                    <th  class="sorting" >序号</th>
                    <th class="sorting" >条目名称</th>
                    <th class="sorting" >所属类目</th>
                    <th  class="sorting">工作量</th>
                    <th class="sorting">主要参数</th>
                    <th class="sorting">其他参数</th>
                    <th class="sorting">形式</th>
                    <th class="sorting">版本</th>

                </tr>
                </thead>
                <tbody class="sumItemSort">
                </tbody>
            </table>--%>

        </div>
    </div>
</div>
<div class="modal fade" id="showdetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="header">
                    <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class="current-page">工作当量汇总</span></p>
                    <p class="project"></p>
                    <p class="message"></p>
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
