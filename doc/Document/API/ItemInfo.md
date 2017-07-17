## 工作量条目Item接口

### 管理员获取全部工作量条目信息（分页查询）
- 接口地址：`/item/info/item-all`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/item/info/item-all?pageNum=1&pageSize=100&categoryId=2&status=1&ownerId=12`

- 请求参数具体说明：
参数名 |类型 | 说明 | 是否必须
---|---|---|---
pageNum | int | 页码编号 | 是
pageSize | int | 页的大小 | 是
categoryId | int | 类目编号 | 否 （查询条件）
status | int | 状态值 | 否（查询条件） 
ownerId | int | 教师Id | 否 （查询条件） 

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
                "reviewerId": 3210343,
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
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
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
                "reviewerId": 3210343,
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
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
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
        "subjectList": [
            {
                "subjectId": null,
                "itemId": 4,
                "msgContent": "你好",
                "sendFromId": 12,
                "sendTime": "2017年07月04日"
            }
        ],
        "normalItemList": [
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
            }
        ],
        "abnormalItemList": [
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
                "status": 5,
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
        "subjectList": [
            {
                "subjectId": 2,
                "itemId": 10,
                "msgContent": "你好",
                "sendFromId": 12,
                "sendTime": "2017年07月04日"
            }
        ],
        "normalItemList": [
            {
                "itemId": 9,
                "itemName": "工作量",
                "categoryId": 15,
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
                "reviewerName": "唐雪飞",
                "groupManagerName": "邵俊明",
                "categoryName": "修改过的教学",
                "importRequired": 1
            }
        ],
        "abnormalItemList": [
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
                "status": 4,
                "jsonChildWeight": "{\"A\":12}",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "唐雪飞",
                "groupManagerName": "邵俊明",
                "categoryName": "修改过的教学",
                "importRequired": 1
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
                "itemId": 2,
                "itemName": "name",
                "categoryId": 2,
                "ownerId": 3210343,
                "jsonParameter": "asd",
                "workload": 20,
                "groupManagerId": 1,
                "applyDesc": "desc",
                "jobDesc": "asdasd",
                "status": 2,
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
                "status": 2,
                "jsonChildWeight": "12",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "名字去去去去去去前期",
                "importRequired": 0
            },
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
                "status": 2,
                "jsonChildWeight": "{\"A\":12}",
                "proof": null,
                "teacherName": "张翔",
                "reviewerName": "张翔",
                "groupManagerName": "邵俊明",
                "categoryName": "修改过的教学",
                "importRequired": 1
            }
        ],
        "totalWorkload": 720
    }
}
```

