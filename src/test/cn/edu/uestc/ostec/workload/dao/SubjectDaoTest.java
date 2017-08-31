package cn.edu.uestc.ostec.workload.dao;

import org.junit.Test;


import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.service.TeacherWorkloadService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
public class SubjectDaoTest extends BaseTest {

	private SubjectDao subjectDao;

	private Subject subject;

	private TeacherWorkloadService teacherWorkloadService;

	{
		subjectDao = getBean(SubjectDao.class);
		teacherWorkloadService = getBean(TeacherWorkloadService.class);
		subject = new Subject();

		subject.setItemId(2);
		subject.setSubjectId(1);
		subject.setMsgContent("你好");
		subject.setSendFromId(12);
		subject.setSendTime(DateHelper.getCurrentTimestamp());
	}

	@Test
	public void select() throws Exception {
		System.out.println(subjectDao.select(1));
		System.out.println(subjectDao.selectByItem(2));
	}

	@Test
	public void insert() throws Exception {
		//System.out.println(subjectDao.insert(subject));
		TeacherWorkload teacherWorkload = teacherWorkloadService.getTeacherWorkload(3210343,"2017-2018-1");
		teacherWorkload.setCheckedWorkload(1.0);
		System.out.println(teacherWorkloadService.saveTeacherWorkload(teacherWorkload));
	}

}