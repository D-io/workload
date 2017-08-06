## 工作量类目接口

### 获取单个工作量类目信息
- 接口地址:`/category/info/single`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/info/single?categoryId=19`
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

- Json返回成功示例如下：
```json
{
    "status": 200, 
    "statusName": "OK", 
    "data": {
        "categoryDto": {
            "categoryId": 19, 
            "name": "团队教学、教研、教改成果奖（含教学竞赛）", 
            "desc": "团队获校级奖，计80工作当量；同一项目获得省部级奖，每项再加120工作当量；国家级奖再加200工作当量。", 
            "parentId": 2, 
            "isLeaf": "Y", 
            "importRequired": 1, 
            "jsonParameters": null, 
            "formulaParameterList": [
                {
                    "desc": "团队获校级奖（个数）", 
                    "symbol": "A"
                }, 
                {
                    "desc": "团队获省部级奖（个数）", 
                    "symbol": "B"
                }, 
                {
                    "desc": "团队获国家级奖", 
                    "symbol": "C"
                }
            ], 
            "formula": "80*A+120*B+200*C", 
            "version": "2017-2018-1", 
            "status": 1, 
            "reviewDeadline": "2017年07月29日", 
            "applyDeadline": "2017年07月29日", 
            "reviewerId": 3210343, 
            "reviewerName": "张翔", 
            "children": null, 
            "otherJson": null, 
            "otherJsonParameters": [
                {
                    "key": "获奖项目", 
                    "value": ""
                }, 
                {
                    "key": "获奖名称", 
                    "value": ""
                }, 
                {
                    "key": "获奖级别", 
                    "value": ""
                }
            ], 
            "objectId": 19
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
                "categoryId": 1,
                "name": "培养方案相关人才培养当量",
                "desc": "培养方案相关人才培养工作是指教师从事与学院人才培养方案相关的课程教学、实践教学等（由多位老师共同参与完成的项目，工作当量由该项工作负责人根据教师参与情况分配。）",
                "parentId": 0,
                "isLeaf": "N",
                "importRequired": 2,
                "jsonParameters": null,
                "formulaParameterList": null,
                "formula": "",
                "version": "2017-2018-1",
                "status": 1,
                "reviewDeadline": "2017年12月30日",
                "applyDeadline": "2017年12月30日",
                "reviewerId": 3210343,
                "reviewerName": "张翔",
                "children": [
                    {
                        "categoryId": 5,
                        "name": "培养方案规定课程工作当量",
                        "desc": "本科生和全日制研究生培养方案规定课程的工作当量",
                        "parentId": 1,
                        "isLeaf": "N",
                        "importRequired": 2,
                        "jsonParameters": "",
                        "formulaParameterList": null,
                        "formula": "",
                        "version": "2017-2018-1",
                        "status": 1,
                        "reviewDeadline": "2017年07月29日",
                        "applyDeadline": "2017年07月29日",
                        "reviewerId": 3210343,
                        "reviewerName": "张翔",
                        "children": [
                            {
                                "categoryId": 27,
                                "name": "教师助教（含企业课程助教）",
                                "desc": "教师助教（含企业课程助教）教学工作当量按授课课时数×0.3",
                                "parentId": 5,
                                "isLeaf": "Y",
                                "importRequired": 1,
                                "jsonParameters": "[{\"desc\":\"课时数\",\"symbol\":\"A\"}]",
                                "formulaParameterList": [
                                    {
                                        "desc": "课时数",
                                        "symbol": "A"
                                    }
                                ],
                                "formula": "0.3*A",
                                "version": "2017-2018-1",
                                "status": 1,
                                "reviewDeadline": "2017年07月29日",
                                "applyDeadline": "2017年07月29日",
                                "reviewerId": 3213343,
                                "reviewerName": null,
                                "children": [
                                    
                                ],
                                "otherJson": "[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"授课教师姓名\",\"value\":\"\"}]",
                                "otherJsonParameters": [
                                    {
                                        "key": "课程名称",
                                        "value": ""
                                    },
                                    {
                                        "key": "授课教师姓名",
                                        "value": ""
                                    }
                                ],
                                "objectId": 27
                            },
                            省略多余数据
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
- 请求示例：`localhost:8080/category/info/parent-brief`

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
