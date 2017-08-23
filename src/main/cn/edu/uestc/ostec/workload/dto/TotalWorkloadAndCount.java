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
public class TotalWorkloadAndCount {

	private Integer count;

	private Double workload;

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Double getWorkload() {
		return workload;
	}

	public void setWorkload(Double workload) {
		this.workload = workload;
	}

	@Override
	public String toString() {
		return "TotalWorkloadAndCount{" + "count=" + count + ", workload=" + workload + '}';
	}
}
