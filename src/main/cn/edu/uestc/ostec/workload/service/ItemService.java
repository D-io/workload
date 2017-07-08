package cn.edu.uestc.ostec.workload.service;

import cn.edu.uestc.ostec.workload.pojo.Item;

/**
 * Version:v1.0 (description:  )
 */
public interface ItemService extends BaseService {

	String NAME = "itemService";

	Item EMPTY_ITEM = new Item();

	Boolean saveItem(Item item);

	Item findItem(Integer itemId);

	Boolean removeItem(Integer itemId);
}
