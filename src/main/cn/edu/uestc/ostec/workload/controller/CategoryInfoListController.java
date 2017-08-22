/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */
package cn.edu.uestc.ostec.workload.controller;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.adaptor.MultiLevelObjectAdaptor;
import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.CATEGORY_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.ROOT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.UserType.ADMINISTRATOR;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 工作量类目信息展示控制器 )
 */
@RestController
@RequestMapping(CATEGORY_PATH + INFO_PATH)
public class CategoryInfoListController extends ApplicationController
		implements MultiLevelObjectAdaptor<CategoryDto> {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	/**
	 * 查询已经提交状态对应的类目信息生成的树结构
	 *
	 * @return categoryTree
	 */
	@RequestMapping(value = "list", method = GET)
	public RestResponse getSubmittedCategories() {

		Map<String, Object> data = getData();

		//获取已经提交的类目信息构成的树结构
		data.put("categoryTree", getCategoryDto(SUBMITTED, ROOT));
		return successResponse(data);
	}

	/**
	 * 查询单个Category信息
	 *
	 * @param categoryId Category编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "single", method = GET)
	public RestResponse getCategory(
			@RequestParam("categoryId")
					Integer categoryId) {

		CategoryDto categoryDto = categoryConverter
				.poToDto(categoryService.getCategory(categoryId,getCurrentSemester()));

		categoryDto.setOtherJson(null);
		categoryDto.setJsonParameters(null);

		Map<String, Object> data = getData();
		data.put("categoryDto", categoryDto);

		return successResponse(data);
	}

	/**
	 * 管理员查看未提交的和已提交的工作量类目树结构
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "all", method = GET)
	public RestResponse getCategories(Integer status) {

		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		Map<String, Object> data = getData();

		//获取已经提交的类目信息
		if (!DELETED.equals(status)) {
			data.put("categoryTree", getCategoryDto(null, ROOT));
		} else {
			//获取状态为Disable的工作量类目信息
			List<CategoryDto> categoryDtos = categoryConverter.poListToDtoList(
					categoryService.getCategoriesByStatus(DELETED, getCurrentSemester()));
			for (CategoryDto categoryDto : categoryDtos) {
				categoryDto.setOtherJson(null);
				categoryDto.setJsonParameters(null);
			}
			data.put("categoryList", categoryDtos);
		}

		return successResponse(data);
	}

	/**
	 * 查询当前已经配置了的父节点作为下拉列表
	 *
	 * @return categoryBrief
	 */
	@RequestMapping(value = "parent-brief", method = GET)
	public RestResponse getParentCategories() {

		List<Category> categoryList = categoryService.getAllValidCategory(getCurrentSemester());

		if (null == categoryList) {
			return successResponse("无配置好的父类");
		}

		List<CategoryBrief> categoryBriefs = new ArrayList<>();
		for (Category category : categoryList) {
			categoryBriefs.add(new CategoryBrief(category.getCategoryId(), category.getName()));
		}

		Map<String, Object> data = getData();
		data.put("categoryBriefs", categoryBriefs);

		return successResponse(data);
	}

	/**
	 * 获取对应状态下的CategoryDto对象,构建树结构
	 */
	public List<CategoryDto> getCategoryDto(Integer status, Integer parentId) {

		List<CategoryDto> categoryDtoList;

		if (null == status) {
			//由父节点获取状态有效的子节点对应的dto对象
			categoryDtoList = categoryService.getDtoObjects(parentId, getCurrentSemester());
		} else {
			//由父节点和状态值查询对应的子节点dto对象
			categoryDtoList = categoryService.getDtoObjects(status, parentId, getCurrentSemester());
		}

		if (categoryDtoList.size() < 0) {
			return null;
		}

		//遍历子节点，分别构建树结构
		try {
			for (Iterator<CategoryDto> iterator = categoryDtoList.iterator(); iterator
					.hasNext(); ) {
				CategoryDto categoryDto = iterator.next();
				if (null == status) {
					//状态为空，查询所有有效的Category构成的树结构
					buildValidObjectStructure(categoryDto, categoryService);
				} else {
					//状态不为空，查询指定的状态下的Category构成的树结构
					buildObjectStructure(categoryDto, categoryService);
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		//返回形成的树结构
		return categoryDtoList;
	}

	class CategoryBrief {

		String categoryName;

		Integer categoryId;

		public String getCategoryName() {
			return categoryName;
		}

		public void setCategoryName(String categoryName) {
			this.categoryName = categoryName;
		}

		public Integer getCategoryId() {
			return categoryId;
		}

		public void setCategoryId(Integer categoryId) {
			this.categoryId = categoryId;
		}

		public CategoryBrief(Integer categoryId, String categoryName) {
			this.categoryName = categoryName;
			this.categoryId = categoryId;
		}
	}
}
