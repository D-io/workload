/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */


package cn.edu.uestc.ostec.workload.controller.common;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.User;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.AUTH_PATH;

/**
 * Description: 登入登出控制器
 */
@Controller
@RequestMapping(AUTH_PATH)
public class SignInAndOutController extends ApplicationController {

	public static final String SIGN_IN = "login";

	public static final String SIGN_OUT = "logout";

	@RequestMapping(SIGN_IN)
	public String login() {

		// 获取cas服务器响应数据
		Map<String, Object> attributes = ((AttributePrincipal) (request.getUserPrincipal()))
				.getAttributes();

		// 将CAS响应数据封装为User用户实体
		User user = new User();
		user.setName((String) attributes.get("name"));
		user.setUserType((String) attributes.get("userType"));
		//TODO 由于教师对应的编号位数较少，采用了短整型数据，数据范围为 -2的31次方 到 2的31次方，最大值 4 294 967 296
		//TODO 需要将所有的 userId 类型的用户编号修改为长整形，包括数据库中数据类型
		String userId = (String) attributes.get("userId");
		user.setUserId(Integer.valueOf(userId.length() > 8 ? "0" : userId));

		//user.setUserId(Integer.valueOf((String) attributes.get("userId")));
		user.setEmail((String) attributes.get("email"));

		// 向session中注入用户信息
		session.setAttribute(SESSION_USER_IDENTIFIER, user.getUserId());
		session.setAttribute(SESSION_USER_INFO_ENTITY, user);
		session.setAttribute(SESSION_USER_NAME, user.getName());

		// 重定向到首页
		return getRedirectUrlPath(DEFAULT_PAGE);
	}

	@RequestMapping(SIGN_OUT)
	public String logout(HttpServletResponse response) throws IOException {

		//如果session域中存在用户标识符，才进行登出操作
		if (session.getAttribute(SESSION_USER_IDENTIFIER) != null) {
			if (!session.isNew()) {
				session.invalidate();
			}
			//从application域中获取cas登出服务地址
			String casLogoutUrl = getCasLogOutPath();

			//当前登出请求的地址
			String requestUrl = request.getRequestURL().toString();

			//重定向到cas服务器进行登出动作
			return getRedirectUrlPath(casLogoutUrl + requestUrl);
		}
		//非登出操作，重定向用户至系统默认页面
		return getRedirectUrlPath(DEFAULT_PAGE);
	}

}
