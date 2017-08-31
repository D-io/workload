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
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.OtherJsonParameter;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.type.OperatingStatusType;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.GROUP;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ROLE_PROPOSER;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ROLE_REVIEWER;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.SINGLE;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static org.springframework.http.HttpStatus.OK;

/**
 * Version:v1.0 (description:  )
 */
@Aspect
@Component
public class ItemManageAspectImpl implements IAspect, OperatingStatusType {

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

	@Autowired
	private TeacherWorkloadService teacherWorkloadService;

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
		Item item = itemService.findItem(itemId, getCurrentSemester());

		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setItemId(buildHistoryResetItemId(itemId));
		history.setUserId(userId);
		history.setCreateTime(DateHelper.getDateTime());
		history.setOperation(
				"修改工作量项目的部分信息:  项目名称 （原）" + oldItem.getItemName() + " -> （新）" + item.getItemName());

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
			Item item = itemService.findItem(itemId, getCurrentSemester());
			ItemDto itemDto = itemConverter.poToDto(item);
			Integer importedRequired = itemDto.getImportRequired();

			History history = new History();
			history.setVersion(getCurrentSemester());
			history.setItemId(buildHistoryItemId(itemId));
			history.setUserId(userId);
			history.setCreateTime(DateHelper.getDateTime());
			history.setOperation("提交工作量项目：" + item.getItemName() + "。");

			history.setType(APPLY_SELF.equals(importedRequired) ? "apply" : "import");
			history.setAimUserId(itemDto.getReviewerId());

			boolean recordSuccess = false;

			if (GROUP.equals(itemDto.getIsGroup()) && APPLY_SELF
					.equals(itemDto.getImportRequired())) {
				List<ChildWeight> childWeightList = itemDto.getChildWeightList();
				Double groupWorkload = itemDto.getWorkload();
				for (ChildWeight childWeight : childWeightList) {
					TeacherWorkload teacherWorkload = teacherWorkloadService
							.getTeacherWorkload(childWeight.getUserId(), getCurrentSemester());
					teacherWorkload.setUncheckedWorkload(
							teacherWorkload.getUncheckedWorkload() + groupWorkload * childWeight
									.getWeight());
					teacherWorkload.setTotalWorkload(
							teacherWorkload.getCheckedWorkload() + teacherWorkload
									.getUncheckedWorkload());
					recordSuccess = teacherWorkloadService.saveTeacherWorkload(teacherWorkload);
				}
			} else {
				TeacherWorkload teacherWorkload = teacherWorkloadService
						.getTeacherWorkload(itemDto.getOwnerId(), getCurrentSemester());
				teacherWorkload.setUncheckedWorkload(
						teacherWorkload.getUncheckedWorkload() + itemDto.getWorkload());
				teacherWorkload.setTotalWorkload(
						teacherWorkload.getCheckedWorkload() + teacherWorkload
								.getUncheckedWorkload());
				recordSuccess = teacherWorkloadService.saveTeacherWorkload(teacherWorkload);
			}

