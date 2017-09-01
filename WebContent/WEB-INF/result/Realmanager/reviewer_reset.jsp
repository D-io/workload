<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/24
  Time: 9:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>教务管理</a></li>
            <li class="active curentPage" id="Managerreset">教师项目管理</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
       <%-- <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>

            <li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>
        </ul>--%>
        <div class="clearfix"></div>
    </div>
    <div class="x_content" id="showsumitem" style="display: block;">

        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">退回项目操作</a>
                </li>
                <li role="presentation" onclick="resetHistory()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">查看操作日志</a>
                </li>

            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                    <div class="form-group col-sm-3">
                        <select class="form-control" id="ispassed">
                            <option value="0">项目状态</option>
                            <option value="1">待审核/待复核</option>
                            <option value="2">审核/复核已通过</option>
                           <%-- <option value="1">待审核</option>
                            <option value="6">待复核</option>--%>
                          <%--  <option value="2">复核已通过</option>
                            <option value="7">审核已通过</option>--%>
                            <option value="3">尚存疑</option>
                            <option value="4">已解决</option>
                            <option value="5">已拒绝</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <select class="form-control" id="teacherName">
                            <option value="0">教师姓名</option>

                        </select>
                    </div>

                    <div class="form-group col-sm-3">
                        <select class="form-control" id="itemRequired">
                            <option value="0">规则名称</option>

                        </select>
                    </div>
                    <div class="col-sm-3">
        <span  id="sumItemSearch" >
            <button class="btn btn-primary" style="margin-top: 8px;"><i class="fa fa-search"></i></button>
        </span>
                        <span>
            <button class="btn btn-success pull-right Toexcell"><i class="fa fa-download"></i> 导出</button>
        </span>
                    </div>
                    <div class="col-sm-6">
                        <div class="dataTables_length" id="datatable-checkbox_length"  style="display: flex;font-weight: bold;">
                            <span style="margin-bottom: 5px;">每页</span>
                                <select name="DataTables_Table_1_length" aria-controls="DataTables_Table_1" style="width: 46px;height: 19px;margin-left: 5px;">
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                    <option value="60">60</option>
                                </select> <span style="margin-bottom: 5px;margin-left: 5px;">条</span>
                        </div>
                    </div>

                    <table  class="table table-striped table-bordered dataTable no-footer" id="datatable-details">
                        <thead>
                        <tr role="row">

                            <th  class="sorting">序号</th>
                            <th class="sorting">规则名称</th>
                            <th class="sorting">类别</th>
                            <th class="sorting">项目名称</th>
                           <%-- <th class="sorting">计算公式</th>
                            <th  class="sorting">公式描述</th>
                            <th class="sorting">附加属性</th>--%>
                            <th class="sorting">工作当量</th>
                            <th  class="sorting">教师姓名</th>
                            <th class="sorting">项目状态 </th>
                            <th class="sorting">操作</th>
                        </tr>
                        </thead>
                        <tbody class="ResetItem">
                        </tbody>
                    </table>

                    <div class="row">
                        <div class="col-sm-5">
                            <div class="dataTables_info" id="datatable-checkbox_info" role="status" aria-live="polite">
                                共<span class="totalItem"></span>条工作当量条目
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="dataTables_paginate paging_simple_numbers" id="datatable-checkbox_paginate">
                                <ul class="pagination">

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="showdetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">详细信息</h4>
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


                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec">
                        <thead>
                        <tr role="row">
                            <th class="sorting" width="31px">序号</th>
                            <th class="sorting" width="131px">操作时间</th>
                            <th class="sorting" width="60px">操作人员</th>
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


    </div>
</div>


    
