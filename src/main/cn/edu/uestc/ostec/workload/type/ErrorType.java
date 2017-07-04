/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: ErrorType.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.type;

/**
 * Description: 系统错误响应类型
 */
public enum ErrorType {

	NOT_SUPPORT(1001, "not support"),
	NOT_ALLOWED(1002, "not allowed"),
	NOT_FOUND(1003, "not found"),
	INVALID_REQUEST(1004, "invalid request"),
	PARAMETERS_NOT_SUPPORT(1005, "parameters not support"),

	CONVERSION_ERR(2001, "conversion error"),
	MESSAGE_SEND_ERR(2002, "message send failed");

	private int errNo;

	private String errDesc;

	ErrorType(int errNo, String errDesc) {
		this.errNo = errNo;
		this.errDesc = errDesc;
	}

	public int getErrNo() {

		return errNo;
	}

	public String getErrDesc() {

		return errDesc;
	}
}

