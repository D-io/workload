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

            <table  class="table table-striped table-bordered dataTable no-footer">
                <thead>
                <tr role="row">
                    <th  class="sorting">序号</th>
                    <th  class="sorting">教师姓名</th>
                    <th class="sorting">教师工号</th>
                    <th class="sorting">已获工作当量</th>
                    <th class="sorting" >待获工作当量</th>
                    <th class="sorting" >操作</th>
                </tr>
                </thead>
                <tbody class="sumItemPreview">
                </tbody>
            </table>
            <div class="modal fade bs-example-modal-lg" id="applyModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg" style="margin-left: 100px;">
                    <div class="modal-content" style="width: 1200px;">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 class="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div class="modal-body">
                              <table  class="table table-striped table-bordered dataTable no-footer" style="font-size: 14px;">
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

                    </div>
                </div>
            </div>


    </div>
</div>
