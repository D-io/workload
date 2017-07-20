/*
Navicat MySQL Data Transfer

Source Server         : vince
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : workload

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-20 12:43:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('104');
INSERT INTO `admin` VALUES ('3210343');

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
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作量类目表';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('2', '3210343', '名字去去去去去去前期', '描述去去去前期', '0', 'N', '1', '1', 'a+b+c', '2016-2017-1', '1', '1499166527', '1499166527');
INSERT INTO `category` VALUES ('3', '3210343', '乱码', '描述去去去前期', '2', 'N', '1', '1', 'A+2*B', '2016-2017-1', '1', '1499151023', '1499151023');
INSERT INTO `category` VALUES ('4', '3201231', '名字', '描述去去去前期', '3', 'N', '0', '1', 'a+b+c', '2016-2017-1', '-1', '1499166558', '1499166558');
INSERT INTO `category` VALUES ('5', '3201231', '格式化', '描述去去去前期', '3', 'N', '0', '1', 'a+b+c', '2016-2017-1', '1', '1499171096', '1499171096');
INSERT INTO `category` VALUES ('9', '3201231', '教学', '就是简单的教学', '3', 'N', '0', '{“人数”:“A”}', 'A B C', '2017-2018-1', '1', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('10', '3210343', '教学', '就是简单的教学', '2', 'N', '0', '{“人数”:“A”}', 'A B C', '2017-2018-1', '1', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('11', '3201231', '教学', '就是简单的教学', '4', 'N', '0', '{“人数”:“A”}', 'A+B+C', '2017-2018-1', '-1', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('12', '3201231', '教学', '就是简单的教学', '2', 'N', '0', '{“人数”:“A”}', 'A+B+C', '2017-2018-1', '-1', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('13', '3201231', '教学', '就是简单的教学', '4', 'N', '0', '{“人数”:“A”}', 'A+B+C', '2017-2018-1', '1', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('14', '1', '修改过的教学', '_就是简单的教学', '2', 'N', '0', '{“人_数”:“A”}', '_A+B+C', '2017-2018-1', '0', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('15', '3201231', '修改过的教学', null, '2', 'N', '1', '{“人_数”:“A”}', '_A+B+C', '2017-2018-1', '1', '1513612800', '1512835200');
INSERT INTO `category` VALUES ('16', '1', '修改过的教学', '_就是简单的教学', '2', 'N', '1', '{“人_数”:“A”}', '_A+B+C', '2017-2018-1', '0', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('17', '1', '修改过的教学', '_就是简单的教学', '2', 'N', '0', '{“人_数”:“A”}', '_A+B+C', '2017-2018-1', '0', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('18', '3203158', '修改过的教学', '_就是简单的教学', '2', 'N', '0', '{“人_数”:“A”}', '_A+B+C', '2017-2018-1', '0', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('19', '3203158', '教学', '就是简单的教学', '0', 'N', '0', '{“人数”:“A”}', 'A+B+C', '2017-2018-1', '0', '1513785600', '1512835200');
INSERT INTO `category` VALUES ('20', '1', '教学', '就是简单的教学', '0', 'N', '0', '{“人数”:“A”}', 'A+B+C', '2017-2018-1', '0', '1513785600', '1512835200');

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
  `proof` text COMMENT '证明，若该条目is_import为0，则存入提交文件，若为1，则该字段为空',
  `status` int(2) NOT NULL COMMENT '状态，0：未提交，1：未审核，2：通过，3：存疑，4 : 存疑通过，5：拒绝， -1：disable（删除）',
  `json_child_weight` text NOT NULL COMMENT '存储团队成员json串（格式{child_id：团队成员,value：团队成员占权重}）',
  `is_group` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`item_id`),
  KEY `fk_category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作量计量表';

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('1', '213', '2', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '2.00', '3210343', '', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', '0', '3', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '1');
INSERT INTO `item` VALUES ('2', 'name', '2', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '20.00', '1', 'desc', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', 'ASDASDSA', '1', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('3', '工作量', '10', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '200.00', '5130121', '申请描述', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '1', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('4', '工作量', '2', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '200.00', '5130121', '申请描述', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '4', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('5', '位', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '0.00', '0', null, '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '1', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('9', '工作量', '15', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '200.00', '5130121', '申请描述', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '1', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('10', 'workload', '15', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '150.00', '5130121', '描述一下', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '5', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('11', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"A\", \"value\": 12 } ]', '0.00', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('12', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('13', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('14', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('15', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('16', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('17', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('18', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('19', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('20', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('21', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('22', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('23', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('24', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '36.00', '5130121', '描述一下', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '0', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('25', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '36.00', '5130121', '描述一下', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '0', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('26', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('27', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('28', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('29', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('30', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '36.00', '5130121', '描述一下', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '0', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('31', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 24}, { \"symbol\": \"B\", \"value\": 12 } ]', '48.00', '5130121', '描述一下', '[{\"userId\": 3210343,\"jobDesc\": \"准备工作\" }, {\"userId\": 5130121,\"jobDesc\": \"指导老师\" }]', null, '0', '[{\"userId\": 3210343,\"weight\": 0.2 }, {\"userId\": 5130121,\"weight\": 0.8 }]', '0');
INSERT INTO `item` VALUES ('32', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 24}, { \"symbol\": \"B\", \"value\": 12 } ]', '9.60', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('33', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 24}, { \"symbol\": \"B\", \"value\": 12 } ]', '38.40', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');
INSERT INTO `item` VALUES ('34', 'workload', '3', '3210343', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '7.20', '5130121', '描述一下', '准备工作', null, '0', '0.2', '1');
INSERT INTO `item` VALUES ('35', 'workload', '3', '5130121', '[ {\"symbol\": \"A\", \"value\": 12}, { \"symbol\": \"B\", \"value\": 12 } ]', '28.80', '5130121', '描述一下', '指导老师', null, '0', '0.8', '1');

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
INSERT INTO `subject` VALUES ('2', '10', '你好', '12', '1499157164');
INSERT INTO `subject` VALUES ('3', '4', '有误', '3210343', '1500178157');
INSERT INTO `subject` VALUES ('4', '4', '你好', '3210343', '1500366776');

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
  `role` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `deadline` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('3210343', '[{\"role\":\"ADMIN\",\"roleName\":\"工作量计算规则配置管理员\"},{\"role\":\"RE\",\"roleName\":\"工作量审核人\"}]', '1', '1500024348');
