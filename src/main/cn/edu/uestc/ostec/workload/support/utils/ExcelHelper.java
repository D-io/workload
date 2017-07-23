package cn.edu.uestc.ostec.workload.support.utils;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;

public class ExcelHelper {

	public static HSSFCellStyle getTextStyle(HSSFWorkbook wb) {

		HSSFCellStyle textStyle = wb.createCellStyle();

		//设置居中
		textStyle.setAlignment(HorizontalAlignment.CENTER);
		textStyle.setVerticalAlignment(VerticalAlignment.CENTER);

		//设置字体
		HSSFFont font = wb.createFont();
		//设置字体大小
		font.setFontHeightInPoints((short)11);
		//设置字体名字
		font.setFontName("宋体");
		textStyle.setFont(font);

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

	public static void setAutoStyle(HSSFSheet sheet, int columnNumber) {
		for (int i = 0; i < columnNumber; i++) {
			//sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i,20*256);
		}
	}
}
