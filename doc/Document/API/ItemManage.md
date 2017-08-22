## 工作量条目Item接口

### 管理员修正条目统计的部分信息（条目名称 和 其他参数）
- 接口地址:`/item/manage/coorect`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`http://127.0.0.1:8080/item/manage/correct?itemId=27&itemName=信息安全大赛&otherParams=[{"key":"竞赛名称","value":"创新杯"},{"key":"参赛项目","value":"AEMS"},{"key":"类型（团队或个人）","value":"团队"},{"key":"获奖级别","value":"国家奖"},{"key":"赛事级别","value":"国家级"}]`
- 请求参数具体说明：

参数名 | 类型 | 说明 | 备注
---|---|---|---
itemId | int | 工作量条目编号 | 必填
itemName | String | 工作量条目名称 | 可选
otherParams | String | 工作量条目其他参数 | 可选

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
        "itemDto": {
            "itemId": 27,
            "itemName": "信息安全大赛",
            "categoryId": 33,
            "ownerId": 3210343,
            "jsonParameter": "[{\"symbol\":\"A\",\"value\":1.0},{\"symbol\":\"B\",\"value\":1.0}]",
            "parameterValues": [
                {
                    "symbol": "A",
                    "value": 1
                },
                {
                    "symbol": "B",
                    "value": 1
                }
            ],
            "workload": 11.2,
            "groupManagerId": 3210343,
            "applyDesc": null,
            "jobDesc": "指导老师",
            "jobDescList": null,
            "status": 1,
            "jsonChildWeight": "0.8",
            "childWeightList": null,
            "proof": 22,
            "teacherName": "张翔",
            "reviewerId": 3203753,
            "reviewerName": "蔡竟业",
            "groupManagerName": "张翔",
            "categoryName": "学生竞赛",
            "importRequired": 0,
            "isGroup": 1,
            "version": "2017-2018-1",
            "otherJson": "[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"AEMS\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]",
            "formula": "10*A+4*B",
            "paramDesc": [
                {
                    "desc": "团体赛（指导参赛队伍数）",
                    "symbol": "A"
                },
                {
                    "desc": "个人赛（指导参赛人数）",
                    "symbol": "B"
                }
            ],
            "descAndValues": [
                {
                    "desc": "团体赛（指导参赛队伍数）",
                    "value": 1
                },
                {
                    "desc": "个人赛（指导参赛人数）",
                    "value": 1
                }
            ],
            "otherJsonParameters": [
                {
                    "key": "竞赛名称",
                    "value": "创新杯"
                },
                {
                    "key": "参赛项目",
                    "value": "AEMS"
                },
                {
                    "key": "类型（团队或个人）",
                    "value": "团队"
                },
                {
                    "key": "获奖级别",
                    "value": "国家奖"
                },
                {
                    "key": "赛事级别",
                    "value": "国家级"
                }
            ]
        }
    }
}
```

### 添加工作量条目信息/修改工作量条目信息
- 接口地址:`/item/manage`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/item/manage?itemName=workload&categoryId=33&ownerId=3210343&jsonParameter=[ {"symbol": "A", "value": 12}, { "symbol": "B", "value": 12 } ]&groupManagerId=5130121&applyDesc=描述一下&jobDesc=[{"userId": 3210343,"jobDesc": "准备工作" }, {"userId": 5130121,"jobDesc": "指导老师" }]&jsonChildWeight=[{"userId": 3210343,"weight":0.2}, {"userId": 5130121,"weight":0.8 }]&isGroup=1&otherJson=[{"key":"竞赛名称","value":"创新杯"},{"key":"参赛项目","value":"基于xxx"},{"key":"类型（团队或个人）","value":"团队"},{"key":"获奖级别","value":"国家奖"},{"key":"赛事级别","value":"国家级"}]`

- 请求示例：`localhost:8080/item/manage?itemId=23&itemName=workload&categoryId=33&ownerId=3210343&jsonParameter=[ {"symbol": "A", "value": 12}, { "symbol": "B", "value": 12 } ]&groupManagerId=5130121&applyDesc=描述一下&jobDesc=[{"userId": 3210343,"jobDesc": "准备工作" }, {"userId": 5130121,"jobDesc": "指导老师" }]&jsonChildWeight=[{"userId": 3210343,"weight":0.2}, {"userId": 5130121,"weight":0.8 }]&isGroup=1&otherJson=[{"key":"竞赛名称","value":"创新杯"},{"key":"参赛项目","value":"基于xxx"},{"key":"类型（团队或个人）","value":"团队"},{"key":"获奖级别","value":"国家奖"},{"key":"赛事级别","value":"国家级"}]&option=modify`
- 请求参数具体说明：

