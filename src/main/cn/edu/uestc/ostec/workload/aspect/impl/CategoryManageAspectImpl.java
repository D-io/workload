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
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.aspect.IAspect;

/**
 * Version:v1.0 (description:  )
 */
@Aspect
@Component
public class CategoryManageAspectImpl implements IAspect {

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

	}

	@AfterReturning(returning = "rvt", pointcut = "categoryAddPointcut()")
	public void recordCategoryAdd(JoinPoint joinPoint, Object rvt) {

	}

	@AfterReturning(returning = "rvt", pointcut = "categorySubmitPointcut()")
	public void recordCategorySubmit(JoinPoint joinPoint, Object rvt) {

	}

	@AfterReturning(returning = "rvt", pointcut = "categoryModifyPointcut()")
	public void recordCategoryModify(JoinPoint joinPoint, Object rvt) {

	}

}
