<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/7/17
  Time: 19:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

                       <div class="x_panel">
                  <div class="x_title">
                    <h2>重置审核人&nbsp;&nbsp;<small>审核状态</small></h2>
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
                   
                    <div id="datatable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                    <div class="row">
                    <div class="col-sm-6">
                    <div class="dataTables_length" id="datatable_length"><label>显示<select name="datatable_length" aria-controls="datatable" class="form-control input-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    </select> 条重置申请
                    </label>
                    </div>
                    </div>
                    <div class="col-sm-6">
                    <div id="datatable_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control input-sm" placeholder="" aria-controls="datatable">
                    </label>
                    </div>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-sm-12">
                    <table id="datatable" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info">
                      <thead>
                        <tr role="row">
                        <th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" style="width: 50px;">序号</th>
                        <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 78px;">审核人</th>
                        <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 78px;">复核人</th>
                        <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Age: activate to sort column descending" aria-sort="ascending" style="width: 360px;">审核条目</th>
                        <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 83px;">重置状态 </th>
                        <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 183px;">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        
           
                      <tr role="row" class="odd">
                          <td class="">1</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"><a href="#" class="btn btn-primary btn-xs" style="float: right;"><i class="fa fa-folder"></i> 查看详情 </a></td>
                          <td> <button type="button" class="btn btn-success btn-xs">Success</button></td>
                          <td>
                            <a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 重置申请人 </a>
                            <a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 重置审核人 </a>
                            </td>
                        </tr>
                        <tr role="row" class="even">
                          <td class="">2</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"><a href="#" class="btn btn-primary btn-xs" style="float: right;"><i class="fa fa-folder"></i> 查看详情 </a></td>
                          <td><button type="button" class="btn btn-success btn-xs">Success</button></td>
                          <td> <a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 重置申请人 </a>
                            <a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 重置审核人 </a></td>
                        </tr>
                        <tr role="row" class="odd">
                          <td class="">3</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"><a href="#" class="btn btn-primary btn-xs" style="float: right;"><i class="fa fa-folder"></i> 查看详情 </a></td>
                          <td><button type="button" class="btn btn-success btn-xs">Success</button></td>
                          <td><a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 重置申请人 </a>
                            <a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 重置审核人 </a></td>
                        </tr><tr role="row" class="even">
                          <td class="">4</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr role="row" class="odd">
                          <td class="">5</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr role="row" class="even">
                          <td class="">6</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr><tr role="row" class="odd">
                          <td class="">7</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr><tr role="row" class="even">
                          <td class="">8</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr><tr role="row" class="odd">
                          <td class="">9</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr><tr role="row" class="even">
                          <td class="">10</td>
                          <td class=""></td>
                          <td></td>
                          <td class="sorting_1"></td>
                          <td></td>
                          <td></td>
                        </tr>
                        
                        </tbody>
                    </table>
                    </div>
                    </div>
                     <div class="row">
                <div class="col-sm-5">
                <div class="dataTables_info" id="datatable-checkbox_info" role="status" aria-live="polite">共57条重置申请</div>
                </div>
                <div class="col-sm-7">
                <div class="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                <ul class="pagination">
                <li class="paginate_button previous disabled" id="datatable_previous">
                <a href="#" aria-controls="datatable" data-dt-idx="0" tabindex="0">前一页</a>
                </li>
                <li class="paginate_button active">
                <a href="#" aria-controls="datatable" data-dt-idx="1" tabindex="0">1</a>
                </li>
                <li class="paginate_button ">
                <a href="#" aria-controls="datatable" data-dt-idx="2" tabindex="0">2</a>
                </li>
                <li class="paginate_button ">
                <a href="#" aria-controls="datatable" data-dt-idx="3" tabindex="0">3</a>
                </li>
                <li class="paginate_button ">
                <a href="#" aria-controls="datatable" data-dt-idx="4" tabindex="0">4</a>
                </li>
                <li class="paginate_button ">
                <a href="#" aria-controls="datatable" data-dt-idx="5" tabindex="0">5</a>
                </li>
                <li class="paginate_button ">
                <a href="#" aria-controls="datatable" data-dt-idx="6" tabindex="0">6</a>
                </li>
                <li class="paginate_button next" id="datatable_next"><a href="#" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
                </li>
                </ul>
                </div>
                </div>

              </div>
                    </div>
                  </div>
                </div>


    
