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
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>我的工作当量</a></li>
            <li class="active curentPage" id="WorkloadApply">工作当量复申报</li>
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
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">工作当量申报</a>
                </li>
                <li role="presentation"  onclick="applyRec()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">申报审核情况</a>
                </li>
                <li role="presentation"  onclick="showApplyHistory()"><a href="#tab_content3" role="tab" id="history-tab" data-toggle="tab" aria-expanded="false">查看操作日志</a>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec border-aero" style="display: none;">
                        <thead>
                        <tr role="row">
                            <th class="sorting" style="width="5%">序号</th>
                            <th class="sorting" style="width="30%">条目名称</th>
                            <th class="sorting" style="width="10%">工作当量</th>
                            <%--<th class="sorting">计算公式</th>--%>
                            <th class="sorting" style="width="9%">形式</th>
                            <%--<th class="sorting">主要参数</th>--%>
                            <%--<th class="sorting">参数描述</th>--%>
                            <%--<th class="sorting">其他参数</th>--%>
                            <%--<th class="sorting">版本</th>--%>
                            <th class="sorting" style="width="20%">审核截止时间 </th>
                            <th class="sorting" style="width="10%">审核状态 </th>
                            <th class="sorting" style="width: 16%">操作</th>
                        </tr>
                        </thead>
                        <tbody class="reviewerRecTbody">
                        </tbody>
                    </table>
                </div>

                <div class="modal fade" id="viewdetail_apply" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                    <div class="modal-dialog" role="document" style="min-width: 700px">
                        <div class="modal-content">
                            <div class="modal-header" style="position: relative">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                </button>
                                <div class="header">
                                    <p class="project"></p>
                                    <p class="message"></p>
                                </div>
                            </div>
                            <div class="modal-body">
                                <table  class="table table-striped table-bordered dataTable no-footer">
                                    <thead>
                                    <tr role="row">
                                        <th class="sorting">计算公式</th>
                                        <th class="sorting">计算参数</th>
                                        <th class="sorting">项目属性</th>
                                        <th class="sorting">版本</th>
                                    </tr>
                                    </thead>
                                    <tbody class="viewDetailTbody">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>


                <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="history-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec">
                        <thead>
                        <tr role="row">
                            <th class="sorting" width="31px">序号</th>
                            <th class="sorting" width="130px;">操作时间</th>
                            <th class="sorting" width="60px">操作人员</th>
                            <th class="sorting">操作内容</th>

                       <%--     <th class="sorting">操作形式</th>--%>

                        </tr>
                        </thead>
                        <tbody class="historyRecTbody">
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <div class="modal fade bs-example-modal-lg" id="applyModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <div class="modal-title" id="myModalLabel"></div>
                    </div>
                    <div class="modal-body">
                        <button class="add btn btn-primary" data-toggle="modal" data-target="#addContent">添加申报</button>
                        <div class="applymodalbody" style="height: 60%;"><%--
                            <table class="table table-bordered table-striped dataTable no-footer" style="font-size:14px;">
                                <thead class="showThead" style="display: none;"><th>序号</th><th>条目名称</th><th>工作量</th><th>提交状态</th><th>操作</th></thead>
                                <tbody class="showDesc"></tbody>
                            </table>--%>


                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="addContent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">工作内容简介</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control" id="itemName">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">工作内容描述
                                </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea class="form-control" id="applyDesc"></textarea>
                                </div>
                            </div>


                            <%--<div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">申报类别</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control" id="isGroup">
                                        <option value="1">小组申报</option>
                                        <option value="0">个人申报</option>

                                    </select>
                                </div>
                            </div>--%>
                            <div class="radio">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                </label>
                                <label>
                                    <input type="radio"  value="0"  name="optionsRadios" class="radioChange"> 个人申报
                                </label>
                                <label>
                                    <input type="radio"  value="1"  name="optionsRadios" class="radioChange"> 小组申报
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">主要考核参数</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">


                                        <div class="well">
                                            <table class="table" id="parameterTable">
                                                <thead>
                                                <tr class="parameterTh" style="font-size: 13px;">

