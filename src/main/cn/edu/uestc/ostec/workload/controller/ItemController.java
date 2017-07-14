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
import cn.edu.uestc.ostec.workload.dto.ItemDto;
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
import cn.edu.uestc.ostec.workload.type.OperatingStatusType;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.ITEM_PATH;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 工作量信息配置控制器 )
 */
@RestController
@RequestMapping(ITEM_PATH)
public class ItemController extends ApplicationController implements OperatingStatusType {

	@Autowired
	private AdminService adminService;

	@Autowired
	private ItemService itemService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private SubjectConverter subjectConverter;

	/**
	 * 添加Item信息
	 *
	 * @param itemDto 工作量信息
	 * @return RestResponse
	 */
	@RequestMapping(method = POST)
	public RestResponse addItem(ItemDto itemDto) {

		//TODO 根据参数和公式进行相应的工作量条目的工作量的计算

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

		Item item = itemConverter.dtoToPo(itemDto);
		item.setStatus(UNCOMMITTED);

		boolean saveSuccess = itemService.saveItem(item);
		if (!saveSuccess) {
			return systemErrResponse("保存失败");
		}

		Map<String, Object> data = getData();
		data.put("item", itemConverter.poToDto(item));

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
	 * 获取教师各自申报的工作量信息(Apply_Self)
	 * abnormalItemList：审核未通过的工作量条目（DENIED）
	 * normalItemList：审核通过和待审核的工作量条目（CHECKED,NON_CHECKED）
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "apply-list", method = GET)
	public RestResponse getTeacherApplyItems() {

		User user = getUser();
		System.out.println(user);

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//获取教师ID对应的两类状态的工作量对象（申报类）
		int teacherId = user.getUserId();
		List<ItemDto> abnormalItemList = findItemsByStatus(APPLY_SELF, DENIED, teacherId);
		List<ItemDto> normalItemList = findItems(APPLY_SELF, getNormalStatusList(), teacherId);

		//获取否定理由信息
		List<Subject> subjectList = new ArrayList<>();
		for (ItemDto item : abnormalItemList) {
			Subject subject = subjectService.getSubjectsByItem(item.getItemId()).get(ZERO_INT);
			subjectList.add(subject);
		}

		Map<String, Object> data = getData();
		data.put("abnormalItemList", abnormalItemList);
		data.put("normalItemList", normalItemList);
		data.put("subjectList", subjectConverter.poListToDtoList(subjectList));

		return successResponse(data);
	}

	/**
	 * 获取审核人导入的工作量信息(Excel_Import)
	 * abnormalItemList：存疑的工作量条目（存疑未解决，存疑已解决）DOUBTED,DOUBTED_CHECKED
	 * normalItemList：正常的工作量条目（尚未复核，未审核）
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "import-list", method = GET)
	public RestResponse getTeacherImportItems() {

		User user = getUser();
		System.out.println(user);

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		//获取教师ID对应的两类状态的工作量对象（导入类）
		int teacherId = user.getUserId();
		List<ItemDto> abnormalItemList = findItems(IMPORT_EXCEL, getAbnormalStatusList(),
				teacherId);
		List<ItemDto> normalItemList = findItems(IMPORT_EXCEL, getNormalStatusList(), teacherId);

		List<Subject> subjects = new ArrayList<>();
		for (ItemDto itemDto : abnormalItemList) {
			if (DOUBTED_CHECKED.equals(itemDto.getStatus())) {
				Subject subject = subjectService.getSubjectsByItem(itemDto.getItemId())
						.get(ZERO_INT);
				subjects.add(subject);
			}
		}

		Map<String, Object> data = getData();
		data.put("abnormalItemList", abnormalItemList);
		data.put("normalItemList", normalItemList);
		data.put("subjectList", subjectConverter.poListToDtoList(subjects));

		return successResponse(data);
	}

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
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("非法访问");
		}

		Item item = itemService.findItem(itemId);
		if (null == item) {
			return parameterNotSupportResponse("参数有误");
		}

		if (ROLE_REVIEWER.equals(role)) {
			item.setStatus(NON_CHECKED);
		} else if (ROLE_PROPOSER.equals(role)) {
			item.setStatus(UNCOMMITTED);
		} else {
			return parameterNotSupportResponse("参数有误");
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
	 * 个人工作量汇总统计
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "collection", method = GET)
	public RestResponse getAllItemDtoList() {

		User user = getUser();

		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int teacherId = user.getUserId();
		int workload = 0;

		List<Item> itemList = itemService.findItemsByStatus(CHECKED, teacherId);
		itemList.addAll(itemService.findItemsByCategory(DOUBTED_CHECKED, teacherId));
		for (Item item : itemList) {
			workload += item.getWorkload();
		}

		Map<String, Object> data = getData();
		data.put("itemDtoList", itemConverter.poListToDtoList(itemList));
		data.put("totalWorkload", workload);

		return successResponse(data);
	}

	/**
	 * 查找对应的老师的对应状态的对应导入方式的工作量条目信息
	 *
	 * @param importRequired 导入方式、申报方式
	 * @param status         状态
	 * @param teacherId      教师编号
	 * @return List<Item>
	 */
	public List<ItemDto> findItemsByStatus(Integer importRequired, Integer status,
			Integer teacherId) {

		List<ItemDto> itemDtoList = itemConverter
				.poListToDtoList(itemService.findItemsByStatus(status, teacherId));
		List<ItemDto> itemDtoGroup = new ArrayList<>();

		for (ItemDto itemDto : itemDtoList) {
			if (importRequired.equals(itemDto.getImportRequired())) {
				itemDtoGroup.add(itemDto);
			}
		}
		return itemDtoGroup;
	}

	/**
	 * 查找对应的老师的对应状态列表的对应导入方式的工作量条目信息
	 *
	 * @param importRequired 导入方式
	 * @param statusList     状态表
	 * @param teacherId      教师编号
	 * @return List<ItemDto>
	 */
	public List<ItemDto> findItems(Integer importRequired, List<Integer> statusList,
			Integer teacherId) {

		List<ItemDto> itemDtoList = new ArrayList<>();
		for (Integer status : statusList) {
			itemDtoList = findItemsByStatus(importRequired, status, teacherId);
		}

		return itemDtoList;
	}

}
