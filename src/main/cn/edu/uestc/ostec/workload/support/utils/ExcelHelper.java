package cn.edu.uestc.ostec.workload.support.utils;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;

public class ExcelHelper {

	public static HSSFCellStyle getTextStyle(HSSFWorkbook wb) {
		HSSFCellStyle textStyle = wb.createCellStyle();
		HSSFDataFormat format = wb.createDataFormat();
		textStyle.setDataFormat(format.getFormat("@"));
		return textStyle;
	}

	public static Cell createCell(Row row, HSSFCellStyle cellStyle, int index, String value) {
		Cell cell = row.createCell(index, CellType.STRING);
		cell.setCellStyle(cellStyle);
		cell.setCellValue(value);
		return cell;
	}

	public static void setAutoStyle(HSSFSheet sheet, int rowNumber) {
		for (int i = 0; i < rowNumber; i++) {
			sheet.autoSizeColumn(i);
		}
	}
}
