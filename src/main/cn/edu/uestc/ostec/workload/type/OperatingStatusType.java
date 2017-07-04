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
	 * 无效状态
	 */
	int INVALID = 0x00;

	/**
	 * 已创建状态
	 */
	int CREATED = 0x01;

	/**
	 * 已保存状态
	 */
	int SAVED = 0x02;

	/**
	 * 已提交状态
	 */
	int SUBMITTED = 0x04;

	/**
	 * 已完成状态
	 */
	int FINISHED = 0x08;

}
