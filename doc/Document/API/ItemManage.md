## 工作量条目Item接口

### 添加工作量条目信息
- 接口地址:`/item/manage`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/item/manage?itemName=workload&categoryId=3&ownerId=3210343&jsonParameter={"A":10}&workload=500&groupManagerId=5130121&applyDesc=描述一下&jsonChildWeight={"A":12}`
- 请求参数具体说明：

参数名 | 类型 | 说明
---|---|---
itemName | String | 工作量条目名称
categoryId | int | 对应的类目编号
ownerId | int | 所属教师编号
jsonParameters | json | 传入的json参数
worklaod | int | 工作量
groupManagerId | int | 小组负责人编号
applyDesc | String | 申请描述
jsonChildWeight | json | 成员各自权重 

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
            "categoryId": 3,
            "ownerId": 3210343,
            "jsonParameter": "{\"A\":10}",
            "workload": 500,
            "groupManagerId": 5130121,
            "applyDesc": "描述一下",
            "jobDesc": null,
            "status": 0,
            "jsonChildWeight": "{\"A\":12}",
            "proof": null,
            "teacherName": "张翔",
            "reviewerName": "邵俊明",
            "groupManagerName": "邵俊明",
            "categoryName": "乱码",
            "importRequired": 0
        }
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