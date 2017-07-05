package cn.edu.uestc.ostec.workload.dao;

import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Reviewer;

@Component
public interface ReviewerDao extends BaseDao<Reviewer> {

    /**
     * 修改审核人信息
     * @param entity 审核人信息
     * @return Boolean
     */
    @Override
    Boolean update(Reviewer entity);

    /**
     * 根据主键删除审核人对象
     * @param id 审核人Id
     * @return Boolean
     */
    @Override
    Boolean delete(Integer id);

    /**
     * 根据类目查询审核人信息
     * @param id 类目Id
     * @return Reviewer
     */
    @Override
    Reviewer select(Integer id);

    /**
     * 根据审核人Id查询对应的审核的类目的信息
     * @param reviewerId 审核人Id
     * @return List<Reviewer>
     */
    List<Reviewer> selectByReviewer(Integer reviewerId);

    /**
     * 插入审核人对象
     * @param record 审核人对象
     * @return Boolean
     */
    @Override
    Boolean insert(Reviewer record);
}