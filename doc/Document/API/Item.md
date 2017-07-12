# 8. RESTful接口

## 课程管理员

### 8.1 配置课程大纲
#### 8.1.3 配置课程模块
##### 8.1.3.1 添加课程模块信息

* 接口地址: `/course/cm`
* 支持格式：`json`
* 请求方式:  `POST` 
* 请求示例：`localhost:8080/course/cm?name=课程模块1&description=c这是一个课程模块&courseId=1&coId=1&coId=2`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
courseId | String | 是 | 课程编号
name | String | 否 | 课程模块名称
description | String | 否 | 课程模块详细描述
coId | String | 是 | 课程目标编号（对应CO）

* 返回参数具体说明：

名称 | 类型 | 说明
---|---|---
status | int | 状态值
statusName | String | 状态名
data | String | 保存成功后系统的结果集
courseModule | String | 课程模块信息
cm-co | String | 课程模块对应的co

* Json返回成功示例如下
```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "courseModule": {
      "cmId": 15,
      "name": "课程模块1",
      "description": "c这是一个课程模块",
      "courseId": "1"
    },
    "cm-co": [
      {
        "coId": "1",
        "cmId": 15
      },
      {
        "coId": "2",
        "cmId": 15
      }
    ]
  }
}
```

##### 8.1.3.2 修改课程模块信息

* 接口地址: `/course/cm`
* 支持格式：`json`
* 请求方式:  `PUT` 
* 请求示例：`localhost:8080/course/cm?cmId=15&name=课程模块1&description=c这是一个课程模块HAHAH&courseId=1&coId=1&coId=3`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
cmId | int | 是 | 课程模块编号 
courseId | String | 是 | 课程编号
name | String | 否 | 课程模块名称
description | String | 否 | 课程模块详细描述
coId | String | 是 | 课程目标编号（对应CO）

* 返回参数具体说明：

名称 | 类型 | 说明
---|---|---
status | int | 状态值
statusName | String | 状态名
data | String | 保存成功后系统的结果集
newCm | String | 新的课程模块信息
oldCm | String | 修改前的课程模块
newCoCms | String | 新的co-cm映射关系
oldCoCms | String | 修改前的co-cm映射关系

* Json返回成功示例如下
```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "newCm": {
      "cmId": 15,
      "name": "课程模块1",
      "description": "c这是一个课程模块HAHAH",
      "courseId": "1"
    },
    "newCoCms": [
      {
        "coId": "1",
        "cmId": 15
      },
      {
        "coId": "3",
        "cmId": 15
      }
    ],
    "oldCoCms": [
      {
        "coId": "1",
        "cmId": 15
      },
      {
        "coId": "2",
        "cmId": 15
      }
    ],
    "oldCm": {
      "cmId": 15,
      "name": "课程模块1",
      "description": "c这是一个课程模块",
      "courseId": "1"
    }
  }
}
```

##### 8.1.3.3 获取全部课程模块信息
* 接口地址: `/course/cm/course-cm`
* 支持格式：`json`
* 请求方式:  `GET` 
* 请求示例：`localhost:8080/course/cm/course-cm?courseId=0012670`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
courseId | String | 是 | 课程编号

* 返回参数具体说明：

名称 | 类型 | 说明
---|---|---
status | int | 状态值
statusName | String | 状态名
data | String | 保存成功后系统的结果集
courseModule | String | 课程模块信息

* Json返回成功示例如下
```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "courseModules": [
      {
        "cmId": 2,
        "name": "LLname",
        "description": "BB",
        "courseId": "0012670"
      },
      {
        "cmId": 3,
        "name": "test_name",
        "description": "test_decryption",
        "courseId": "0012670"
      },
      {
        "cmId": 4,
        "name": "'name'",
        "description": "'bb'",
        "courseId": "0012670"
      },
      {
        "cmId": 5,
        "name": "LLname",
        "description": "BB",
        "courseId": "0012670"
      }
    ]
  }
}
```

##### 8.1.3.4 获取单个课程模块信息
* 接口地址: `/course/cm`
* 支持格式：`json`
* 请求方式:  `GET` 
* 请求示例：`localhost:8080/course/cm?cmId=2`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
cmId | int | 是 | 课程模块编号

* 返回参数具体说明：

名称 | 类型 | 说明
---|---|---
status | int | 状态值
statusName | String | 状态名
data | String | 保存成功后系统的结果集
courseModule | String | 课程模块信息
co-cm | String | 课程目标-课程模块映射信息

* Json返回成功示例如下
```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "courseModule": {
      "cmId": 2,
      "name": "LLname",
      "description": "BB",
      "courseId": "0012670"
    },
    "co-cm": [
      {
        "coId": "1",
        "cmId": 2
      },
      {
        "coId": "2",
        "cmId": 2
      },
      {
        "coId": "3",
        "cmId": 2
      }
    ]
  }
}
```

##### 8.1.3.5 删除课程模块信息
* 接口地址: `/course/cm`
* 支持格式：`json`
* 请求方式:  `DELETE` 
* 请求示例：`localhost:8080/course/cm?cmId=2`
* 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|---|---|---
cmId | int | 是 | 课程模块编号

* 返回参数具体说明：

名称 | 类型 | 说明
---|---|---
status | int | 状态值
statusName | String | 状态名
data | String | 保存成功后系统的结果集
courseModule | String | 课程模块信息
co-cm | String | 课程目标-课程模块映射信息

* Json返回成功示例如下
```json
{
  "status": 200,
  "statusName": "OK",
  "data": {
    "oldCourseModule": {
      "cmId": 2,
      "name": "LLname",
      "description": "BB",
      "courseId": "0012670"
    },
    "oldCoCm": [
      {
        "coId": "1",
        "cmId": 2
      },
      {
        "coId": "2",
        "cmId": 2
      },
      {
        "coId": "3",
        "cmId": 2
      }
    ]
  }
}
```