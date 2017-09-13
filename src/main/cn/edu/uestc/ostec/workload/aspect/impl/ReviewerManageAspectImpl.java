/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.aspect.impl;

import org.apache.ibatis.annotations.Arg;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.aspect.IAspect;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.event.GroupItemEvent;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.type.ItemStatus;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.GROUP;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.OBJECT_MAPPER;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
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

	@Autowired
	private TeacherWorkloadService teacherWorkloadService;

	@Autowired
	private GroupItemEvent groupItemEvent;

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

		Item item = itemService.findItem(itemId, getCurrentSemester());
		ItemStatus checkStatus = ItemStatus.getItemStatus((Integer) args[1]);

		History history = new History();
		history.setCreateTime(DateHelper.getDateTime());
		history.setVersion(getCurrentSemester());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation(checkStatus.getDesc() + "工作量项目：" + item.getItemName() + "。");
		history.setType("apply");
		history.setAimUserId(item.getOwnerId());

		if(GROUP.equals(item)) {
			groupItemEvent.addGroupItemHistory(itemId,getCurrentSemester(),history);
		}

		//修改教师对应的工作量
		TeacherWorkload teacherWorkload = teacherWorkloadService
				.getTeacherWorkload(item.getOwnerId(), getCurrentSemester());
		if (CHECKED.equals(checkStatus.getStatus())) {
			teacherWorkload
					.setCheckedWorkload(teacherWorkload.getCheckedWorkload() + item.getWorkload());
			teacherWorkload.setCheckedItems(teacherWorkload.getCheckedItems() + 1);
		}
		teacherWorkload.setUncheckedWorkload(
				teacherWorkload.getUncheckedWorkload() <= item.getWorkload() ?
						ZERO_DOUBLE :
						teacherWorkload.getUncheckedWorkload() - item.getWorkload());
		teacherWorkload.setTotalWorkload(
				teacherWorkload.getCheckedWorkload() + teacherWorkload.getUncheckedWorkload());
		teacherWorkload.setUncheckedItems(teacherWorkload.getUncheckedWorkload() <= 1 ?
				ZERO_INT :
				teacherWorkload.getUncheckedItems() - 1);
		boolean recordSuccess = teacherWorkloadService.saveTeacherWorkload(teacherWorkload);

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess || !recordSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

	/**
	 * 存疑解决日志切面
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

		Item item = itemService.findItem(itemId, getCurrentSemester());
		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setItemId(buildHistoryItemId(itemId));
		history.setOperation("解决工作量项目存疑：" + item.getItemName() + "。");
		history.setType("import");
		history.setAimUserId(item.getOwnerId());

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(ITEM_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}
}
