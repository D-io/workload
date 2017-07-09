package cn.edu.uestc.ostec.workload.service;

import cn.edu.uestc.ostec.workload.pojo.Item;

/**
 * Version:v1.0 (description: 工作量对应服务 )
 */
public interface ItemService extends BaseService {

	/**
	 * ItemService的NAME
	 */
	String NAME = "itemService";

	/**
	 * 空的ItemService对象
	 */
	Item EMPTY_ITEM = new Item();

	/**
	 * 保存Item信息
	 * @param item 工作量信息
	 * @return Boolean
	 */
	Boolean saveItem(Item item);

	/**
	 * 查找Item信息
	 * @param itemId 工作量对应的Id
	 * @return Item
	 */
	Item findItem(Integer itemId);

	/**
	 * 删除Item信息
	 * @param itemId 工作量编号
	 * @return Boolean
	 */
	Boolean removeItem(Integer itemId);
}
