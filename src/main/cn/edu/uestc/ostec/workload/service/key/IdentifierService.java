/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: IdentifierGenerator.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月13日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service.key;

/**
 * Description: 主键生成器
 * Version:v1.0 (author:刘文哲 update: 无 )
 */
public interface IdentifierService {

	/**
	 * 同步主键生成器名称
	 */
	String SYNCHRONIZED_GENERATOR = "synchronizedIdentifierGenerator";

	/**
	 * 默认的主键后缀
	 */
	String DEFAULT_IDENTIFIER_SUFFIX = "_id";

	/**
	 * 默认的主键步长
	 */
	Integer DEFAULT_INC_STEP = 1;

	/**
	 * 根据表名获取下一个可用的主键编号
	 *
	 * @param tableName 需要获取主键的表名
	 * @return 返回可用的下一个主键编号
	 */
	default Integer nextKey(String tableName) {

		return lastKey(tableName, tableName + DEFAULT_IDENTIFIER_SUFFIX) + DEFAULT_INC_STEP;
	}

	/**
	 * 根据表名获取目前最后一条记录的主键编号
	 *
	 * @param tableName 需要获取主键的表名
	 * @return 返回目前最后一条记录的主键编号
	 */
	Integer lastKey(String tableName, String tableId);

	/**
	 * 更新所有主键编号
	 *
	 * @return 更新成功则返回TRUE，否则返回FALSE
	 */
	default boolean updateKeys() {
		return false;
	}

	/**
	 * 根据指定的表名更新相关表的主键编号
	 *
	 * @param tableName 需要获取主键的表名
	 * @return 更新成功则返回TRUE，否则返回FALSE
	 */
	default boolean updateKey(String tableName) {
		return false;
	}

	/**
	 * 根据指定的表名移除相关表的主键最新的编号
	 *
	 * @param tableName 需要获取主键的表名
	 * @return 移除成功则返回TRUE，否则返回FALSE
	 */
	default boolean removeKey(String tableName) {
		return false;
	}

}
