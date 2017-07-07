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

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGER_CATEGORY_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@RequestMapping(MANAGER_CATEGORY_PATH)
public class CategoryController extends ApplicationController
		implements MultiLevelObjectAdaptor<CategoryDto> {

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

		//设置dto对象的ID和status，用作数据展示
		int categoryId = category.getCategoryId();
		categoryDto.setCategoryId(categoryId);
		categoryDto.setStatus(category.getStatus());

		//展示保存的dto的完整信息
		Map<String, Object> data = getData();
		data.put("category", categoryDto);

		return successResponse(data);
	}

	@RequestMapping(value = "list", method = GET)
	public RestResponse getSubmittedCategories() {

		//获取已经提交的类目信息
		return getCategoryDto(SUBMITTED);
	}

	@RequestMapping(value = "valid", method = GET)
	public RestResponse getValidCategories() {

		//		//验证管理员身份
		//		long userId = getUserId();
		//		if(!adminService.findAllAdmins().contains(userId)){
		//			return systemErrResponse("Illegal visit");
		//		}
		return getCategoryDto(UNCOMMITTED);


	}

	@RequestMapping(value = "disable", method = GET)
	public RestResponse getDisableCategories() {

		//		//验证管理员身份
		//		long userId = getUserId();
		//		if(!adminService.findAllAdmins().contains(userId)){
		//			return systemErrResponse("Illegal visit");
		//		}

		//获取已经删除的类目信息
		return getCategoryDto(DELETED);
	}

	/**
	 * 置对应的条目信息为Disable
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
		if(null == category){
			return parameterNotSupportResponse("参数有误");
		}

		if(SUBMITTED == category.getStatus()){
			return invalidOperationResponse("非解锁工作量不可删除，请先解锁！");
		}

		//设置为disable状态
		boolean removeSuccess = categoryService.removeCategory(categoryId);

		if (!removeSuccess) {
			return systemErrResponse("delete error");
		}

		Category oldCategory = categoryService.getCategory(categoryId);
		CategoryDto categoryDto = categoryConverter.poToDto(oldCategory);

		//展示删除的categoryDto信息
		Map<String, Object> data = getData();
		data.put("oldCategory", categoryDto);

		return successResponse(data);
	}

	@RequestMapping(value = "unlock",method = POST)
	public RestResponse undoCategories(){

		List<Category> categoryList = categoryService.getCategoriesByStatus(SUBMITTED);
		for(Category category:categoryList){
			if(!categoryService.saveCategory(category.getCategoryId(),UNCOMMITTED)){
				return invalidOperationResponse("解锁失败");
			}
		}

		return successResponse();
	}

	@RequestMapping(method = PUT)
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

		categoryDto.setStatus(UNCOMMITTED);

		//将dto对象转为pojo对象并保存
		Category category = categoryConverter.dtoToPo(categoryDto);
		boolean modifySuccess = categoryService.saveCategory(category);

		if (!modifySuccess) {
			return systemErrResponse("modify error");
		}

		Map<String, Object> data = getData();
		data.put("oldCategory", categoryDto);

		return successResponse(data);
	}

	/**
	 * 提交
	 * @return
	 */
	@RequestMapping(value = "public", method = PUT)
	public RestResponse submitCategory() {

		Map<String, Object> data = getData();
		List<Category> categoryList = categoryService.getCategoriesByStatus(UNCOMMITTED);
		for (Category category:categoryList){
			 if(!categoryService.saveCategory(SUBMITTED,category.getCategoryId())){
			 	return systemErrResponse("提交失败");
			 }
		}
		data.put("categoryList",categoryList);
		return successResponse(data);
	}

	/**
	 * 获取对应状态下的CategoryDto对象
	 *
	 * @param status 状态
	 * @return RestResponse
	 */
	public RestResponse getCategoryDto(Integer status) {

		Map<String, Object> data = getData();
		List<CategoryDto> categoryDtoList = categoryService.getDtoObjects(status, 0);
		if (categoryDtoList.size() < 0) {
			return invalidOperationResponse();
		}

		try {
			for (Iterator<CategoryDto> iterator = categoryDtoList.iterator(); iterator
					.hasNext(); ) {
				CategoryDto categoryDto = iterator.next();
				buildObjectStructure(categoryDto, categoryService);
			}
			data.put("categoryInfoTree", categoryDtoList);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return successResponse(data);
	}
}

