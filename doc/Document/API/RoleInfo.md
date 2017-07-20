## 工作量条目Item接口

### 获取角色信息列表
- 接口地址：`/page/sidebar/list`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/page/sidebar/list`

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
        "sidebarInfo": [
            {
                "role": "工作量计算规则配置管理员",
                "roleCode": "ADMIN"
            },
            {
                "role": "工作量审核人",
                "roleCode": "RE"
            }
        ]
    }
}
```

### 获取指定角色的信息
- 接口地址：`/page/sidebar`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/page/sidebar?role=ADMIN`

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
        "sidebarInfo": {
            "role": "工作量计算规则配置管理员",
            "roleCode": "ADMIN"
        }
    }
}
```
