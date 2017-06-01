package com.ssm.workload.dao;

import java.util.List;
import java.util.Map;

import com.ssm.workload.pojo.Category;

public interface CategoryDao {
	//根据主键删除工作量条目
    public int deleteByPrimaryKey(Integer categoryId);
    //新增工作量条目
    public int insert(Map<String,Object> category);
    //修改工作量条目
    public int updateByPrimaryKey(Category category);
    //根据主键修改工作量状态
    public int updateStatus(String status,Integer categoryId);
    //根据主键查询工作量条目
    public Category selectByPrimaryKey(Integer categoryId);
    //查询某一工作量条目下的工作量条目
    public List<Category> selectChildren(String status,Integer parentId);
    //查询删除的全部工作量条目(工作量状态为-1)
    public List<Category> selectDisable(String status);
    /**
     * 根据工作量类型查询工作量条目
     * @param importRequied 标识工作量为审核类：0；还是复核类：1
     */
    public List<Category> selectByImportRequied(String importRequied);
}