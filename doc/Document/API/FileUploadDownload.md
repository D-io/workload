## 文件管理接口

### 文件上传接口
- 接口地址：`/file`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/file?fileId=4`

- 请求参数说明：
参数名 |类型 | 说明
---|---|---
fileId | int | 对应的管理员发布的文件编号
file | File | 对应的需要上传的文件

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "fileInfo": {
            "fileInfoId": 4,
            "path": "C:\\Users\\Administrator\\Desktop\\fileUploadTest\\工作量导入模板-v1.0 - 副本.xlsx",
            "size": 11105,
            "md5Summary": "b5b888418f082227a3c94d93fc7e1434",
            "type": "xlsx",
            "createTime": 1500688680,
            "status": 0,
            "fileId": 4,
            "authorId": 3210343,
            "recipientsList": ""
        }
    }
}
```


### 文件下载
- 接口地址：`/file`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/file?fileInfoId=4`

- 请求参数说明：
参数名 |类型 | 说明 | 是否必须
---|---|---
fileInfoId | int | 对应的上传的文件编号 | 否


### 文件提交(修改相应的状态信息)
- 接口地址：`/file/submit`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/file/submit?fileInfoId=4`

- 请求参数说明：
参数名 |类型 | 说明 | 是否必须
---|---|---
fileInfoId | int | 对应的上传的文件编号 | 否

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "fileInfo": {
            "fileInfoId": 4,
            "path": "C:\\Users\\Administrator\\Desktop\\fileUploadTest\\工作量导入模板-v1.0 - 副本.xlsx",
            "size": 11105,
            "md5Summary": "b5b888418f082227a3c94d93fc7e1434",
            "type": "xlsx",
            "createTime": 1500688680,
            "status": 1,
            "fileId": 4,
            "authorId": 3210343,
            "recipientsList": ""
        }
    }
}
```