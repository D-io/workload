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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.FormulaCalculate;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGE_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static cn.edu.uestc.ostec.workload.type.UserType.ADMINISTRATOR;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

//TODO 工作量计算抽象，便于导入时调用
//TODO 精简返回给前端页面的信息，减少数据量
//TODO 获取需要导出的信息的抽象，便于导出Excel时调用

/**
 * Version:v1.0 (description: 工作量条目信息管理控制器 )
 */
@RestController
@RequestMapping(ITEM_PATH + MANAGE_PATH)
public class ItemManageController extends ApplicationController {

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private SubjectConverter subjectConverter;

	@Autowired
	private FileEvent fileEvent;

	/**
	 * 重置申请人或者审核人状态
	 *
	 * @param role 角色信息 reviewer(审核人)或proposer(申请人)
	 * @return RestResponse
	 */
	@RequestMapping(value = "reset", method = POST)
	public RestResponse resetStatus(
			@RequestParam("itemId")
					Integer itemId,
			@RequestParam("role")
					String role) {
		//验证管理员身份
		User user = getUser();
		if (null == user || !getUserRoleCodeList().contains(ADMINISTRATOR.getCode())) {
			return invalidOperationResponse("非法请求");
		}

		Item item = itemService.findItem(itemId);
		ItemDto itemDto = itemConverter.poToDto(item);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}
		Integer status = itemDto.getImportRequired();

		if (ROLE_REVIEWER.equals(role) && APPLY_SELF.equals(status)) {
			item.setStatus(NON_CHECKED);
		} else if (ROLE_PROPOSER.equals(role) && IMPORT_EXCEL.equals(status)) {
			item.setStatus(DOUBTED);
		} else {
			item.setStatus(UNCOMMITTED);
		}

