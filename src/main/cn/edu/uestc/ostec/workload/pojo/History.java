/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.pojo;

/**
 * Description: 历史记录
 */
public class History {

	/**
	 * 历史记录所在关联的表名
	 */
	public static final String TABLE_NAME = "history";

	/**
	 * 历史记录编号
	 */
	private Integer historyId;

	/**
	 * 用户编号
	 */
	private Integer userId;

	/**
	 * 操作时间
	 */
	private String createTime;

	/**
	 * 操作
	 */
	private String operation;

	public Integer getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Integer historyId) {
		this.historyId = historyId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime == null ? null : createTime.trim();
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation == null ? null : operation.trim();
	}

	@Override
	public String toString() {
		return "History{" + "userId=" + userId + ", createTime='" + createTime + '\''
				+ ", operation='" + operation + '\'' + '}';
	}
}