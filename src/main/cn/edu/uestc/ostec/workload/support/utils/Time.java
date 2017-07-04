/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: Time.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月12日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

/**
 * Description: 时间
 */
public final class Time {

	private int hour;

	private int minute;

	private int seconds;

	public static Time newInstance(int hour, int minute, int seconds) {
		return new Time(hour, minute, seconds);
	}

	private Time(int hour, int minute, int seconds) {
		this.hour = hour;
		this.minute = minute;
		this.seconds = seconds;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public void setMinute(int minute) {
		this.minute = minute;
	}

	public void setSeconds(int seconds) {
		this.seconds = seconds;
	}

	public int getHour() {
		return hour;
	}

	public int getMinute() {
		return minute;
	}

	public int getSeconds() {
		return seconds;
	}
}
