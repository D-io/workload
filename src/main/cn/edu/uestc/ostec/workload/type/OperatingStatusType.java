/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: StatusType.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月25日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.type;

import java.util.ArrayList;
import java.util.List;

/**
 * Description: 数据操作状态类型
 */
public interface OperatingStatusType {

	Integer ROOT = 0;

	/**
	 * 工作量类目未提交状态（解锁），工作量条目未提交状态
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
	 * 工作量未审核状态,审核中,工作量条目已提交状态
	 */
	Integer NON_CHECKED = 1;

	/**
	 * 工作量通过状态（申报通过）
	 */
	Integer CHECKED = 2;

	/**
	 * 工作量存疑状态
	 */
	Integer DOUBTED = 3;

	/**
	 * 工作量条目存疑通过
	 */
	Integer DOUBTED_CHECKED = 4;

	/**
	 * 工作量拒绝状态
	 */
	Integer DENIED = 5;

	/**
	 * 工作量类目是叶子节点
	 */
	String IS_LEAF = "Y";

	/**
	 * 工作量类目非叶子节点
	 */
	String NOT_LEAF = "N";

	/**
	 * 获取正常状态下的条目信息
	 *
	 * @return List<Integer> statusList
	 */
	default List<Integer> getNormalStatusList() {

		List<Integer> statusList = new ArrayList<>();
		statusList.add(CHECKED);
		statusList.add(NON_CHECKED);

		return statusList;
	}

	/**
	 * 获取存疑状态下的条目信息
	 *
	 * @return List<Integer> statusList
	 */
	default List<Integer> getAbnormalStatusList() {
		List<Integer> statusList = new ArrayList<>();
		statusList.add(DOUBTED);
		statusList.add(DOUBTED_CHECKED);

		return statusList;
	}

}
