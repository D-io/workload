/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: UserRole.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.pojo;

/**
 * Description: 用户角色映射表
 */
public class UserRole {

	/**
	 * 用户角色映射所在关联的表名
	 */
	public static final String TABLE_NAME = "user_role";

	/**
	 * 账户编号
	 */
	private Integer userId;

	/**
	 * 角色编号
	 */
	private String role;

	/**
	 * 状态值（是否启用）
	 */
	private Integer status;

	/**
	 * 有效期
	 */
	private Integer deadline;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getDeadline() {
		return deadline;
	}

	public void setDeadline(Integer deadline) {
		this.deadline = deadline;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		UserRole userRole = (UserRole) o;

		if (userId != null ? !userId.equals(userRole.userId) : userRole.userId != null)
			return false;
		if (role != null ? !role.equals(userRole.role) : userRole.role != null)
			return false;
		if (status != null ? !status.equals(userRole.status) : userRole.status != null)
			return false;
		return deadline != null ? deadline.equals(userRole.deadline) : userRole.deadline == null;
	}

	@Override
	public int hashCode() {
		int result = userId != null ? userId.hashCode() : 0;
		result = 31 * result + (role != null ? role.hashCode() : 0);
		result = 31 * result + (status != null ? status.hashCode() : 0);
		result = 31 * result + (deadline != null ? deadline.hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "UserRole{" + "userId=" + userId + ", role='" + role + '\'' + ", status=" + status
				+ ", deadline=" + deadline + '}';
	}
}