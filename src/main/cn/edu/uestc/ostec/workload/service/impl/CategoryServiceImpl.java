package cn.edu.uestc.ostec.workload.service.impl;

import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.dao.CategoryDao;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.service.CategoryService;

@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {

	private CategoryDao categoryDao;

	@Override
	public String deleteCategory(String categoryId) {
		Boolean delete = categoryDao.delete(Integer.valueOf(categoryId));
		String message = "";
		if (true == delete) {
			message = "删除成功";
		} else {
			message = "删除失败";
		}
		return message;
	}

	@Override
	public int insertCategory(Category category) {
		Boolean insert = categoryDao.insert(category);
		if (true == insert) {
			int categoryId = category.getCategoryId();
			return categoryId;
		} else {
			return -1;
		}
	}

	@Override
	public String updateCategory(Category category) {
		Boolean update = categoryDao.update(category);
		String message = "";
		if (true == update) {
			message = "修改成功";
		} else {
			message = "修改失败";
		}
		return message;
	}

	@Override
	public String updateCategoryStatus(String status, String categoryId) {
		Boolean update = categoryDao.updateStatus(status, Integer.valueOf(categoryId));
		String message = "";
		if (true == update) {
			message = "修改成功";
		} else {
			message = "修改失败";
		}
		return message;
	}

	@Override
	public Category selectCategoryById(Integer categoryId) {
		Category cotegory = categoryDao.select(categoryId);
		return cotegory;
	}

	@Override
	public List<Category> selectCategoryChildren(String status, Integer parentId) {
		List<Category> categoryList = categoryDao.selectChildren(status, parentId);
		return categoryList;
	}

	@Override
	public List<Category> selectCategoryDisable(String status) {
		List<Category> categoryList = categoryDao.selectDisable(status);
		return categoryList;
	}

	@Override
	public List<Category> selectCategoryByImportRequired(String importRequired) {
		List<Category> categoryList = categoryDao.selectByImportRequired(importRequired);
		return categoryList;
	}

}