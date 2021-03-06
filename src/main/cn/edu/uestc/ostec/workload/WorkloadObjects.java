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

import javax.lang.model.element.TypeElement;

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

	double DEFAULT_CHILD_WEIGHT = 1.0;

	/**
	 * 审核人角色信息
	 */
	String ROLE_REVIEWER = "reviewer";

	/**
	 * 申请人角色信息
	 */
	String ROLE_PROPOSER = "proposer";

	/**
	 * 是叶子节点
	 */
	String IS_LEAF = "Y";

	/**
	 * 不是叶子节点
	 */
	String NOT_LEAF = "N";

	/**
	 * 小组
	 */
	Integer GROUP = 1;

	/**
	 * 个人
	 */
	Integer SINGLE = 0;

	/**
	 * 文件附件对应的文件编号
	 */
	Integer ATTACHMENT_FILE_ID = 5;

	/**
	 * 审核人角色信息
	 */
	RoleInfo REVIEWER_ROLE = new RoleInfo("RE", "工作量审核人");

	/**
	 * 默认审核截止时间
	 */
	String DEFAULT_REVIEW_DATE_TIME = "-12-31 12:00:00";

	/**
	 * 默认申报截止时间
	 */
	String DEFAULT_APPLY_DATE_TIME = "-12-28 12:00:00";

	String TYPE_ONE_PREFIX = "0-1-5";

	String TYPE_TWO_PREFIX = "0-1-6";

	String TYPE_THREE_PREFIX = "0-1-7";

	String TYPE_FOUR_PREFIX = "0-1-37";

	String TYPE_FIVE_PREFIX = "0-2";

	String TYPE_SIX_PREFIX = "0-3";

	String TYPE_SEVEN_PREFIX = "0-4";

	default List<String> getTypePrefix() {
		List<String> typePrefixs = new ArrayList<>();
		typePrefixs.add(TYPE_ONE_PREFIX);
		typePrefixs.add(TYPE_TWO_PREFIX);
		typePrefixs.add(TYPE_THREE_PREFIX);
		typePrefixs.add(TYPE_FOUR_PREFIX);
		typePrefixs.add(TYPE_FIVE_PREFIX);
		typePrefixs.add(TYPE_SIX_PREFIX);
		typePrefixs.add(TYPE_SEVEN_PREFIX);
		return typePrefixs;
	}

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
