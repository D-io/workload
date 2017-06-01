package com.ssm.workload.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ssm.workload.dao.CategoryDao;
import com.ssm.workload.pojo.Category;
import com.ssm.workload.service.CategoryService;
@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {
	private CategoryDao categoryDao;
	@Override
	public String deleteCategory(String categoryId) {
		int delete = categoryDao.deleteByPrimaryKey(Integer.valueOf(categoryId));
		String message="";  
        if(delete > 0){  
            message = "ɾ���ɹ�";  
        }else{  
            message = "ɾ��ʧ��";  
        }  
        return message;
	}

	@Override
	public int insertCategory(Map<String,Object> category) {
		int insert = categoryDao.insert(category);
        if(insert > 0){
            int categoryId = Integer.parseInt(category.get("categoryId").toString());
            return categoryId;
        }else{
            return -1;  
        }
	}

	@Override
	public String updateCategory(Category category) {
		int update = categoryDao.updateByPrimaryKey(category);
		String message="";  
        if(update > 0){  
            message = "�޸ĳɹ�";  
        }else{  
            message = "�޸�ʧ��";  
        }  
        return message;
	}
	
	@Override
	public String updateCategoryStatus(String status,String categoryId){
		int update = categoryDao.updateStatus(status,Integer.valueOf(categoryId));
		String message="";  
        if(update > 0){  
            message = "�޸ĳɹ�";  
        }else{  
            message = "�޸�ʧ��";  
        }  
        return message;
	}

	@Override
	public Category selectCategoryById(Integer categoryId) {
		Category cotegory = categoryDao.selectByPrimaryKey(categoryId);
		return cotegory;
	}

	@Override
	public List<Category> selectCategoryChildren(String status,Integer parentId) {
		List<Category> categoryList = categoryDao.selectChildren(status, parentId);
		return categoryList;
	}

	@Override
	public List<Category> selectCategoryDisable(String status) {
		List<Category> categoryList = categoryDao.selectDisable(status);
		return categoryList;
	}

	@Override
	public List<Category> selectCategoryByImportRequied(String importRequied) {
		List<Category> categoryList = categoryDao.selectByImportRequied(importRequied);
		return categoryList;
	}

}
