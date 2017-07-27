/*
 *
 *  * Project: workload（工作量计算系统）
 *  * File: RegionManagerController.java
 *  * Author: 张健顺
 *  * Email: 1224522500@qq.com
 *  * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.aspect.impl;

import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.aspect.IAspect;

/**
 * Description: 文件上传下载切面
 */
@Aspect
@Component
public class FileUploadDownloadAspectImpl implements IAspect {

	/**
	 * 日志对象
	 */
	private static final Logger LOGGER = LoggerFactory
			.getLogger(FileUploadDownloadAspectImpl.class);

}
