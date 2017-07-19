/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: User.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年7月5日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.dto;

import java.util.Arrays;
import java.util.List;

/**
 * Description: UserInfo的String类型的角色属性转换为相应的角色对象（Json映射）
 */
public class User {

	private Integer userId;

	/**
	 * 角色信息列表
	 */
	private List<RoleInfo> roleInfoList;

	private int status;

	private String deadline;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public List<RoleInfo> getRoleInfoList() {
		return roleInfoList;
	}

	public void setRoleInfoList(List<RoleInfo> roleInfoList) {
		this.roleInfoList = roleInfoList;
	}

	public void setRoleInfoList(RoleInfo... roleInfoList) {
		this.roleInfoList = Arrays.asList(roleInfoList);
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	@Override
	public String toString() {
		return "User{" + "userId=" + userId + ", roleInfoList=" + roleInfoList + ", status="
				+ status + ", deadline='" + deadline + '\'' + '}';
	}
}
