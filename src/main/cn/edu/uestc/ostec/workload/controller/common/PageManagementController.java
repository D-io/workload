package cn.edu.uestc.ostec.workload.controller.common;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.type.UserType;

import static cn.edu.uestc.ostec.workload.WebParametersConstants.PAGE_MANAGER_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Description:
 * Version:v1.0 (author:刘文哲 update:  )
 */
@RestController
@SuppressWarnings("unchecked")
@RequestMapping(PAGE_MANAGER_PATH)
public class PageManagementController extends ApplicationController {

	/**
	 * 获取单个的角色信息
	 *
	 * @param role 角色编码
	 * @return RestResponse
	 */
	@RequestMapping(method = GET, value = "sidebar")
	public RestResponse buildPageSideBar(
			@RequestParam
					String role) {
		if (UserType.getUserType(role) == null) {
			return invalidOperationResponse("非法角色");
		}
		Map<String, Object> data = getData();
		UserType userType = UserType.getUserType(role);
		data.put("sidebarInfo",
				appendSideBarItem(new RoleInfo(userType.getCode(), userType.getDesc())));

		return successResponse(data);
	}

	/**
	 * 获取角色信息列表
	 *
	 * @return RestResponse
	 */
	@RequestMapping(method = GET, value = "sidebar/list")
	public RestResponse buildPageSideBar() {
		List<RoleInfo> roleInfoList = getUserRoles();

		List<Map<String, Object>> sideBarItemList = listInstance();

		for (RoleInfo roleInfo : roleInfoList) {
			sideBarItemList.add(appendSideBarItem(roleInfo));
		}

		Map<String, Object> data = getData();
		data.put("sidebarInfo", sideBarItemList);

		return successResponse(data);
	}

	private Map<String, Object> appendSideBarItem(RoleInfo roleInfo) {
		Map<String, Object> sideBarItem = mapInstance();
		UserType userType = UserType.getUserType(roleInfo.getRole());
		sideBarItem.put("role", userType.getDesc());
		sideBarItem.put("roleId", userType.getCode());

		return sideBarItem;
	}

}
