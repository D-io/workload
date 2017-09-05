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

import java.util.List;

import cn.edu.uestc.ostec.workload.aspect.IAspect;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
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
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;

/**
 * Version:v1.0 (description:  )
 */
@Aspect
@Component
public class CategoryManageAspectImpl implements IAspect {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	@Autowired
	private HistoryService historyService;

	@Autowired
	private ItemService itemService;

	//TODO 所有涉及到截止时间的问题,需要加相应的限制
	//TODO 前端同时根据当前时间来决定是否要关闭接口（按钮变灰）

	/**
	 * 日志对象
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(CategoryManageAspectImpl.class);

	/**
	 * 登入信息日志样本信息
	 */
	private static final String CATEGORY_MANAGE_INFO_LOG_PATTERN = "category operation {}, result {}";

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.CategoryManageController.removeCategories(..))")
	private void categoryDeletePointcut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.CategoryManageController.submitCategory(..))")
	private void categorySubmitPointcut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.CategoryManageController.modifyCategories(..))")
	private void categoryModifyPointcut() {
	}

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.CategoryManageController.addCategories(..))")
	private void categoryAddPointcut() {
	}

	@AfterReturning(returning = "rvt", pointcut = "categoryDeletePointcut()")
	public void recordCategoryDelete(JoinPoint joinPoint, Object rvt) {
		if (!vertifyStatus(rvt)) {
			return;
		}
		Object[] params = getParameters(joinPoint);
		Integer[] categoryIdList = (Integer[]) params[0];

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		for (Integer categoryId : categoryIdList) {
			Category category = categoryService.getCategory(categoryId, getCurrentSemester());

			History history = new History();
			history.setVersion(getCurrentSemester());
			history.setAimUserId(0000000);
			history.setType(APPLY_SELF.equals(category.getImportRequired()) ? "apply" : "import");
			history.setItemId(buildHistoryCategoryId(categoryId));
			history.setCreateTime(DateHelper.getDateTime());
			history.setUserId(userId);
			history.setOperation("删除工作量计算规则：" + category.getName() + "。");

			boolean saveSuccess = historyService.saveHistory(history);
			if (!saveSuccess) {
				LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
			} else {
				LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
			}

			//			// 相应的删除条目
			//			List<Item> itemList = itemService.findItemByCategory(getCurrentSemester(),categoryId);
			//			for(Item item:itemList) {
			//				itemService.removeItem(item.getItemId(),getCurrentSemester());
			//			}

		}

	}

	@AfterReturning(returning = "rvt", pointcut = "categoryAddPointcut()")
	public void recordCategoryAdd(Object rvt) {
		if (!vertifyStatus(rvt)) {
			return;
		}
		RestResponse restResponse = (RestResponse) rvt;
		CategoryDto categoryDto = (CategoryDto) restResponse.getData().get("category");

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setAimUserId(userId);
		history.setType(APPLY_SELF.equals(categoryDto.getImportRequired()) ? "apply" : "import");
		history.setItemId(buildHistoryCategoryId(categoryDto.getCategoryId()));
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);
		history.setOperation("添加工作量计算规则：" + categoryDto.getName() + "。");

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}

		String categoryCode = null;
		if (categoryDto.getParentId().equals(ZERO_INT)) {
			categoryCode = categoryDto.getParentId().toString() + "-" + categoryDto.getCategoryId().toString();
		} else {
			categoryCode = categoryService
					.getCategory(categoryDto.getParentId(), DateHelper.getCurrentTerm())
					.getCategoryCode() + "-" + categoryDto.getCategoryId();
		}
		categoryDto.setCategoryCode(categoryCode);
		categoryService.saveCategory(categoryConverter.dtoToPo(categoryDto));

	}

	@AfterReturning(returning = "rvt", pointcut = "categorySubmitPointcut()")
	public void recordCategorySubmit(JoinPoint joinPoint, Object rvt) {
		if (!vertifyStatus(rvt)) {
			return;
		}
		Object[] params = getParameters(joinPoint);
		Integer[] categoryIdList = (Integer[]) params[0];

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		for (Integer categoryId : categoryIdList) {
			Category category = categoryService.getCategory(categoryId, getCurrentSemester());

			History history = new History();
			history.setVersion(getCurrentSemester());
			history.setAimUserId(0000000);
			history.setType(APPLY_SELF.equals(category.getImportRequired()) ? "apply" : "import");
			history.setItemId(buildHistoryCategoryId(categoryId));
			history.setCreateTime(DateHelper.getDateTime());
			history.setUserId(userId);
			history.setOperation("提交工作量计算规则：" + category.getName() + "。");

			boolean saveSuccess = historyService.saveHistory(history);
			if (!saveSuccess) {
				LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
			} else {
				LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
			}
		}

	}

	@AfterReturning(returning = "rvt", pointcut = "categoryModifyPointcut()")
	public void recordCategoryModify(JoinPoint joinPoint, Object rvt) {
		if (!vertifyStatus(rvt)) {
			return;
		}
		RestResponse restResponse = (RestResponse) rvt;
		CategoryDto oldCategoryDto = (CategoryDto) restResponse.getData().get("oldCategory");
		CategoryDto categoryDto = (CategoryDto) getParameters(joinPoint)[0];

		User user = (User) getSessionContext().getAttribute(SESSION_USER_INFO_ENTITY);
		Integer userId = user.getUserId();

		History history = new History();
		history.setVersion(getCurrentSemester());
		history.setAimUserId(0000000);
		history.setType(APPLY_SELF.equals(categoryDto.getImportRequired()) ? "apply" : "import");
		history.setItemId(buildHistoryCategoryId(categoryDto.getCategoryId()));
		history.setCreateTime(DateHelper.getDateTime());
		history.setUserId(userId);

		String differences = oldCategoryDto.contrastObj(oldCategoryDto, categoryDto);
		history.setOperation("修改工作量计算规则：" + categoryDto.getName() + "：" + differences + "。");

		boolean saveSuccess = historyService.saveHistory(history);
		if (!saveSuccess) {
			LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "失败");
		} else {
			LOGGER.info(CATEGORY_MANAGE_INFO_LOG_PATTERN, history.getOperation(), "成功");
		}

		//		if (differences.contains("jsonParameters")) {
		//			List<Item> itemList = itemService
		//					.findItemByCategory(getCurrentSemester(), oldCategoryDto.getCategoryId());
		//			for (Item item : itemList) {
		//				itemService.removeItem(item.getItemId(), getCurrentSemester());
		//			}
		//		}

	}

}
