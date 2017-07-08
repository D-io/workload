## 工作量类目接口
### 获取工作量类目信息
- 接口地址:`/category/all`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/all`
- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集说明

对象名 | 说明 | 备注
---|--- | ---
categoryTree | 工作量类目树结构
categoryTree.children | 工作量类目子节点 | 树结构
categoryTree.status | 工作量类目状态 | 若为0，则为未提交状态，若为1则为已提交状态

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "categoryTree": [
            {
                "categoryId": 2,
                "name": "名字去去去去去去前期",
                "desc": "描述去去去前期",
                "parentId": 0,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "1",
                "formula": "a+b+c",
                "version": "2016-2017-1",
                "status": 0,
                "reviewDeadline": "2017年07月04日",
                "applyDeadline": "2017年07月04日",
                "reviewerId": 123,
                "children": [
                    {
                        "categoryId": 3,
                        "name": "乱码",
                        "desc": "描述去去去前期",
                        "parentId": 0,
                        "isLeaf": "N",
                        "importRequired": 0,
                        "jsonParameters": "1",
                        "formula": "a+b+c",
                        "version": "2016-2017-1",
                        "status": 1,
                        "reviewDeadline": "2017年07月04日",
                        "applyDeadline": "2017年07月04日",
                        "reviewerId": 432,
                        "children": [
                            {
                                "categoryId": 4,
                                "name": "名字",
                                "desc": "描述去去去前期",
                                "parentId": 0,
                                "isLeaf": "N",
                                "importRequired": 0,
                                "jsonParameters": "1",
                                "formula": "a+b+c",
                                "version": "2016-2017-1",
                                "status": 1,
                                "reviewDeadline": "2017年07月04日",
                                "applyDeadline": "2017年07月04日",
                                "reviewerId": 123,
                                "children": [
                                    {
                                        "categoryId": 11,
                                        "name": "教学",
                                        "desc": "就是简单的教学",
                                        "parentId": 0,
                                        "isLeaf": "N",
                                        "importRequired": 0,
                                        "jsonParameters": "{“人数”:“A”}",
                                        "formula": "A+B+C",
                                        "version": "2017-2018-1",
                                        "status": 0,
                                        "reviewDeadline": "2017年12月21日",
                                        "applyDeadline": "2017年12月10日",
                                        "reviewerId": 4356,
                                        "children": [],
                                        "objectId": 11
                                    },
                                    {
                                        "categoryId": 13,
                                        "name": "教学",
                                        "desc": "就是简单的教学",
                                        "parentId": 0,
                                        "isLeaf": "N",
                                        "importRequired": 0,
                                        "jsonParameters": "{“人数”:“A”}",
                                        "formula": "A+B+C",
                                        "version": "2017-2018-1",
                                        "status": 1,
                                        "reviewDeadline": "2017年12月21日",
                                        "applyDeadline": "2017年12月10日",
                                        "reviewerId": 345,
                                        "children": [],
                                        "objectId": 13
                                    }
                                ],
                                "objectId": 4
                            },
                            {
                                "categoryId": 5,
                                "name": "格式化",
                                "desc": "描述去去去前期",
                                "parentId": 0,
                                "isLeaf": "N",
                                "importRequired": 0,
                                "jsonParameters": "1",
                                "formula": "a+b+c",
                                "version": "2016-2017-1",
                                "status": 1,
                                "reviewDeadline": "2017年07月04日",
                                "applyDeadline": "2017年07月04日",
                                "reviewerId": 234,
                                "children": [],
                                "objectId": 5
                            },
                            {
                                "categoryId": 9,
                                "name": "教学",
                                "desc": "就是简单的教学",
                                "parentId": 0,
                                "isLeaf": "N",
                                "importRequired": 0,
                                "jsonParameters": "{“人数”:“A”}",
                                "formula": "A B C",
                                "version": "2017-2018-1",
                                "status": 1,
                                "reviewDeadline": "2017年12月21日",
                                "applyDeadline": "2017年12月10日",
                                "reviewerId": 123,
                                "children": [],
                                "objectId": 9
                            }
                        ],
                        "objectId": 3
                    }
                ],
                "objectId": 2
            }
        ]
    }
}
```

