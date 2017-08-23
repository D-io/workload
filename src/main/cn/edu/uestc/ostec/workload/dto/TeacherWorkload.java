/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description:  )
 */
public class TeacherWorkload {

	private String teacherName;

	private Integer teacherId;

	private Double checkedWorkload;

	private Integer checkedItems;

	private Double uncheckedWorkload;

	private Integer uncheckedItems;

	public Integer getCheckedItems() {
		return checkedItems;
	}

	public void setCheckedItems(Integer checkedItems) {
		this.checkedItems = checkedItems;
	}

	public Integer getUncheckedItems() {
		return uncheckedItems;
	}

	public void setUncheckedItems(Integer uncheckedItems) {
		this.uncheckedItems = uncheckedItems;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public Double getCheckedWorkload() {
		return checkedWorkload;
	}

	public void setCheckedWorkload(Double checkedWorkload) {
		this.checkedWorkload = checkedWorkload;
	}

	public Double getUncheckedWorkload() {
		return uncheckedWorkload;
	}

	public void setUncheckedWorkload(Double uncheckedWorkload) {
		this.uncheckedWorkload = uncheckedWorkload;
	}

	public TeacherWorkload(String teacherName, Integer teacherId, Double checkedWorkload,
			Double uncheckedWorkload) {
		this.teacherName = teacherName;
		this.teacherId = teacherId;
		this.checkedWorkload = checkedWorkload;
		this.uncheckedWorkload = uncheckedWorkload;
	}

	public TeacherWorkload() {
	}
}
