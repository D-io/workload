package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.TeacherService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
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
	private ItemService itemService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private TeacherService teacherService;

	/**
	 * 添加Item信息
	 * @param item 工作量信息
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse saveItem(Item item){

		boolean saveSuccess = itemService.saveItem(item);
		if(!saveSuccess){
			return systemErrResponse("保存失败");
		}

		Map<String,Object> data = getData();
		data.put("item",item);

		return successResponse(data);
	}

	/**
	 * 删除Item信息(置为Disable状态)
	 * @param itemId 工作过量Id
	 * @return RestResponse
	 */
	@RequestMapping(method = DELETE)
	public RestResponse removeItem(@RequestParam(value = "itemId") Integer itemId){

		boolean removeSuccess = itemService.removeItem(itemId);
		if(!removeSuccess){
			return systemErrResponse("删除失败");
		}

		Map<String,Object> data = getData();
		Item item = itemService.findItem(itemId);

		if(null != item) {
			data.put("item", item);
		}

		return successResponse(data);
	}

	/**
	 * 获取教师各自的工作量信息
	 * @return RestResponse
	 */
	@RequestMapping(method = GET)
	public RestResponse getTeacherItems(){

		User user = getUser();
		if(null == user) {
			return invalidOperationResponse("非法请求");
		}

		int teacherId = user.getUserId();
		List<Item> abnormalItemList = itemService.findItemsByStatus(DENIED,teacherId);
		List<Item> normalItemList = itemService.findNormalItems(teacherId);

		Map<String,Object> data = getData();
		data.put("abnormalItemList",abnormalItemList);
		data.put("normalItemList",normalItemList);

		return successResponse(data);
	}

}
