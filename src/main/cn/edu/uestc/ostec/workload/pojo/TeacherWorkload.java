/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.pojo;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;

/**
 * Version:v1.0 (description:  )
 */
public class TeacherWorkload {

	private String teacherName;

	private Integer teacherId;

	private String professionalTitle = null;

	private Double checkedWorkload = ZERO_DOUBLE;

	private Integer checkedItems = ZERO_INT;

	private Double uncheckedWorkload = ZERO_DOUBLE;

	private Integer uncheckedItems = ZERO_INT;

	private Double totalWorkload = ZERO_DOUBLE;

	private String version = DateHelper.getCurrentTerm();

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Double getTotalWorkload() {
		return totalWorkload;
	}

	public void setTotalWorkload(Double totalWorkload) {
		this.totalWorkload = totalWorkload;
	}

	public String getProfessionalTitle() {
		return professionalTitle;
	}

	public void setProfessionalTitle(String professionalTitle) {
		this.professionalTitle = professionalTitle;
	}

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
