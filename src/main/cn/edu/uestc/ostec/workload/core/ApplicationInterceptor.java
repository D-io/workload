/*
 * AEMS（工程认证达成度评价管理系统）
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 17-5-2 下午11:36
 * Copyright: Copyright (c) 2017.
 */

package cn.edu.uestc.ostec.workload.core;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.edu.uestc.ostec.workload.ServletContextConstants;
import cn.edu.uestc.ostec.workload.SessionConstants;
import cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper;

import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_BROWSER;
import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_IP_ADDRESS;
import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_OPERATING_SYSTEM;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.BROWSER;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.IP_ADDRESS;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.OPERATING_SYSTEM;

/**
 * Description: 拦截器
 * Version:v1.0 (author:刘文哲 update:  )
 */
public class ApplicationInterceptor extends HandlerInterceptorAdapter
		implements SessionConstants, ServletContextConstants {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {

//		String currentUrl = request.getServletPath();
//
//		if (currentUrl.contains(AEMS_DEFAULT_PAGE)) {
//			return super.preHandle(request, response, handler);
//		}
//
//		if (!currentUrl.contains("logout")) {
//			if (request.getSession().getAttribute(SESSION_USER_IDENTIFIER) == null) {
//				response.sendRedirect(AEMS_SIGN_IN_URL);
//			}
//		}

		//在request域中设置客户端信息 BEGIN
		Map<String, String> clientInfo = ClientInfoHelper.getClientInfo(request);
		request.setAttribute(REQUEST_CLIENT_BROWSER, clientInfo.get(BROWSER));
		request.setAttribute(REQUEST_CLIENT_OPERATING_SYSTEM, clientInfo.get(OPERATING_SYSTEM));
		request.setAttribute(REQUEST_CLIENT_IP_ADDRESS, clientInfo.get(IP_ADDRESS));
		//在request域中设置客户端信息 BEGIN

		return super.preHandle(request, response, handler);
	}
}
