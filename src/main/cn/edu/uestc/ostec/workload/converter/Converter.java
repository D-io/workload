/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: Converter.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年6月1日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.converter;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

/**
 * Description: 转换器接口
 */
public interface Converter<P, D> {

	/**
	 * 由持久化对象转为数据传输对象
	 *
	 * @param po 持久化对象
	 * @return 数据传输对象
	 */
	D poToDto(P po);

	/**
	 * 由数据传输对象转为持久化对象
	 *
	 * @param dto 数据传输对象
	 * @return 持久化对象
	 */
	P dtoToPo(D dto) throws ParseException;
}
