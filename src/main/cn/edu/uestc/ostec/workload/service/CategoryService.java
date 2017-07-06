package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Category;

public interface CategoryService extends BaseService{

	String NAME = "categoryService";

	Category EMPTY_CATEGORY = new Category();

	/**
	 * 删除工作量条目(设置为disable)
	 * @param categoryId 工作量条目Id
	 * @return String
	 */
	Boolean removeCategory(Integer categoryId);

	/**
	 * 彻底删除工作量类目
	 * @param categoryId 工作量类目编号
	 * @return Boolean
	 */
	Boolean deleteCategory(Integer categoryId);

	/**
	 * 保存工作量条目
	 * @param category 工作量条目
	 * @return int
	 */
	Boolean saveCategory(Category category);

	/**
	 * 保存工作量条目状态
	 * @param status 状态
	 * @param categoryId 工作量条目Id
	 * @return String
	 */
	Boolean saveCategory(Integer status, Integer categoryId);

	/**
	 * 查看工作量条目详情
	 * @param categoryId 工作量条目Id
	 * @return Category
	 */
	Category getCategory(Integer categoryId);

	/**
	 * 查询某一工作量条目下的子条目
	 * @param status 状态值
	 * @param parentId 父节点Id
	 * @return List<Category>
	 */
	List<Category> getCategoryChildren(Integer status, Integer parentId);

	/**
	 * 查询删除的全部工作量条目(工作量状态为-1)
	 * @param status 状态值
	 * @return List<Category>
	 */
	List<Category> getCategoriesByStatus(Integer status);

	/**
	 * 根据工作量类型查询工作量条目
	 * @param importRequired 标识工作量为审核类：0；还是复核类：1
	 * @return List<Category>
	 */
	List<Category> getCategoriesByType(Integer importRequired);
}
