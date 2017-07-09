package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Teacher;

/**
 * Version:v1.0 (description:  )
 */
@Component
public interface TeacherDao {

	/**
	 * 根据Id查询教师姓名和
	 * @param teacherId 教师编号
	 * @return String 教师姓名
	 */
	String findNameById(@Param("teacherId") Integer teacherId);

	/**
	 * 查询教师列表
	 * @return List<Teacher> 只有编号和姓名属性
	 */
	List<Teacher> findTeachers();

}
