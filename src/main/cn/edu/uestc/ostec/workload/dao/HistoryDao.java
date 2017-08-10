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

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.History;

/**
 * Version:v1.0 (description:  )
 */
@Component
public interface HistoryDao extends BaseDao<History> {

	Boolean insert(History entity);

	Boolean update(History entity);

	Boolean delete(Integer id);

	List<History> selectHistories(
			@Param("historyId")
					Integer historyId,
			@Param("userId")
					Integer userId,
			@Param("itemId")
					String itemId,
			@Param("type")
					String type);

}
