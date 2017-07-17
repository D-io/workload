package cn.edu.uestc.ostec.workload.controller;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ExportItemList;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.ExcelHelper;
import cn.edu.uestc.ostec.workload.type.ItemStatus;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.FILE_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
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
	private ItemConverter itemConverter;

	@Autowired
	private CategoryService categoryService;

	/**
	 * 导入Excel中的信息到数据库
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

		ItemDto itemDto = null;
		List<ItemDto> itemDtoList = new ArrayList<>();

		Category category = categoryService.getCategory(categoryId);
		if (null == category) {
			return invalidOperationResponse();
		}

		Map<String, Object> data = getData();
		Map<String, Object> errorData = getData();

		//获取对应FileInfo的文件File（java.io.file）对象
		FileInfo fileInfo = fileEvent.downloadFile(fileInfoId);
		File excelFile = new File(fileInfo.getPath());

		//获取文件流
		FileInputStream fileInputStream;
		try {
			fileInputStream = new FileInputStream(excelFile);
			//创建Excel工作簿
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(fileInputStream);
			//得到第一个工作表
			HSSFSheet sheet = null;
			HSSFRow row = null;

			//遍历工作簿中所有的表格
			for (int i = 0; i < hssfWorkbook.getNumberOfSheets(); i++) {
				sheet = hssfWorkbook.getSheetAt(i);
				if (null == sheet) {
					continue;
				}
				//遍历每一个表中所有的行
				for (int j = 1; j < sheet.getPhysicalNumberOfRows(); j++) {
					row = sheet.getRow(j);
					if (null == row) {
						continue;
					}
					itemDto = new ItemDto();

					//顺序由最终决定的模板决定
					HSSFCell itemName = row.getCell(ITEM_NAME_INDEX);
					//					HSSFCell categoryName = row.getCell(CATEGORY_NAME_INDEX);
					HSSFCell ownerId = row.getCell(OWNER_ID_INDEX);
					//					HSSFCell ownerName = row.getCell(OWNER_NAME_INDEX);
					HSSFCell groupManagerId = row.getCell(GROUP_MANAGER_INDEX);
					HSSFCell jsonParameters = row.getCell(JSON_PARAMETERS_INDEX);
					HSSFCell jobDesc = row.getCell(JOB_DESC_INDEX);
					HSSFCell jsonChildWeight = row.getCell(JSON_WEIGHT_INDEX);
					//					HSSFCell groupManagerName = row.getCell(GROUP_MANAGER_NAME_INDEX);

					itemDto.setItemName(itemName.getStringCellValue());
					//					itemDto.setCategoryName(categoryName.getStringCellValue());
					itemDto.setOwnerId(Integer.parseInt(ownerId.getStringCellValue()));
					//					itemDto.setTeacherName(ownerName.getStringCellValue());
					itemDto.setGroupManagerId(
							Integer.parseInt(groupManagerId.getStringCellValue()));
					//					itemDto.setGroupManagerName(groupManagerName.getStringCellValue());
					itemDto.setJsonParameter(jsonParameters.getStringCellValue());
					itemDto.setJobDesc(jobDesc.getStringCellValue());
					itemDto.setJsonChildWeight(jsonChildWeight.getStringCellValue());

					itemDto.setCategoryId(categoryId);
					itemDto.setStatus(NON_CHECKED);

					boolean saveSuccess = itemService.saveItem(itemConverter.dtoToPo(itemDto));
					if (!saveSuccess) {
						errorData.put(itemDto.getItemName(), "导入失败");
					}

					itemDtoList.add(itemDto);
				}
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		data.put("itemDtoList", itemDtoList);
		data.put("errorData", errorData);

		return successResponse(data);
	}

	/**
	 * 传参时候根据页面展示的数据进行导出
	 * eg. exportItemList.itemDtoList[0].itemName
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

}
