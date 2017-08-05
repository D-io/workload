<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/21
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="x_panel" style="width: 100%;padding: 10px 17px;">
    <div class="x_title">
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-bars"></i>工作当量管理</a></li>
            <li class="active">工作当量审核</li>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
        </ol>
        <div class="clearfix"></div>
    </div>
    <div class="x_content" id="showapplyitem" style="display: block;">
        <div class="" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">申报审核情况</a>
                </li>
                <li role="presentation" class="" onclick="applyRec()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">查看历史记录</a>
                </li>

            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                </div>


            </div>
        </div>

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
                                        <label class="col-sm-3 control-label ">拒绝原因</label>
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
                    <button type="button" class="btn btn-primary" id="refucommit">提交</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

</div>
