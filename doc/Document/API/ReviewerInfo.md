### 审核人获取负责的条目信息
- 接口地址:`/reviewer/info/items`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：
	- `localhost:8080/reviewer/info/items?importRequired=0` //获取自我申报的待审核的工作量
	- `localhost:8080/reviewer/info/items?importRequired=1` //获取审核人导入方式中存疑的和存疑通过的工作量
	- `localhost:8080/reviewer/info/items?importRequired=1&option=uncommitted` //获取审核人导入方式中的待提交的工作量
	
- 请求参数具体说明：

参数名 |类型 | 说明 | 是否必填
---|---|---
importRequired | int | 方式 0-申报，1-导入 | 是
option | String | 可选项 | 否

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
        "nonCheckedItem": [
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
                "reviewerName": "张翔",
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
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            }
        ]
    }
}
```

```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "doubtedCheckedItem": [
            {
                "itemId": 9,
                "itemName": "工作量",
                "categoryId": 15,
                "ownerId": 5130121,
                "jsonParameter": "asd",
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": null,
                "status": 4,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "邵俊明",
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "修改过的教学",
                "importRequired": 1
            }
        ],
        "doubtedItem": [
            {
                "itemId": 10,
                "itemName": "workload",
                "categoryId": 15,
                "ownerId": 3210343,
                "jsonParameter": "{\"A\":10}",
                "workload": 500,
                "groupManagerId": 5130121,
                "applyDesc": "描述一下",
                "jobDesc": null,
                "status": 3,
                "jsonChildWeight": "{\"A\":12}",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "修改过的教学",
                "importRequired": 1
            }
        ]
    }
}
```

```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "unCommittedItem": [
            {
                "itemId": 9,
                "itemName": "工作量",
                "categoryId": 15,
                "ownerId": 5130121,
                "jsonParameter": "asd",
                "workload": 200,
                "groupManagerId": 5130121,
                "applyDesc": "申请描述",
                "jobDesc": null,
                "status": 0,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "邵俊明",
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "修改过的教学",
                "importRequired": 1
            }
        ]
    }
}
```


### 审核人获取负责的类目（查询条件下拉列表）
- 接口地址:`/reviewer/info/categories`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/reviewer/info/categories`


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
        "categoryList": [
            {
                "categoryId": 2,
                "categoryName": "名字去去去去去去前期"
            },
            {
                "categoryId": 15,
                "categoryName": "修改过的教学"
            }
        ]
    }
}
```

### 工作量统计（条件查询接口）
- 接口地址: `reviewer/info/items-all`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/reviewer/info/items?categoryId=2&isGroup=0&ownerId=3210343&pageNum=1&pageSize=100`

- 请求参数具体说明：（查询条件） 分页查询 

参数名 |类型 | 说明 | 是否必填
---|---|---
categoryId | int | 类目编号 | 否
isGroup | int | 小组或者个人 | 否 0为个人，1为小组
ownerId | int | 教师编号 | 否
pageNum | int | 页号 | 是
pageSize | int | 页的大小 | 是


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
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "parameterValues": null,
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "asdasd",
                "jobDescList": null,
                "status": 1,
                "jsonChildWeight": "21",
                "childWeightList": null,
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
        "totalWorkload": 0
    }
}
```

