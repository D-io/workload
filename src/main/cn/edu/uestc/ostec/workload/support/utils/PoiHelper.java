package cn.edu.uestc.ostec.workload.support.utils;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;

/**
 * Description: excel、word等office工具类
 */
public class PoiHelper {

	/**
	 * 判断cell是否为空
	 * @param cellNum 号编号
	 * @param cell 单元格
	 * @param row 列编号
	 * @return 单元格
	 */
	public static HSSFCell isCellNull(int cellNum, HSSFCell cell, HSSFRow row, HSSFCellStyle cellStyle) {
		if (cell == null) {
			cell = row.createCell(cellNum);
		}

		cell.setCellStyle(cellStyle);
		return cell;
	}

	/**
	 * 列数据信息单元格样式
	 * @param workbook
	 * @return
	 */
	public static HSSFCellStyle getExcelStyle(HSSFWorkbook workbook) {
		// 设置字体
		HSSFFont font = workbook.createFont();
		//设置字体大小
		font.setFontHeightInPoints((short)18);
		//设置字体名字
		font.setFontName("Courier New");
		//设置样式;
		HSSFCellStyle style = workbook.createCellStyle();
		//设置底边框;
		style.setBorderBottom(BorderStyle.DASH_DOT);
		//设置底边框颜色;
		style.setBottomBorderColor(HSSFColor.BLACK.index);
		//设置左边框;
		style.setBorderLeft(BorderStyle.THIN);
		//设置左边框颜色;
		style.setLeftBorderColor(HSSFColor.BLACK.index);
		//设置右边框;
		style.setBorderRight(BorderStyle.THIN);
		//设置右边框颜色;
		style.setRightBorderColor(HSSFColor.BLACK.index);
		//设置顶边框;
		style.setBorderTop(BorderStyle.THIN);
		//设置顶边框颜色;
		style.setTopBorderColor(HSSFColor.BLACK.index);
		//在样式用应用设置的字体;
		style.setFont(font);
		//设置自动换行;
		style.setWrapText(false);
		//设置水平对齐的样式为居中对齐;
		style.setAlignment(HorizontalAlignment.CENTER);
		//设置垂直对齐的样式为居中对齐;
		style.setVerticalAlignment(VerticalAlignment.CENTER);



		return style;

	}

	/**
	 * 列头单元格样式
	 * @param workbook
	 * @return
	 */
	public static HSSFCellStyle getExcelColumnTopStyle(HSSFWorkbook workbook) {

		// 设置字体
		HSSFFont font = workbook.createFont();
		//设置字体大小
		font.setFontHeightInPoints((short)19);
		//字体加粗
		font.setBold(true);
		//设置字体名字
		font.setFontName("Courier New");
		//设置样式;
		HSSFCellStyle style = workbook.createCellStyle();
		//设置底边框;
		style.setBorderBottom(BorderStyle.THIN);
		//设置底边框颜色;
		style.setBottomBorderColor(HSSFColor.BLACK.index);
		//设置左边框;
		style.setBorderLeft(BorderStyle.THIN);
		//设置左边框颜色;
		style.setLeftBorderColor(HSSFColor.BLACK.index);
		//设置右边框;
		style.setBorderRight(BorderStyle.THIN);
		//设置右边框颜色;
		style.setRightBorderColor(HSSFColor.BLACK.index);
		//设置顶边框;
		style.setBorderTop(BorderStyle.THIN);
		//设置顶边框颜色;
		style.setTopBorderColor(HSSFColor.BLACK.index);
		//在样式用应用设置的字体;
		style.setFont(font);
		//设置自动换行;
		style.setWrapText(false);
		//设置水平对齐的样式为居中对齐;
		style.setAlignment(HorizontalAlignment.CENTER);
		//设置垂直对齐的样式为居中对齐;
		style.setVerticalAlignment(VerticalAlignment.CENTER);

		return style;

	}
}
