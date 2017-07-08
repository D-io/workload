package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Version:v1.0 (description:  )
 */
@Component
public interface TeacherDao {

	String findNameById(@Param("teacherId") Integer teacherId);

}
