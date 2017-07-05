/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileInfo.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.pojo;

/**
 * 文件信息
 */
public class FileInfo {

	/**
	 * 文件信息所在关联的表名
	 */
	public static final String TABLE_NAME = "file_info";

	/**
	 * 文件信息编号
	 */
	private Integer fileInfoId;

	/**
	 * 文件上传路径
	 */
	private String path;

	/**
	 * 文件大小
	 */
	private Long size;

	/**
	 * md5文件完整信息
	 */
	private String md5Summary;

	/**
	 * 文件类型
	 */
	private String type;

	/**
	 * 创建时间
	 */
	private Integer createTime;

	/**
	 * 状态值
	 */
	private Integer status;

	/**
	 * 文件编号
	 */
	private Integer fileId;

	/**
	 * 文件作者
	 */
	private Long authorId;

	/**
	 * 接收人列表
	 */
	private String recipientsList;

	public FileInfo() {
	}

	public FileInfo(Integer fileId, Long authorId, String recipientsList) {
		this.fileId = fileId;
		this.authorId = authorId;
		this.recipientsList = recipientsList;
	}

	public FileInfo(String path, Long size, String md5Summary, String type, Integer createTime,
			Integer status, Integer fileId, Long authorId, String recipientsList) {
		this.path = path;
		this.size = size;
		this.md5Summary = md5Summary;
		this.type = type;
		this.createTime = createTime;
		this.status = status;
		this.fileId = fileId;
		this.authorId = authorId;
		this.recipientsList = recipientsList;
	}

	public Integer getFileInfoId() {
		return fileInfoId;
	}

	public void setFileInfoId(Integer fileInfoId) {
		this.fileInfoId = fileInfoId;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path == null ? null : path.trim();
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getMd5Summary() {
		return md5Summary;
	}

	public void setMd5Summary(String md5Summary) {
		this.md5Summary = md5Summary == null ? null : md5Summary.trim();
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type == null ? null : type.trim();
	}

	public Integer getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Integer createTime) {
		this.createTime = createTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getFileId() {
		return fileId;
	}

	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}

	public Long getAuthorId() {
		return authorId;
	}

	public void setAuthorId(Long authorId) {
		this.authorId = authorId;
	}

	public String getRecipientsList() {
		return recipientsList;
	}

	public void setRecipientsList(String recipientsList) {
		this.recipientsList = recipientsList == null ? null : recipientsList.trim();
	}

	@Override
	public String toString() {
		return "FileInfo{" + "fileInfoId=" + fileInfoId + ", path='" + path + '\'' + ", size="
				+ size + ", md5Summary='" + md5Summary + '\'' + ", type='" + type + '\''
				+ ", createTime=" + createTime + ", status=" + status + ", fileId=" + fileId
				+ ", authorId=" + authorId + ", recipientsList='" + recipientsList + '\'' + '}';
	}
}