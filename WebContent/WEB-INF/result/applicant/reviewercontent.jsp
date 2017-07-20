<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/17
  Time: 19:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="x_panel" id="showRevitem">
    <div class="x_title">
        <h2>待复核工作量类目</h2>
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
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            待复核工作量
                        </h4>
                    </div>
                    <div class="modal-body">
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
                                                复核状态 </th>


                                            <th class="" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="操作: activate to sort column ascending" style="width: 183px;font-size: 13px;font-family: 'Helvetica Neue',Roboto,Arial,'Droid Sans',sans-serif">
                                                操作</th>
                                        </tr>
                                        </thead>
                                        <tbody class="mymodaldata"></tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
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


                                        <div class="form-group">
                                            <label class="col-sm-3 control-label ">存疑说明</label>
                                            <div class="col-sm-9">
                                                <textarea class="form-control" id="refusedesc" rows="3" name="desc"></textarea>
                                            </div>
                                        </div>

                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary commit">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</div>
<section class="panel panel-primary" id="applytree" style="display: none">
    <button id="applyaddToTable" class="btn btn-primary"  data-target="#applyaddModal" data-toggle="modal">添加 <i class="fa fa-plus"></i></button>
    <button id="applysubmit" class="btn btn-primary">提交</button>
    <header class="panel-heading">
        <div class="panel-actions">
            <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
            <!--<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>-->
        </div>
        <h2 class="panel-title">个人工作量申报</h2>
    </header>

    <!-- Modal -->
    <div class="modal fade" id="applyaddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">添加信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">条目名称</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="itemName" name ="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label ">条目简介</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" id="desc" rows="3" name="desc"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">条目类别</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="importRequired" name="sorting">
                                    <option value="1">导入类</option>
                                    <option value="2">审核类</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">审核人</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="reviewerId" onfocus="showTeacherInfo(this)" onblur="hideTeacherInfo(this)">
                            </div>
                            <div id="prompt" style="width: 400px;padding-top: 40px;padding-left:100px;text-align: center"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">父条目</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="parentId" name="parentId">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">父条目审核人</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="parentVerifier">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">是否含有子节点</label>
                            <div class="col-sm-9">
                                <input type="radio" id="isLeaf" name="hasChildNode" value="Y">是
                                <input type="radio" id="isntLeaf" name="hasChildNode"  value="N">否
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">申请截止时间</label>
                            <div class="col-sm-9">
                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                    <input type="text" data-plugin-datepicker class="form-control" id="applyDeadline">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">审核截止时间</label>
                            <div class="col-sm-9">
                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                    <input type="text" data-plugin-datepicker class="form-control" id="reviewDeadline">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">适用学期</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="version">
                                    <option>2017-2018-1</option>
                                    <option>2017-2018-2</option>
                                    <option>2016-2017-1</option>
                                    <option>2016-2017-2</option>
                                    <option>2015-2016-1</option>
                                    <option>2015-2016-2</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">计算公式参数配置</label>
                            <div class="col-sm-9">

                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#parameter" aria-expanded="false" aria-controls="collapseExample">
                                    <i class="fa fa-plus"></i>
                                </a>
                                <div class="collapse" id="parameter">
                                    <div class="well">
                                        <table class="table" id="parameterTable">
                                            <tr>
                                                <th>#</th>
                                                <th>参数名称</th>
                                                <th>参数符号</th>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td><input type="text" id="parameterName" name="parameterName"></td>
                                                <td><input type="text" id="parameterSymbol" name="parameterSymbol"></td>
                                                <td><a class="btn" onclick="addParameter()"><i class="fa fa-plus"></i></a></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">计算公式</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="formula">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id="save">保存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="allTree">


        <div class="panel-body">
            <div class="zTreeDemoBackground left">
                <ul id="applytreeDemo" class="ztree"></ul>
            </div>

        </div>

    </div>
</section>
<div id="hiddencontent" >


</div>
