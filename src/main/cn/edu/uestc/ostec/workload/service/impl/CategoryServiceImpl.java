package cn.edu.uestc.ostec.workload.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;

@Service(CategoryService.NAME)
public class CategoryServiceImpl extends BaseServiceImpl implements CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private CategoryConverter categoryConverter;

	/**
	 * 删除工作量类目
	 *
	 * @param categoryId 工作量条目Id
	 * @return Boolean
	 */
	@Override
	public Boolean removeCategory(Integer categoryId,String version) {

		return categoryDao.updateStatus(DELETED, categoryId,version);
	}

	@Override
	public List<Category> getRootCategories(String version) {

		return listResult(categoryDao.selectRoot(version));
	}

	@Override
	public List<String> getAllVersions() {
		return listResult(categoryDao.selectYears());
	}

	@Override
	public Boolean deleteCategory(Integer categoryId,String version) {

		return categoryDao.delete(categoryId,version);
	}

	@Override
	public Boolean addCategory(Category category) {
		return categoryDao.insert(category);
	}

	/**
	 * 保存工作量条目
	 *
	 * @param category 工作量条目
	 * @return Boolean
	 */
	@Override
	public Boolean saveCategory(Category category) {
		if (!hasObjectId(category.getCategoryId())) {
			category.setCategoryId(getNextKey(Category.TABLE_NAME));
			return categoryDao.insert(category);
		}

		return categoryDao.update(category);
	}

	@Override
	public Boolean saveCategory(Integer status, Integer categoryId,String version) {
		return categoryDao.updateStatus(status, categoryId,version);
	}

	@Override
	public Category getCategory(Integer categoryId,String version) {

		return objectResult(categoryDao.select(categoryId, null, null, null, null, version),
				EMPTY_CATEGORY);
	}

	@Override
	public List<Category> getCategoryChildren(Integer status, Integer parentId, String version) {
		//		return listResult(categoryDao.selectChildren(status,parentId));
		return listResult(categoryDao.select(null, null, parentId, null, status, version));
	}

	@Override
	public List<Category> getCategoriesByStatus(Integer status, String version) {

		//return listResult(categoryDao.selectByStatus(status));
		return listResult(categoryDao.select(null, null, null, null, status, version));
	}

	@Override
	public List<Category> getCategoriesByType(Integer importRequired, String version) {

		//return listResult(categoryDao.selectByImportRequired(importRequired));
		return listResult(categoryDao.select(null, null, null, importRequired, null, version));
	}

	@Override
	public List<Category> getCategoriesByReviewer(Integer reviewerId, String version,Integer importedRequired) {

		//return listResult(categoryDao.selectByReviewer(reviewerId));
		return listResult(categoryDao.select(null, reviewerId, null, importedRequired, SUBMITTED, version));
	}

	@Override
	public List<Category> getAllValidCategory(String version) {

		//return listResult(categoryDao.selectAll());
		return listResult(categoryDao.selectAll(version));
	}

	/**
	 * 查询对应父节点下对应状态的dto对象
	 *
	 * @param status   状态
	 * @param parentId 父节点的编号
	 * @return list
	 */
	@Override
	public List<CategoryDto> getDtoObjects(Integer status, Integer parentId, String version) {

		//		return listResult(
		//				categoryConverter.poListToDtoList(categoryDao.selectChildren(status, parentId)));
		return listResult(categoryConverter
				.poListToDtoList(categoryDao.select(null, null, parentId, null, status, version)));
	}

	/**
	 * 查询单个category
	 *
	 * @param objectId 节点Id
	 * @return CategoryDto
	 */
	@Override
	public CategoryDto getDtoObject(Integer objectId) {

		return categoryConverter.poToDto(
				objectResult(categoryDao.select(objectId, null, null, null, null, null),
						EMPTY_CATEGORY));
	}

	/**
	 * 获取对应父节点下的有效状态的dto对象
	 *
	 * @param parentId 父节点
	 * @return List
	 */
	@Override
	public List<CategoryDto> getDtoObjects(Integer parentId, String version) {
		//		return categoryConverter.poListToDtoList(categoryDao.selectValidChildren(parentId));
		return listResult(categoryConverter
				.poListToDtoList(categoryDao.selectValidChildren(parentId,version)));
	}
}