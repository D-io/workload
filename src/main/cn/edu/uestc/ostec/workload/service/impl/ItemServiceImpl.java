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
	public Item findItem(Integer itemId) {

		return objectResult(itemDao.select(itemId), EMPTY_ITEM);
	}

	@Override
	public List<Item> findItemsByStatus(Integer status, Integer teacherId) {

		return listResult(itemDao.selectItemsByStatus(status, teacherId));
	}

	@Override
	public Boolean removeItem(Integer itemId) {

		return itemDao.updateStatus(DELETED, itemId);
	}

	@Override
	public Boolean deleteItem(Integer itemId) {

		return itemDao.delete(itemId);
	}

	@Override
	public List<ItemDto> findAll(String itemName, Integer categoryId, Integer status,
			Integer ownerId, Integer isGroup, String version) {
		List<Item> itemList = itemDao.selectAll(itemName, categoryId, status, ownerId, isGroup);
		List<ItemDto> itemDtoList = itemConverter.poListToDtoList(itemList);

		List<ItemDto> itemDtos = new ArrayList<>();
		for (ItemDto itemDto : itemDtoList) {
			if (version.equals(itemDto.getVersion())) {
				itemDtos.add(itemDto);
			}
		}

		return itemDtos;
	}

	@Override
	public Map<String, Object> findAll(Integer categoryId, Integer status, Integer ownerId,
			Integer isGroup, int pageNum, int pageSize) {

		PageHelper.startPage(pageNum, pageSize);
		List<Item> items = itemDao.selectAll(null,categoryId, status, ownerId, isGroup);
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
	public List<Item> findItemByCategory(Integer categoryId) {

		return listResult(itemDao.selectValidItemByCategory(categoryId));
	}

	@Override
	public List<Item> findItemsByCategory(Integer categoryId, Integer status) {

		return itemDao.selectItemsByCategory(categoryId, status);
	}
}
