# 8. RESTful接口

### 1、区块管理接口

* 接口地址: `/region`
* 支持格式：`html`
* 请求方式:  `GET` 
* 请求示例：`localhost:8080/region?regionName=manager/manager`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
regionName | String | 是 | 区块名称

* 返回形式具体说明：`html`

* html返回成功示例如下

```html
<div class="page-content-wrapper">
    <div class="page-content" >
     <h1 class="page-title note note-info" >
            <strong class="text-title">
                CCP与CO关联管理
            </strong>
        </h1>
        <div  class="container" >
            <div class="portlet box green">
                <div class="portlet title">
                    <div class="caption">
                        <div class="portlet-title">
                            CCP与CO关联管理
                        </div>
                    </div><!--caption-->
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div><!--portlet title-->
                <div class="portlet-body">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>CO1</th>
                            <th>CO2</th>
                            <th>CO3</th>
                            <th>CO4</th>
                            <th>CO5</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">CCP1.1</th>
                            <td ><input type="checkbox"></td>
                            <td ><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                        </tr>
                        <tr>
                            <th scope="row">CCP1.2</th>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 2、登入接口
* 接口地址: `/auth/login`
* 支持格式：`html`
* 请求方式:  `GET` 
* 请求示例：`localhost:8080/auth/login`
* 请求参数说明：`无`
* 返回形式具体说明：`重定向到主页`

### 3、登出接口
* 接口地址: `/auth/logout`
* 支持格式：`html`
* 请求方式:  `GET` 
* 请求示例：`localhost:8080/auth/logout`
* 请求参数说明：`无`
* 返回形式具体说明：`重定向到主页`

### 4、文件上传
* 接口地址: `/file`
* 支持格式：`json`
* 请求方式:  `POST` 
* 请求示例：`localhost:8080/file`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
file | file | 是 | 文件
fileId | int | 是 | 文件编号（系统可上传项的编号）

* 返回形式具体说明：`json`
* json返回成功示例如下

```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "fileInfo": {
      "fileInfoId": 4,
      "path": "/data/aems/实战 Jetty.pdf",
      "size": 1257261,
      "md5Summary": "f8dd935df7154cbf53b93e5bbbd1b83a",
      "type": "pdf",
      "createTime": 1497030427,
      "status": 2,
      "fileId": 1,
      "authorId": 2014220701009,
      "recipientsList": ""
    }
  }
}
```

### 5、文件下载
* 接口地址: `/file`
* 支持格式：`json`
* 请求方式:  `GET` 
* 请求示例：`localhost:8080/auth/logout`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
fileInfoId | int | 是 | 文件信息编号

* 返回形式：`application/octet-stream`

### 6、增加文件项
* 接口地址: `/file/info`
* 支持格式：`json`
* 请求方式:  `POST` 
* 请求示例：`localhost:8080/file/info?mime=pdf&size=10000000`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
mime | String | 否 | 文件格式类型
deadline | int | 否 | 上传截止日期
size | long | 否 | 可上传的最大文件大小

* 返回形式具体说明：`json`
* json返回成功示例如下

```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "fileInfo": {
      "fileInfoId": 4,
      "path": "/data/aems/实战 Jetty.pdf",
      "size": 1257261,
      "md5Summary": "f8dd935df7154cbf53b93e5bbbd1b83a",
      "type": "pdf",
      "createTime": 1497030427,
      "status": 2,
      "fileId": 1,
      "authorId": 2014220701009,
      "recipientsList": ""
    }
  }
}
