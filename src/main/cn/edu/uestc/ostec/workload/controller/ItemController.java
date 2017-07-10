package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.TeacherService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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

	@Autowired
	private ItemConverter itemConverter;

	/**
	 * 添加Item信息
	 *
	 * @param itemDto 工作量信息
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse addItem(ItemDto itemDto) throws ParseException {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		if (null == itemDto) {
			return invalidOperationResponse("非法操作");
		}

		int teacherId = user.getUserId();
		itemDto.setOwnerId(teacherId);

		//设置对应的proof属性
		int importRequired = categoryService.getCategory(itemDto.getCategoryId())
				.getImportRequired();

		if (APPLY_SELF == importRequired) {
			itemDto.setProof(null);
		} else if (IMPORT_EXCEL == importRequired) {

			//TODO 如果该类目为导入类型时，对于proof字段应该存取文件路径？？
			itemDto.setProof("file-path???");
		}

		Item item = itemConverter.dtoToPo(itemDto);
		item.setStatus(UNCOMMITTED);

		boolean saveSuccess = itemService.saveItem(item);
		if (!saveSuccess) {
			return systemErrResponse("保存失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);
	}

	/**
	 * 提交对应的工作量（状态为未提交的工作量）
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "public", method = PUT)
	public RestResponse submitItem() {

		//TODO 截止时间的限制
		//TODO 未获取到用户的信息

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}
		int teacherId = user.getUserId();

		//根据教师编号查询对应的未提交状态的工作量
		List<Item> itemList = itemService.findItemsByStatus(UNCOMMITTED, teacherId);
		if (null == itemList) {
			return invalidOperationResponse("无可提交的项目");
		}

		//修改Item状态为未审核态（提交态）
		for (Item item : itemList) {
			item.setStatus(NON_CHECKED);
			if (!itemService.saveItem(item)) {
				return systemErrResponse("提交失败");
			}
		}

		Map<String, Object> data = getData();
		data.put("submittedItemList", itemConverter.poListToDtoList(itemList));

		return successResponse(data);
	}

	/**
	 * 删除Item信息(置为Disable状态)
	 * 只能删除未提交的工作量信息
	 *
	 * @param itemId 工作过量Id
	 * @return RestResponse
	 */
	@RequestMapping(method = DELETE)
	public RestResponse removeItem(
			@RequestParam(value = "itemId")
					Integer itemId) {

		Item item = itemService.findItem(itemId);
		if(null == item){
			return parameterNotSupportResponse("参数有误");
		}

		boolean removeSuccess = false;
		if(UNCOMMITTED == item.getStatus()) {
			removeSuccess = itemService.removeItem(itemId);
		}else{
			return invalidOperationResponse("无法删除");
		}
		if (!removeSuccess) {
			return systemErrResponse("删除失败");
		}

		Map<String, Object> data = getData();

		if (null != item) {
			data.put("item", itemConverter.poToDto(item));
		}

		return successResponse(data);
	}

	/**
	 * 获取教师各自申报的工作量信息
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "apply-list", method = GET)
	public RestResponse getTeacherApplyItems() {

		User user = getUser();
		System.out.println(user);

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//获取教师ID对应的两类状态的工作量对象
		int teacherId = user.getUserId();
		List<Item> abnormalItemList = itemService.findItemsByStatus(DENIED, teacherId);
		List<Item> normalItemList = itemService.findNormalApplyItems(teacherId);

		Map<String, Object> data = getData();
		data.put("abnormalItemList", itemConverter.poListToDtoList(abnormalItemList));
		data.put("normalItemList", itemConverter.poListToDtoList(normalItemList));

		return successResponse(data);
	}

	/**
	 * 获取教师导入的工作量信息
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "import-list", method = GET)
	public RestResponse getTeacherImportItems() {

		User user = getUser();
		System.out.println(user);

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//获取教师ID对应的两类状态的工作量对象
		int teacherId = user.getUserId();
		List<Item> abnormalItemList = itemService.findItemsByStatus(DOUBTED, teacherId);
		List<Item> normalItemList = itemService.findNormalImportItems(teacherId);

		Map<String, Object> data = getData();
		data.put("abnormalItemList", abnormalItemList);
		data.put("normalItemList", normalItemList);

		return successResponse(data);
	}

}
