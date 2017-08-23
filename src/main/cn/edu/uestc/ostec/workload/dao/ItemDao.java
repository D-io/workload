package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Item;

@Component
public interface ItemDao extends BaseDao<Item> {

	/**
	 * 插入工作量对象
	 *
	 * @param entity 工作量对象
	 * @return Boolean
	 */
	@Override
	Boolean insert(Item entity);

	/**
	 * 根据主键修改工作量对象
	 *
	 * @param entity 工作量对象
	 * @return int
	 */
	@Override
	Boolean update(Item entity);

	/**
	 * 根据主键删除工作量对象
	 *
	 * @param id 工作量对象Id
	 * @return Boolean
	 */
	Boolean delete(
			@Param("itemId")
					Integer id,
			@Param("version")
					String version);

	/**
	 * 根据主键查询工作量对象
	 *
	 * @param id 工作量对象Id
	 * @return Item
	 */
	Item select(
			@Param("itemId")
					Integer id,
			@Param("version")
					String version);

	/**
	 * 根据教师编号查找对应该教师的工作量条目
	 *
	 * @param teacherId 教师编号
	 * @return List<Item>
	 */
	List<Item> selectItemsByStatus(
			@Param("status")
					Integer status,
			@Param("ownerId")
					Integer teacherId,
			@Param("version")
					String version);

	/**
	 * 修改itemId对应的Item对象的status
	 */
	Boolean updateStatus(
			@Param("status")
					Integer status,
			@Param("itemId")
					Integer itemId,
			@Param("version")
					String version);

	/**
	 * 根据CategoryId查找对应的item信息
	 *
	 * @param categoryId 类目编号
	 * @return List<Item>
	 */
	List<Item> selectItemsByCategory(
			@Param("categoryId")
					Integer categoryId,
			@Param("status")
					Integer status,
			@Param("version")
					String version);

	List<Item> selectValidItemByCategory(
			@Param("categoryId")
					Integer categoryId,
			@Param("version")
					String version);

	/**
	 * 条件查询所有条目信息
	 *
	 * @param categoryId 类目编号
	 * @param status     状态
	 * @param ownerId    教师编号
	 * @return List<Item>
	 */
	List<Item> selectAll(
			@Param("version")
					String version,
			@Param("itemName")
					String itemName,
			@Param("categoryId")
					Integer categoryId,
			@Param("status")
					Integer status,
			@Param("ownerId")
					Integer ownerId,
			@Param("isGroup")
					Integer isGroup);

	/**
	 * 查询教师对应状态的工作量条目对应工作量统计汇总
	 */
	Double selectWorkload(
			@Param("teacherId")
					Integer teacherId,
			@Param("status")
					Integer status,
			@Param("version")
					String version);
}