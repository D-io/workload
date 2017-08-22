/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.support.utils;

import java.util.List;

/**
 * Version:v1.0 (description: 自定义分页助手  )
 */
public class PageHelper {

	public static <T> List<T> paginate(List<T> entityList, Integer pageNum, Integer pageSize) {
		if (null == entityList || entityList.isEmpty()) {
			return null;
		}

		pageSize = (null == pageSize ? 100000 : pageSize);
		pageNum = (null == pageNum ? 1 : pageNum);

		int totalRecords = entityList.size();
		int totalPages = (totalRecords / pageSize) + 1;

		pageNum = (totalPages < pageNum ? totalPages : pageNum);

		int startIndex = (pageNum - 1) * pageSize;
		int endIndex = startIndex + pageSize;
		endIndex = (endIndex > totalRecords ? totalRecords : endIndex);

		return entityList.subList(startIndex, endIndex);
	}

}
