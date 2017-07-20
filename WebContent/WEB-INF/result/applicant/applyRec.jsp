<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/17
  Time: 9:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="abnorbalitem">
    <h4>审核未通过条目</h4>
    <div class="x_content" style="display: block;">

        <div id="datatable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
            <div class="row">
                <div class="col-sm-12">
                    <table id="datatable" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info">
                    <thead>
                    <tr role="row">
                        <th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="序号: activate to sort column ascending" style="width: 50px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">序号
                        </th>
                        <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="条目信息: activate to sort column descending" aria-sort="ascending" style="width: 360px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">条目名称</th>
                        <th class="sorting1" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="审核人: activate to sort column ascending" style="width: 78px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">工作量
                        </th>
                        <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                            申报状态 </th>


                        <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="操作: activate to sort column ascending" style="width: 183px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                            操作</th>
                    </tr>
                    </thead>
                    <tbody class="abnorbodyItem"></tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="normalItem">
    <h4>正常条目</h4>
        <div class="x_content" style="display: block;">

            <div id="nordatatable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">

                <div class="row">
                    <div class="col-sm-12">
                        <table id="nordatatable" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info">
                            <thead>
                            <tr role="row">
                                <th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="序号: activate to sort column ascending" style="width: 50px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">序号
                                </th>
                                <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="条目信息: activate to sort column descending" aria-sort="ascending" style="width: 360px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">条目名称</th>
                                <th class="sorting1" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="审核人: activate to sort column ascending" style="width: 78px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">工作量
                                </th>
                                <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="重置状态: activate to sort column ascending" style="width: 83px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                                    申报状态 </th>

                            </tr>
                            </thead>
                            <tbody class="normalbodyItem"></tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
