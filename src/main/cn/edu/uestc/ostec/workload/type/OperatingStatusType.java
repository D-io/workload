/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: StatusType.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月25日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.type;

/**
 * Description: 数据操作状态类型
 * Version:v1.0 (author:刘文哲 update: 创建无效0x00～已完成0x08状态 )
 */
public interface OperatingStatusType {

	/**
	 * 未提交状态（解锁）
	 */
	Integer UNCOMMITTED = 0;

	/**
	 * 已提交状态（锁定）
	 */
	Integer SUBMITTED = 1;

	/**
	 * 已删除状态（无效状态）
	 */
	Integer DELETED = -1;

	/**
	 * 导入Excel的方式
	 */
	Integer IMPORT_EXCEL = 1;

	/**
	 * 自我申报的方式
	 */
	Integer APPLY_SELF = 0;

}
