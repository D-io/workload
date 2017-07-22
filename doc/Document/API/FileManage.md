## 文件管理接口

### 管理员发布文件信息
- 接口地址：`/file/info`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/file/info?mime=xlsx&size=200&deadlineDate=2017年12月21日&type=table`

- 请求参数说明：
参数名 |类型 | 说明
---|---|---
mime | String | 文件约束
deadline | String | 截止日期
size | Long | 文件大小
type | String | 文件类型

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
        "fileDto": {
            "fileId": 5,
            "mime": "xlsx",
            "createTime": 1500642700,
            "deadlineDate": "2017年12月21日",
            "size": 200,
            "type": "table",
            "userId": 3210343,
            "publisher": "张翔"
        }
    }
}
```


### 接收文件信息
- 接口地址：`/file/info`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/file/info`

- 请求参数说明：
参数名 |类型 | 说明 | 是否必须
---|---|---
fileId | int | 文件编号 | 否
option | String | 额外选项，值暂定"all" | 否

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
        "file": {
            "fileId": 4,
            "mime": "xlsx",
            "createTime": 1500642767,
            "deadlineDate": "2017年12月21日",
            "size": 200,
            "type": "table",
            "userId": 3210343,
            "publisher": "张翔"
        }
    }
}
```