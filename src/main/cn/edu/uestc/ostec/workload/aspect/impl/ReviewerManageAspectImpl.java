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
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.aspect.IAspect;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.type.ItemStatus;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;
import static org.springframework.http.HttpStatus.OK;

/**
 * Version:v1.0 (description:  )
 */
@Aspect
@Component
public class ReviewerManageAspectImpl implements IAspect {

	/**
	 * 日志对象
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ReviewerManageAspectImpl.class);

	/**
	 * 登入信息日志样本信息
	 */
	private static final String ITEM_MANAGE_INFO_LOG_PATTERN = "item operation {}, result {}";

	@Autowired
	private ItemService itemService;

	@Autowired
	private HistoryService historyService;

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ReviewManageController.checkItems(..))")
	private void reviewPointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ReviewManageController.submitItems(..))")
	private void doubtedCheckPointCut() {
	}

	/**
	 * 审核人审核工作量切面
	 *
	 * @param joinPoint 接受入参
	 * @param rvt       返回状态值
	 */
	@AfterReturning(returning = "rvt", pointcut = "reviewPointCut()")
	public void recordItemsCheck(JoinPoint joinPoint, Object rvt) {
		RestResponse restResponse = (RestResponse) rvt;
		int status = restResponse.getStatus();
		if (OK.value() != status) {
			return;
		}

		Object[] args = getParameters(joinPoint);
		Integer itemId = (Integer) args[0];
		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		Item item = itemService.findItem(itemId);
		ItemStatus checkStatus = ItemStatus.getItemStatus((Integer) args[1]);

		History history = new History();
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation(
				user.getName() + "于" + history.getCreateTime() + checkStatus.getDesc() + "了工作量条目"
						+ item.getItemName());
		history.setType("review");

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

	/**
	 * 存疑通过日志切面（由复核人发出该动作）
	 */
	@AfterReturning(returning = "rvt", pointcut = "doubtedCheckPointCut()")
	public void recordItemsDoubtedCheck(JoinPoint joinPoint, Object rvt) {
		RestResponse restResponse = (RestResponse) rvt;
		int status = restResponse.getStatus();
		if (OK.value() != status) {
			return;
		}

		Object[] args = getParameters(joinPoint);
		Integer itemId = (Integer) args[0];
		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		Item item = itemService.findItem(itemId);
		History history = new History();
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation(user.getName() + "于" + history.getCreateTime() + "存疑通过了了工作量条目" + item
				.getItemName());
		history.setType("check-again");

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}
}