<!--
                                                    <span style="float: right;"><a class="btn btn-success" id="addParameter"><i class="fa fa-plus"></i></a></span>
                                                    -->
                                                </tr>

                                                </thead>
                                                <tbody class="AddPramter">


                                                </tbody>
                                            </table>
                                        </div>

                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">其他附加信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

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
                       <%--     <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">申报人</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName" id="applicant">

                                    </select>
                                </div>
                            </div>--%>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附件信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                   <%-- <a class="downloadFile" style="margin-left: 20px;float: right;margin-top: 4px;display: none">下载</a> <a class="revieFile" style="float: right;margin-top: 4px;;display: none">重传</a>
                                 --%>
                                    <span class='filestyle'><input type="file" name='testfile' id='testfile' style="float: left; outline: none;"><span class="showhidden"></span></span>

                                </div>
                            </div>
                            <div class="form-group item_manager" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目负责人</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName" id="itemmanager">
                                        <option value=""></option>
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

                            <div class="form-group item_group" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目组成员</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <a class="btn btn-primary" role="button" data-toggle="collapse" href="#groupMessage" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="fa fa-plus"></i>
                                    </a>
                                    <div class="collapse" id="groupMessage">
                                        <div class="well">
                                            <table class="table" id="groupMessageTable">
                                                <thead>
                                                <tr style="font-size: 13px;">

                                                    <th style="width: 115px">成员姓名</th>
                                                    <th style="width: 120px">成员职责描述</th>
                                                    <th style="width: 120px">成员所占权重<span style="float: right;"><a class="btn btn-success" id="addGroupMessage"><i class="fa fa-plus"></i></a></span></th>
                                                </tr>

                                                </thead>
                                                <tbody id="AddgroupPramter">
                                                <tr>

                                                    <td><select  class="groupMemberName teacherName"><option value=" "></option> </select></td>
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
                        <button type="button" class="btn btn-primary dismiss" data-dismiss="modal">取消</button>
                       <button type="button" class="btn btn-primary savemyApply">保存</button>
                     <%--   <button type="button" class="btn btn-primary saveAgain" style="display: none">保存</button>--%>
                        <button type="button" class="btn btn-primary neweditor">编辑</button>
                        <button type="button" class="btn btn-primary newsubmit">提交</button>
                        <%--<input type="submit" value="提交">--%>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <div class="modal fade" id="showContent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" >
                            申报信息
                        </h4>
                    </div>
                    <div class="modal-body">

                        <button class="btn btn-primary btn-danger editDelete" style="display: none"><i class="fa fa-pencil"></i>删除</button>

                        <form class="form-horizontal form-label-left">

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">工作内容简介</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control changeDis" id="showitemName">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">工作内容描述
                                </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea class="form-control changeDis" id="showapplyDesc"></textarea>
                                </div>
                            </div>

                            <div class="radio">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                </label>
                                <label>
                                    <input type="radio" value="0"  name="showoptionsRadios" class="radioChange changeDis showradioChange" id="single"> 个人申报
                                </label>
                                <label>
                                    <input type="radio"  value="1"  name="showoptionsRadios" class="radioChange changeDis showradioChange" id="group"> 小组申报
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">主要考核参数</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                        <div class="well">
                                            <table class="table" id="showparameterTable">
                                                <thead>
                                                <tr class="showparameterTh" style="font-size: 13px;">

                                                    <!--
                                                                                                        <span style="float: right;"><a class="btn btn-success" id="addParameter"><i class="fa fa-plus"></i></a></span>
                                                                                                        -->
                                                </tr>

                                                </thead>
                                                <tbody class="showAddPramter">


                                                </tbody>
                                            </table>
                                        </div>

                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">其他附加信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                        <div class="well">
                                            <table class="table" id="showotherparameterTable">
                                                <thead>
                                                <tr class="showotherParaTh" style="font-size: 13px;">
                                                    <!--
                                                                                                        <span style="float: right;"><a class="btn btn-success" id="addOtherParameter"><i class="fa fa-plus"></i></a></span>
                                                                                                        -->
                                                </tr>

                                                </thead>
                                                <tbody id="showAddOtherPramter">

                                                </tbody>
                                            </table>
                                        </div>

                                </div>
                            </div>
                            <%--     <div class="form-group">
                                     <label class="control-label col-md-3 col-sm-3 col-xs-12">申报人</label>
                                     <div class="col-md-9 col-sm-9 col-xs-12">
                                         <select class="form-control teacherName" id="applicant">

                                         </select>
                                     </div>
                                 </div>--%>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附件信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <span class='filestyle'>
                                        <input type="file" name="revfile" id='revfile' style="float: left; outline: none;">
                                        <span class="showagain">

                                        </span>
                                    </span>

                                </div>

                            </div>
                            <div class="form-group showitem_manager" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目负责人</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName changeDis select2" id="showitemmanager">

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

                            <div class="form-group showitem_group" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目组成员</label>
                                <div class="col-md-9 col-sm-9 col-xs-12 team-member">

                                    <a class="btn btn-primary" role="button" data-toggle="collapse" href="#showgroupMessage" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="fa fa-plus"></i>
                                    </a>
                                    <div class="collapse" id="showgroupMessage">
                                        <div class="well">
                                            <table class="table" id="showgroupMessageTable">
                                                <thead>
                                                <tr style="font-size: 13px;">

                                                    <th>成员姓名</th>
                                                    <th>成员职责描述</th>
                                                    <th>成员所占权重</th>
                                                </tr>

                                                </thead>
                                                <tbody id="showAddgroupPramter">
                                                <tr>

                                                  <td><select  class="showgroupMemberName teacherName changeDis"><option value=""></option> </select></td>
                                                    <td><input type="text"  class="showgroupMemberSymbol changeDis"></td>
                                                    <td><input type="text"  class="showgroupMemberWeight changeDis"></td>

                                                </tr>
                                                </tbody>
                                            </table>
                                            <span style="float: right;"><button class="btn btn-success" id="showaddGroupMessage"><i class="fa fa-plus"></i></button></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary dismissagain" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary savemyApplyAgain">保存</button>
                        <button class="btn btn-primary btn-primary editApply" style="display: none">编辑</button>
                        <button class="btn btn-primary btn-primary editSubmit" style="display: none">提交</button>
                        <%--<input type="submit" value="提交">--%>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
      <%--  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" style="text-align: center" >
                            上传附件
                        </h4>
                    </div>
                    <div class="modal-body">
                        &lt;%&ndash;<div class="explain" style="margin-bottom: 5px;" >
                            特别提示：上传文件时，请传入合法格式的文件，“上传”与“提交”是两个不同操作，“上传”文件后，须检查无误后再行“提交”。一旦提交，不可更改；
                            没有“提交”之前，可以更新文件（须确保文件有修改，否则无法更新）。“上传”、“提交”之后，均可下载查阅。
                        </div>&ndash;%&gt;
                        <div class="form-group">
                            <label class="col-sm-3 control-label " >上传文件</label>

                            <div class="col-sm-9">
                                <input type="file" class="form-control" name="file" id="fileName"><hr/>
                                <input type="button" class="btn btn-primary commit" value="上传" style="float: right;">
                            </div>


                            <p>请上传小于20M的文件</p>

                        </div>

                    </div>
                    <!--
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

                                        </div>
                    -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>--%>

    </div>
</div>
