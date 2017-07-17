package cn.edu.uestc.ostec.workload.converter.impl;

import com.mysql.fabric.xmlrpc.base.Array;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.faces.flow.Parameter;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.OBJECT_MAPPER;

/**
 * Version:v1.0 (description:  )
 */
@Component
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

		Category category = categoryDao.select(itemDto.getCategoryId());
		itemDto.setCategoryName(category.getName());
		itemDto.setImportRequired(category.getImportRequired());

		int reviewerId = category.getReviewerId();
		itemDto.setReviewerId(reviewerId);
		itemDto.setReviewerName(teacherDao.findNameById(reviewerId));

		itemDto.setTeacherName(teacherDao.findNameById(itemDto.getOwnerId()));
		itemDto.setGroupManagerName(teacherDao.findNameById(itemDto.getGroupManagerId()));

//		List<ParameterValue> parameterValues = new ArrayList<>();
//		List<JobDesc> jobDescList = new ArrayList<>();
//		List<ChildWeight> childWeightList = new ArrayList<>();
//		try {
//			parameterValues = OBJECT_MAPPER.readValue(itemDto.getJsonParameter(),
//					getCollectionType(ArrayList.class, ParameterValue.class));
//			jobDescList = OBJECT_MAPPER.readValue(itemDto.getJobDesc(),
//					getCollectionType(ArrayList.class,JobDesc.class));
//			childWeightList = OBJECT_MAPPER.readValue(itemDto.getJsonChildWeight(),
//					getCollectionType(ArrayList.class,ChildWeight.class));
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		itemDto.setParameterValues(parameterValues);
//		itemDto.setJobDescList(jobDescList);
//		itemDto.setChildWeightList(childWeightList);

		return itemDto;
	}

	@Override
	public Item dtoToPo(ItemDto dto) {

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
