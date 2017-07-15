package cn.edu.uestc.ostec.workload.controller.common.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.service.TeacherService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.COMMON_INFO_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

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

}
