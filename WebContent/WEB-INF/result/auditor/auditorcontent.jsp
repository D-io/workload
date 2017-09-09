<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/20
  Time: 16:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bar-chart"></i>工作当量管理</a></li>
            <li class="active curentPage" id="Workloadimport">工作当量导入</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
     <!--   <div class="clearfix"></div>-->
    </div>
    <div class="x_content">


        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">导入工作当量</a>
                </li>
                <li role="presentation"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false"  onclick="showimportRec()">导入复核情况</a>
                </li>
                <li role="presentation"><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false"  onclick="showImportHis()">查看操作日志</a>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec" style="display: none;font-size: 14px;">
                        <thead>
                        <tr role="row">
                            <th class="sorting">序号</th>
                            <th class="sorting">教师姓名</th>
                            <th class="sorting">项目名称</th>
                            <th class="sorting">工作当量</th>
                            <th class="sorting">申报形式</th>
                            <th class="sorting">复核截止时间 </th>
                            <th class="sorting">复核状态 </th>
                            <th class="sorting">操作</th>
                        </tr>
                        </thead>
                        <tbody class="reviewerRecTbody">
                        </tbody>
                    </table>

                    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times;
                                    </button>
                                    <h4 class="modal-title" >
                                        修改工作量条目
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <button class="btn btn-primary btn-info editApplyInfo"><i class="fa fa-pencil"></i>编辑</button>
                                    <button class="btn btn-primary btn-success editorSubmit"><i class="fa fa-pencil"></i>提交</button>

                                    <form class="form-horizontal form-label-left">

                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">主要考核参数</label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">

                                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#parameter" aria-expanded="false" aria-controls="collapseExample">
                                                    <i class="fa fa-plus"></i>
                                                </a>
                                                <div class="collapse" id="parameter">
                                                    <div class="well">
                                                        <table class="table" id="parameterTable">
                                                            <thead>
                                                            <tr class="parameterTh" style="font-size: 13px;">

                                                            </tr>

                                                            </thead>
                                                            <tbody class="AddPramter">
                                                            <tr class="editorPram">

                                                            </tr>


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">其他附加信息</label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">

                                                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#otherparameter" aria-expanded="false" aria-controls="collapseExample">
                                                    <i class="fa fa-plus"></i>
                                                </a>
                                                <div class="collapse" id="otherparameter">
                                                    <div class="well">
                                                        <table class="table" id="otherparameterTable">
                                                            <thead>
                                                            <tr class="otherParaTh" style="font-size: 13px;">

                                                            </tr>

                                                            </thead>
                                                            <tbody id="AddOtherPramter">
                                                            <tr class="editorotherPara"></tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">回复信息</label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" class="form-control changeDis" id="showitemName">
                                            </div>
                                        </div>
                                    </form>
                                        </div>

                                </div>


                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">
                    <table class="table table-striped table-bordered dataTable no-footer reviewerRec">
                    <thead>
                    <tr role="row">
                        <th class="sorting" width="31px">序号</th>
                        <th class="sorting" width="130px;">操作时间</th>
                        <th class="sorting" style="width: 60px;">操作人员</th>
                        <th class="sorting">操作内容</th>

                       <%-- <th class="sorting">操作形式</th>--%>

                    </tr>
                    </thead>
                    <tbody class="historyRecTbody">
                    </tbody>
                </table>
                </div>

                </div>

            </div>

        <div class="modal fade" id="viewdetail_import" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog" role="document" style="min-width: 700px">
                <div class="modal-content">
                    <div class="modal-header" style="position: relative">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <div class="header">
                            <p class='page-nav'><i class='fa fa-bar-chart'></i>&nbsp;我的工作当量&nbsp;/&nbsp;<span class="current-page">工作当量导入&nbsp;/&nbsp;查看详情</span></p>
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
                            </tr>
                            </thead>
                            <tbody class="viewDetailbody">
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="importNewModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel"></h4>
                </div>
                <div class="modal-body">

                    <span>
                            <input type="file" class=" col-md-9 col-sm-9 col-xs-12" id="file" style="    padding: 6px 12px;line-height: 1.42857143;color: #555;margin-bottom:10px;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px; outline: none;">
                            <div class="control-label col-md-3 col-sm-3 col-xs-12">
                                <button class="btn btn-primary importNewFile" title="上传文件" style="position: relative; top: 7px; font-size: 14px;"><i class="fa fa-file"></i></button>
                                <button class="btn btn-primary addNewItem" title="添加项目"  data-toggle="modal" data-target="#addContent" style="position: relative; top: 7px; font-size: 14px;"><i class="fa fa-plus"></i></button>
                                 <button class="btn btn-success submitItem" title="提交项目" style="display: none; position: relative; top: 7px; font-size: 14px;"><i class="fa fa-check-square-o"></i></button>

                            </div>

                    </span>

                    <div>
                        <table class="table table-striped table-bordered dataTable no-footer importItemShow" style="display: none;">
                            <thead>
                            <tr role="row">
                                 <th class="sorting"><input type="checkbox" name="checkbox1" value="checkbox" class="submitall" ></th>
                                <th class="sorting">项目名称</th>
                                <th class="sorting">工作当量</th>
                                <th class="sorting">教师姓名</th>
                                <th class="sorting">状态</th>
                                <th class="sorting">操作</th>
                            </tr>
                            </thead>
                            <tbody class="importItemTbody">
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    </div>
    <div class="modal fade" id="addContent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h5 class="modal-title" >
                        项目信息
                    </h5>
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
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">项目描述
                            </label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <textarea class="form-control" id="applyDesc"></textarea>
                            </div>
                        </div>

                        <div class="radio">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">
                            </label>
                            <label>
                                <input type="radio"  value="0"  name="optionsRadios" class="radioChange" id="isSingle"> 个人形式
                            </label>
                            <label>
                                <input type="radio"  value="1"  name="optionsRadios" class="radioChange" id="isGroup"> 小组申形式
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">项目成员</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <select class="form-control teacherName" id="itemMember">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">主要参数</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">

                                    <div class="well">
                                        <table class="table" id="mainparameterTable">
                                            <thead class="parameterThead">
                                               </thead>
                                            <tbody class="AddPramter">


                                            </tbody>
                                        </table>
                                    </div>
                             <%--   </div>--%>
                            </div>
                        </div>
                        <div class="form-group hiddenRequired">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">附加属性</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                    <div class="well">
                                        <table class="table" id="addotherparameterTable">
                                            <thead class="otherParaThead">


                                            </thead>
                                            <tbody id="addotherparamter">

                                            </tbody>
                                        </table>
                                    </div>
                              <%--  </div>--%>
                            </div>
                        </div>
                        <div class="form-group required" style="display: none">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">职责描述</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" id="jobDesc">
                            </div>
                        </div>
                        <div class="form-group required" style="display: none">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">所占权重</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" id="childWeight">
                            </div>
                        </div>

                        <div class="form-group item_manager required" style="display: none;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">项目负责人</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <select class="form-control teacherName" id="itemmanager">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary dismiss" data-dismiss="modal" style="display:none">取消</button>
                    <button type="button" class="btn btn-success savemyEdit" style="display:none">保存</button>
                    <button class="btn btn-primary editor">编辑</button>
                    <button class="btn btn-primary submitTo">提交</button>
                    <%--<input type="submit" value="提交">--%>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

</div>
</div>
</div>
