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

import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGE_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.REVIEWER_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED_CHECKED;
import static cn.edu.uestc.ostec.workload.type.UserType.REVIEWER;
import static cn.edu.uestc.ostec.workload.type.UserType.TEACHER;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 审核页面信息管理控制器 )
 */
@RestController
@RequestMapping(REVIEWER_PATH + MANAGE_PATH)
public class ReviewManageController extends ApplicationController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private SubjectConverter subjectConverter;

	@Autowired
	private CategoryConverter categoryConverter;

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

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		//参数校验
		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("无效参数");
		}

		if (!(CHECKED.equals(status) || DENIED.equals(status))) {
			return parameterNotSupportResponse("无效参数");
		}

		//设置为对应的状态
		item.setStatus(status);
		boolean saveSuccess = itemService.saveItem(item);

		Map<String, Object> data = getData();

		//设置对应的Subject信息（有消息作为参数，同时为拒绝状态）
		Subject subject = new Subject();
		if(null != message && DENIED.equals(status)) {
			subject.setMsgContent(message);
			subject.setSendFromId(user.getUserId());
			subject.setSendTime(DateHelper.getCurrentTimestamp());
			subject.setItemId(itemId);//保存Subject信息
			boolean saveMessageSuccess = subjectService.addSubject(subject);
			if (!saveMessageSuccess || !saveSuccess) {
				return systemErrResponse("更新状态失败");
			}
			data.put("subject", subjectConverter.poToDto(subject));
		}

		if(!saveSuccess) {
			return systemErrResponse("更新状态失败");
		}
		data.put("item", itemConverter.poToDto(item));

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

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		//根据categoryId查询到Category对象，并转换为dto对象
		Category category = categoryService.getCategory(categoryId);
		if (null == category) {
			return parameterNotSupportResponse("参数有误");
		}

		CategoryDto categoryDto = categoryConverter.poToDto(category);
		categoryDto.setReviewDeadline(date);

		Category newCategory = categoryConverter.dtoToPo(categoryDto);

		//转换为整形时间戳后可进行大小判断
		if (newCategory.getReviewDeadline() > category.getReviewDeadline()) {
			return parameterNotSupportResponse("时间只能提前");
		}

		boolean saveSuccess = categoryService.saveCategory(newCategory);
		if (!saveSuccess) {
			return systemErrResponse("修改失败");
		}
		Map<String, Object> data = getData();
		data.put("newCategory", newCategory);

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
					Double workload) {

		// 用户验证
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(REVIEWER.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		//审核人身份校验
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
	 * 提交工作量条目（存疑通过）
	 * PS.区分对于导入的工作量的文件提交动作,该动作由ItemExcelImport来执行完成
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "item-submit", method = POST)
	public RestResponse submitItems(
			@RequestParam("itemId")
					Integer itemId) {

		//todo 存疑通过状态到底是由审核人发出还是复核人发出。

		// 用户验证
		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}

		if(!DOUBTED.equals(item.getStatus())) {
			return invalidOperationResponse();
		}

		//修改item的状态为CHECKED 审核通过
		item.setStatus(DOUBTED_CHECKED);
		boolean saveSuccess = itemService.saveItem(item);
		if (!saveSuccess) {
			return systemErrResponse("保存失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);

	}
}
