## 工作量条目Item接口

### 管理员获取全部工作量条目信息（不使用分页查询，加上了学期限制）
- 接口地址：`/item/info/item-all`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`http://127.0.0.1:8080/item/info/item-all?status=5`
    - `/item/info/item-all?status=5&ifExport=yes` //导出实例

- 请求参数具体说明：
参数名 |类型 | 说明 | 是否必须
---|---|---|---

categoryId | int | 类目编号 | 否 （查询条件）
status | int | 状态值 | 否（查询条件） 
ownerId | int | 教师Id | 否 （查询条件）
isExport | String | 是否导出 | 是即为yes

- PS.不导出时不填ifExport属性

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
        "itemDtoList": [
            {
                "itemId": 11,
                "itemName": "workload",
                "categoryId": 23,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12} ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 55,
                "groupManagerId": 5130121,
                "applyDesc": "描述一下",
                "jobDesc": "",
                "jobDescList": null,
                "status": 5,
                "jsonChildWeight": "",
                "childWeightList": null,
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "本科毕业设计",
                "importRequired": 1,
                "isGroup": 0,
                "version": "2017-2018-1",
                "otherJson": null,
                "otherJsonParameters": null
            },
            {
                "itemId": 18,
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
                "status": 5,
                "jsonChildWeight": "0.2",
                "childWeightList": null,
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3203753,
                "reviewerName": "蔡竟业",
                "groupManagerName": "邵俊明",
                "categoryName": "学生竞赛",
                "importRequired": 0,
                "isGroup": 1,
                "version": "2017-2018-1",
                "otherJson": null,
                "otherJsonParameters": null
            }
        ]
    }
}
```

### 管理员获取全部工作量条目信息（分页查询，使用了自定义分页助手）
- 接口地址：`/item/info/item-all/paginate`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`http://127.0.0.1:8080/item/info/item-all/paginate?pageNum=1&pageSize=100&categoryId=33&status=1`
    - `/item/info/item-all/paginate?categoryId=33&status=1&ifExport=yes` //导出实例

    - PS.导出时不用输入页号pageNum和页的大小pageSize，不导出时不填ifExport属性

- 请求参数具体说明：
参数名 |类型 | 说明 | 是否必须
---|---|---|---
pageNum | int | 页码编号 | 否
pageSize | int | 页的大小 | 否
categoryId | int | 类目编号 | 否 （查询条件）
status | int | 状态值 | 否（查询条件） 
ownerId | int | 教师Id | 否 （查询条件）
isExport | String | 是否导出 | 是即为yes

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集
totalRecords | int | 总记录数

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "totalRecords": 18,
        "itemDtoList": [
            {
                "itemId": 11,
                "itemName": "workload",
                "categoryId": 23,
                "ownerId": 3210343,
                "jsonParameter": "[ {\"symbol\": \"A\", \"value\": 12} ]",
                "parameterValues": [
                    {
                        "symbol": "A",
                        "value": 12
                    }
                ],
                "workload": 55,
                "groupManagerId": 5130121,
                "applyDesc": "描述一下",
                "jobDesc": "",
                "jobDescList": null,
                "status": 1,
                "jsonChildWeight": "",
                "childWeightList": null,
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "本科毕业设计",
                "importRequired": 1,
                "isGroup": 0,
                "version": "2017-2018-1",
                "otherJson": null,
                "formula": "5*A",
                "paramDesc": [
                    {
                        "desc": "指导人数",
                        "symbol": "A"
                    }
                ],
                "descAndValues": [
                    {
                        "desc": "指导人数",
                        "value": 12
                    }
                ],
                "otherJsonParameters": null
            },
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
                "itemId": 16,
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
                "status": 2,
                "jsonChildWeight": "0.2",
                "childWeightList": null,
                "proof": null,
                "teacherName": "张翔",
                "reviewerId": 3203753,
                "reviewerName": "蔡竟业",
                "groupManagerName": "邵俊明",
                "categoryName": "学生竞赛",
                "importRequired": 0,
                "isGroup": 1,
                "version": "2017-2018-1",
                "otherJson": null,
                "otherJsonParameters": null
            },
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
                "status": 4,
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
                "version": "2017-2018-1",
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
        "totalWorkload": 133.6
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