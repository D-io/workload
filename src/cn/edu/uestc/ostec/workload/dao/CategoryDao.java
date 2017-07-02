package cn.edu.uestc.ostec.workload.dao;

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.pojo.Category;

public interface CategoryDao {

	/**
	 * 根据主键删除工作量条目
	 * @param categoryId 条目Id
	 * @return int
	 */
	int deleteByPrimaryKey(Integer categoryId);

	/**
	 * 新增工作量条目
	 * @param category 工作量条目
	 * @return int
	 */
	int insert(Map<String, Object> category);

	/**
	 * 修改工作量条目
	 * @param category 工作量条目
	 * @return int
	 */
	int updateByPrimaryKey(Category category);

	/**
	 * 根据主键修改工作量状态
	 * @param status 工作量状态
	 * @param categoryId 工作量条目
	 * @return int
	 */
	int updateStatus(String status, Integer categoryId);

	/**
	 * 根据主键查询工作量条目
	 * @param categoryId 工作量条目Id
	 * @return Category
	 */
	Category selectByPrimaryKey(Integer categoryId);

	/**
	 * 查询某一工作量条目下的工作量条目
	 * @param status 工作量状态
	 * @param parentId 父工作量Id
	 * @return List<Category>
	 */
	List<Category> selectChildren(String status, Integer parentId);

	/**
	 * 查询删除的全部工作量条目(工作量状态为-1)
	 * @param status 状态
	 * @return List<Category>
	 */
	List<Category> selectDisable(String status);

	/**
	 * 根据工作量类型查询工作量条目
	 * @param importRequied 标识工作量为审核类：0；还是复核类：1
	 * @return List<Category>
	 */
	 List<Category> selectByImportRequied(String importRequied);
}