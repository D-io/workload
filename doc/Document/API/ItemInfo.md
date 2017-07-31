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


### 获取教师对应导入方式下指定状态的工作量信息
- 接口地址：`/item/info/teacherItems`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/teacherItems?importedRequired=1&status=1`

- 请求参数具体说明：
参数名 |类型 | 说明
---|---|---
importedRequired | int | 导入方式（申报类、导入类）
status | int | 状态值

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集
itemList | String | 条目列表
subjectList | String | 若为存疑或者拒绝状态有相应的消息队列

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
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
                "workload": 100,
                "groupManagerId": 3200223,
                "applyDesc": null,
                "jobDesc": "架构师",
                "jobDescList": null,
                "status": 1,
                "jsonChildWeight": "0.6",
                "childWeightList": null,
                "proof": 0,
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

### 获取工作量条目对应的消息队列
- 接口地址：`/item/info/subjectList`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/subjectList?itemId=11`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "subjectList": [
            {
                "subjectId": 2,
                "itemId": 11,
                "msgContent": "已经修改",
                "sendFromId": 3201456,
                "sendFromName": "罗惠琼",
                "sendTime": "2017年07月26日"
            },
            {
                "subjectId": 1,
                "itemId": 11,
                "msgContent": "应该为20",
                "sendFromId": 3210343,
                "sendFromName": "张翔",
                "sendTime": "2017年07月26日"
            }
        ]
    }
}
```

### 获取工作量条目对应的审核人修改工作量历史操作记录
- 接口地址：`/item/info/histories`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/histories?itemId=11`

- 请求参数具体说明：

参数名 |类型 | 说明
---|---|---
itemId | String | 条目编号（字符型）

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "historyList": [
            {
                "historyId": 2,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-07-27 16:14:43",
                "operation": "当前条目的工作量被审核人张翔于2017-07-27 16:14:43修改为55.0"
            },
            {
                "historyId": 3,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-07-27 18:14:43",
                "operation": "当前条目的工作量被审核人张翔于2017-07-27 18:14:43修改为40.0"
            }
        ]
    }
}
```
