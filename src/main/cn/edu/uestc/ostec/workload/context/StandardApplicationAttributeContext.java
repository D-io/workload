/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: StandardApplicationAttributeContext.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月25日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.context;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;

import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_CAS_SERVER_LOGOUT_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_FILE_UPLOAD_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_ONLINE_USER_COUNT;

/**
 * Description:
 * Version:v1.0 (author:刘文哲 update:  )
 */
public interface StandardApplicationAttributeContext extends ServletContextAdapter {

	/**
	 * 获取系统文件上传路径
	 *
	 * @return 返回字符串类型的当前系统文件上传路径，不存在则返回null
	 */
	default String getFileUploadPath() {

		return (String) getApplicationAttribute(APPLICATION_FILE_UPLOAD_PATH);
	}

	/**
	 * 获取当前系统在线用户数
	 *
	 * @return 返回在线用户总数
	 */
	default Integer getOnlineUserCount() {

		return (Integer) getApplicationAttribute(APPLICATION_ONLINE_USER_COUNT);
	}

	/**
	 * 返回统一认证中心登出地址
	 *
	 * @return 返回统一认证中心登出地址
	 */
	default String getCasLogOutPath() {

		return (String) getApplicationAttribute(APPLICATION_CAS_SERVER_LOGOUT_PATH);
	}

	/**
	 * 获取application域属性
	 *
	 * @param parameter 属性名称
	 * @return 返回存于application域的属性
	 */
	default Object getApplicationAttribute(String parameter) {

		return getServletContext().getAttribute(parameter);
	}

}
