package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Teacher;

/**
 * Version:v1.0 (description:  )
 */
public interface TeacherService extends BaseService {

	String NAME = "teacherService";

	List<Teacher> findAll();

	String findTeacherNameById(Integer teacherId);

	Teacher findIdByName(String name);

}
