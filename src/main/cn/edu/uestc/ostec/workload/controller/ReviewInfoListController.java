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
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REVIEWER_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static cn.edu.uestc.ostec.workload.type.UserType.REVIEWER;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Version:v1.0 (description: 审核页面信息展示控制器 )
 */
@RestController
@RequestMapping(REVIEWER_PATH + INFO_PATH)
public class ReviewInfoListController extends ApplicationController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private CategoryConverter categoryConverter;

	/**
	 * 获取不同导入方式下的对应的需要审核的工作量条目信息
	 *
	 * @param importRequired 导入方式
	 * @return RestResponse
	 */
	@RequestMapping(value = "items", method = GET)
	public RestResponse getItems(
			@RequestParam("importRequired")
					Integer importRequired,
			@RequestParam(required = false)
					String option) {

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		int teacherId = user.getUserId();
		Map<String, Object> data = getData();

		//判断导入方式，对应不同的状态值

		//自我申报-未审核状态
		if (APPLY_SELF.equals(importRequired)) {

			List<ItemDto> nonCheckedItems = itemService
					.listResult(getReviewItems(teacherId, importRequired, NON_CHECKED));
			data.put("nonCheckedItem", nonCheckedItems);
			return successResponse(data);

		} else if (IMPORT_EXCEL.equals(importRequired)) {

			//系统导入-未提交状态
			List<ItemDto> unCommittedItem = itemService
					.listResult(getReviewItems(teacherId, importRequired, UNCOMMITTED));
			if ("uncommitted".equals(option)) {
				data.put("unCommittedItem", unCommittedItem);
				return successResponse(data);
			}

			//系统导入-存疑状态-疑问解决状态
			List<ItemDto> doubtedItemList = itemService
					.listResult(getReviewItems(teacherId, importRequired, DOUBTED));
			List<ItemDto> doubtedCheckedList = itemService
					.listResult(getReviewItems(teacherId, importRequired, DOUBTED_CHECKED));

			data.put("doubtedItem", doubtedItemList);
			data.put("doubtedCheckedItem", doubtedCheckedList);

			return successResponse(data);

		} else {

			//参数有误
			return parameterNotSupportResponse("参数有误");
		}

	}

	/**
	 * 根据审核人查询负责的类目信息
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "categories", method = GET)
	public RestResponse getCategory() {

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		List<Category> categoryList = categoryService
				.getCategoriesByReviewer(user.getUserId(), getCurrentSemester());
		if (categoryList.isEmpty()) {
			return invalidOperationResponse();
		}

		List<Category> importCategories = new ArrayList<>();
		List<Category> applyCategories = new ArrayList<>();

		//获取审核人负责的类目的类目名作为下拉选项
		List<CategoryBrief> categoryBriefs = new ArrayList<>();
		for (Category category : categoryList) {
			categoryBriefs.add(new CategoryBrief(category.getCategoryId(), category.getName()));
			if (APPLY_SELF.equals(category.getImportRequired())) {
				applyCategories.add(category);
			} else if (IMPORT_EXCEL.equals(category.getImportRequired())) {
				importCategories.add(category);
			} else {
				continue;
			}
		}

		Map<String, Object> data = getData();
		data.put("categoryList", categoryBriefs);
		data.put("importCategories", categoryConverter.poListToDtoList(importCategories));
		data.put("applyCategories", categoryConverter.poListToDtoList(applyCategories));

		return successResponse(data);
	}

	//	/**
	//	 * 条件查询
	//	 *
	//	 * @param option 条件(category,all,teacher)
	//	 * @param value  对应条件的标识符，categoryName or teacherName
	//	 * @return RestResponse
	//	 */
	//	@RequestMapping(value = "all-items", method = GET)
	//	public RestResponse getAllItems(
	//			@RequestParam("option")
	//					String option,
	//			@RequestParam(required = false)
	//					String value) {
	//
	//		User user = getUser();
	//		if (null == user) {
	//			return invalidOperationResponse("非法请求");
	//		}
	//		int reviewerId = user.getUserId();
	//
	//		List<Item> itemList = new ArrayList<>();
	//		List<Category> categoryList = categoryService.getCategoriesByReviewer(reviewerId);
	//		for (Category category : categoryList) {
	//			itemList.addAll(itemService.findItemByCategory(category.getCategoryId()));
	//		}
	//
	//		List<ItemDto> itemDtoList = itemConverter.poListToDtoList(itemList);
	//		List<ItemDto> itemDtoGroup = new ArrayList<>();
	//		double workload = ZERO_DOUBLE;
	//
	//		Map<String, Object> data = getData();
	//
	//		if ("all".equals(option)) {
	//			data.put("itemList", itemDtoList);
	//		} else if ("teacher".equals(option)) {
	//
	//			for (ItemDto itemDto : itemDtoList) {
	//				if (value.equals(itemDto.getTeacherName())) {
	//					itemDtoGroup.add(itemDto);
	//					data.put("itemList", itemDtoGroup);
	//				}
	//			}
	//
	//		} else if ("category".equals(option)) {
	//
	//			for (ItemDto itemDto : itemDtoList) {
	//				if (value.equals(itemDto.getCategoryName())) {
	//					itemDtoGroup.add(itemDto);
	//					data.put("itemList", itemDtoGroup);
	//				}
	//			}
	//
	//		} else {
	//			return parameterNotSupportResponse();
	//		}
	//
	//		for (ItemDto itemDto : itemDtoGroup) {
	//			Integer status = itemDto.getStatus();
	//			if (CHECKED.equals(status) || DOUBTED_CHECKED.equals(status)) {
	//				workload += itemDto.getWorkload();
	//			}
	//		}
	//		data.put("totalWorkload", workload);
	//
	//		return successResponse(data);
	//	}

	/**
	 * 不使用分页查询进行相关条件查询
	 *
	 * @param categoryId 类目编号
	 * @param isGroup    是否为小组
	 * @param ownerId    所属人编号
	 * @param isExport   是否导出
	 * @return itemDtoList
	 */
	@RequestMapping(value = "items-all", method = GET)
	public RestResponse getAllItems(
			@RequestParam(required = false)
					Integer categoryId,
			@RequestParam(required = false)
					Integer isGroup,
			@RequestParam(required = false)
					Integer ownerId,
			@RequestParam(required = false)
					String isExport) {

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}
		int userId = user.getUserId();

		List<ItemDto> itemDtoList = itemService
				.findAll(null,categoryId, null, ownerId, isGroup, getCurrentSemester());

		List<ItemDto> removeItemDtoList = new ArrayList<>();

		//获取审核人对应的负责的类目下的对应的条目信息
		if (null == categoryId) {
			for (ItemDto itemDto : itemDtoList) {
				//判断条目对应的审核人是否为当前登录的用户
				if (!itemDto.getReviewerId().equals(userId)) {
					removeItemDtoList.add(itemDto);
				}
			}
			itemDtoList.removeAll(removeItemDtoList);
		}

		double workload = ZERO_DOUBLE;
		for (ItemDto itemDto : itemDtoList) {
			Integer status = itemDto.getStatus();
			if (CHECKED.equals(status)) {
				workload += itemDto.getWorkload();
			}
		}

		Map<String, Object> data = getData();
		if (null == isExport) {
			data.put("itemDtoList", itemDtoList);
			data.put("totalWorkload", workload);
			return successResponse(data);
		} else if ("yes".equals(isExport)) {
			return getExportExcel(itemDtoList);
		} else {
			return parameterNotSupportResponse("参数有误");
		}

	}

	/**
	 * 条件查询 & 分页查询
	 *
	 * @param categoryId 类目编号
	 * @param ownerId    教师编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "items-all/paginate", method = GET)
	public RestResponse getAllItems(
			@RequestParam(required = false)
					Integer categoryId,
			@RequestParam(required = false)
					Integer isGroup,
			@RequestParam(required = false)
					Integer ownerId,
			@RequestParam(required = false)
					String isExport,
			@RequestParam(required = false)
					Integer pageNum,
			@RequestParam(required = false)
					Integer pageSize) {

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		Map<String, Object> data = getData();
		pageSize = (null == pageSize ? 1000000 : pageSize);
		pageNum = (null == pageNum ? 1 : pageNum);

		Map<String, Object> info = itemService
				.findAll(categoryId, null, ownerId, isGroup, pageNum, pageSize,getCurrentSemester());
		List<Item> itemList = (List<Item>) info.get("itemList");
		Integer pageCount = (Integer) info.get("pageCount");
		Long totalLines = (Long) info.get("totalLines");

		List<ItemDto> itemDtoList = itemConverter.poListToDtoList(itemList);
		List<ItemDto> newItemDtoList = new ArrayList<>();
		if (null == categoryId) {
			for (ItemDto itemDto : itemDtoList) {
				if (!itemDto.getReviewerId().equals(user.getUserId())) {
					newItemDtoList.add(itemDto);
				}
			}
			itemDtoList.removeAll(newItemDtoList);
		}

		double workload = ZERO_DOUBLE;
		for (ItemDto itemDto : itemDtoList) {
			Integer status = itemDto.getStatus();
			if (CHECKED.equals(status)) {
				workload += itemDto.getWorkload();
			}
		}

		if (null == isExport) {
			data.put("itemDtoList", itemDtoList);
			data.put("pageCount", pageCount);
			data.put("totalLines", totalLines);
			data.put("totalWorkload", workload);
			return successResponse(data);
		} else if ("yes".equals(isExport)) {
			return getExportExcel(itemDtoList);
		} else {
			return parameterNotSupportResponse("参数有误");
		}

	}

	/**
	 * 获取审核人负责的类目下的对应导入方式对应状态的工作量类目信息
	 *
	 * @param reviewerId     审核人编号
	 * @param importRequired 导入方式 Apply-self,Import-excel
	 * @param status         指定状态
	 * @return List<ItemDto>
	 */
	public List<ItemDto> getReviewItems(Integer reviewerId, Integer importRequired,
			Integer status) {

		//获取审核人负责的Category类目信息
		List<Category> categoryList = categoryService
				.getCategoriesByReviewer(reviewerId, getCurrentSemester());
		if (categoryList.isEmpty()) {
			return null;
		}

		List<Item> items;
		List<Item> itemList = new ArrayList<>();

		//查找对应的导入方式下的为指定状态的Item条目信息
		for (Category category : categoryList) {
			if (importRequired.equals(category.getImportRequired())) {
				items = itemService.findItemsByCategory(category.getCategoryId(), status,getCurrentSemester());
				itemList.addAll(items);
			}
		}

		return itemConverter.poListToDtoList(itemList);
	}

	class CategoryBrief {

		private Integer categoryId;

		private String categoryName;

		public Integer getCategoryId() {
			return categoryId;
		}

		public void setCategoryId(Integer categoryId) {
			this.categoryId = categoryId;
		}

		public String getCategoryName() {
			return categoryName;
		}

		public void setCategoryName(String categoryName) {
			this.categoryName = categoryName;
		}

		public CategoryBrief(Integer categoryId, String categoryName) {
			this.categoryId = categoryId;
			this.categoryName = categoryName;
		}
	}
}
