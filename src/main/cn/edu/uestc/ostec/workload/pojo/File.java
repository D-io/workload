/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: File.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Date: 2017年5月7日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.pojo;

import java.util.Objects;

/**
 * Description: 文件（自定义文件上传格式及个数）
 */
public class File {

	/**
	 * 文件所在关联的表名
	 */
	public static final String TABLE_NAME = "file";

	/**
	 * 文件编号
	 */
	private Integer fileId;

	/**
	 * 文件约束
	 */
	private String mime;

	/**
	 * 创建时间
	 */
	private Integer createTime;

	/**
	 * 截止日期
	 */
	private Integer deadline;

	/**
	 * 文件大小
	 */
	private Long size;

	/**
	 * 文件类型（待扩展）
	 */
	private String type;

	/**
	 * 编辑者
	 */
	private Integer userId;

	public Integer getFileId() {
		return fileId;
	}

	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}

	public String getMime() {
		return mime;
	}

	public void setMime(String mime) {
		this.mime = mime;
	}

	public Integer getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Integer createTime) {
		this.createTime = createTime;
	}

	public Integer getDeadline() {
		return deadline;
	}

	public void setDeadline(Integer deadline) {
		this.deadline = deadline;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "File{" + "fileId=" + fileId + ", mime='" + mime + '\'' + ", createTime="
				+ createTime + ", deadline=" + deadline + ", size=" + size + ", type='" + type
				+ '\'' + ", userId=" + userId + '}';
	}

	public static final File FILE = new File();

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		File file = (File) o;
		return Objects.equals(fileId, file.fileId) && Objects.equals(mime, file.mime) && Objects
				.equals(createTime, file.createTime) && Objects.equals(deadline, file.deadline)
				&& Objects.equals(size, file.size) && Objects.equals(type, file.type) && Objects
				.equals(userId, file.userId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(fileId, mime, createTime, deadline, size, type, userId);
	}
}