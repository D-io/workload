package cn.edu.uestc.ostec.workload.dao;

/**
 * Version:v1.0 (description: 定义dao层的增删改查基本操作接口  )
 */
public interface BaseDao<T> {

	/**
	 * 插入实体对象
	 * @param entity 实体对象
	 * @return Boolean
	 */
	Boolean insert(T entity);

	/**
	 * 修改实体对象
	 * @param entity 实体对象
	 * @return Boolean
	 */
	Boolean update(T entity);

	/**
	 * 删除实体对象
	 * @param id 实体对象Id
	 * @return Boolean
	 */
	Boolean delete(Integer id);

	/**
	 * 查询实体对象
	 * @param id 实体对象Id
	 * @return Boolean
	 */
	T select(Integer id);

}
