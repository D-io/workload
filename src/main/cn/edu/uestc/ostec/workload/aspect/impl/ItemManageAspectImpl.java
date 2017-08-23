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

import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.aspect.IAspect;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.OtherJsonParameter;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ROLE_REVIEWER;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static org.springframework.http.HttpStatus.OK;

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

	@Autowired
	private ItemConverter itemConverter;

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.submitItem(..))")
	private void itemSubmitPointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.updateItemStatus(..))")
	private void itemStatusUpdatePointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.applyItemsAgain(..))")
	private void itemApplyAgainPointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.resetStatus(..))")
	private void itemStatusResetPointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ItemManageController.correctItemInfo(..))")
	private void itemCorrectByAdminPointCut() {
	}

	@AfterReturning(returning = "rvt", pointcut = "itemCorrectByAdminPointCut()")
	public void recordItemCorrect(JoinPoint joinPoint, Object rvt) {
		if (!vertifyStatus(rvt)) {
			return;
		}
		RestResponse restResponse = (RestResponse) rvt;
		ItemDto oldItem = (ItemDto) restResponse.getData().get("oldItemDto");

		Object[] params = getParameters(joinPoint);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		Integer itemId = (Integer) params[0];
		Item item = itemService.findItem(itemId,getCurrentSemester());

		History history = new History();
		history.setItemId(buildHistoryItemId(itemId));
		history.setUserId(userId);
		history.setCreateTime(DateHelper.getDateTime());
		history.setOperation(
				user.getName() + "于" + history.getCreateTime() + "修改了工作量条目的部分信息:  项目名称 (原)"
						+ oldItem.getItemName() + " -> (新)" + item.getItemName() + "的部分信息（包括参数信息）");

		history.setType(APPLY_SELF.equals(oldItem.getImportRequired()) ? "apply" : "import");
		history.setAimUserId(oldItem.getOwnerId());

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

	/**
	 * 工作量条目提交日志切面
	 */
	@AfterReturning(returning = "rvt", pointcut = "itemSubmitPointCut()")
	public void recordItemSubmit(JoinPoint joinPoint, Object rvt) {

		RestResponse restResponse = (RestResponse) rvt;
		if (OK.value() != restResponse.getStatus()) {
			return;
		}
		Object[] args = getParameters(joinPoint);
		Integer[] itemIdList = (Integer[]) args[0];

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		for (Integer itemId : itemIdList) {
			Item item = itemService.findItem(itemId,getCurrentSemester());
			ItemDto itemDto = itemConverter.poToDto(item);
			Integer importedRequired = itemDto.getImportRequired();

			History history = new History();
			history.setItemId(buildHistoryItemId(itemId));
			history.setUserId(userId);
			history.setCreateTime(DateHelper.getDateTime());
			history.setOperation(user.getName() + "于" + history.getCreateTime() + "提交了工作量条目" + item
					.getItemName());

			history.setType(APPLY_SELF.equals(importedRequired) ? "apply" : "import");
			history.setAimUserId(itemDto.getReviewerId());

			boolean saveSuccess = historyService.saveHistory(history);
			if (!saveSuccess) {
				LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
			} else {
				LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
			}
		}
	}

	/**
	 * 复核人复核工作量
	 */
	@AfterReturning(returning = "rvt", pointcut = "itemStatusUpdatePointCut()")
	public void recordItemsStatusChange(JoinPoint joinPoint, Object rvt) {

		RestResponse restResponse = (RestResponse) rvt;
		if (OK.value() != restResponse.getStatus()) {
			return;
		}

		Object[] args = joinPoint.getArgs();
		Integer itemId = (Integer) args[0];
		Integer status = (Integer) args[1];

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		Item item = itemService.findItem(itemId,getCurrentSemester());
		ItemDto itemDto = itemConverter.poToDto(item);

		History history = new History();
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setCreateTime(DateHelper.getDateTime());

		history.setType("import");

		String operation = null;
		if (CHECKED.equals(status)) {
			operation =
					user.getName() + "于" + history.getCreateTime() + "通过了工作量" + item.getItemName();
		} else if (DENIED.equals(status)) {
			operation = user.getName() + "于" + history.getCreateTime() + "对工作量" + item.getItemName()
					+ "存疑";
		} else {

		}

		history.setOperation(operation);
		history.setAimUserId(itemDto.getReviewerId());

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

	/**
	 * 重新申请日志切面
	 */
	@AfterReturning(returning = "rvt", pointcut = "itemApplyAgainPointCut()")
	public void recordItemApplyAgain(JoinPoint joinPoint, Object rvt) {

		RestResponse restResponse = (RestResponse) rvt;
		int status = restResponse.getStatus();
		if (OK.value() != status) {
			return;
		}

		Object[] args = joinPoint.getArgs();
		Integer itemId = (Integer) args[0];

		Item item = itemService.findItem(itemId,getCurrentSemester());
		ItemDto itemDto = itemConverter.poToDto(item);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();
		History history = new History();
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation(
				user.getName() + "于" + history.getCreateTime() + "重新申请工作量条目" + item.getItemName());

		history.setType("apply");
		history.setAimUserId(itemDto.getReviewerId());

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

	/**
	 * 管理员重置条目相关状态日志切面
	 */
	@AfterReturning(returning = "rvt", pointcut = "itemStatusResetPointCut()")
	public void recordItemStatusReset(JoinPoint joinPoint, Object rvt) {
		RestResponse restResponse = (RestResponse) rvt;
		int status = restResponse.getStatus();
		if (OK.value() != status) {
			return;
		}

		Object[] args = getParameters(joinPoint);
		Integer itemId = (Integer) args[0];
		String role = args[1].toString();

		Item item = itemService.findItem(itemId,getCurrentSemester());
		ItemDto itemDto = itemConverter.poToDto(item);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();
		History history = new History();
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation(
				user.getName() + "于" + history.getCreateTime() + "重置工作量条目" + item.getItemName()
						+ "的状态信息" + "(" + role + ")");

		history.setType(APPLY_SELF.equals(itemDto.getImportRequired()) ? "apply" : "import");

		if (ROLE_REVIEWER.equals(role)) {
			history.setAimUserId(itemDto.getReviewerId());
		} else {
			history.setAimUserId(itemDto.getOwnerId());
		}

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}
}

