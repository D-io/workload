package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.pojo.Teacher;
import cn.edu.uestc.ostec.workload.service.TeacherService;

/**
 * Version:v1.0 (description:  )
 */
@Service(TeacherService.NAME)
public class TeacherServiceImpl extends BaseServiceImpl implements TeacherService {

	@Autowired
	private TeacherDao teacherDao;

	@Override
	public List<Teacher> findAll() {
		return listResult(teacherDao.findTeachers());
	}

	@Override
	public String findTeacherNameById(Integer teacherId) {
		return teacherDao.findNameById(teacherId);
	}
}