#### 获取已提交的工作量类目信息
- 接口地址：`/category/list`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/list`
- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集说明

对象名 | 说明 | 备注
---|--- | ---
categoryTree | 工作量类目树结构
categoryTree.children | 工作量类目子节点 | 树结构
categoryTree.status | 工作量类目状态 | 若为0，则为未提交状态，若为1则为已提交状态

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "categoryTree": [
            {
                "categoryId": 2,
                "name": "名字去去去去去去前期",
                "desc": "描述去去去前期",
                "parentId": 0,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "1",
                "formula": "a+b+c",
                "version": "2016-2017-1",
                "status": 1,
                "reviewDeadline": "2017年07月04日",
                "applyDeadline": "2017年07月04日",
                "reviewerId": 123,
                "children": [
                    {
                        "categoryId": 3,
                        "name": "乱码",
                        "desc": "描述去去去前期",
                        "parentId": 0,
                        "isLeaf": "N",
                        "importRequired": 0,
                        "jsonParameters": "1",
                        "formula": "a+b+c",
                        "version": "2016-2017-1",
                        "status": 1,
                        "reviewDeadline": "2017年07月04日",
                        "applyDeadline": "2017年07月04日",
                        "reviewerId": 432,
                        "children": [
                            {
                                "categoryId": 4,
                                "name": "名字",
                                "desc": "描述去去去前期",
                                "parentId": 0,
                                "isLeaf": "N",
                                "importRequired": 0,
                                "jsonParameters": "1",
                                "formula": "a+b+c",
                                "version": "2016-2017-1",
                                "status": 1,
                                "reviewDeadline": "2017年07月04日",
                                "applyDeadline": "2017年07月04日",
                                "reviewerId": 123,
                                "children": [
                                    {
                                        "categoryId": 13,
                                        "name": "教学",
                                        "desc": "就是简单的教学",
                                        "parentId": 0,
                                        "isLeaf": "N",
                                        "importRequired": 0,
                                        "jsonParameters": "{“人数”:“A”}",
                                        "formula": "A+B+C",
                                        "version": "2017-2018-1",
                                        "status": 1,
                                        "reviewDeadline": "2017年12月21日",
                                        "applyDeadline": "2017年12月10日",
                                        "reviewerId": 345,
                                        "children": [],
                                        "objectId": 13
                                    }
                                ],
                                "objectId": 4
                            },
                            {
                                "categoryId": 5,
                                "name": "格式化",
                                "desc": "描述去去去前期",
                                "parentId": 0,
                                "isLeaf": "N",
                                "importRequired": 0,
                                "jsonParameters": "1",
                                "formula": "a+b+c",
                                "version": "2016-2017-1",
                                "status": 1,
                                "reviewDeadline": "2017年07月04日",
                                "applyDeadline": "2017年07月04日",
                                "reviewerId": 234,
                                "children": [],
                                "objectId": 5
                            },
                            {
                                "categoryId": 9,
                                "name": "教学",
                                "desc": "就是简单的教学",
                                "parentId": 0,
                                "isLeaf": "N",
                                "importRequired": 0,
                                "jsonParameters": "{“人数”:“A”}",
                                "formula": "A B C",
                                "version": "2017-2018-1",
                                "status": 1,
                                "reviewDeadline": "2017年12月21日",
                                "applyDeadline": "2017年12月10日",
                                "reviewerId": 123,
                                "children": [],
                                "objectId": 9
                            }
                        ],
                        "objectId": 3
                    }
                ],
                "objectId": 2
            }
        ]
    }
}
```

### 添加工作量类目信息
- 接口地址：`/category`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/category?name=教学&desc=就是简单的教学&parentId=0&isLeaf=N&importRequired=0&jsonParameters={“人数”:“A”}&formula=A%2BB%2BC&version=2017-2018-1&reviewDeadline=2017年12月21日&applyDeadline=2017年12月10日&reviewerId=1`
- 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|--- | --- | ---
name | String | 是 | 工作量类目名
desc | String | 否 | 工作量类目描述
parentId | int | 是 | 父节点Id
isLeaf | String | 否 | 是否为叶子节点（Y or N）
importRequired | int | 是 | 0：手动申报类（审核类），1：系统导入类（复核类）
jsonParameters | String | 否 | 设置参数格式多组{name(参数名称,value)，key(参数符号)}
formula | String | 是 | 计算公式
version | String | 是 | 版本号（学期号）
reviewDeadline | String | 是 | 审核截止日期
applyDeadline | String | 是 | 申请截止日期
reviewerId | int | 否 | 审核人编号

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集说明

对象名 | 说明 | 备注
---|--- | ---
categoryTree | 工作量类目树结构
categoryTree.children | 工作量类目子节点 | 树结构
categoryTree.status | 工作量类目状态 | 若为0，则为未提交状态，若为1则为已提交状态

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "category": {
            "categoryId": 14,
            "name": "教学",
            "desc": "就是简单的教学",
            "parentId": 0,
            "isLeaf": "N",
            "importRequired": 0,
            "jsonParameters": "{“人数”:“A”}",
            "formula": "A+B+C",
            "version": "2017-2018-1",
            "status": 0,
            "reviewDeadline": "2017年12月21日",
            "applyDeadline": "2017年12月10日",
            "reviewerId": 1,
            "children": null,
            "objectId": 14
        }
    }
}
```


### 删除工作量类目信息
- 接口地址：`/category?categoryId=13`
- 支持格式：`json`
- 请求方式：`DELETE`
- 请求示例：`localhost:8080/category?categoryId=13`
- 请求参数具体说明：

参数名 | 类型 | 说明
---|---
categoryId | int | 要删除的类目Id


- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集说明

