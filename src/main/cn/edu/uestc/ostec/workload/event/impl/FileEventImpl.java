/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileEventImpl.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月19日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.event.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.service.FileInfoService;
import cn.edu.uestc.ostec.workload.service.FileService;

import static cn.edu.uestc.ostec.workload.support.utils.DateHelper.getCurrentTimestamp;
import static cn.edu.uestc.ostec.workload.support.utils.FileHelper.buildFilePath;
import static cn.edu.uestc.ostec.workload.support.utils.FileHelper.getFileExtension;
import static cn.edu.uestc.ostec.workload.support.utils.FileHelper.getFileMd5Digest;
import static cn.edu.uestc.ostec.workload.support.utils.ObjectHelper.isNull;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;

/**
 * Description:
 */
@Service(FileEvent.EVENT_NAME)
public class FileEventImpl implements FileEvent {

	@Autowired
	private FileInfoService fileInfoService;

	@Autowired
	private FileService fileService;

	@Override
	public boolean submitFileInfo(int fileInfoId) {
		FileInfo fileInfo = fileInfoService.getFileInfo(fileInfoId);
		if(null == fileInfo) {
			return false;
		}
		fileInfo.setStatus(SUBMITTED);
		return fileInfoService.saveFileInfo(fileInfo);
	}

	@Override
	public boolean uploadFile(MultipartFile file, FileInfo fileInfo) throws IOException {
		//获取文件名称
		String fileName = file.getOriginalFilename();
		//生成服务器文件路径（包含名称）
		String filePath = buildFilePath(getFileUploadPath(), fileName);
		java.io.File newFile = new java.io.File(filePath);
		//将文件存档至目标文件
		file.transferTo(newFile);

		//将文件信息持久化（存储至数据库）
		fileInfo.setCreateTime(getCurrentTimestamp());
		fileInfo.setSize(newFile.length());
		fileInfo.setPath(filePath);
		fileInfo.setStatus(UNCOMMITTED);
		fileInfo.setType(getFileExtension(fileName));
		try {
			fileInfo.setMd5Summary(getFileMd5Digest(newFile));
		} catch (NoSuchAlgorithmException e) {
			fileInfo.setMd5Summary("");
		}

		//将文件信息保存至数据库
		return fileInfoService.saveFileInfo(fileInfo);
	}

	@Override
	public FileInfo downloadFile(int fileInfoId) {

		FileInfo fileInfo = fileInfoService.getFileInfo(fileInfoId);

		if (isNull(fileInfo.getFileInfoId())) {
			return null;
		}

		return fileInfo;
	}
}
