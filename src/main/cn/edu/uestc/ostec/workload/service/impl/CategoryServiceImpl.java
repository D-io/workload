package cn.edu.uestc.ostec.workload.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;

@Service(CategoryService.NAME)
public class CategoryServiceImpl extends BaseServiceImpl implements CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	/**
	 * 删除工作量类目
	 * @param categoryId 工作量条目Id
	 * @return Boolean
	 */
	@Override
	public Boolean removeCategory(Integer categoryId) {

		return categoryDao.updateStatus(DELETED,categoryId);
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