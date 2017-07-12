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
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REVIEWER_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description:  )
 */
@RestController
@RequestMapping(REVIEWER_PATH)
public class ReviewerController extends ApplicationController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private SubjectConverter subjectConverter;

	@Autowired
	private CategoryConverter categoryConverter;

	//	/**
	//	 * 审核人获取负责的类目下的工作量提交的信息(自我申报类 and 系统导入类)
	//	 * 自我申报类：对应查询未审核状态的工作量条目信息
	//	 * 系统导入类: 1、对应查询未提交状态的工作量条目信息
	//	 * 2、对应查询存疑状态和存疑通过状态的工作量条目信息
	//	 *
	//	 * @return RestResponse
	//	 */
	//	@RequestMapping(value = "items", method = GET)
	//	public RestResponse getReviewItems() {
	//
	//		User user = getUser();
	//		System.out.println(user);
	//
	//		if (null == user) {
	//			return invalidOperationResponse("非法请求");
	//		}
	//
	//		//获取教师ID对应工作量类目下的条目（申报类和导入类）
	//		int teacherId = user.getUserId();
	//		List<Category> categoryList = categoryService.getCategoriesByReviewer(teacherId);
	//		if (categoryList.isEmpty()) {
	//			return systemErrResponse("error");
	//		}
	//
	//		List<Item> items;
	//		List<Item> applyUncheckedItemList = new ArrayList<>();
	//		List<Item> importItemList = new ArrayList<>();
	//		List<Item> doubtItemList = new ArrayList<>();
	//
	//		for (Category category : categoryList) {
	//			int categoryId = category.getCategoryId();
	//			if (APPLY_SELF == category.getImportRequired()) {
	//
	//				// 根据工作量类目对应的ID查询该类下的工作量条目信息（状态为 未审核）
	//				items = itemService.findItemsByCategory(categoryId, NON_CHECKED);
	//				applyUncheckedItemList.addAll(items);
	//
	//			} else if (IMPORT_EXCEL == category.getImportRequired()) {
	//
	//				// 根据工作量类目对应的ID查询该类下的工作量条目信息 （状态为 未提交）
	//				items = itemService.findItemsByCategory(categoryId, UNCOMMITTED);
	//				importItemList.addAll(items);
	//
	//				// 根据工作量类目对应的ID查询该类下的工作量子条目信息 （状态为 存疑和存疑通过）
	//				items = itemService.findItemsByCategory(categoryId, DOUBTED);
	//				doubtItemList.addAll(items);
	//				items = itemService.findItemsByCategory(categoryId, DOUBTED_CHECKED);
	//				doubtItemList.addAll(items);
	//
	//			} else {
	//				return systemErrResponse("error");
	//			}
	//		}
	//
	//		Map<String, Object> data = getData();
	//		data.put("applyItemList", itemConverter.poListToDtoList(applyUncheckedItemList));
	//		data.put("importItemList", itemConverter.poListToDtoList(importItemList));
	//		data.put("doubtedItemList", itemConverter.poListToDtoList(doubtItemList));
	//
	//		return successResponse(data);
	//	}

	/**
	 * 获取不同导入方式下的对应的需要审核的工作量条目信息
	 *
	 * @param importRequired 导入方式
	 * @return RestResponse
	 */
	@RequestMapping(value = "items", method = GET)
	public RestResponse getItems(
			@RequestParam("importRequired")
					Integer importRequired) {

		// 用户验证
		User user = getUser();
		System.out.println(user);

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int teacherId = user.getUserId();
		Map<String, Object> data = getData();

		//判断导入方式，对应不同的状态值

		//自我申报-未审核状态
		if (APPLY_SELF == importRequired) {

			List<ItemDto> nonCheckedItems = itemService
					.listResult(getReviewItems(teacherId, importRequired, NON_CHECKED));
			data.put("nonCheckedItem", nonCheckedItems);
			return successResponse(data);

		} else if (IMPORT_EXCEL == importRequired) {

			//系统导入-未提交状态
			List<ItemDto> unCommittedItem = itemService
					.listResult(getReviewItems(teacherId, importRequired, UNCOMMITTED));

			//系统导入-存疑状态-疑问解决状态
			List<ItemDto> doubtedItemList = itemService
					.listResult(getReviewItems(teacherId, importRequired, DOUBTED));
			doubtedItemList.addAll(itemService
					.listResult(getReviewItems(teacherId, importRequired, DOUBTED_CHECKED)));

			data.put("unCommittedItem", unCommittedItem);
			data.put("doubtedItem", doubtedItemList);

			return successResponse(data);

		} else {

			//参数有误
			return parameterNotSupportResponse("参数有误");
		}

	}

	/**
	 * 审核人审核Item信息
	 *
	 * @param itemId  item编号
	 * @param status  通过or拒绝
	 * @param message 拒绝的原因
	 * @return RestResponse
	 */
	@RequestMapping(value = "check", method = POST)
	public RestResponse checkItems(
			@RequestParam("itemId")
					Integer itemId,
			@RequestParam("status")
					Integer status,
			@RequestParam(required = false)
					String message) {

		//用户校验
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//参数校验
		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("无效参数");
		}

		if (CHECKED != status || DENIED != status) {
			return parameterNotSupportResponse("无效参数");
		}

		//身份校验
		Category category = categoryService.getCategory(item.getCategoryId());
		if (user.getUserId() != category.getReviewerId()) {
			return invalidOperationResponse("非法操作");
		}

		//设置为对应的状态
		item.setStatus(status);
		boolean saveSuccess = itemService.saveItem(item);

		//设置对应的Subject信息
		Subject subject = new Subject();
		subject.setMsgContent(message);
		subject.setSendFromId(user.getUserId());
		subject.setSendTime(DateHelper.getCurrentTimestamp());
		subject.setItemId(itemId);
		if (null == subject) {
			return parameterNotSupportResponse("参数有误");
		}

		//保存Subject信息
		boolean saveMessageSuccess = subjectService.addSubject(subject);
		if (!saveMessageSuccess || !saveSuccess) {
			return systemErrResponse("更新状态失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));
		data.put("subject", subjectConverter.poToDto(subject));

		return successResponse(data);
	}

	/**
	 * 提前审核时间
	 *
	 * @param date 审核时间 只能提前
	 * @return RestResponse
	 */
	@RequestMapping(value = "date-modify", method = POST)
	public RestResponse modifyReviewTime(
			@RequestParam("categoryId")
					Integer categoryId,
			@RequestParam("date")
					String date) {

		Category category = categoryService.getCategory(categoryId);
		if(null == category) {
			return parameterNotSupportResponse("参数有误");
		}

		CategoryDto categoryDto = categoryConverter.poToDto(category);
		categoryDto.setReviewDeadline(date);

		Category newCategory = categoryConverter.dtoToPo(categoryDto);

		//转换为整形时间戳后可进行大小判断
		if(newCategory.getReviewDeadline() > category.getReviewDeadline()){
			return parameterNotSupportResponse("时间只能提前");
		}

		boolean saveSuccess = categoryService.saveCategory(newCategory);
		if(!saveSuccess) {
			return systemErrResponse("修改失败");
		}
		Map<String,Object> data = getData();
		data.put("newCategory",newCategory);

		return successResponse(data);
	}

	/**
	 * 修改工作量
	 *
	 * @param workload 工作量
	 * @return RestResponse
	 */
	@RequestMapping(value = "workload-modify", method = POST)
	public RestResponse modifyWorkload(
			@RequestParam("itemId")
					Integer itemId,
			@RequestParam("workload")
					Integer workload) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//TODO 身份检验

		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}

		item.setWorkload(workload);
		boolean saveSuccess = itemService.saveItem(item);
		if (!saveSuccess) {
			return systemErrResponse("保存失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);
	}

	/**
	 * 提交工作量条目
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "item-submit", method = POST)
	public RestResponse submitItems(
			@RequestParam("itemId")
					Integer itemId) {

		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}

		//修改item的状态为CHECKED 审核通过
		item.setStatus(CHECKED);
		boolean saveSuccess = itemService.saveItem(item);
		if (!saveSuccess) {
			return systemErrResponse("保存失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);

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
		List<Category> categoryList = categoryService.getCategoriesByReviewer(reviewerId);
		if (categoryList.isEmpty()) {
			return null;
		}

		List<Item> items;
		List<Item> itemList = new ArrayList<>();

		//查找对应的导入方式下的为指定状态的Item条目信息
		for (Category category : categoryList) {
			if (importRequired == category.getImportRequired()) {
				items = itemService.findItemsByCategory(category.getCategoryId(), status);
				itemList.addAll(items);
			}
		}

		return itemConverter.poListToDtoList(itemList);
	}

}
