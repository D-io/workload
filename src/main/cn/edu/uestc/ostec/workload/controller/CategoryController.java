package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.Reviewer;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.AdminService;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ReviewerService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGER_CATEGORY_PATH;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@Controller
@RequestMapping(MANAGER_CATEGORY_PATH)
public class CategoryController extends ApplicationController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ReviewerService reviewerService;

	@Autowired
	private AdminService adminService;


	@RequestMapping(method = POST)
	public RestResponse saveCategories(Category category,@RequestParam(value = "reviewerId") int reviewerId){

		long userId = getUserId();

		if(!adminService.findAllAdmins().contains(userId)){
			return systemErrResponse("Illegal visit");
		}

		if(null == category || 0 == reviewerId){
			return invalidOperationResponse();
		}

		if(0 != category.getParentId()){
			category.setIsLeaf("Y");
		}

		category.setStatus(0);

		boolean saveCategorySuccess = categoryService.saveCategory(category);

		int categoryId = category.getCategoryId();
		Reviewer reviewer = new Reviewer();
		reviewer.setReviewerId(reviewerId);
		reviewer.setCategoryId(categoryId);

		boolean saveReviewerSuccess = reviewerService.saveReviewer(reviewer);

		if(!saveCategorySuccess || !saveReviewerSuccess){
			return systemErrResponse("save error");
		}

		Map<String,Object> data = getData();
		data.put("category",category);
		data.put("reviewer",reviewer);
		return successResponse(data);
	}

	@RequestMapping(method = GET)
	public RestResponse getCategories(){

		return successResponse();
	}

	@RequestMapping(method = DELETE)
	public RestResponse removeCategories(){

		return successResponse();
	}

	@RequestMapping(method = PUT)
	public RestResponse modifyCategories(){

		return successResponse();
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
