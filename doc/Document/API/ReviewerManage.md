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

### 存疑的工作量 提交通过
- 接口地址:`/reviewer/manage/item-submit`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/reviewer/manage/item-submit?itemId=4`
	
- 请求参数具体说明：

参数名 |类型 | 说明 | 是否必填
---|---|---
itemId | int | 工作量条目编号 | 是


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
            "status": 4,
            "jsonChildWeight": "12",
            "proof": null,
            "teacherName": "张翔",
            "reviewerId": 3210343,
            "reviewerName": "张翔",
            "groupManagerName": "邵俊明",
            "categoryName": "名字去去去去去去前期",
            "importRequired": 0
        }
    }
}
```
