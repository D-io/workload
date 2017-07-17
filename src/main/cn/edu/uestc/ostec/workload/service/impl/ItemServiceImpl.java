package cn.edu.uestc.ostec.workload.service.impl;

import com.github.pagehelper.PageHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.dao.ItemDao;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;

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
	public Boolean deleteItem(Integer itemId) {

		return itemDao.delete(itemId);
	}

	@Override
	public List<Item> findAll(Integer categoryId,Integer status,Integer ownerId,int pageNum, int pageSize) {

		PageHelper.startPage(pageNum,pageSize);
		List<Item> items = itemDao.selectAll(categoryId,status,ownerId);
		List<Item> itemList =  new ArrayList<>();
		for(Item item:items) {
			itemList.add(item);
		}
		return itemList;
	}

	@Override
	public List<Item> findItemByCategory(Integer categoryId) {

		return listResult(itemDao.selectValidItemByCategory(categoryId));
	}

	@Override
	public List<Item> findItemsByCategory(Integer categoryId,Integer status) {

		return itemDao.selectItemsByCategory(categoryId,status);
	}
}
