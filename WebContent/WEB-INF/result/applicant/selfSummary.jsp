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
        <h2><i class="fa fa-bars"></i> 个人工作量汇总 &nbsp;&nbsp;<h4>总工作量：</h4><span class="totalWorkload"></span></h2>
        <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
            <li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
    <div class="x_content">
        <div class="x_content" id="showsumitem" style="display: block;">

            <div class="col-sm-3">
                <h4>总工作量：<span  class="totalWorkload"></span></h4>

            </div>
            <span style="float: right;">
            <button class="btn btn-success pull-right"><i class="fa fa-download"></i> 导出</button>
        </span>
            <table  class="table table-striped table-bordered dataTable no-footer">
                <thead>
                <tr role="row">
                    <th  class="sorting" style="width: 50px;">序号</th>
                    <th class="sorting" style="width: 360px;">条目名称</th>
                    <th  class="sorting" style="width: 78px;">工作量名称</th>
                    <th class="sorting" style="width: 78px;">工作量</th>
                    <th class="sorting" style="width: 78px;">操作</th>
                </tr>
                </thead>
                <tbody class="sumItemSort">
                </tbody>
            </table>

        </div>
    </div>
</div>
