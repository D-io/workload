/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
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
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.SubjectDto;
import cn.edu.uestc.ostec.workload.dto.TeacherWorkloadAnalyze;
import cn.edu.uestc.ostec.workload.dto.Workload;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.dto.TotalWorkloadAndCount;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.pojo.Teacher;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.service.TeacherService;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;
import cn.edu.uestc.ostec.workload.support.utils.PageHelper;
import cn.edu.uestc.ostec.workload.support.utils.TreeGenerateHelper;
import cn.edu.uestc.ostec.workload.type.OperatingStatusType;
import javafx.scene.Parent;
import jdk.net.SocketFlow;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;

import static cn.edu.uestc.ostec.workload.service.ItemService.EMPTY_WORKLOAD;
import static cn.edu.uestc.ostec.workload.type.UserType.ADMINISTRATOR;
import static cn.edu.uestc.ostec.workload.type.UserType.LEADER;
import static cn.edu.uestc.ostec.workload.type.UserType.REVIEWER;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	@Autowired
	private TeacherService teacherService;

	@Autowired
	private TeacherWorkloadService teacherWorkloadService;

	//	@RequestMapping(value = "items/group", method = GET)
	//	public RestResponse getOwnItemsGroup(
	//			@RequestParam("categoryId")
	//					Integer categoryId) {
	//		User user = getUser();
	//		if (null == user) {
	//			return invalidOperationResponse("非法请求");
	//		}
	//
	//		int teacherId = user.getUserId();
	//
	//		List<ItemDto> itemDtoList = itemService
	//				.findAll(null, categoryId, null, null, GROUP, getCurrentSemester(), APPLY_SELF,
	//						teacherId);
	//
	//		Map<String, Object> data = getData();
	//		data.put("itemDtoList", itemDtoList);
	//		return successResponse(data);
	//	}

	@RequestMapping(value = "teacher-analyze", method = GET)
	public RestResponse analyzeWorkload(
			@RequestParam("teacherId")
					Integer teacherId, String option, String categoryCode) {

		Workload workloadTypeOne = itemService
				.workloadAnalyze(teacherId, TYPE_ONE_PREFIX, getCurrentSemester());
		Workload workloadTypeTwo = itemService
				.workloadAnalyze(teacherId, TYPE_TWO_PREFIX, getCurrentSemester());
		Workload workloadTypeThree = itemService
				.workloadAnalyze(teacherId, TYPE_THREE_PREFIX, getCurrentSemester());
		Workload workloadTypeFour = itemService
				.workloadAnalyze(teacherId, TYPE_FOUR_PREFIX, getCurrentSemester());
		Workload workloadTypeFive = itemService
				.workloadAnalyze(teacherId, TYPE_FIVE_PREFIX, getCurrentSemester());
		Workload workloadTypeSix = itemService
				.workloadAnalyze(teacherId, TYPE_SIX_PREFIX, getCurrentSemester());
		Workload workloadTypeSeven = itemService
				.workloadAnalyze(teacherId, TYPE_SEVEN_PREFIX, getCurrentSemester());
		TeacherWorkloadAnalyze teacherWorkloadAnalyze = new TeacherWorkloadAnalyze();
		teacherWorkloadAnalyze.setTeacherId(teacherId);
		teacherWorkloadAnalyze.setTypeFive(workloadTypeFive);
		teacherWorkloadAnalyze.setTypeFour(workloadTypeFour);
		teacherWorkloadAnalyze.setTypeThree(workloadTypeThree);
		teacherWorkloadAnalyze.setTypeTwo(workloadTypeTwo);
		teacherWorkloadAnalyze.setTypeOne(workloadTypeOne);
		teacherWorkloadAnalyze.setTypeSix(workloadTypeSix);
		teacherWorkloadAnalyze.setTypeSeven(workloadTypeSeven);
		teacherWorkloadAnalyze.setTeacherName(teacherService.findTeacherNameById(teacherId));
		teacherWorkloadAnalyze.setTotalWorkload(
				teacherWorkloadService.getTeacherWorkload(teacherId, getCurrentSemester())
						.getTotalWorkload());

		Map<String, Object> data = getData();
		if ("details".equals(option)) {
			data.put("checkedItemList", itemConverter.poListToDtoList(itemService
					.findAnalyzeItems(teacherId, CHECKED, getCurrentSemester(), categoryCode)));
			data.put("uncheckedItemList", itemConverter.poListToDtoList(itemService
					.findAnalyzeItems(teacherId, null, getCurrentSemester(), categoryCode)));
			return successResponse(data);
		}

		data.put("workload", teacherWorkloadAnalyze);
		return successResponse(data);
	}

	@RequestMapping(value = "refresh", method = POST)
	public RestResponse refreshTeacherWorkload(
			@RequestParam("teacherId")
					Integer... teacherIdList) {

		List<TeacherWorkload> teacherWorkloadList = new ArrayList<>();
		Map<String, Object> data = getData();
		Map<String, Object> errorData = getData();
		for (Integer teacherId : teacherIdList) {

			TeacherWorkload teacherWorkload = teacherWorkloadService
					.getTeacherWorkload(teacherId, getCurrentSemester());

			TotalWorkloadAndCount checkedWorkload = itemService
					.selectTotalWorkload(teacherId, CHECKED, getCurrentSemester());
			TotalWorkloadAndCount nonCheckedWorkload = itemService
					.selectTotalWorkload(teacherId, null, getCurrentSemester());

			checkedWorkload = (null == checkedWorkload ? EMPTY_WORKLOAD : checkedWorkload);
			nonCheckedWorkload = (null == nonCheckedWorkload ? EMPTY_WORKLOAD : nonCheckedWorkload);

			teacherWorkload.setCheckedWorkload(checkedWorkload.getWorkload());
			teacherWorkload.setCheckedItems(checkedWorkload.getCount());

			teacherWorkload.setUncheckedItems(nonCheckedWorkload.getCount());
			teacherWorkload.setUncheckedWorkload(nonCheckedWorkload.getWorkload());
			teacherWorkload.setTotalWorkload(
					teacherWorkload.getCheckedWorkload() + teacherWorkload.getUncheckedWorkload());
			boolean saveSuccess = teacherWorkloadService.saveTeacherWorkload(teacherWorkload);
			if (!saveSuccess) {
				errorData.put(teacherWorkload.getTeacherName(), "更新失败");
			} else {
				teacherWorkloadList.add(teacherWorkload);
			}
		}
		data.put("teacherWorkloadList", teacherWorkloadList);
		return successResponse(data);
	}

	/**
	 * 统计所有教师的工作量情况
	 *
	 * @param teacherId 教师编号
	 * @return workloadList
	 */
	@RequestMapping(value = "total-workload", method = GET)
	public RestResponse getAllTeachersWorkload(
			@RequestParam(required = false)
					Integer teacherId,
			@RequestParam(required = false)
					String ifExport) {

		User user = getUser();
		List<String> roleCodeList = getUserRoleCodeList();
		if (null == user || (!roleCodeList.contains(ADMINISTRATOR.getCode()) && !roleCodeList
				.contains(LEADER.getCode()))) {
			return invalidOperationResponse("非法请求");
		}

		List<Teacher> teacherList = teacherService.findAll();
		if (isEmptyList(teacherList)) {
			return successResponse();
		}

		List<TeacherWorkload> teacherWorkloadList = new ArrayList<>();
		if (isEmptyNumber(teacherId)) {
			teacherWorkloadList = teacherWorkloadService.getAllWorkload(getCurrentSemester());
		} else {
			teacherWorkloadList.add(teacherWorkloadService
					.getTeacherWorkload(teacherId, getCurrentSemester()));
		}

		if (("yes".equals(ifExport))) {
			return getExportWorkloadExcel(teacherWorkloadList);
		} else {
			return successResponse(teacherWorkloadList);
		}

	}

	/**
	 * 不采用分页查询的方式进行条件查询条目信息
	 *
	 * @param categoryId 类目编号
	 * @param status     状态值
	 * @param ownerId    条目归属人编号
	 * @param ifExport   是否导出
	 * @return itemDtoList
	 */
	@RequestMapping(value = "item-all", method = GET)
	public RestResponse getAllItems(
			@RequestParam(required = false)
					Integer categoryId,
			@RequestParam(required = false)
					Integer status,
			@RequestParam(required = false)
					Integer ownerId,
			@RequestParam(required = false)
					String ifExport) {

		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		List<ItemDto> itemDtoList = itemService
				.findAll(null, categoryId, status, ownerId, null, getCurrentSemester(), null, null);
		if (isEmptyList(itemDtoList)) {
			return successResponse();
		}

		Map<String, Object> data = getData();
		if (null == ifExport) {
			data.put("itemDtoList", itemDtoList);
			return successResponse(data);
		} else if ("yes".equals(ifExport)) {
			return getExportExcel(itemDtoList);
		} else {
			return parameterNotSupportResponse();
		}

	}

	/**
	 * 管理员分页查询所有的条目信息
	 *
	 * @param pageNum  页号
	 * @param pageSize 页的大小
	 * @return RestResponse
	 */
	@RequestMapping(value = "item-all/paginate", method = GET)
	public RestResponse getAllItems(
			@RequestParam(required = false)
					Integer categoryId,
			@RequestParam(required = false)
					Integer status,
			@RequestParam(required = false)
					Integer ownerId,
			@RequestParam(required = false)
					Integer importedRequired,
			@RequestParam(required = false)
					String ifExport,
			@RequestParam(required = false)
					Integer pageNum,
			@RequestParam(required = false)
					Integer pageSize) {

		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		pageNum = (null == pageNum || pageNum.equals(ZERO_INT) ? 1 : pageNum);
		pageSize = ("yes".equals(ifExport) ? 10000 : pageSize);

		Map<String, Object> selectData = itemService
				.findAll(categoryId, status, ownerId, ZERO_INT, pageNum, pageSize,
						getCurrentSemester(), importedRequired);

		List<ItemDto> itemDtoList = (List<ItemDto>) selectData.get("itemList");

		if (null == ifExport) {
			return successResponse(selectData);
		} else if ("yes".equals(ifExport)) {
			return getExportExcel(itemDtoList);
		} else {
			return parameterNotSupportResponse();
		}

	}

	/**
	 * 审核人获取导入类对应条目信息
	 * @param categoryId 类目编号
	 * @return
	 */
	@RequestMapping(value = "item-group/import",method = GET)
	public RestResponse getImportItemsByCategory(
			@RequestParam("categoryId")
					Integer categoryId) {

		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		Category category = categoryService.getCategory(categoryId,getCurrentSemester());
		if(!user.getUserId().equals(category.getReviewerId())) {
			return invalidOperationResponse("非法请求");
		}

		List<Item> itemList = itemService
				.findItemByCategory(getCurrentSemester(), categoryId, ZERO_INT);

		Map<String, Object> data = getData();
		data.put("itemList", itemConverter.poListToDtoList(itemList));
		data.put("recordNumbers", itemList.size());

		return successResponse(data);
	}

	/**
	 * 获取老师对应该类目下的条目信息
	 *
	 * @param categoryId 类目编号
	 * @return itemList, recordNumbers
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

		List<Item> itemList = itemService
				.findItemByCategory(getCurrentSemester(), categoryId, ZERO_INT);

		List<Item> teacherItems = new ArrayList<>();
		for (Item item : itemList) {
			if (item.getOwnerId().equals(teacherId)) {
				//遍历该类下所有的条目，若和当前老师相对应，筛选
				if (SINGLE.equals(item.getIsGroup())) {
					teacherItems.add(item);
				}

				if (GROUP.equals(item.getIsGroup()) && item.getOwnerId()
						.equals(item.getGroupManagerId())) {
					if (UNCOMMITTED.equals(item.getStatus())) {
						teacherItems.add(item);
					} else {
						Integer parentId = item.getItemId();
						teacherItems.add(itemConverter
								.generateGroupItem(parentId, getCurrentSemester()));
					}

				} else {
					continue;
				}
			}
		}

		Map<String, Object> data = getData();
		data.put("itemList", itemConverter.poListToDtoList(teacherItems));
		data.put("recordNumbers", teacherItems.size());

		return successResponse(data);
	}

	/**
	 * 获取导入类的类目信息列表
	 */
	@RequestMapping(value = "import-categories", method = GET)
	public RestResponse getTeacherImportCategories() {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}
		int teacherId = user.getUserId();

		//获取当前教师对应的导入类的条目
		List<ItemDto> itemDtoList = findItems(IMPORT_EXCEL, getImportStatus(), teacherId,
				getCurrentSemester());

		//获取当前教师对应的导入类的条目对应的规则列表
		List<Category> categoryList = new ArrayList<>();
		for (ItemDto itemDto : itemDtoList) {
			Category category = categoryService
					.getCategory(itemDto.getCategoryId(), getCurrentSemester());
			if (!categoryList.contains(category) && SUBMITTED.equals(category.getStatus())) {
				categoryList.add(category);
			}
		}

		Map<String, Object> data = getData();
		if (isEmptyList(categoryList)) {
			data.put("categoryTree", null);
		} else {
			data.put("categoryTree", buildTree(categoryList));
		}

		//data.put("categoryList",treeGenerateHelper.generateTree(ROOT));
		return successResponse(data);

	}

	/**
	 * 获取单个条目信息的接口
	 *
	 * @param itemId 条目编号
	 * @return itemDto
	 */
	@RequestMapping(value = "single", method = GET)
	public RestResponse getSingleItem(
			@RequestParam("itemId")
					Integer itemId) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		Item item = itemService.findItem(itemId, getCurrentSemester());
		if (null == item) {
			return parameterNotSupportResponse("无效参数");
		}

		ItemDto itemDto = itemConverter.poToDto(item);
		Map<String, Object> data = getData();
		data.put("item", itemDto);

		return successResponse(data);

	}

	/**
	 * 获取对应导入方式对应状态下的条目信息
	 *
	 * @param importedRequired 导入方式
	 * @param status           状态
	 * @return itemList
	 */
	@RequestMapping(value = "teacher-items", method = GET)
	public RestResponse getTeacherItems(
			@RequestParam("importedRequired")
					Integer importedRequired,
			@RequestParam("status")
					Integer status) {

		User user = getUser();
		if (null == user || !isValidImportedRequired(importedRequired)) {
			return invalidOperationResponse("非法请求");
		}

		//获取教师ID对应的两类状态的工作量对象（申报类）
		int teacherId = user.getUserId();
		List<ItemDto> itemList = findItemsByStatus(importedRequired, status, teacherId,
				getCurrentSemester());

		if (isEmptyList(itemList)) {
			return successResponse();
		}

		Map<String, Object> data = getData();
		data.put("itemList", itemList);

		// 如果存疑或者被拒绝，查询相应的交互信息列表
		if (DOUBTED.equals(status) || DENIED.equals(status)) {
			for (ItemDto itemDto : itemList) {
				int itemId = itemDto.getItemId();
				Map<Integer, Object> subjectMap = new HashMap<>();
				List<SubjectDto> subjectDtoList = subjectConverter.poListToDtoList(
						subjectService.getSubjectsByItem(itemId, getCurrentSemester()));
				subjectMap.put(itemDto.getItemId(), subjectDtoList);
				data.put("subjectMap", subjectMap);
			}
		}

		return successResponse(data);

	}

	/**
	 * 个人工作量汇总统计
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "collection", method = GET)
	public RestResponse getAllItemDtoList(
			@RequestParam(required = false)
					Integer teacherId,
			@RequestParam(required = false)
					String option,
			@RequestParam(required = false)
					String ifExport) {

		User user = getUser();
		Map<String, Object> data = getData();

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		List<Integer> statusList = new ArrayList<>();
		if (isEmptyNumber(teacherId)) {
			teacherId = user.getUserId();
		} else {
			if (!getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
				return invalidOperationResponse("非法访问");
			}
		}

		if ("checked".equals(option)) {
			statusList.add(CHECKED);
		} else if ("unchecked".equals(option)) {
			statusList.addAll(getUncheckedStatus());
		} else if (isEmptyString(option)) {
			statusList.add(CHECKED);
			statusList.addAll(getUncheckedStatus());
		} else {
			return parameterNotSupportResponse("参数有误");
		}

		List<ItemDto> itemList = findItems(null, statusList, teacherId, getCurrentSemester());
		List<ItemDto> applyItemList = new ArrayList<>();
		List<ItemDto> importItemList = new ArrayList<>();

		for (ItemDto itemDto : itemList) {
			if (APPLY_SELF.equals(itemDto.getImportRequired())) {
				applyItemList.add(itemDto);
			} else {
				importItemList.add(itemDto);
			}
		}

		//		TotalWorkloadAndCount checkedWorkload = itemService
		//				.selectTotalWorkload(teacherId, CHECKED, getCurrentSemester());
		//		TotalWorkloadAndCount nonCheckedWorkload = itemService
		//				.selectTotalWorkload(teacherId, null, getCurrentSemester());
		//
		//		checkedWorkload = (null == checkedWorkload ? EMPTY_WORKLOAD : checkedWorkload);
		//		nonCheckedWorkload = (null == nonCheckedWorkload ? EMPTY_WORKLOAD : nonCheckedWorkload);
		//		TeacherWorkload teacherWorkload = new TeacherWorkload();
		//		teacherWorkload.setCheckedWorkload(checkedWorkload.getWorkload());
		//		teacherWorkload.setCheckedItems(checkedWorkload.getCount());
		//
		//		teacherWorkload.setUncheckedItems(nonCheckedWorkload.getCount());
		//		teacherWorkload.setUncheckedWorkload(nonCheckedWorkload.getWorkload());
		//		teacherWorkload.setTotalWorkload(
		//				teacherWorkload.getCheckedWorkload() + teacherWorkload.getUncheckedWorkload());

		TeacherWorkload teacherWorkload = teacherWorkloadService
				.getTeacherWorkload(teacherId, getCurrentSemester());

		if (isEmptyList(itemList)) {
			return successResponse();
		}

		data.put("importItemList", importItemList);
		data.put("applyItemList", applyItemList);
		data.put("importCount", importItemList.size());
		data.put("applyCount", applyItemList.size());
		data.put("recordCount", itemList.size());
		data.put("teacherWorkload", teacherWorkload);

		data.put("itemDtoList", itemList);

		return successResponse(data);
	}

	/**
	 * 根据条目编号获取相应的消息列表
	 *
	 * @param itemId 条目编号
	 * @return 消息列表
	 */
	@RequestMapping(value = "subjectList", method = GET)
	public RestResponse getSubjectList(
			@RequestParam("itemId")
					Integer itemId) {

		List<Subject> subjectList = subjectService.getSubjectsByItem(itemId, getCurrentSemester());

		if (null == subjectList) {
			return parameterNotSupportResponse("参数有误");
		}

		List<SubjectDto> subjectDtos = subjectConverter.poListToDtoList(subjectList);
		Map<String, Object> data = getData();
		data.put("subjectList", subjectDtos);

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
	private List<ItemDto> findItemsByStatus(Integer importRequired, Integer status,
			Integer teacherId, String version) {

		List<ItemDto> itemDtoList = itemConverter.poListToDtoList(
				itemService.findItemsByStatus(status, teacherId, getCurrentSemester()));
		List<ItemDto> itemDtoGroup = new ArrayList<>();

		for (ItemDto itemDto : itemDtoList) {
			if (null != importRequired && importRequired.equals(itemDto.getImportRequired())
					&& version.equals(itemDto.getVersion())) {

				if (GROUP.equals(itemDto.getIsGroup()) && itemDto.getOwnerId()
						.equals(itemDto.getGroupManagerId())) {
					Item item = itemConverter
							.generateGroupItem(itemDto.getItemId(), getCurrentSemester());
					itemDto = itemConverter.poToDto(item);
				}

				itemDtoGroup.add(itemDto);
			} else if (null == importRequired && version.equals(itemDto.getVersion())) {
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
	private List<ItemDto> findItems(Integer importRequired, List<Integer> statusList,
			Integer teacherId, String version) {

		List<ItemDto> itemDtoList = new ArrayList<>();
		for (Integer status : statusList) {
			itemDtoList.addAll(findItemsByStatus(importRequired, status, teacherId, version));
		}

		return itemDtoList;
	}

	private List<CategoryDto> buildTree(List<Category> categoryList) {
		//获取所有的根节点规则
		List<Category> categories = categoryService.getRootCategories(getCurrentSemester());
		//根节点规则和教师对应有条目的规则构成需要生成树的规则列表
		categoryList.addAll(categories);

		List<CategoryDto> categoryDtoList = categoryConverter.poListToDtoList(categoryList);

		//初始化树的构造器
		TreeGenerateHelper treeGenerateHelper = new TreeGenerateHelper(categoryDtoList);

		List<CategoryDto> parentList = categoryConverter.poListToDtoList(
				categoryService.getCategoryChildren(SUBMITTED, ZERO_INT, getCurrentSemester()));
		List<CategoryDto> tree = new ArrayList<>();
		for (CategoryDto categoryDto : parentList) {
			tree.add(treeGenerateHelper.generateTree(categoryDto.getCategoryId()));
		}
		return tree;
	}

}
