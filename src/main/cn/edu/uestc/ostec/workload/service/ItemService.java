package cn.edu.uestc.ostec.workload.service;

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.dto.TotalWorkloadAndCount;
import cn.edu.uestc.ostec.workload.dto.Workload;
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
	 * 空的workload-count对象
	 */
	TotalWorkloadAndCount EMPTY_WORKLOAD = new TotalWorkloadAndCount();

	/**
	 * 保存Item信息
	 *
	 * @param item 工作量信息
	 * @return Boolean
	 */
	Boolean saveItem(Item item);

	/**
	 * 查找Item信息
	 *
	 * @param itemId 工作量对应的Id
	 * @return Item
	 */
	Item findItem(Integer itemId, String version);

	/**
	 * 查找对应老师的全部工作量条目信息
	 *
	 * @param status    工作量状态
	 * @param teacherId 教师编号
	 * @return List<Item>
	 */
	List<Item> findItemsByStatus(Integer status, Integer teacherId, String version);

	/**
	 * 删除Item信息(置为Disable状态)
	 *
	 * @param itemId 工作量编号
	 * @return Boolean
	 */
	Boolean removeItem(Integer itemId, String version);

	/**
	 * 彻底删除对应的item对象
	 *
	 * @param itemId item编号
	 * @return Boolean
	 */
	Boolean deleteItem(Integer itemId, String version);

	/**
	 * 根绝类目编号和状态查询条目信息
	 *
	 * @param categoryId 类目编号
	 * @param status     状态
	 * @return List<Item>
	 */
	List<Item> findItemsByCategory(Integer categoryId, Integer status, String version,
			Integer parentId);

	/**
	 * 根据类目编号查询所有有效的条目信息
	 *
	 * @param categoryId 类目编号
	 * @return List<Item>
	 */
	List<Item> findItemByCategory(String version, Integer categoryId, Integer parentId);

	/**
	 * 统计某个教师对应的工作量
	 *
	 * @param teacherId 教师编号
	 * @param status    条目状态
	 * @return Double
	 */
	TotalWorkloadAndCount selectTotalWorkload(Integer teacherId, Integer status, String version);

	/**
	 * 分页查询所有的条目信息
	 *
	 * @param categoryId 类目编号
	 * @param status     状态
	 * @param ownerId    教师编号
	 * @param pageNum    页号
	 * @param pageSize   页的大小
	 * @return List<Item>
	 */
	Map<String, Object> findAll(Integer categoryId, Integer status, Integer ownerId,
			Integer parentId, int pageNum, int pageSize, String version, Integer importedRequired);

	List<ItemDto> findAll(String itemName, Integer categoryId, Integer status, Integer ownerId,
			Integer isGroup, String version, Integer importedRequired, Integer groupManagerId);

	Workload workloadAnalyze(Integer teacherId, String type, String version);

	List<Item> findAnalyzeItems(Integer teacherId, Integer status, String version, String type);

	List<Item> findChildItemList(Integer parentId, String version);

	Integer getValidItemNumberOfCategory(Integer categoryId, String version, Integer parentId,
			Integer status);

	Item calculateChildrenWorkloadOfUncommittedItem(Item item);
}
