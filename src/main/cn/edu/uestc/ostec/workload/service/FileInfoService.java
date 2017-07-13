/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileInfoService.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月14日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.FileInfo;

/**
 * Description:
 */
public interface FileInfoService extends BaseService {

	/**
	 * 空的文件信息对象
	 */
	FileInfo EMPTY_FILE_INFO = new FileInfo();

	String NAME = "fileInfoService";

	FileInfo getFileInfo(Integer fileInfoId);

	List<FileInfo> getFileInfoByAuthor(Integer authorId);

	boolean saveFileInfo(FileInfo fileInfo);

	boolean removeFileInfo(Integer fileInfoId);

}
