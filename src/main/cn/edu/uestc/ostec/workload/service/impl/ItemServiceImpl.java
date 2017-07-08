package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

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
	public Boolean removeItem(Integer itemId) {
		return itemDao.delete(itemId);
	}
}
