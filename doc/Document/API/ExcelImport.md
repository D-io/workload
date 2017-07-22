## 工作量信息Excel导入

### 导入指定格式的Excel接口
- 接口地址：`/file/import`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/file/import?categoryId=2&fileInfoId=4`

- 请求参数说明：
参数名 |类型 | 说明
---|---|---
fileInfoId | int | 上传的文件编号
categoryId | int | 类目编号


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
        },
        "itemList": [
            {
                "itemId": 36,
                "itemName": "计网",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "A:12,B:12",
                "workload": 4.800000000000001,
                "groupManagerId": 5130121,
                "applyDesc": null,
                "jobDesc": "负责准备工作",
                "status": 1,
                "jsonChildWeight": "0.2",
                "proof": "工作量导入模板-v1.0 - 副本.xlsx",
                "isGroup": 1
            },
            {
                "itemId": 37,
                "itemName": "计组",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "A:50,B:60",
                "workload": 110,
                "groupManagerId": 5130121,
                "applyDesc": null,
                "jobDesc": "教学",
                "status": 1,
                "jsonChildWeight": "1.0",
                "proof": "工作量导入模板-v1.0 - 副本.xlsx",
                "isGroup": 0
            }
        ],
        "errorData": {}
    }
}
```


