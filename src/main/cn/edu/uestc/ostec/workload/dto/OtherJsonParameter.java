/*
 *
 *  * Project: workload（工作量计算系统）
 *  * File: RegionManagerController.java
 *  * Author: 张健顺
 *  * Email: 1224522500@qq.com
 *  * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description:  )
 */
public class OtherJsonParameter {

	private String key;

	private String value;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public OtherJsonParameter(String key, String value) {
		this.key = key;
		this.value = value;
	}

	public OtherJsonParameter() {
	}

	@Override
	public String toString() {
		return "OtherJsonParameter{" + "key='" + key + '\'' + ", value='" + value + '\'' + '}';
	}
}
