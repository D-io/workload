package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.pojo.UserRole;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.type.OperatingStatusType;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;

import static cn.edu.uestc.ostec.workload.type.UserType.ADMINISTRATOR;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Version:v1.0 (description: 工作量信息展示控制器 )
 */
@RestController
@RequestMapping(ITEM_PATH + INFO_PATH)
public class ItemInfoListController extends ApplicationController implements OperatingStatusType {

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private SubjectConverter subjectConverter;

	//TODO 条件查询，设置参数，动态Sql语句拼接

	/**
	 * 管理员分页查询所有的条目信息
	 *
	 * @param pageNum  页号
	 * @param pageSize 页的大小
	 * @return RestResponse
	 */
	@RequestMapping(value = "item-all", method = GET)
	public RestResponse getAllItems(
			@RequestParam(required = false)
					Integer categoryId,
			@RequestParam(required = false)
					Integer status,
			@RequestParam(required = false)
					Integer ownerId,
			@RequestParam("pageNum")
					int pageNum,
			@RequestParam("pageSize")
					int pageSize) {

		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		List<Item> itemList = itemService
				.findAll(categoryId, status, ownerId, null, pageNum, pageSize);
		Map<String, Object> data = getData();
		data.put("itemList", itemConverter.poListToDtoList(itemList));

		return successResponse(data);
	}

	/**
	 * 获取老师对应该类目下的条目信息
	 *
	 * @param categoryId 类目编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "item-group", method = GET)
	public RestResponse getItemsByCategory(
			@RequestParam("categoryId")
					Integer categoryId) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}
		int teacherId = user.getUserId();

		List<Item> itemList = itemService.findItemByCategory(categoryId);

		if (null == itemList || itemList.isEmpty()) {
			return parameterNotSupportResponse("参数有误");
		}

		List<Item> teacherItems = new ArrayList<>();
		for (Item item : itemList) {
			if (item.getOwnerId().equals(teacherId)) {
				teacherItems.add(item);
			}
		}

		Map<String, Object> data = getData();
		data.put("itemList", itemConverter.poListToDtoList(teacherItems));

		return successResponse(data);
	}

	/**
	 * 获取教师各自申报的工作量信息(Apply_Self) abnormalItemList：审核未通过的工作量条目（DENIED）
	 * normalItemList：审核通过和待审核的工作量条目（CHECKED,NON_CHECKED）
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

		//获取教师ID对应的两类状态的工作量对象（申报类）
		int teacherId = user.getUserId();
		List<ItemDto> abnormalItemList = findItemsByStatus(APPLY_SELF, DENIED, teacherId);
		List<ItemDto> normalItemList = findItems(APPLY_SELF, getNormalStatusList(), teacherId);

		//获取否定理由信息
		Map<String, Object> subjectMap = new HashMap<>();
		for (ItemDto item : abnormalItemList) {
			subjectMap.put(item.getItemName(), subjectConverter
					.poListToDtoList(subjectService.getSubjectsByItem(item.getItemId())));
		}

		Map<String, Object> data = getData();
		data.put("abnormalItemList", abnormalItemList);
		data.put("normalItemList", normalItemList);
		data.put("subjectList", subjectMap);

		return successResponse(data);
	}

	/**
	 * 获取审核人导入的工作量信息(Excel_Import) abnormalItemList：存疑的工作量条目（存疑未解决，存疑已解决）DOUBTED,DOUBTED_CHECKED
	 * normalItemList：正常的工作量条目（尚未复核，未审核）
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

		//获取教师ID对应的两类状态的工作量对象（导入类）
		int teacherId = user.getUserId();
		List<ItemDto> abnormalItemList = findItems(IMPORT_EXCEL, getAbnormalStatusList(),
				teacherId);
		List<ItemDto> normalItemList = findItems(IMPORT_EXCEL, getNormalStatusList(), teacherId);

		Map<String, Object> subjectMap = new HashMap<>();

		for (ItemDto itemDto : abnormalItemList) {
			if (DOUBTED.equals(itemDto.getStatus())) {
				subjectMap.put(itemDto.getItemName(), subjectConverter
						.poListToDtoList(subjectService.getSubjectsByItem(itemDto.getItemId())));
			}
		}

		Map<String, Object> data = getData();
		data.put("abnormalItemList", abnormalItemList);
		data.put("normalItemList", normalItemList);
		data.put("subjectList", subjectMap);

		return successResponse(data);
	}

	/**
	 * 个人工作量汇总统计
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "collection", method = GET)
	public RestResponse getAllItemDtoList() {

		User user = getUser();

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int teacherId = user.getUserId();
		int workload = 0;

		List<Item> itemList = itemService.findItemsByStatus(CHECKED, teacherId);
		itemList.addAll(itemService.findItemsByCategory(DOUBTED_CHECKED, teacherId));
		for (Item item : itemList) {
			workload += item.getWorkload();
		}

		Map<String, Object> data = getData();
		data.put("itemDtoList", itemConverter.poListToDtoList(itemList));
		data.put("totalWorkload", workload);

		return successResponse(data);
	}

	/**
	 * 查找对应的老师的对应状态的对应导入方式的工作量条目信息
	 *
	 * @param importRequired 导入方式、申报方式
	 * @param status         状态
	 * @param teacherId      教师编号
	 * @return List<Item>
	 */
	public List<ItemDto> findItemsByStatus(Integer importRequired, Integer status,
			Integer teacherId) {

		List<ItemDto> itemDtoList = itemConverter
				.poListToDtoList(itemService.findItemsByStatus(status, teacherId));
		List<ItemDto> itemDtoGroup = new ArrayList<>();

		for (ItemDto itemDto : itemDtoList) {
			if (importRequired.equals(itemDto.getImportRequired())) {
				itemDtoGroup.add(itemDto);
			}
		}
		return itemDtoGroup;
	}

	/**
	 * 查找对应的老师的对应状态列表的对应导入方式的工作量条目信息
	 *
	 * @param importRequired 导入方式
	 * @param statusList     状态表
	 * @param teacherId      教师编号
	 * @return List<ItemDto>
	 */
	public List<ItemDto> findItems(Integer importRequired, List<Integer> statusList,
			Integer teacherId) {

		List<ItemDto> itemDtoList = new ArrayList<>();
		for (Integer status : statusList) {
			itemDtoList.addAll(findItemsByStatus(importRequired, status, teacherId));
		}

		return itemDtoList;
	}

}
