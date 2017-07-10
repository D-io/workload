package cn.edu.uestc.ostec.workload.service;

import java.util.List;

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
	 * 查找对应老师的全部工作量条目信息
	 * @param status 工作量状态
	 * @param teacherId 教师编号
	 * @return List<Item>
	 */
	List<Item> findItemsByStatus(Integer status,Integer teacherId);

	/**
	 * 删除Item信息(置为Disable状态)
	 * @param itemId 工作量编号
	 * @return Boolean
	 */
	Boolean removeItem(Integer itemId);

	/**
	 * 正常状态下申请的Item信息（审核通过和未审核的）
	 * @param teacherId 教师编号
	 * @return List<Item>
	 */
	List<Item> findNormalApplyItems(Integer teacherId);

	/**
	 * 彻底删除对应的item对象
	 * @param itemId item编号
	 * @return Boolean
	 */
	Boolean deleteItem(Integer itemId);

	/**
	 * 正常状态下导入的Item信息
	 * @param teacherId 教师编号
	 * @return List<Item>
	 */
	List<Item> findNormalImportItems(Integer teacherId);

	/**
	 * 根据CategoryId查找提交了的Item信息
	 * @param categoryId 类目编号
	 * @return List<Item>
	 */
	List<Item> findItemsByCategory(Integer categoryId);
}
