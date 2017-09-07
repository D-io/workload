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
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

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

	public Boolean addTeacherWorkload(TeacherWorkload workload) {
		return teacherWorkloadDao.insert(workload);
	}

	/**
	 * 该方法用于做 AOP 切面，执行之后便于统计总和
	 * @param workload 要修改的工作量
	 * @return Boolean
	 */
	@Override
	public Boolean saveTeacherWorkload(TeacherWorkload workload) {

		if(null == workload.getVersion() || "".equals(workload.getVersion())) {
			workload.setVersion(DateHelper.getCurrentTerm());
		}
		return teacherWorkloadDao.update(workload);
	}

	/**
	 * 用于切面中更新工作量，避免陷入死循环
	 * @param workload 工作量
	 * @return Boolean
	 */
	@Override
	public Boolean updateTeacherWorkload(TeacherWorkload workload) {
		if(null == workload.getVersion() || "".equals(workload.getVersion())) {
			workload.setVersion(DateHelper.getCurrentTerm());
		}
		return teacherWorkloadDao.update(workload);
	}
}
