package com.ssm.workload.service;
import java.util.List;
import java.util.Map;

import com.ssm.workload.pojo.Category;

public interface CategoryService {
	//ɾ����������Ŀ
    public String deleteCategory(String categoryId);
    //���ӹ�������Ŀ
    public int insertCategory(Map<String, Object> category);
    //�޸Ĺ�������Ŀ
    public String updateCategory(Category category);
    //���������޸Ĺ�������Ŀ״̬
    public String updateCategoryStatus(String status,String categoryId);
    //�鿴��������Ŀ����
    public Category selectCategoryById(Integer categoryId);
    //��ѯĳһ��������Ŀ�µ�����Ŀ
    public List<Category> selectCategoryChildren(String status,Integer parentId);
    //��ѯɾ����ȫ����������Ŀ(������״̬Ϊ-1)
    public List<Category> selectCategoryDisable(String status);
    /**
     * ���ݹ��������Ͳ�ѯ��������Ŀ
     * @param importRequied ��ʶ������Ϊ����ࣺ0�����Ǹ����ࣺ1
     */
    public List<Category> selectCategoryByImportRequied(String importRequied);
}
