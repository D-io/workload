## 工作量条目Item接口

### 管理员获取全部工作量条目信息（分页查询）
- 接口地址：`/item/info/item-all`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`http://127.0.0.1:8080/item/info/item-all?pageNum=1&pageSize=100&categoryId=2&status=1`
    - `/item/info/item-all?categoryId=3&status=1&ifExport=yes` //导出实例

- 请求参数具体说明：
参数名 |类型 | 说明 | 是否必须
---|---|---|---
pageNum | int | 页码编号 | 否
pageSize | int | 页的大小 | 否
categoryId | int | 类目编号 | 否 （查询条件）
status | int | 状态值 | 否（查询条件） 
ownerId | int | 教师Id | 否 （查询条件）
isExport | String | 是否导出 | 是即为yes

- PS.导出时不用输入页号pageNum和页的大小pageSize，不导出时不填ifExport属性

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集
pageCount | int | 总页码数
totalLines | long | 总的条数

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "pageCount": 8,
        "totalLines": 15,
        "itemList": [
            {
                "itemId": 1,
                "itemName": "213",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 2,
                "groupManagerId": 3210343,
                "applyDesc": "",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 1,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "0",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "张翔",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0,
                "isGroup": 1
            },
            {
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 2,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "ASDASDSA",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": null,
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0,
                "isGroup": 0
            }
        ]
    }
}
```

### 获取教师对应的类目下的工作量信息
- 接口地址：`/item/info/item-group`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/item-group?categoryId=2`

- 请求参数具体说明：
参数名 |类型 | 说明
---|---|---
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
        "itemList": [
            {
                "itemId": 3,
                "itemName": "工作量asdf",
                "categoryId": 10,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 5,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "教学",
                "importRequired": 0,
                "isGroup": 0
            }
        ]
    }
}
```

### 获取教师各自申报的工作量信息(Apply_Self)
- 接口地址：`/item/apply-list`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/apply-list`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集具体说明：

参数名 |类型 | 说明
---|---|---
subjectList | Json | 拒绝工作量申请的信息
abnormalItemList | json | 审核未通过条目
normalItemList | json | 正常条目

- Json返回成功示例如下：
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "subjectList": {
            "工作量": [
                {
                    "subjectId": 4,
                    "itemId": 4,
                    "msgContent": "你好",
                    "sendFromId": 3210343,
                    "sendFromName": "张翔",
                    "sendTime": "2017年07月18日"
                },
                {
                    "subjectId": 3,
                    "itemId": 4,
                    "msgContent": "有误",
                    "sendFromId": 3210343,
                    "sendFromName": "张翔",
                    "sendTime": "2017年07月16日"
                }
            ],
            "工作量asdf": [
                {
                    "subjectId": 1,
                    "itemId": 3,
                    "msgContent": "阿达",
                    "sendFromId": 3203158,
                    "sendFromName": "兰刚",
                    "sendTime": "2017年07月04日"
                },
                {
                    "subjectId": 2,
                    "itemId": 3,
                    "msgContent": "你好",
                    "sendFromId": 3203158,
                    "sendFromName": "兰刚",
                    "sendTime": "2017年07月04日"
                }
            ]
        },
        "normalItemList": [
            {
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 1,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "ASDASDSA",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": null,
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0,
                "isGroup": 0
            }
        ],
        "abnormalItemList": [
            {
                "itemId": 3,
                "itemName": "工作量asdf",
                "categoryId": 10,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 5,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "教学",
                "importRequired": 0,
                "isGroup": 0
            },
            {
                "itemId": 4,
                "itemName": "工作量",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 5,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0,
                "isGroup": 0
            }
        ]
    }
}
```

### 获取审核人导入的的工作量信息(Import)
- 接口地址：`/item/import-list`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/import-list`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集具体说明：

参数名 |类型 | 说明
---|---|---
subjectList | Json | 存疑的回复信息
abnormalItemList | json | 存疑条目
normalItemList | json | 正常条目

- Json返回成功示例如下：
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "subjectList": {
            "213": [],
            "工作量asdf": [
                {
                    "subjectId": 1,
                    "itemId": 3,
                    "msgContent": "阿达",
                    "sendFromId": 3203158,
                    "sendFromName": "兰刚",
                    "sendTime": "2017年07月04日"
                },
                {
                    "subjectId": 2,
                    "itemId": 3,
                    "msgContent": "你好",
                    "sendFromId": 3203158,
                    "sendFromName": "兰刚",
                    "sendTime": "2017年07月04日"
                }
            ]
        },
        "normalItemList": [
            {
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 1,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "ASDASDSA",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": null,
                "categoryName": "名字去去去去去去前期",
                "importRequired": 1,
                "isGroup": 0
            },
            {
                "itemId": 5,
                "itemName": "位",
                "categoryId": 3,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 0,
                "groupManagerId": 0,
                "applyDesc": null,
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 1,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": null,
                "categoryName": "乱码",
                "importRequired": 1,
                "isGroup": 0
            }
        ],
        "abnormalItemList": [
            {
                "itemId": 1,
                "itemName": "213",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 2,
                "groupManagerId": 3210343,
                "applyDesc": "",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 3,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "0",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "张翔",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 1,
                "isGroup": 1
            },
            {
                "itemId": 3,
                "itemName": "工作量asdf",
                "categoryId": 10,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 3,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "教学",
                "importRequired": 1,
                "isGroup": 0
            },
            {
                "itemId": 4,
                "itemName": "工作量",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 4,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 1,
                "isGroup": 0
            }
        ]
    }
}
```

### 获取教师审核通过的工作量信息汇总
- 接口地址：`/item/info/collection`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/collection`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集具体说明：

参数名 |类型 | 说明
---|---|---
subjectList | Json | 存疑的回复信息
abnormalItemList | json | 存疑条目
normalItemList | json | 正常条目

- Json返回成功示例如下：
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "itemDtoList": [
            {
                "itemId": 1,
                "itemName": "213",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 2,
                "groupManagerId": 3210343,
                "applyDesc": "",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 2,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "0",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "张翔",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0,
                "isGroup": 1
            },
            {
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 2,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": "ASDASDSA",
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": null,
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0,
                "isGroup": 0
            },
            {
                "itemId": 3,
                "itemName": "工作量asdf",
                "categoryId": 10,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": "[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]",
                "jobDescList": [
                    {
                        "userId": 3210343,
                        "jobDesc": "准备工作"
                    },
                    {
                        "userId": 5130121,
                        "jobDesc": "指导老师"
                    }
                ],
                "status": 2,
                "jsonChildWeight": "[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]",
                "childWeightList": [
                    {
                        "userId": 3210343,
                        "weight": 0.2
                    },
                    {
                        "userId": 5130121,
                        "weight": 0.8
                    }
                ],
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "教学",
                "importRequired": 0,
                "isGroup": 0
            }
        ],
        "totalWorkload": 222
    }
}
```

