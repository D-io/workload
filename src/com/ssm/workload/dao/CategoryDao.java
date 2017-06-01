package com.ssm.workload.dao;

import java.util.List;
import java.util.Map;

import com.ssm.workload.pojo.Category;

public interface CategoryDao {
	//��������ɾ����������Ŀ
    public int deleteByPrimaryKey(Integer categoryId);
    //������������Ŀ
    public int insert(Map<String,Object> category);
    //�޸Ĺ�������Ŀ
    public int updateByPrimaryKey(Category category);
    //���������޸Ĺ�����״̬
    public int updateStatus(String status,Integer categoryId);
    //����������ѯ��������Ŀ
    public Category selectByPrimaryKey(Integer categoryId);
    //��ѯĳһ��������Ŀ�µĹ�������Ŀ
    public List<Category> selectChildren(String status,Integer parentId);
    //��ѯɾ����ȫ����������Ŀ(������״̬Ϊ-1)
    public List<Category> selectDisable(String status);
    /**
     * ���ݹ��������Ͳ�ѯ��������Ŀ
     * @param importRequied ��ʶ������Ϊ����ࣺ0�����Ǹ����ࣺ1
     */
    public List<Category> selectByImportRequied(String importRequied);
}