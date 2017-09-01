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
            <li><a href="#"><i class="fa fa-bars"></i>管理</a></li>
            <li class="active curentPage" id="ItemSummary">工作当量统计</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>

        <div class="clearfix"></div>
    </div>
    <div class="x_content" id="showsumitem" style="display: block;">
        <%--<div class="form-group col-sm-3">
            <select class="form-control" id="ispassed">
                <option value="0">审核状态</option>
                <option value="2">审核通过</option>
                <option value="5">审核拒绝</option>
            </select>
        </div>

        <div class="form-group col-sm-3">
            <select class="form-control" id="itemRequired">
                <option value="0">条目类别</option>


            </select>
        </div>
        <div class="form-group col-sm-3">
            <select class="form-control" id="teacherName">
                <option value="0">教师姓名</option>

            </select>
        </div>
        <div class="col-sm-3">
        <span  id="sumItemSearch" style="height: 34px;">
            <button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button>
        </span>
            <span>
            <button class="btn btn-success pull-right Toexcell"><i class="fa fa-download"></i> 导出</button>
        </span>
        </div>--%>
        <!--
        <div class="col-sm-6">
            <div class="dataTables_length" id="datatable_length"><label><span class="span-inline">显示</span><select name="datatable_length" aria-controls="datatable" class="form-control input-sm span-inline">
                <option value="10">10</option>
                <option value="20">20</option>
            </select> <span class="span-inline">条工作量</span>
            </label>
            </div>
        </div>
        -->
            <button class="btn btn-primary pull-right Torefresh"><i class="fa fa-refresh"></i> 刷新</button>
            <button class="btn btn-success pull-right Toexcellall"><i class="fa fa-download"></i> 导出</button>

            <table  class="table table-striped table-bordered dataTable no-footer activesort" >
                <thead>
                <tr role="row">
                   <%-- <th  class="teacher_Sort">序号</th>--%>
                    <th class=" teacher_Sort">教师工号</th>
                    <th  class=" teacher_Sort">教师姓名</th>
                    <th  class="teacher_Sort ">专业职称</th>
                    <th class=" teacher_Sort">通过审核(复核)工作当量</th>
                    <th class=" teacher_Sort" >有待审核(复核)工作当量</th>
                    <th class=" teacher_Sort" >预期总工作当量</th>

                </tr>
                </thead>
                <tbody class="sumItemPreview">
                </tbody>
            </table>
            <div class="modal fade bs-example-modal-lg" id="applyModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 class="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div class="modal-body">
                            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">导入复核类</a>
                                    </li>
                                    <li role="presentation"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">申报审核类</a>
                                    </li>

                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                        <table  class="table table-striped table-bordered dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting">序号</th>
                                                <th  class="sorting">规则名称</th>
                                                <th  class="sorting">规则类别</th>
                                                <th class="sorting">条目名称</th>
                                                <th  class="sorting">计算公式</th>
                                                <th class="sorting" >公式描述</th>
                                                <th class="sorting" >其他参数</th>
                                                <th class="sorting">工作量</th>
                                                <th  class="sorting">教师姓名</th>
                                                <th class="sorting">状态</th>
                                            </tr>
                                            </thead>
                                            <tbody class="sumItemSort">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                                        <table  class="table table-striped table-bordered dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting">序号</th>
                                                <th  class="sorting">规则名称</th>
                                                <th  class="sorting">规则类别</th>
                                                <th class="sorting">条目名称</th>
                                                <th  class="sorting">计算公式</th>
                                                <th class="sorting" >公式描述</th>
                                                <th class="sorting" >其他参数</th>
                                                <th class="sorting">工作量</th>
                                                <th  class="sorting">教师姓名</th>
                                                <th class="sorting">状态</th>
                                            </tr>
                                            </thead>
                                            <tbody class="sumuncheckedItemSort">
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


    </div>
</div>
