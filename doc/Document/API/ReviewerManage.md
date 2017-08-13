### 审核人审核工作量条目信息
- 接口地址:`/reviewer/manage/items`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：
	- `localhost:8080/reviewer/manage/check?itemId=10&status=2` //审核通过
	- `localhost:8080/reviewer/manage/check?itemId=10&status=5&message=有误` //获取审核人导入方式中存疑的和存疑通过的工作量
	
- 请求参数具体说明：

参数名 |类型 | 说明 | 是否必填
---|---|---
itemId | int | 工作量条目编号 | 是
status | int | 状态：通过-2，拒绝-5 | 是
message | String | 拒绝理由（消息） | 否

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
            "itemId": 10,
            "itemName": "workload",
            "categoryId": 15,
            "ownerId": 3210343,
            "jsonParameter": "{\"A\":10}",
            "workload": 500,
            "groupManagerId": 5130121,
            "applyDesc": "描述一下",
            "jobDesc": null,
            "status": 2,
            "jsonChildWeight": "{\"A\":12}",
            "proof": null,
            "teacherName": "张翔",
            "reviewerId": 3210343,
            "reviewerName": "张翔",
            "groupManagerName": "邵俊明",
            "categoryName": "修改过的教学",
            "importRequired": 1
        }
    }
}
```

```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "item": {
            "itemId": 10,
            "itemName": "workload",
            "categoryId": 15,
            "ownerId": 3210343,
            "jsonParameter": "{\"A\":10}",
            "workload": 500,
            "groupManagerId": 5130121,
            "applyDesc": "描述一下",
            "jobDesc": null,
            "status": 5,
            "jsonChildWeight": "{\"A\":12}",
            "proof": null,
            "teacherName": "张翔",
            "reviewerId": 3210343,
            "reviewerName": "张翔",
            "groupManagerName": "邵俊明",
            "categoryName": "修改过的教学",
            "importRequired": 1
        },
        "subject": {
            "subjectId": 3,
            "itemId": 10,
            "msgContent": "有误",
            "sendFromId": 3210343,
			"sendFromName": "张翔",
            "sendTime": "2017年07月16日"
        }
    }
}
```

### 审核人提前工作量审核时间
- 接口地址:`/reviewer/manage/date-modify`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：localhost:8080/reviewer/manage/date-modify?categoryId=15&date=2017年12月19日 
	
- 请求参数具体说明：

参数名 |类型 | 说明 | 是否必填
---|---|---
categoryId | int | 工作量类目编号 | 是
date | String | 日期（格式2011年1月1日） | 是

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
        "newCategory": {
            "categoryId": 15,
            "name": "修改过的教学",
            "desc": null,
            "parentId": 2,
            "isLeaf": "N",
            "importRequired": 1,
            "jsonParameters": "{“人_数”:“A”}",
            "formula": "_A+B+C",
            "version": "2017-2018-1",
            "status": 0,
            "reviewDeadline": 1513612800,
            "applyDeadline": 1512835200,
            "reviewerId": 3210343
        }
    }
}
```

- Json返回失败示例
```json
{
    "status": 1005,
    "statusName": "parameters not support",
    "data": {
        "cause": "时间只能提前"
    }
}
```

### 审核人修改工作量
- 接口地址:`/reviewer/manage/workload-modify`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：localhost:8080/reviewer/manage/workload-modify?itemId=10&workload=150
	
- 请求参数具体说明：

参数名 |类型 | 说明 | 是否必填
---|---|---
itemId | int | 工作量条目编号 | 是
workload | double | 修改的工作量 | 是

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
            "itemId": 10,
            "itemName": "workload",
            "categoryId": 15,
            "ownerId": 3210343,
            "jsonParameter": "{\"A\":10}",
            "workload": 150,
            "groupManagerId": 5130121,
            "applyDesc": "描述一下",
            "jobDesc": null,
            "status": 5,
            "jsonChildWeight": "{\"A\":12}",
            "proof": null,
            "teacherName": "张翔",
            "reviewerId": 3210343,
            "reviewerName": "张翔",
            "groupManagerName": "邵俊明",
            "categoryName": "修改过的教学",
            "importRequired": 1
        }
    }
}
```

### 审核人处理存疑的工作量 
- 接口地址:`/reviewer/manage/doubted-check`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`http://127.0.0.1:8080/reviewer/manage/doubted-check?itemId=14&parameterValues=[{"symbol":"A","value":0},{"symbol":"B","value":0},{"symbol":"C","value":1}]&otherParameters=[{"key":"获奖项目","value":"AEMS"},{"key":"获奖名称","value":"创新奖"}]&message=你好`
	
- 请求参数具体说明：

参数名 |类型 | 说明 | 是否必填
---|---|---|---
itemId | int | 工作量条目编号 | 是
parameterValues | String | 条目主要参数 | 是
otherParameters | String | 条目其他参数 | 是
message | String | 回复消息 | 是


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
            "itemId": 14,
            "itemName": "团队国家奖",
            "categoryId": 22,
            "ownerId": 3210343,
            "jsonParameter": "[{\"symbol\":\"A\",\"value\":0},{\"symbol\":\"B\",\"value\":0},{\"symbol\":\"C\",\"value\":1}]",
            "parameterValues": [
                {
                    "symbol": "A",
                    "value": 0
                },
                {
                    "symbol": "B",
                    "value": 0
                },
                {
                    "symbol": "C",
                    "value": 1
                }
            ],
            "workload": 60,
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
            "formula": "20*A+40*B+100*C",
            "paramDesc": [
                {
                    "desc": "个人获校级奖（个数）",
                    "symbol": "A"
                },
                {
                    "desc": "个人获省级奖（个数）",
                    "symbol": "B"
                },
                {
                    "desc": "个人获国家级奖",
                    "symbol": "C"
                }
            ],
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
        "subject": {
            "subjectId": 3,
            "itemId": 14,
            "msgContent": "你好",
            "sendFromId": 3210343,
            "sendFromName": "张翔",
            "sendTime": "2017年08月13日"
        }
    }
}
```
