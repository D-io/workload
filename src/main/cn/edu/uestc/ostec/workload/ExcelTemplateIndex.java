/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload;

/**
 * Version:v1.0 (description: 工作量导入Excel模板字段索引 )
 */
public interface ExcelTemplateIndex {

	int OWNER_ID_INDEX = 0;

	int OWNER_NAME_INDEX = 1;

	int ITEM_NAME_INDEX = 2;

	int IS_GROUP_INDEX = 3;

	int GROUP_MANAGER_INDEX = 4;

	int GROUP_MANAGER_NAME_INDEX = 5;

	int JSON_PARAMETERS_INDEX = 6;

	int JOB_DESC_INDEX = 7;

	int JSON_WEIGHT_INDEX = 8;

	int T_TEACHER_ID_INDEX = 0;

	int T_ITEM_NAME_INDEX = 2;

	int T_JOB_DESC_INDEX = 3;

	int T_PARAMETER_FIRST = 0;

	int T_PARAMETER_SECOND = 0;



}
