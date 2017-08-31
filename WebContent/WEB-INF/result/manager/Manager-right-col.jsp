<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 19:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<section class="panel panel-primary" id="tree">
    <button id="addToTable" class="btn btn-primary"  data-target="#addModal" data-toggle="modal">Add <i class="fa fa-plus"></i></button>
    <button id="submit" class="btn btn-primary">Submit</button>
    <header class="panel-heading">
        <div class="panel-actions">
            <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
            <!--<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>-->
        </div>
        &lt;%&ndash;<h2 class="panel-title">教学工作当量计算方式：</h2>&ndash;%&gt;
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bars"></i>管理</a></li>
            <li class="active">类目管理</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
    </header>

    <!-- Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">添加信息</h4>
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
                                    <option value="0">申报类</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">审核人</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="teacherName">
                                    <option value=""></option>

                                </select>
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
                            <label class="col-sm-3 control-label">是否为叶子节点</label>
                            <div class="col-sm-9">
                                <input type="radio" class="isLeaf" name="hasChildNode" value="Y">是
                                <input type="radio" class="isLeaf" name="hasChildNode"  value="N">否
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
                                            <thead>
                                            <tr>

                                                <th>参数名称</th>
                                                <th>参数符号<span style="float: right;"><a class="btn btn-primary" id="addParameter"><i class="fa fa-plus"></i></a></span></th>


                                            </tr>

                                            </thead>
                                            <tbody class="AddPramter">
                                            <tr>

                                                <td><input type="text" class="parameterName" name="parameterName"></td>
                                                <td><input type="text" class="parameterSymbol" name="parameterSymbol"></td>

                                            </tr>
                                            </tbody>
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
                        <div class="form-group">
                            <label class="col-sm-3 control-label">附加参数配置</label>
                            <div class="col-sm-9">

                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#otherParameter" aria-expanded="false" aria-controls="collapseExample">
                                    <i class="fa fa-plus"></i>
                                </a>
                                <div class="collapse" id="otherParameter">
                                    <div class="well">
                                        <table class="table" id="otherParameterTable">
                                            <thead>
                                            <tr>
                                                <th>参数名称</th>
                                            </tr>

                                            </thead>
                                            <tbody class="addOtherPramter">
                                            <tr>
                                                <td><input type="text" class="otherParameterName" name="otherParameterName"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
                <ul id="treeDemo" class="ztree"></ul>
            </div>

        </div>

    </div>
