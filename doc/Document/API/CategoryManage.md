## 工作量类目接口

### 导入往年工作量类目信息
- 接口地址：`/category/manage`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/category/manage?name=教学&desc=就是简单的教学&parentId=0&isLeaf=N&importRequired=0&jsonParameters={“人数”:“A”}&formula=A%2BB%2BC&version=2017-2018-1&reviewDeadline=2017年12月21日&applyDeadline=2017年12月10日&reviewerId=1`
- 请求参数说明：

参数名 | 类型 | 必填 | 说明
---|--- | --- | ---
version | String | 是 | 学期号 例如2017-2018-1

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
                "categoryId": 1,
                "name": "培养方案相关人才培养当量",
                "desc": "培养方案相关人才培养工作是指教师从事与学院人才培养方案相关的课程教学、实践教学等（由多位老师共同参与完成的项目，工作当量由该项工作负责人根据教师参与情况分配。）",
                "parentId": 0,
                "isLeaf": "N",
                "importRequired": 2,
                "jsonParameters": null,
                "formula": "",
                "version": "2017-2018-2",
                "status": 1,
                "reviewDeadline": 1517760000,
                "applyDeadline": 1517414400,
                "reviewerId": 3210343,
                "otherJson": ""
            },
	    }

```


### 添加工作量类目信息
- 接口地址：`/category/manage`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/category/manage?name=教学&desc=就是简单的教学&parentId=0&isLeaf=N&importRequired=0&jsonParameters={“人数”:“A”}&formula=A%2BB%2BC&version=2017-2018-1&reviewDeadline=2017年12月21日&applyDeadline=2017年12月10日&reviewerId=1`
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
			"reviewerName": null,
            "children": null,
            "objectId": 14
        }
    }
}
```


### 删除工作量类目信息
- 接口地址：`/category/manage?categoryId=13`
- 支持格式：`json`
- 请求方式：`DELETE`
- 请求示例：`localhost:8080/category/manage?categoryId=13`
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
			"reviewerName": null,
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
- 接口地址：`/category/manage/unlock`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`http://127.0.0.1:8080/category/manage/unlock?categoryId=1&categoryId=2&categoryId=3`

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
        "培养方案相关人才培养当量": "解锁成功",
        "年度人才培养服务当量": "解锁成功",
        "教研、教改等教学当量": "解锁成功",
        "errorData": {}
    }
}
```

### 修改对应的工作量信息

- 接口地址：`/category/manage/modify`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/category/manage?categoryId=14&name=修改过的教学&desc_就是简单的教学&parentId=2&isLeaf=N&importRequired=0&jsonParameters={“人_数”:“A”}&formula=_A%2BB%2BC&version=2017-2018-1&reviewDeadline=2017年12月21日&applyDeadline=2017年12月10日&reviewerId=1`

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
        "category": {
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
			"reviewerName": null,
            "children": null,
            "objectId": 14
        }
    }
}
```

### 提交工作量类目信息(全部提交)
- 接口地址：`/category/manage/public`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/category/manage/public`

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
                "reviewerId": 123,
				"reviewerName": null,
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
                "reviewerId": 432,
				"reviewerName": null
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
                "reviewerId": 123,
				"reviewerName": null
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
                "reviewerId": 234,
				"reviewerName": null
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
                "reviewerId": 123,
				"reviewerName": null
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
                "reviewerId": 345,
				"reviewerName": null
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
                "reviewerId": 1,
				"reviewerName": null
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
                "reviewerId": 1,
				"reviewerName": null
            }
        ]
    }
}
```

### 提交工作量类目信息(选择提交)
- 接口地址：`/category/public-selective`
- 支持格式：`json`
- 请求方式：`POST`
- 请求示例：`localhost:8080/category/public-selective?categoryId=2&categoryId=3&categoryId=4&categoryId=5&categoryId=9`

- 返回参数具体说明：

参数名 |类型 | 说明
---|---|---
status | int |状态值
statusName | String | 状态名
data | String | 结果集
errorData | String | 提交失败的信息

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
                "status": 1,
                "reviewDeadline": "2017年07月04日",
                "applyDeadline": "2017年07月04日",
                "reviewerId": 5130121,
                "reviewerName": "邵俊明",
                "children": null,
                "objectId": 2
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
                "reviewerId": 3201231,
                "reviewerName": "唐雪飞",
                "children": null,
                "objectId": 9
            }
        ],
        "errorData": {
            "名字": "无法提交",
            "格式化": "无法提交",
            "乱码": "无法提交"
        }
    }
}
```
