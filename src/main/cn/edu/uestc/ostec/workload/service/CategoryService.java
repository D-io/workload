package cn.edu.uestc.ostec.workload.service;

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.pojo.Category;

public interface CategoryService {

	/**
	 * 删除工作量条目
	 * @param categoryId 工作量条目Id
	 * @return String
	 */
	String deleteCategory(String categoryId);

	/**
	 * 增加工作量条目
	 * @param category 工作量条目
	 * @return int
	 */
	int insertCategory(Category category);

	/**
	 * 修改工作量条目
	 * @param category 工作量条目
	 * @return String
	 */
	String updateCategory(Category category);

	/**
	 * 根据主键修改工作量条目状态
	 * @param status 状态
	 * @param categoryId 工作量条目Id
	 * @return String
	 */
	String updateCategoryStatus(String status, String categoryId);

	/**
	 * 查看工作量条目详情
	 * @param categoryId 工作量条目Id
	 * @return Category
	 */
	Category selectCategoryById(Integer categoryId);

	/**
	 * 查询某一工作量条目下的子条目
	 * @param status 状态值
	 * @param parentId 父节点Id
	 * @return List<Category>
	 */
	List<Category> selectCategoryChildren(String status, Integer parentId);

	/**
	 * 查询删除的全部工作量条目(工作量状态为-1)
	 * @param status 状态值
	 * @return List<Category>
	 */
	List<Category> selectCategoryDisable(String status);

	/**
	 * 根据工作量类型查询工作量条目
	 * @param importRequired 标识工作量为审核类：0；还是复核类：1
	 * @return List<Category>
	 */
	List<Category> selectCategoryByImportRequired(String importRequired);
}
