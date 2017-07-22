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

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.ExcelTemplateIndex;
import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.dto.ExportItemList;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.event.FileEvent;
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
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Version:v1.0 (description: 导入excel中的item数据保存到数据库 )
 */

@RestController
@RequestMapping(FILE_PATH)
public class ItemExcelController extends ApplicationController implements ExcelTemplateIndex {

	@Autowired
	private FileEvent fileEvent;

	@Autowired
	private ItemService itemService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private TeacherService teacherService;

	@Autowired
	private FileInfoService fileInfoService;

	/**
	 * 导入Excel中的信息到数据库 （提交文件）
	 *
	 * 先上传文件，提交文件之后进行Excel的信息导入数据库的操作
	 *
	 * PS.导入的格式待确定 格式不同对应的计算方式不同
	 *
	 * @param fileInfoId 文件信息编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "import", method = POST)
	public RestResponse importExcel(
			@RequestParam("categoryId")
					int categoryId,
			@RequestParam("fileInfoId")
					int fileInfoId) {

		//TODO 待测试
		FileInfo fileInfo = fileInfoService.getFileInfo(fileInfoId);
		if (isNull(fileInfo)) {
			return invalidOperationResponse();
		}

		if (UNCOMMITTED.equals(fileInfo.getStatus())) {
			return invalidOperationResponse("无法提交");
		}

		fileInfo.setStatus(SUBMITTED);
		boolean submitSuccess = fileInfoService.saveFileInfo(fileInfo);
		if (!submitSuccess) {
			return systemErrResponse("文件上传失败");
		}

		Map<String, Object> data = getData();
		data.put("fileInfo", fileInfo);


		Item item = null;
		List<Item> itemList = new ArrayList<>();
		List<ItemBrief> itemBriefList = new ArrayList<>();

		Category category = categoryService.getCategory(categoryId);
		if (null == category) {
			return invalidOperationResponse();
		}

		Map<String, Object> errorData = getData();

		//获取对应FileInfo的文件File（java.io.file）对象
		String path = fileInfo.getPath();
		File excelFile = new File(path);

		//文件名用作Item的proof属性
		String fileName = FileHelper.getFileName(path);

		//获取文件流
		FileInputStream fileInputStream;
		try {
			fileInputStream = new FileInputStream(excelFile);

			//版本不同创建不同的工作簿
			Workbook book = null;
			try {
				book = new XSSFWorkbook(excelFile);
			} catch (Exception ex) {
				book = new HSSFWorkbook(fileInputStream);
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
					Cell itemName = row.getCell(ITEM_NAME_INDEX);
					//					HSSFCell categoryName = row.getCell(CATEGORY_NAME_INDEX);
					Cell ownerId = row.getCell(OWNER_ID_INDEX);
					//					HSSFCell ownerName = row.getCell(OWNER_NAME_INDEX);
					Cell groupManagerId = row.getCell(GROUP_MANAGER_INDEX);
					Cell jsonParameters = row.getCell(JSON_PARAMETERS_INDEX);
					Cell jobDesc = row.getCell(JOB_DESC_INDEX);
					Cell jsonChildWeight = row.getCell(JSON_WEIGHT_INDEX);
					Cell isGroup = row.getCell(IS_GROUP_INDEX);
					//					HSSFCell groupManagerName = row.getCell(GROUP_MANAGER_NAME_INDEX);

					item.setItemName(itemName.getStringCellValue());
					//					itemDto.setCategoryName(categoryName.getStringCellValue());
					item.setOwnerId(((Double)ownerId.getNumericCellValue()).intValue());
					//					itemDto.setTeacherName(ownerName.getStringCellValue());
					item.setGroupManagerId(((Double)groupManagerId.getNumericCellValue()).intValue());
					//					itemDto.setGroupManagerName(groupManagerName.getStringCellValue());
					item.setJsonParameter(jsonParameters.getStringCellValue());
					item.setJobDesc(jobDesc.getStringCellValue());
					item.setJsonChildWeight(((Double)jsonChildWeight.getNumericCellValue()).toString());
					item.setIsGroup(((Double)isGroup.getNumericCellValue()).intValue());

					item.setProof(fileName);
					item.setCategoryId(categoryId);
					item.setStatus(NON_CHECKED);

					//计算workload(先获取公式对应的参数)
					List<ParameterValue> parameterValues = getParams(item.getJsonParameter());
					double totalWorkload = FormulaCalculate
							.calculate(category.getFormula(), parameterValues);
					double childWeight = Double.valueOf(item.getJsonChildWeight());
					double workload = totalWorkload * childWeight;
					item.setWorkload(workload);

					//保存时相应的生成Item的编号
					boolean saveSuccess = itemService.saveItem(item);
					if (!saveSuccess) {
						errorData.put(item.getItemName(), "导入失败");
					}

					ItemBrief itemBrief = itemToBrief(item);
					itemBriefList.add(itemBrief);

					itemList.add(item);
				}
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		data.put("itemList", itemList);
		data.put("errorData", errorData);

		return successResponse(data);
	}

	/**
	 * 传参时候根据页面展示的数据进行导出 eg. exportItemList.itemDtoList[0].itemName
	 *
	 * @param exportItemList 页面展示的数据
	 * @return RestResponse
	 */
	@RequestMapping(value = "export", method = GET)
	public RestResponse exportExcel(ExportItemList exportItemList) throws IOException {

		User user = getUser();
		if (null == user) {
			return invalidOperationResponse("非法请求");
		}

		int userId = user.getUserId();

		List<ItemDto> itemDtoList = exportItemList.getItemDtoList();

		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFCellStyle textStyle = ExcelHelper.getTextStyle(wb);

		HSSFSheet sheet = wb.createSheet(DateHelper.getDate());
		HSSFRow row = sheet.createRow(0);
		// 在excel表格中添加标题
		ExcelHelper.createCell(row, textStyle, 0, "教师编号");
		ExcelHelper.createCell(row, textStyle, 1, "教师姓名");
		ExcelHelper.createCell(row, textStyle, 2, "工作量类型");
		ExcelHelper.createCell(row, textStyle, 3, "工作量名称");
		ExcelHelper.createCell(row, textStyle, 4, "工作量");
		ExcelHelper.createCell(row, textStyle, 5, "状态");

		for (int rowNum = 1; rowNum < itemDtoList.size(); rowNum++) {
			int index = rowNum - 1;
			String teacherId = itemDtoList.get(index).getOwnerId().toString();
			String teacherNameName = itemDtoList.get(index).getTeacherName();
			String categoryName = itemDtoList.get(index).getCategoryName();
			String itemName = itemDtoList.get(index).getItemName();
			String workload = itemDtoList.get(index).getWorkload().toString();
			String status = ItemStatus.getItemStatus(itemDtoList.get(index).getStatus()).getDesc();
			row = sheet.createRow(rowNum);
			ExcelHelper.createCell(row, textStyle, 0, teacherId);
			ExcelHelper.createCell(row, textStyle, 1, teacherNameName);
			ExcelHelper.createCell(row, textStyle, 2, categoryName);
			ExcelHelper.createCell(row, textStyle, 3, itemName);
			ExcelHelper.createCell(row, textStyle, 4, workload);
			ExcelHelper.createCell(row, textStyle, 5, status);
		}
		ExcelHelper.setAutoStyle(sheet, itemDtoList.size() + 1);
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

		return streamResponse(fileContent, userId + ".xsl");
	}

