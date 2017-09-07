/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;

/**
 * Version:v1.0 (description:  )
 */
public interface TeacherWorkloadService extends BaseService {

	String NAME = "teacherWorkloadService";

	TeacherWorkload EMPTY_WORKLOAD = new TeacherWorkload();

	TeacherWorkload getTeacherWorkload(Integer teacherId,String version);

	List<TeacherWorkload> getAllWorkload(String version);

	Boolean saveTeacherWorkload(TeacherWorkload workload);

	Boolean updateTeacherWorkload(TeacherWorkload workload);

	Boolean addTeacherWorkload(TeacherWorkload workload);
}
