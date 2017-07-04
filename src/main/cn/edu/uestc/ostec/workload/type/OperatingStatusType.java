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
 */
public interface OperatingStatusType {

	/**
	 * 工作量类目未提交状态（解锁）
	 */
	Integer UNCOMMITTED = 0;

	/**
	 * 工作量类目已提交状态（锁定）
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

	/**
	 * 工作量未审核状态
	 */
	Integer NON_CHECKED = 1;

	/**
	 * 工作量未复核状态
	 */
	Integer NON_CHECKED_AGAIN = 2;

	/**
	 * 工作量通过状态
	 */
	Integer CHECKED = 3;

	/**
	 * 工作量存疑状态
	 */
	Integer DOUBTED = 4;

	/**
	 * 工作量拒绝状态
	 */
	Integer DENIED = 5;


}
