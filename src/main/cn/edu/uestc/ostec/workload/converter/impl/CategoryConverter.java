package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;


/**
 * Version:v1.0 (description: 工作量类目PO与DTO转换器  )
 */
@Component
public class CategoryConverter implements Converter<Category,CategoryDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Override
	public CategoryDto poToDto(Category po) {
		if(ObjectHelper.isNull(po)){
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
		categoryDto.setApplyDeadline(DateHelper.getDateTime(po.getApplyDeadline()));
		categoryDto.setReviewDeadline(DateHelper.getDateTime(po.getReviewDeadline()));
		categoryDto.setReviewerId(po.getReviewerId());
		categoryDto.setReviewerName(teacherDao.findNameById(categoryDto.getReviewerId()));

		return categoryDto;
	}

	@Override
	public Category dtoToPo(CategoryDto dto) {
		if(ObjectHelper.isNull(dto)){
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

		category.setApplyDeadline(DateHelper.getTimeStamp(dto.getApplyDeadline()));
		category.setReviewDeadline(DateHelper.getTimeStamp(dto.getReviewDeadline()));

		category.setReviewerId(dto.getReviewerId());

		return category;
	}
}
