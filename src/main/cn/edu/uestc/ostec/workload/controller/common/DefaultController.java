/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload.controller.common;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.ForbiddenException;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.dto.User;
import cn.edu.uestc.ostec.workload.service.UserRoleService;
import cn.edu.uestc.ostec.workload.type.UserType;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REGION_PATH;
import static cn.edu.uestc.ostec.workload.support.utils.DateHelper.getCurrentTimestamp;

/**
 * Description: 用户主页控制器
 */
@Controller
public class DefaultController extends ApplicationController {

	@Autowired
	private UserRoleService userRoleService;

	/**
	 * 系统管理员主页
	 */
	private static final String MANAGER_PAGE = "manager/manager";

	/**
	 * 系统默认主页
	 */
	@RequestMapping(value = "default")
	public String index(ModelMap modelMap) {

		buildModel(modelMap);

		// 如果用户未登录，返回首页
		if (session.getAttribute(SESSION_USER_IDENTIFIER) == null) {
			return DEFAULT_PAGE;
		}

		/*以下操作均为用户已登录*/

		try {
			injectRoleInfo(modelMap);
		} catch (JsonProcessingException e) {
			throw new ForbiddenException();
		}

		//用户登录后响应功能首页，暂时只有课程管理员
		Map<String, String> parameters = new HashMap<>();
		//parameters.put("regionName", _buildUrlPath(SIGNED_DEFAULT_PAGE));
		parameters.put("regionName", MANAGER_PAGE);

		//转发请求
		return getForwardUrlPath(REGION_PATH, parameters);
	}

	private void injectRoleInfo(ModelMap modelMap) throws JsonProcessingException {
		User user = userRoleService.getUserRoleDto(getUserId());
		List<RoleInfo> roleInfoList = user.getRoleInfoList();
		List<String> roleList = listInstance();
		for (RoleInfo info : roleInfoList) {
			roleList.add(info.getRole());
		}
		UserType highestRole = null;
		for (int i = 1, length = UserType.values().length; i <= length; i++) {
			UserType roleCode = UserType.getUserType(i);
			if (roleList.contains(roleCode.getCode())) {
				highestRole = roleCode;
				break;
			}
		}
		modelMap.addAttribute("currentRole", highestRole.getCode());
		modelMap.addAttribute("currentRoleName", highestRole.getDesc());
		modelMap.addAttribute("roleList", OBJECT_MAPPER.writeValueAsString(roleInfoList));
	}

	/**
	 * 注入Model数据
	 */
	private void buildModel(ModelMap modelMap) {

		//注入上下文路径
		modelMap.addAttribute("contextPath", getContextPath());
	}


}