参数名 | 类型 | 说明 | 备注
---|---|---|---
itemId | int | 工作量条目编号 | **若为修改才传此参数**
itemName | String | 工作量条目名称 | 必填
categoryId | int | 对应的类目编号 | 必填
ownerId | int | 所属教师编号 | 
jsonParameters | json | 传入的json参数 | 注意格式
worklaod | int | 工作量 |
groupManagerId | int | 小组负责人编号 |
applyDesc | String | 申请描述 | 
jobDesc | String | 成员职责描述 | 注意格式
jsonChildWeight | json | 成员各自权重 | 注意格式，以及和Desc的一一对应的顺序关系（顺序保持一致） 
isGroup | int | 小组 1还是个人 0 | 必填
otherJson | String | 其他参数对应的json串 | 必填
option | String | 可选项 | 值传modify时对应的为修改操作，添加操作不传该参数

file | File | 要上传的附件 |  

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
                "itemId": 24,
                "itemName": "workload",
                "categoryId": 33,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "B",
                        "value": 12
                    }
                ],
                "workload": 33.6,
                "groupManagerId": 5130121,
                "applyDesc": "描述一下",
                "jobDesc": "准备工作",
                "jobDescList": null,
                "status": 0,
                "jsonChildWeight": "0.2",
                "childWeightList": null,
                "proof": 11,
                "teacherName": "张翔",
                "reviewerId": 3203753,
                "reviewerName": "蔡竟业",
                "groupManagerName": "邵俊明",
                "categoryName": "学生竞赛",
                "importRequired": 0,
                "isGroup": 1,
                "otherJson": "[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"基于xxx\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]",
                "otherJsonParameters": [
                    {
                        "key": "竞赛名称",
                        "value": "创新杯"
                    },
                    {
                        "key": "参赛项目",
                        "value": "基于xxx"
                    },
                    {
                        "key": "类型（团队或个人）",
                        "value": "团队"
                    },
                    {
                        "key": "获奖级别",
                        "value": "国家奖"
                    },
                    {
                        "key": "赛事级别",
                        "value": "国家级"
                    }
                ]
            },
            {
                "itemId": 25,
                "itemName": "workload",
                "categoryId": 33,
                "ownerId": 5130121,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    },
                    {
                        "symbol": "B",
                        "value": 12
                    }
                ],
                "workload": 134.4,
                "groupManagerId": 5130121,
                "applyDesc": "描述一下",
                "jobDesc": "指导老师",
                "jobDescList": null,
                "status": 0,
                "jsonChildWeight": "0.8",
                "childWeightList": null,
                "proof": 11,
                "teacherName": "邵俊明",
                "reviewerId": 3203753,
                "reviewerName": "蔡竟业",
                "groupManagerName": "邵俊明",
                "categoryName": "学生竞赛",
                "importRequired": 0,
                "isGroup": 1,
                "otherJson": "[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"基于xxx\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]",
                "otherJsonParameters": [
                    {
                        "key": "竞赛名称",
                        "value": "创新杯"
                    },
                    {
                        "key": "参赛项目",
                        "value": "基于xxx"
                    },
                    {
                        "key": "类型（团队或个人）",
                        "value": "团队"
                    },
                    {
                        "key": "获奖级别",
                        "value": "国家奖"
                    },
                    {
                        "key": "赛事级别",
                        "value": "国家级"
                    }
                ]
            }
        ]
    }
}
```

### 提交工作量条目信息（选择性提交）
- 接口地址：`/item/manage/public-selective`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/item/manage/public-selective?itemId=3&itemId=4&itemId=10`
- 请求参数具体说明：

参数名 | 类型 | 说明
---|---|---
itemId | int | 工作量条目编号

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
                "itemName": "工作量",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": null,
                "status": 1,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "邵俊明",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            },
            {
                "itemId": 4,
                "itemName": "工作量",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": null,
                "status": 1,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "邵俊明",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            },
            {
                "itemId": 10,
                "itemName": "workload",
                "categoryId": 3,
                "ownerId": 3210343,
                "jsonParameter": "{\"A\":10}",
                "workload": 500,
                "groupManagerId": 5130121,
                "applyDesc": "描述一下",
                "jobDesc": null,
                "status": 1,
                "jsonChildWeight": "{\"A\":12}",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "邵俊明",
                "groupManagerName": "邵俊明",
                "categoryName": "乱码",
                "importRequired": 0
            }
        ],
        "errorData": {}
    }
}
```

### 提交工作量条目信息（全部提交）
- 接口地址：`/item/manage/public`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/item/manage/public`

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
        "submittedItemList": [
            {
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "asdasd",
                "status": 1,
                "jsonChildWeight": "21",
                "proof": "ASDASDSA",
                "teacherName": "张翔",
                "reviewerName": "邵俊明",
                "groupManagerName": null,
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            },
            {
                "itemId": 3,
                "itemName": "工作量",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": null,
                "status": 1,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "邵俊明",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            },
            {
                "itemId": 9,
                "itemName": "工作量",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": null,
                "status": 1,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "邵俊明",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            }
        ]
    }
}
}
```

### 重新提交工作量条目信息（重新申请）
- 接口地址：`/item/manage/apply-again`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/item/manage/apply-again?itemId=3`