//	@Autowired
//	@Qualifier("categoryService")
//	private CategoryService categoryService;
//
//	JSONObject obj = new JSONObject();
//
////	/**
////	 * 新增工作量条目(管理员新增)
////	 */
////	@RequestMapping("/insertCategory")
////	public void insertCategory(
////			@RequestBody
////					Map<String, Object> category, HttpServletRequest request) {
////		try {
////			String reviewerId = category.get("reviewerId").toString();
////			category.remove("reviewerId");
////			int insertCategory = categoryService.insertCategory(category);
////			if (insertCategory == -1) {
////				obj.put("result", 0);
////				obj.put("msg", "新增工作量条目失败，请检查字段是否合法");
////			} else {
////				Map<String, Object> reviewer = new HashMap<String, Object>();
////				reviewer.put("reviewerId", reviewerId);
////				reviewer.put("categoryId", insertCategory);
////				obj.put("result", 1);
////				obj.put("msg", insertCategory);
////			}
////		} catch (Exception e) {
////			e.printStackTrace();
////		}
////	}
//
//	/**
//	 * 修改工作量条目
//	 * 管理员可修改字段同新增
//	 * 审核人仅修改字段applyDeadline
//	 */
//	@RequestMapping("/updateCategory")
//	public void updateCategory(HttpServletRequest request, Category category) {
//		try {
//			String updateCategory = categoryService.updateCategory(category);
//			if (updateCategory.equals("修改成功")) {
//				obj.put("result", 1);
//				obj.put("msg", updateCategory);
//			} else {
//				obj.put("result", 0);
//				obj.put("msg", updateCategory);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/selectFirst")
//	//查询第一级工作量条目
//	public void selectFirst(HttpServletRequest request) {
//		try {
//			//查询非删除状态下，且父节点为0的所有条目
//			String status = "-1";
//			Integer parentId = 0;
//			List<Category> selectCategory = categoryService
//					.selectCategoryChildren(status, parentId);
//			obj.put("result", 1);
//			obj.put("msg", selectCategory);
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("select", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/selectChildren")
//	//查询某一工作量条目的子条目
//	public void selectChildren(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			//查询非删除状态下，且父节点为传入id的所有条目
//			String status = "-1";
//			Integer parentId = Integer.valueOf(request.getParameter("parentId"));
//			List<Category> selectCategory = categoryService
//					.selectCategoryChildren(status, parentId);
//			obj.put("result", 1);
//			obj.put("msg", selectCategory);
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("select", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/selectDetail")
//	//查看详情
//	public void selectDetail(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			//根据传入id查询某一条数据
//			Integer categoryId = Integer.valueOf(request.getParameter("categoryId"));
//			Category selectCategory = categoryService.selectCategoryById(categoryId);
//			obj.put("result", 1);
//			obj.put("msg", selectCategory);
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("select", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/updateToLock")
//	//根据id锁定(提交)工作量条目
//	public void updateToLock(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			String categoryIds = request.getParameter("id");
//			String[] categoryId = categoryIds.split(",");
//			for (int i = 0; i < categoryIds.length(); i++) {
//				String deleteCategory = categoryService.updateCategoryStatus("1", categoryId[i]);
//				if (deleteCategory.equals("修改成功")) {
//					obj.put("result", 1);
//					obj.put("msg", "提交成功");
//				} else {
//					obj.put("result", 0);
//					obj.put("msg", "部分提交失败，请重新尝试！");
//					break;
//				}
//			}
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("update", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/clearStatus")
//	//根据id解锁工作量条目(条目状态置于未提交)
//	public void clearStatus(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			String categoryIds = request.getParameter("id");
//			String[] categoryId = categoryIds.split(",");
//			for (int i = 0; i < categoryIds.length(); i++) {
//				String deleteCategory = categoryService.updateCategoryStatus("0", categoryId[i]);
//				if (deleteCategory.equals("修改成功")) {
//					obj.put("result", 1);
//					obj.put("msg", "解锁成功");
//				} else {
//					obj.put("result", 0);
//					obj.put("msg", "部分解锁失败，请重新尝试！");
//					break;
//				}
//			}
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("update", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/updateToDisable")
//	//根据id删除工作量条目(页面不显示)
//	public void updateToDisable(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			String categoryIds = request.getParameter("id");
//			String status = request.getParameter("status");
//			String[] categoryId = categoryIds.split(",");
//			String[] statu = status.split(",");
//			for (int i = 0; i < categoryIds.length(); i++) {
//				if (statu[i] != "0") {
//					obj.put("result", 0);
//					obj.put("msg", "非解锁工作量不可删除，请先解锁！");
//					break;
//				}
//				String deleteCategory = categoryService.updateCategoryStatus("-1", categoryId[i]);
//				if (deleteCategory.equals("修改成功")) {
//					obj.put("result", 1);
//					obj.put("msg", "删除成功");
//				} else {
//					obj.put("result", 0);
//					obj.put("msg", "部分删除失败，请重新尝试！");
//					break;
//				}
//			}
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("update", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@RequestMapping("/delete")
//	//根据id删除工作量条目 (彻底删除)
//	public void delete(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			String categoryIds = request.getParameter("id");
//			String[] categoryId = categoryIds.split(",");
//			for (int i = 0; i < categoryIds.length(); i++) {
//				String deleteCategory = categoryService.deleteCategory(categoryId[i]);
//				if (deleteCategory.equals("删除成功")) {
//					obj.put("result", 1);
//					obj.put("msg", deleteCategory);
//				} else {
//					obj.put("result", 0);
//					obj.put("msg", "部分删除失败，请重新尝试！");
//					break;
//				}
//			}
//			request.setCharacterEncoding("utf-8");
//			request.setAttribute("delete", obj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//}
