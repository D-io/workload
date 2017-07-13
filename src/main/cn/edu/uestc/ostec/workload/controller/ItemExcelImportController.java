package cn.edu.uestc.ostec.workload.controller;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;

/**
 * Version:v1.0 (description: 导入excel中的item数据保存到数据库 )
 */

@RestController
@RequestMapping()
public class ItemExcelImportController extends ApplicationController {

	@Autowired
	private FileEvent fileEvent;

	/**
	 * 导入Excel中的信息到数据库
	 *
	 * @param fileInfoId 文件信息编号
	 * @return RestResponse
	 */
	public RestResponse importExcel(
			@RequestParam("fileInfoId")
					int fileInfoId) {

		Item item = null;

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
					item = new Item();
					HSSFCell itemName = row.getCell(0);
					HSSFCell categoryName = row.getCell(1);
				}
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return successResponse();
	}

}
