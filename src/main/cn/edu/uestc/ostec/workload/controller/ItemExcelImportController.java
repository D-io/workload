package cn.edu.uestc.ostec.workload.controller;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;

/**
 * Version:v1.0 (description: 导入excel中的item数据保存到数据库 )
 */

@RestController
@RequestMapping()
public class ItemExcelImportController extends ApplicationController {

	@Autowired
	private FileEvent fileEvent;

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemConverter itemConverter;

	/**
	 * 导入Excel中的信息到数据库
	 *
	 * @param fileInfoId 文件信息编号
	 * @return RestResponse
	 */
	public RestResponse importExcel(
			@RequestParam("categoryId")
					int categoryId,
			@RequestParam("fileInfoId")
					int fileInfoId) {

		//TODO 待测试

		ItemDto itemDto = null;
		List<ItemDto> itemDtoList = new ArrayList<>();

		Map<String,Object> data = getData();
		Map<String,Object> errorData = getData();

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
					HSSFCell itemName = row.getCell(0);
					HSSFCell categoryName = row.getCell(1);
					HSSFCell ownerId = row.getCell(2);
					HSSFCell ownerName = row.getCell(3);
					HSSFCell groupManagerId = row.getCell(4);
					HSSFCell jsonParameters = row.getCell(5);
					HSSFCell jobDesc = row.getCell(6);
					HSSFCell jsonChildWeight = row.getCell(7);

					itemDto.setItemName(itemName.getStringCellValue());
					itemDto.setCategoryName(categoryName.getStringCellValue());
					itemDto.setOwnerId(Integer.parseInt(ownerId.getStringCellValue()));
					itemDto.setTeacherName(ownerName.getStringCellValue());
					itemDto.setGroupManagerId(
							Integer.parseInt(groupManagerId.getStringCellValue()));
					itemDto.setJsonParameter(jsonParameters.getStringCellValue());
					itemDto.setJobDesc(jobDesc.getStringCellValue());
					itemDto.setJsonChildWeight(jsonChildWeight.getStringCellValue());

					itemDto.setCategoryId(categoryId);
					itemDto.setStatus(NON_CHECKED);

					boolean saveSuccess = itemService.saveItem(itemConverter.dtoToPo(itemDto));
					if(!saveSuccess) {
						errorData.put(itemDto.getItemName(),"导入失败");
					}

					itemDtoList.add(itemDto);
				}
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		data.put("itemDtoList",itemDtoList);
		data.put("errorData",errorData);

		return successResponse(data);
	}

}
