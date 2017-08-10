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

	public Integer getAimUserId() {
		return aimUserId;
	}

	public void setAimUserId(Integer aimUserId) {
		this.aimUserId = aimUserId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

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
		return "History{" + "historyId=" + historyId + ", itemId='" + itemId + '\'' + ", userId="
				+ userId + ", createTime='" + createTime + '\'' + ", operation='" + operation + '\''
				+ ", type='" + type + '\'' + ", aimUserId=" + aimUserId + '}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		History history = (History) o;

		if (historyId != null ? !historyId.equals(history.historyId) : history.historyId != null)
			return false;
		if (itemId != null ? !itemId.equals(history.itemId) : history.itemId != null)
			return false;
		if (userId != null ? !userId.equals(history.userId) : history.userId != null)
			return false;
		if (createTime != null ?
				!createTime.equals(history.createTime) :
				history.createTime != null)
			return false;
		if (operation != null ? !operation.equals(history.operation) : history.operation != null)
			return false;
		if (type != null ? !type.equals(history.type) : history.type != null)
			return false;
		return aimUserId != null ? aimUserId.equals(history.aimUserId) : history.aimUserId == null;
	}

	@Override
	public int hashCode() {
		int result = historyId != null ? historyId.hashCode() : 0;
		result = 31 * result + (itemId != null ? itemId.hashCode() : 0);
		result = 31 * result + (userId != null ? userId.hashCode() : 0);
		result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
		result = 31 * result + (operation != null ? operation.hashCode() : 0);
		result = 31 * result + (type != null ? type.hashCode() : 0);
		result = 31 * result + (aimUserId != null ? aimUserId.hashCode() : 0);
		return result;
	}
}