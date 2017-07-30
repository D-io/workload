/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload.context;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;
import cn.edu.uestc.ostec.workload.pojo.User;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_CURRENT_SCHEME;
import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_CURRENT_YEAR;
import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_IDENTIFIER;
import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;

/**
 * Description:标准session域属性上下文
 * Version:v1.0 (author:刘文哲 update: 无 )
 */
public interface StandardSessionAttributeContext extends ServletContextAdapter {

	/**
	 * 获取当前用户
	 *
	 * @return 返回当前用户信息对象，不存在则返回null
	 */
	default User getUser() {
		
		return (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
	}

	/**
	 * 获取当前用户Id
	 *
	 * @return 返回当前用户对象Id，不存在则返回null
	 */
	default Integer getUserId() {

		return (Integer) getSessionContext().getAttribute(SESSION_USER_IDENTIFIER);
	}

	/**
	 * 获取当前学年
	 * @return 学年对应的字符串
	 */
	default String getCurrentYear(){
		return (String) getSessionContext().getAttribute(SESSION_CURRENT_YEAR);
	}

	/**
	 * 获取当前学期
	 * @return 学期对应的整形数据
	 */
	default Integer getCurrentScheme(){
		return (Integer) getSessionContext().getAttribute(SESSION_CURRENT_SCHEME);
	}

	/**
	 * 获取version
	 * @return version对应的字符串
	 */
	default String getCurrentSemester() {
		return getCurrentYear() + getCurrentScheme().toString();
	}

}
