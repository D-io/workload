/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileServiceImpl.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月17日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.FileDao;
import cn.edu.uestc.ostec.workload.pojo.File;
import cn.edu.uestc.ostec.workload.service.FileService;

/**
 * Description:
 */
@Service(FileService.NAME)
public class FileServiceImpl extends BaseServiceImpl implements FileService {

	@Autowired
	private FileDao fileDao;

	@Override
	public File getFile(Integer fileId) {

		return objectResult(fileDao.select(fileId,null),EMPTY_FILE);
	}

	@Override
	public List<File> getFiles(Integer userId) {

		return listResult(fileDao.select(null,userId));
	}

	@Override
	public List<File> getFiles() {

		return listResult(fileDao.select(null,null));
	}

	@Override
	public boolean saveFile(File file) {
		if (!hasObjectId(file.getFileId())) {
			file.setFileId(getNextKey(File.TABLE_NAME));

			return fileDao.insert(file);
		}

		return fileDao.update(file);
	}

	@Override
	public boolean removeFile(Integer fileId) {

		return fileDao.delete(fileId);
	}
}
