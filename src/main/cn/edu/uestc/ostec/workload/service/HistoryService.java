/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.History;

/**
 * Description:
 */
public interface HistoryService extends BaseService {

	/**
	 * 空的历史对象
	 */
	History EMPTY_HISTORY = new History();

	String NAME = "historyService";

	History getHistory(Integer historyId);

	List<History> getHistoriesByUser(Integer userId);

	List<History> getHistoriesByItem(String itemId);

	List<History> getHistories();

	boolean saveHistory(History history);

}
