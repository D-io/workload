package cn.edu.uestc.ostec.workload.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.TotalWorkloadAndCount;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;

/**
 * Version:v1.0 (description:  )
 */
@Service(ItemService.NAME)
public class ItemServiceImpl extends BaseServiceImpl implements ItemService {

	@Autowired
	private ItemDao itemDao;

	@Autowired
	private ItemConverter itemConverter;

	@Override
	public Boolean saveItem(Item item) {

		if (!hasObjectId(item.getItemId())) {
			item.setItemId(getNextKey(Item.TABLE_NAME));
			return itemDao.insert(item);
		}
		return itemDao.update(item);
	}

	@Override
	public Item findItem(Integer itemId,String version) {

		return objectResult(itemDao.select(itemId), EMPTY_ITEM);
	}

	@Override
	public List<Item> findItemsByStatus(Integer status, Integer teacherId,String version) {

		return listResult(itemDao.selectItemsByStatus(status, teacherId,version));
	}

	@Override
	public Boolean removeItem(Integer itemId,String version) {

		return itemDao.updateStatus(DELETED, itemId, version);
	}

	@Override
	public Boolean deleteItem(Integer itemId,String version) {

		return itemDao.delete(itemId);
	}

	@Override
	public List<ItemDto> findAll(String itemName, Integer categoryId, Integer status,
			Integer ownerId, Integer isGroup, String version) {
		List<Item> itemList = itemDao.selectAll(version,itemName, categoryId, status, ownerId, isGroup);
		List<ItemDto> itemDtoList = itemConverter.poListToDtoList(itemList);

		return itemDtoList;
	}

	@Override
	public Map<String, Object> findAll(Integer categoryId, Integer status, Integer ownerId,
			Integer isGroup, int pageNum, int pageSize,String version) {

		PageHelper.startPage(pageNum, pageSize);
		List<Item> items = itemDao.selectAll(version,null, categoryId, status, ownerId, isGroup);
		List<Item> itemList = new ArrayList<>();
		for (Item item : items) {
			itemList.add(item);
		}
		Page<Item> page = (Page<Item>) items;
		long total = page.getTotal();
		int pageCount = (int) Math.ceil(total / pageSize);
		Map<String, Object> data = new HashMap<>();
		data.put("itemList", itemList);
		data.put("pageCount", pageCount);
		data.put("totalLines", total);
		return data;
	}

	@Override
	public List<Item> findItemByCategory(String version,Integer categoryId) {

		return listResult(itemDao.selectValidItemByCategory(categoryId,version));
	}

	@Override
	public TotalWorkloadAndCount selectTotalWorkload(Integer teacherId, Integer status,String version) {

		return objectResult(itemDao.selectWorkload(teacherId, status,version),EMPTY_WORKLOAD);
	}

	@Override
	public List<Item> findItemsByCategory(Integer categoryId, Integer status,String version) {

		return itemDao.selectItemsByCategory(categoryId, status,version);
	}
}
