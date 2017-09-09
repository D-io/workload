/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.controller.core;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.context.StandardApplicationAttributeContext;
import cn.edu.uestc.ostec.workload.context.StandardSessionAttributeContext;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.support.utils.ExcelExportHelper;
import cn.edu.uestc.ostec.workload.type.OperatingStatusType;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.DEFAULT_WEB_URL_SEPARATOR;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_TYPE;

/**
 * Description: 应用控制器
 */
public class ApplicationController extends ResultController
		implements StandardApplicationAttributeContext, StandardSessionAttributeContext {

	/**
	 * 转发名称
	 */
	private static final String FORWARD_KEY = "forward";

	/**
	 * 重定向名称
	 */
	private static final String REDIRECT_KEY = "redirect";

	/**
	 * 获取系统上下文路径
	 *
	 * @return 系统上下文路径
	 */
	public String getContextPath() {
		return servletContext.getContextPath();
	}

	public Integer getUserId() {
		return getUser().getUserId();
	}

	public User getUser() {
		return (User) session.getAttribute(SESSION_USER_INFO_ENTITY);
	}

	@SuppressWarnings("unchecked")
	protected List<RoleInfo> getUserRoles() {
		return (List<RoleInfo>) session.getAttribute(SESSION_USER_ROLE_LIST);
	}

	/**
	 * 根据数据源导出相应的Excel列表
	 *
	 * @param itemDtoList 数据源
	 * @return RestResponse
	 */
	public RestResponse getExportExcel(List<ItemDto> itemDtoList) {
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse();
		}
		byte[] file = ExcelExportHelper.exportItemInfo(itemDtoList);
		try {
			return streamResponse(file, user.getName() + "(" + getCurrentSemester() + ")" + ".xls");
		} catch (IOException e) {
			e.printStackTrace();
			return systemErrResponse();
		}
	}

	public RestResponse getExportWorkloadExcel(List<TeacherWorkload> workloadList){
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse();
		}
		byte[] file = ExcelExportHelper.exportTotalWorkload(workloadList);
		try {
			return streamResponse(file, "【" + getCurrentSemester() + "】教学工作当量统计表.xls");
		} catch (IOException e) {
			e.printStackTrace();
			return systemErrResponse();
		}
	}

	/**
	 * 获取角色编码信息列表
	 *
	 * @return List<String>
	 */
	public List<String> getUserRoleCodeList() {
		List<String> roleCodes = new ArrayList<>();
		List<RoleInfo> roleInfoList = getUserRoles();
		for (RoleInfo roleInfo : roleInfoList) {
			roleCodes.add(roleInfo.getRole());
		}
		return roleCodes;
	}

	/**
	 * 获取转发地址
	 *
	 * @param url 请求的地址
	 * @return 转发地址
	 */
	public String getForwardUrlPath(String url) {
		return getForwardUrlPath(url, null);
	}

	/**
	 * 获取转发地址
	 *
	 * @param url        请求的地址
	 * @param parameters 请求参数（非必需）
	 * @return 转发地址
	 */
	public String getForwardUrlPath(String url, Map<String, String> parameters) {
		return buildRouteUrl(url, false, parameters);
	}

	/**
	 * 获取重定向地址
	 *
	 * @param url 请求的地址
	 * @return 重定向地址
	 */
	public String getRedirectUrlPath(String url) {
		return getRedirectUrlPath(url, null);
	}

	/**
	 * 获取重定向地址
	 *
	 * @param url        请求的地址
	 * @param parameters 请求参数（非必需）
	 * @return 重定向地址
	 */
	public String getRedirectUrlPath(String url, Map<String, String> parameters) {
		return buildRouteUrl(url, true, parameters);
	}

	public boolean isValidImportedRequired(Integer importedRequired) {
		return IMPORT_EXCEL.equals(importedRequired) || APPLY_SELF.equals(importedRequired)
				|| NON_TYPE.equals(importedRequired);
	}

	public <T> boolean isEmptyList(List<T> arrayList) {
		return null == arrayList || arrayList.isEmpty();
	}

	public boolean isEmptyString(String str) {
		return null == str || "".equals(str);
	}

	public boolean isEmptyNumber(Integer num) {
		return null == num || ZERO_INT == num;
	}

	/**
	 * 获取转发或重定向请求路径
	 *
	 * @param url        请求的地址
	 * @param isRedirect 是否为重定向
	 * @param parameters 请求参数（非必需）
	 * @return 构建好的带有前缀和参数的地址
	 */
	private String buildRouteUrl(String url, boolean isRedirect, Map<String, String> parameters) {
		String forwardPrefix = _buildRoutePathPrefix(FORWARD_KEY);
		String redirectPrefix = _buildRoutePathPrefix(REDIRECT_KEY);

		//获取路由类型
		String prefix = isRedirect ? redirectPrefix : forwardPrefix;

		//如果路径为空，则默认跳转首页，以重定向方式
		if (url == null || url.isEmpty()) {
			return redirectPrefix + _buildUrlPath(DEFAULT_PAGE);
		}

		//如果参数为空，则构建不带参数的转发前缀的url
		if (parameters == null || parameters.isEmpty()) {
			return prefix + _buildUrlPath(url);
		}

		//如果参数不为空,构建参数后缀
		StringBuilder suffix = new StringBuilder();
		for (Map.Entry<String, String> parameter : parameters.entrySet()) {
			suffix.append(parameter.getKey() + "=" + parameter.getValue() + "&");
		}
		//截取参数，将结尾的"&"去掉
		String parameter = suffix.substring(0, suffix.length() - 1);

		return prefix + _buildUrlPath(url) + "?" + parameter;
	}

	/**
	 * 构建路由
	 *
	 * @param key 关键字
	 * @return 构建好的路由前缀
	 */
	private String _buildRoutePathPrefix(String key) {
		//以springmvc的规范进行路径拼接
		return key + ":";
	}

	/**
	 * 构建URL路径（绝对路径）
	 *
	 * @param url url路径
	 * @return 以/作为前缀的绝对路径
	 */
	private String _buildUrlPath(String url) {
		//如果url以"/"或"http"开头，不需要添加，直接返回
		if (url == null) {
			return url;
		} else if (url.startsWith("http://") || url.startsWith("https://")) {
			return url;
		} else if (url.startsWith(DEFAULT_WEB_URL_SEPARATOR)) {
			return url;
		} else {
			//不以"/"开头则添加"/"后返回
			return DEFAULT_WEB_URL_SEPARATOR + url;
		}
	}

	public String buildHistoryItemId(Integer itemId) {
		return "I" + itemId.toString();
	}

	public String buildHistoryCategoryId(Integer categoryId) {
		return "C" + categoryId.toString();
	}

}
