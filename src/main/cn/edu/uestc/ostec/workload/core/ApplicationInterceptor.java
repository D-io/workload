/*
 * AEMS（工程认证达成度评价管理系统）
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 17-5-2 下午11:36
 * Copyright: Copyright (c) 2017.
 */

package cn.edu.uestc.ostec.workload.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.ForbiddenException;

import cn.edu.uestc.ostec.workload.ServletContextConstants;
import cn.edu.uestc.ostec.workload.SessionConstants;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.dto.User;
import cn.edu.uestc.ostec.workload.service.UserRoleService;
import cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper;

import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_BROWSER;
import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_IP_ADDRESS;
import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_OPERATING_SYSTEM;
import static cn.edu.uestc.ostec.workload.controller.common.SignInAndOutController.SIGN_OUT;
import static cn.edu.uestc.ostec.workload.controller.core.ResultController.DEFAULT_PAGE;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.BROWSER;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.IP_ADDRESS;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.OPERATING_SYSTEM;

/**
 * Description: 拦截器
 * Version:v1.0 (author:刘文哲 update:  )
 */
public class ApplicationInterceptor extends HandlerInterceptorAdapter
		implements SessionConstants, ServletContextConstants {

	@Autowired
	private UserRoleService userRoleService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute(SESSION_USER_IDENTIFIER);

		//在request域中设置客户端信息 BEGIN
		injectUserClientInfo(request);
		//在request域中设置客户端信息 BEGIN

		//检查用户认证功能情况
		boolean isSignIn = checkUserAuthorization(request);
		if (!isSignIn) {
			//TODO 对未登录对请求进行跳转登录操作
			return super.preHandle(request, response, handler);
		}

		/*以下操作均默认用户已登录*/

		//注入用户角色信息
		injectUserRoleInfo(userId, session);

		return super.preHandle(request, response, handler);
	}

	/**
	 * 检查用户认证情况
	 */
	private boolean checkUserAuthorization(HttpServletRequest request) throws Exception {
		String currentUrl = request.getServletPath();
		HttpSession session = request.getSession();

		if (currentUrl.contains(DEFAULT_PAGE)) {
			return false;
		}
		Integer userId = (Integer) session.getAttribute(SESSION_USER_IDENTIFIER);

		//判断是否登录，已登录返回true，否则返回false
		//登出请求不进行后续处理
		return !currentUrl.contains(SIGN_OUT) && userId != null;

	}

	/**
	 * 向session中注入用户角色信息
	 *
	 * @param userId  用户编号
	 * @param session 当前会话
	 */
	private void injectUserRoleInfo(int userId, HttpSession session) {
		User user = userRoleService.getUserRoleDto(userId);
		//未找到当前用户信息,拒绝请求
		if (user == null) {
			throw new ForbiddenException();
		}
		List<RoleInfo> roleInfoList = user.getRoleInfoList();
		//用户没有角色，拒绝请求
		if (roleInfoList == null || roleInfoList.size() == 0) {
			throw new ForbiddenException();
		}
		session.setAttribute(SESSION_USER_ROLE_LIST, roleInfoList);
	}

	/**
	 * 注入用户客户端信息
	 *
	 * @param request 当前请求
	 */
	private void injectUserClientInfo(HttpServletRequest request) {
		Map<String, String> clientInfo = ClientInfoHelper.getClientInfo(request);
		request.setAttribute(REQUEST_CLIENT_BROWSER, clientInfo.get(BROWSER));
		request.setAttribute(REQUEST_CLIENT_OPERATING_SYSTEM, clientInfo.get(OPERATING_SYSTEM));
		request.setAttribute(REQUEST_CLIENT_IP_ADDRESS, clientInfo.get(IP_ADDRESS));
	}
}
