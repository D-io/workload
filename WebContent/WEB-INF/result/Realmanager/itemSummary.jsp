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
           <%-- <button class="btn btn-primary pull-right Torefresh"><i class="fa fa-refresh"></i> 刷新</button>--%>
            <button class="btn btn-success pull-right Toexcellall"><i class="fa fa-download"></i> 导出</button>

            <table  class="table table-striped table-bordered dataTable no-footer activesort" cellspacing="0" width="100%">
                <thead>
                <tr role="row">
                   <%-- <th  class="teacher_Sort">序号</th>--%>

                    <th class=" teacher_Sort">教师工号</th>
                    <th  class=" teacher_Sort">教师姓名</th>
                    <th  class="teacher_Sort ">专业职称</th>
                    <th class=" teacher_Sort">已通过工作当量</th>
                    <th class=" teacher_Sort" >待核定工作当量</th>
                    <th class=" teacher_Sort" >预期总工作当量</th>
                    <th class="sorting">刷新</th>

                </tr>
                </thead>
                <tbody class="sumItemPreview">
                </tbody>
            </table>

            <div class="modal fade bs-example-modal-lg" id="applyModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style="height: 780px;">

                        <div class="modal-header" style="position: relative">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 class="modal-title" id="myModalLabel"><%--<span style="font-size: 18px;">--%><i class="fa fa-bar-chart"></i>教务管理/工作当量统计/【<span class="teach_id"></span>】<span class="teach_name"></span>/<span class="title_name"></span></h4>
                        </div>
                        <div class="modal-body" style="max-height: 700px;" >
                            <%--<div id="echart_pie" style="height:350px;"></div>--%>
                             <%--   <div id="echart_pie" style="height:350px;"></div>
                            <div id="echart_unchecked_pie" style="height:350px;"></div>--%>
                            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">导入复核类(<span class="import_Item_Count"></span>)</a>
                                    </li>
                                    <li role="presentation"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">申报审核类(<span class="checked_Item_Count"></span>)</a>
                                    </li>

                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                        <table  class="table table-striped table-bordered dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th  class="sorting">序号</th>
                                                <th  class="sorting">规则名称</th>
                                                <th  class="sorting">类别</th>
                                                <th class="sorting">项目名称</th>
                                               <%-- <th  class="sorting">计算公式</th>
                                                <th class="sorting" >计算参数</th>
                                                <th class="sorting" >项目属性</th>--%>
                                                <th class="sorting">工作当量</th>
                                                <%--<th  class="sorting">教师姓名</th>--%>
                                                <th class="sorting">项目状态</th>
                                                <th class="sorting">操作</th>
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
                                                <th  class="sorting">类别</th>
                                                <th class="sorting">项目名称</th>
                                                <%-- <th  class="sorting">计算公式</th>
                                                 <th class="sorting" >计算参数</th>
                                                 <th class="sorting" >项目属性</th>--%>
                                                <th class="sorting">工作当量</th>
                                               <%-- <th  class="sorting">教师姓名</th>--%>
                                                <th class="sorting">项目状态</th>
                                                <th class="sorting">操作</th>
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
            <div class="modal fade bs-example-modal-lg" id="showPieModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style="height: 500px;">

                        <div class="modal-header" style="position: relative">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 class="modal-title"><%--<span style="font-size: 18px;">--%><i class="fa fa-bar-chart"></i>教务管理/工作当量统计/【<span class="teachers_id"></span>】<span class="teachers_name"></span></h4>
                        </div>
                        <div class="modal-body" style="max-height: 500px;overflow-y: hidden;overflow-x: hidden;" >
                        <div class="show-all-count" style="background-color: #5ab1ef;margin-left:18%;">预计总工作当量：<span class="totlaAll"></span></div><div class="show-all-count" style="background-color: #2ec7c9;">已通过总工作当量：<span class="passAll"></span></div><div class="show-all-count" style="background-color: #ffb980;">待核定总工作当量：<span class="unpassAll"></span></div><%--</div>--%>

                                <div id="echart_unchecked_pie" style="height:350px;"></div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="modal fade" id="showdetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
                <div class="modal-dialog" role="document" style="min-width: 700px">
                    <%--<div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" >详细信息</h4>
                        </div>--%>
                        <div class="modal-content">
                         <div class="modal-header" style="position: relative">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                </button>
                                <div class="header" style="width:96%;float: left;">
                                    <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;教务管理&nbsp;/&nbsp;<span class="current-page">工作当量统计&nbsp;/&nbsp;查看详情</span></p>
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

    </div>
</div>
