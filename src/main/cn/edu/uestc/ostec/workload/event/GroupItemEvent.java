/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.event;

import org.springframework.transaction.annotation.Transactional;

/**
 * Version:v1.0 (description:  )
 */
public interface GroupItemEvent extends IEvent {

	String EVENT_NAME = "groupEvent";

	@Transactional
	boolean updateGroupItemsStatus(Integer parentId, String version, Integer status);

}
