/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Version:v1.0 (description:  )
 */
public class TeacherWorkloadAnalyze {

	private Integer teacherId;

	private String teacherName;

	private List<Workload> types;

	private Double totalWorkload;

	public List<Workload> getTypes() {
		return types;
	}

	public void setTypes(List<Workload> types) {
		this.types = types;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public Double getTotalWorkload() {
		return totalWorkload;
	}

	public void setTotalWorkload(Double totalWorkload) {
		this.totalWorkload = totalWorkload;
	}

	public TeacherWorkloadAnalyze add(TeacherWorkloadAnalyze workload) {
		List<Workload> workloadList = workload.getTypes();
		List<Workload> newWorkload = new ArrayList<>();
		for (int i = 0; i < 7; i++) {
			newWorkload.add(this.types.get(i).add(workloadList.get(i)));
		}
		workload.setTypes(newWorkload);
		workload.setTotalWorkload(this.getTotalWorkload() + workload.getTotalWorkload());
		return workload;
	}
}
