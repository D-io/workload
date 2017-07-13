/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileService.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月14日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.File;

/**
 * Description:
 */
public interface FileService extends BaseService {

	/**
	 * 空文件对象
	 */
	File EMPTY_FILE = new File();

	String NAME = "fileService";

	File getFile(Integer fileId);

	List<File> getFiles(Integer userId);

	List<File> getFiles();

	boolean saveFile(File file);

	boolean removeFile(Integer fileId);
}
