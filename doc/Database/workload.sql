-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: workload
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '工作量条目id',
  `name` varchar(45) NOT NULL COMMENT '工作量条目名称',
  `desc` varchar(255) DEFAULT NULL COMMENT '工作量条目详细描述',
  `parent_id` int(11) NOT NULL COMMENT '所属上一级条目id，0为1级条目',
  `is_leaf` varchar(1) NOT NULL COMMENT '是否为叶子节点，0：否，1：是',
  `import_requied` varchar(1) NOT NULL COMMENT '标识工作量是否为系统导入，0：手动申报（审核类），1：系统导入（复核类）',
  `json_parameters` text NOT NULL COMMENT '设置参数\n格式多组{name(参数名称,value)，key(参数符号)}',
  `formula` varchar(45) NOT NULL COMMENT '计算工作量公式',
  `version` varchar(45) NOT NULL COMMENT '版本号，以学期形式展示（如：2016-2017-1）',
  `status` varchar(1) NOT NULL COMMENT '工作量条目状态，0：未提交（解锁），1：已提交（锁定），-1：disable（删除）',
  `review_deadline` datetime NOT NULL COMMENT '审核截止时间',
  `apply_deadline` datetime NOT NULL COMMENT '申报人申请/复核时限（默认审核人审核时限前48小时，审核人更改）',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作量类目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `item_id` int(11) NOT NULL COMMENT '工作量申报id',
  `category_id` int(11) NOT NULL COMMENT '工作量条目id与工作量类目表一致',
  `owner_id` int(11) NOT NULL COMMENT '工作量归属人id，关联教师表',
  `json_parameter` text NOT NULL COMMENT '存储该条目参数\n格式多组{key(参数名称)，vlue(参数值)}',
  `workload` int(11) NOT NULL COMMENT '该拥有者该条目占工作量（根据category表中的公式，通过参数进行计算所得值）',
  `group_manager_id` int(11) NOT NULL COMMENT '团队中负责人id（与owner_id一致时方可对条目进行操作）',
  `apply_desc` varchar(255) DEFAULT NULL COMMENT '申请时详细描述',
  `job_desc` varchar(255) DEFAULT NULL COMMENT '申请时职责描述',
  `proof` text COMMENT '证明',
  `status` varchar(1) NOT NULL COMMENT '状态，0：未提交，1：未审核，2：未复核，3：通过，4：存疑，5：拒绝，-1：disable（删除）',
  `json_child_weight` text NOT NULL COMMENT '存储团队成员json串（格式{child_id：团队成员,value：团队成员占权重}）',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作量计量表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewer`
--

DROP TABLE IF EXISTS `reviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviewer` (
  `category_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='审核人表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewer`
--

