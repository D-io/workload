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
	public History getHistory(Integer historyId,String version) {
		return objectResult(historyDao.selectHistories(historyId,null,null,null,version),EMPTY_HISTORY);
	}

	@Override
	public List<History> getHistoriesByUser(Integer userId,String version) {
		return listResult(historyDao.selectHistories(null,userId,null,null,version));
	}

	@Override
	public List<History> getHistoriesByItem(String itemId,String version) {
		return listResult(historyDao.selectHistories(null,null,itemId,null,version));
	}

	@Override
	public List<History> getHistoriesByType(String type,String version) {
		return listResult(historyDao.selectHistories(null,null,null,type,version));
	}

	@Override
	public List<History> getHistoriesByUserRelated(Integer userId,String type,String version) {
		return listResult(historyDao.selectByUserRelated(userId,type,version));
	}

	@Override
	public List<History> getHistories(String version) {
		return listResult(historyDao.selectHistories(null,null,null,null,version));
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

	@Override
	public List<History> getCategoryHistories(Integer userId,String version) {
		return listResult(historyDao.selectAllCategoryHistory(userId,version));
	}

}
