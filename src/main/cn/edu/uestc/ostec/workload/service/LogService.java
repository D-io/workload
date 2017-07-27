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

import cn.edu.uestc.ostec.workload.pojo.Log;

/**
 * Description:
 */
public interface LogService extends BaseService {

	/**
	 * 空的日志对象
	 */
	Log EMPTY_LOG = new Log();

	String NAME = "logService";

	default List<Log> getLogs(Integer actorId, String level) {

		return emptyList();
	}

	default List<Log> getLogs(Integer actorId) {

		return getLogs(actorId, null);
	}

	default boolean saveLog(Log log) {

		return false;
	}

}
