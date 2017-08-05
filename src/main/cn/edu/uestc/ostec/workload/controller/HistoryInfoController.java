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

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Version:v1.0 (description:  )
 */
@RestController
@RequestMapping("history" + INFO_PATH)
public class HistoryInfoController extends ApplicationController {

	@Autowired
	private HistoryService historyService;

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
	public RestResponse getHistoriesByUsers() {
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int userId = user.getUserId();
		List<History> historyList = historyService.getHistoriesByUser(userId);

		if (isEmptyList(historyList)) {
			return successResponse();
		}

		Map<String, Object> data = getData();
		data.put("historyList", historyList);

		return successResponse(data);
	}

}
