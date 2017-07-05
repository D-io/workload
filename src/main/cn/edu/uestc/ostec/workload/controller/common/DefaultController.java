package cn.edu.uestc.ostec.workload.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REGION_PATH;

/**
 * Description: 用户主页控制器
 */
@Controller
public class DefaultController extends ApplicationController {

	/**
	 * 系统管理员主页
	 */
	private static final String MANAGER_PAGE = "manager/manager";

	/**
	 * 系统默认主页
	 */
	@RequestMapping(value = "default")
	public String index(ModelMap modelMap) {

		// 如果用户未登录，返回首页
		if (session.getAttribute(SESSION_USER_IDENTIFIER) == null) {
			return DEFAULT_PAGE;
		}

		//用户登录后响应功能首页，暂时只有课程管理员
		Map<String, String> parameters = new HashMap<>();
		parameters.put("regionName", MANAGER_PAGE);

		//转发请求
		return getForwardUrlPath(REGION_PATH, parameters);
	}


}
