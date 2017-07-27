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

import cn.edu.uestc.ostec.workload.dao.LogDao;
import cn.edu.uestc.ostec.workload.pojo.Log;
import cn.edu.uestc.ostec.workload.service.LogService;

/**
 * Version:v1.0 (description:  )
 */
@Service(LogService.NAME)
public class LogServiceImpl extends BaseServiceImpl implements LogService {

	@Autowired
	private LogDao logDao;

	@Override
	public List<Log> getLogs(Integer actorId, String level) {
		return listResult(logDao.select(null,actorId,level));
	}

	@Override
	public List<Log> getLogs(Integer actorId) {
		return listResult(logDao.select(null,actorId,null));
	}

	@Override
	public boolean saveLog(Log log) {
		if(!hasObjectId(log.getLogId())) {
			log.setLogId(getNextKey(log.TABLE_NAME));
			return logDao.insert(log);
		}
		return logDao.update(log);
	}
}
