/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload;

/**
 * Description: Application域系统常量
 */
public interface ServletContextConstants extends WebParametersConstants {

	/**
	 * 在线用户总数
	 */
	String APPLICATION_ONLINE_USER_COUNT = "ONLINE_USER_COUNT";

	/**
	 * 统一认证中心登出服务路径
	 */
	String APPLICATION_CAS_SERVER_LOGOUT_PATH = "CAS_SERVER_LOGOUT_PATH";

	/**
	 * 文件上传路径
	 */
	String APPLICATION_FILE_UPLOAD_PATH = "FILE_UPLOAD_PATH";

}
