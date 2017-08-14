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
            <li><a href="#"><i class="fa fa-bars"></i>工作当量管理</a></li>
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
                <li role="presentation"><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false"  onclick="showImportHis()">查看历史记录</a>
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
                            <th class="sorting">条目名称</th>
                            <th class="sorting">工作量</th>
                            <th class="sorting">计算公式</th>
                            <th class="sorting">形式</th>
                            <th class="sorting">主要参数</th>
                            <th class="sorting">其他参数</th>
                            <th class="sorting">版本</th>
                            <th class="sorting">复核截止时间 </th>
                            <th class="sorting">复核状态 </th>
                            <th class="sorting">操作</th>
                        </tr>
                        </thead>
                        <tbody class="reviewerRecTbody">
                        </tbody>
                    </table>
                  <%--  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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

--%>
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

                                                                <!--
                                                                                                                    <span style="float: right;"><a class="btn btn-success" id="addParameter"><i class="fa fa-plus"></i></a></span>
                                                                                                                    -->
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
                                                                <!--
                                                                                                                    <span style="float: right;"><a class="btn btn-success" id="addOtherParameter"><i class="fa fa-plus"></i></a></span>
                                                                                                                    -->
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



                                       <%-- <div class="form-group item_group" style="display: none;">
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

                                                                <th>成员姓名</th>
                                                                <th>成员职责描述</th>
                                                                <th>成员所占权重<span style="float: right;"><a class="btn btn-success" id="addGroupMessage"><i class="fa fa-plus"></i></a></span></th>
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
                                        </div>--%>




                                </div>


                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>


                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">

                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="importModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"></h4>
                    </div>
                    <div class="modal-body">
                        <%--<button class="add btn btn-primary" data-toggle="modal" data-target="#myModal">上传文件</button>
                        <div class="applymodalbody" style="height: 60%;">
                           &lt;%&ndash; <table class="showImportThead table dataTable no-footer table-bordered" style="display: none;">
                                <thead style="font-size: 14px;">
                                <tr role="row">
                                    <th>序号</th><th>文件名称</th><th>上传时间</th><th>提交状态</th><th>操作</th>
                                </tr>
                                </thead>
                                <tbody class="showImportDesc"></tbody>
                            </table>&ndash;%&gt;--%>
                        <div class="applymodalbody">
                            <table class="showImportTable table dataTable no-footer table-bordered" style="display: none;">
                            <thead style="font-size: 14px;">
                            <tr role="row">
                             <th>序号</th><th>条目名称</th><th>所属人</th><th>主要参数</th><th>其他参数</th><th>条目类别</th><th>成员职责描述（小组）</th><th>所占权重</th><th>工作量</th><th>提交状态</th><th>操作</th>;
                            </tr>
                            </thead>
                            <tbody class="showImportbodyList"></tbody>
                            </table>
                        </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" style="text-align: center" >
                            上传工作量统计文件
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="explain" style="margin-bottom: 5px;" >
                            特别提示：上传文件时，请传入合法格式的文件，“上传”与“提交”是两个不同操作，“上传”文件后，须检查无误后再行“提交”。一旦提交，不可更改；
                            没有“提交”之前，可以更新文件（须确保文件有修改，否则无法更新）。“上传”、“提交”之后，均可下载查阅。
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label " >上传文件</label>

                            <div class="col-sm-9">
                                <input type="file" class="form-control" id="file"><hr/>
                                <input type="button" class="btn btn-primary" id="commit" value="上传" style="float: right;">
                            </div>


                            <p>请上传小于20M的EXECLL文件</p>

                        </div>

                    </div>
                    <!--
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

                                        </div>
                    -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

    </div>
</div>
