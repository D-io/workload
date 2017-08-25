/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.dto;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * Version:v1.0 (description:  )
 */
public interface CompareObjectDifferences<T> {

	 default String contrastObj(Object oldBean, Object newBean) {
		String str = "";
		//if (oldBean instanceof SysConfServer && newBean instanceof SysConfServer) {
		T pojo1 = (T) oldBean;
		T pojo2 = (T) newBean;
		try {
			Class clazz = pojo1.getClass();
			Field[] fields = pojo1.getClass().getDeclaredFields();
			int i = 1;
			for (Field field : fields) {
				if ("serialVersionUID".equals(field.getName())) {
					continue;
				}
				PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
				Method getMethod = pd.getReadMethod();
				Object o1 = getMethod.invoke(pojo1);
				Object o2 = getMethod.invoke(pojo2);
				if (o1 == null || o2 == null) {
					continue;
				}
				if (!o1.toString().equals(o2.toString())) {
					if (i != 1) {
						str += ";\n";
					}
					str += "(" + i + ")将字段名称:" + field.getName() + " 从 旧值:" + o1 + " 修改为 新值:" + o2;
					i++;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		// }
		return str;
	}
}
