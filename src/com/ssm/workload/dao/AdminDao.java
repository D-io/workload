package com.ssm.workload.dao;

import com.ssm.workload.pojo.Admin;

public interface AdminDao {
    int deleteByPrimaryKey(Integer adminId);

    int insert(Admin record);

    int insertSelective(Admin record);
}