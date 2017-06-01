package com.ssm.workload.dao;

import com.ssm.workload.pojo.Reviewer;

public interface ReviewerDao {
    int deleteByPrimaryKey(Integer categoryId);

    int insert(Reviewer record);
    
    Reviewer selectByPrimaryKey(Integer categoryId);

    int updateByPrimaryKey(Reviewer record);
}