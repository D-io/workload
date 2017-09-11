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
import java.util.Collections;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.HistoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.HISTORY_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.UserType.ADMINISTRATOR;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Version:v1.0 (description:  )
 */
@RestController
@RequestMapping(HISTORY_PATH + INFO_PATH)
public class HistoryInfoController extends ApplicationController {

	@Autowired
	private HistoryService historyService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private HistoryConverter historyConverter;

	/**
	 * 获取重置相关的历史记录
	 */
	@RequestMapping(value = "history-reset", method = GET)
	public RestResponse getResetHistories() {
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}
		int userId = user.getUserId();

		List<History> historyList = historyService.getResetHistories(userId, getCurrentSemester());
		if (isEmptyList(historyList)) {
			return successResponse("无相关记录");
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyConverter.poListToDtoList(historyList));

		return successResponse(data);
	}

	/**
	 * 获取类目相关的历史记录
	 *
	 * @return historyList
	 */
	@RequestMapping(value = "history-category", method = GET)
	public RestResponse getCategoryHistories() {

		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}
		int userId = user.getUserId();

		List<History> historyList = historyService
				.getCategoryHistories(userId, getCurrentSemester());
		if (isEmptyList(historyList)) {
			return successResponse("无相关记录");
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyConverter.poListToDtoList(historyList));

		return successResponse(data);
	}

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

		List<History> historyList = historyService.getHistoriesByItem(itemId, getCurrentSemester());
		if (isEmptyList(historyList)) {
			return successResponse("无相关记录");
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyConverter.poListToDtoList(historyList));

		return successResponse(data);

	}

	/**
	 * 获取User对应的历史记录
	 *
	 * @return historyList
	 */
	@RequestMapping(value = "histories-user", method = GET)
	public RestResponse getHistoriesByUsers(
			@RequestParam("type")
					String type,
			@RequestParam(required = false)
					String role) {
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int userId = user.getUserId();

		//获取用户相关的历史记录，同时对应类型type  操作者或者目标用户为当前登录用户的所有历史记录
		List<History> historyList = historyService
				.getHistoriesByUserRelated(userId, type, getCurrentSemester());

		if (isEmptyList(historyList)) {
			return successResponse();
		}

		//查找用户自己拥有的全部工作量条目信息
		List<ItemDto> itemDtoList = itemService
				.findAll(null, null, null, user.getUserId(), null, getCurrentSemester(), null,
						null);

		List<ItemDto> commonItemDto = new ArrayList<>();
		if (!isEmptyList(itemDtoList)) {
			for (ItemDto itemDto : itemDtoList) {
				if (itemDto.getOwnerId().equals(itemDto.getReviewerId())) {
					commonItemDto.add(itemDto);
				}
			}
		}

		List<History> commonHistories = getHistoriesByItems(commonItemDto, type);

		//用户自己的条目对应的全部历史记录
		List<History> histories = getHistoriesByItems(itemDtoList, type);

		Map<String, Object> data = getData();

		//审核人查看的是自己负责的审核的条目对应的历史记录
		if (ROLE_REVIEWER.equals(role)) {
			historyList.removeAll(histories);
			historyList.addAll(commonHistories);

			data.put("historyList", historyConverter.poListToDtoList(sortHistories(historyList)));
		} else {
			//教师个人页面，则仅仅展示自己条目信息对应的相关历史记录
			data.put("historyList", historyConverter.poListToDtoList(histories));
		}

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

		List<History> historyList = historyService.getHistoriesByType(type, getCurrentSemester());

		if (isEmptyList(historyList)) {
			return successResponse();
		}

		List<ItemDto> itemList = new ArrayList<>();
		List<History> histories = new ArrayList<>();

		if (ROLE_REVIEWER.equals(role)) {
			List<Category> categoryList = categoryService
					.getCategoriesByReviewer(user.getUserId(), getCurrentSemester(), null);
			if (!isEmptyList(categoryList)) {
				for (Category category : categoryList) {
					itemList.addAll(itemConverter.poListToDtoList(itemService
							.findItemByCategory(getCurrentSemester(), category.getCategoryId(),
									ZERO_INT)));
				}
			}
		} else {
			itemList = itemService
					.findAll(null, null, null, user.getUserId(), null, getCurrentSemester(), null,
							null);
		}

		for (History history : historyList) {
			if(!isEmptyList(itemList)) {
				for (ItemDto itemDto : itemList) {
					if (history.getItemId().equals(buildHistoryItemId(itemDto.getItemId()))) {
						histories.add(history);
					}
				}
			}
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyConverter.poListToDtoList(histories));

		return successResponse(data);
	}

	private List<History> getHistoriesByItems(List<ItemDto> itemList, String type) {

		List<History> histories = new ArrayList<>();
		List<ItemDto> itemDtoList = new ArrayList<>();

		if (isEmptyList(itemList)) {
			return null;
		}

		//获取和type相对应的条目信息
		for (ItemDto itemDto : itemList) {
			if ("apply".equals(type) && APPLY_SELF.equals(itemDto.getImportRequired())) {
				itemDtoList.add(itemDto);
			} else if ("import".equals(type) && IMPORT_EXCEL.equals(itemDto.getImportRequired())) {
				itemDtoList.add(itemDto);
			} else {
				continue;
			}
		}

		//根据对应的条目查找相应的历史记录
		if(!isEmptyList(itemDtoList)) {
			for (ItemDto item : itemDtoList) {
				List<History> historyList = historyService
						.getHistoriesByItem(buildHistoryItemId(item.getItemId()), getCurrentSemester());
				histories.addAll(historyList);
			}
		}

		return sortHistories(histories);
	}

	private List<History> sortHistories(List<History> histories) {
		Collections.sort(histories, (o1, o2) -> {
			int time1 = DateHelper.getDefaultTimeStamp(o1.getCreateTime());
			int time2 = DateHelper.getDefaultTimeStamp(o2.getCreateTime());
			if (time1 > time2) {
				return -1;
			}

			if (time1 == time2) {
				return 0;
			}

			return 1;
		});
		return histories;
	}
}
