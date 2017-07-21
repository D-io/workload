package cn.edu.uestc.ostec.workload.converter.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dao.TeacherDao;
import cn.edu.uestc.ostec.workload.dto.FileDto;
import cn.edu.uestc.ostec.workload.pojo.File;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description: 文件转换器  )
 */
@Component
public class FileConverter implements Converter<File,FileDto> {

	@Autowired
	private TeacherDao teacherDao;

	@Override
	public FileDto poToDto(File po) {
		FileDto fileDto = new FileDto();

		fileDto.setCreateTime(po.getCreateTime());
		fileDto.setDeadlineDate(DateHelper.getDateTime(po.getDeadline()));
		fileDto.setFileId(po.getFileId());
		fileDto.setMime(po.getMime());
		fileDto.setPublisher(teacherDao.findNameById(po.getUserId()));
		fileDto.setUserId(po.getUserId());
		fileDto.setSize(po.getSize());
		fileDto.setType(po.getType());

		return fileDto;
	}

	@Override
	public File dtoToPo(FileDto dto) {
		File file = new File();
		file.setCreateTime(dto.getCreateTime());
		file.setUserId(dto.getUserId());
		file.setDeadline(DateHelper.getDateTimeStamp(dto.getDeadlineDate()));
		file.setMime(dto.getMime());
		file.setSize(dto.getSize());
		file.setType(dto.getType());
		return file;
	}
}