	public static List<ParameterValue> getParams(String str) {
		List<ParameterValue> parameterValues = new ArrayList<>();
		String[] params = str.split(",");
		for (String param : params) {
			String[] values = param.split(":");
			ParameterValue parameterValue = new ParameterValue(values[0],
					Double.valueOf(values[1]));
			parameterValues.add(parameterValue);
		}
		return parameterValues;
	}

//	public static void main(String[] args) {
//		System.out.println(getParams("A:12,B:12"));
//	}

	/**
	 * 将Item信息做转换
	 */
	public ItemBrief itemToBrief(Item item) {

		ItemBrief itemBrief = new ItemBrief();
		itemBrief.setCategoryId(item.getCategoryId());
		itemBrief.setGroupManagerId(item.getGroupManagerId());
		itemBrief.setGroupManagerName(
				teacherService.findTeacherNameById(itemBrief.getGroupManagerId()));
		itemBrief.setIsGroup(item.getIsGroup());
		itemBrief.setOwnerId(item.getOwnerId());
		itemBrief.setOwnerName(teacherService.findTeacherNameById(itemBrief.getOwnerId()));
		itemBrief.setItemId(item.getItemId());

		itemBrief.setItemName(item.getItemName());
		itemBrief.setStatus(item.getStatus());
		itemBrief.setProof(item.getProof());

		itemBrief.setJobDesc(item.getJobDesc());
		itemBrief.setWeight(item.getJsonChildWeight());

		itemBrief.setJsonParameter(item.getJsonParameter());
		itemBrief.setWorkload(item.getWorkload());

		return itemBrief;

	}