</section>--%>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bars"></i>管理</a></li>
            <li class="active curentPage" id="CategoryManage">计算规则管理</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
        <!-- <div class="clearfix"></div>-->
    </div>
    <div class="x_content">

        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">计算规则管理</a>
                </li>
               <%-- <li role="presentation" onclick="jumpToSum()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">计算规则预览</a>
                </li>--%>
                <li role="presentation"  onclick="manageHistory()"><a href="#tab_content3" role="tab" id="history-tab" data-toggle="tab" aria-expanded="false">查看操作日志</a>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                    <button id="addToTable" class="btn btn-primary"  data-target="#addModal" data-toggle="modal">添加规则 <i class="fa fa-plus"></i></button>
                    <button id="submit" class="btn btn-primary">提交规则</button>
                    <%--<button id="unlock" class="btn btn-primary">unlock</button>--%>
                    <%-- <header class="panel-heading">
                         <div class="panel-actions">
                             <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
                             <!--<a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>-->
                         </div>

                     </header>--%>

                    <!-- Modal -->
                    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">规则信息</h4>
                                </div>
                                <div class="modal-body">

                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">规则名称</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="itemName" name ="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label ">规则简介</label>
                                            <div class="col-sm-9">
                                                <textarea class="form-control" id="desc" rows="3" name="desc"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">规则类别</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="importRequired" name="sorting">
                                                    <option value="1">导入复核类</option>
                                                    <option value="0">申报审核类</option>
                                                    <option value="2">无特殊类别</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label requiredtime" id="importManager">审核人员</label>
                                            <div class="col-sm-9">
                                                <select class="form-control select2" id="teacherName">
                                                    <option value=""></option>

                                                </select>
                                            </div>
                                            <div id="prompt" style="width: 400px;padding-top: 40px;padding-left:100px;text-align: center"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">父级规则</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="parentId" name="parentId">
                                            </div>
                                        </div>
                                        <%--<div class="form-group">
                                            <label class="col-sm-3 control-label">是否为叶子节点</label>
                                            <div class="col-sm-9">
                                                <input type="radio" class="isLeaf" name="hasChildNode" value="Y">是
                                                <input type="radio" class="isLeaf" name="hasChildNode"  value="N">否
                                            </div>
                                        </div>--%>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">复核截止时间</label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                                    <input type="text" class="form-control datetimepicker" id="applyDeadline">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label"><span class="revDeadLabel">导入截止时间</span></label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                             <span class="input-group-addon">
                                                 <i class="fa fa-calendar"></i>
                                             </span>
                                                    <input type="text"  class="form-control datetimepicker" id="reviewDeadline">

                                                </div>
                                                </div>
                                            </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">公式参数</label>
                                            <div class="col-sm-9">

                                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#parameter" aria-expanded="false" aria-controls="collapseExample">
                                                    <i class="fa fa-plus"></i>
                                                </a>
                                                <div class="collapse" id="parameter">
                                                    <div class="well">
                                                        <table class="table" id="parameterTable">
                                                            <thead>
                                                            <tr>

                                                                <th style="font-size: 13px;">参数名称</th>
                                                                <th style="font-size: 13px;">参数符号<span style="float: right;"><a class="btn btn-success" id="addParameter"><i class="fa fa-plus"></i></a></span></th>


                                                            </tr>

                                                            </thead>
                                                            <tbody class="AddPramter">
                                                            <tr>

                                                                <%-- <td><input type="text" class="parameterName" name="parameterName"></td>
                                                                 <td><input type="text" class="parameterSymbol" name="parameterSymbol"></td>--%>

                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">计算公式</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="formula">
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">附加属性</label>
                                            <div class="col-sm-9">

                                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#otherParameter" aria-expanded="false" aria-controls="collapseExample">
                                                    <i class="fa fa-plus"></i>
                                                </a>
                                                <div class="collapse" id="otherParameter">
                                                    <div class="well">
                                                        <table class="table" id="otherParameterTable">
                                                            <thead>
                                                            <tr>
                                                                <th style="font-size: 13px;">参数名称<span style="float: right;"><a class="btn btn-success" id="addOtherParameter"><i class="fa fa-plus"></i></a></span></th>
                                                            </tr>

                                                            </thead>
                                                            <tbody class="addOtherPramter">

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                       <%-- <div class="form-group">
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
                                        </div>--%>

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary " data-dismiss="modal" id="cancel">取消</button>
                                    <button type="button" class="btn btn-primary" id="save">保存</button>
                                    <button class="btn btn-primary manageEdit" style="display: none;">编辑</button>
                                    <button class="btn btn-primary submitEdit" style="display: none;">提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   <%-- <div class="modal fade" id="firstaddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabeil">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">规则信息</h4>
                                </div>
                                <div class="modal-body">

                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">规则名称</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="firstitemName" name ="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label ">规则简介</label>
                                            <div class="col-sm-9">
                                                <textarea class="form-control" id="firstdesc" rows="3" name="desc"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">规则类别</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="firstimportRequired" name="sorting">
                                                    <option value="1">导入复核类</option>
                                                    <option value="0">申报审核类</option>
                                                    <option value="2">无特殊类别</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label requiredtime">审核人员</label>
                                            <div class="col-sm-9">
                                                <select class="form-control select2" id="firstteacherName">
                                                    <option value=""></option>

                                                </select>
                                            </div>
                                            <div id="" style="width: 400px;padding-top: 40px;padding-left:100px;text-align: center"></div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">父级规则</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="firstparentId" name="parentId">
                                            </div>
                                        </div>
                                        &lt;%&ndash;<div class="form-group">
                                            <label class="col-sm-3 control-label">是否为叶子节点</label>
                                            <div class="col-sm-9">
                                                <input type="radio" class="isLeaf" name="hasChildNode" value="Y">是
                                                <input type="radio" class="isLeaf" name="hasChildNode"  value="N">否
                                            </div>
                                        </div>&ndash;%&gt;
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label"><span class="firstapplyDeadLabel">复核截止时间</span><span style="margin-left: 30px;font-size: 11px;color: #ccc;">(默认为当前年份的12月28号)</span></label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                                    <input type="text" class="form-control datetimepicker" id="firstapplyDeadline">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label"><span class="firstrevDeadLabel">导入截止时间</span><span style="margin-left: 30px;font-size: 11px;color: #ccc;">(默认为当前年份的12月31号)</span></label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                             <span class="input-group-addon">
                                                 <i class="fa fa-calendar"></i>
                                             </span>
                                                    <input type="text"  class="form-control datetimepicker" id="firstreviewDeadline">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">公式参数</label>
                                            <div class="col-sm-9">
