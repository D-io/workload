package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.SubjectDao;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.service.SubjectService;

/**
 * Version:v1.0 (description:  )
 */
@Service(SubjectService.NAME)
public class SubjectServiceImpl extends BaseServiceImpl implements SubjectService {

	@Autowired
	private SubjectDao subjectDao;

	@Override
	public Subject getSubject(Integer subjectId) {

		return objectResult(subjectDao.select(subjectId),EMPTY_SUBJECT);
	}

	@Override
	public List<Subject> getSubjectsByItem(Integer itemId) {

		return listResult(subjectDao.selectByItem(itemId));
	}

	@Override
	public Boolean addSubject(Subject subject) {

		subject.setSubjectId(getNextKey(Subject.TABLE_NAME));
		return subjectDao.insert(subject);
	}
}
