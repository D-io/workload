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
        <h2><i class="fa fa-bars"></i> 导入工作量 </h2>
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
                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">导入文件</a>
                </li>
                <li role="presentation" class="" onclick="importRec()"><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">提交条目</a>
                </li>
                <li role="presentation" class="" onclick="importQue()"><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">存疑条目</a>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                </div>
                <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">

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
                            <form id="uploadForm">
                                <div class="col-sm-9">
                                    <input type="file" class="form-control" id="fileName"><hr/>
                                    <button  class="btn btn-primary commit" style="float: right;">提交</button>
                                </div>

                            </form>
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
