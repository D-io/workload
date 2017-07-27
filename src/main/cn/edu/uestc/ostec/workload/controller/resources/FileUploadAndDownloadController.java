/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileUploadAndDownloadController.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年7月8日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.controller.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

import cn.edu.uestc.ostec.workload.annotation.Log;
import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.event.FileEvent;
import cn.edu.uestc.ostec.workload.pojo.File;
import cn.edu.uestc.ostec.workload.pojo.FileInfo;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.service.FileInfoService;
import cn.edu.uestc.ostec.workload.service.FileService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.FILE_PATH;
import static cn.edu.uestc.ostec.workload.support.utils.FileHelper.getFileName;
import static cn.edu.uestc.ostec.workload.support.utils.ObjectHelper.isNull;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Description: 文件上传下载控制器
 */
@RestController
@RequestMapping(FILE_PATH)
public class FileUploadAndDownloadController extends ApplicationController {

	@Autowired
	private FileEvent fileEvent;

	@Autowired
	private FileService fileService;

	@Autowired
	private FileInfoService fileInfoService;

	@Log("文件上传")
	@RequestMapping(method = POST)
	public RestResponse fileUpload(MultipartFile file,
			@RequestParam("fileId")
					int fileId) throws IOException {

		if (file.isEmpty()) {
			return parameterNotSupportResponse("未获取到文件信息");
		}

		File requestFile = fileService.getFile(fileId);
		if (null == requestFile) {
			return parameterNotSupportResponse("参数有误");
		}

		//		//发布文件对应的有相应的限制条件
		//		if (file.getSize() > requestFile.getSize()) {
		//			return invalidOperationResponse("上传文件大于要求文件大小，无法上传");
		//		}
		//
		//		if (!getFileExtension(file.getOriginalFilename()).equals(requestFile.getMime())) {
		//			return invalidOperationResponse("文件类型错误，无法上传");
		//		}
		//
		//		if (DateHelper.getCurrentTimestamp() > requestFile.getDeadline()) {
		//			return invalidOperationResponse("文件上传已截止");
		//		}

		FileInfo fileInfo = new FileInfo(fileId, getUserId(), "");
		boolean isUpload = fileEvent.uploadFile(file, fileInfo);

		if (!isUpload) {
			return systemErrResponse("文件上传失败");
		}

		Map<String, Object> data = getData();
		data.put("fileInfo", fileInfo);

		return successResponse(data);

	}

	@Log("文件下载")
	@RequestMapping(method = GET)
	public RestResponse fileDownload(
			@RequestParam("fileInfoId")
					int fileInfoId) throws IOException {

		if (ZERO_INT == fileInfoId) {
			return parameterNotSupportResponse();
		}

		FileInfo fileInfo = fileEvent.downloadFile(fileInfoId);

		if (isNull(fileInfo)) {
			return invalidOperationResponse();
		}

		return streamResponse(fileInfo, getFileName(fileInfo.getPath()));
	}

	/**
	 * 提交上传的文件
	 *
	 * @param fileInfoId 文件信息编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "submit", method = POST)
	public RestResponse submitFile(
			@RequestParam("fileInfoId")
					int fileInfoId) {

		if (ZERO_INT == fileInfoId) {
			return parameterNotSupportResponse();
		}

		FileInfo fileInfo = fileInfoService.getFileInfo(fileInfoId);
		if (isNull(fileInfo)) {
			return invalidOperationResponse();
		}

		if (!UNCOMMITTED.equals(fileInfo.getStatus())) {
			return invalidOperationResponse("无法提交");
		}

		fileInfo.setStatus(SUBMITTED);
		boolean submitSuccess = fileInfoService.saveFileInfo(fileInfo);
		if (!submitSuccess) {
			return systemErrResponse("文件上传失败");
		}

		Map<String, Object> data = getData();
		data.put("fileInfo", fileInfo);

		return successResponse(data);
	}

}
