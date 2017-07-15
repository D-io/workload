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
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.service.AdminService;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.CATEGORY_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGE_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
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
	private AdminService adminService;

	@Autowired
	private CategoryConverter categoryConverter;

	/**
	 * 添加工作量类目信息
	 *
	 * @param categoryDto category包装对象
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse addCategories(CategoryDto categoryDto) {

		//验证管理员身份
		int userId = getUserId();
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		//参数检验
		if (null == categoryDto || ZERO_INT == categoryDto.getReviewerId()) {
			return parameterNotSupportResponse("参数不能为空");
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
		data.put("category", categoryConverter.poToDto(category));

		return successResponse(data);
	}

	/**
	 * 置对应的条目信息为Disable
	 *
	 * @param categoryId 类目编号
	 * @return RestResponse
	 */
	@RequestMapping(method = DELETE)
	public RestResponse removeCategories(
			@RequestParam(value = "categoryId")
					Integer categoryId) {
		//验证管理员身份
		int userId = getUserId();
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		Category category = categoryService.getCategory(categoryId);
		if (null == category) {
			return parameterNotSupportResponse("参数有误");
		}

		if (SUBMITTED.equals(category.getStatus())) {
			return invalidOperationResponse("非解锁工作量不可删除，请先解锁！");
		}

		//设置为disable状态
		boolean removeSuccess = categoryService.removeCategory(categoryId);

		if (!removeSuccess) {
			return systemErrResponse("删除失败！");
		}

		Category oldCategory = categoryService.getCategory(categoryId);
		CategoryDto categoryDto = categoryConverter.poToDto(oldCategory);

		//展示删除的categoryDto信息
		Map<String, Object> data = getData();
		data.put("oldCategory", categoryDto);

		return successResponse(data);
	}

	/**
	 * 解锁对应的工作量信息:修改对应状态为SUBMITTED条目为UNCOMMITTED
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "unlock", method = POST)
	public RestResponse undoCategories() {

		//验证管理员身份
		int userId = getUserId();
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		//获取状态为SUBMITTED的工作量条目
		List<Category> categoryList = categoryService.getCategoriesByStatus(SUBMITTED);

		//修改相应的状态
		for (Category category : categoryList) {
			if (!categoryService.saveCategory(UNCOMMITTED, category.getCategoryId())) {
				return invalidOperationResponse("解锁失败");
			}
		}

		return successResponse("解锁成功");
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
		int userId = getUserId();
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		//校验
		if (null == categoryDto) {
			return parameterNotSupportResponse("参数有误");
		}

		if (SUBMITTED.equals(categoryDto.getStatus())) {
			return invalidOperationResponse("非解锁工作量不可修改，请先解锁！");
		}

		categoryDto.setStatus(UNCOMMITTED);

		//将dto对象转为pojo对象并保存
		Category category = categoryConverter.dtoToPo(categoryDto);
		boolean modifySuccess = categoryService.saveCategory(category);

		if (!modifySuccess) {
			return systemErrResponse("修改失败");
		}

		Map<String, Object> data = getData();
		data.put("category", categoryConverter.poToDto(category));

		return successResponse(data);
	}

	/**
	 * 全部提交
	 * 提交：修改对应的UNCOMMITTED状态为SUBMITTED
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "public", method = POST)
	public RestResponse submitCategory() {

		//验证管理员身份
		int userId = getUserId();
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		Map<String, Object> data = getData();
		List<Category> categoryList = categoryService.getCategoriesByStatus(UNCOMMITTED);
		if (null == categoryList) {
			return invalidOperationResponse("无可提交的项目");
		}

		for (Category category : categoryList) {
			if (!categoryService.saveCategory(SUBMITTED, category.getCategoryId())) {
				return systemErrResponse("提交失败");
			}
		}
		data.put("categoryList", categoryList);
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
		int userId = getUserId();
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		boolean submitSuccess;
		List<Category> categoryList = new ArrayList<>();
		Map<String, Object> data = getData();
		Map<String, Object> errorData = getData();

		for (Integer categoryId : categoryIdList) {
			Category category = categoryService.getCategory(categoryId);

			if (UNCOMMITTED.equals(category.getStatus())) {
				submitSuccess = categoryService.saveCategory(SUBMITTED, categoryId);

				if (!submitSuccess) {
					//提交失败的错误信息
					errorData.put(category.getName(), "提交失败");
				} else {
					//提交成功的类目信息
					category = categoryService.getCategory(categoryId);
					categoryList.add(category);
				}

			} else {
				//无法提交的错误信息（状态值不为UNCOMMITTED）
				errorData.put(category.getName(), "无法提交");
			}
		}

		data.put("errorData", errorData);
		data.put("categoryList", categoryConverter.poListToDtoList(categoryList));

		return successResponse(data);
	}

}