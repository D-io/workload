/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: DateHelper.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

import org.apache.poi.util.SystemOutLogger;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

import static cn.edu.uestc.ostec.workload.support.utils.DateFormatConstants.DATE_FORMAT_CN;
import static cn.edu.uestc.ostec.workload.support.utils.DateFormatConstants.DATE_FORMAT_DEFAULT;
import static cn.edu.uestc.ostec.workload.support.utils.DateFormatConstants.DATE_TIME_FORMAT_CN;
import static cn.edu.uestc.ostec.workload.support.utils.DateFormatConstants.DATE_TIME_FORMAT_DEFAULT;
import static cn.edu.uestc.ostec.workload.support.utils.DateFormatConstants.MILLISECOND_TO_SECOND;
import static cn.edu.uestc.ostec.workload.support.utils.DateFormatConstants.TIME_FORMAT_DEFAULT;

/**
 * Description: 时间辅助类(采用java8新特性)
 */
public class DateHelper {

	private DateHelper() {
	}

	/**
	 * 获取当前日期
	 *
	 * @return 默认格式的当前日期
	 */
	public static String getDate() {

		return getDate(DATE_FORMAT_DEFAULT);
	}

	public static String getDate(String formatter) {

		return LocalDate.now().format(DateTimeFormatter.ofPattern(formatter));
	}

	public static String getDate(Date date) {

		return getDate(date, DATE_FORMAT_DEFAULT);
	}

	public static String getDate(Date date, String formatter) {

		return LocalDate.of(date.getYear(), date.getMonth(), date.getDay())
				.format(DateTimeFormatter.ofPattern(formatter));
	}

	public static String getTime() {

		return getTime(TIME_FORMAT_DEFAULT);
	}

	public static String getTime(String formatter) {

		return LocalTime.now().withNano(0).format(DateTimeFormatter.ofPattern(formatter));
	}

	public static String getDateTime() {

		return getDateTime(LocalDateTime.now().withNano(0), DATE_TIME_FORMAT_DEFAULT);
	}

	/**
	 * 格式化日期时间
	 *
	 * @param dateTime 日期时间
	 * @param format   日期格式
	 * @return 格式化的日期时间
	 */
	public static String getDateTime(LocalDateTime dateTime, String format) {

		return dateTime.format(DateTimeFormatter.ofPattern(format));
	}

	/**
	 * 获取日期时间 - yyyy-MM-dd HH:mm:ss
	 *
	 * @param timestamp 时间戳
	 * @return 默认格式的日期时间
	 */
	public static String getDateTime(long timestamp) {
		LocalDateTime time = LocalDateTime
				.ofInstant(Instant.ofEpochSecond(timestamp), TimeZone.getDefault().toZoneId());
		return getDateTime(time, DATE_TIME_FORMAT_DEFAULT);
	}

	public static String getDateTime(int timestamp) {
		LocalDateTime time = LocalDateTime
				.ofInstant(Instant.ofEpochSecond(timestamp), TimeZone.getDefault().toZoneId());
		return getDateTime(time, DATE_FORMAT_CN);
	}

	/**
	 * 获取时间戳
	 *
	 * @param dateTime 字符串格式的日期时间
	 * @param format   时间格式化类型
	 * @return 时间戳
	 */
	public static int getTimeStamp(String dateTime, String format) {
		LocalDateTime time = LocalDateTime.parse(dateTime, DateTimeFormatter.ofPattern(format));
		return (int) (Timestamp.valueOf(time).getTime() / MILLISECOND_TO_SECOND);
	}

	private static long currentTime() {

		return System.currentTimeMillis();
	}

	public static int getDateTimeStamp(String date) {
		return getTimeStamp(date+" 00时00分00秒",DATE_TIME_FORMAT_CN);
	}

	public static int getTimeStamp(String date) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_FORMAT_CN);
		java.util.Date date_ = null;
		try {
			date_ = simpleDateFormat.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return (int) (date_.getTime() / MILLISECOND_TO_SECOND);
	}

	/**
	 * 获取当前时间的时间戳（不包含毫秒）
	 *
	 * @return 当前时间的时间戳
	 */
	public static int getCurrentTimestamp() {

		return (int) (currentTime() / MILLISECOND_TO_SECOND);

	}

}