		boolean resetSuccess = itemService.saveItem(item);
		if (!resetSuccess) {
			return systemErrResponse("重置状态失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);
	}

	/**
	 * 删除Item信息(置为Disable状态) 只能删除  未提交的工作量信息 and 被拒绝的申请
	 *
	 * @param itemId 工作过量Id
	 * @return RestResponse
	 */
	@RequestMapping(method = DELETE)
	public RestResponse removeItem(
			@RequestParam(value = "itemId")
					Integer itemId) {

		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}

		boolean removeSuccess;
		if (UNCOMMITTED.equals(item.getStatus()) || DENIED.equals(item.getStatus())) {
			removeSuccess = itemService.removeItem(itemId);
		} else {
			return invalidOperationResponse("无法删除");
		}
		if (!removeSuccess) {
			return systemErrResponse("删除失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);
	}

	/**
	 * 重新申请被审核人否定的接口
	 *
	 * @param itemId 工作量条目编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "apply-again", method = POST)
	public RestResponse applyItemsAgain(
			@RequestParam("itemId")
					Integer itemId, ItemDto itemDto) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}
		int teacherId = user.getUserId();

		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}

		if (!item.getOwnerId().equals(teacherId)) {
			return invalidOperationResponse("非法请求");
		}

		// 截止时间限定
		Category category = categoryService.getCategory(item.getCategoryId());
		if (DateHelper.getCurrentTimestamp() > category.getApplyDeadline()) {
			return invalidOperationResponse("申请已经截止");
		}

		if (!DENIED.equals(item.getStatus())) {
			return parameterNotSupportResponse("无法重新申请");
		}

		//原条目删除
		item.setStatus(DELETED);

		//重新申请时新产生的对象
		itemDto.setItemId(null);
		itemDto.setStatus(NON_CHECKED);

		Item newItem = itemConverter.dtoToPo(itemDto);

		boolean saveSuccess = itemService.saveItem(newItem);
		if (!saveSuccess) {
			return systemErrResponse();
		}

		ItemDto newItemDto = itemConverter.poToDto(newItem);

		Map<String, Object> data = getData();
		data.put("newItemDto", newItemDto);

		return successResponse(data);
		//		item.setStatus(NON_CHECKED);
		//		boolean saveSuccess = itemService.saveItem(item);
		//		if (!saveSuccess) {
		//			return systemErrResponse("重新申请失败");
		//		}
		//
		//		Map<String, Object> data = getData();
		//		data.put("item", itemConverter.poToDto(item));
		//
		//		return successResponse(data);
	}

	/**
	 * 添加Item信息 & 修改Item信息
	 *
	 * @param itemDto 工作量信息
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse addItem(ItemDto itemDto, MultipartFile file, String option)
			throws IOException {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		if (null == itemDto) {
			return invalidOperationResponse("非法操作");
		}

		if ("modify".equals(option)) {
			if (NON_CHECKED.equals(itemDto.getStatus())) {
				return invalidOperationResponse("已提交的工作量，无法修改");
			}
		}

		//根据登陆的用户设置相应的item信息中owner属性
		int teacherId = user.getUserId();
		itemDto.setOwnerId(teacherId);

		//设置对应的proof属性
		int importRequired = categoryService.getCategory(itemDto.getCategoryId())
				.getImportRequired();

		Map<String, Object> data = getData();

		//判断是手动申报类还是系统导入类来决定proof的值
		if (APPLY_SELF.equals(importRequired) && null != file && !file.isEmpty()) {
			FileInfo fileInfo = new FileInfo(ATTACHMENT_FILE_ID, getUserId(), "");
			//TODO 文件的相关校验，可以抽象到ApplicationController中
			boolean uploadSuccess = fileEvent.uploadFile(file, fileInfo);
			if (!uploadSuccess) {
				data.put("errorData", "文件附件上传失败");
			}
			//考虑设置为文件信息编号，展示时不做文件信息展示，仅仅展示 查看附件
			itemDto.setProof(fileInfo.getFileInfoId());
		} else if (IMPORT_EXCEL.equals(importRequired)) {
			return invalidOperationResponse();
		}

		//利用转换的方式获得相应的参数列表、职责描述列表和权重列表
		Item oldItem = itemConverter.dtoToPo(itemDto);
		ItemDto newItemDto = itemConverter.poToDto(oldItem);

		Category category = categoryService.getCategory(itemDto.getCategoryId());
		//小组总的工作量或者个人的工作量结果
		double workload = FormulaCalculate
				.calculate(category.getFormula(), newItemDto.getParameterValues());

		if (GROUP.equals(newItemDto.getIsGroup())) {
			List<Item> itemList = new ArrayList<>();
			List<ChildWeight> childWeightList = newItemDto.getChildWeightList();
			List<JobDesc> jobDescList = newItemDto.getJobDescList();

			Item item = itemConverter.dtoToPo(itemDto);

			//对组员的工作量信息进行保存，分别计算工作量
			for (int index = 0; index < childWeightList.size(); index++) {
				int ownerId = childWeightList.get(index).getUserId();
				if (jobDescList.get(index).getUserId().equals(ownerId)) {
					//设置组员各自的工作量信息
					//克隆Item工作量条目，以克隆公共信息
					Item itemTemp = (Item) item.clone();
					itemTemp.setOwnerId(ownerId);
					itemTemp.setJobDesc(jobDescList.get(index).getJobDesc());
					double weight = childWeightList.get(index).getWeight();
					itemTemp.setJsonChildWeight(String.valueOf(weight));
					itemTemp.setStatus(UNCOMMITTED);

					//计算组员各自的工作量
					itemTemp.setWorkload(workload * weight);
					//保存成员老师的工作量条目到数据库中
					boolean saveSuccess = itemService.saveItem(itemTemp);
					if (!saveSuccess) {
						return systemErrResponse();
					}
					//用于返回前端的数据展示
					itemList.add(itemTemp);
				}
			}
			data.put("itemList", itemConverter.poListToDtoList(itemList));

		} else {
			newItemDto.setWorkload(workload);
			newItemDto.setStatus(UNCOMMITTED);
			Item item = itemConverter.dtoToPo(newItemDto);

			boolean saveSuccess = itemService.saveItem(item);
			if (!saveSuccess) {
				return systemErrResponse("保存失败");
			}
			newItemDto.setItemId(item.getItemId());
			data.put("item", newItemDto);
		}

		return successResponse(data);
	}

	/**
	 * 上传文件附件
	 *
	 * @param itemIdList 条目编号
	 * @param file       文件对象
	 * @return itemDto，fileInfo,errorData
	 */
	@RequestMapping(value = "file-proof", method = POST)
	public RestResponse uploadFileAsProof(MultipartFile file,
			@RequestParam("itemId")
					Integer... itemIdList) throws IOException {
		Map<String, Object> data = getData();

		FileInfo fileInfo = new FileInfo(ATTACHMENT_FILE_ID, getUserId(), "");
		if (null != file && !file.isEmpty()) {
			boolean uploadSuccess = fileEvent.uploadFile(file, fileInfo);
			if (!uploadSuccess) {
				data.put("errorData", "文件附件上传失败");
			}
		}

		for (Integer itemId : itemIdList) {
			Item item = itemService.findItem(itemId);
			if (null == item) {
				return parameterNotSupportResponse("参数有误");
			}

			if (!UNCOMMITTED.equals(item.getStatus())) {
				return invalidOperationResponse("无法上传附件");
			}

			//考虑设置为文件信息编号，展示时不做文件信息展示，仅仅展示 查看附件
			item.setProof(fileInfo.getFileInfoId());
			data.put("fileInfo", fileInfo);

			boolean saveSuccess = itemService.saveItem(item);
			if (!saveSuccess) {
				return systemErrResponse("保存失败");
			}

			data.put("itemDto", itemConverter.poToDto(item));
		}
		return successResponse(data);
	}

	/**
	 * 选择性提交工作量条目
	 *
	 * @param itemIdList 工作量条目列表
	 * @return RestResponse
	 */
	@RequestMapping(value = "public-selective", method = POST)
	public RestResponse submitItem(
			@RequestParam("itemId")
					Integer... itemIdList) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}
		int teacherId = user.getUserId();

		List<Item> itemList = new ArrayList<>();
		Map<String, Object> data = getData();
		Map<String, Object> errorData = getData();

		for (Integer itemId : itemIdList) {
			Item item = itemService.findItem(itemId);
			if (item.getOwnerId().equals(teacherId) && UNCOMMITTED.equals(item.getStatus())) {

				//申请截止时间限制
				Category category = categoryService.getCategory(item.getCategoryId());
				if (DateHelper.getCurrentTimestamp() > category.getApplyDeadline()) {
					errorData.put(item.getItemName(), "申请已经截止");
					continue;
				}

				//修改对应的item状态为提交（待审核）
				item.setStatus(NON_CHECKED);

				boolean saveSuccess = itemService.saveItem(item);

				boolean fileSubmitSuccess = fileEvent.submitFileInfo(item.getProof());
				if (!saveSuccess || !fileSubmitSuccess) {
					errorData.put(item.getItemName(), "提交失败");
				} else {
					item = itemService.findItem(itemId);
					itemList.add(item);
				}
			} else {
				errorData.put(item.getItemName(), "无法提交");
			}
		}

		data.put("itemList", itemConverter.poListToDtoList(itemList));
		data.put("errorData", errorData);

		return successResponse(data);
	}

