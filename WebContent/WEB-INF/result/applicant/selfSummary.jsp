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
            <li><a href="#"><i class="fa fa-bars"></i>我的工作当量</a></li>
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
                <h4 style="float: left">总工作当量：<span  class="totalWorkload"></span></h4>
                <h4 style="float: left">已通过工作当量：<span  class="totalWorkload"></span></h4>
                <h4 style="float: left">待通过工作当量：<span  class="totalWorkload"></span></h4>
            </div>
            <span style="float: right;">
           <%-- <button class="btn btn-success pull-right Toexcellowner"><i class="fa fa-download"></i> 导出</button>
        --%>
            </span>
            <div class="accordion" id="accordion" role="tablist" aria-multiselectable="true" style="margin-top:40px ">
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
            </div>
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
