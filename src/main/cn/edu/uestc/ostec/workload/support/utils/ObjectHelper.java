/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: ObjectHelper.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月24日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

import java.util.Collection;

/**
 * Description: 对象辅助工具
 * Version:v1.0 (author:刘文哲 update: 无 )
 */
public class ObjectHelper {

	private ObjectHelper() {
	}

	/**
	 * 判断对象是否为空
	 *
	 * @param object 需要判断的对象
	 * @return 空则返回true
	 */
	public static final boolean isNull(Object object) {
		return object == null;
	}

	/**
	 * 获取列表最大值
	 *
	 * @param list 列表
	 * @return 列表最大值
	 */
	public static Integer maxItem(Collection<Integer> list) {
		if (list == null || list.size() == 0) {
			return null;
		}
		Integer maxItem = list.iterator().next();
		//如果取得的值为null，设置默认值 0
		if (maxItem == null) {
			maxItem = 0;
		}
		for (Integer item : list) {
			if (item == null) {
				continue;
			}
			maxItem = Math.max(item, maxItem);
		}
		return maxItem;
	}

}
