/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: ClientIPAddressHelper.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月9日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

import nl.bitwalker.useragentutils.UserAgent;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * Description: 客户端Ip辅助类
 * Version:v1.0 (author:刘文哲 update: 无 )
 * Version:v1.1 (author:刘文哲 update: 增加客户端信息获取，包括操作系统、浏览器 )
 */
public final class ClientInfoHelper {

	/**
	 * 浏览器
	 */
	public static final String BROWSER = "browser";

	/**
	 * 操作系统
	 */
	public static final String OPERATING_SYSTEM = "operatingSystem";

	/**
	 * IP地址
	 */
	public static final String IP_ADDRESS = "ipAddress";

	private ClientInfoHelper() {
	}

	public static String getIpAddress(HttpServletRequest request) {
		return getIpAddress(request, new HashMap<>()).get(IP_ADDRESS);
	}

	public static Map<String, String> getIpAddress(HttpServletRequest request,
			Map<String, String> clientInfo) {
		String ip = request.getHeader("X-Forwarded-For");
		if (ip != null && !ip.isEmpty() && !"unKnown".equalsIgnoreCase(ip)) {
			//多次反向代理后会有多个ip值，第一个ip才是真实ip
			int index = ip.indexOf(",");
			if (index != -1) {
				clientInfo.put(IP_ADDRESS, ip.substring(0, index));
				return clientInfo;

			} else {
				clientInfo.put(IP_ADDRESS, ip);
				return clientInfo;
			}
		}
		ip = request.getHeader("X-Real-IP");
		if (ip != null && !ip.isEmpty() && !"unKnown".equalsIgnoreCase(ip)) {
			clientInfo.put(IP_ADDRESS, ip);

			return clientInfo;
		}
		clientInfo.put(IP_ADDRESS, request.getRemoteAddr());

		return clientInfo;
	}

	/**
	 * 获取客户端浏览器，操作系统信息
	 *
	 * @param request 请求信息
	 * @return 返回客户端浏览器，操作系统信息组成的Map
	 */
	public static final Map<String, String> getClientPlatform(HttpServletRequest request) {

		return getClientPlatform(request, new HashMap<>());
	}

	/**
	 * 获取客户端浏览器，操作系统信息
	 *
	 * @param request    请求信息
	 * @param clientInfo 客户端信息
	 * @return 返回客户端浏览器，操作系统信息组成的Map
	 */
	public static final Map<String, String> getClientPlatform(HttpServletRequest request,
			Map<String, String> clientInfo) {
		//获取用户代理信息
		UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
		//存放浏览器信息
		clientInfo.put(BROWSER, userAgent.getBrowser().getName());
		//存放操作系统信息
		clientInfo.put(OPERATING_SYSTEM, userAgent.getOperatingSystem().getName());

		return clientInfo;
	}

	/**
	 * 获取客户端信息（包含操作系统，浏览器，IP地址信息）
	 *
	 * @param request 请求信息
	 * @return 返回客户端信息组成的Map
	 */
	public static final Map<String, String> getClientInfo(HttpServletRequest request) {

		Map<String, String> clientInfo = new HashMap<>();
		// 获取客户端平台信息
		clientInfo = getClientPlatform(request, clientInfo);
		// 获取客户端IP
		clientInfo = getIpAddress(request, clientInfo);

		return clientInfo;
	}

}
