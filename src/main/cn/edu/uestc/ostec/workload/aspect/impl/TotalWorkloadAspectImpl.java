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
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;

/**
 * Version:v1.0 (description:  )
 */
@Aspect
@Component
public class TotalWorkloadAspectImpl implements IAspect {

	private static final Logger LOGGER = LoggerFactory.getLogger(TotalWorkloadAspectImpl.class);

	private static final String CALCULATE_TOTAL_WORKLOAD_LOG_PATTERN = "calculate total workload operation {},result {}";

	@Autowired
	private TeacherWorkloadService teacherWorkloadService;

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.service.*.TeacherWorkloadService*.saveTeacherWorkload(..))")
	private void calculateTotalWorkload() {
	}

	@AfterReturning(returning = "rvt", pointcut = "calculateTotalWorkload()")
	public void recordTotalWorkload(JoinPoint joinPoint, Object rvt) {
		Boolean success = (Boolean) rvt;
		if (!success) {
			return;
		}
		Object[] params = getParameters(joinPoint);
		TeacherWorkload teacherWorkload = (TeacherWorkload) params[0];
		teacherWorkload.setTotalWorkload(
				teacherWorkload.getUncheckedWorkload() + teacherWorkload.getCheckedWorkload());

		boolean saveSuccess = teacherWorkloadService.updateTeacherWorkload(teacherWorkload);
		if (!saveSuccess) {
			LOGGER.info(CALCULATE_TOTAL_WORKLOAD_LOG_PATTERN,teacherWorkload.getTeacherName(),"成功");
		} else {
			LOGGER.info(CALCULATE_TOTAL_WORKLOAD_LOG_PATTERN,teacherWorkload.getTeacherName(),"失败");
		}
	}
}
