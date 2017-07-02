package cn.edu.uestc.ostec.workload.dao;

import cn.edu.uestc.ostec.workload.pojo.Admin;

public interface AdminDao {

    /**
     * 删除管理员
     * @param adminId 管理员编号
     * @return int
     */
    int deleteByPrimaryKey(Integer adminId);

    /**
     * 插入管理员信息
     * @param record 管理员信息
     * @return int
     */
    int insert(Admin record);

    /**
     *
     * @param record
     * @return
     */
    int insertSelective(Admin record);
}