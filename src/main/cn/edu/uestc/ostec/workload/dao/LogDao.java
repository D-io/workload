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

import cn.edu.uestc.ostec.workload.pojo.Log;

/**
 * Version:v1.0 (description:  )
 */
@Component
public interface LogDao extends BaseDao<Log> {

	Boolean insert(Log entity);

	@Override
	Boolean update(Log entity);

	@Override
	Boolean delete(Integer id);

	/**
	 * 查询日志
	 *
	 * @param actorId 相关用户
	 * @param level   日志等级
	 * @return List<Log>
	 */
	List<Log> select(
			@Param("logId")
					Integer logId,
			@Param("actorId")
					Integer actorId,
			@Param("level")
					String level);
}
