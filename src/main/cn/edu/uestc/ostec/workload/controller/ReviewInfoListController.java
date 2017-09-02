/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload.controller;

import com.sun.xml.internal.bind.v2.TODO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.TreeGenerateHelper;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REVIEWER_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
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
				.getCategoriesByReviewer(user.getUserId(), getCurrentSemester(), null);
		if (categoryList.isEmpty()) {
			return invalidOperationResponse();
		}

		List<Category> importCategories = new ArrayList<>();
		List<Category> applyCategories = new ArrayList<>();

		//获取审核人负责的类目的类目名作为下拉选项
		List<CategoryBrief> categoryBriefs = new ArrayList<>();
		for (Category category : categoryList) {
			Integer todoCount = ZERO_INT;
			List<Item> itemList = itemService
					.findItemByCategory(getCurrentSemester(), category.getCategoryId());
			for (Item item : itemList) {
				if (NON_CHECKED.equals(item.getStatus())) {
					todoCount++;
				} else {
					continue;
				}
			}
			categoryBriefs.add(new CategoryBrief(category.getCategoryId(), category.getName(),
					todoCount));
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
		data.put("importCategories", buildTree(importCategories));
		data.put("applyCategories", buildTree(applyCategories));

		return successResponse(data);
	}

	/**
	 * 审核人获取需要审核的工作量对应的规则
	 *
	 * @return categories
	 */
	@RequestMapping(value = "apply-categories", method = GET)
	public RestResponse getApplyCategory() {
		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		List<Category> categoryList = categoryService
				.getCategoriesByReviewer(user.getUserId(), getCurrentSemester(), APPLY_SELF);
		if (categoryList.isEmpty()) {
			return invalidOperationResponse();
		}

		List<Category> categories = new ArrayList<>();
		for (Category category : categoryList) {
			List<Item> itemList = itemService
					.findItemByCategory(getCurrentSemester(), category.getCategoryId());
			if (!isEmptyList(itemList)) {
				categories.add(category);
			}
		}

		Map<String, Object> data = getData();
		if (isEmptyList(categories)) {
			data.put("applyCategories", null);
		} else {
			data.put("applyCategories", buildTree(categories));
		}
		return successResponse(data);
	}

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
				.findAll(null, categoryId, null, ownerId, isGroup, getCurrentSemester());

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
				.getCategoriesByReviewer(reviewerId, getCurrentSemester(), importRequired);
		if (categoryList.isEmpty()) {
			return null;
		}

		List<Item> items;
		List<Item> itemList = new ArrayList<>();

		//查找对应的导入方式下的为指定状态的Item条目信息
		for (Category category : categoryList) {
			items = itemService
					.findItemsByCategory(category.getCategoryId(), status, getCurrentSemester());
			itemList.addAll(items);
		}

		return itemConverter.poListToDtoList(itemList);
	}

	class CategoryBrief {

		private Integer categoryId;

		private String categoryName;

		private Integer todoCount = ZERO_INT;

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

		public Integer getTodoCount() {
			return todoCount;
		}

		public void setTodoCount(Integer todoCount) {
			this.todoCount = todoCount;
		}

		public CategoryBrief(Integer categoryId, String categoryName, Integer todoCount) {
			this.categoryId = categoryId;
			this.categoryName = categoryName;
			this.todoCount = todoCount;
		}
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
