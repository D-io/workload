package cn.edu.uestc.ostec.workload.support.utils;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.TeacherWorkload;
import cn.edu.uestc.ostec.workload.type.ItemStatus;

/**
 * Version:v1.0 (description:  )
 */
public class ExcelExportHelper {

	public static byte[] exportItemInfo(List<ItemDto> itemDtoList) {

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

		for (int rowNum = 1; rowNum <= itemDtoList.size(); rowNum++) {
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
		ExcelHelper.setAutoStyle(sheet, 6);
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
		return fileContent;
	}

	public static byte[] exportTotalWorkload(List<TeacherWorkload> workloadList) {
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFCellStyle textStyle = ExcelHelper.getTextStyle(wb);

		HSSFSheet sheet = wb.createSheet(DateHelper.getDate());
		HSSFRow row = sheet.createRow(0);
		// 在excel表格中添加标题
		ExcelHelper.createCell(row, textStyle, 0, "教师编号");
		ExcelHelper.createCell(row, textStyle, 1, "教师姓名");
		ExcelHelper.createCell(row, textStyle, 2, "已通过工作量");
		ExcelHelper.createCell(row, textStyle, 3, "待审核/复核工作量");

		for (int rowNum = 1; rowNum <= workloadList.size(); rowNum++) {
			int index = rowNum - 1;
			String teacherId = workloadList.get(index).getTeacherId().toString();
			String teacherNameName = workloadList.get(index).getTeacherName();
			String checkedWorkload = workloadList.get(index).getCheckedWorkload().toString();
			String uncheckedWorkload = workloadList.get(index).getUncheckedWorkload().toString();
			row = sheet.createRow(rowNum);
			ExcelHelper.createCell(row, textStyle, 0, teacherId);
			ExcelHelper.createCell(row, textStyle, 1, teacherNameName);
			ExcelHelper.createCell(row, textStyle, 2, checkedWorkload);
			ExcelHelper.createCell(row, textStyle, 3, uncheckedWorkload);
		}

		ExcelHelper.setAutoStyle(sheet, 6);
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
		return fileContent;
	}

}