对象名 | 说明 | 备注
---|--- | ---
categoryTree | 工作量类目树结构
categoryTree.children | 工作量类目子节点 | 树结构
categoryTree.status | 工作量类目状态 | 若为0，则为未提交状态，若为1则为已提交状态

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "oldCategory": {
            "categoryId": 11,
            "name": "教学",
            "desc": "就是简单的教学",
            "parentId": 0,
            "isLeaf": "N",
            "importRequired": 0,
            "jsonParameters": "{“人数”:“A”}",
            "formula": "A+B+C",
            "version": "2017-2018-1",
            "status": -1,
            "reviewDeadline": "2017年12月21日",
            "applyDeadline": "2017年12月10日",
            "reviewerId": 4356,
            "children": null,
            "objectId": 11
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
        "cause": "非解锁工作量不可删除，请先解锁！"
    }
}
```

### 解锁对应的工作量信息
- 接口地址：`/category/unlock`
- 支持格式：`json`
- 请求方式：`PUT`
- 请求示例：`localhost:8080/category/unlock`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- Json返回成功示例如下：
```
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "info": "解锁成功"
    }
}
```

### 修改对应的工作量信息

- 接口地址：`/category`
- 支持格式：`json`
- 请求方式：`PUT`
- 请求示例：`localhost:8080/category?categoryId=14&name=修改过的教学&desc_就是简单的教学&parentId=2&isLeaf=N&importRequired=0&jsonParameters={“人_数”:“A”}&formula=_A%2BB%2BC&version=2017-2018-1&reviewDeadline=2017年12月21日&applyDeadline=2017年12月10日&reviewerId=1`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- Json返回成功示例如下：
```
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "oldCategory": {
            "categoryId": 14,
            "name": "修改过的教学",
            "desc": null,
            "parentId": 2,
            "isLeaf": "N",
            "importRequired": 0,
            "jsonParameters": "{“人_数”:“A”}",
            "formula": "_A+B+C",
            "version": "2017-2018-1",
            "status": 0,
            "reviewDeadline": "2017年12月21日",
            "applyDeadline": "2017年12月10日",
            "reviewerId": 1,
            "children": null,
            "objectId": 14
        }
    }
}
```

### 提交工作量类目信息
- 接口地址：`/category、public`
- 支持格式：`json`
- 请求方式：`PUT`
- 请求示例：`localhost:8080/category/public`

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
                "name": "名字去去去去去去前期",
                "desc": "描述去去去前期",
                "parentId": 0,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "1",
                "formula": "a+b+c",
                "version": "2016-2017-1",
                "status": 0,
                "reviewDeadline": 1499166527,
                "applyDeadline": 1499166527,
                "reviewerId": 123
            },
            {
                "categoryId": 3,
                "name": "乱码",
                "desc": "描述去去去前期",
                "parentId": 2,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "1",
                "formula": "a+b+c",
                "version": "2016-2017-1",
                "status": 0,
                "reviewDeadline": 1499151023,
                "applyDeadline": 1499151023,
                "reviewerId": 432
            },
            {
                "categoryId": 4,
                "name": "名字",
                "desc": "描述去去去前期",
                "parentId": 3,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "1",
                "formula": "a+b+c",
                "version": "2016-2017-1",
                "status": 0,
                "reviewDeadline": 1499166558,
                "applyDeadline": 1499166558,
                "reviewerId": 123
            },
            {
                "categoryId": 5,
                "name": "格式化",
                "desc": "描述去去去前期",
                "parentId": 3,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "1",
                "formula": "a+b+c",
                "version": "2016-2017-1",
                "status": 0,
                "reviewDeadline": 1499171096,
                "applyDeadline": 1499171096,
                "reviewerId": 234
            },
            {
                "categoryId": 9,
                "name": "教学",
                "desc": "就是简单的教学",
                "parentId": 3,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "{“人数”:“A”}",
                "formula": "A B C",
                "version": "2017-2018-1",
                "status": 0,
                "reviewDeadline": 1513785600,
                "applyDeadline": 1512835200,
                "reviewerId": 123
            },
            {
                "categoryId": 13,
                "name": "教学",
                "desc": "就是简单的教学",
                "parentId": 4,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "{“人数”:“A”}",
                "formula": "A+B+C",
                "version": "2017-2018-1",
                "status": 0,
                "reviewDeadline": 1513785600,
                "applyDeadline": 1512835200,
                "reviewerId": 345
            },
            {
                "categoryId": 14,
                "name": "教学",
                "desc": "就是简单的教学",
                "parentId": 0,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "{“人数”:“A”}",
                "formula": "A+B+C",
                "version": "2017-2018-1",
                "status": 0,
                "reviewDeadline": 1513785600,
                "applyDeadline": 1512835200,
                "reviewerId": 1
            },
            {
                "categoryId": 15,
                "name": "修改过的教学",
                "desc": null,
                "parentId": 2,
                "isLeaf": "N",
                "importRequired": 0,
                "jsonParameters": "{“人_数”:“A”}",
                "formula": "_A+B+C",
                "version": "2017-2018-1",
                "status": 0,
                "reviewDeadline": 1513785600,
                "applyDeadline": 1512835200,
                "reviewerId": 1
            }
        ]
    }
}
```


