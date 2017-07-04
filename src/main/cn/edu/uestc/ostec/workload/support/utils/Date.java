/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: Date.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月12日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

/**
 * Description: 日期
 */

public final class Date {

	private int year;

	private int month;

	private int day;

	public static Date newInstance(int year, int month, int day) {
		return new Date(year, month, day);
	}

	private Date(int year, int month, int day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getYear() {
		return year;
	}

	public int getMonth() {
		return month;
	}

	public int getDay() {
		return day;
	}
}