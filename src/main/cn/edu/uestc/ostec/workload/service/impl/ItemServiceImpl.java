package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED_AGAIN;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED_AGAIN;

/**
 * Version:v1.0 (description:  )
 */
@Service(ItemService.NAME)
public class ItemServiceImpl extends BaseServiceImpl implements ItemService{

	@Autowired
	private ItemDao itemDao;

	@Override
	public Boolean saveItem(Item item) {

		if(!hasObjectId(item.getItemId())){
			item.setItemId(getNextKey(Item.TABLE_NAME));
			return itemDao.insert(item);
		}
		return itemDao.update(item);
	}

	@Override
	public Item findItem(Integer itemId) {

		return objectResult(itemDao.select(itemId),EMPTY_ITEM);
	}

	@Override
	public List<Item> findItemsByStatus(Integer status,Integer teacherId) {

		return listResult(itemDao.selectItemsByStatus(status,teacherId));
	}

	@Override
	public Boolean removeItem(Integer itemId) {

		return itemDao.updateStatus(DELETED,itemId);
	}

	@Override
	public List<Item> findNormalApplyItems(Integer teacherId) {

		List<Item> checkedItemList = findItemsByStatus(CHECKED,teacherId);
		List<Item> nonCheckedItemList = findItemsByStatus(NON_CHECKED,teacherId);
		checkedItemList.addAll(nonCheckedItemList);
		return checkedItemList;
	}

	@Override
	public Boolean deleteItem(Integer itemId) {

		return itemDao.delete(itemId);
	}

	@Override
	public List<Item> findNormalImportItems(Integer teacherId) {

		List<Item> checkedItemList = findItemsByStatus(CHECKED_AGAIN,teacherId);
		List<Item> nonCheckedItemList = findItemsByStatus(NON_CHECKED_AGAIN,teacherId);
		checkedItemList.addAll(nonCheckedItemList);

		return checkedItemList;
	}

	@Override
	public List<Item> findItemsByCategory(Integer categoryId) {

		return itemDao.selectItemsByCategory(categoryId);
	}
}
