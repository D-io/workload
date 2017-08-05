package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Category;

@Component
public interface CategoryDao extends BaseDao<Category> {

	/**
	 * 新增工作量条目
	 *
	 * @param category 工作量条目
	 * @return Boolean
	 */
	@Override
	Boolean insert(Category category);

	/**
	 * 修改工作量条目
	 *
	 * @param entity 工作量条目
	 * @return Boolean
	 */
	@Override
	Boolean update(Category entity);

	/**
	 * 根据主键删除工作量条目
	 *
	 * @param id 条目Id
	 * @return Boolean
	 */
	@Override
	Boolean delete(Integer id);

//	/**
//	 * 根据主键查询工作量条目
//	 *
//	 * @param id 工作量条目Id
//	 * @return Category
//	 */
//	@Override
//	Category select(Integer id);

	/**
	 * 根据主键修改工作量状态
	 *
	 * @param status     工作量状态
	 * @param categoryId 工作量条目
	 * @return Boolean
	 */
	Boolean updateStatus(
			@Param("status")
					Integer status,
			@Param("categoryId")
					Integer categoryId);

	/**
	 * 查询某一工作量条目下某种状态的工作量条目
	 *
	 * @param status   工作量状态
	 * @param parentId 父工作量Id
	 * @return List<Category>
	 */
	List<Category> selectChildren(
			@Param("status")
					Integer status,
			@Param("parentId")
					Integer parentId);

	/**
	 * 查询子节点（有效状态，不包含删除状态）
	 *
	 * @param parentId 父节点编号
	 * @return List<Category>
	 */
	List<Category> selectValidChildren(Integer parentId);

	/**
	 * 查询删除的全部工作量条目(工作量状态为-1)
	 *
	 * @param status 状态
	 * @return List<Category>
	 */
	List<Category> selectByStatus(Integer status);

	List<Category> selectAll(String version);

	/**
	 * 根据工作量类型查询工作量条目
	 *
	 * @param importRequired 标识工作量为审核类：0；还是复核类：1
	 * @return List<Category>
	 */
	List<Category> selectByImportRequired(Integer importRequired);

	/**
	 * 根据审核人查询工作量条目
	 *
	 * @param reviewerId 审核人编号
	 * @return List<Category>
	 */
	List<Category> selectByReviewer(Integer reviewerId);

	List<Category> select(
			@Param("categoryId")
					Integer categoryId,
			@Param("reviewerId")
					Integer reviewerId,
			@Param("parentId")
					Integer parentId,
			@Param("importedRequired")
					Integer importedRequired,
			@Param("status")
					Integer status,
			@Param("version")
					String version);
}