package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;

/**
 * Version:v1.0 (description:  )
 */
public class ItemConverter implements Converter<Item,ItemDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Autowired
	private CategoryDao categoryDao;

	@Override
	public ItemDto poToDto(Item po) {

		if(ObjectHelper.isNull(po)){
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

		int reviewerId = categoryDao.select(itemDto.getCategoryId()).getReviewerId();
		itemDto.setReviewerName(teacherDao.findNameById(reviewerId));

		itemDto.setTeacherName(teacherDao.findNameById(itemDto.getOwnerId()));

		return itemDto;
	}

	@Override
	public Item dtoToPo(ItemDto dto) throws ParseException {

		if(ObjectHelper.isNull(dto)){
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

		return item;
	}
}
