/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.context;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;

import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_CAS_SERVER_LOGOUT_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_CAS_USER_PROFILE_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_FILE_UPLOAD_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_ONLINE_USER_COUNT;

/**
 * Description:
 */
public interface StandardApplicationAttributeContext extends ServletContextAdapter {

	/**
	 * 获取CAS个人信息地址
	 * @return String
	 */
	default String getCasUserProfilePath() {

		return (String) getApplicationAttribute(APPLICATION_CAS_USER_PROFILE_PATH);
	}

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
