/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileInfoServiceImpl.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月17日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


import cn.edu.uestc.ostec.workload.dao.FileInfoDao;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.service.FileInfoService;

/**
 * Description: 文件信息服务实现
 */
@Service(FileInfoService.NAME)
public class FileInfoServiceImpl extends BaseServiceImpl implements FileInfoService {

	@Autowired
	private FileInfoDao fileInfoDao;

	@Override
	public FileInfo getFileInfo(Integer fileInfoId) {

		return objectResult(fileInfoDao.select(fileInfoId,null),EMPTY_FILE_INFO);
	}

	@Override
	public List<FileInfo> getFileInfoByAuthor(Integer authorId) {

		return listResult(fileInfoDao.select(null,authorId));
	}

	@Override
	public boolean saveFileInfo(FileInfo fileInfo) {
		if (!hasObjectId(fileInfo.getFileInfoId())) {
			fileInfo.setFileInfoId(getNextKey(FileInfo.TABLE_NAME));

			return fileInfoDao.insert(fileInfo);
		}

		return fileInfoDao.update(fileInfo);
	}

	@Override
	public boolean removeFileInfo(Integer fileInfoId) {

		return fileInfoDao.delete(fileInfoId);
	}
}
