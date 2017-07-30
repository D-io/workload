<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/27
  Time: 9:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <h2><i class="fa fa-bars"></i> 工作量申报 </h2>
        <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
            <li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
    <div class="x_content">


        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">工作量申报</a>
                </li>
                <li role="presentation" class="" onclick="applyRec()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">申报记录</a>
                </li>

            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                </div>

            </div>
        </div>

        <div class="modal fade" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                       <tr class="row">
                        <h4 class="modal-title" >
                            工作量申报
                        </h4>
                        <button type="button" class="btn btn-primary applyCommit">提交</button>
                       </tr>
                    </div>
                    <div class="modal-body">
                        <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            <button class="add btn btn-primary" data-toggle="modal" data-target="#addContent">添加申报</button>
                            <div class="applymodalbody" style="height: 60%;">
                                    <div class="zTreeDemoBackground left">
                                        <ul id="treeDemo" class="ztree"></ul>
                                    </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    <!--
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="panel-title">
                    <button class="add btn btn-primary" data-toggle="modal" data-target="#addContent">添加申报</button>
                    <button type="button" class="btn btn-primary applyCommit">提交</button>
                </div>
            </div>
            <div class="panel-body applymodalbody">
                <div class="zTreeDemoBackground left">
                    <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
        </div>
        -->

        <div class="modal fade" id="addContent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" >
                            申报信息
                        </h4>
                    </div>
                    <div class="modal-body">

                        <form class="form-horizontal form-label-left">

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目名称</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control" id="itemName">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">申请描述 <span class="required">*</span>
                                </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea class="form-control" id="applyDesc"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">申报类别</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control" id="isGroup">
                                        <option value="1">小组申报</option>
                                        <option value="0">个人申报</option>

                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">主要参数填写</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <a class="btn btn-primary" role="button" data-toggle="collapse" href="#parameter" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="fa fa-plus"></i>
                                    </a>
                                    <div class="collapse" id="parameter">
                                        <div class="well">
                                            <table class="table" id="parameterTable">
                                                <thead>
                                                <tr class="parameterTh" style="font-size: 13px;">

<!--
                                                    <span style="float: right;"><a class="btn btn-success" id="addParameter"><i class="fa fa-plus"></i></a></span>
                                                    -->
                                                </tr>

                                                </thead>
                                                <tbody id="AddPramter">


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">其他参数填写</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <a class="btn btn-primary" role="button" data-toggle="collapse" href="#otherparameter" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="fa fa-plus"></i>
                                    </a>
                                    <div class="collapse" id="otherparameter">
                                        <div class="well">
                                            <table class="table" id="otherparameterTable">
                                                <thead>
                                                <tr class="otherParaTh" style="font-size: 13px;">
<!--
                                                    <span style="float: right;"><a class="btn btn-success" id="addOtherParameter"><i class="fa fa-plus"></i></a></span>
                                                    -->
                                                </tr>

                                                </thead>
                                                <tbody id="AddOtherPramter">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">申报人</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName" id="applicant">

                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目负责人</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName" id="itemmanager">

                                    </select>
                                </div>
                            </div>
                       <!--
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">工作量</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control" id="workload">
                                </div>
                            </div>
                            -->

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">小组成员信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <a class="btn btn-primary" role="button" data-toggle="collapse" href="#groupMessage" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="fa fa-plus"></i>
                                    </a>
                                    <div class="collapse" id="groupMessage">
                                        <div class="well">
                                            <table class="table" id="groupMessageTable">
                                                <thead>
                                                <tr style="font-size: 13px;">

                                                    <th>成员姓名</th>
                                                    <th>成员职责描述</th>
                                                    <th>成员所占权重<span style="float: right;"><a class="btn btn-success" id="addGroupMessage"><i class="fa fa-plus"></i></a></span></th>
                                                </tr>

                                                </thead>
                                                <tbody id="AddgroupPramter">
                                                <tr>

                                                    <td><select  class="groupMemberName teacherName"><option value=""></option> </select></td>
                                                    <td><input type="text"  class="groupMemberSymbol"></td>
                                                    <td><input type="text"  class="groupMemberWeight"></td>

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
                        <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success savemyApply">保存</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

    </div>
</div>
