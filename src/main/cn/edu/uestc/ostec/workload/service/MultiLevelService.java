/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: MultiLevelService.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月27日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dto.AbstractMultiLevelObjectDto;

/**
 * Description: 多层级服务标记接口
 */
public interface MultiLevelService<D extends AbstractMultiLevelObjectDto>
		extends BaseService {

	/**
	 * 根据父节点获取DTO信息列表，默认返回空的列表
	 *
	 * @param status 状态
	 * @param parentId 父节点的编号
	 * @return 返回特定的DTO信息，默认返回空对象
	 */
	List<D> getDtoObjects(Integer status,Integer parentId,String version);

	/**
	 * 根据节点Id获取dto对象
	 * @param objectId 节点Id
	 * @return D 对应的节点信息
	 */
	D getDtoObject(Integer objectId);

	/**
	 * 根据父节点获取DTO信息列表
	 * @param parentId 父节点
	 * @return List<CategoryDto>
	 */
	List<D> getDtoObjects(Integer parentId,String version);

}
