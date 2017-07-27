/*
 *
 *  * Project: workload（工作量计算系统）
 *  * File: RegionManagerController.java
 *  * Author: 张健顺
 *  * Email: 1224522500@qq.com
 *  * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dao;

import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.History;

/**
 * Version:v1.0 (description:  )
 */
@Component
public interface HistoryDao extends BaseDao<History> {

	@Override
	default Boolean insert(History entity) {
		return null;
	}

	@Override
	default Boolean update(History entity) {
		return null;
	}

	@Override
	default Boolean delete(Integer id) {
		return null;
	}

	default List<History> selectHistories() {
		return null;
	}

	default List<History> selectHistories(Integer userId) {
		return null;
	}

}
