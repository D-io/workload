package cn.edu.uestc.ostec.workload.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.IMPORT_EXCEL;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;

@Service(CategoryService.NAME)
public class CategoryServiceImpl extends BaseServiceImpl implements CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	/**
	 * 获取删除了得工作量条目
	 * @return List<Category>
	 */
	public List<Category> getDisableCategories(){

		return getCategoriesByStatus(DELETED);
	}

	/**
	 * 获取已经提交了的工作量条目
	 * @return List<Category>
	 */
	public List<Category> getSubmittedCategories(){

		return getCategoriesByStatus(SUBMITTED);
	}

	/**
	 * 获取父节点对应的有效的子节点工作量条目
	 * @param parentId 父节点条目Id
	 * @return List<Category>
	 */
	public List<Category> getValidChildren(Integer parentId){

		return getCategoryChildren(DELETED,parentId);
	}

	/**
	 * 获取以Excel方式导入的工作量条目
	 * @return
	 */
	public List<Category> getImportedCategory(){

		return getCategoriesByType(IMPORT_EXCEL);
	}

	/**
	 * 删除工作量类目
	 * @param categoryId 工作量条目Id
	 * @return Boolean
	 */
	@Override
	public Boolean removeCategory(Integer categoryId) {

		return categoryDao.delete(categoryId);
	}

	/**
	 * 保存工作量条目
	 * @param category 工作量条目
	 * @return Boolean
	 */
	@Override
	public Boolean saveCategory(Category category) {
		if(!hasObjectId(category.getCategoryId())){
			category.setCategoryId(getNextKey(Category.TABLE_NAME));
			return categoryDao.insert(category);
		}

		return categoryDao.update(category);
	}

	@Override
	public Boolean saveCategory(Integer status, Integer categoryId) {
		return categoryDao.updateStatus(status,categoryId);
	}

	@Override
	public Category getCategory(Integer categoryId) {
		return objectResult(categoryDao.select(categoryId),EMPTY_CATEGORY);
	}

	@Override
	public List<Category> getCategoryChildren(Integer status, Integer parentId) {
		return listResult(categoryDao.selectChildren(status,parentId));
	}

	@Override
	public List<Category> getCategoriesByStatus(Integer status) {
		return listResult(categoryDao.selectByStatus(status));
	}

	@Override
	public List<Category> getCategoriesByType(Integer importRequired) {
		return listResult(categoryDao.selectByImportRequired(importRequired));
	}
}