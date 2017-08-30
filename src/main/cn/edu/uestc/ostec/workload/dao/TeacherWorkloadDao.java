/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;

/**
 * Version:v1.0 (description:  )
 */
@Component
public interface TeacherWorkloadDao extends BaseDao<TeacherWorkload> {

	Boolean insert(TeacherWorkload entity);

	Boolean update(TeacherWorkload entity);

	List<TeacherWorkload> select(
			@Param("teacherId")
					Integer teacherId,
			@Param("version")
					String version,
			@Param("professionalTitle")
					String professionalTitle);
}
