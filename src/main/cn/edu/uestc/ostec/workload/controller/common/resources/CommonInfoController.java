/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.controller.common.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.TeacherService;
import cn.edu.uestc.ostec.workload.support.utils.Date;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.COMMON_INFO_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 公共信息获取控制器  )
 */
@RestController
@RequestMapping(COMMON_INFO_PATH)
public class CommonInfoController extends ApplicationController {

	@Autowired
	private TeacherService teacherService;

	/**
	 * 获取教师信息列表
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "teachers", method = GET)
	public RestResponse getTeacherList() {

		Map<String, Object> data = getData();
		data.put("teacherList", teacherService.findAll());

		return successResponse(data);
	}

	/**
	 * 获取当前登录的教师信息
	 *
	 * @return 教师信息
	 */
	@RequestMapping(value = "user-info", method = GET)
	public RestResponse getUserInfo() {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		Map<String, Object> data = getData();
		data.put("teacher", user);

		return successResponse(data);
	}

	/**
	 * 获取学年列表
	 * @return
	 */
	@RequestMapping(value = "years",method = GET)
	public RestResponse getSchoolYearList() {
		return successResponse(DateHelper.getCurrentSchoolYears());
	}

	/**
	 * 设置学期
	 *
	 * @param year   学年
	 * @param scheme 学期
	 */
	@RequestMapping(value = "scheme", method = POST)
	public RestResponse switchScheme(String year, int scheme) {
		if (!year.isEmpty() && (scheme == 1 || scheme == 2)) {
			session.setAttribute(SESSION_CURRENT_YEAR, year);
			session.setAttribute(SESSION_CURRENT_SCHEME, scheme);
		}
		return successResponse(getCurrentSemester());
	}

}
