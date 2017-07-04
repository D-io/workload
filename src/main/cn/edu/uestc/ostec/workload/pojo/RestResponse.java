/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: RestResponse.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.pojo;

import java.util.Map;

/**
 * Description: RESTful风格响应参数
 */
public class RestResponse {

	/**
	 * 状态值
	 */
	private int status;

	/**
	 * 状态名称
	 */
	private String statusName;

	/**
	 * 响应数据
	 */
	private Map<String, Object> data;

	public RestResponse(int status, String statusName, Map<String, Object> data) {
		this.status = status;
		this.statusName = statusName;
		this.data = data;
	}

	public RestResponse() {
	}

	public RestResponse(int status, String statusName) {
		this.status = status;
		this.statusName = statusName;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "RestResponse{" + "status=" + status + ", statusName='" + statusName + '\''
				+ ", data=" + data + '}';
	}
}