			boolean saveSuccess = historyService.saveHistory(history);
			if (!saveSuccess || !recordSuccess) {
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

		Item item = itemService.findItem(itemId, getCurrentSemester());
		ItemDto itemDto = itemConverter.poToDto(item);

		TeacherWorkload teacherWorkload = teacherWorkloadService
				.getTeacherWorkload(userId, getCurrentSemester());

		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setCreateTime(DateHelper.getDateTime());

		history.setType("import");

		String operation = null;
		if (CHECKED.equals(status)) {
			operation = "通过工作量项目：" + item.getItemName() + "。";

			//通过之后，通过的工作量加，预期的工作量减
			teacherWorkload
					.setCheckedWorkload(teacherWorkload.getCheckedWorkload() + item.getWorkload());
			teacherWorkload.setUncheckedWorkload(
					teacherWorkload.getUncheckedWorkload() - item.getWorkload());
			teacherWorkload.setTotalWorkload(
					teacherWorkload.getCheckedWorkload() + teacherWorkload
							.getUncheckedWorkload());
			teacherWorkloadService.saveTeacherWorkload(teacherWorkload);
		} else if (DOUBTED.equals(status)) {
			operation = "存疑工作量项目：" + item.getItemName() + "。";
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

		Item item = itemService.findItem(itemId, getCurrentSemester());
		ItemDto itemDto = itemConverter.poToDto(item);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();
		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation("重新申请工作量项目：" + item.getItemName() + "。");

		history.setType("apply");
		history.setAimUserId(itemDto.getReviewerId());

		//修改待审核的工作量
		TeacherWorkload teacherWorkload = teacherWorkloadService
				.getTeacherWorkload(itemDto.getOwnerId(), getCurrentSemester());
		teacherWorkload.setUncheckedWorkload(
				teacherWorkload.getUncheckedWorkload() + itemDto.getWorkload());
		teacherWorkload.setTotalWorkload(
				teacherWorkload.getCheckedWorkload() + teacherWorkload
						.getUncheckedWorkload());
		boolean recordSuccess = teacherWorkloadService.saveTeacherWorkload(teacherWorkload);

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess || !recordSuccess) {
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

		ItemDto oldItemDto = (ItemDto) restResponse.getData().get("oldItem");
		ItemDto newItem = (ItemDto) restResponse.getData().get("item");

		Integer oldStatus = oldItemDto.getStatus();
		Integer newStatus = newItem.getStatus();

		Object[] args = getParameters(joinPoint);
		Integer itemId = (Integer) args[0];
		String role = args[1].toString();
		String roleName = null;
		if (ROLE_REVIEWER.equals(role)) {
			roleName = "审核人";
		} else {
			roleName = "申报人";
		}

		Item item = itemService.findItem(itemId, getCurrentSemester());
		ItemDto itemDto = itemConverter.poToDto(item);
		Integer importRequired = itemDto.getImportRequired();

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();
		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryResetItemId(itemId));
		history.setOperation("重置工作量项目：" + item.getItemName() + "的状态信息" + "（" + roleName + "）。");

		history.setType(APPLY_SELF.equals(itemDto.getImportRequired()) ? "apply" : "import");

		if (ROLE_REVIEWER.equals(role)) {
			history.setAimUserId(itemDto.getReviewerId());
		} else {
			history.setAimUserId(itemDto.getOwnerId());
		}

		TeacherWorkload teacherWorkload = teacherWorkloadService
				.getTeacherWorkload(item.getOwnerId(), getCurrentSemester());
		Double uncheckedWorkload = teacherWorkload.getUncheckedWorkload();
		Double checkedWorkload = teacherWorkload.getCheckedWorkload();

		// 3->0, 1->0, 4->0 预期工作量 -
		if (getUncheckedStatus().contains(oldStatus) && UNCOMMITTED.equals(newStatus)) {
			teacherWorkload.setUncheckedWorkload(uncheckedWorkload - itemDto.getWorkload());
		}

		// 2->0, 2->1 通过的工作量 -
		if (CHECKED.equals(oldStatus) && (UNCOMMITTED.equals(newStatus) || NON_CHECKED
				.equals(newStatus))) {
			teacherWorkload.setCheckedWorkload(checkedWorkload - itemDto.getWorkload());
		}

		// 2->1, 5->1 预期的工作量 +
		if ((CHECKED.equals(oldStatus) || DENIED.equals(oldStatus)) && NON_CHECKED
				.equals(newStatus)) {
			teacherWorkload.setUncheckedWorkload(uncheckedWorkload + itemDto.getWorkload());
		}

		//剩余情况保持不变

		boolean recordSuccess = true;
		teacherWorkload.setTotalWorkload(
				teacherWorkload.getCheckedWorkload() + teacherWorkload
						.getUncheckedWorkload());

		recordSuccess = teacherWorkloadService.saveTeacherWorkload(teacherWorkload);

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess || !recordSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}
}

