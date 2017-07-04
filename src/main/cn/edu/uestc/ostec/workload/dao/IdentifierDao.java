/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: IdentifierMapper.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月13日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Description: MyBatis主键映射器
 */
@Component
public interface IdentifierDao {

	/**
	 * 根据表名查找相关表的最后一条记录的主键编号
	 *
	 * @param tableName 主键相关的表的名称
	 * @param tableId 主键名称
	 * @return 查询成功则返回主键编号值，否则返回null
	 */
	Integer getLastKey(
			@Param("tableName")
					String tableName,
			@Param("tableId")
					String tableId);

}
