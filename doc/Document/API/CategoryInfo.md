## 工作量类目接口

### 获取单个工作量类目信息
- 接口地址:`/category/info/single`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/info/single?categoryId=14`
- 请求参数具体说明：

参数名 | 类型 | 说明
---|---|---
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
        "categoryDto": {
            "categoryId": 14,
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
            "reviewerId": 3201231,
            "reviewerName": "唐雪飞",
            "children": null,
            "objectId": 14
        }
    }
}
```


### 获取工作量类目信息
- 接口地址:`/category/info/all`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/info/all`
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
				"reviewerName": null,
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
						"reviewerName": null,
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
								"reviewerName": null,
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
										"reviewerName": null,
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
										"reviewerName": null,
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
								"reviewerName": null,
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
								"reviewerName": null,
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
- 接口地址：`/category/info/list`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/info/list`
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
				"reviewerName": null,
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
						"reviewerName": null,
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
								"reviewerName": null,
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
										"reviewerName": null,
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
								"reviewerName": null,
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
								"reviewerName": null,
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

### 获取父节点下拉列表
- 接口地址:`/category/info/parent-brief`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080//category/info/parent-brief`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集

- 返回参数结果集

- Json返回成功示例如下：
```json
{
    "status": 200,
    "statusName": "OK",
    "data": {
        "categoryBriefs": [
            {
                "categoryName": "培养方案相关人才培养当量",
                "categoryId": 1
            },
            {
                "categoryName": "教研、教改等教学当量",
                "categoryId": 2
            },
            {
                "categoryName": "年度人才培养服务当量",
                "categoryId": 3
            },
            {
                "categoryName": "其他",
                "categoryId": 4
            }
        ]
    }
}
```
