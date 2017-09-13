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

import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.service.HistoryService;

/**
 * Version:v1.0 (description:  )
 */
public interface GroupItemEvent extends IEvent {

	String EVENT_NAME = "groupEvent";

	@Transactional
	boolean updateGroupItemsStatus(Integer parentId, String version, Integer status);

	@Transactional
	boolean updateGroupItemsCommonInfo(Integer parentId, String version, String itemName,
			String otherParams);

	@Transactional
	boolean submitGroupItems(ItemDto groupManagerItem);

	@Transactional
	boolean addGroupItemHistory(Integer parentId, String version, History history);

}
