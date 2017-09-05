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
public class Workload {

	private String workloadDesc;

	private String workloadCode;

	private Double totalWorkload;

	private Double uncheckedWorkload;

	private Double checkedWorkload;

	public Double getTotalWorkload() {
		return totalWorkload;
	}

	public void setTotalWorkload(Double totalWorkload) {
		this.totalWorkload = totalWorkload;
	}

	public Double getUncheckedWorkload() {
		return uncheckedWorkload;
	}

	public void setUncheckedWorkload(Double uncheckedWorkload) {
		this.uncheckedWorkload = uncheckedWorkload;
	}

	public Double getCheckedWorkload() {
		return checkedWorkload;
	}

	public void setCheckedWorkload(Double checkedWorkload) {
		this.checkedWorkload = checkedWorkload;
	}

	public String getWorkloadDesc() {
		return workloadDesc;
	}

	public void setWorkloadDesc(String workloadDesc) {
		this.workloadDesc = workloadDesc;
	}

	public String getWorkloadCode() {
		return workloadCode;
	}

	public void setWorkloadCode(String workloadCode) {
		this.workloadCode = workloadCode;
	}
}
