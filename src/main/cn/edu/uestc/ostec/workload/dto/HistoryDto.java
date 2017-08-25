/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dto;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
public class HistoryDto {

	/**
	 * 历史记录编号
	 */
	private Integer historyId;

	/**
	 * 处理的条目编号（可能是类目，可能是条目）
	 */
	private String itemId;

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

	/**
	 * 类型
	 */
	private String type;

	/**
	 * 目标用户编号
	 */
	private Integer aimUserId;

	/**
	 * 版本号，学期号
	 */
	private String version = DateHelper.getCurrentTerm();

	private String userName = null;

	public Integer getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Integer historyId) {
		this.historyId = historyId;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
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
		this.createTime = createTime;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getAimUserId() {
		return aimUserId;
	}

	public void setAimUserId(Integer aimUserId) {
		this.aimUserId = aimUserId;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}