&lt;%&ndash;
                                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#firstparameter" aria-expanded="false" aria-controls="collapseExample">
                                                    <i class="fa fa-plus"></i>
                                                </a>
                                                <div class="collapse" id="firstparameter">&ndash;%&gt;
                                                    <div class="well">
                                                        <table class="table" id="firstparameterTable">
                                                            <thead>
                                                            <tr>

                                                                <th style="font-size: 13px;">参数名称</th>
                                                                <th style="font-size: 13px;">参数符号<span style="float: right;"><a class="btn btn-success" id="firstaddParameter"><i class="fa fa-plus"></i></a></span></th>


                                                            </tr>

                                                            </thead>
                                                            <tbody class="firstAddPramter">
                                                          &lt;%&ndash;  <tr>&ndash;%&gt;

                                                                &lt;%&ndash; <td><input type="text" class="parameterName" name="parameterName"></td>
                                                                 <td><input type="text" class="parameterSymbol" name="parameterSymbol"></td>&ndash;%&gt;

                                                           &lt;%&ndash; </tr>&ndash;%&gt;
                                                            </tbody>
                                                        </table>
                                                    </div>
                                               &lt;%&ndash; </div>&ndash;%&gt;
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">计算公式</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="firstformula">
                                            </div>
                                        </div>
                                        <div class="form-group requiredtime">
                                            <label class="col-sm-3 control-label">附加属性</label>
                                            <div class="col-sm-9">

                                                &lt;%&ndash;<a class="btn btn-primary" role="button" data-toggle="collapse" href="#firstotherParameter" aria-expanded="false" aria-controls="collapseExample">
                                                    <i class="fa fa-plus"></i>
                                                </a>
                                                <div class="collapse" id="firstotherParameter">&ndash;%&gt;
                                                    <div class="well">
                                                        <table class="table" id="firstotherParameterTable">
                                                            <thead>
                                                            <tr>
                                                                <th style="font-size: 13px;">参数名称<span style="float: right;"><a class="btn btn-success" id="firstaddOtherParameter"><i class="fa fa-plus"></i></a></span></th>
                                                            </tr>

                                                            </thead>
                                                            <tbody class="firstaddOtherPramter">

                                                            </tbody>
                                                        </table>
                                                    </div>
                                            &lt;%&ndash;    </div>&ndash;%&gt;
                                            </div>
                                        </div>






                                        &lt;%&ndash; <div class="form-group">
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
                                         </div>&ndash;%&gt;

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary " data-dismiss="modal" id="firstcancel">取消</button>
                                    <button type="button" class="btn btn-primary" id="firstsave">保存</button>
                                    &lt;%&ndash;<button class="btn btn-primary manageEdit" style="display: none;">编辑</button>
                                    <button class="btn btn-primary submitEdit" style="display: none;">提交</button>&ndash;%&gt;
                                </div>
                            </div>
                        </div>
                    </div>

--%>

                    <div class="allTree">


                        <div class="panel-body">
                            <div class="zTreeDemoBackground left">
                                <ul id="treeDemo" class="ztree"></ul>
                            </div>

                        </div>

                    </div>
                </div>
                <%--<div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                </div>--%>
                <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="history-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec">
                        <thead>
                        <tr role="row">
                            <th class="sorting" width="31px">序号</th>
                            <th class="sorting" width="131px">操作时间</th>
                            <th class="sorting" width="60px;">操作人员</th>
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