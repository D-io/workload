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

import cn.edu.uestc.ostec.workload.dao.TeacherWorkloadDao;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;

/**
 * Version:v1.0 (description:  )
 */
@Service(TeacherWorkloadService.NAME)
public class TeacherWorkloadServiceImpl extends BaseServiceImpl implements TeacherWorkloadService {

	@Autowired
	private TeacherWorkloadDao teacherWorkloadDao;

	@Override
	public TeacherWorkload getTeacherWorkload(Integer teacherId, String version) {
		return objectResult(teacherWorkloadDao.select(teacherId, version, null), EMPTY_WORKLOAD);
	}

	@Override
	public List<TeacherWorkload> getAllWorkload(String version) {
		return listResult(teacherWorkloadDao.select(null, version, null));
	}

	@Override
	public Boolean saveTeacherWorkload(TeacherWorkload workload) {

		return teacherWorkloadDao.update(workload);
	}
}
