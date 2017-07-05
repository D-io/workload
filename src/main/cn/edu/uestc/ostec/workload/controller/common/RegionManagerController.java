/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: RegionManagerController.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年6月2日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REGION_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Description: 区域管理控制器
 * Version:v1.0 (author:刘文哲 update: 规划region分发处理逻辑 )
 */
@Controller
@RequestMapping(REGION_PATH)
public class RegionManagerController {

	/**
	 * 分发区域请求
	 *
	 * @param regionName 区域名称
	 * @return 返回区域名称对应的jsp页面
	 */
	@RequestMapping(method = GET)
	public String distribution(@RequestParam
			String regionName) {

		return regionName;
	}

}
