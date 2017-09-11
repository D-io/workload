package cn.edu.uestc.ostec.workload.converter.impl;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.DescAndValue;
import cn.edu.uestc.ostec.workload.dto.FormulaParameter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.JobDesc;
import cn.edu.uestc.ostec.workload.dto.OtherJsonParameter;
import cn.edu.uestc.ostec.workload.dto.ParameterValue;
import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;
import cn.edu.uestc.ostec.workload.support.utils.FileHelper;
import cn.edu.uestc.ostec.workload.support.utils.FormulaCalculate;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;

/**
 * Version:v1.0 (description:  )
 */
@Component
public class ItemConverter implements Converter<Item, ItemDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private FileEvent fileEvent;

	@Autowired
	private ItemDao itemDao;

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
		itemDto.setVersion(po.getVersion());
		itemDto.setParentId(po.getParentId());

		Category category = isNull(itemDto.getCategoryId()) ?
				null :
				categoryDao.select(itemDto.getCategoryId(), null, null, null, null, null)
						.get(ZERO_INT);

		itemDto.setFormula(isNull(category) ? null : category.getFormula());
		itemDto.setCategoryName(isNull(category) ? null : category.getName());
		itemDto.setImportRequired(isNull(category) ? null : category.getImportRequired());

		Integer reviewerId = isNull(category) ? null : category.getReviewerId();
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
		itemDto.setParamDesc(isNull(category) ?
				null :
				readValueFromJson(category.getJsonParameters(), FormulaParameter.class));

		List<DescAndValue> descAndValues = new ArrayList<>();
		List<ParameterValue> parameterValueList = (null == itemDto.getParameterValues() ?
				new ArrayList<>() :
				itemDto.getParameterValues());
		List<FormulaParameter> formulaParameterList = itemDto.getParamDesc();
		for (int i = 0; i < parameterValueList.size(); i++) {
			if (parameterValueList.get(i).getSymbol()
					.equals(formulaParameterList.get(i).getSymbol())) {
				DescAndValue descAndValue = new DescAndValue(formulaParameterList.get(i).getDesc(),
						parameterValueList.get(i).getValue());
				descAndValues.add(descAndValue);
			}
		}
		itemDto.setDescAndValues(descAndValues);

		List<JobDesc> jobDescList = itemDto.getJobDescList();
		itemDto.setJobDesc((null != jobDescList && jobDescList.size() == 1) ?
				jobDescList.get(ZERO_INT).getJobDesc() :
				po.getJobDesc());

		List<ChildWeight> childWeightList = itemDto.getChildWeightList();
		itemDto.setJsonChildWeight((null != childWeightList && childWeightList.size() == 1) ?
				String.valueOf(childWeightList.get(ZERO_INT).getWeight()) :
				po.getJsonChildWeight());

		itemDto.setFileName((null == itemDto.getProof() || itemDto.getProof().equals(ZERO_INT) ?
				null :
				FileHelper.getFileName(fileEvent.downloadFile(itemDto.getProof()).getPath())));

		//		double workload = FormulaCalculate
		//				.calculate(category.getFormula(), itemDto.getParameterValues());
		//		itemDto.setWorkload(workload);
		itemDto.setCategoryCode(po.getCategoryCode());

		return itemDto;
	}

	@Override
	public Item dtoToPo(ItemDto dto) {

		if (ObjectHelper.isNull(dto)) {
			return null;
		}

		Item item = new Item();
		item.setItemId(
				(null == dto.getItemId() || ZERO_INT == dto.getItemId()) ? null : dto.getItemId());
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
		item.setVersion(dto.getVersion());
		item.setParentId(dto.getParentId());

		Category category = categoryDao
				.select(item.getCategoryId(), null, null, null, null, DateHelper.getCurrentTerm())
				.get(ZERO_INT);
		item.setCategoryCode(category.getCategoryCode());

		return item;
	}

	public Item generateGroupItem(Integer parentId, String version) {
		Item item = itemDao.select(parentId, version);
		ItemDto itemDto = poToDto(item);
		Double workload = FormulaCalculate
				.calculate(itemDto.getFormula(), itemDto.getParameterValues());
		List<Item> children = itemDao.selectChild(parentId, version);
		children.add(item);
		List<JobDesc> jobDescList = new ArrayList<>();
		List<ChildWeight> childWeightList = new ArrayList<>();
		for (Item item1 : children) {
			Integer userId = item1.getOwnerId();
			String jobDescription = item1.getJobDesc();
			Double weight = Double.valueOf(item1.getJsonChildWeight());
			JobDesc jobDesc = new JobDesc(userId, jobDescription);
			ChildWeight childWeight = new ChildWeight(userId, weight);
			childWeight.setWorkload(item1.getWorkload().equals(ZERO_DOUBLE) ?
					workload * weight :
					item1.getWorkload());
			jobDescList.add(jobDesc);
			childWeightList.add(childWeight);
		}
		item.setJsonChildWeight(writeJsonFromValue(childWeightList));
		item.setJobDesc(writeJsonFromValue(jobDescList));

		return item;
	}

}