LOCK TABLES `reviewer` WRITE;
/*!40000 ALTER TABLE `reviewer` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviewer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `item_id` int(11) NOT NULL COMMENT '存疑工作量id',
  `msg_content` varchar(255) NOT NULL COMMENT '消息内容',
  `sendfrom_id` int(11) NOT NULL COMMENT '消息发送者（条目审核人id或条目申报人id）',
  `send_time` datetime NOT NULL COMMENT '发送时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='交互内容表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacher_id` bigint(20) NOT NULL COMMENT '教师编号',
  `name` varchar(20) NOT NULL COMMENT '教师姓名',
  `gender` char(1) NOT NULL COMMENT '教师性别\n	M=>男\n	F=>女\n	O=>未知',
  `campus` char(1) NOT NULL COMMENT '校区:\n	S=>沙河\n	Q=>清水河\n	 J=>九里提',
  `department_id` tinyint(3) unsigned DEFAULT NULL COMMENT '部门编号',
  `education_id` tinyint(3) unsigned DEFAULT NULL COMMENT '学历编号',
  `degree_id` tinyint(3) unsigned DEFAULT NULL COMMENT '学位编号',
  `major` varchar(50) DEFAULT NULL COMMENT '主要方向',
  `position` varchar(20) DEFAULT NULL COMMENT '职务',
  `professional_title` varchar(20) DEFAULT NULL COMMENT '职称',
  `mobile` char(15) NOT NULL COMMENT '主要联系方式',
  `office_tel` char(15) NOT NULL COMMENT '工作电话',
  `email` varchar(50) DEFAULT NULL COMMENT '教师邮箱',
  `description` varchar(255) DEFAULT NULL COMMENT '教师描述',
  PRIMARY KEY (`teacher_id`),
  KEY `FK_department_teacher` (`department_id`),
  KEY `fk_teacher_education1_idx` (`education_id`),
  KEY `fk_teacher_degree1_idx` (`degree_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='教师信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (3200223,'谭浩','M','S',NULL,NULL,NULL,NULL,NULL,NULL,'13882065972','','tanhao@uestc.edu.cn',NULL),(3200456,'陈栩霞','F','S',1,NULL,NULL,NULL,NULL,NULL,'13668242876','','chenxx405@uestc.edu.cn',NULL),(3201231,'唐雪飞','M','S',2,NULL,NULL,NULL,NULL,NULL,'13908014545','','19640112@qq.com',NULL),(3201366,'雷航','M','S',2,NULL,NULL,NULL,NULL,NULL,'83204103','','hlei@uestc.edu.cn',NULL),(3201456,'罗惠琼','F','S',2,NULL,NULL,NULL,NULL,NULL,'13980488680','','luoyang3@uestc.edu.cn',NULL),(3201475,'刘军','M','S',1,NULL,NULL,NULL,NULL,NULL,'13608066067','','liujun_66@163.com',NULL),(3201497,'李光跃','M','S',1,NULL,NULL,NULL,NULL,NULL,'18030764376','','',NULL),(3201516,'杨小桦','M','S',1,NULL,NULL,NULL,NULL,NULL,'13018253254','','ccccyxh@163.com',NULL),(3201531,'刘乃琦','M','S',3,NULL,NULL,NULL,NULL,NULL,'13350092320','','Nliu@uestc.edu.cn',NULL),(3201542,'刘玓','M','S',4,NULL,NULL,NULL,NULL,NULL,'13608086680','','liudi@uestc.edu.cn',NULL),(3201555,'郑冰','F','S',5,NULL,NULL,NULL,NULL,NULL,'13808196372','','cszb@uestc.edu.cn',NULL),(3201692,'黄克军','M','S',2,NULL,NULL,NULL,NULL,NULL,'13808050749','','kjhuang@uestc.edu.cn',NULL),(3201762,'何兴高','M','S',2,NULL,NULL,NULL,NULL,NULL,'13708182428','','happy_he@vip.163.com',NULL),(3201771,'文军','M','S',4,NULL,NULL,NULL,NULL,NULL,'13438032255','','Wenjun@uestc.edu.cn',NULL),(3201833,'王雁东','M','S',2,NULL,NULL,NULL,NULL,NULL,'13183831972','','wangyandong6429@sina.com',NULL),(3202005,'郝晓青','M','S',6,NULL,NULL,NULL,NULL,NULL,'13982198299','','Xqhao@uestc.edu.cn',NULL),(3202487,'朱清新','M','S',2,NULL,NULL,NULL,NULL,NULL,'13608071232','','qxzhu@uestc.edu.cn',NULL),(3202540,'刘辉','M','S',2,NULL,NULL,NULL,NULL,NULL,'13880280019','','huiliu@uestc.edu.cn',NULL),(3202781,'陈虹','M','S',2,NULL,NULL,NULL,NULL,NULL,'18502817940','',NULL,NULL),(3203158,'兰刚','M','S',2,NULL,NULL,NULL,NULL,NULL,'','','langang@uestc.edu.cn',NULL),(3203265,'李树全','M','S',4,NULL,NULL,NULL,NULL,NULL,'13547962885','','shuquanli@uestc.edu.cn',NULL),(3203281,'甘涛','M','S',1,NULL,NULL,NULL,NULL,NULL,'','','gantao@uestc.edu.cn',NULL),(3203317,'黄俊','M','S',2,NULL,NULL,NULL,NULL,NULL,'','','jhuang@uestc.edu.cn',NULL),(3203400,'江春华','M','S',2,NULL,NULL,NULL,NULL,NULL,'13981829632','','chjiang@uestc.edu.cn',NULL),(3203501,'刘启和','M','S',NULL,NULL,NULL,NULL,NULL,NULL,'15208292978','','qiheliu@uestc.edu.cn',NULL),(3203604,'傅翀','M','S',3,NULL,NULL,NULL,NULL,NULL,'13880608080','','fuc@uestc.edu.cn',NULL),(3203611,'夏金祥','M','S',2,NULL,NULL,NULL,NULL,NULL,'13908078638','','jxxia@uestc.edu.cn',NULL),(3203634,'郭建东','M','S',2,NULL,NULL,NULL,NULL,NULL,'13808184720','','jdguo@uestc.edu.cn',NULL),(3203656,'邱元杰','M','S',2,NULL,NULL,NULL,NULL,NULL,'13679081552','','yuanjiq@126.com',NULL),(3203657,'程红蓉','F','S',NULL,NULL,NULL,NULL,NULL,NULL,'13808048529','','hrcheng@uestc.edu.cn',NULL),(3203663,'陆庆','M','S',4,NULL,NULL,NULL,NULL,NULL,'13350062851','','luqing@uestc.edu.cn',NULL),(3203702,'管庆','M','S',3,NULL,NULL,NULL,NULL,NULL,'13308074387','','qguan@uestc.edu.cn',NULL),(3203753,'蔡竟业','M','S',3,NULL,NULL,NULL,NULL,NULL,'83208057','','xiaokun@uestc.edu.cn',NULL),(3203872,'吴晓华','F','S',2,NULL,NULL,NULL,NULL,NULL,'13550360436','','wxhcshua@126.com',NULL),(3203887,'万晓枫','F','S',6,NULL,NULL,NULL,NULL,NULL,'13880518251','','Wxf611@163.com',NULL),(3203896,'谢娟','F','S',1,NULL,NULL,NULL,NULL,NULL,'13808211607','','jxie@uestc.edu.cn',NULL),(3203897,'张凤荔','F','S',2,NULL,NULL,NULL,NULL,NULL,'13308039351','','fzhang@uestc.edu.cn',NULL),(3204007,'刘瑶','M','S',3,NULL,NULL,NULL,NULL,NULL,'13880138858','','liuyao@uestc.edu.cn',NULL),(3204082,'王庆先','M','S',2,NULL,NULL,NULL,NULL,NULL,'13982200580','','qxwang@uestc.edu.cn',NULL),(3204084,'桑楠','M','S',2,NULL,NULL,NULL,NULL,NULL,'13388167538','','sn@uestc.edu.cn',NULL),(3204136,'陆鑫','M','S',2,NULL,NULL,NULL,NULL,NULL,'13094445552','','luxinmail@uestc.edu.cn',NULL),(3204143,'王琳','F','S',3,NULL,NULL,NULL,NULL,NULL,'18008094562','','wl@uestc.edu.cn',NULL),(3204184,'佘堃','M','S',2,NULL,NULL,NULL,NULL,NULL,'13908054498','','kunshe@126.com',NULL),(3204202,'杨霞','M','S',2,NULL,NULL,NULL,NULL,NULL,'13458685796','','xyang@uestc.edu.cn',NULL),(3204242,'白忠建','M','S',2,NULL,NULL,NULL,NULL,NULL,'13880097070','','baizj@uestc.edu.cn',NULL),(3204267,'范满平','M','S',2,NULL,NULL,NULL,NULL,NULL,'','','fmpfmp@uestc.edu.cn',NULL),(3204369,'秦志光','M','S',7,NULL,NULL,NULL,NULL,NULL,'83202210','','Qinzg@uestc.edu.cn',NULL),(3204375,'吴劲','M','S',3,NULL,NULL,NULL,NULL,NULL,'13699066562','','wj@uestc.edu.cn',NULL),(3204384,'顾小丰','M','S',2,NULL,NULL,NULL,NULL,NULL,'13980057278','','guxf@uestc.edu.cn',NULL),(3204525,'郭文生','M','S',2,NULL,NULL,NULL,NULL,NULL,'13980876752','','Gws@uestc.edu.cn',NULL),(3204544,'李巧勤','F','S',2,NULL,NULL,NULL,NULL,NULL,'13689056153','','Helenli803@163.com',NULL),(3204581,'詹瑾瑜','M','S',2,NULL,NULL,NULL,NULL,NULL,'13980845195','','zhanjy@uestc.edu.cn',NULL),(3204635,'陈伟','M','S',4,NULL,NULL,NULL,NULL,NULL,'13982079665','','chenwei@uestc.edu.cn',NULL),(3210048,'吴祖峰','M','S',1,NULL,NULL,NULL,NULL,NULL,'83206475','','wuzufeng@uestc.edu.cn',NULL),(3210049,'朱国斌','M','S',1,NULL,NULL,NULL,NULL,NULL,'83207525','','zhugb@uestc.edu.cn',NULL),(3210088,'任立勇','M','S',2,NULL,NULL,NULL,NULL,NULL,'83201884','','lyren_cs@uestc.edu.cn',NULL),(3210208,'陈佳','M','S',4,NULL,NULL,NULL,NULL,NULL,'13308044372','','jchen@uestc.edu.cn',NULL),(3210246,'杨尚明','M','S',2,NULL,NULL,NULL,NULL,NULL,'13438163519','','yang9901@yahoo.com',NULL),(3210251,'张帆','M','S',2,NULL,NULL,NULL,NULL,NULL,'13980880800','','zhangfan68@uestc.edu.cn',NULL),(3210319,'许毅','M','S',4,NULL,NULL,NULL,NULL,NULL,'13550328895','','xuyi0421@gmail.com',NULL),(3210326,'徐旭如','F','S',8,NULL,NULL,NULL,NULL,NULL,'13982158379','','xrx@uestc.edu.cn',NULL),(3210340,'朱大勇','M','S',4,NULL,NULL,NULL,NULL,NULL,'13679006761','','dayongzhu75@sina.com',NULL),(3210343,'张翔','M','S',6,NULL,NULL,NULL,NULL,NULL,'13881823896','','zhangx@uestc.edu.cn',NULL),(3210429,'钱伟中','M','S',3,NULL,NULL,NULL,NULL,NULL,'13730885415','','qwz_617@163.com',NULL),(3210465,'钟婷','F','S',4,NULL,NULL,NULL,NULL,NULL,'13880088830','','zhongting@uestc.edu.cn',NULL),(3210476,'江维','M','S',2,NULL,NULL,NULL,NULL,NULL,'18228012808','','weijiang@uestc.edu.cn',NULL),(5040043,'周世杰','M','S',NULL,NULL,NULL,NULL,NULL,NULL,'13980969005','83202775','sjzhou@uestc.edu.cn',NULL),(5040084,'洪磊','F','S',9,NULL,NULL,NULL,NULL,NULL,'13541036889','','honglei1007@163.com',NULL),(5040126,'何明耘','M','S',2,NULL,NULL,NULL,NULL,NULL,'15184421553','','hmyun@uestc.edu.cn',NULL),(5050081,'刘勇国','M','S',2,NULL,NULL,NULL,NULL,NULL,'13980786625','','liuyg_cn@163.com',NULL),(5060112,'陈安龙','M','S',2,NULL,NULL,NULL,NULL,NULL,'13688434459','','chenanlong@uestc.edu.cn',NULL),(5060150,'潘琳','F','S',1,NULL,NULL,NULL,NULL,NULL,'15008289092','','ling2006em@yahoo.com.cn',NULL),(5070005,'廖勇','M','S',2,NULL,NULL,NULL,NULL,NULL,'13350850928','','liaoyong@uestc.edu.cn',NULL),(5070016,'匡平','M','S',2,NULL,NULL,NULL,NULL,NULL,'18584059977','','kuangping@uestc.edu.cn',NULL),(5070020,'徐红霞','F','S',1,NULL,NULL,NULL,NULL,NULL,'13708179323','','785622540@qq.com',NULL),(5070032,'胡旺','M','S',2,NULL,NULL,NULL,NULL,NULL,'18780261688','',NULL,NULL),(5070153,'闫炜','M','S',2,NULL,NULL,NULL,NULL,NULL,'13550288835','',NULL,NULL),(5070176,'郝宗波','M','S',2,NULL,NULL,NULL,NULL,NULL,'13688305843','','haozb3@163.com',NULL),(5070181,'王佳昊','M','S',4,NULL,NULL,NULL,NULL,NULL,'13881928902','','wangjh@uestc.edu.cn',NULL),(5070183,'聂旭云','M','S',4,NULL,NULL,NULL,NULL,NULL,'13541070970','','nxy7509@sohu.com',NULL),(5070195,'王静','F','S',4,NULL,NULL,NULL,NULL,NULL,'13568805596','','jingwang@uestc.edu.cn',NULL),(5070201,'刘梦娟','F','S',4,NULL,NULL,NULL,NULL,NULL,'13438865081','','mjliu@uestc.edu.cn',NULL),(5070218,'廖永建','M','S',NULL,NULL,NULL,NULL,NULL,NULL,'13086605690','','liaoyj@uestc.edu.cn',NULL),(5070228,'胡成华','M','S',10,NULL,NULL,NULL,NULL,NULL,'13308227996','','kahenson75@163.com',NULL),(5070233,'姚远哲','M','S',4,NULL,NULL,NULL,NULL,NULL,'13308084046','','yzyao@tsinghua.edu.cn',NULL),(5080045,'罗瑜','M','S',2,NULL,NULL,NULL,NULL,NULL,'18608016113','','yuluo77@163.com',NULL),(5080071,'苏生','M','S',2,NULL,NULL,NULL,NULL,NULL,'18782211943','','susheng@uestc.edu.cn',NULL),(5080092,'李凡','M','S',2,NULL,NULL,NULL,NULL,NULL,'13882209679','','lifan@uestc.edu.cn',NULL),(5080094,'于永斌','M','S',3,NULL,NULL,NULL,NULL,NULL,'13908213984','','ybyu@uestc.edu.cn',NULL),(5080099,'王伟东','M','S',4,NULL,NULL,NULL,NULL,NULL,'13980869810','','wdwang@uestc.edu.cn',NULL),(5080157,'叶欣','M','S',1,NULL,NULL,NULL,NULL,NULL,'13880641526','',NULL,NULL),(5080169,'肖堃','M','S',6,NULL,NULL,NULL,NULL,NULL,'13881771169','','xiaoxuanbai@163.com',NULL),(5080170,'吴正华','M','S',2,NULL,NULL,NULL,NULL,NULL,'13908173345','','wzhzxwz@sina.com',NULL),(5080186,'陈波','M','S',2,NULL,NULL,NULL,NULL,NULL,'18628053000','','bluesbeyond@vip.sina.com',NULL),(5080192,'曹晟','M','S',2,NULL,NULL,NULL,NULL,NULL,'13540410801','','caosheng@uestc.edu.cn',NULL),(5080216,'田文洪','M','S',2,NULL,NULL,NULL,NULL,NULL,'13408064175','','wenhong_tian@hotmail.com',NULL),(5080254,'张学','M','S',2,NULL,NULL,NULL,NULL,NULL,'13880786329','','zhangxue@dislab.nju.edu.cn',NULL),(5090020,'罗绪成','M','S',4,NULL,NULL,NULL,NULL,NULL,'13688001865','','xucheng@uestc.edu.cn',NULL),(5090041,'汤羽','M','S',2,NULL,NULL,NULL,NULL,NULL,'18980981198','','yutang@uestc.edu.cn',NULL),(5090115,'惠孛','M','S',4,NULL,NULL,NULL,NULL,NULL,'13881997115','','bHui@uestc.edu.cn',NULL),(5090119,'张宁','M','S',2,NULL,NULL,NULL,NULL,NULL,'13880672388','','zznn98@sina.com',NULL),(5090161,'陈峥','M','S',3,NULL,NULL,NULL,NULL,NULL,'18602815226','','chenzheng.prc@163.com',NULL),(5090218,'赵洋','M','S',4,NULL,NULL,NULL,NULL,NULL,'15828030973','','zhaoyang@uestc.edu.cn',NULL),(5090235,'熊虎','M','S',4,NULL,NULL,NULL,NULL,NULL,'13402802747','','xionghu.uestc@gmail.com',NULL),(5090236,'蓝天','M','S',3,NULL,NULL,NULL,NULL,NULL,'13488929723','','lantian1029@uestc.edu.cn',NULL),(5110007,'刘峤','M','S',4,NULL,NULL,NULL,NULL,NULL,'18010678960','','cnliuqiao@gmail.com',NULL),(5110016,'周瑞','M','S',2,NULL,NULL,NULL,NULL,NULL,'18628060651','','ruizhou@uestc.edu.cn',NULL),(5110037,'曹明生','M','S',1,NULL,NULL,NULL,NULL,NULL,'15982345340','','cmsuestc@126.com',NULL),(5120016,'吴佳','M','S',3,NULL,NULL,NULL,NULL,NULL,'18030815972','','jiawu@uestc.edu.cn',NULL),(5120017,'周尔强','M','S',4,NULL,NULL,NULL,NULL,NULL,'18628365878','','zhoueq@uestc.edu.cn',NULL),(5120033,'秦臻','M','S',2,NULL,NULL,NULL,NULL,NULL,'','','qinzhen@uestc.edu.cn',NULL),(5120043,'饶云波','M','S',3,NULL,NULL,NULL,NULL,NULL,'15908177003','','raoyb@uestc.edu.cn',NULL),(5120069,'梁一天','F','S',1,NULL,NULL,NULL,NULL,NULL,'13550339045','','liangyitian@uestc.edu.cn',NULL),(5120081,'丁熠','M','S',4,NULL,NULL,NULL,NULL,NULL,'13882219978','','yi.ding@uestc.edu.cn',NULL),(5130008,'方峻','M','S',3,NULL,NULL,NULL,NULL,NULL,'15828154009','','fangjun@uestc.edu.cn',NULL),(5130009,'周帆','M','S',4,NULL,NULL,NULL,NULL,NULL,'18683629599','','fan.zhou@uestc.edu.cn',NULL),(5130018,'李小红','F','S',1,NULL,NULL,NULL,NULL,NULL,'15828218700','','',NULL),(5130019,'王陆一','F','S',1,NULL,NULL,NULL,NULL,NULL,'13438027704','','1135133776@qq.com',NULL),(5130112,'杨彦祥','M','S',1,NULL,NULL,NULL,NULL,NULL,'13679030591','','youngfq@gmail.com',NULL),(5130114,'钟林鹏','M','S',1,NULL,NULL,NULL,NULL,NULL,'13730687320','','zlp@uestc.edu.cn',NULL),(5130121,'邵俊明','M','S',11,NULL,NULL,NULL,NULL,NULL,'18280096713','',NULL,NULL),(5130126,'王瑞锦','M','S',7,NULL,NULL,NULL,NULL,NULL,'18981972881','','wrj8882003@163.com',NULL),(5140015,'李晓瑜','F','S',2,NULL,NULL,NULL,NULL,NULL,'13730893157','','',NULL),(5140038,'林迪','M','S',2,NULL,NULL,NULL,NULL,NULL,'18190837258','','wlindi@163.com',NULL),(5140040,'张诗晗','F','S',1,NULL,NULL,NULL,NULL,NULL,'13684063568','','85200290@qq.com',NULL),(5140067,'邓建华','M','S',6,NULL,NULL,NULL,NULL,NULL,'15198008786','','kiou6325@163.com',NULL),(5140070,'张栗粽','M','S',12,NULL,NULL,NULL,NULL,NULL,'18628165749','',NULL,NULL),(5140100,'邱实','M','S',9,NULL,NULL,NULL,NULL,NULL,'13308236542','','154537284@qq.com',NULL),(5140101,'范淑焕','F','S',1,NULL,NULL,NULL,NULL,NULL,'15882206932','',NULL,NULL),(5140108,'徐翔','M','S',1,NULL,NULL,NULL,NULL,NULL,'13982002880','','',NULL),(5142177,'左旭舟','M','S',1,NULL,NULL,NULL,NULL,NULL,'18981972888','','zuoxuzhou@126.com',NULL),(5162135,'邓伏虎','M','S',14,NULL,NULL,NULL,NULL,NULL,'15881181422','','fuhu.deng@uestc.edu.cn',NULL),(6000001,'特设教师','M','S',NULL,NULL,NULL,NULL,NULL,NULL,'','','308373053@qq.com',NULL),(6110027,'蒋沥泉','F','S',1,NULL,NULL,NULL,NULL,NULL,'13550200108','','helenjlq@163.com',NULL),(6120009,'易黎','F','S',6,NULL,NULL,NULL,NULL,NULL,'18980943123','','573062055@qq.com',NULL),(6120012,'魏娟','F','S',1,NULL,NULL,NULL,NULL,NULL,'15828647312','','1018445177@qq.com',NULL),(6120040,'王娅','F','S',1,NULL,NULL,NULL,NULL,NULL,'18782190517','','561079385@qq.com',NULL),(6120047,'李彝利','M','S',13,NULL,NULL,NULL,NULL,NULL,'13438806839','','592571535@qq.com',NULL),(6120058,'何中海','M','S',6,NULL,NULL,NULL,NULL,NULL,'13550023389','','zhongsea@gmail.com',NULL),(6130010,'王晔','F','S',1,NULL,NULL,NULL,NULL,NULL,'15108246198','',NULL,NULL),(6130044,'王添杨','M','S',1,NULL,NULL,NULL,NULL,NULL,'13408681867','','wty111222@126.com',NULL),(6130056,'朱相印','M','S',6,NULL,NULL,NULL,NULL,NULL,'18602870218','','522835926@qq.com',NULL),(6130057,'李美蓉','F','S',6,NULL,NULL,NULL,NULL,NULL,'18511878589','','limeirong@uestc.edu.cn',NULL),(6130058,'文淑华','F','S',1,NULL,NULL,NULL,NULL,NULL,'18108272477','','243071799@qq.com',NULL),(6142006,'石冀敏','M','S',1,NULL,NULL,NULL,NULL,NULL,'13882279732','','sjm@uestc.edu.cn',NULL),(6156302,'李贞昊','M','S',2,NULL,NULL,NULL,NULL,NULL,'18482284040','','kaguoosoft@126.com',NULL),(6156310,'冯月','F','S',1,NULL,NULL,NULL,NULL,NULL,'','','fyue@uestc.edu.cn',NULL),(6156311,'杨珊','F','S',1,NULL,NULL,NULL,NULL,NULL,'18280233382','','',NULL),(7140003,'GORDHAN DA','M','S',14,NULL,NULL,NULL,NULL,NULL,'13880088830','','gordhan@uestc.edu.cn',NULL),(7140258,'刘乐源','M','S',15,NULL,NULL,NULL,NULL,NULL,'0','','leyuanliu@qq.com',NULL),(7141201,'陈大江','M','S',14,NULL,NULL,NULL,NULL,NULL,'0','','dajiangchen2010@gmail.com',NULL);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-01 15:57:14
