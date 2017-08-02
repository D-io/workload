/*
Navicat MySQL Data Transfer

Source Server         : vince
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : workload

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-08-02 22:08:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` int(10) NOT NULL COMMENT '工作量条目id',
  `reviewer_id` int(11) DEFAULT NULL COMMENT '审核人编号',
  `name` varchar(45) NOT NULL COMMENT '工作量条目名称',
  `description` varchar(255) DEFAULT NULL COMMENT '工作量条目详细描述',
  `parent_id` int(11) NOT NULL COMMENT '所属上一级条目id，0为1级条目',
  `is_leaf` varchar(1) NOT NULL COMMENT '是否为叶子节点，0：否，1：是',
  `import_required` varchar(1) NOT NULL COMMENT '标识工作量是否为系统导入，0：手动申报（审核类），1：系统导入（复核类）',
  `json_parameters` text COMMENT '设置参数\n格式多组{name(参数名称,value)，key(参数符号)}',
  `formula` varchar(45) NOT NULL COMMENT '计算工作量公式',
  `version` varchar(45) NOT NULL COMMENT '版本号，以学期形式展示（如：2016-2017-1）',
  `status` int(2) NOT NULL COMMENT '工作量条目状态，0：未提交（解锁），1：已提交（锁定），-1：disable（删除）',
  `review_deadline` int(11) NOT NULL COMMENT '审核截止时间',
  `apply_deadline` int(11) NOT NULL COMMENT '申报人申请/复核时限（默认审核人审核时限前48小时，审核人更改）',
  `other_json` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作量类目表';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '3210343', '培养方案相关人才培养当量', '培养方案相关人才培养工作是指教师从事与学院人才培养方案相关的课程教学、实践教学等（由多位老师共同参与完成的项目，工作当量由该项工作负责人根据教师参与情况分配。）', '0', 'N', '2', null, '', '', '1', '1514563200', '1514563200', '');
INSERT INTO `category` VALUES ('2', '3210343', '教研、教改等教学当量', '教研工作一般由多位老师共同参与完成，每位教师工作当量由该项工作负责人根据教师参与情况分配。', '0', 'N', '2', null, '', '2017-2018-1', '1', '1514563200', '1514563200', null);
INSERT INTO `category` VALUES ('3', '3210343', '年度人才培养服务当量', '人才服务培养工作是指教师从事本科、研究生人才培养的教学管理、服务等其他辅助性工作（由多位老师共同参与完成的项目，工作当量由该项工作负责人根据教师参与情况分配）', '0', 'N', '2', null, '', '2017-2018-1', '1', '1514563200', '1514563200', null);
INSERT INTO `category` VALUES ('4', '3210343', '其他', null, '0', 'N', '2', null, '', '2017-2018-1', '1', '1501257600', '1501257600', null);
INSERT INTO `category` VALUES ('5', '3210343', '培养方案规定课程工作当量', '本科生和全日制研究生培养方案规定课程的工作当量', '1', 'N', '2', '', '', '2017-2018-1', '1', '1501257600', '1501257600', null);
INSERT INTO `category` VALUES ('6', '3210343', '课程的实践教学工作当量', '本科培养方案规定课程的实践教学工作当量', '1', 'N', '2', null, '', '2016-2017-1', '1', '1501257600', '1501257600', null);
INSERT INTO `category` VALUES ('7', '3210343', '学生工程科研能力培养辅助教学工作当量', '学生工程科研能力培养辅助教学工作当量', '1', 'N', '2', '', '', '2016-2017-1', '1', '1501257600', '1501257600', null);
INSERT INTO `category` VALUES ('13', '5140108', '实验室建设项目', '年度通过验收的实验室建设项目(含基地建设项目和教改项目)，按项目经费数(万元)×2。', '2', 'Y', '0', '[{\"desc\":\"项目经费数(万元)\",\"symbol\":\"A\"}]', '2*A', '2017-2018-1', '1', '1514563200', '1514563200', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('19', '3210343', '团队教学、教研、教改成果奖（含教学竞赛）', '团队获校级奖，计80工作当量；同一项目获得省部级奖，每项再加120工作当量；国家级奖再加200工作当量。', '2', 'Y', '1', '[{\"desc\":\"团队获校级奖（个数）\",\"symbol\":\"A\"},{\"desc\":\"团队获省部级奖（个数）\",\"symbol\":\"B\"},{\"desc\":\"团队获国家级奖\",\"symbol\":\"C\"}]', '80*A+120*B+200*C', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"获奖项目\",\"value\":\"\"},{\"key\":\"获奖名称\",\"value\":\"\"},{\"key\":\"获奖级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('20', '3210343', '精品课程建设', '校级及以上级别批准立项的本科生或研究生精品课程建设、教材建设（所有人才培养质量过程），MOOC等新类型课程项目，每项（门）30工作当量。', '2', 'Y', '0', '[{\"desc\":\"立项精品课程建设、教材建设项目（项数）\",\"symbol\":\"A\"},{\"desc\":\"Mooc课程（门数）\",\"symbol\":\"B\"}]', '30*A+30*B', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"类型（普通或MOOC）\",\"value\":\"\"},{\"key\":\"级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('21', '3210343', '项目立项', '获省部级教改项目立项的，每项40工作当量，同一项目获国家级立项的，每项再加60工作当量。', '2', 'Y', '0', '[{\"desc\":\"省部级教改项目立项（项数）\",\"symbol\":\"A\"},{\"desc\":\"国家级立项（项数）\",\"symbol\":\"B\"}]', '40*A+60*B', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"},{\"key\":\"立项级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('22', '3210343', '个人教学、教研、教改成果奖（含教学竞赛）', '教师个人获校级奖，计20工作当量；省级奖再加40工作当量；国家级奖再加100工作当量。', '2', 'Y', '1', '[{\"desc\":\"个人获校级奖（个数）\",\"symbol\":\"A\"},{\"desc\":\"个人获省级奖（个数）\",\"symbol\":\"B\"},{\"desc\":\"个人获国家级奖\",\"symbol\":\"C\"}]', '20*A+40*B+100*C', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"获奖项目\",\"value\":\"\"},{\"key\":\"获奖名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('23', '3210343', '本科毕业设计', '本科毕业设计：指导人数×5，每位老师所带人数不超过10人。(注：所有教师都应指导学生毕业设计，且符合学院相关管理规定。)', '6', 'Y', '1', '[{\"desc\":\"指导人数\",\"symbol\":\"A\"}]', '5*A', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('24', '3210343', '指导学生综合设计', '项目(组)数×6，每位教师所带项目组数不超过5组。(注：45岁以下青年教师原则上必须参与指导学生综合设计，且符合学院相关管理规定。) ', '6', 'Y', '1', '[{\"desc\":\"项目（组）数\",\"symbol\":\"A\"}]', '6*A', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('25', '3210343', '指导课程设计', '课程设计：指导人数×0.5，人数最多按30人计算', '6', 'Y', '1', '[{\"desc\":\"指导人数\",\"symbol\":\"A\"}]', '0.5*A', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('26', '3210343', '指导实验课', '实验课时数等同理论教学。无教学责任事故，指导实验课×1.0，每位教师原则上不允许超过4个教学班。', '6', 'Y', '1', '[{\"desc\":\"实验课（课时数）\",\"symbol\":\"A\"}]', '1*A', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('27', '3213343', '教师助教（含企业课程助教）', '教师助教（含企业课程助教）教学工作当量按授课课时数×0.3', '5', 'Y', '1', '[{\"desc\":\"课时数\",\"symbol\":\"A\"}]', '0.3*A', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"授课教师姓名\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('28', '3210343', '授课承担课时', '无教学责任事故，授课承担课时数×1.0。同一门课程学院原则上不允许一个教师承担多头上课。', '5', 'Y', '1', '[{\"desc\":\"课时数\",\"symbol\":\"A\"}]', '1*A', '2016-2017-1', '1', '1501257600', '1501257600', '[{\"key\":\"本院课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('29', '3210343', '研究生（含博士生）指导', '研究生（含博士生）指导：毕业人数 x 10', '6', 'Y', '1', '[{\"desc\":\"毕业人数\",\"symbol\":\"A\"}]', '10*A', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('30', '3210343', '带队外出实习、实训', '带队外出实习、实训：工作量按实际带队天数 x4 学时（外地）计算，实际带队天数 x2 学时（成都）计算。', '6', 'Y', '1', '[{\"desc\":\"外地实际带队天数\",\"symbol\":\"A\"},{\"desc\":\"成都实际带队天数\",\"symbol\":\"B\"}]', '4*A+2*B', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('31', '3210343', '本科生大三企业实习指导', '本科生大三企业实习指导：指导人数 x2 ，每位教师所带人数最多按10人计算。', '6', 'Y', '1', '[{\"desc\":\"指导人数\",\"symbol\":\"A\"}]', '2*A', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('32', '3203753', '国际教师助教', '暑期学堂等国际教师助教计算办法参见《信息与软件工程学院国际化课程管理办法（试行）》', '5', 'N', '1', '[{\"desc\":\"\",\"symbol\":\"\"}]', '', '2017-2018-1', '1', '1501084800', '1514476800', '[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"授课教师编号\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('33', '3203753', '学生竞赛', '学生竞赛：对于团体赛，知道参赛队伍数 x 10；对于个人赛，指导参赛人数 x 4（注：对各类学生竞赛的指导，虽然报名或组队，但未参加竞赛或未完成竞赛作品的不计工作量。）单项竞赛本工作当量最多不超过30', '7', 'Y', '0', '[{\"desc\":\"团体赛（指导参赛队伍数）\",\"symbol\":\"A\"},{\"desc\":\"个人赛（指导参赛人数）\",\"symbol\":\"B\"}]', '10*A+4*B', '2017-2018-1', '1', '1501084800', '1499961600', '[{\"key\":\"竞赛名称\",\"value\":\"\"},{\"key\":\"参赛项目\",\"value\":\"\"},{\"key\":\"类型（团队或个人）\",\"value\":\"\"},{\"key\":\"获奖级别\",\"value\":\"\"},{\"key\":\"赛事级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('34', '3203753', '大学生创新创业训练计划', '年度通过验收的指导省级以上大学生创新创业训练计划，项目数 x 10；获学校资助项目，项目数 x 7；获学院资助项目，项目数 x 5。', '7', 'Y', '0', '[{\"desc\":\"省级以上项目数\",\"symbol\":\"A\"},{\"desc\":\"学校资助项目数\",\"symbol\":\"B\"},{\"desc\":\"学院资助项目数\",\"symbol\":\"C\"}]', '10*A+7*B+5*C', '2017-2018-1', '1', '1501257600', '1500739200', '[{\"key\":\"项目名称\",\"value\":\"\"},{\"key\":\"项目级别\",\"value\":\"\"},{\"key\":\"获资助级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('35', '3203753', '特殊工程能力培训班', '特殊工程能力培训班，按实际学时计算工作量', '7', 'Y', '1', '[{\"desc\":\"实际学时数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '1*A', '2017-2018-1', '1', '1500652800', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('36', '3203753', '指导本科生发表高水平论文', '指导本科生发表高水平论文（SCI或EI杂志论文，本科生为第一作者），发表篇数 x 10.', '7', 'Y', '1', '[{\"desc\":\"发表篇数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '10*A', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"论文名称\",\"value\":\"\"},{\"key\":\"作者姓名\",\"value\":\"\"},{\"key\":\"级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('37', '3203753', '其他教学工作量', '其他教学工作量', '1', 'N', '2', '[{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '', '2017-2018-1', '1', '1501171200', '1500566400', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('38', '3203753', '继续教育课程教学', '学院安排的继续教育课程教学，无教学责任事故，授课课时数 x 0.5', '37', 'Y', '1', '[{\"desc\":\"课时数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '0.5*A', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('39', '3203753', '全校素质公选课', '经学院同意的全校素质公选课，无教学责任事故，授课课时数 x 0.5.', '37', 'Y', '1', '[{\"desc\":\"课时数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '0.5*A', '2017-2018-1', '1', '1500652800', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('40', '3203753', '学术讲座', '教师本人申请，教务科备案，学院教指委认定同意，按讲座实际学时数计算。', '37', 'Y', '1', '[{\"desc\":\"实际学时数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '1*A', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"讲座主题\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('41', '3204242', '指导学生优秀论文', '全日制本科生、研究生优秀论文，校级按照获奖人数 x 10；同一论文获得省级优秀，再按获奖人数 x 10', '2', 'Y', '0', '[{\"desc\":\"校级优秀论文获奖人数\",\"symbol\":\"A\"},{\"desc\":\"省级优秀论文获奖人数\",\"symbol\":\"B\"}]', 'A*10+B*10', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"论文名称\",\"value\":\"\"},{\"key\":\"作者姓名\",\"value\":\"\"},{\"key\":\"级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('42', '3203753', '发表教研论文', '以第一作者身份正式发表核心以上期刊教研论文，论文篇数 x 15；普通期刊教研论文，论文篇数 x 5。', '2', 'Y', '0', '[{\"desc\":\"核心以上期刊论文（篇数）\",\"symbol\":\"A\"},{\"desc\":\"普通期刊教研论文（篇数）\",\"symbol\":\"B\"}]', '15*A+5*B', '2017-2018-1', '1', '1501171200', '1501171200', '[{\"key\":\"论文名称\",\"value\":\"\"},{\"key\":\"级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('43', '3203753', '出版教材', '出版列入“卓越工程”系列和“十二五”系列的规划教材，教材本数 x 50；出版其他教材，教材本数 x 10。（每位教师承担的字数不少于三分之一或10万字）', '2', 'Y', '0', '[{\"desc\":\"“卓越工程”系列和“十二五”系列教材本数\",\"symbol\":\"A\"},{\"desc\":\"普通教材本数\",\"symbol\":\"B\"}]', '50*A+10*B', '2017-2018-1', '1', '1499443200', '1499270400', '[{\"key\":\"教材名称\",\"value\":\"\"},{\"key\":\"类型\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('44', '3203753', '立项的改革建设', '经学院教指委批准立项的培养模式改革建设、课程改革建设、实验体系改革建设等，每项工作当量20.', '2', 'Y', '0', '[{\"desc\":\"改革建设项目数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"}]', '20*A', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('45', '3203753', '全国性竞赛获奖（团队）', '全国性竞赛获奖：对团体赛， 获奖队伍数 x 10;获一等奖以上奖励的，可再按获奖队伍数 x 15 计算工作当量', '2', 'Y', '0', '[{\"desc\":\"获奖队伍数\",\"symbol\":\"A\"},{\"desc\":\"获一等奖以上奖励队伍数\",\"symbol\":\"B\"}]', '10*A+15*B', '2017-2018-1', '1', '1499443200', '1499961600', '[{\"key\":\"竞赛名称\",\"value\":\"\"},{\"key\":\"参赛项目\",\"value\":\"\"},{\"key\":\"类型（团队或个人）\",\"value\":\"\"},{\"key\":\"获奖级别\",\"value\":\"\"},{\"key\":\"赛事级别\",\"value\":\"\"},{\"key\":\"参赛人员\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('46', '3203753', '全国性竞赛获奖（个人）', '全国性竞赛获奖：对个人赛， 获奖人数 x 5;获一等奖以上奖励的，可再按获奖人数 x 5 计算工作当量', '2', 'Y', '0', '[{\"desc\":\" 获奖人数\",\"symbol\":\"A\"},{\"desc\":\"一等奖以上奖励获奖人数\",\"symbol\":\"B\"}]', '5*A+5*B', '2017-2018-1', '1', '1501257600', '1501257600', '[{\"key\":\"竞赛名称\",\"value\":\"\"},{\"key\":\"参赛项目\",\"value\":\"\"},{\"key\":\"类型（团队或个人）\",\"value\":\"\"},{\"key\":\"获奖级别\",\"value\":\"\"},{\"key\":\"赛事级别\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('47', '3203753', '党员教师责任制', '党员教师责任制：年终评定为合格的，每学期责任班级数 x 5.', '2', 'Y', '1', '[{\"desc\":\"责任班级数\",\"symbol\":\"A\"},{\"desc\":\"\",\"symbol\":\"\"}]', '5*A', '2017-2018-1', '1', '1499961600', '1499270400', '[{\"key\":\"年终合格，责任班级\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('48', '3210343', '课程评审、示范教学、中期检查', '参与学院教师新开课、开新课教师是试讲的评审、学院教师培训的课程示范教学、学院每学期教学中期检查工作（包括师生交流等）。工作量按每次4个学时计算。', '3', 'Y', '1', '[{\"desc\":\"相关工作次数\",\"symbol\":\"A\"}]', '4*A', '2017-2018-1', '1', '1500652800', '1501257600', '[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"授课老师姓名\",\"value\":\"\"},{\"key\":\"类型（本科生、研究生）\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('49', '3204242', '初期检查，期末试卷、教学大纲、培养方案审查', '餐与学院每学期教学初期检查（课件、教案、讲义）、学院每学期课程期末试卷检查、学院课程教学大纲审定、学院定期专业培养方案审定工作。工作量按照每人每门课程一个学时计算', '3', 'Y', '1', '[{\"desc\":\"单位数\",\"symbol\":\"A\"}]', '1*A', '2017-2018-2', '1', '1499184000', '1498492800', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('50', '3204242', '课程评定专家听课工作', '参与学院每学期课程评定专家听课工作。工作量按实际听课学时计算。', '3', 'Y', '1', '[{\"desc\":\"听课学时数\",\"symbol\":\"A\"}]', '1*A', '2017-2018-1', '1', '1499961600', '1497283200', '[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"授课教师姓名\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('51', '3204242', '实习实训相关工作', '参与学院本科生校外实习实训的过程管理、学院本科生校外实习实训答辩、学院本科生毕业设计答辩、学院本科人才培养特区选拔面试等工作。工作量按每人每半天4学时计算', '3', 'Y', '1', '[{\"desc\":\"单位数\",\"symbol\":\"A\"}]', '4*A', '2017-2018-1', '1', '1501689600', '1497542400', '[{\"key\":\"项目名称\",\"value\":\"\"},{\"key\":\"参与项目时间\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('52', '3204242', '新增和修订教学大纲', '课程负责人新增和修订教学大纲工作。工作量按照每门课4计算', '3', 'Y', '1', '[{\"desc\":\"课程门数\",\"symbol\":\"A\"}]', '4*A', '2017-2018-1', '1', '1503072000', '1497456000', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('53', '3204242', '指导新青年教师教学工作', '指导新青年教师教学工作。工作量按照每人每年10学时计算', '3', 'Y', '1', '[{\"desc\":\"指导人数\",\"symbol\":\"A\"}]', '10*A', '2017-2018-1', '1', '1503590400', '1499443200', '[{\"key\":\"试讲教师姓名\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('54', '3204242', '培养方案制定', '培养方案制定。培养方案大修按80学时/份，小修按40学时/份，全新制定160学时/份.方向计算', '3', 'Y', '1', '[{\"desc\":\"大修份数\",\"symbol\":\"A\"},{\"desc\":\"小修份数\",\"symbol\":\"B\"},{\"desc\":\"全新制定\",\"symbol\":\"C\"}]', '80*A+40*B+160*C', '2017-2018-1', '1', '1504195200', '1499270400', '[{\"key\":\"培养方案名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('55', '3203753', '委员会和质量小组', '学院教学指导委员会、教学质量小组、研究生质量小组等教师的工作量按10学时/年度.项.人计算。', '3', 'Y', '1', '[{\"desc\":\"单位数\",\"symbol\":\"A\"}]', '10*A', '2017-2018-1', '1', '1507219200', '1500998400', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('56', '3203753', '研究生推免工作', '研究生推荐免试入学笔试及面试工作。命题按照2学时，监考按照2学时/人。阅卷按4学时，面试按4学时/人计算', '3', 'Y', '1', '[{\"desc\":\"命题试卷数\",\"symbol\":\"A\"},{\"desc\":\"监考场次数\",\"symbol\":\"B\"},{\"desc\":\"阅卷次数\",\"symbol\":\"C\"},{\"desc\":\"面试次数\",\"symbol\":\"D\"}]', '2*A+2*B+4*C+4*D', '2017-2018-1', '1', '1509120000', '1501171200', '[{\"key\":\"服务内容\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('57', '3203753', '教改/教研、实验建设项目申报院内评审工作', '教改/教研、实验建设项目申报院内评审工作。按照2学时/每项计算。', '3', 'Y', '1', '[{\"desc\":\"评审项目数\",\"symbol\":\"A\"}]', '2*A', '2017-2018-1', '1', '1508428800', '1501084800', '[{\"key\":\"项目名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('58', '5110037', '招生宣传工作', '招生宣传工作：工作量按实际外出宣传天数 x4 学时（外地），实际外出宣传天数 x2 学时（成都计算）；外出进中学做招生宣传讲座另按2学时/次计算。', '3', 'Y', '1', '[{\"desc\":\"外出宣传天数（外地）\",\"symbol\":\"A\"},{\"desc\":\"外出宣传天数（成都）\",\"symbol\":\"B\"},{\"desc\":\"中学宣传讲座数\",\"symbol\":\"C\"}]', '4*A+2*B+2*C', '2017-2018-1', '1', '1498492800', '1499184000', '[{\"key\":\"项目名称\",\"value\":\"\"},{\"key\":\"招生时间\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('59', '5110037', '跨学院承担本科生培养方案课程', '经学院同意的跨学院承担本科生培养方案课程等同本院课程，只计工作量。', '4', 'Y', '1', '[{\"desc\":\"课时数\",\"symbol\":\"A\"}]', '1*A', '2017-2018-1', '1', '1498838400', '1496851200', '[{\"key\":\"课程名称\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('60', '5110037', '邀请企业教师（含外教）参与学院教学', '邀请企业教师（含外教）参与学院教学；企业教师（含外教）承担的课时可折算为联系教师的工作量（由学院教学指导委员会认定和折算）', '4', 'Y', '0', '[{\"desc\":\"；企业教师（含外教）承担的课时\",\"symbol\":\"A\"}]', '', '2017-2018-1', '1', '1499356800', '1498233600', '[{\"key\":\"课程名称\",\"value\":\"\"},{\"key\":\"邀请教师姓名\",\"value\":\"\"},{\"key\":\"折算系数\",\"value\":\"\"}]');
INSERT INTO `category` VALUES ('61', '5110037', '其他', '其他未列入的教学工作，经教师本人申请，学院教学指导委员会认定，学院党政联席会审定后，可计算教学工作当量。', '4', 'N', '2', '[{\"desc\":\"\",\"symbol\":\"\"},{\"desc\":\"\",\"symbol\":\"\"}]', '', '2017-2018-1', '1', '1500566400', '1498492800', null);

-- ----------------------------
-- Table structure for `file`
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `file_id` int(11) NOT NULL COMMENT '文件编号',
  `mime` varchar(45) DEFAULT NULL COMMENT '文件约束',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `deadline` int(11) DEFAULT NULL COMMENT '截止日期',
  `size` bigint(20) DEFAULT NULL COMMENT '文件大小',
  `type` varchar(45) DEFAULT NULL COMMENT '类型（待扩展）',
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '编辑者',
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文件（自定义文件上传格式及个数）';

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('1', 'jpeg', '333', '444', '1', '0', '1');
INSERT INTO `file` VALUES ('2', null, '1500000770', null, null, null, '3210343');
INSERT INTO `file` VALUES ('4', 'xlsx', '1500642767', '1513785600', '200', 'table', '3210343');
INSERT INTO `file` VALUES ('5', 'jpeg,doc,xlsx', '1500642767', '1513785600', '200', 'table', '3210343');

-- ----------------------------
-- Table structure for `file_info`
-- ----------------------------
DROP TABLE IF EXISTS `file_info`;
CREATE TABLE `file_info` (
  `file_info_id` int(11) NOT NULL COMMENT '文件信息',
  `path` varchar(255) DEFAULT NULL COMMENT '文件上传路径',
  `size` int(11) NOT NULL DEFAULT '0' COMMENT '文件大小',
  `md5_summary` text COMMENT 'md5文件完整性信息',
  `type` char(4) DEFAULT NULL COMMENT '文件类型',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态值',
  `file_id` int(11) NOT NULL DEFAULT '0' COMMENT '文件编号',
  `recipients_list` text COMMENT '接收人列表',
  `author_id` int(11) NOT NULL DEFAULT '0' COMMENT '文件作者',
  PRIMARY KEY (`file_info_id`),
  KEY `fk_file_info_file1_idx` (`file_id`),
  CONSTRAINT `fk_file_info_file1` FOREIGN KEY (`file_id`) REFERENCES `file` (`file_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文件信息';

-- ----------------------------
-- Records of file_info
-- ----------------------------
INSERT INTO `file_info` VALUES ('2', 'test_path', '200', 'dadada_2', '1', '123', '1', '1', 'hahahah_2', '1');
INSERT INTO `file_info` VALUES ('3', 'C:\\Users\\Administrator\\Desktop\\fileUploadTest\\pwd.txt', '591', '3b9d0f8983c3dc725502cc37d014fdd9', 'txt', '1500017526', '0', '2', '', '3210343');
INSERT INTO `file_info` VALUES ('4', 'C:\\Users\\Administrator\\Desktop\\fileUploadTest\\工作量导入模板-v1.0 - 副本.xlsx', '11105', 'b5b888418f082227a3c94d93fc7e1434', 'xlsx', '1500688680', '1', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('5', 'C:\\Users\\Administrator\\Desktop\\fileUploadTest\\乱码工作量导入模板.xlsx', '18944', '62ea35b71a741636dd10481bd8474c54', 'xlsx', '1500785010', '1', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('6', 'C:\\Users\\Administrator\\Desktop\\fileUploadTest\\个人教学、教研、教改成果奖（含教学竞赛）工作量导入模板.xlsx', '18944', '7dbf0ba39eb39a1f328fa0b06619745', 'xlsx', '1501147169', '1', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('7', 'C:\\Users\\Administrator\\Desktop\\fileUploadTest\\CentOS常用命令.pdf', '243347', 'dcd72a65e82e80a25b218ba0da2c62a4', 'pdf', '1501313846', '0', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('8', 'D:\\fileUploadTest\\CentOS常用命令.pdf', '243347', 'dcd72a65e82e80a25b218ba0da2c62a4', 'pdf', '1501314252', '0', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('9', 'D:\\fileUploadTest\\workload.sql', '51073', 'bbb9bed754fb68ca79ab7a0fdaa46039', 'sql', '1501392701', '0', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('10', 'D:\\fileUploadTest\\workload.sql', '51073', 'bbb9bed754fb68ca79ab7a0fdaa46039', 'sql', '1501392855', '0', '4', '', '3210343');
INSERT INTO `file_info` VALUES ('11', 'D:\\fileUploadTest\\growthbar.sql', '6973', 'c1bf0c22d39b7fd30fafec0d11d3cc35', 'sql', '1501395578', '0', '4', '', '3210343');

-- ----------------------------
-- Table structure for `history`
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `item_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT '用户编号',
  `operation` text COMMENT '操作',
  `create_time` varchar(45) DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='历史记录';

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('1', '0', '1', 'aaa', '121');
INSERT INTO `history` VALUES ('2', '11', '3210343', '当前条目的工作量被审核人张翔于2017-07-27 16:14:43修改为55.0', '2017-07-27 16:14:43');
INSERT INTO `history` VALUES ('3', '11', '3210343', '当前条目的工作量被审核人张翔于2017-07-27 18:14:43修改为40.0', '2017-07-27 18:14:43');
INSERT INTO `history` VALUES ('4', '14', '3210343', '当前条目的工作量被审核人张翔于2017-07-27 18:01:38修改为100.0', '2017-07-27 18:01:38');

-- ----------------------------
-- Table structure for `item`
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `item_id` int(11) NOT NULL COMMENT '工作量申报id',
  `item_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL COMMENT '工作量条目id与工作量类目表一致',
  `owner_id` int(11) NOT NULL COMMENT '工作量归属人id，关联教师表',
  `json_parameter` text NOT NULL COMMENT '存储该条目参数\n格式多组{key(参数名称)，vlue(参数值)}',
  `workload` double(11,2) NOT NULL COMMENT '该拥有者该条目占工作量（根据category表中的公式，通过参数进行计算所得值）',
  `group_manager_id` int(11) NOT NULL COMMENT '团队中负责人id（与owner_id一致时方可对条目进行操作）',
  `apply_desc` text COMMENT '申请时详细描述',
  `job_desc` text COMMENT '申请时职责描述',
  `proof` int(11) DEFAULT NULL COMMENT '证明，附件信息编号',
  `status` int(2) NOT NULL COMMENT '状态，0：未提交，1：未审核，2：通过，3：存疑，4 : 存疑通过，5：拒绝， -1：disable（删除）',
  `json_child_weight` text NOT NULL COMMENT '存储团队成员json串（格式{child_id：团队成员,value：团队成员占权重}）',
  `is_group` int(1) NOT NULL DEFAULT '0',
  `other_json` text,
  PRIMARY KEY (`item_id`),
  KEY `fk_category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作量计量表';

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('11', 'workload', '23', '5130121', '[ {\"symbol\": \"A\", \"value\": 12} ]', '55.00', '5130121', '描述一下', '', null, '0', '', '0', null);
INSERT INTO `item` VALUES ('14', '团队国家奖', '22', '3210343', '[{\"symbol\":\"A\",\"value\":3.0},{\"symbol\":\"B\",\"value\":1.0},{\"symbol\":\"C\",\"value\":1.0}]', '100.00', '3200223', null, '架构师', '0', '1', '0.6', '1', '[{\"key\":\"获奖项目\",\"value\":\"AEMS\"},{\"key\":\"获奖名称\",\"value\":\"创新奖\"}]');
INSERT INTO `item` VALUES ('15', '团队国家奖', '22', '3203158', '[{\"symbol\":\"A\",\"value\":3.0},{\"symbol\":\"B\",\"value\":1.0},{\"symbol\":\"C\",\"value\":1.0}]', '80.00', '3200223', null, '程序员', '0', '0', '0.4', '1', '[{\"key\":\"获奖项目\",\"value\":\"AEMS\"},{\"key\":\"获奖名称\",\"value\":\"创新奖\"}]');
INSERT INTO `item` VALUES ('16', 'workload', '33', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '33.60', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1', null);
INSERT INTO `item` VALUES ('17', 'workload', '33', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '134.40', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1', null);
INSERT INTO `item` VALUES ('18', 'workload', '33', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '33.60', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1', null);
INSERT INTO `item` VALUES ('19', 'workload', '33', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '134.40', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1', null);
INSERT INTO `item` VALUES ('20', 'workload', '33', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '33.60', '5130121', '描述一下', '准备工作', '9', '0', '0.2', '1', null);
INSERT INTO `item` VALUES ('21', 'workload', '33', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '134.40', '5130121', '描述一下', '指导老师', '9', '0', '0.8', '1', null);
INSERT INTO `item` VALUES ('22', 'workload', '33', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '33.60', '5130121', '描述一下', '准备工作', '10', '0', '0.2', '1', '[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"基于xxx\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]');
INSERT INTO `item` VALUES ('23', 'workload', '33', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '134.40', '5130121', '描述一下', '指导老师', '10', '0', '0.8', '1', '[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"基于xxx\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]');
INSERT INTO `item` VALUES ('24', 'workload', '33', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '33.60', '5130121', '描述一下', '准备工作', '11', '0', '0.2', '1', '[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"基于xxx\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]');
INSERT INTO `item` VALUES ('25', 'workload', '33', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '134.40', '5130121', '描述一下', '指导老师', '11', '0', '0.8', '1', '[{\"key\":\"竞赛名称\",\"value\":\"创新杯\"},{\"key\":\"参赛项目\",\"value\":\"基于xxx\"},{\"key\":\"类型（团队或个人）\",\"value\":\"团队\"},{\"key\":\"获奖级别\",\"value\":\"国家奖\"},{\"key\":\"赛事级别\",\"value\":\"国家级\"}]');

-- ----------------------------
-- Table structure for `log`
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `level` char(4) DEFAULT NULL COMMENT '日志等级（INFO，WARNING，ERROR等）',
  `message` text COMMENT '日志信息',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `actor_id` int(11) NOT NULL DEFAULT '0' COMMENT '相关用户',
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统日志';

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES ('1', '1', 'test_message_1', '1', '123', '1');

-- ----------------------------
-- Table structure for `subject`
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL COMMENT '交互编号',
  `item_id` int(11) NOT NULL COMMENT '存疑工作量id',
  `msg_content` varchar(255) NOT NULL COMMENT '消息内容',
  `send_from_id` int(11) NOT NULL COMMENT '消息发送者（条目审核人id或条目申报人id）',
  `send_time` int(11) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`subject_id`),
  KEY `fk_item_id` (`item_id`),
  CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='交互内容表';

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES ('1', '11', '应该为20', '3210343', '1501048601');
INSERT INTO `subject` VALUES ('2', '11', '已经修改', '3201456', '1501048668');

-- ----------------------------
-- Table structure for `teacher`
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
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

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('3200223', '谭浩', 'M', 'S', null, null, null, null, null, null, '13882065972', '', 'tanhao@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3200456', '陈栩霞', 'F', 'S', '1', null, null, null, null, null, '13668242876', '', 'chenxx405@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201231', '唐雪飞', 'M', 'S', '2', null, null, null, null, null, '13908014545', '', '19640112@qq.com', null);
INSERT INTO `teacher` VALUES ('3201366', '雷航', 'M', 'S', '2', null, null, null, null, null, '83204103', '', 'hlei@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201456', '罗惠琼', 'F', 'S', '2', null, null, null, null, null, '13980488680', '', 'luoyang3@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201475', '刘军', 'M', 'S', '1', null, null, null, null, null, '13608066067', '', 'liujun_66@163.com', null);
INSERT INTO `teacher` VALUES ('3201497', '李光跃', 'M', 'S', '1', null, null, null, null, null, '18030764376', '', '', null);
INSERT INTO `teacher` VALUES ('3201516', '杨小桦', 'M', 'S', '1', null, null, null, null, null, '13018253254', '', 'ccccyxh@163.com', null);
INSERT INTO `teacher` VALUES ('3201531', '刘乃琦', 'M', 'S', '3', null, null, null, null, null, '13350092320', '', 'Nliu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201542', '刘玓', 'M', 'S', '4', null, null, null, null, null, '13608086680', '', 'liudi@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201555', '郑冰', 'F', 'S', '5', null, null, null, null, null, '13808196372', '', 'cszb@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201692', '黄克军', 'M', 'S', '2', null, null, null, null, null, '13808050749', '', 'kjhuang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201762', '何兴高', 'M', 'S', '2', null, null, null, null, null, '13708182428', '', 'happy_he@vip.163.com', null);
INSERT INTO `teacher` VALUES ('3201771', '文军', 'M', 'S', '4', null, null, null, null, null, '13438032255', '', 'Wenjun@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3201833', '王雁东', 'M', 'S', '2', null, null, null, null, null, '13183831972', '', 'wangyandong6429@sina.com', null);
INSERT INTO `teacher` VALUES ('3202005', '郝晓青', 'M', 'S', '6', null, null, null, null, null, '13982198299', '', 'Xqhao@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3202487', '朱清新', 'M', 'S', '2', null, null, null, null, null, '13608071232', '', 'qxzhu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3202540', '刘辉', 'M', 'S', '2', null, null, null, null, null, '13880280019', '', 'huiliu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3202781', '陈虹', 'M', 'S', '2', null, null, null, null, null, '18502817940', '', null, null);
INSERT INTO `teacher` VALUES ('3203158', '兰刚', 'M', 'S', '2', null, null, null, null, null, '', '', 'langang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203265', '李树全', 'M', 'S', '4', null, null, null, null, null, '13547962885', '', 'shuquanli@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203281', '甘涛', 'M', 'S', '1', null, null, null, null, null, '', '', 'gantao@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203317', '黄俊', 'M', 'S', '2', null, null, null, null, null, '', '', 'jhuang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203400', '江春华', 'M', 'S', '2', null, null, null, null, null, '13981829632', '', 'chjiang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203501', '刘启和', 'M', 'S', null, null, null, null, null, null, '15208292978', '', 'qiheliu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203604', '傅翀', 'M', 'S', '3', null, null, null, null, null, '13880608080', '', 'fuc@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203611', '夏金祥', 'M', 'S', '2', null, null, null, null, null, '13908078638', '', 'jxxia@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203634', '郭建东', 'M', 'S', '2', null, null, null, null, null, '13808184720', '', 'jdguo@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203656', '邱元杰', 'M', 'S', '2', null, null, null, null, null, '13679081552', '', 'yuanjiq@126.com', null);
INSERT INTO `teacher` VALUES ('3203657', '程红蓉', 'F', 'S', null, null, null, null, null, null, '13808048529', '', 'hrcheng@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203663', '陆庆', 'M', 'S', '4', null, null, null, null, null, '13350062851', '', 'luqing@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203702', '管庆', 'M', 'S', '3', null, null, null, null, null, '13308074387', '', 'qguan@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203753', '蔡竟业', 'M', 'S', '3', null, null, null, null, null, '83208057', '', 'xiaokun@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203872', '吴晓华', 'F', 'S', '2', null, null, null, null, null, '13550360436', '', 'wxhcshua@126.com', null);
INSERT INTO `teacher` VALUES ('3203887', '万晓枫', 'F', 'S', '6', null, null, null, null, null, '13880518251', '', 'Wxf611@163.com', null);
INSERT INTO `teacher` VALUES ('3203896', '谢娟', 'F', 'S', '1', null, null, null, null, null, '13808211607', '', 'jxie@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3203897', '张凤荔', 'F', 'S', '2', null, null, null, null, null, '13308039351', '', 'fzhang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204007', '刘瑶', 'M', 'S', '3', null, null, null, null, null, '13880138858', '', 'liuyao@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204082', '王庆先', 'M', 'S', '2', null, null, null, null, null, '13982200580', '', 'qxwang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204084', '桑楠', 'M', 'S', '2', null, null, null, null, null, '13388167538', '', 'sn@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204136', '陆鑫', 'M', 'S', '2', null, null, null, null, null, '13094445552', '', 'luxinmail@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204143', '王琳', 'F', 'S', '3', null, null, null, null, null, '18008094562', '', 'wl@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204184', '佘堃', 'M', 'S', '2', null, null, null, null, null, '13908054498', '', 'kunshe@126.com', null);
INSERT INTO `teacher` VALUES ('3204202', '杨霞', 'M', 'S', '2', null, null, null, null, null, '13458685796', '', 'xyang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204242', '白忠建', 'M', 'S', '2', null, null, null, null, null, '13880097070', '', 'baizj@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204267', '范满平', 'M', 'S', '2', null, null, null, null, null, '', '', 'fmpfmp@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204369', '秦志光', 'M', 'S', '7', null, null, null, null, null, '83202210', '', 'Qinzg@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204375', '吴劲', 'M', 'S', '3', null, null, null, null, null, '13699066562', '', 'wj@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204384', '顾小丰', 'M', 'S', '2', null, null, null, null, null, '13980057278', '', 'guxf@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204525', '郭文生', 'M', 'S', '2', null, null, null, null, null, '13980876752', '', 'Gws@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204544', '李巧勤', 'F', 'S', '2', null, null, null, null, null, '13689056153', '', 'Helenli803@163.com', null);
INSERT INTO `teacher` VALUES ('3204581', '詹瑾瑜', 'M', 'S', '2', null, null, null, null, null, '13980845195', '', 'zhanjy@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3204635', '陈伟', 'M', 'S', '4', null, null, null, null, null, '13982079665', '', 'chenwei@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210048', '吴祖峰', 'M', 'S', '1', null, null, null, null, null, '83206475', '', 'wuzufeng@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210049', '朱国斌', 'M', 'S', '1', null, null, null, null, null, '83207525', '', 'zhugb@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210088', '任立勇', 'M', 'S', '2', null, null, null, null, null, '83201884', '', 'lyren_cs@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210208', '陈佳', 'M', 'S', '4', null, null, null, null, null, '13308044372', '', 'jchen@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210246', '杨尚明', 'M', 'S', '2', null, null, null, null, null, '13438163519', '', 'yang9901@yahoo.com', null);
INSERT INTO `teacher` VALUES ('3210251', '张帆', 'M', 'S', '2', null, null, null, null, null, '13980880800', '', 'zhangfan68@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210319', '许毅', 'M', 'S', '4', null, null, null, null, null, '13550328895', '', 'xuyi0421@gmail.com', null);
INSERT INTO `teacher` VALUES ('3210326', '徐旭如', 'F', 'S', '8', null, null, null, null, null, '13982158379', '', 'xrx@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210340', '朱大勇', 'M', 'S', '4', null, null, null, null, null, '13679006761', '', 'dayongzhu75@sina.com', null);
INSERT INTO `teacher` VALUES ('3210343', '张翔', 'M', 'S', '6', null, null, null, null, null, '13881823896', '', 'zhangx@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210429', '钱伟中', 'M', 'S', '3', null, null, null, null, null, '13730885415', '', 'qwz_617@163.com', null);
INSERT INTO `teacher` VALUES ('3210465', '钟婷', 'F', 'S', '4', null, null, null, null, null, '13880088830', '', 'zhongting@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('3210476', '江维', 'M', 'S', '2', null, null, null, null, null, '18228012808', '', 'weijiang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5040043', '周世杰', 'M', 'S', null, null, null, null, null, null, '13980969005', '83202775', 'sjzhou@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5040084', '洪磊', 'F', 'S', '9', null, null, null, null, null, '13541036889', '', 'honglei1007@163.com', null);
INSERT INTO `teacher` VALUES ('5040126', '何明耘', 'M', 'S', '2', null, null, null, null, null, '15184421553', '', 'hmyun@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5050081', '刘勇国', 'M', 'S', '2', null, null, null, null, null, '13980786625', '', 'liuyg_cn@163.com', null);
INSERT INTO `teacher` VALUES ('5060112', '陈安龙', 'M', 'S', '2', null, null, null, null, null, '13688434459', '', 'chenanlong@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5060150', '潘琳', 'F', 'S', '1', null, null, null, null, null, '15008289092', '', 'ling2006em@yahoo.com.cn', null);
INSERT INTO `teacher` VALUES ('5070005', '廖勇', 'M', 'S', '2', null, null, null, null, null, '13350850928', '', 'liaoyong@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5070016', '匡平', 'M', 'S', '2', null, null, null, null, null, '18584059977', '', 'kuangping@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5070020', '徐红霞', 'F', 'S', '1', null, null, null, null, null, '13708179323', '', '785622540@qq.com', null);
INSERT INTO `teacher` VALUES ('5070032', '胡旺', 'M', 'S', '2', null, null, null, null, null, '18780261688', '', null, null);
INSERT INTO `teacher` VALUES ('5070153', '闫炜', 'M', 'S', '2', null, null, null, null, null, '13550288835', '', null, null);
INSERT INTO `teacher` VALUES ('5070176', '郝宗波', 'M', 'S', '2', null, null, null, null, null, '13688305843', '', 'haozb3@163.com', null);
INSERT INTO `teacher` VALUES ('5070181', '王佳昊', 'M', 'S', '4', null, null, null, null, null, '13881928902', '', 'wangjh@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5070183', '聂旭云', 'M', 'S', '4', null, null, null, null, null, '13541070970', '', 'nxy7509@sohu.com', null);
INSERT INTO `teacher` VALUES ('5070195', '王静', 'F', 'S', '4', null, null, null, null, null, '13568805596', '', 'jingwang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5070201', '刘梦娟', 'F', 'S', '4', null, null, null, null, null, '13438865081', '', 'mjliu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5070218', '廖永建', 'M', 'S', null, null, null, null, null, null, '13086605690', '', 'liaoyj@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5070228', '胡成华', 'M', 'S', '10', null, null, null, null, null, '13308227996', '', 'kahenson75@163.com', null);
INSERT INTO `teacher` VALUES ('5070233', '姚远哲', 'M', 'S', '4', null, null, null, null, null, '13308084046', '', 'yzyao@tsinghua.edu.cn', null);
INSERT INTO `teacher` VALUES ('5080045', '罗瑜', 'M', 'S', '2', null, null, null, null, null, '18608016113', '', 'yuluo77@163.com', null);
INSERT INTO `teacher` VALUES ('5080071', '苏生', 'M', 'S', '2', null, null, null, null, null, '18782211943', '', 'susheng@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5080092', '李凡', 'M', 'S', '2', null, null, null, null, null, '13882209679', '', 'lifan@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5080094', '于永斌', 'M', 'S', '3', null, null, null, null, null, '13908213984', '', 'ybyu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5080099', '王伟东', 'M', 'S', '4', null, null, null, null, null, '13980869810', '', 'wdwang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5080157', '叶欣', 'M', 'S', '1', null, null, null, null, null, '13880641526', '', null, null);
INSERT INTO `teacher` VALUES ('5080169', '肖堃', 'M', 'S', '6', null, null, null, null, null, '13881771169', '', 'xiaoxuanbai@163.com', null);
INSERT INTO `teacher` VALUES ('5080170', '吴正华', 'M', 'S', '2', null, null, null, null, null, '13908173345', '', 'wzhzxwz@sina.com', null);
INSERT INTO `teacher` VALUES ('5080186', '陈波', 'M', 'S', '2', null, null, null, null, null, '18628053000', '', 'bluesbeyond@vip.sina.com', null);
INSERT INTO `teacher` VALUES ('5080192', '曹晟', 'M', 'S', '2', null, null, null, null, null, '13540410801', '', 'caosheng@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5080216', '田文洪', 'M', 'S', '2', null, null, null, null, null, '13408064175', '', 'wenhong_tian@hotmail.com', null);
INSERT INTO `teacher` VALUES ('5080254', '张学', 'M', 'S', '2', null, null, null, null, null, '13880786329', '', 'zhangxue@dislab.nju.edu.cn', null);
INSERT INTO `teacher` VALUES ('5090020', '罗绪成', 'M', 'S', '4', null, null, null, null, null, '13688001865', '', 'xucheng@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5090041', '汤羽', 'M', 'S', '2', null, null, null, null, null, '18980981198', '', 'yutang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5090115', '惠孛', 'M', 'S', '4', null, null, null, null, null, '13881997115', '', 'bHui@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5090119', '张宁', 'M', 'S', '2', null, null, null, null, null, '13880672388', '', 'zznn98@sina.com', null);
INSERT INTO `teacher` VALUES ('5090161', '陈峥', 'M', 'S', '3', null, null, null, null, null, '18602815226', '', 'chenzheng.prc@163.com', null);
INSERT INTO `teacher` VALUES ('5090218', '赵洋', 'M', 'S', '4', null, null, null, null, null, '15828030973', '', 'zhaoyang@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5090235', '熊虎', 'M', 'S', '4', null, null, null, null, null, '13402802747', '', 'xionghu.uestc@gmail.com', null);
INSERT INTO `teacher` VALUES ('5090236', '蓝天', 'M', 'S', '3', null, null, null, null, null, '13488929723', '', 'lantian1029@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5110007', '刘峤', 'M', 'S', '4', null, null, null, null, null, '18010678960', '', 'cnliuqiao@gmail.com', null);
INSERT INTO `teacher` VALUES ('5110016', '周瑞', 'M', 'S', '2', null, null, null, null, null, '18628060651', '', 'ruizhou@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5110037', '曹明生', 'M', 'S', '1', null, null, null, null, null, '15982345340', '', 'cmsuestc@126.com', null);
INSERT INTO `teacher` VALUES ('5120016', '吴佳', 'M', 'S', '3', null, null, null, null, null, '18030815972', '', 'jiawu@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5120017', '周尔强', 'M', 'S', '4', null, null, null, null, null, '18628365878', '', 'zhoueq@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5120033', '秦臻', 'M', 'S', '2', null, null, null, null, null, '', '', 'qinzhen@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5120043', '饶云波', 'M', 'S', '3', null, null, null, null, null, '15908177003', '', 'raoyb@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5120069', '梁一天', 'F', 'S', '1', null, null, null, null, null, '13550339045', '', 'liangyitian@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5120081', '丁熠', 'M', 'S', '4', null, null, null, null, null, '13882219978', '', 'yi.ding@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5130008', '方峻', 'M', 'S', '3', null, null, null, null, null, '15828154009', '', 'fangjun@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5130009', '周帆', 'M', 'S', '4', null, null, null, null, null, '18683629599', '', 'fan.zhou@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5130018', '李小红', 'F', 'S', '1', null, null, null, null, null, '15828218700', '', '', null);
INSERT INTO `teacher` VALUES ('5130019', '王陆一', 'F', 'S', '1', null, null, null, null, null, '13438027704', '', '1135133776@qq.com', null);
INSERT INTO `teacher` VALUES ('5130112', '杨彦祥', 'M', 'S', '1', null, null, null, null, null, '13679030591', '', 'youngfq@gmail.com', null);
INSERT INTO `teacher` VALUES ('5130114', '钟林鹏', 'M', 'S', '1', null, null, null, null, null, '13730687320', '', 'zlp@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('5130121', '邵俊明', 'M', 'S', '11', null, null, null, null, null, '18280096713', '', null, null);
INSERT INTO `teacher` VALUES ('5130126', '王瑞锦', 'M', 'S', '7', null, null, null, null, null, '18981972881', '', 'wrj8882003@163.com', null);
INSERT INTO `teacher` VALUES ('5140015', '李晓瑜', 'F', 'S', '2', null, null, null, null, null, '13730893157', '', '', null);
INSERT INTO `teacher` VALUES ('5140038', '林迪', 'M', 'S', '2', null, null, null, null, null, '18190837258', '', 'wlindi@163.com', null);
INSERT INTO `teacher` VALUES ('5140040', '张诗晗', 'F', 'S', '1', null, null, null, null, null, '13684063568', '', '85200290@qq.com', null);
INSERT INTO `teacher` VALUES ('5140067', '邓建华', 'M', 'S', '6', null, null, null, null, null, '15198008786', '', 'kiou6325@163.com', null);
INSERT INTO `teacher` VALUES ('5140070', '张栗粽', 'M', 'S', '12', null, null, null, null, null, '18628165749', '', null, null);
INSERT INTO `teacher` VALUES ('5140100', '邱实', 'M', 'S', '9', null, null, null, null, null, '13308236542', '', '154537284@qq.com', null);
INSERT INTO `teacher` VALUES ('5140101', '范淑焕', 'F', 'S', '1', null, null, null, null, null, '15882206932', '', null, null);
INSERT INTO `teacher` VALUES ('5140108', '徐翔', 'M', 'S', '1', null, null, null, null, null, '13982002880', '', '', null);
INSERT INTO `teacher` VALUES ('5142177', '左旭舟', 'M', 'S', '1', null, null, null, null, null, '18981972888', '', 'zuoxuzhou@126.com', null);
INSERT INTO `teacher` VALUES ('5162135', '邓伏虎', 'M', 'S', '14', null, null, null, null, null, '15881181422', '', 'fuhu.deng@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('6000001', '特设教师', 'M', 'S', null, null, null, null, null, null, '', '', '308373053@qq.com', null);
INSERT INTO `teacher` VALUES ('6110027', '蒋沥泉', 'F', 'S', '1', null, null, null, null, null, '13550200108', '', 'helenjlq@163.com', null);
INSERT INTO `teacher` VALUES ('6120009', '易黎', 'F', 'S', '6', null, null, null, null, null, '18980943123', '', '573062055@qq.com', null);
INSERT INTO `teacher` VALUES ('6120012', '魏娟', 'F', 'S', '1', null, null, null, null, null, '15828647312', '', '1018445177@qq.com', null);
INSERT INTO `teacher` VALUES ('6120040', '王娅', 'F', 'S', '1', null, null, null, null, null, '18782190517', '', '561079385@qq.com', null);
INSERT INTO `teacher` VALUES ('6120047', '李彝利', 'M', 'S', '13', null, null, null, null, null, '13438806839', '', '592571535@qq.com', null);
INSERT INTO `teacher` VALUES ('6120058', '何中海', 'M', 'S', '6', null, null, null, null, null, '13550023389', '', 'zhongsea@gmail.com', null);
INSERT INTO `teacher` VALUES ('6130010', '王晔', 'F', 'S', '1', null, null, null, null, null, '15108246198', '', null, null);
INSERT INTO `teacher` VALUES ('6130044', '王添杨', 'M', 'S', '1', null, null, null, null, null, '13408681867', '', 'wty111222@126.com', null);
INSERT INTO `teacher` VALUES ('6130056', '朱相印', 'M', 'S', '6', null, null, null, null, null, '18602870218', '', '522835926@qq.com', null);
INSERT INTO `teacher` VALUES ('6130057', '李美蓉', 'F', 'S', '6', null, null, null, null, null, '18511878589', '', 'limeirong@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('6130058', '文淑华', 'F', 'S', '1', null, null, null, null, null, '18108272477', '', '243071799@qq.com', null);
INSERT INTO `teacher` VALUES ('6142006', '石冀敏', 'M', 'S', '1', null, null, null, null, null, '13882279732', '', 'sjm@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('6156302', '李贞昊', 'M', 'S', '2', null, null, null, null, null, '18482284040', '', 'kaguoosoft@126.com', null);
INSERT INTO `teacher` VALUES ('6156310', '冯月', 'F', 'S', '1', null, null, null, null, null, '', '', 'fyue@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('6156311', '杨珊', 'F', 'S', '1', null, null, null, null, null, '18280233382', '', '', null);
INSERT INTO `teacher` VALUES ('7140003', 'GORDHAN DA', 'M', 'S', '14', null, null, null, null, null, '13880088830', '', 'gordhan@uestc.edu.cn', null);
INSERT INTO `teacher` VALUES ('7140258', '刘乐源', 'M', 'S', '15', null, null, null, null, null, '0', '', 'leyuanliu@qq.com', null);
INSERT INTO `teacher` VALUES ('7141201', '陈大江', 'M', 'S', '14', null, null, null, null, null, '0', '', 'dajiangchen2010@gmail.com', null);

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role` text,
  `status` tinyint(4) NOT NULL,
  `deadline` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('3201231', '[{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500480000');
INSERT INTO `user_role` VALUES ('3203753', '[{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500998400');
INSERT INTO `user_role` VALUES ('3204242', '[{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500998400');
INSERT INTO `user_role` VALUES ('3210343', '[{\"role\":\"ADMIN\",\"roleName\":\"工作量计算规则配置管理员\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500998400');
INSERT INTO `user_role` VALUES ('5110037', '[{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500998400');
INSERT INTO `user_role` VALUES ('5140108', '[{\"role\":\"RE\",\"roleName\":\"工作量审核人\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500998400');
