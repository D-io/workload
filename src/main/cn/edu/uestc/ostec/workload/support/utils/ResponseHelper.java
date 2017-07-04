/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: ResponseHelper.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import cn.edu.uestc.ostec.workload.pojo.RestResponse;

import static cn.edu.uestc.ostec.workload.type.ErrorType.INVALID_REQUEST;
import static cn.edu.uestc.ostec.workload.type.ErrorType.PARAMETERS_NOT_SUPPORT;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

/**
 * Description: rest服务响应工具类
 * Version:v1.0 (author:刘文哲 update:none)
 */
public class ResponseHelper {

	private ResponseHelper() {
	}

	/**
	 * 成功响应
	 */
	private static RestResponse okResponse;

	/**
	 * 错误响应
	 */
	private static RestResponse failedResponse;

	/**
	 * 空响应数据
	 */
	private static Map<String, Object> emptyData;

	static {
		okResponse = new RestResponse(OK.value(), OK.name());
		failedResponse = new RestResponse();
		emptyData = Collections.unmodifiableMap(new HashMap<>());
	}

	/**
	 * 获取成功响应
	 */
	public static RestResponse getSuccessResponse(Map<String, Object> data) {
		okResponse.setData(data);
		return okResponse;
	}

	/**
	 * 获取成功响应
	 *
	 * @return 返回成功响应数据实体
	 */
	public static RestResponse getSuccessResponse() {

		return getSuccessResponse(emptyData);
	}

	/**
	 *
	 * @param data
	 * @return
	 */
	public static RestResponse getNotFoundResponse(Map<String, Object> data) {
		failedResponse.setStatus(NOT_FOUND.value());
		failedResponse.setStatusName(NOT_FOUND.name());
		failedResponse.setData(data);
		return failedResponse;
	}

	/**
	 *
	 * @param data
	 * @return
	 */
	public static RestResponse getInvalidOperationResponse(Map<String, Object> data) {
		failedResponse.setStatus(INVALID_REQUEST.getErrNo());
		failedResponse.setStatusName(INVALID_REQUEST.getErrDesc());
		failedResponse.setData(data);
		return failedResponse;
	}

	/**
	 *
	 * @param data
	 * @return
	 */
	public static RestResponse getParameterNotSupportResponse(Map<String, Object> data) {
		failedResponse.setStatus(PARAMETERS_NOT_SUPPORT.getErrNo());
		failedResponse.setStatusName(PARAMETERS_NOT_SUPPORT.getErrDesc());
		failedResponse.setData(data);
		return failedResponse;
	}

	/**
	 *
	 * @param data
	 * @return
	 */
	public static RestResponse getForbiddenResponse(Map<String, Object> data) {
		failedResponse.setStatus(FORBIDDEN.value());
		failedResponse.setStatusName(FORBIDDEN.name());
		failedResponse.setData(data);
		return failedResponse;
	}

	/**
	 *
	 * @param data
	 * @return
	 */
	public static RestResponse getSystemErrResponse(Map<String, Object> data) {
		failedResponse.setStatus(INTERNAL_SERVER_ERROR.value());
		failedResponse.setStatusName(INTERNAL_SERVER_ERROR.name());
		failedResponse.setData(data);
		return failedResponse;
	}

}
