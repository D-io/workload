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

	History getHistory(Integer historyId,String version);

	List<History> getHistoriesByUser(Integer userId,String version);

	List<History> getHistoriesByUserRelated(Integer userId,String type,String version);

	List<History> getHistoriesByItem(String itemId,String version);

	List<History> getHistoriesByType(String type,String version);

	List<History> getHistories(String version);

	boolean saveHistory(History history);

	List<History> getCategoryHistories(Integer userId,String version);

}