	public Item briefToItem() {
		Item item = new Item();
		return item;
	}

	class ItemBrief {

		/**
		 * 工作量编号
		 */
		private Integer itemId;

		/**
		 * 工作量对应的项目名称
		 */
		private String itemName;

		/**
		 * 工作量类目编号，确定工作量所属类目
		 */
		private Integer categoryId;

		/**
		 * 所属人编号，与教师表中工号一致
		 */
		private Integer ownerId;

		private String ownerName;

		/**
		 * 参数以json格式存储，与类目表公式中参数一致，如{A：40}
		 */
		private String jsonParameter;

		/**
		 * 根据参数计算出的当前总的工作量
		 */
		private Double workload;

		/**
		 * 组长编号，默认当前申请人为组长。当前登录人编号与此字段一致时，方可进行工作量的修改操作
		 */
		private Integer groupManagerId;

		private String groupManagerName;

		/**
		 * 工作描述
		 */
		private String jobDesc = null;

		/**
		 * 状态
		 */
		private Integer status;

		/**
		 * Json格式存储组员权重，用于计算个人工作量，存储如：{组员1编号：0.4}
		 */
		private String weight;

		/**
		 * 证明
		 */
		private String proof = null;

		/**
		 * 是否为小组
		 */
		private Integer isGroup = ZERO_INT;

		public Integer getItemId() {
			return itemId;
		}

		public void setItemId(Integer itemId) {
			this.itemId = itemId;
		}

		public String getItemName() {
			return itemName;
		}

		public void setItemName(String itemName) {
			this.itemName = itemName;
		}

		public Integer getCategoryId() {
			return categoryId;
		}

		public void setCategoryId(Integer categoryId) {
			this.categoryId = categoryId;
		}

		public Integer getOwnerId() {
			return ownerId;
		}

		public void setOwnerId(Integer ownerId) {
			this.ownerId = ownerId;
		}

		public String getOwnerName() {
			return ownerName;
		}

		public void setOwnerName(String ownerName) {
			this.ownerName = ownerName;
		}

		public String getJsonParameter() {
			return jsonParameter;
		}

		public void setJsonParameter(String jsonParameter) {
			this.jsonParameter = jsonParameter;
		}

		public Double getWorkload() {
			return workload;
		}

		public void setWorkload(Double workload) {
			this.workload = workload;
		}

		public Integer getGroupManagerId() {
			return groupManagerId;
		}

		public void setGroupManagerId(Integer groupManagerId) {
			this.groupManagerId = groupManagerId;
		}

		public String getGroupManagerName() {
			return groupManagerName;
		}

		public void setGroupManagerName(String groupManagerName) {
			this.groupManagerName = groupManagerName;
		}

		public String getJobDesc() {
			return jobDesc;
		}

		public void setJobDesc(String jobDesc) {
			this.jobDesc = jobDesc;
		}

		public Integer getStatus() {
			return status;
		}

		public void setStatus(Integer status) {
			this.status = status;
		}

		public String getWeight() {
			return weight;
		}

		public void setWeight(String weight) {
			this.weight = weight;
		}

		public String getProof() {
			return proof;
		}

		public void setProof(String proof) {
			this.proof = proof;
		}

		public Integer getIsGroup() {
			return isGroup;
		}

		public void setIsGroup(Integer isGroup) {
			this.isGroup = isGroup;
		}
	}

}
