package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 工作量信息配置控制器 )
 */
@RestController
@RequestMapping(ITEM_PATH)
public class ItemController extends ApplicationController {

	//TODO 重置工作量审核状态以及申请状态

	@Autowired
	public ItemService itemService;

	@RequestMapping(method = POST)
	public RestResponse saveItem(){

		return successResponse();
	}


	@RequestMapping(method = DELETE)
	public RestResponse removeItem(){

		return successResponse();
	}

	@RequestMapping(method = GET)
	public RestResponse getItems(){

		return successResponse();
	}

}
