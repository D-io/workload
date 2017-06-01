package com.ssm.workload.dao;

import com.ssm.workload.pojo.Subject;

public interface SubjectDao {
    int insert(Subject record);

    int insertSelective(Subject record);
}