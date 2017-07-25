<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/23
  Time: 14:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel">
    <div class="x_title">
        <h3 class="title_inline">工作量统计&nbsp;&nbsp;<h4>总工作量：<span  class="totalWorkload" style="width: 40px;"></span></h4></h3>
        <ul class="nav navbar-right panel_toolbox title_inline">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>

            <li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
    <div class="x_content" id="showsumitem" style="display: block;">
    <div class="form-group col-sm-3">
        <select class="form-control" id="isgroup">
            <option value="0">个人申请</option>
            <option value="1">小组申请</option>

        </select>
    </div>

      <div class="form-group col-sm-3">
            <select class="form-control" id="itemRequired">
                <option>条目类别</option>


            </select>
        </div>
        <div class="form-group col-sm-3">
            <select class="form-control" id="teacherName">
                <option>教师姓名</option>

            </select>
        </div>
        <div class="col-sm-3">
        <span  id="sumItemSearch" style="height: 34px;">
            <button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button>
        </span>
        <span>
            <a type="button" class="btn btn-success pull-right" id="authior_output" href="/reviewer/info/items-all"><i class="fa fa-download"></i> 导出</a>
        </span>
        </div>
      <!--
        <div class="col-sm-6">
            <div class="dataTables_length" id="datatable_length"><label><span class="span-inline">显示</span><select name="datatable_length" aria-controls="datatable" class="form-control input-sm span-inline">
                <option value="10">10</option>
                <option value="20">20</option>
            </select> <span class="span-inline">条重置申请</span>
            </label>
            </div>
        </div>
        -->
        <table  class="table table-striped table-bordered dataTable no-footer">
            <thead>
            <tr role="row">
                <th  class="sorting" style="width: 50px;">序号</th>
                <th  class="sorting" style="width: 78px;">教师姓名</th>

                <th class="sorting" style="width: 360px;">条目名称</th>
                <th class="sorting" style="width: 78px;">工作量</th>
                <th class="sorting"  style="width: 83px;">状态 </th>
                <th class="sorting"  style="width: 183px;">操作</th>
            </tr>
            </thead>
            <tbody class="sumItemSort">
            </tbody>
        </table>
        <div style="float: right;">
            <div class="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
        <ul class="pagination">
            <li class="paginate_button previous disabled" id="datatable_previous">
                <a href="#" aria-controls="datatable" data-dt-idx="0" tabindex="0">前一页</a>
            </li>
            <li class="paginate_button active">
                <a href="#" aria-controls="datatable" data-dt-idx="1" tabindex="0">1</a>
            </li>
            <li class="paginate_button next" id="datatable_next"><a href="#" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
            </li>
        </ul>
            </div>

    </div>

</div>
</div>