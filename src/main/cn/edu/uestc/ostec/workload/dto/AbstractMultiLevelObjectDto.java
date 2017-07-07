/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: MultiLevelPojoContext.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月31日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.dto;

import java.util.List;

/**
 * Description:多层级对象标记接口
 */
public abstract class AbstractMultiLevelObjectDto<T> {

	/**
	 * 获取当前对象父节点编号
	 *
	 * @return 当前对象父节点编号
	 */
	public abstract Integer getParentId();

	/**
	 * 获取当前对象的节点编号
	 *
	 * @return 当前对象的节点编号
	 */
	public abstract Integer getObjectId();

	/**
	 * 获取当前对象的状态
	 * @return 当前对象的状态
	 */
	public abstract Integer getStatus();

	/**
	 * 获取子节点组成的列表
	 *
	 * @return 子节点组成的列表
	 */
	public abstract List getChildren();

	/**
	 * 设置子节点
	 *
	 * @param children 子节点组成的列表
	 */
	public abstract void setChildren(List<T> children);

}
