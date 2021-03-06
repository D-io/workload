package cn.edu.uestc.ostec.workload.converter.impl;

import org.apache.poi.ss.formula.Formula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.FormulaParameter;
import cn.edu.uestc.ostec.workload.dto.OtherJsonParameter;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.OBJECT_MAPPER;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;

/**
 * Version:v1.0 (description: 工作量类目PO与DTO转换器  )
 */
@Component
public class CategoryConverter implements Converter<Category, CategoryDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Autowired
	private CategoryDao categoryDao;

	@Override
	public CategoryDto poToDto(Category po) {
		if (ObjectHelper.isNull(po)) {
			return null;
		}

		CategoryDto categoryDto = new CategoryDto();
		categoryDto.setCategoryId(po.getCategoryId());
		categoryDto.setDesc(po.getDesc());
		categoryDto.setFormula(po.getFormula());
		categoryDto.setImportRequired(po.getImportRequired());
		categoryDto.setIsLeaf(po.getIsLeaf());
		categoryDto.setName(po.getName());
		categoryDto.setJsonParameters(po.getJsonParameters());
		categoryDto.setStatus(po.getStatus());
		categoryDto.setVersion(po.getVersion());
		categoryDto.setParentId(po.getParentId());
		categoryDto.setIsSingle(po.getIsSingle());
		categoryDto.setLimitWorkload(po.getLimitWorkload());
		categoryDto.setApplyDeadline(isNull(po.getApplyDeadline()) ?
				null :
				DateHelper.getDefaultDateTime(po.getApplyDeadline()));

		categoryDto.setReviewDeadline(isNull(po.getReviewDeadline()) ?
				null :
				DateHelper.getDefaultDateTime(po.getReviewDeadline()));

		categoryDto.setReviewerId(po.getReviewerId());
		categoryDto.setReviewerName(isNull(categoryDto.getReviewerId()) ?
				null :
				teacherDao.findNameById(categoryDto.getReviewerId()));
		categoryDto.setOtherJson(po.getOtherJson());

		categoryDto.setFormulaParameterList(
				readValueFromJson(categoryDto.getJsonParameters(), FormulaParameter.class));
		categoryDto.setOtherJsonParameters(
				readValueFromJson(categoryDto.getOtherJson(), OtherJsonParameter.class));

		categoryDto.setCategoryCode(po.getCategoryCode());

		return categoryDto;
	}

	@Override
	public Category dtoToPo(CategoryDto dto) {
		if (ObjectHelper.isNull(dto)) {
			return null;
		}

		Category category = new Category();
		category.setCategoryId(dto.getCategoryId());
		category.setName(dto.getName());
		category.setJsonParameters(dto.getJsonParameters());
		category.setDesc(dto.getDesc());
		category.setVersion(dto.getVersion());
		category.setFormula(dto.getFormula());
		category.setImportRequired(dto.getImportRequired());
		category.setParentId(dto.getParentId());
		category.setIsLeaf(dto.getIsLeaf());
		category.setIsSingle(dto.getIsSingle());
		category.setLimitWorkload(dto.getLimitWorkload());

		category.setApplyDeadline(isNull(dto.getApplyDeadline()) ?
				null :
				DateHelper.getDefaultTimeStamp(dto.getApplyDeadline()));

		category.setReviewDeadline(isNull(dto.getReviewDeadline()) ?
				null :
				DateHelper.getDefaultTimeStamp(dto.getReviewDeadline()));

		category.setReviewerId(dto.getReviewerId());
		category.setOtherJson((dto.getOtherJson()));

		category.setCategoryCode(dto.getCategoryCode());

		return category;
	}

	public static void main(String[] args) {
//		CategoryConverter categoryConverter = new CategoryConverter();
//		Category category = new Category();
//		category.setJsonParameters("[]");
//		CategoryDto categoryDto = categoryConverter.poToDto(category);
//		System.out.println(categoryDto);
//		category.setJsonParameters(null);
//		CategoryDto categoryDto1 = categoryConverter.poToDto(category);
//		System.out.println(categoryDto1);
	}
}
