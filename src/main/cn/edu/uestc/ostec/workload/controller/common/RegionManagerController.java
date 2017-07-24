/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
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
