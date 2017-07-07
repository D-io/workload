/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: MultiLevelObjectAdaptor.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月26日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.adaptor;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import cn.edu.uestc.ostec.workload.pojo.dto.AbstractMultiLevelObjectDto;
import cn.edu.uestc.ostec.workload.service.MultiLevelService;

/**
 * Description: 多层级对象适配器
 */
public interface MultiLevelObjectAdaptor<D extends AbstractMultiLevelObjectDto> {

	/**
	 * 对多层级对象按照层级关系进行排序
	 *
	 * @param service 多层级服务
	 * @param root    根节点
	 * @return 构建好的根节点
	 */
	default D buildObjectStructure(D root, MultiLevelService<D> service)
			throws JsonProcessingException {

		//以当前对象作为根节点获取子节点
		List<D> categoryList = service.getDtoObjects(root.getStatus(),root.getObjectId());

		//存在子节点则递归查询
		if (categoryList.size() > 0) {
			for (D categoryDto : categoryList) {
				buildObjectStructure(categoryDto, service);
			}
		}

		//根节点与子节点绑定
		root.setChildren(categoryList);

		return root;
	}

}
