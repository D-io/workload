/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
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
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;

/**
 * Version:v1.0 (description:  )
 */
@Aspect
@Component
public class ItemManageAspectImpl implements IAspect {

	/**
	 * 日志对象
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(WorkloadModifyAspectImpl.class);

	/**
	 * 登入信息日志样本信息
	 */
	private static final String ITEM_MANAGE_INFO_LOG_PATTERN = "item operation {}, result {}";

	@Autowired
	private HistoryService historyService;

	@Autowired
	private ItemService itemService;

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.submitItem(Integer[]))")
	private void itemSubmitPointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.updateItemStatus(..))")
	private void itemStatusUpdatePointCut() {
	}

	@After("itemSubmitPointCut()")
	public void recordItemSubmit(JoinPoint joinPoint) {

		Object[] args = getParameters(joinPoint);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		for (Object arg : args) {
			Item item = itemService.findItem((Integer) arg);

			History history = new History();
			history.setItemId(arg.toString());
			history.setUserId(userId);
			history.setCreateTime(DateHelper.getDateTime());
			history.setOperation(user.getName() + "于" + history.getCreateTime() + "提交了工作量条目" + item
					.getItemName());
			boolean saveSuccess = historyService.saveHistory(history);
			if (!saveSuccess) {
				LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
			} else {
				LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
			}
		}
	}

	@After("itemStatusUpdatePointCut()")
	public void recordItemsStatusChange(JoinPoint joinPoint) {

		Object[] args = joinPoint.getArgs();
		Integer itemId = (Integer) args[0];
		Integer status = (Integer) args[1];

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		Item item = itemService.findItem(itemId);

		History history = new History();
		history.setUserId(userId);
		history.setItemId(itemId.toString());
		history.setCreateTime(DateHelper.getDateTime());

		String operation = null;
		if (CHECKED.equals(status)) {
			operation = user.getName() + "于" + history.getCreateTime() + "通过了工作量" + item.getItemName();
		} else if (DENIED.equals(status)) {
			operation = user.getName() + "于" + history.getCreateTime() + "对工作量" + item.getItemName() + "存疑";
		} else {

		}

		history.setOperation(operation);

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

}
