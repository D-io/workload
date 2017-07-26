### 获取教师信息
- 接口地址:`/common/user-info`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/common/user-info`
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
        "teacher": {
            "teacherId": 3210343,
            "name": "张翔"
        }
    }
}
```

### 获取教师信息
- 接口地址:`/common/teachers`
- 支持格式：`json`
- 请求方式：`GET`
- 请求示例：`localhost:8080/category/teachers`
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
        "teacherList": [
            {
                "teacherId": 7140003,
                "name": "GORDHAN DA"
            },
            {
                "teacherId": 3204242,
                "name": "白忠建"
            },
            {
                "teacherId": 3203753,
                "name": "蔡竟业"
            },
            {
                "teacherId": 5110037,
                "name": "曹明生"
            },
            {
                "teacherId": 5080192,
                "name": "曹晟"
            },
            {
                "teacherId": 5060112,
                "name": "陈安龙"
            },
            {
                "teacherId": 5080186,
                "name": "陈波"
            },
            {
                "teacherId": 7141201,
                "name": "陈大江"
            },
            {
                "teacherId": 3202781,
                "name": "陈虹"
            },
            {
                "teacherId": 3210208,
                "name": "陈佳"
            },
            {
                "teacherId": 3204635,
                "name": "陈伟"
            },
            {
                "teacherId": 3200456,
                "name": "陈栩霞"
            },
            {
                "teacherId": 5090161,
                "name": "陈峥"
            },
            {
                "teacherId": 3203657,
                "name": "程红蓉"
            },
            {
                "teacherId": 5162135,
                "name": "邓伏虎"
            },
            {
                "teacherId": 5140067,
                "name": "邓建华"
            },
            {
                "teacherId": 5120081,
                "name": "丁熠"
            },
            {
                "teacherId": 3204267,
                "name": "范满平"
            },
            {
                "teacherId": 5140101,
                "name": "范淑焕"
            },
            {
                "teacherId": 5130008,
                "name": "方峻"
            },
            {
                "teacherId": 6156310,
                "name": "冯月"
            },
            {
                "teacherId": 3203604,
                "name": "傅翀"
            },
            {
                "teacherId": 3203281,
                "name": "甘涛"
            },
            {
                "teacherId": 3204384,
                "name": "顾小丰"
            },
            {
                "teacherId": 3203702,
                "name": "管庆"
            },
            {
                "teacherId": 3203634,
                "name": "郭建东"
            },
            {
                "teacherId": 3204525,
                "name": "郭文生"
            },
            {
                "teacherId": 3202005,
                "name": "郝晓青"
            },
            {
                "teacherId": 5070176,
                "name": "郝宗波"
            },
            {
                "teacherId": 5040126,
                "name": "何明耘"
            },
            {
                "teacherId": 3201762,
                "name": "何兴高"
            },
            {
                "teacherId": 6120058,
                "name": "何中海"
            },
            {
                "teacherId": 5040084,
                "name": "洪磊"
            },
            {
                "teacherId": 5070228,
                "name": "胡成华"
            },
            {
                "teacherId": 5070032,
                "name": "胡旺"
            },
            {
                "teacherId": 3203317,
                "name": "黄俊"
            },
            {
                "teacherId": 3201692,
                "name": "黄克军"
            },
            {
                "teacherId": 5090115,
                "name": "惠孛"
            },
            {
                "teacherId": 3203400,
                "name": "江春华"
            },
            {
                "teacherId": 3210476,
                "name": "江维"
            },
            {
                "teacherId": 6110027,
                "name": "蒋沥泉"
            },
            {
                "teacherId": 5070016,
                "name": "匡平"
            },
            {
                "teacherId": 3203158,
                "name": "兰刚"
            },
            {
                "teacherId": 5090236,
                "name": "蓝天"
            },
            {
                "teacherId": 3201366,
                "name": "雷航"
            },
            {
                "teacherId": 5080092,
                "name": "李凡"
            },
            {
                "teacherId": 3201497,
                "name": "李光跃"
            },
            {
                "teacherId": 6130057,
                "name": "李美蓉"
            },
            {
                "teacherId": 3204544,
                "name": "李巧勤"
            },
            {
                "teacherId": 3203265,
                "name": "李树全"
            },
            {
                "teacherId": 5130018,
                "name": "李小红"
            },
            {
                "teacherId": 5140015,
                "name": "李晓瑜"
            },
            {
                "teacherId": 6120047,
                "name": "李彝利"
            },
            {
                "teacherId": 6156302,
                "name": "李贞昊"
            },
            {
                "teacherId": 5120069,
                "name": "梁一天"
            },
            {
                "teacherId": 5070218,
                "name": "廖永建"
            },
            {
                "teacherId": 5070005,
                "name": "廖勇"
            },
            {
                "teacherId": 5140038,
                "name": "林迪"
            },
            {
                "teacherId": 3201542,
                "name": "刘玓"
            },
            {
                "teacherId": 3202540,
                "name": "刘辉"
            },
            {
                "teacherId": 5110007,
                "name": "刘峤"
            },
            {
                "teacherId": 3201475,
                "name": "刘军"
            },
            {
                "teacherId": 7140258,
                "name": "刘乐源"
            },
            {
                "teacherId": 5070201,
                "name": "刘梦娟"
            },
            {
                "teacherId": 3201531,
                "name": "刘乃琦"
            },
            {
                "teacherId": 3203501,
                "name": "刘启和"
            },
            {
                "teacherId": 3204007,
                "name": "刘瑶"
            },
            {
                "teacherId": 5050081,
                "name": "刘勇国"
            },
            {
                "teacherId": 3203663,
                "name": "陆庆"
            },
            {
                "teacherId": 3204136,
                "name": "陆鑫"
            },
            {
                "teacherId": 3201456,
                "name": "罗惠琼"
            },
            {
                "teacherId": 5090020,
                "name": "罗绪成"
            },
            {
                "teacherId": 5080045,
                "name": "罗瑜"
            },
            {
                "teacherId": 5070183,
                "name": "聂旭云"
            },
            {
                "teacherId": 5060150,
                "name": "潘琳"
            },
            {
                "teacherId": 3210429,
                "name": "钱伟中"
            },
            {
                "teacherId": 5120033,
                "name": "秦臻"
            },
            {
                "teacherId": 3204369,
                "name": "秦志光"
            },
            {
                "teacherId": 5140100,
                "name": "邱实"
            },
            {
                "teacherId": 3203656,
                "name": "邱元杰"
            },
            {
                "teacherId": 5120043,
                "name": "饶云波"
            },
            {
                "teacherId": 3210088,
                "name": "任立勇"
            },
            {
                "teacherId": 3204084,
                "name": "桑楠"
            },
            {
                "teacherId": 5130121,
                "name": "邵俊明"
            },
            {
                "teacherId": 3204184,
                "name": "佘堃"
            },
            {
                "teacherId": 6142006,
                "name": "石冀敏"
            },
            {
                "teacherId": 5080071,
                "name": "苏生"
            },
            {
                "teacherId": 3200223,
                "name": "谭浩"
            },
            {
                "teacherId": 5090041,
                "name": "汤羽"
            },
            {
                "teacherId": 3201231,
                "name": "唐雪飞"
            },
            {
                "teacherId": 6000001,
                "name": "特设教师"
            },
            {
                "teacherId": 5080216,
                "name": "田文洪"
            },
            {
                "teacherId": 3203887,
                "name": "万晓枫"
            },
            {
                "teacherId": 5070181,
                "name": "王佳昊"
            },
            {
                "teacherId": 5070195,
                "name": "王静"
            },
            {
                "teacherId": 3204143,
                "name": "王琳"
            },
            {
                "teacherId": 5130019,
                "name": "王陆一"
            },
            {
                "teacherId": 3204082,
                "name": "王庆先"
            },
            {
                "teacherId": 5130126,
                "name": "王瑞锦"
            },
            {
                "teacherId": 6130044,
                "name": "王添杨"
            },
            {
                "teacherId": 5080099,
                "name": "王伟东"
            },
            {
                "teacherId": 6120040,
                "name": "王娅"
            },
            {
                "teacherId": 3201833,
                "name": "王雁东"
            },
            {
                "teacherId": 6130010,
                "name": "王晔"
            },
            {
                "teacherId": 6120012,
                "name": "魏娟"
            },
            {
                "teacherId": 3201771,
                "name": "文军"
            },
            {
                "teacherId": 6130058,
                "name": "文淑华"
            },
            {
                "teacherId": 5120016,
                "name": "吴佳"
            },
            {
                "teacherId": 3204375,
                "name": "吴劲"
            },
            {
                "teacherId": 3203872,
                "name": "吴晓华"
            },
            {
                "teacherId": 5080170,
                "name": "吴正华"
            },
            {
                "teacherId": 3210048,
                "name": "吴祖峰"
            },
            {
                "teacherId": 3203611,
                "name": "夏金祥"
            },
            {
                "teacherId": 5080169,
                "name": "肖堃"
            },
            {
                "teacherId": 3203896,
                "name": "谢娟"
            },
            {
                "teacherId": 5090235,
                "name": "熊虎"
            },
            {
                "teacherId": 5070020,
                "name": "徐红霞"
            },
            {
                "teacherId": 5140108,
                "name": "徐翔"
            },
            {
                "teacherId": 3210326,
                "name": "徐旭如"
            },
            {
                "teacherId": 3210319,
                "name": "许毅"
            },
            {
                "teacherId": 5070153,
                "name": "闫炜"
            },
            {
                "teacherId": 6156311,
                "name": "杨珊"
            },
            {
                "teacherId": 3210246,
                "name": "杨尚明"
            },
            {
                "teacherId": 3204202,
                "name": "杨霞"
            },
            {
                "teacherId": 3201516,
                "name": "杨小桦"
            },
            {
                "teacherId": 5130112,
                "name": "杨彦祥"
            },
            {
                "teacherId": 5070233,
                "name": "姚远哲"
            },
            {
                "teacherId": 5080157,
                "name": "叶欣"
            },
            {
                "teacherId": 6120009,
                "name": "易黎"
            },
            {
                "teacherId": 5080094,
                "name": "于永斌"
            },
            {
                "teacherId": 3204581,
                "name": "詹瑾瑜"
            },
            {
                "teacherId": 3210251,
                "name": "张帆"
            },
            {
                "teacherId": 3203897,
                "name": "张凤荔"
            },
            {
                "teacherId": 5140070,
                "name": "张栗粽"
            },
            {
                "teacherId": 5090119,
                "name": "张宁"
            },
            {
                "teacherId": 5140040,
                "name": "张诗晗"
            },
            {
                "teacherId": 3210343,
                "name": "张翔"
            },
            {
                "teacherId": 5080254,
                "name": "张学"
            },
            {
                "teacherId": 5090218,
                "name": "赵洋"
            },
            {
                "teacherId": 3201555,
                "name": "郑冰"
            },
            {
                "teacherId": 5130114,
                "name": "钟林鹏"
            },
            {
                "teacherId": 3210465,
                "name": "钟婷"
            },
            {
                "teacherId": 5120017,
                "name": "周尔强"
            },
            {
                "teacherId": 5130009,
                "name": "周帆"
            },
            {
                "teacherId": 5110016,
                "name": "周瑞"
            },
            {
                "teacherId": 5040043,
                "name": "周世杰"
            },
            {
                "teacherId": 3210340,
                "name": "朱大勇"
            },
            {
                "teacherId": 3210049,
                "name": "朱国斌"
            },
            {
                "teacherId": 3202487,
                "name": "朱清新"
            },
            {
                "teacherId": 6130056,
                "name": "朱相印"
            },
            {
                "teacherId": 5142177,
                "name": "左旭舟"
            }
        ]
    }
}
```

