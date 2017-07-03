package cn.edu.uestc.ostec.workload.dao;

import cn.edu.uestc.ostec.workload.pojo.Reviewer;

public interface ReviewerDao {

    /**
     * 根据主键删除审核人对象
     * @param categoryId 审核人Id
     * @return int
     */
    int deleteByPrimaryKey(Integer categoryId);

    /**
     * 插入审核人对象
     * @param record 审核人对象
     * @return int
     */
    int insert(Reviewer record);

    /**
     * 根据主键查询审核人信息
     * @param categoryId 审核人Id
     * @return Reviewer
     */
    Reviewer selectByPrimaryKey(Integer categoryId);

    /**
     * 根据主键修改审核人信息
     * @param record 审核人信息
     * @return int
     */
    int updateByPrimaryKey(Reviewer record);
}