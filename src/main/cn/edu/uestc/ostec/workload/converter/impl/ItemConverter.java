package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.dto.OtherJsonParameter;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;


/**
 * Version:v1.0 (description:  )
 */
@Component
public class ItemConverter implements Converter<Item, ItemDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Autowired
	private CategoryDao categoryDao;

	@Override
	public ItemDto poToDto(Item po) {

		if (ObjectHelper.isNull(po)) {
			return null;
		}

		ItemDto itemDto = new ItemDto();

		itemDto.setItemId(po.getItemId());
		itemDto.setItemName(po.getItemName());
		itemDto.setCategoryId(po.getCategoryId());
		itemDto.setOwnerId(po.getOwnerId());
		itemDto.setGroupManagerId(po.getGroupManagerId());
		itemDto.setApplyDesc(po.getApplyDesc());
		itemDto.setJobDesc(po.getJobDesc());
		itemDto.setJsonChildWeight(po.getJsonChildWeight());
		itemDto.setProof(po.getProof());
		itemDto.setJsonParameter(po.getJsonParameter());
		itemDto.setStatus(po.getStatus());
		itemDto.setWorkload(po.getWorkload());
		itemDto.setOtherJson(po.getOtherJson());

		Category category = isNull(itemDto.getCategoryId()) ?
				null :
				categoryDao.select(itemDto.getCategoryId());

		itemDto.setCategoryName(isNull(category) ? null : category.getName());
		itemDto.setImportRequired(isNull(category) ? null : category.getImportRequired());

		Integer reviewerId = category.getReviewerId();
		itemDto.setReviewerId(reviewerId);
		itemDto.setReviewerName(isNull(reviewerId) ? null : teacherDao.findNameById(reviewerId));

		itemDto.setTeacherName(isNull(itemDto.getOwnerId()) ?
				null :
				teacherDao.findNameById(itemDto.getOwnerId()));
		itemDto.setGroupManagerName(isNull(itemDto.getGroupManagerId()) ?
				null :
				teacherDao.findNameById(itemDto.getGroupManagerId()));
		itemDto.setIsGroup(po.getIsGroup());

		itemDto.setParameterValues(
				readValueFromJson(itemDto.getJsonParameter(), ParameterValue.class));
		itemDto.setJobDescList(readValueFromJson(itemDto.getJobDesc(), JobDesc.class));
		itemDto.setChildWeightList(
				readValueFromJson(itemDto.getJsonChildWeight(), ChildWeight.class));
		itemDto.setOtherJsonParameters(
				readValueFromJson(itemDto.getOtherJson(), OtherJsonParameter.class));
		//		double workload = FormulaCalculate
		//				.calculate(category.getFormula(), itemDto.getParameterValues());
		//		itemDto.setWorkload(workload);

		return itemDto;
	}

	@Override
	public Item dtoToPo(ItemDto dto) {

		if (ObjectHelper.isNull(dto)) {
			return null;
		}

		Item item = new Item();
		item.setJsonChildWeight(dto.getJsonChildWeight());
		item.setProof(dto.getProof());
		item.setJobDesc(dto.getJobDesc());
		item.setApplyDesc(dto.getApplyDesc());
		item.setGroupManagerId(dto.getGroupManagerId());
		item.setWorkload(dto.getWorkload());
		item.setJsonParameter(dto.getJsonParameter());
		item.setOwnerId(dto.getOwnerId());
		item.setCategoryId(dto.getCategoryId());
		item.setItemName(dto.getItemName());
		item.setStatus(dto.getStatus());
		item.setIsGroup(dto.getIsGroup());
		item.setOtherJson(dto.getOtherJson());

		return item;
	}
}
