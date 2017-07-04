/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: SynchronizedKeyGenerator.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月13日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service.key;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.dao.IdentifierDao;


/**
 * Description: 同步的主键标识符生成器
 */
@Service(IdentifierService.SYNCHRONIZED_GENERATOR)
public class SynchronizedIdentifierGenerator implements IdentifierService {

	@Autowired
	private IdentifierDao identifierDao;

	@Override
	public synchronized Integer lastKey(String tableName, String tableId) {
		Integer lastKey = identifierDao.getLastKey(tableName, tableId);
		return lastKey != null ? lastKey : 0;
	}

}
