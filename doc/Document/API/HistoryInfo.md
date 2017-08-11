### 查询某条条目对应的全部历史记录
- 接口地址:`/history/info/histories`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`http://127.0.0.1:8080/history/info/histories?itemId=14`

- 请求参数说明：
参数名 |类型 | 说明
---|---|---
itemId | int | 条目编号

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
        "historyList": [
            {
                "historyId": 4,
                "itemId": "14",
                "userId": 3210343,
                "createTime": "2017-07-27 18:01:38",
                "operation": "当前条目的工作量被审核人张翔于2017-07-27 18:01:38修改为100.0"
            }
        ]
    }
}
```

### 获取教师对应操作的全部历史记录信息
- 接口地址:`/history/info/histories-user`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`http://127.0.0.1:8080/history/info/histories-user`
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
        "historyList": [
            {
                "historyId": 2,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-07-27 16:14:43",
                "operation": "当前条目的工作量被审核人张翔于2017-07-27 16:14:43修改为55.0"
            },
            {
                "historyId": 4,
                "itemId": "14",
                "userId": 3210343,
                "createTime": "2017-07-27 18:01:38",
                "operation": "当前条目的工作量被审核人张翔于2017-07-27 18:01:38修改为100.0"
            },
            {
                "historyId": 3, 
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-07-27 18:14:43",
                "operation": "当前条目的工作量被审核人张翔于2017-07-27 18:14:43修改为40.0"
            },
            {
                "historyId": 5,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:03:42",
                "operation": "寮犵繑于2017-08-04 10:03:42重新申请工作量条目workload"
            },
            {
                "historyId": 6,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:04:53",
                "operation": "寮犵繑于2017-08-04 10:04:53重新申请工作量条目workload"
            },
            {
                "historyId": 7,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:05:16",
                "operation": "寮犵繑于2017-08-04 10:05:16重新申请工作量条目workload"
            },
            {
                "historyId": 8,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:06:13",
                "operation": "寮犵繑于2017-08-04 10:06:13重新申请工作量条目workload"
            },
            {
                "historyId": 9,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:07:21",
                "operation": "寮犵繑于2017-08-04 10:07:21重新申请工作量条目workload"
            },
            {
                "historyId": 10,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:08:22",
                "operation": "寮犵繑于2017-08-04 10:08:22重新申请工作量条目workload"
            },
            {
                "historyId": 11,
                "itemId": "11",
                "userId": 3210343,
                "createTime": "2017-08-04 10:10:09",
                "operation": "寮犵繑于2017-08-04 10:10:09重新申请工作量条目workload"
            }
        ]
    }
}
```

