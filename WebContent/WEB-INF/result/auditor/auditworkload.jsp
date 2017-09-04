<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/21
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>工作当量管理</a></li>
            <li class="active curentPage" id="WorkloadAuditor">工作当量审核</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
        <div class="clearfix"></div>
    </div>
    <div class="x_content" id="showapplyitem" style="display: block;">
        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">申报审核情况</a>
                </li>
                <li role="presentation" onclick="showReviewerHis()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">查看操作日志</a>
                </li>

            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec">
                        <thead>
                        <tr role="row">
                            <th class="sorting" width="31px;">序号</th>
                            <th class="sorting" width="130px;">操作时间</th>
                            <th class="sorting" width="60px;">操作人员</th>
                            <th class="sorting">操作内容</th>

                           <%-- <th class="sorting">操作形式</th>--%>

                        </tr>
                        </thead>
                        <tbody class="historyRecTbody">
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="auditormodal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"></h4>
                    </div>
                    <div class="modal-body">
                          <div class="applymodalbody">
                            <table class="table dataTable table-bordered no-footer table-striped myRevieweRec">
                                <thead class="showThead" style="display: none;">
                                <tr role="row">
                                <th class="sorting">序号</th>
                                <th class="sorting">申报人</th>
                                <th class="sorting">条目名称</th>
                                 <th class="sorting">所占权重</th>
                                <%--<th class="sorting">申报描述</th>--%>
                                <th class="sorting">申报形式</th>
                                <th class="sorting">工作当量</th>
                                <%--<th class="sorting">计算公式</th>--%>
                                <%--<th class="sorting">主要参数</th>--%>
                                <%--<th class="sorting">其他参数</th>--%>
                                <%--<th class="sorting">版本</th>--%>
                                <th class="sorting">审核状态</th>
                                <th class="sorting">操作</th>
                                </tr>
                                </thead>

                                <tbody class="showDesc">

                                </tbody>
                            </table>


                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="viewdetail_audit" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog" role="document" style="min-width: 700px">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <div class="header">
                            <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;工作当量管理&nbsp;/&nbsp;<span class="current-page">工作当量审核</span></p>
                            <p class="project"></p>
                            <p class="message"></p>
                        </div>
                    </div>
                    <div class="modal-body">
                        <table  class="table table-striped table-bordered dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th class="sorting">计算公式</th>
                                <th class="sorting">计算参数</th>
                                <th class="sorting">项目属性</th>
                                <th class="sorting">版本</th>
                            </tr>
                            </thead>
                            <tbody class="viewDetailTbody">
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

        <div class="modal fade" id="viewdetail_apply" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog" role="document" style="min-width: 700px">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <div class="header">
                            <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class="current-page">工作当量申报</span></p>
                            <p class="project"></p>
                            <p class="message"></p>
                        </div>
                    </div>
                    <div class="modal-body">
                        <table  class="table table-striped table-bordered dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th class="sorting">申报描述</th>
                                <th class="sorting">计算公式</th>
                                <th class="sorting">计算参数</th>
                                <th class="sorting">项目属性</th>
                                <th class="sorting">版本</th>
                            </tr>
                            </thead>
                            <tbody class="viewDetailTbody">
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>


    </div>
    <div class="modal fade" id="refuseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
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


                                    <div class="form-group" style="width: 100%;">
                                        <label class="col-sm-2 control-label ">拒绝原因</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" id="refusedesc" rows="3" name="desc" style="width: 430px;"></textarea>
                                        </div>
                                    </div>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id="refucommit">提交</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

</div>
