package cn.edu.uestc.ostec.workload.dao;

import com.sun.org.apache.xpath.internal.operations.Bool;

import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Subject;

@Component
public interface SubjectDao extends BaseDao<Subject>{

    /**
     * 根据ItemId查询交互对象
     * @param itemId 工作量ID
     * @return List<Subject>
     */
    List<Subject> selectByItem(int itemId);

    /**
     * 查询交互对象
     * @param id 实体对象Id
     * @return Subject
     */
    @Override
    Subject select(Integer id);

    /**
     * 插入交互对象
     * @param record 交互对象
     * @return int
     */
    Boolean insert(Subject record);
}