	/**
	 * 提交对应的工作量（状态为未提交的工作量）
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "public", method = POST)
	public RestResponse submitItem() {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}
		int teacherId = user.getUserId();

		//根据教师编号查询对应的未提交状态的工作量
		List<Item> itemList = itemService.findItemsByStatus(UNCOMMITTED, teacherId);
		if (null == itemList) {
			return invalidOperationResponse("无可提交的项目");
		}

		Map<String, Object> errorData = getData();
		//修改Item状态为未审核态（提交态）
		for (Item item : itemList) {

			//申请截止时间限制
			Category category = categoryService.getCategory(item.getCategoryId());
			if (DateHelper.getCurrentTimestamp() > category.getApplyDeadline()) {
				errorData.put(item.getItemName(), "申请已经截止");
				continue;
			}

			item.setStatus(NON_CHECKED);
			boolean saveSuccess = itemService.saveItem(item);
			boolean submitSuccess = fileEvent.submitFileInfo(item.getProof());
			if (!saveSuccess || !submitSuccess) {
				errorData.put(item.getItemName(), "提交失败");
			}
		}

		Map<String, Object> data = getData();
		data.put("submittedItemList", itemConverter.poListToDtoList(itemList));
		data.put("errorData", errorData);

		return successResponse(data);
	}

	/**
	 * 更改需要复核的工作量条目状态
	 *
	 * @param itemId  工作量条目编号
	 * @param status  状态（存疑or通过）
	 * @param message 消息
	 * @return RestResponse
	 */
	@RequestMapping(value = "status-update", method = POST)
	public RestResponse updateItemStatus(
			@RequestParam("itemId")
					Integer itemId,
			@RequestParam("status")
					Integer status,
			@RequestParam(required = false)
					String message) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		Item item = itemService.findItem(itemId);
		if (!NON_CHECKED.equals(item.getStatus())) {
			return invalidOperationResponse();
		}

		if (!(DOUBTED.equals(status) || CHECKED.equals(status))) {
			return invalidOperationResponse();
		}

		Map<String, Object> data = getData();

		if (DOUBTED.equals(status)) {
			Subject subject = new Subject();
			subject.setItemId(itemId);
			subject.setSendTime(DateHelper.getCurrentTimestamp());
			subject.setSendFromId(user.getUserId());
			subject.setMsgContent(message);
			subjectService.addSubject(subject);
			data.put("subject", subjectConverter.poToDto(subject));
		}
		item.setStatus(status);
		boolean updateSuccess = itemService.saveItem(item);
		if (!updateSuccess) {
			return systemErrResponse("更新状态失败");
		}
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);
	}

}
