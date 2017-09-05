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
public class TeacherWorkloadAnalyze {

	private Integer teacherId;

	private String teacherName;

	private Workload typeOne;

	private Workload typeTwo;

	private Workload typeThree;

	private Workload typeFour;

	private Workload typeFive;

	private Workload typeSix;

	private Workload typeSeven;

	private Double totalWorkload;

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

	public Workload getTypeOne() {
		return typeOne;
	}

	public void setTypeOne(Workload typeOne) {
		this.typeOne = typeOne;
	}

	public Workload getTypeTwo() {
		return typeTwo;
	}

	public void setTypeTwo(Workload typeTwo) {
		this.typeTwo = typeTwo;
	}

	public Workload getTypeThree() {
		return typeThree;
	}

	public void setTypeThree(Workload typeThree) {
		this.typeThree = typeThree;
	}

	public Workload getTypeFour() {
		return typeFour;
	}

	public void setTypeFour(Workload typeFour) {
		this.typeFour = typeFour;
	}

	public Workload getTypeFive() {
		return typeFive;
	}

	public void setTypeFive(Workload typeFive) {
		this.typeFive = typeFive;
	}

	public Workload getTypeSix() {
		return typeSix;
	}

	public void setTypeSix(Workload typeSix) {
		this.typeSix = typeSix;
	}

	public Workload getTypeSeven() {
		return typeSeven;
	}

	public void setTypeSeven(Workload typeSeven) {
		this.typeSeven = typeSeven;
	}

	public Double getTotalWorkload() {
		return totalWorkload;
	}

	public void setTotalWorkload(Double totalWorkload) {
		this.totalWorkload = totalWorkload;
	}
}
