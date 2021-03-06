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
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.event.CategoryEvent;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.CATEGORY_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGE_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IS_LEAF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_TYPE;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static cn.edu.uestc.ostec.workload.type.UserType.ADMINISTRATOR;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 工作量类目信息管理控制器 )
 */
@RestController
@RequestMapping(CATEGORY_PATH + MANAGE_PATH)
public class CategoryManageController extends ApplicationController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	@Autowired
	private CategoryEvent categoryEvent;

	@Autowired
	private TeacherWorkloadService teacherWorkloadService;

	/**
	 * 导入以往学期的类目信息
	 *
	 * @param version 学期
	 */
	@RequestMapping(value = "import-previous", method = POST)
	public RestResponse importPreviousData(
			@RequestParam("version")
					String version) {

		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		List<Category> categoryList = categoryService.getAllValidCategory(version);
		if (isEmptyList(categoryList)) {
			return successResponse();
		}

		List<TeacherWorkload> teacherWorkloadList = teacherWorkloadService.getAllWorkload(version);
		if (isEmptyList(teacherWorkloadList)) {
			return successResponse();
		}

		List<TeacherWorkload> workloadList = new ArrayList<>();

		List<Category> categoryList1 = new ArrayList<>();
		Map<String, Object> data = getData();
		StringBuilder errorData = new StringBuilder();
		for (Category category : categoryList) {
			category.setVersion(getCurrentSemester());
			category.setReviewDeadline(
					DateHelper.getDefaultTimeStamp(getCurrentYear() + DEFAULT_REVIEW_DATE_TIME));
			category.setApplyDeadline(
					DateHelper.getDefaultTimeStamp(getCurrentYear() + DEFAULT_APPLY_DATE_TIME));
			if (!categoryService.addCategory(category)) {
				errorData.append(category.getName() + "导入失败");
			}
			categoryList1.add(category);
		}

		for (TeacherWorkload teacherWorkload : teacherWorkloadList) {
			teacherWorkload.setVersion(getCurrentSemester());
			teacherWorkload.setDefaultParams();
			if (teacherWorkloadService.addTeacherWorkload(teacherWorkload)) {
				workloadList.add(teacherWorkload);
			}
		}

		data.put("teacherWorkloadList", teacherWorkloadList);
		data.put("categoryList", categoryList);
		data.put("errorData",errorData);
		return successResponse(data);

	}

	/**
	 * 添加工作量类目信息
	 *
	 * @param categoryDto category包装对象
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse addCategories(CategoryDto categoryDto) {

		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		//参数检验
		if (null == categoryDto || isEmptyString(categoryDto.getName()) || isEmptyString(
				categoryDto.getDesc()) || !isValidImportedRequired(
				categoryDto.getImportRequired())) {
			return parameterNotSupportResponse("参数有误或为空");
		}

		//设置默认参数
		setDefaultParams(categoryDto);

		if (IS_LEAF.equals(categoryDto.getIsLeaf()) && isEmptyString(categoryDto.getFormula())) {
			return parameterNotSupportResponse("公式不能为空！");
		}

		//将dto对象转为pojo（转换时间）
		Category category = categoryConverter.dtoToPo(categoryDto);

		//设置状态值(未提交)
		category.setStatus(UNCOMMITTED);

		//保存category类目
		boolean saveCategorySuccess = categoryService.saveCategory(category);

		if (!saveCategorySuccess) {
			return systemErrResponse("保存失败");
		}

		//展示保存的dto的完整信息
		Map<String, Object> data = getData();
		CategoryDto categoryDto1 = categoryConverter.poToDto(category);

		data.put("category", categoryDto1);

		return successResponse(data);
	}

	/**
	 * 置对应的条目信息为Disable
	 *
	 * @param categoryIdList 类目编号集合
	 * @return RestResponse
	 */
	@RequestMapping(value = "disable", method = POST)
	public RestResponse removeCategories(
			@RequestParam(value = "categoryId")
					Integer... categoryIdList) {
		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		Map<String, Object> data = getData();
		List<CategoryDto> categoryList = new ArrayList<>();
		for (Integer categoryId : categoryIdList) {

			Category category = categoryService.getCategory(categoryId, getCurrentSemester());
			if (null == category) {
				return parameterNotSupportResponse("参数有误！");
			}

			if (SUBMITTED.equals(category.getStatus())) {
				return invalidOperationResponse("存在未解锁规则，无法删除");
			}

			boolean removeSuccess = categoryService
					.removeCategory(categoryId, getCurrentSemester());
			if (!removeSuccess) {
				return systemErrResponse("删除失败");
			}

			Category oldCategory = categoryService.getCategory(categoryId, getCurrentSemester());
			CategoryDto categoryDto = categoryConverter.poToDto(oldCategory);
			categoryDto.setOtherJson(null);
			categoryDto.setJsonParameters(null);
			categoryList.add(categoryDto);
		}

		data.put("categoryList", categoryList);
		//展示删除的categoryDto信息
		return successResponse(data);
	}

	/**
	 * 解锁对应的工作量信息:修改对应状态为SUBMITTED条目为UNCOMMITTED
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "unlock", method = POST)
	public RestResponse undoCategories(
			@RequestParam("categoryId")
					Integer... categoryIdList) {

		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		List<Category> categoryList = new ArrayList<>();
		Map<String, Object> data = getData();
		for (Integer categoryId : categoryIdList) {
			Category category = categoryService.getCategory(categoryId, getCurrentSemester());
			if (null == category) {
				return parameterNotSupportResponse("参数有误");
			}
			category.setStatus(UNCOMMITTED);
			boolean saveSuccess = categoryService.saveCategory(category);
			if (!saveSuccess) {
				return systemErrResponse("删除失败");
			}
			categoryList.add(category);
		}
		data.put("categoryList", categoryConverter.poListToDtoList(categoryList));
		return successResponse(data);
	}

	/**
	 * 修改类目信息
	 *
	 * @param categoryDto 工作类目信息dto
	 * @return RestResponse
	 */
	@RequestMapping(value = "modify", method = POST)
	public RestResponse modifyCategories(CategoryDto categoryDto) throws Exception {

		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		//校验
		if (null == categoryDto || isEmptyString(categoryDto.getName())) {
			return parameterNotSupportResponse("参数有误");
		}

		if (SUBMITTED.equals(categoryDto.getStatus())) {
			return invalidOperationResponse("非解锁工作量不可修改，请先解锁！");
		}

		if (!isValidImportedRequired(categoryDto.getImportRequired())) {
			return parameterNotSupportResponse("导入类型参数有误");
		}

		Integer categoryId = categoryDto.getCategoryId();
		CategoryDto oldCategory = categoryConverter
				.poToDto(categoryService.getCategory(categoryId, getCurrentSemester()));
		//设置默认参数
		setDefaultParams(categoryDto);

		//设置对应的状态
		categoryDto.setStatus(UNCOMMITTED);

		//将dto对象转为pojo对象并保存
		Category category = categoryConverter.dtoToPo(categoryDto);
		boolean modifySuccess = categoryService.saveCategory(category);

		if (!modifySuccess) {
			return systemErrResponse("修改失败");
		}

		Map<String, Object> data = getData();
		CategoryDto newCategoryDto = categoryConverter.poToDto(category);
		newCategoryDto.setOtherJson(null);
		newCategoryDto.setJsonParameters(null);

		data.put("category", newCategoryDto);
		data.put("oldCategory", oldCategory);

		return successResponse(data);
	}

	/**
	 * 选择性提交
	 *
	 * @param categoryIdList 可变参数Id
	 * @return RestResponse
	 */
	@RequestMapping(value = "public-selective", method = POST)
	public RestResponse submitCategory(
			@RequestParam("categoryId")
					Integer... categoryIdList) {

		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		return successResponse(categoryEvent.submitCategories(categoryIdList));
	}

	private void setDefaultParams(CategoryDto categoryDto) {
		//相关参数的校验，若为空，使用相应的默认值
		if (isEmptyNumber(categoryDto.getReviewerId())) {
			categoryDto.setReviewerId(getUserId());
		}

		//设置申报时间默认值
		if (isEmptyString(categoryDto.getApplyDeadline())) {
			categoryDto.setApplyDeadline(DateHelper.getCurrentYear() + DEFAULT_APPLY_DATE_TIME);
		}

		//设置审核时间默认值
		if (isEmptyString(categoryDto.getReviewDeadline())) {
			categoryDto.setReviewDeadline(DateHelper.getCurrentYear() + DEFAULT_REVIEW_DATE_TIME);
		}

		//根据有无公式判断是否为叶子节点
		categoryDto
				.setIsLeaf(NON_TYPE.equals(categoryDto.getImportRequired()) ? NOT_LEAF : IS_LEAF);

		//设置默认学期
		categoryDto.setVersion(getCurrentSemester());

	}

}
