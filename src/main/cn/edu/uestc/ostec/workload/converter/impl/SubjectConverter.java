package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.stereotype.Component;

import java.text.ParseException;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dto.SubjectDto;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
@Component
public class SubjectConverter implements Converter<Subject,SubjectDto> {

	@Override
	public SubjectDto poToDto(Subject po) {

		SubjectDto subjectDto = new SubjectDto();
		subjectDto.setItemId(po.getItemId());
		subjectDto.setMsgContent(po.getMsgContent());
		subjectDto.setSendFromId(po.getSendFromId());

		subjectDto.setSendTime(DateHelper.getDateTime(po.getSendTime()));
		return subjectDto;
	}

	@Override
	public Subject dtoToPo(SubjectDto dto) {
		return null;
	}
}
