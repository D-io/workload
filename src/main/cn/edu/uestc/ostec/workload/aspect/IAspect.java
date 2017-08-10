/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload.aspect;

import org.aspectj.lang.JoinPoint;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;

/**
 * Description: 切面标记接口
 */
public interface IAspect extends ServletContextAdapter {

	/**
	 * 获取切入点所在类的类名
	 *
	 * @param joinPoint 切入点
	 * @return 切入点所在类的类名
	 */
	default String getClassName(JoinPoint joinPoint) {

		return joinPoint.getTarget().getClass().getSimpleName();
	}

	/**
	 * 获取切入点的方法名
	 *
	 * @param joinPoint 切入点
	 * @return 切入点的方法名
	 */
	default String getMethodName(JoinPoint joinPoint) {

		return joinPoint.getSignature().getName();

	}

	/**
	 * 获取切入点方法的入参
	 *
	 * @param joinPoint 切入点
	 * @return 方法入参组成的Object数组
	 */
	default Object[] getParameters(JoinPoint joinPoint) {
		
		return joinPoint.getArgs();
	}

	default String buildHistoryItemId(Integer itemId) {
		return "I" + itemId.toString();
	}

	default String buildHistoryCategoryId(Integer categoryId) {
		return "C" + categoryId.toString();
	}

}
