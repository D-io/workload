## 工作量信息Excel导入

- /**
-	 * 导入Excel中的信息到数据库 （提交文件） </br>
-	 *
-	 * 三个步骤： </br>
-	 * 1、先根据文件要求上传文件；</br>
-	 * 2、提交文件之后进行Excel的信息导入数据库的操作； </br>
-	 * 3、导入之后查看导入的工作量列表进行确认；</br>
-	 * 4、确认无误后进行提交工作量的操作 </br>
-	 *
-	 * PS.导入的格式待确定 格式不同对应的计算方式不同
-	 *
-	 * @param fileInfoId 文件信息编号
-	 * @return RestResponse
-	 */



### 获取不同类目对应的Excel模板
- 接口地址：`/file/template`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/file/template?categoryId=3&type=isGroup`

- 请求参数说明：
参数名 |类型 | 说明
---|---|---
categoryId | int | 类目编号
type | String | 模板类型（single或group）小组还是个人

- 返回参数具体说明：文件流



### 导入指定格式的Excel接口（v1.1)  请使用该接口
- 接口地址：`/file/import-template`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/file/import-template?categoryId=3&fileInfoId=5`

- 请求参数说明：
参数名 |类型 | 说明
---|---|---
categoryId | int | 类目编号
fileInfoId | int | 上传的文件编号

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
            "fileInfoId": 6,
            "path": "C:\\Users\\Administrator\\Desktop\\fileUploadTest\\个人教学、教研、教改成果奖（含教学竞赛）工作量导入模板.xlsx",
            "size": 18944,
            "md5Summary": "7dbf0ba39eb39a1f328fa0b06619745",
            "type": "xlsx",
            "createTime": 1501147169,
            "status": 1,
            "fileId": 4,
            "authorId": 3210343,
            "recipientsList": ""
        },
        "itemList": [
            {
                "itemId": 14,
                "itemName": "团队国家奖",
                "categoryId": 22,
                "ownerId": 3210343,
                "jsonParameter": "[{\"symbol\":\"A\",\"value\":3.0},{\"symbol\":\"B\",\"value\":1.0},{\"symbol\":\"C\",\"value\":1.0}]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 3
                    },
                    {
                        "symbol": "B",
                        "value": 1
                    },
                    {
                        "symbol": "C",
                        "value": 1
                    }
                ],
                "workload": 120,
                "groupManagerId": 3200223,
                "applyDesc": null,
                "jobDesc": "架构师",
                "jobDescList": null,
                "status": 0,
                "jsonChildWeight": "0.6",
                "childWeightList": null,
                "proof": "个人教学、教研、教改成果奖（含教学竞赛）工作量导入模板.xlsx",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "谭浩",
                "categoryName": "个人教学、教研、教改成果奖（含教学竞赛）",
                "importRequired": 1,
                "isGroup": 1,
                "otherJson": "[{\"key\":\"获奖项目\",\"value\":\"AEMS\"},{\"key\":\"获奖名称\",\"value\":\"创新奖\"}]",
                "otherJsonParameters": [
                    {
                        "key": "获奖项目",
                        "value": "AEMS"
                    },
                    {
                        "key": "获奖名称",
                        "value": "创新奖"
                    }
                ]
            },
            {
                "itemId": 15,
                "itemName": "团队国家奖",
                "categoryId": 22,
                "ownerId": 3203158,
                "jsonParameter": "[{\"symbol\":\"A\",\"value\":3.0},{\"symbol\":\"B\",\"value\":1.0},{\"symbol\":\"C\",\"value\":1.0}]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 3
                    },
                    {
                        "symbol": "B",
                        "value": 1
                    },
                    {
                        "symbol": "C",
                        "value": 1
                    }
                ],
                "workload": 80,
                "groupManagerId": 3200223,
                "applyDesc": null,
                "jobDesc": "程序员",
                "jobDescList": null,
                "status": 0,
                "jsonChildWeight": "0.4",
                "childWeightList": null,
                "proof": "个人教学、教研、教改成果奖（含教学竞赛）工作量导入模板.xlsx",
                "teacherName": "兰刚",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "谭浩",
                "categoryName": "个人教学、教研、教改成果奖（含教学竞赛）",
                "importRequired": 1,
                "isGroup": 1,
                "otherJson": "[{\"key\":\"获奖项目\",\"value\":\"AEMS\"},{\"key\":\"获奖名称\",\"value\":\"创新奖\"}]",
                "otherJsonParameters": [
                    {
                        "key": "获奖项目",
                        "value": "AEMS"
                    },
                    {
                        "key": "获奖名称",
                        "value": "创新奖"
                    }
                ]
            }
        ],
        "errorData": {}
    }
}
```

### 导入指定格式的Excel接口（v1.0）
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


