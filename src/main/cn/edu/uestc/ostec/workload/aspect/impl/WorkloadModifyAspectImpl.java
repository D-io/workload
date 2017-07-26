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

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.aspect.IAspect;

/**
 * Version:v1.0 (description: 工作量管理日志切面 )
 */
@Aspect
@Component
public class WorkloadModifyAspectImpl implements IAspect {

	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.ReviewManageController.modifyWorkload(..))")
	private void pointCut(){
	}

	@After("pointCut()")
	public void recordWorkloadModify() {
	}

}
