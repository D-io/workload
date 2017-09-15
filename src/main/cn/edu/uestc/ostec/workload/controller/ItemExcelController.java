/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */
package cn.edu.uestc.ostec.workload.controller;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.ExcelTemplateIndex;
import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.FormulaParameter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.dto.OtherJsonParameter;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.dto.Workload;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.FileInfoService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.TeacherService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.ExcelHelper;
import cn.edu.uestc.ostec.workload.support.utils.FileHelper;
import cn.edu.uestc.ostec.workload.support.utils.FormulaCalculate;
import cn.edu.uestc.ostec.workload.type.ItemStatus;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.FILE_PATH;
import static cn.edu.uestc.ostec.workload.support.utils.ObjectHelper.isNull;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static com.sun.corba.se.spi.activation.IIOP_CLEAR_TEXT.value;
import static org.apache.poi.ss.usermodel.Cell.CELL_TYPE_NUMERIC;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 导入excel中的item数据保存到数据库 )
 */

@RestController
@RequestMapping(FILE_PATH)
public class ItemExcelController extends ApplicationController implements ExcelTemplateIndex {

	//TODO 待优化

	@Autowired
	private ItemService itemService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private CategoryConverter categoryConverter;

	@Autowired
	private TeacherService teacherService;

	//	@Autowired
	//	private FileInfoService fileInfoService;

	/**
	 * 根据不同类目不同的类型生成不同的Excel模板文件
	 *
	 * @param categoryId 类目编号
	 * @param type       类型
	 * @return streamRestResponse 文件流
	 */
	@RequestMapping(value = "template", method = GET)
	public RestResponse getTemplate(
			@RequestParam("categoryId")
					Integer categoryId,
			@RequestParam("type")
					String type) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		Category category = categoryService.getCategory(categoryId, getCurrentSemester());
		CategoryDto categoryDto = categoryConverter.poToDto(category);
		List<FormulaParameter> parameterList = categoryDto.getFormulaParameterList();
		List<OtherJsonParameter> otherJsonParameterList = categoryDto.getOtherJsonParameters();

		String excelTypeName = "（个人）";

		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFCellStyle textStyle = ExcelHelper.getTextStyle(wb);

		HSSFSheet sheet = wb.createSheet(DateHelper.getDate());
		HSSFRow row = sheet.createRow(0);
		// 在excel表格中添加标题
		ExcelHelper.createCell(row, textStyle, 0, "教师编号");
		ExcelHelper.createCell(row, textStyle, 1, "教师姓名");
		ExcelHelper.createCell(row, textStyle, 2, "工作量名称");
		ExcelHelper.createCell(row, textStyle, 3, "职责描述");
		int index = 4;
		if (null != parameterList) {
			for (FormulaParameter formulaParameter : parameterList) {
				ExcelHelper.createCell(row, textStyle, index,
						formulaParameter.getDesc() + formulaParameter.getSymbol());
				index++;
			}
		}

		if (null != otherJsonParameterList) {
			for (OtherJsonParameter otherJsonParameter : otherJsonParameterList) {
				ExcelHelper.createCell(row, textStyle, index, otherJsonParameter.getKey());
				index++;
			}
		}

		if ("group".equals(type)) {
			ExcelHelper.createCell(row, textStyle, index, "团队负责人编号");
			ExcelHelper.createCell(row, textStyle, index + 1, "团队负责人姓名");
			ExcelHelper.createCell(row, textStyle, index + 2, "所占权重");
			excelTypeName = "（小组）";
		}

		ExcelHelper.setAutoStyle(sheet, index + 3);
		ByteArrayOutputStream os = null;
		os = new ByteArrayOutputStream();
		try {
			wb.write(os);
			os.close();
			wb.close();
		} catch (IOException e) {
			// TODO do something useful
		}

