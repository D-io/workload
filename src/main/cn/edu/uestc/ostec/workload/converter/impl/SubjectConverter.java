package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.SubjectDto;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
@Component
public class SubjectConverter implements Converter<Subject, SubjectDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Override
	public SubjectDto poToDto(Subject po) {

		SubjectDto subjectDto = new SubjectDto();
		subjectDto.setSubjectId(po.getSubjectId());
		subjectDto.setItemId(po.getItemId());
		subjectDto.setMsgContent(po.getMsgContent());
		subjectDto.setSendFromId(po.getSendFromId());
		subjectDto.setSendFromName(
				isNull(po.getSendFromId()) ? null : teacherDao.findNameById(po.getSendFromId()));

		subjectDto.setSendTime(
				isNull(po.getSendTime()) ? null : DateHelper.getDefaultDateTime(po.getSendTime()));
		return subjectDto;
	}

	@Override
	public Subject dtoToPo(SubjectDto dto) {
		return null;
	}
}
