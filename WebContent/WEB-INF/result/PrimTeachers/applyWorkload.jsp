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
            <li class="active curentPage" id="WorkloadApply">工作当量申报</li>
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
                            <th class="sorting">序号</th>
                            <th class="sorting">项目名称</th>
                            <th class="sorting">工作当量</th>
                            <th class="sorting">形式</th>
                            <th class="sorting">审核截止时间 </th>
                            <th class="sorting">审核状态 </th>
                            <th class="sorting">操作</th>
                        </tr>
                        </thead>
                        <tbody class="reviewerRecTbody">
                        </tbody>
                    </table>
                </div>

                <div class="modal fade" id="viewdetail_apply" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="display: none;">
                    <div class="modal-dialog" role="document" style="min-width: 700px">
                        <div class="modal-content">
                            <div class="modal-header" style="position: relative">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                </button>
                                <div class="header">
                                    <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class="current-page">工作当量申报&nbsp;/&nbsp;查看详情</span></p>
                                    <p class="project"></p>
                                    <p class="message"></p>
                                </div>
                            </div>
                            <div class="modal-body">
                                <table  class="table table-striped table-bordered dataTable no-footer checkedView">
                                    <thead>
                                    <tr role="row">
                                        <th class="sorting">申报描述</th>
                                        <th class="sorting">计算公式</th>
                                        <th class="sorting">计算参数</th>
                                        <th class="sorting">项目属性</th>
                                        <th class="sorting groupWeight">成员权重</th>
                                        <th class="sorting groupDesc">职责描述</th>
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

        <div class="modal fade bs-example-modal-lg" id="applyModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <div class="modal-title" id="myModalLabel"></div>
                    </div>
                    <div class="modal-body">
                        <button class="add btn btn-primary" data-toggle="modal" data-target="#addContent">添加申报</button>
                        <div class="applymodalbody" style="height: 60%;">

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="addContent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目名称<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control" id="itemName" name="name" onblur="reminder(this)">
                                </div>
                            </div>
                            <span class="experient" id="experient_name" >项目名称不可为空！</span>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目描述<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea class="form-control" id="applyDesc" name="desc" onblur="reminder(this)"></textarea>
                                </div>
                            </div>
                            <span class="experient" id="experient_desc" >项目简介不可为空！</span>

                            <div class="applyradio">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                </label>
                                <label>
                                    <input type="radio"  value="0"  name="optionsRadios" class="radioChange" id="mysingle"> 个人申报
                                </label>
                                <label>
                                    <input type="radio"  value="1"  name="optionsRadios" class="radioChange" id="mygroup"> 小组申报
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">主要参数<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">


                                        <div class="well">
                                            <table class="table" id="parameterTable">
                                                <thead>
                                                <tr class="parameterTh" style="font-size: 13px;">

                                                </tr>

                                                </thead>
                                                <tbody class="AddPramter">


                                                </tbody>
                                            </table>
                                        </div>

                                </div>
                            </div>
                            <span class="experient" id="experient_para" >主要参数不可为空！</span>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附加属性<span class="needed">*</span></label>
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
                            <span class="experient" id="experient_otherpara" >附加属性不可为空！</span>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附件信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <span class='filestyle'><input type="file" name='testfile' id='testfile' style="float: left; outline: none;"><span class="showhidden"></span></span>

                                </div>
                            </div>
                            <div class="form-group item_manager" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目组长</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName" id="itemmanager">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group item_group" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目成员<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                  <%--  <a class="btn btn-primary" role="button" data-toggle="collapse" href="#groupMessage" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="fa fa-plus"></i>
                                    </a>--%>

                                        <div class="well">
                                            <table class="table" id="groupMessageTable">
                                                <thead>
                                                <tr style="font-size: 13px;">

                                                    <th style="width: 115px">成员姓名</th>
                                                    <th style="width: 120px">职责描述</th>
                                                    <th style="width: 140px">所占权重<span style="float: right;"><button type="button" class="btn btn-primary" id="calculator" title="计算工作当量"><i class="fa fa-calculator"></i></button><button type="button" class="btn btn-success" id="addGroupMessage" title="添加成员"><i class="fa fa-plus"></i></button></span></th>
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
                            <span class="experient" id="experient_group" >项目成员信息不可为空！</span>
                            <span class="experient" id="experient_weight" >项目成员权重请填写小数且相加应为1！</span>
                            <div class="form-group groupDiv" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">成员工作当量</label>
                                <div class="col-md-9 col-sm-9 col-xs-12 team-member">

                                    <div class="well">
                                        <table class="table" id="groupWorkloadTable">
                                            <thead>
                                            <tr style="font-size: 13px;">

                                                <th style="text-align: center">成员姓名</th>
                                                <th style="text-align: center">工作当量</th>
                                                <%--  <th>成员所占权重</th>--%>
                                            </tr>

                                            </thead>
                                            <tbody id="groupWorkload">

                                            </tbody>
                                        </table>
                                        <%--   <span style="float: right;"><button class="btn btn-success" id="showaddGroupMessage" title="添加成员"><i class="fa fa-plus"></i></button></span>
                                   --%>    </div>

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
        <div class="modal fade" id="showContent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目名称<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control changeDis" id="showitemName" name="showname" onblur="reminder(this)">
                                </div>
                            </div>
                            <span class="experient" id="experient_showname" >项目名称不可为空！</span>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目简介<span class="needed">*</span>
                                </label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea class="form-control changeDis" id="showapplyDesc" name="showdesc" onblur="reminder(this)"></textarea>
                                </div>
                            </div>
                            <span class="experient" id="experient_showndesc" >项目简介不可为空！</span>
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">主要参数<span class="needed">*</span></label>
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
                            <span class="experient" id="experient_showpara" >主要参数不可为空！</span>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附加属性<span class="needed">*</span></label>
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
                            <span class="experient" id="experient_showotherpara" >附加属性不可为空！</span>

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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目组长</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName changeDis select2" id="showitemmanager">

                                    </select>
                                </div>
                            </div>

                            <div class="form-group showitem_group" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目成员<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12 team-member">

                                        <div class="well">
                                            <table class="table" id="showgroupMessageTable">
                                                <thead>
                                                <tr style="font-size: 13px;">

                                                    <th style="width: 115px">成员姓名</th>
                                                    <th style="width: 120px">职责描述</th>
                                                    <th style="width: 140px">所占权重 <span style="float: right;"><button type="button" class="btn btn-primary" id="showcalculator" title="计算工作当量"><i class="fa fa-calculator"></i></button><button type="button" class="btn btn-success" id="showaddGroupMessage" title="添加成员"><i class="fa fa-plus"></i></button></span>
                                                    </th>
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
                                              </div>

                                </div>
                            </div>
                            <span class="experient" id="experient_showgroup" >项目成员信息不可为空！</span>
                            <span class="experient" id="experient_showweight" >项目成员权重请填写小数且相加应为1！</span>
                            <div class="form-group showgroupDiv" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">成员工作当量</label>
                                <div class="col-md-9 col-sm-9 col-xs-12 team-member">

                                    <div class="well">
                                        <table class="table" id="showgroupWorkloadTable">
                                            <thead>
                                            <tr style="font-size: 13px;">

                                                <th style="text-align: center">成员姓名</th>
                                                <th style="text-align: center">工作当量</th>
                                              <%--  <th>成员所占权重</th>--%>
                                            </tr>

                                            </thead>
                                            <tbody id="showgroupWorkload">

                                            </tbody>
                                        </table>
                                     <%--   <span style="float: right;"><button class="btn btn-success" id="showaddGroupMessage" title="添加成员"><i class="fa fa-plus"></i></button></span>
                                --%>    </div>

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
        <div class="modal fade" id="refuse_To_Apply" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" >
                            申报信息
                            <span class="cateName" style="font-size: 14px;"></span>
                        </h4>
                    </div>
                    <div class="modal-body">

                        <form class="form-horizontal form-label-left">

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目名称<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input type="text" class="form-control" id="applyAgainName" name="apply_name" onblur="reminder(this)">
                                </div>
                            </div>
                            <span class="experient" id="experient_apply_name" >项目名称不可为空！</span>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目描述<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea class="form-control" id="applyAgainDesc" name="apply_desc" onblur="reminder(this)"></textarea>
                                </div>
                            </div>
                            <span class="experient" id="experient_apply_desc" >项目简介不可为空！</span>

                            <div class="radio">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                </label>
                                <label>
                                    <input type="radio"  value="0"  name="applyRadios" class="applyRadios" id="is_single"> 个人申报
                                </label>
                                <label>
                                    <input type="radio"  value="1"  name="applyRadios" class="applyRadios" id="is_group"> 小组申报
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">主要参数<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">


                                    <div class="well">
                                        <table class="table" id="parameterApplyTable">
                                            <thead class="applyparameterTh" style="font-size: 13px">


                                            </thead>
                                            <tbody class="AddPramter">


                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <span class="experient" id="experient_applyAgainpara" >主要参数不可为空！</span>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附加属性<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <div class="well">
                                        <table class="table" id="otherApplyparameterTable">
                                            <thead class="applyotherParaTh" style="font-size: 13px;">

                                            </thead>
                                            <tbody id="addApplyOtherPramter">

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <span class="experient" id="experient_otherApplypara" >附加属性不可为空！</span>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">附件信息</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <span class='filestyle'><input type="file" name='applyfile' id='applyfile' style="float: left; outline: none;"><span class="showhiddenapply"></span></span>

                                </div>
                            </div>
                            <div class="form-group item_apply_manager" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目组长</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select class="form-control teacherName" id="applyitemmanager">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group item_apply_group" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">项目成员<span class="needed">*</span></label>
                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <%--  <a class="btn btn-primary" role="button" data-toggle="collapse" href="#groupMessage" aria-expanded="false" aria-controls="collapseExample">
                                          <i class="fa fa-plus"></i>
                                      </a>--%>

                                    <div class="well">
                                        <table class="table" id="groupApplyMessageTable">
                                            <thead>
                                            <tr style="font-size: 13px;">

                                                <th style="width: 115px">成员姓名</th>
                                                <th style="width: 120px">职责描述</th>
                                                <th style="width: 140px">所占权重<span style="float: right;"><button type="button" class="btn btn-primary" id="applyCalculator" title="计算工作当量" style="display: none;"><i class="fa fa-calculator"></i></button><button type="button" class="btn btn-success" id="applyAddGroupMessage" title="添加成员"><i class="fa fa-plus"></i></button></span></th>
                                            </tr>

                                            </thead>
                                            <tbody id="AddgroupApplyPramter">

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <span class="experient" id="experient_applygroup" >项目成员信息不可为空！</span>
                            <span class="experient" id="experient_applyweight" >项目成员权重请填写小数且相加应为1！</span>
                            <div class="form-group applygroupDiv" style="display: none;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">成员工作当量</label>
                                <div class="col-md-9 col-sm-9 col-xs-12 team-member">

                                    <div class="well">
                                        <table class="table" id="applyWorkloadTable">
                                            <thead>
                                            <tr style="font-size: 13px;">

                                                <th style="text-align: center">成员姓名</th>
                                                <th style="text-align: center">工作当量</th>
                                                <%--  <th>成员所占权重</th>--%>
                                            </tr>

                                            </thead>
                                            <tbody id="apply_Workload">

                                            </tbody>
                                        </table>
                                        <%--   <span style="float: right;"><button class="btn btn-success" id="showaddGroupMessage" title="添加成员"><i class="fa fa-plus"></i></button></span>
                                   --%>    </div>

                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary applydismiss" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary applySave">保存</button>
                        <%--   <button type="button" class="btn btn-primary saveAgain" style="display: none">保存</button>--%>
                        <button type="button" class="btn btn-primary applyeditor">编辑</button>
                        <%--<button type="button" class="btn btn-primary applysubmit">提交</button>--%>
                        <%--<input type="submit" value="提交">--%>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</div>
