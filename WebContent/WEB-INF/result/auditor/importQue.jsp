<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/21
  Time: 0:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel">
    <div class="x_title">
        <h3>存疑工作量</h3>
        <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="#">Settings 1</a>
                    </li>
                    <li><a href="#">Settings 2</a>
                    </li>
                </ul>
            </li>
            <li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>

    <div class="x_content" style="display: block;">
        <div class="abnorbalitem">
        <div id="datatable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
            <div class="row">
                <div class="col-sm-12">
                    <table id="datatable" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info">
                        <thead>
                        <tr role="row">
                            <th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="序号: activate to sort column ascending" style="width: 50px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">序号
                            </th>
                            <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="条目信息: activate to sort column descending" aria-sort="ascending" style="width: 360px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">条目名称</th>
                            <th class="sorting1" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="审核人: activate to sort column ascending" style="width: 78px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">教师姓名
                            </th>
                            <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                                工作量数 </th>
                            <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                                计算公式 </th>
                            <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                                修改状态 </th>

                            <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="操作: activate to sort column ascending" style="width: 183px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                                操作</th>
                        </tr>
                        </thead>
                        <tbody class="doubtedItem"></tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
        <div class="modal fade" id="queReasonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" >
                            存疑理由
                        </h4>
                    </div>
                    <div class="modal-body">

                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" >
                            修改工作量
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table>
                            <thead>

                            <tr><th class="col-sm-3 control-label">原工作量</th><th class="col-sm-3 control-label">修改后工作量</th></tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="col-sm-3 control-label oldworkload">
                            </td>
                                <td  class="col-sm-3 control-label">
                                    <input type="text" class="form-control newworkload" >

                                </td>
                            </tr>

                            </tbody>
                        </table>
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" id="save">保存</button>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
</div>
