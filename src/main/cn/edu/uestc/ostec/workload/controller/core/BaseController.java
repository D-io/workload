/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.controller.core;

import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import cn.edu.uestc.ostec.workload.RequestConstants;
import cn.edu.uestc.ostec.workload.ServletContextConstants;
import cn.edu.uestc.ostec.workload.SessionConstants;
import cn.edu.uestc.ostec.workload.WorkloadObjects;
import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;

/**
 * Description: 基础控制器,
 */
public abstract class BaseController
		implements WorkloadObjects,ServletContextConstants, SessionConstants, RequestConstants,
		ServletContextAdapter {

	@Autowired
	protected HttpServletRequest request;

	@Autowired
	protected HttpSession session;

	@Autowired
	protected ServletContext servletContext;

}