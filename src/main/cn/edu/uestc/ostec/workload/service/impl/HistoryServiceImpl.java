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
	public History getHistory(Integer userId) {

		return objectResult(historyDao.select(userId),EMPTY_HISTORY);
	}

	@Override
	public List<History> getHistories() {

		return listResult(historyDao.selectHistories(null));
	}

	@Override
	public boolean saveHistory(History history) {
		if(hasObjectId(history.getHistoryId())) {
			history.setHistoryId(getNextKey(history.TABLE_NAME));
			return historyDao.insert(history);
		}

		return historyDao.update(history);
	}

	@Override
	public boolean removeHistory(Integer userId) {
		return historyDao.delete(userId);
	}

}
