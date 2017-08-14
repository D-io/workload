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
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import cn.edu.uestc.ostec.workload.aspect.IAspect;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.SessionConstants.SESSION_USER_INFO_ENTITY;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static org.springframework.http.HttpStatus.OK;

/**
 * Version:v1.0 (description: 日期修改和工作量修改日志切面 )
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

	private static final String DATE_MODIFY_INFO_LOG_PATTERN = "review deadline modify operation {}, result {}";


	@Autowired
	private ItemService itemService;

	@Autowired
	private HistoryService historyService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ReviewManageController.modifyWorkload(..))")
	private void pointCut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ReviewManageController.modifyReviewTime(..))")
	private void dateModifyPointCut() {
	}

	@AfterReturning(returning = "rvt", pointcut = "pointCut()")
	public void recordWorkloadModify(JoinPoint joinPoint, Object rvt) {

		RestResponse restResponse = (RestResponse) rvt;
		if (OK.value() != restResponse.getStatus()) {
			return;
		}

		History history = new History();

		Object[] args = getParameters(joinPoint);
		Integer itemId = (Integer) args[0];
		Item item = itemService.findItem(itemId);
		ItemDto itemDto = itemConverter.poToDto(item);

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		history.setUserId(userId);
		history.setCreateTime(DateHelper.getDateTime());
		history.setItemId(buildHistoryItemId(itemId));

		history.setOperation(
				"工作量" + item.getItemName() + "被审核人" + user.getName() + "于" + history.getCreateTime() + "修改为" + args[1]);
		history.setType(IMPORT_EXCEL.equals(itemDto.getImportRequired()) ? "import" : "apply");
		history.setAimUserId(item.getOwnerId());

		boolean saveSuccess = historyService.saveHistory(history);

		if (!saveSuccess) {
			LOGGER.info(WORKLOAD_MODIFY_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(WORKLOAD_MODIFY_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}
	}

	@AfterReturning(returning = "rvt",pointcut = "dateModifyPointCut()")
	public void recordReviewDateModify(JoinPoint joinPoint,Object rvt) {

		RestResponse restResponse = (RestResponse) rvt;
		if(OK.value() != restResponse.getStatus()) {
			return;
		}

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		Object[] args = getParameters(joinPoint);
		Integer categoryId = (Integer) args[0];
		String newDate = args[1].toString();

		Category category = categoryService.getCategory(categoryId);
		if (null == category) {
			return;
		}

		History history = new History();
		history.setItemId(buildHistoryCategoryId(categoryId));
		history.setUserId(userId);
		history.setCreateTime(DateHelper.getDateTime());
		history.setOperation(
				user.getName() + "于" + history.getCreateTime() + "将审核截止时间提前到"
						+ newDate);
		history.setType(APPLY_SELF.equals(category.getImportRequired()) ? "apply" : "import");
		//TODO 目标用户编号设置为所有人
		history.setAimUserId(0000000);

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(DATE_MODIFY_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(DATE_MODIFY_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}

	}

}
