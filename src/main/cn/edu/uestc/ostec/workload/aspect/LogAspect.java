/*
 *
 *  * Project: workload（工作量计算系统）
 *  * File: RegionManagerController.java
 *  * Author: 张健顺
 *  * Email: 1224522500@qq.com
 *  * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.aspect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Description:
 */
public interface LogAspect extends IAspect {

	/**
	 * 日志对象
	 */
	Logger LOGGER = LoggerFactory.getLogger(LogAspect.class);

}
