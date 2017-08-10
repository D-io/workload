/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.HistoryDao;
import cn.edu.uestc.ostec.workload.pojo.History;
import cn.edu.uestc.ostec.workload.service.HistoryService;

/**
 * Description:
 * Version:v1.0
 */
@Service(HistoryService.NAME)
public class HistoryServiceImpl extends BaseServiceImpl implements HistoryService {

	@Autowired
	private HistoryDao historyDao;

	@Override
	public History getHistory(Integer historyId) {
		return objectResult(historyDao.selectHistories(historyId,null,null,null),EMPTY_HISTORY);
	}

	@Override
	public List<History> getHistoriesByUser(Integer userId) {
		return listResult(historyDao.selectHistories(null,userId,null,null));
	}

	@Override
	public List<History> getHistoriesByItem(String itemId) {
		return listResult(historyDao.selectHistories(null,null,itemId,null));
	}

	@Override
	public List<History> getHistoriesByType(String type) {
		return listResult(historyDao.selectHistories(null,null,null,type));
	}

	@Override
	public List<History> getHistories() {
		return listResult(historyDao.selectHistories(null,null,null,null));
	}

	@Override
	public boolean saveHistory(History history) {
		//TODO 对于操作历史不应该提供修改接口 只能添加和查询
		//TODO 全部转换为添加操作，即如果history带id属性，将其置为空
		if(!hasObjectId(history.getHistoryId())) {
			history.setHistoryId(getNextKey(history.TABLE_NAME));
			return historyDao.insert(history);
		}

		return historyDao.update(history);
	}

}
