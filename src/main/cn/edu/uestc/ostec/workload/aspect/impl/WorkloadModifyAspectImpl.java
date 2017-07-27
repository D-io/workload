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

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.aspect.IAspect;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;

/**
 * Version:v1.0 (description: 工作量管理日志切面 )
 */
@Aspect
@Component
public class WorkloadModifyAspectImpl implements IAspect {

	/**
	 * 日志对象
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(WorkloadModifyAspectImpl.class);

	/**
	 * 登入信息日志样本信息
	 */
	private static final String WORKLOAD_MODIFY_INFO_LOG_PATTERN = "workload modify operation {}, result {}";

	@Autowired
	private HistoryService historyService;

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ReviewManageController.modifyWorkload(..))")
	private void pointCut() {
	}

	@After("pointCut()")
	public void recordWorkloadModify(JoinPoint joinPoint) {

		History history = new History();

		Object[] args = getParameters(joinPoint);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		history.setUserId(userId);
		history.setCreateTime(DateHelper.getDateTime());
		history.setItemId(args[0].toString());

		history.setOperation(
				"当前条目的工作量被审核人" + user.getName() + "于" + history.getCreateTime() + "修改为" + args[1]);

		boolean saveSuccess = historyService.saveHistory(history);

		if (!saveSuccess) {
			LOGGER.info(WORKLOAD_MODIFY_INFO_LOG_PATTERN,history.getOperation(),"失败");
		} else {
			LOGGER.info(WORKLOAD_MODIFY_INFO_LOG_PATTERN,history.getOperation(),"成功");
		}

	}

}
