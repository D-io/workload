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
 * Description: 系统日志
 */
public class Log {

	/**
	 * 日志所在关联的表名
	 */
	public static final String TABLE_NAME = "log";

	/**
	 * 日志编号
	 */
	private Integer logId;

	/**
	 * 日志等级（INFO，WARNING，ERROR等）
	 */
	private String level;

	/**
	 * 状态
	 */
	private Integer status;

	/**
	 * 创建时间
	 */
	private Integer createTime;

	/**
	 * 相关用户
	 */
	private Integer actorId;

	/**
	 * 日志信息
	 */
	private String message;

	public Integer getLogId() {
		return logId;
	}

	public void setLogId(Integer logId) {
		this.logId = logId;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level == null ? null : level.trim();
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Integer createTime) {
		this.createTime = createTime;
	}

	public Integer getActorId() {
		return actorId;
	}

	public void setActorId(Integer actorId) {
		this.actorId = actorId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message == null ? null : message.trim();
	}

	@Override
	public String toString() {
		return "Log{" + "logId=" + logId + ", level='" + level + '\'' + ", status=" + status
				+ ", createTime=" + createTime + ", actorId=" + actorId + ", message='" + message
				+ '\'' + '}';
	}
}