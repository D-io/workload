/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.controller.core;

import nl.bitwalker.useragentutils.Browser;

import org.springframework.http.MediaType;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import cn.edu.uestc.ostec.workload.context.StandardRequestAttributeContext;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;

import static cn.edu.uestc.ostec.workload.support.utils.ResponseHelper.getInvalidOperationResponse;
import static cn.edu.uestc.ostec.workload.support.utils.ResponseHelper.getNotFoundResponse;
import static cn.edu.uestc.ostec.workload.support.utils.ResponseHelper.getParameterNotSupportResponse;
import static cn.edu.uestc.ostec.workload.support.utils.ResponseHelper.getSuccessResponse;
import static cn.edu.uestc.ostec.workload.support.utils.ResponseHelper.getSystemErrResponse;

/**
 * Description: 响应结果控制器
 */
public abstract class ResultController extends BaseController
		implements StandardRequestAttributeContext {

	/**
	 * 成功响应页面
	 */
	protected static final String SUCCESS_PAGE = "success";

	/**
	 * 默认响应页面
	 */
	public static final String DEFAULT_PAGE = "default";

	/**
	 * 默认测试响应页面
	 */
	protected static final String DEFAULT_TEST_PAGE = "test-default";

	/**
	 * 事件响应原因名称
	 */
	private static final String DEFAULT_CAUSE_NAME = "cause";

	/**
	 * 成功响应信息名称
	 */
	private static final String DEFAULT_DATA_NAME = "info";

	/**
	 * 事件响应原因信息
	 */
	private static final String DEFAULT_CAUSE_MESSAGE = "";

	/**
	 *
	 * @return
	 */
	public RestResponse successResponse() {

		return successResponse(IMMUTABLE_EMPTY_MAP);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse successResponse(Object data) {

		Map<String, Object> _data = getData();
		_data.put(DEFAULT_DATA_NAME, data);

		return successResponse(_data);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse successResponse(Map<String, Object> data) {

		return getSuccessResponse(data);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse notFoundResponse() {

		return notFoundResponse(DEFAULT_CAUSE_MESSAGE);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse notFoundResponse(Map<String, Object> message) {

		return getNotFoundResponse(message);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse notFoundResponse(Object message) {
		Map<String, Object> data = getData();
		data.put(DEFAULT_CAUSE_NAME, message);

		return getNotFoundResponse(data);
	}

	/**
	 *
	 * @param message
	 * @return
	 */
	public RestResponse systemErrResponse(Map<String, Object> message) {

		return getSystemErrResponse(message);
	}

	/**
	 *
	 * @param message
	 * @return
	 */
	public RestResponse systemErrResponse(Object message) {
		Map<String, Object> data = getData();
		data.put(DEFAULT_CAUSE_NAME, message);

		return getSystemErrResponse(data);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse systemErrResponse() {

		return systemErrResponse(DEFAULT_CAUSE_MESSAGE);
	}

	/**
	 *
	 * @param message
	 * @return
	 */
	public RestResponse invalidOperationResponse(Map<String, Object> message) {

		return getInvalidOperationResponse(message);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse invalidOperationResponse(Object message) {
		Map<String, Object> data = getData();
		data.put(DEFAULT_CAUSE_NAME, message);

		return invalidOperationResponse(data);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse invalidOperationResponse() {

		return invalidOperationResponse(DEFAULT_CAUSE_MESSAGE);
	}

	/**
	 *
	 * @return
	 */
	public RestResponse parameterNotSupportResponse() {

		return parameterNotSupportResponse(DEFAULT_CAUSE_MESSAGE);
	}

	/**
	 *
	 * @param message
	 * @return
	 */
	public RestResponse parameterNotSupportResponse(Map<String, Object> message) {

		return getParameterNotSupportResponse(message);
	}

	/**
	 *
	 * @param message
	 * @return
	 */
	public RestResponse parameterNotSupportResponse(Object message) {
		Map<String, Object> data = getData();
		data.put(DEFAULT_CAUSE_NAME, message);

		return parameterNotSupportResponse(data);
	}

	/**
	 * 响应流返回结果
	 *
	 * @param file     文件信息
	 * @param fileName 下载时显示的文件名称
	 * @return 空
	 * @throws IOException 将文件写入流中可能存在IO异常
	 */
	public RestResponse streamResponse(FileInfo file, String fileName) throws IOException {

		HttpServletResponse response = getResponseContext();

		//设置响应类型
		response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
		response.setHeader("Accept-Ranges", "bytes");
		response.setIntHeader("Accept-Length", Math.toIntExact(file.getSize()));// 解决乱码问题

		// FireFox用ISO-8859-1
		String encodedFileName;
		if (Browser.IE.getName().equals(getClientBrowser())) {
			encodedFileName = URLEncoder.encode(fileName, "UTF-8");
		} else {
			encodedFileName = new String(fileName.getBytes(), "ISO-8859-1");
		}
		response.setHeader("Content-Disposition",
				"attachment; filename=\"" + encodedFileName + "\"; filename*=utf-8''" + encodedFileName);

		Path path = Paths.get(file.getPath());
		Files.copy(path, response.getOutputStream());

		return successResponse();
	}

	public RestResponse streamResponse(byte bytes[], String fileName) throws IOException {

		HttpServletResponse response = getResponseContext();

		//设置响应类型
		response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
		response.setHeader("Accept-Ranges", "bytes");
		//		response.setIntHeader("Accept-Length", Math.toIntExact(file.getSize()));// 解决乱码问题

		// FireFox用ISO-8859-1
		String encodedFileName;
		if (Browser.IE.getName().equals(getClientBrowser())) {
			encodedFileName = URLEncoder.encode(fileName, "UTF-8");
		} else {
			encodedFileName = new String(fileName.getBytes(), "ISO-8859-1");
		}
		response.setHeader("Content-Disposition",
				"attachment; filename=\"" + encodedFileName + "\"; filename*=utf-8''"
						+ encodedFileName);

		response.getOutputStream().write(bytes);
		return successResponse();
	}

}
