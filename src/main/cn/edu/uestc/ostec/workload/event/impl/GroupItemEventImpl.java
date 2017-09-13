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

import java.util.ArrayList;
import java.util.List;

import javax.swing.text.StyledEditorKit;

import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.event.GroupItemEvent;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.FormulaCalculate;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;

/**
 * Version:v1.0 (description:  )
 */
@Service(GroupItemEvent.EVENT_NAME)
public class GroupItemEventImpl implements GroupItemEvent {

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private HistoryService historyService;

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

	@Override
	public boolean updateGroupItemsCommonInfo(Integer parentId, String version, String itemName,
			String otherParams) {

		List<Item> itemList = itemService.findChildItemList(parentId, version);
		Item item = itemService.findItem(parentId, version);
		itemList.add(item);

		boolean saveSuccess = false;

		for (Item itemTemp : itemList) {
			itemTemp.setItemName(itemName);
			itemTemp.setOtherJson(otherParams);
			saveSuccess = itemService.saveItem(itemTemp);
		}

		return saveSuccess;
	}

	@Override
	public boolean submitGroupItems(ItemDto groupManagerItem) {

		Item item = itemConverter.dtoToPo(groupManagerItem);
		ItemDto newItemDto = itemConverter.poToDto(item);
		List<ChildWeight> childWeightList = newItemDto.getChildWeightList();
		List<JobDesc> jobDescList = newItemDto.getJobDescList();

		Integer baseItemId = ZERO_INT;
		double workload = FormulaCalculate
				.calculate(newItemDto.getFormula(), newItemDto.getParameterValues());
		List<Item> groupItemList = new ArrayList<>();

		boolean saveSuccess = false;
		for (int index = 0; index < childWeightList.size(); index++) {

			// 获取对应成员教师的工作量信息进行组装
			Integer ownerId = childWeightList.get(index).getUserId();

			if (jobDescList.get(index).getUserId().equals(ownerId)) {

				// 克隆Item工作量条目，以克隆公共信息
				Item itemTemp = (Item) item.clone();

				// 设置成员各自的工作量属性信息
				itemTemp.setItemId(null);
				itemTemp.setOwnerId(ownerId);
				itemTemp.setJobDesc(jobDescList.get(index).getJobDesc());

				// 获取对应的权重进行相应的计算
				double weight = childWeightList.get(index).getWeight();
				itemTemp.setJsonChildWeight(String.valueOf(weight));
				itemTemp.setStatus(NON_CHECKED);

				// 计算组员各自的工作量
				itemTemp.setWorkload(workload * weight);

				groupItemList.add(itemTemp);
			}
		}

		List<Item> memberItemList = new ArrayList<>();
		for (Item itemTemp : groupItemList) {
			if (itemTemp.getOwnerId().equals(itemTemp.getGroupManagerId())) {
				saveSuccess = itemService.saveItem(itemTemp);
				baseItemId = itemTemp.getItemId();
			} else {
				memberItemList.add(itemTemp);
			}
		}

		for(Item itemTemp : memberItemList) {
			itemTemp.setParentId(baseItemId);
			saveSuccess = itemService.saveItem(itemTemp);
		}

		return saveSuccess;
	}

	@Override
	public boolean addGroupItemHistory(Integer parentId, String version, History history) {

		List<Item> children = itemService.findChildItemList(parentId,version);

		boolean saveSuccess = true;
		if(null != children) {
			for (Item itemTemp : children) {
				History childHistory = (History) history.clone();
				childHistory.setAimUserId(itemTemp.getOwnerId());
				childHistory.setHistoryId(null);
				childHistory.setItemId("I" + itemTemp.getItemId().toString());
				saveSuccess = historyService.saveHistory(history);
			}
		}

		return saveSuccess;
	}
}
