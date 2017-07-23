/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: AemsLog.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月16日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Description: 日志注解
 */
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Log {
    String value() default "";
}
