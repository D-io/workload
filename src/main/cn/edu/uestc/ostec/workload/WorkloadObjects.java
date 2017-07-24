/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.dto.RoleInfo;

/**
 * Version:v1.0 (description:  )
 */
public interface WorkloadObjects {

	/**
	 * 不可变空Map&lt;String, Object&gt;
	 */
	Map<String, Object> IMMUTABLE_EMPTY_MAP = Collections.unmodifiableMap(new HashMap<>());

	/**
	 * 不可变长空List&lt;String&gt;
	 */
	List<String> IMMUTABLE_EMPTY_STRING_LIST = Collections.unmodifiableList(new ArrayList<>());

	/**
	 * int类型 0
	 */
	int ZERO_INT = 0;

	/**
	 * double类型 0
	 */
	double ZERO_DOUBLE = 0.0;

	/**
	 * 审核人角色信息
	 */
	String ROLE_REVIEWER = "reviewer";

	/**
	 * 申请人角色信息
	 */
	String ROLE_PROPOSER = "proposer";

	/**
	 * 小组
	 */
	Integer GROUP = 1;

	/**
	 * 个人
	 */
	Integer SINGLE = 0;

	/**
	 * 审核人角色信息
	 */
	RoleInfo REVIEWER_ROLE = new RoleInfo("RE","工作量审核人");


	/**
	 * 获取空的Map&lt;K, V&gt;
	 *
	 * @param <K> 键类型
	 * @param <V> 值类型
	 * @return 空的Map&lt;K, V&gt;
	 */
	default <K, V> Map<K, V> mapInstance() {

		return new HashMap<>();
	}

	/**
	 * 获取空List&lt;T&gt;
	 *
	 * @param <T> 列表类型
	 * @return 空List&lt;T&gt;
	 */
	default <T> List<T> listInstance() {

		return new ArrayList<>();
	}

	/**
	 * 获取数据集合
	 *
	 * @return 获取Map类型的数据集合
	 */
	default Map<String, Object> getData() {

		return mapInstance();
	}

	/**
	 * json映射器对象
	 */
	ObjectMapper OBJECT_MAPPER = new ObjectMapper();

}
