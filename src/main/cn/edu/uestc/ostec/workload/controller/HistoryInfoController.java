/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Version:v1.0 (description:  )
 */
@RestController
@RequestMapping("history" + INFO_PATH)
public class HistoryInfoController extends ApplicationController {

	@Autowired
	private HistoryService historyService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemConverter itemConverter;

	/**
	 * 获取指定条目对应的全部历史操作记录
	 *
	 * @param itemId 条目编号
	 * @return HistoryList
	 */
	@RequestMapping(value = "histories", method = GET)
	public RestResponse getHistories(
			@RequestParam("itemId")
					String itemId) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		List<History> historyList = historyService.getHistoriesByItem(itemId);
		if (null == historyList || historyList.isEmpty()) {
			return systemErrResponse("无相关记录");
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyList);

		return successResponse(data);

	}

	/**
	 * 获取User对应的历史记录
	 *
	 * @return historyList
	 */
	@RequestMapping(value = "histories-user", method = GET)
	public RestResponse getHistoriesByUsers(String role,
			@RequestParam("type")
					String type) {
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int userId = user.getUserId();
		List<History> historyList = historyService.getHistoriesByUserRelated(userId, type);

		if (isEmptyList(historyList)) {
			return successResponse();
		}

		if (ROLE_REVIEWER.equals(role)) {
			List<ItemDto> itemDtoList = itemService
					.findAll(null, null, user.getUserId(), null, getCurrentSemester());
			List<History> histories = getHistoriesByItems(itemDtoList,type);
			historyList.removeAll(histories);
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyList);

		return successResponse(data);
	}

	/**
	 * 获取对应类型的历史记录(此种方案到后期历史记录较多的情况下效率极低，不建议采用)
	 *
	 * @param role 角色类型 reviewer（审核人）
	 * @param type 类型（申报Apply、复核Check-again、导入Import、审核Review）
	 * @return historyList
	 */
	@RequestMapping(value = "histories-type", method = GET)
	public RestResponse getHistoriesByType(String role,
			@RequestParam("type")
					String type) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		List<History> historyList = historyService.getHistoriesByType(type);

		if (isEmptyList(historyList)) {
			return successResponse();
		}

		List<ItemDto> itemList = new ArrayList<>();
		List<History> histories = new ArrayList<>();

		if (ROLE_REVIEWER.equals(role)) {
			List<Category> categoryList = categoryService
					.getCategoriesByReviewer(user.getUserId(), getCurrentSemester());
			for (Category category : categoryList) {
				itemList.addAll(itemConverter
						.poListToDtoList(itemService.findItemByCategory(category.getCategoryId())));
			}
		} else {
			itemList = itemService
					.findAll(null, null, user.getUserId(), null, getCurrentSemester());
		}

		for (History history : historyList) {
			for (ItemDto itemDto : itemList) {
				if (history.getItemId().equals(buildHistoryItemId(itemDto.getItemId()))) {
					histories.add(history);
				}
			}
		}

		Map<String, Object> data = getData();
		data.put("historyList", histories);

		return successResponse(data);
	}

	private List<History> getHistoriesByItems(List<ItemDto> itemList,String type) {

		List<History> histories = new ArrayList<>();
		List<ItemDto> itemDtoList = new ArrayList<>();
		for(ItemDto itemDto:itemList) {
			if("apply".equals(type) && APPLY_SELF.equals(itemDto.getImportRequired())) {
				itemDtoList.add(itemDto);
			} else if ("import".equals(type) && IMPORT_EXCEL.equals(itemDto.getImportRequired())) {
				itemDtoList.add(itemDto);
			} else  {
				continue;
			}
		}
		for (ItemDto item : itemList) {
			List<History> historyList = historyService
					.getHistoriesByItem(buildHistoryItemId(item.getItemId()));
			histories.addAll(historyList);
		}
		return histories;
	}
}
