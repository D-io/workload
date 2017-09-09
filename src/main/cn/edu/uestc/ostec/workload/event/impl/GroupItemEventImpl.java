/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.event.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.event.GroupItemEvent;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

/**
 * Version:v1.0 (description:  )
 */
@Service(GroupItemEvent.EVENT_NAME)
public class GroupItemEventImpl implements GroupItemEvent {

	@Autowired
	private ItemService itemService;

	@Override
	public boolean updateGroupItemsStatus(Integer parentId, String version, Integer status) {

		List<Item> itemList = itemService.findChildItemList(parentId, version);
		Item item = itemService.findItem(parentId, version);

		boolean saveSuccess = false;
		itemList.add(item);
		for (Item itemTemp : itemList) {
			itemTemp.setStatus(status);

			saveSuccess = itemService.saveItem(itemTemp);

		}

		return saveSuccess;
	}
}
