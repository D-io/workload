/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: Converter.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年6月1日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;

import org.apache.poi.ss.formula.functions.T;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.OBJECT_MAPPER;

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
	P dtoToPo(D dto);

	/**
	 * 批量转换持久化对象为数据传输对象
	 *
	 * @param poList 持久化对象列表
	 * @return 数据传输对象列表
	 */
	default List<D> poListToDtoList(List<P> poList) {
		List<D> dtoList = new ArrayList<>();
		for (P po : poList) {
			dtoList.add(poToDto(po));
		}

		return dtoList;
	}

	/**
	 * 批量转换数据传输对象为持久化对象
	 *
	 * @param dtoList 数据传输对象
	 * @return 持久化对象列表
	 */
	default List<P> dtoListToPoList(List<D> dtoList) throws Exception {
		List<P> poList = new ArrayList<>();
		for (D dto : dtoList) {
			poList.add(dtoToPo(dto));
		}

		return poList;
	}

	default JavaType getCollectionType(Class<?> collectionClass, Class<?>... elementClasses) {
		return OBJECT_MAPPER.getTypeFactory()
				.constructParametricType(collectionClass, elementClasses);
	}

	default boolean isNull(String obj) {
		return (null == obj || "".equals(obj));
	}

	default boolean isNull(Object object) {
		return (null == object);
	}

	/**
	 * Json映射到对象
	 */
	default <T> List<T> readValueFromJson(String json, Class<T> obj) {

		try {
			if (!isNull(json)) {
				return OBJECT_MAPPER.readValue(json, getCollectionType(ArrayList.class, obj));
			} else {
				return null;
			}
		} catch (IOException e) {
			return null;
		}
	}

	default <T> String writeJsonFromValue(List<T> obj) {

		try {
			if (!isNull(obj)) {
				return OBJECT_MAPPER.writeValueAsString(obj);
			} else {
				return null;
			}
		} catch (JsonProcessingException e) {
			return null;
		}
	}

}
