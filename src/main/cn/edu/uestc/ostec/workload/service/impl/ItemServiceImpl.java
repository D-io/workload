package cn.edu.uestc.ostec.workload.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.dto.ChildWeight;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.TotalWorkloadAndCount;
import cn.edu.uestc.ostec.workload.dto.Workload;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.GROUP;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.OBJECT_MAPPER;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;

/**
 * Version:v1.0 (description:  )
 */
@Service(ItemService.NAME)
public class ItemServiceImpl extends BaseServiceImpl implements ItemService {

	@Autowired
	private ItemDao itemDao;

	@Autowired
	private ItemConverter itemConverter;

	@Autowired
	private CategoryDao categoryDao;

	@Override
	public Boolean saveItem(Item item) {

		if (!hasObjectId(item.getItemId())) {
			item.setItemId(getNextKey(Item.TABLE_NAME));
			return itemDao.insert(item);
		}
		return itemDao.update(item);
	}

	@Override
	public Item findItem(Integer itemId, String version) {

		return objectResult(itemDao.select(itemId, version), EMPTY_ITEM);
	}

	@Override
	public List<Item> findItemsByStatus(Integer status, Integer teacherId, String version) {

		return listResult(itemDao.selectItemsByStatus(status, teacherId, version));
	}

	@Override
	public Boolean removeItem(Integer itemId, String version) {

		return itemDao.updateStatus(DELETED, itemId, version);
	}

	@Override
	public Boolean deleteItem(Integer itemId, String version) {

		return itemDao.delete(itemId, version);
	}

	@Override
	public Integer getValidItemNumberOfCategory(Integer categoryId, String version,
			Integer parentId, Integer status) {
		return itemDao.selectValidItemsNumbersOfCategory(categoryId, version, parentId, status);
	}

	@Override
	public List<Item> findChildItemList(Integer parentId, String version) {
		return itemDao.selectChild(parentId, version);
	}

	@Override
	public List<Item> findAnalyzeItems(Integer teacherId, Integer status, String version,
			String type) {
		return itemDao.selectItemsByAnalyzeType(teacherId, status, version, type);
	}

	@Override
	public Workload workloadAnalyze(Integer teacherId, String type, String version) {
		Workload workload = new Workload();
		Double checkedWorkload = itemDao
				.selectWorkloadForAnalyze(teacherId, CHECKED, version, type);
		Double uncheckedWorkload = itemDao.selectWorkloadForAnalyze(teacherId, null, version, type);
		workload.setCheckedWorkload(null == checkedWorkload ? ZERO_DOUBLE : checkedWorkload);
		workload.setUncheckedWorkload(null == uncheckedWorkload ? ZERO_DOUBLE : uncheckedWorkload);
		workload.setTotalWorkload(workload.getCheckedWorkload() + workload.getUncheckedWorkload());
		workload.setWorkloadCode(type);
		workload.setWorkloadDesc(categoryDao.findCategoryNameByCategoryCode(type));
		return workload;
	}

	@Override
	public List<ItemDto> findAll(String itemName, Integer categoryId, Integer status,
			Integer ownerId, Integer isGroup, String version, Integer importedRequired,
			Integer groupManagerId) {
		List<Item> itemList = itemDao
				.selectAll(version, itemName, categoryId, status, ownerId, isGroup, groupManagerId,
						null, importedRequired);
		List<ItemDto> itemDtoList = itemConverter.poListToDtoList(itemList);

		return itemDtoList;
	}

	@Override
	public Map<String, Object> findAll(Integer categoryId, Integer status, Integer ownerId,
			Integer parentId, int pageNum, int pageSize, String version, Integer importedRequired) {

		PageHelper.startPage(pageNum, pageSize);
		List<Item> items = itemDao
				.selectAll(version, null, categoryId, status, ownerId, null, null, parentId,
						importedRequired);
		List<Item> itemList = new ArrayList<>();
		for (Item item : items) {
			if (GROUP.equals(item.getIsGroup()) && item.getOwnerId()
					.equals(item.getGroupManagerId())) {
				item = itemConverter.generateGroupItem(item.getItemId(), version);
			}
			itemList.add(item);
		}
		Page<Item> page = (Page<Item>) items;
		long total = page.getTotal();
		int pageCount = (int) (total / pageSize) + 1;
		Map<String, Object> data = new HashMap<>();
		data.put("itemList", itemConverter.poListToDtoList(itemList));
		data.put("pageCount", pageCount);
		data.put("totalLines", total);
		return data;

	}

	@Override
	public List<Item> findItemByCategory(String version, Integer categoryId, Integer parentId) {

		return listResult(itemDao.selectValidItemByCategory(categoryId, version, parentId));
	}

	@Override
	public TotalWorkloadAndCount selectTotalWorkload(Integer teacherId, Integer status,
			String version) {
		return objectResult(itemDao.selectWorkload(teacherId, status, version), EMPTY_WORKLOAD);
	}

	@Override
	public List<Item> findItemsByCategory(Integer categoryId, Integer status, String version,
			Integer parentId) {

		return itemDao.selectItemsByCategory(categoryId, status, version, parentId);
	}

	@Override
	public Item calculateChildrenWorkloadOfUncommittedItem(Item item) {
		ItemDto itemDto = itemConverter.poToDto(item);
		Double workload = itemDto.getWorkload();
		List<ChildWeight> childWeightList = itemDto.getChildWeightList();
		if (null == childWeightList) {
			return null;
		}
		List<ChildWeight> newChildWeightList = new ArrayList<>();
		for (ChildWeight childWeight : childWeightList) {
			BigDecimal b = new BigDecimal(workload * childWeight.getWeight());
			double formatWorkload = b.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
			childWeight.setWorkload(formatWorkload);
			newChildWeightList.add(childWeight);
		}

		itemDto.setChildWeightList(newChildWeightList);
		try {
			itemDto.setJsonChildWeight(OBJECT_MAPPER.writeValueAsString(newChildWeightList));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return itemConverter.dtoToPo(itemDto);
	}
}
