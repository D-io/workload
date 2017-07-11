package cn.edu.uestc.ostec.workload.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
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
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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

	/**
	 * 审核人获取负责的类目下的工作量提交的信息
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "unchecked", method = GET)
	public RestResponse getUncheckedItems() {

		User user = getUser();
		System.out.println(user);

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//获取教师ID对应的两类状态的工作量对象（导入类）
		int teacherId = user.getUserId();
		List<Category> categoryList = categoryService.getCategoriesByReviewer(teacherId);
		if (categoryList.isEmpty()) {
			return systemErrResponse("error");
		}

		List<Item> itemList = new ArrayList<>();
		for (Category category : categoryList) {
			List<Item> items = itemService.findItemsByCategory(category.getCategoryId());
			itemList.addAll(items);
		}

		Map<String, Object> data = getData();
		data.put("itemList", itemConverter.poListToDtoList(itemList));

		return successResponse(data);
	}

	/**
	 * 审核人审核Item信息
	 *
	 * @param itemId  item编号git
	 * @param status  通过or拒绝
	 * @param message 拒绝的原因
	 * @return RestResponse
	 */
	@RequestMapping(value = "check", method = PUT)
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
	 * @param date 审核时间
	 * @return RestResponse
	 */
	public RestResponse modifyReviewTime(String date){



		return successResponse();
	}



}
