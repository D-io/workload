<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/27
  Time: 10:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>我的工作当量</a></li>
            <li class="active curentPage"id="WorkloadRevie">工作当量复核</li>
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


        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">工作当量复核</a>
                </li>
                <li role="presentation"><a href="#tab_content2" id="history-tab" role="tab" data-toggle="tab" aria-expanded="false" onclick="reviewerRec()">导入复核情况</a>
                </li>
                <li role="presentation"><a href="#tab_content3" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false" onclick="showRevieHistory()">查看操作日志</a>
                </li>

            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="history-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec" style="display: none;font-size: 14px;">
                        <thead>
                        <tr role="row">
                            <th class="sorting">序号</th>
                            <th class="sorting">条目名称</th>
                            <th class="sorting">工作量</th>
                            <th class="sorting">计算公式</th>
                            <th class="sorting">形式</th>
                            <th class="sorting">主要参数</th>
                            <th class="sorting">参数描述</th>
                            <th class="sorting">其他参数</th>
                            <th class="sorting">版本</th>
                            <th class="sorting">复核截止时间 </th>
                            <th class="sorting">复核状态 </th>
                            <th class="sorting">操作</th>
                        </tr>
                        </thead>
                        <tbody class="reviewerRecTbody">
                        </tbody>
                    </table>

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec">
                        <thead>
                        <tr role="row">
                            <th class="sorting" width="31px;">序号</th>
                            <th class="sorting" width="131px">操作时间</th>
                            <th class="sorting" width="60px;">操作人员</th>
                            <th class="sorting">操作内容</th>

                          <%--  <th class="sorting">操作形式</th>--%>

                        </tr>
                        </thead>
                        <tbody class="historyRecTbody">
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="importModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"></h4>
                    </div>
                    <div class="modal-body">
                        <%--<button class="add btn btn-primary" data-toggle="modal" data-target="#myModal">上传文件</button>
                        <div class="applymodalbody" style="height: 60%;">
                           &lt;%&ndash; <table class="showImportThead table dataTable no-footer table-bordered" style="display: none;">
                                <thead style="font-size: 14px;">
                                <tr role="row">
                                    <th>序号</th><th>文件名称</th><th>上传时间</th><th>提交状态</th><th>操作</th>
                                </tr>
                                </thead>
                                <tbody class="showImportDesc"></tbody>
                            </table>&ndash;%&gt;--%>
                        <div class="applymodalbody">
                            <%--<table class="showImportTable table dataTable no-footer table-bordered" style="display: none;">
                                <thead style="font-size: 14px;">
                                <tr role="row">
                                    <th>序号</th><th>条目名称</th><th>所属人</th><th>主要参数</th><th>其他参数</th><th>条目类别</th><th>成员职责描述（小组）</th><th>所占权重</th><th>工作量</th><th>提交状态</th><th>操作</th>;
                                </tr>
                                </thead>
                                <tbody class="showImportbodyList"></tbody>
                            </table>--%>
                        </div>


                    </div>
                </div>

            </div>
        </div>

        <div class="modal fade" id="refuModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" >
                            备注信息
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info">


                                        <div class="form-group">
                                            <label class="col-sm-3 control-label ">存疑说明</label>
                                            <div class="col-sm-9">
                                                <textarea class="form-control" id="refusedesc" rows="3" name="desc"></textarea>
                                            </div>
                                        </div>

                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary commit">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</div>