		byte[] fileContent = os.toByteArray();
		try {
			return streamResponse(fileContent,
					getCurrentSemester() + category.getName() + "工作量导入模板" + excelTypeName + ".xls");
		} catch (IOException e) {
			e.printStackTrace();
			return systemErrResponse();
		}
	}

	/**
	 * 根据不同类目对应的模板文件进行导入
	 *
	 * @param categoryId 类目编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "import", method = POST)
	@SuppressWarnings("deprecation")
	public RestResponse importByTemplate(
			@RequestParam("categoryId")
					int categoryId,
			@RequestParam("file")
					MultipartFile file) {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		if (isNull(file)) {
			return invalidOperationResponse();
		}

		String fileNameExtension = FileHelper.getFileExtension(file.getOriginalFilename());
		if("xls".equals(fileNameExtension) || "xlsx".equals(fileNameExtension)) {
			return invalidOperationResponse("无法上传，请检查文件格式！");
		}
		Map<String, Object> data = getData();

		Item item = null;
		List<Item> itemList = new ArrayList<>();
		//		List<ItemBrief> itemBriefList = new ArrayList<>();
		List<Item> itemGroupList = new ArrayList<>();
		Integer parentId = ZERO_INT;
		List<Item> itemMemberList = new ArrayList<>();

		Category category = categoryService.getCategory(categoryId, getCurrentSemester());
		if (null == category) {
			return invalidOperationResponse();
		}
		if (DateHelper.getCurrentTimestamp() > category.getApplyDeadline()) {
			return invalidOperationResponse("上传已经截止");
		}

		CategoryDto categoryDto = categoryConverter.poToDto(category);

		StringBuilder errorData = new StringBuilder();

		try {

			//版本不同创建不同的工作簿
			Workbook book = null;
			try {
				book = new XSSFWorkbook(file.getInputStream());
			} catch (Exception ex) {
				book = new HSSFWorkbook(file.getInputStream());
			}

			//得到第一个工作表
			Sheet sheet = null;
			Row row = null;

			//遍历工作簿中所有的表格
			for (int i = 0; i < book.getNumberOfSheets(); i++) {
				sheet = book.getSheetAt(i);
				if (null == sheet) {
					continue;
				}

				//遍历每一个表中所有的行
				for (int j = 1; j < sheet.getPhysicalNumberOfRows(); j++) {
					row = sheet.getRow(j);
					if (null == row) {
						continue;
					}
					item = new Item();

					//顺序由最终决定的模板决定
					Cell itemName = row.getCell(T_ITEM_NAME_INDEX);
					item.setItemName(itemName.getStringCellValue());

					Cell ownerId = row.getCell(T_TEACHER_ID_INDEX);
					int teacherId = ((Double) ownerId.getNumericCellValue()).intValue();
					item.setOwnerId(teacherId);

					Cell jobDesc = row.getCell(T_JOB_DESC_INDEX);
					item.setJobDesc(jobDesc.getStringCellValue());
					item.setApplyDesc(jobDesc.getStringCellValue());

					List<ParameterValue> parameterValues = new ArrayList<>();
					int index = T_JOB_DESC_INDEX + 1;
					if (null != categoryDto.getFormulaParameterList()) {
						for (FormulaParameter formulaParameter : categoryDto
								.getFormulaParameterList()) {
							Cell cell = row.getCell(index);
							double value = cell.getNumericCellValue();
							ParameterValue parameterValue = new ParameterValue(
									formulaParameter.getSymbol(), value);
							parameterValues.add(parameterValue);
							index++;
						}
					}

					List<OtherJsonParameter> otherJsonParameterList = new ArrayList<>();
					if (!isEmptyList(categoryDto.getOtherJsonParameters())) {
						for (OtherJsonParameter otherJsonParameter : categoryDto
								.getOtherJsonParameters()) {
							Cell cell = row.getCell(index);

							String value = null;
							if (CELL_TYPE_NUMERIC == cell.getCellType()) {
								value = Double.valueOf(cell.getNumericCellValue()).toString();
							} else {
								value = cell.getStringCellValue();
							}
							OtherJsonParameter otherJson = new OtherJsonParameter(
									otherJsonParameter.getKey(), value);
							otherJsonParameterList.add(otherJson);
							index++;
						}
					}

					Cell groupManagerId = row.getCell(index);
					int managerId = (null == groupManagerId ?
							teacherId :
							((Double) groupManagerId.getNumericCellValue()).intValue());
					item.setGroupManagerId(managerId);

					Cell weight = row.getCell(index + 2);
					String childWeight = (null == weight ?
							"1" :
							((Double) weight.getNumericCellValue()).toString());
					item.setJsonChildWeight(childWeight);

					if (null == groupManagerId && null == weight) {
						item.setIsGroup(SINGLE);
					} else {
						item.setIsGroup(GROUP);
					}

					//文件信息编号对应为该条目的proof
					item.setProof(null);
					item.setCategoryId(categoryId);
					item.setStatus(UNCOMMITTED);

					//计算workload(先获取公式对应的参数)
					double totalWorkload = FormulaCalculate
							.calculate(category.getFormula(), parameterValues);
					totalWorkload = totalWorkload > category.getLimitWorkload() ?
							category.getLimitWorkload() :
							totalWorkload;
					double personalWeight = Double.valueOf(item.getJsonChildWeight());
					double workload = totalWorkload * personalWeight;

					//工作量四舍五入获取两位小数
					BigDecimal b = new BigDecimal(workload);
					double formatWorkload = b.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
					item.setWorkload(formatWorkload);

					item.setJsonParameter(OBJECT_MAPPER.writeValueAsString(parameterValues));
					item.setOtherJson(OBJECT_MAPPER.writeValueAsString(otherJsonParameterList));

					//					//把权重仍然按照json格式写回数据库，防止转换过程中出现问题
					//					item.setJsonChildWeight(OBJECT_MAPPER
					//							.writeValueAsString(new ChildWeight(teacherId, personalWeight)));
					//					//职责描述同理
					//					item.setJobDesc(OBJECT_MAPPER
					//							.writeValueAsString(new JobDesc(teacherId, item.getJobDesc())));

					itemGroupList.add(item);

				}

				if (!isEmptyList(itemGroupList)) {
					for (Item itemTemp : itemGroupList) {
						if (GROUP.equals(itemTemp.getIsGroup())) {
							if (itemTemp.getOwnerId().equals(itemTemp.getGroupManagerId())) {
								itemService.saveItem(itemTemp);
								parentId = itemTemp.getItemId();
							} else {
								itemMemberList.add(itemTemp);
							}
							continue;
						} else {
							itemService.saveItem(itemTemp);
							itemList.add(itemTemp);
						}
					}
				}
				if (!isEmptyList(itemMemberList)) {
					for (Item itemTemp : itemMemberList) {
						itemTemp.setParentId(parentId);
						boolean saveSuccess = itemService.saveItem(itemTemp);
						if (!saveSuccess) {
							errorData.append(itemTemp.getItemName() + "导入失败。");
							continue;
						}
					}
					itemList.add(itemConverter.generateGroupItem(parentId, getCurrentSemester()));
				}
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		data.put("itemList", itemConverter.poListToDtoList(itemList));
		data.put("errorData", errorData);

		return successResponse(data);
	}

	//	/**
	//	 * 将Item信息做转换
	//	 */
	//	public ItemBrief itemToBrief(Item item) {
	//
	//		ItemBrief itemBrief = new ItemBrief();
	//		itemBrief.setCategoryId(item.getCategoryId());
	//		itemBrief.setGroupManagerId(item.getGroupManagerId());
	//		itemBrief.setGroupManagerName(
	//				teacherService.findTeacherNameById(itemBrief.getGroupManagerId()));
	//		itemBrief.setIsGroup(item.getIsGroup());
	//		itemBrief.setOwnerId(item.getOwnerId());
	//		itemBrief.setOwnerName(teacherService.findTeacherNameById(itemBrief.getOwnerId()));
	//		itemBrief.setItemId(item.getItemId());
	//
	//		itemBrief.setItemName(item.getItemName());
	//		itemBrief.setStatus(item.getStatus());
	//		itemBrief.setProof(item.getProof());
	//
	//		itemBrief.setJobDesc(item.getJobDesc());
	//		itemBrief.setWeight(item.getJsonChildWeight());
	//
	//		itemBrief.setJsonParameter(item.getJsonParameter());
	//		itemBrief.setWorkload(item.getWorkload());
	//
	//		itemBrief.setCategoryName(
	//				categoryService.getCategory(itemBrief.getCategoryId(), getCurrentSemester())
	//						.getName());
	//		itemBrief.setOtherJson(item.getOtherJson());
	//
	//		return itemBrief;
	//
	//	}
	//
	//	public Item briefToItem() {
	//		Item item = new Item();
	//		return item;
	//	}
	//
	//	class ItemBrief {
	//
	//		/**
	//		 * 工作量编号
	//		 */
	//		private Integer itemId;
	//
	//		/**
	//		 * 工作量对应的项目名称
	//		 */
	//		private String itemName;
	//
	//		/**
	//		 * 工作量类目编号，确定工作量所属类目
	//		 */
	//		private Integer categoryId;
	//
	//		/**
	//		 * 工作量类目名称
	//		 */
	//		private String categoryName;
	//
	//		/**
	//		 * 所属人编号，与教师表中工号一致
	//		 */
	//		private Integer ownerId;
	//
	//		/**
	//		 * 工作量条目所属人姓名
	//		 */
	//		private String ownerName;
	//
	//		/**
	//		 * 参数以json格式存储，与类目表公式中参数一致，如{A：40}
	//		 */
	//		private String jsonParameter;
	//
	//		/**
	//		 * 根据参数计算出的当前总的工作量
	//		 */
	//		private Double workload;
	//
	//		/**
	//		 * 组长编号，默认当前申请人为组长。当前登录人编号与此字段一致时，方可进行工作量的修改操作
	//		 */
	//		private Integer groupManagerId;
	//
	//		/**
	//		 * 组长姓名
	//		 */
	//		private String groupManagerName;
	//
	//		/**
	//		 * 工作描述
	//		 */
	//		private String jobDesc = null;
	//
	//		/**
	//		 * 状态
	//		 */
	//		private Integer status;
	//
	//		/**
	//		 * Json格式存储组员权重，用于计算个人工作量，存储如：{组员1编号：0.4}
	//		 */
	//		private String weight;
	//
	//		/**
	//		 * 证明
	//		 */
	//		private Integer proof = null;
	//
	//		/**
	//		 * 是否为小组
	//		 */
	//		private Integer isGroup = ZERO_INT;
	//
	//		private String otherJson = null;
	//
	//		public String getOtherJson() {
	//			return otherJson;
	//		}
	//
	//		public void setOtherJson(String otherJson) {
	//			this.otherJson = otherJson;
	//		}
	//
	//		public Integer getItemId() {
	//			return itemId;
	//		}
	//
	//		public void setItemId(Integer itemId) {
	//			this.itemId = itemId;
	//		}
	//
	//		public String getItemName() {
	//			return itemName;
	//		}
	//
	//		public void setItemName(String itemName) {
	//			this.itemName = itemName;
	//		}
	//
	//		public Integer getCategoryId() {
	//			return categoryId;
	//		}
	//
	//		public void setCategoryId(Integer categoryId) {
	//			this.categoryId = categoryId;
	//		}
	//
	//		public Integer getOwnerId() {
	//			return ownerId;
	//		}
	//
	//		public void setOwnerId(Integer ownerId) {
	//			this.ownerId = ownerId;
	//		}
	//
	//		public String getOwnerName() {
	//			return ownerName;
	//		}
	//
	//		public void setOwnerName(String ownerName) {
	//			this.ownerName = ownerName;
	//		}
	//
	//		public String getJsonParameter() {
	//			return jsonParameter;
	//		}
	//
	//		public void setJsonParameter(String jsonParameter) {
	//			this.jsonParameter = jsonParameter;
	//		}
	//
	//		public Double getWorkload() {
	//			return workload;
	//		}
	//
	//		public void setWorkload(Double workload) {
	//			this.workload = workload;
	//		}
	//
	//		public Integer getGroupManagerId() {
	//			return groupManagerId;
	//		}
	//
	//		public void setGroupManagerId(Integer groupManagerId) {
	//			this.groupManagerId = groupManagerId;
	//		}
	//
	//		public String getGroupManagerName() {
	//			return groupManagerName;
	//		}
	//
	//		public void setGroupManagerName(String groupManagerName) {
	//			this.groupManagerName = groupManagerName;
	//		}
	//
	//		public String getJobDesc() {
	//			return jobDesc;
	//		}
	//
	//		public void setJobDesc(String jobDesc) {
	//			this.jobDesc = jobDesc;
	//		}
	//
	//		public Integer getStatus() {
	//			return status;
	//		}
	//
	//		public void setStatus(Integer status) {
	//			this.status = status;
	//		}
	//
	//		public String getWeight() {
	//			return weight;
	//		}
	//
	//		public void setWeight(String weight) {
	//			this.weight = weight;
	//		}
	//
	//		public Integer getProof() {
	//			return proof;
	//		}
	//
	//		public void setProof(Integer proof) {
	//			this.proof = proof;
	//		}
	//
	//		public Integer getIsGroup() {
	//			return isGroup;
	//		}
	//
	//		public void setIsGroup(Integer isGroup) {
	//			this.isGroup = isGroup;
	//		}
	//
	//		public String getCategoryName() {
	//			return categoryName;
	//		}
	//
	//		public void setCategoryName(String categoryName) {
	//			this.categoryName = categoryName;
	//		}
	//	}

}
