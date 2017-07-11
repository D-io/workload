package cn.edu.uestc.ostec.workload.controller;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.adaptor.MultiLevelObjectAdaptor;
import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.service.AdminService;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.TeacherService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGER_CATEGORY_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.ROOT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Version:v1.0 (description: 工作量类目信息管理控制器 )
 */
@RestController
@RequestMapping(MANAGER_CATEGORY_PATH)
public class CategoryController extends ApplicationController
		implements MultiLevelObjectAdaptor<CategoryDto> {

	@Autowired
	private TeacherService teacherService;

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
	public RestResponse addCategories(CategoryDto categoryDto) throws ParseException {

		//TODO 用户信息未获取到 待解决

		//		//验证管理员身份
		//		long userId = getUserId();
		//		if(!adminService.findAllAdmins().contains(userId)){
		//			return systemErrResponse("Illegal visit");
		//		}

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

	@RequestMapping(value = "list", method = GET)
	public RestResponse getSubmittedCategories() {

		Map<String, Object> data = getData();

		//获取已经提交的类目信息
		data.put("categoryTree", getCategoryDto(SUBMITTED, ROOT));
		return successResponse(data);
	}

	/**
	 * 查询单个Category信息
	 * @param categoryId Category编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "single", method = GET)
	public RestResponse getCategory(@RequestParam("categoryId") Integer categoryId) {

		CategoryDto categoryDto = categoryConverter.poToDto(categoryService.getCategory(categoryId));

		Map<String,Object> data = getData();
		data.put("categoryDto",categoryDto);

		return successResponse(data);
	}

	/**
	 * 管理员查看未提交的和已提交的工作量类目树结构
	 * @return RestResponse
	 */
	@RequestMapping(value = "all",method = GET)
	public RestResponse getCategories(Integer status) {

		//		//验证管理员身份
		//		int userId = getUserId();
		//		if(!adminService.findAllAdmins().contains(userId)){
		//			return systemErrResponse("Illegal visit");
		//		}

		Map<String, Object> data = getData();

		//获取已经提交的类目信息
		if(DELETED != status) {
			data.put("categoryTree", getCategoryDto(null, ROOT));
		}else{
			//获取状态为Disable的工作量类目信息
			data.put("categoryList",categoryService.getCategoriesByStatus(DELETED));
		}

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
		//		//验证管理员身份
		//		long userId = getUserId();
		//		if(!adminService.findAllAdmins().contains(userId)){
		//			return systemErrResponse("Illegal visit");
		//		}

		if (null == categoryId) {
			return parameterNotSupportResponse("null parameter");
		}

		Category category = categoryService.getCategory(categoryId);
		if (null == category) {
			return parameterNotSupportResponse("参数有误");
		}

		if (SUBMITTED == category.getStatus()) {
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
	 * @return RestResponse
	 */
	@RequestMapping(value = "unlock", method = POST)
	public RestResponse undoCategories() {

		//获取状态为SUBMITTED的工作量条目
		List<Category> categoryList = categoryService.getCategoriesByStatus(SUBMITTED);

		//修改相应的状态
		for (Category category : categoryList) {
			if (!categoryService.saveCategory(UNCOMMITTED,category.getCategoryId())) {
				return invalidOperationResponse("解锁失败");
			}
		}

		return successResponse("解锁成功");
	}

	/**
	 * 修改类目信息
	 * @param categoryDto 工作类目信息dto
	 * @return RestResponse
	 * @throws Exception
	 */
	@RequestMapping(value = "modify", method = POST)
	public RestResponse modifyCategories(CategoryDto categoryDto) throws Exception {

		//		//验证管理员身份
		//		long userId = getUserId();
		//		if(!adminService.findAllAdmins().contains(userId)){
		//			return systemErrResponse("Illegal visit");
		//		}

		//校验
		if (null == categoryDto) {
			return systemErrResponse();
		}

		if (SUBMITTED == categoryDto.getStatus()) {
			return invalidOperationResponse("非解锁工作量不可修改，请先解锁！");
		}

		categoryDto.setStatus(UNCOMMITTED);

		//将dto对象转为pojo对象并保存
		Category category = categoryConverter.dtoToPo(categoryDto);
		boolean modifySuccess = categoryService.saveCategory(category);

		if (!modifySuccess) {
			return systemErrResponse("modify error");
		}

		Map<String, Object> data = getData();
		data.put("category", categoryConverter.poToDto(category));

		return successResponse(data);
	}

	/**
	 * 提交：修改对应的UNCOMMITTED状态为SUBMITTED
	 */
	@RequestMapping(value = "public", method = POST)
	public RestResponse submitCategory() {

		Map<String, Object> data = getData();
		List<Category> categoryList = categoryService.getCategoriesByStatus(UNCOMMITTED);
		if(null == categoryList) {
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

	@RequestMapping(value = "teachers",method = GET)
	public RestResponse getTeacherList() {

		Map<String,Object> data = getData();
		data.put("teacherList",teacherService.findAll());

		return successResponse(data);
	}

	/**
	 * 获取对应状态下的CategoryDto对象,构建树结构
	 */
	public List<CategoryDto> getCategoryDto(Integer status, Integer parentId) {

		List<CategoryDto> categoryDtoList;

		if(null == status){
			//由父节点获取状态有效的子节点对应的dto对象
			categoryDtoList = categoryService.getDtoObjects(parentId);
		}else{
			//由父节点和状态值查询对应的子节点dto对象
			categoryDtoList = categoryService.getDtoObjects(status, parentId);
		}

		if (categoryDtoList.size() < 0) {
			return null;
		}

		//遍历子节点，分别构建树结构
		try {
			for (Iterator<CategoryDto> iterator = categoryDtoList.iterator(); iterator
					.hasNext(); ) {
				CategoryDto categoryDto = iterator.next();
				if(null == status){
					buildValidObjectStructure(categoryDto,categoryService);
				}else{
					buildObjectStructure(categoryDto, categoryService);
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		//返回形成的树结构
		return categoryDtoList;
	}
}
