package cn.edu.uestc.ostec.workload.support.utils;

/**
 * Description: 时间格式化常量
 * Version:v1.0 (author:刘文哲 update:  )
 */
public interface DateFormatConstants {

	/**
	 * 12小时制
	 */
	int TWELVE_HOUR_SYSTEM = 12;

	/**
	 * 24小时制
	 */
	int TWENTY_FOUR_HOUR_SYSTEM = 24;

	/**
	 * 秒与毫秒的倍率
	 */
	int MILLISECOND_TO_SECOND = 1000;

	/**
	 * 中文日期格式 - yyyy年MM月dd日
	 */
	String DATE_FORMAT_CN = "yyyy年MM月dd日";

	/**
	 * 默认日期格式 - yyyy-MM-dd
	 */
	String DATE_FORMAT_DEFAULT = "yyyy-MM-dd";

	/**
	 * 中文时间格式 - HH时mm分ss秒
	 */
	String TIME_FORMAT_CN = "HH时mm分ss秒";

	/**
	 * 默认时间格式 - HH:mm:ss
	 */
	String TIME_FORMAT_DEFAULT = "HH:mm:ss";

	/**
	 * 默认日期时间格式 - yyyy-MM-dd HH:mm:ss
	 */
	String DATE_TIME_FORMAT_DEFAULT = DATE_FORMAT_DEFAULT + " " + TIME_FORMAT_DEFAULT;

	/**
	 * 中文日期时间格式 - yyyy年MM月dd日 HH时mm分ss秒
	 */
	String DATE_TIME_FORMAT_CN = DATE_FORMAT_CN + " " + TIME_FORMAT_CN;

	/**
	 * 整形时间格式
	 */
	String DATE_TIME_FORMAT_INTEGER = "yyyyMMdd";

}
