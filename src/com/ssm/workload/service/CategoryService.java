package com.ssm.workload.service;
import java.util.List;
import java.util.Map;

import com.ssm.workload.pojo.Category;

public interface CategoryService {
	//删除工作量条目
    public String deleteCategory(String categoryId);
    //增加工作量条目
    public int insertCategory(Map<String, Object> category);
    //修改工作量条目
    public String updateCategory(Category category);
    //根据主键修改工作量条目状态
    public String updateCategoryStatus(String status,String categoryId);
    //查看工作量条目详情
    public Category selectCategoryById(Integer categoryId);
    //查询某一工作量条目下的子条目
    public List<Category> selectCategoryChildren(String status,Integer parentId);
    //查询删除的全部工作量条目(工作量状态为-1)
    public List<Category> selectCategoryDisable(String status);
    /**
     * 根据工作量类型查询工作量条目
     * @param importRequied 标识工作量为审核类：0；还是复核类：1
     */
    public List<Category> selectCategoryByImportRequied(String importRequied);
}
