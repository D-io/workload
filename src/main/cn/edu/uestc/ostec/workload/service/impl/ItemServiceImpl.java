package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CHECKED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NON_CHECKED;

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

		return itemDao.delete(itemId);
	}

	@Override
	public List<Item> findNormalItems(Integer teacherId) {
		List<Item> checkedItemList = findItemsByStatus(CHECKED,teacherId);
		List<Item> nonCheckedItemList = findItemsByStatus(NON_CHECKED,teacherId);
		checkedItemList.addAll(nonCheckedItemList);
		return checkedItemList;
	}
}
