/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: StandardRequestAttributeContext.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月26日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.context;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;

import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_BROWSER;
import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_OPERATING_SYSTEM;

/**
 * Description: 标准request域属性上下文
 * Version:v1.0 (author:刘文哲 update:  )
 */
public interface StandardRequestAttributeContext extends ServletContextAdapter {

	/**
	 * 获取项目路径信息
	 *
	 * @return 项目路径信息
	 */
	default String getApplicationUrl() {

		return getRequestContext().getContextPath();
	}

	/**
	 * 获取当前请求的客户端浏览器信息
	 *
	 * @return 客户端浏览器信息
	 */
	default String getClientBrowser() {

		return (String) getRequestContext().getAttribute(REQUEST_CLIENT_BROWSER);
	}

	/**
	 * 获取当前请求的客户端操作系统信息
	 *
	 * @return 客户端操作系统信息
	 */
	default String getClientOperatingSystem() {

		return (String) getRequestContext().getAttribute(REQUEST_CLIENT_OPERATING_SYSTEM);
	}

}
