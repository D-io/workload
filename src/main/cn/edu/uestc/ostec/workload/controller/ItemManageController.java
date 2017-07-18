package cn.edu.uestc.ostec.workload.controller;

import org.apache.poi.poifs.property.Child;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.Savepoint;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.converter.impl.SubjectConverter;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.AdminService;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.FormulaCalculate;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.MANAGE_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DENIED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DOUBTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 工作量条目信息管理控制器 )
 */
@RestController
@RequestMapping(ITEM_PATH + MANAGE_PATH)
public class ItemManageController extends ApplicationController {

	@Autowired
	private AdminService adminService;

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
		int userId = getUserId();
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
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
	 * 删除Item信息(置为Disable状态)
	 * 只能删除  未提交的工作量信息 and 被拒绝的申请
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

		if (null != item) {
			data.put("item", itemConverter.poToDto(item));
		}

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
					Integer itemId) {

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

		item.setStatus(NON_CHECKED);
		boolean saveSuccess = itemService.saveItem(item);
		if (!saveSuccess) {
			return systemErrResponse("重新申请失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

		return successResponse(data);
	}

	/**
	 * 添加Item信息
	 *
	 * @param itemDto 工作量信息
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse addItem(ItemDto itemDto) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		if (null == itemDto) {
			return invalidOperationResponse("非法操作");
		}

		//根据登陆的用户设置相应的item信息中owner属性
		int teacherId = user.getUserId();
		itemDto.setOwnerId(teacherId);

		//设置对应的proof属性
		int importRequired = categoryService.getCategory(itemDto.getCategoryId())
				.getImportRequired();

		//判断是手动申报类还是系统导入类来决定proof的值
		if (APPLY_SELF.equals(importRequired)) {
			itemDto.setProof(null);
		} else {
			return invalidOperationResponse();
		}

		Map<String, Object> data = getData();

		//利用转换的方式获得相应的参数列表、职责描述列表和权重列表
		Item oldItem = itemConverter.dtoToPo(itemDto);
		ItemDto newItemDto = itemConverter.poToDto(oldItem);

		//TODO 根据参数和公式进行相应的工作量条目的工作量的计算 待测试
		Category category = categoryService.getCategory(itemDto.getCategoryId());
		//小组总的工作量或者个人的工作量结果
		double workload = FormulaCalculate
				.calculate(category.getFormula(), newItemDto.getParameterValues());

		List<Item> itemList = new ArrayList<>();
		List<ChildWeight> childWeightList = newItemDto.getChildWeightList();
		List<JobDesc> jobDescList = newItemDto.getJobDescList();
		if (GROUP.equals(newItemDto.getIsGroup())) {
			Item item = itemConverter.dtoToPo(itemDto);

			//对组员的工作量信息进行保存，分别计算工作量
			for (int index = 0; index < childWeightList.size(); index++) {
				int ownerId = childWeightList.get(index).getUserId();
				if (jobDescList.get(index).getUserId().equals(ownerId)) {
					//设置组员各自的工作量信息
					Item itemTemp = (Item) item.clone();
					itemTemp.setOwnerId(ownerId);
					itemTemp.setJobDesc(jobDescList.get(index).getJobDesc());
					double weight = childWeightList.get(index).getWeight();
					itemTemp.setJsonChildWeight(String.valueOf(weight));
					itemTemp.setStatus(UNCOMMITTED);

					//计算组员各自的工作量
					itemTemp.setWorkload(workload * weight);
					boolean saveSuccess = itemService.saveItem(itemTemp);
					if (!saveSuccess) {
						return systemErrResponse();
					}
					itemList.add(itemTemp);
				}
			}
			data.put("itemList",itemConverter.poListToDtoList(itemList));

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
				if (!saveSuccess) {
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
			if (!itemService.saveItem(item)) {
				return systemErrResponse("提交失败");
			}
		}

		Map<String, Object> data = getData();
		data.put("submittedItemList", itemConverter.poListToDtoList(itemList));

		return successResponse(data);
	}

	/**
	 * 更改需要复核的工作量条目状态
	 *
	 * @param itemId  工作量条目编号
	 * @param status  状态
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
