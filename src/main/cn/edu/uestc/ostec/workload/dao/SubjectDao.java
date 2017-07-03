package cn.edu.uestc.ostec.workload.dao;

import cn.edu.uestc.ostec.workload.pojo.Subject;

public interface SubjectDao {

    /**
     * 插入交互对象
     * @param record 交互对象
     * @return int
     */
    int insert(Subject record);

    /**
     * 选择性插入？？？
     * @param record 交互对象I
     * @return int
     */
    int insertSelective(Subject record);
}