- 请求参数具体说明：
参数名 |类型 | 说明
---|---|---
itemId | int | 工作量条目编号

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
        "item": {
            "itemId": 3,
            "itemName": "工作量",
            "categoryId": 2,
            "ownerId": 3210343,
            "jsonParameter": "asd",
            "workload": 200,
            "groupManagerId": 5130121,
            "applyDesc": "申请描述",
            "jobDesc": null,
            "status": 1,
            "jsonChildWeight": "12",
            "proof": null,
            "teacherName": "张翔",
            "reviewerName": "邵俊明",
            "groupManagerName": "邵俊明",
            "categoryName": "名字去去去去去去前期",
            "importRequired": 0
        }
    }
}
```

- Json返回失败示例如下：
```json
{
    "status": 1005,
    "statusName": "parameters not support",
    "data": {
        "cause": "无法重新申请"
    }
}
```

### 删除还未提交的工作量申请和已经被否定的工作量申请
- 接口地址：`/item`
- 支持格式：`json`
- 请求方式：`DELETE`
- 请求示例：`localhost:8080/item/manage?itemId=4`

- 请求参数具体说明：
参数名 |类型 | 说明
---|---|---
itemId | int | 工作量条目编号

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
        "item": {
            "itemId": 4,
            "itemName": "工作量",
            "categoryId": 2,
            "ownerId": 3210343,
            "jsonParameter": "asd",
            "workload": 200,
            "groupManagerId": 5130121,
            "applyDesc": "申请描述",
            "jobDesc": null,
            "status": 5,
            "jsonChildWeight": "12",
            "proof": null,
            "teacherName": "张翔",
            "reviewerName": "邵俊明",
            "groupManagerName": "邵俊明",
            "categoryName": "名字去去去去去去前期",
            "importRequired": 0
        }
    }
}
```

- Json返回失败示例如下：
```json
{
    "status": 1004,
    "statusName": "invalid request",
    "data": {
        "cause": "无法删除"
    }
}
```

### 重置工作量条目申请和审核状态接口
- 接口地址：`/item/reset`
- 支持格式：`json`
- 请求方式：`DELETE`
- 请求示例：`localhost:8080/item/manage/reset?itemId=3&role=reviewer`

- 请求参数具体说明：
参数名 |类型 | 说明
---|---|---
itemId | int | 工作量条目编号
role | String | 角色（reviewer 或 proposer）

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
        "item": {
            "itemId": 3,
            "itemName": "工作量",
            "categoryId": 2,
            "ownerId": 3210343,
            "jsonParameter": "asd",
            "workload": 200,
            "groupManagerId": 5130121,
            "applyDesc": "申请描述",
            "jobDesc": null,
            "status": 1,
            "jsonChildWeight": "12",
            "proof": null,
            "teacherName": "张翔",
            "reviewerName": "邵俊明",
            "groupManagerName": "邵俊明",
            "categoryName": "名字去去去去去去前期",
            "importRequired": 0
        }
    }
}
```

### 更改工作量条目状态（存疑和确认）
- 接口地址：`/item/manage/status-update`
- 支持格式：`json`
- 请求方式：`DELETE`
- 请求示例：`localhost:8080/item/manage/status-update?itemId=1&status=3&message=你好`

- 请求参数具体说明：
参数名 |类型 | 说明
---|---|---
itemId | int | 工作量条目编号
status | int | 状态值（2,通过；3，存疑）
message | String | 存疑的原因（非必须）

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
        "item": {
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
            "importRequired": 0,
            "isGroup": 1
        },
        "subject": {
            "subjectId": 4,
            "itemId": 1,
            "msgContent": "你好",
            "sendFromId": 3210343,
            "sendFromName": "张翔",
            "sendTime": "2017年07月18日"
        }
    }
}
```