/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: IEvent.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.event;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;
import cn.edu.uestc.ostec.workload.context.StandardApplicationAttributeContext;
import cn.edu.uestc.ostec.workload.context.StandardSessionAttributeContext;

/**
 * Description: 事件标记接口
 */
public interface IEvent extends ServletContextAdapter, StandardApplicationAttributeContext,
		StandardSessionAttributeContext {

}
