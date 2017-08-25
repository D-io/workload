/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.HistoryDto;
import cn.edu.uestc.ostec.workload.pojo.History;

/**
 * Version:v1.0 (description:  )
 */
@Component
public class HistoryConverter implements Converter<History, HistoryDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Override
	public HistoryDto poToDto(History po) {
		HistoryDto historyDto = new HistoryDto();
		historyDto.setAimUserId(po.getAimUserId());
		historyDto.setCreateTime(po.getCreateTime());
		historyDto.setHistoryId(po.getHistoryId());
		historyDto.setItemId(po.getItemId());
		historyDto.setOperation(po.getOperation());
		historyDto.setVersion(po.getVersion());
		historyDto.setType(po.getType());
		historyDto.setUserId(po.getUserId());
		historyDto.setUserName(teacherDao.findNameById(historyDto.getUserId()));
		return historyDto;
	}

	@Override
	public History dtoToPo(HistoryDto dto) {
		return null;
	}
}
