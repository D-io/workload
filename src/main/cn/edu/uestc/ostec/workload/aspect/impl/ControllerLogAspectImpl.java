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
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

import cn.edu.uestc.ostec.workload.annotation.Log;
import cn.edu.uestc.ostec.workload.aspect.LogAspect;

/**
 * Description: 控制器日志切面
 */
@Aspect
@Component
public class ControllerLogAspectImpl implements LogAspect {

	/**
	 * Controller层切点
	 */
	@Pointcut("@annotation(cn.edu.uestc.ostec.workload.annotation.Log)")
	public void controllerPointCut() {
	}

	/**
	 *
	 * @param joinPoint
	 * @throws ClassNotFoundException
	 */
	@Before("controllerPointCut()")
	public void doBefore(JoinPoint joinPoint) throws ClassNotFoundException {

		String className = getClassName(joinPoint);
		String methodName = getMethodName(joinPoint);
		Object[] args = getParameters(joinPoint);

		String description = getAnnotationDescription(joinPoint);

		LOGGER.info("{} ({}): method [{}], args {}", className, description, methodName, args);
	}

	@AfterThrowing(pointcut = "controllerPointCut()", throwing = "e")
	public void doException(JoinPoint joinPoint, Exception e) {
		LOGGER.info("exception from {}, message {}", getMethodName(joinPoint), e.getMessage());
	}

	/**
	 * 获取WorkloadLog注解描述信息
	 *
	 * @param joinPoint 切入点
	 * @return 返回注解信息
	 * @throws ClassNotFoundException 找不到注解类则抛出异常
	 */
	public String getAnnotationDescription(JoinPoint joinPoint) throws ClassNotFoundException {

		String targetName = joinPoint.getTarget().getClass().getName();
		String methodName = joinPoint.getSignature().getName();
		Object[] arguments = joinPoint.getArgs();
		Class targetClass = Class.forName(targetName);
		Method[] methods = targetClass.getMethods();
		String description = "";
		for (Method method : methods) {
			if (method.getName().equals(methodName)) {
				Class[] clazzs = method.getParameterTypes();
				if (clazzs.length == arguments.length) {
					description = ((Log) method.getAnnotation(Log.class)).value();
					break;
				}
			}
		}
		return description;

	}
}
