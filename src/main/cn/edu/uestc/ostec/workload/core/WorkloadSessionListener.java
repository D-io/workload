/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: AemsSessionListener.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.core;

import org.junit.Test;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import cn.edu.uestc.ostec.workload.SessionConstants;
import cn.edu.uestc.ostec.workload.WorkloadObjects;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Description: session监听器
 */
public class WorkloadSessionListener implements HttpSessionListener, WorkloadObjects, SessionConstants {

	private HttpSession session;

	/**
	 * 处理新用户进入系统时的初始化参数配置
	 */
	@Override
	public void sessionCreated(HttpSessionEvent httpSessionEvent) {

		session = httpSessionEvent.getSession();
		session.setAttribute(SESSION_CURRENT_YEAR,DateHelper.getCurrentSchemeYear());
		session.setAttribute(SESSION_CURRENT_SCHEME,DateHelper.getCurrentScheme());
		session.setAttribute(SESSION_CURRENT_SCHOOL_YEARS,DateHelper.getCurrentSchoolYears());

	}

	/**
	 * 处理用户退出时资源释放
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {

		session = httpSessionEvent.getSession();
	}
}
