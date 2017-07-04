package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import cn.edu.uestc.ostec.workload.service.BaseService;
import cn.edu.uestc.ostec.workload.service.key.IdentifierService;

/**
 * Version:v1.0 (description:  )
 */
public class BaseServiceImpl implements BaseService {

	@Autowired
	private IdentifierService identifierService;

	@Override
	public Integer getNextKey(String tableName) {

		return identifierService.nextKey(tableName);
	}

}
