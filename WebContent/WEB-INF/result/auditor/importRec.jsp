<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/20
  Time: 20:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
                        <th class="sorting1" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="审核人: activate to sort column ascending" style="width: 78px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">计算公式
                        </th>
                        <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                            复核截止时间 </th>
                        <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                            上传截止时间 </th>

                        <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="操作: activate to sort column ascending" style="width: 183px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                            操作</th>
                    </tr>
                    </thead>
                    <tbody class="unconmmitItem"></tbody>
                </table>
            </div>
        </div>

    </div>
</div>
<div class="modal fade" id="edittimeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" >
                    修改复核时间
                </h4>
            </div>
            <div class="modal-body">
                <table>
                    <thead>

                    <tr><th class="col-sm-3 control-label">默认复核截止时间</th><th class="col-sm-3 control-label">修改复核截止时间</th></tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="col-sm-3 control-label oldreviewertime">
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
                <button type="button" class="btn btn-primary" id="docImport">保存</button>
            </div>

        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>