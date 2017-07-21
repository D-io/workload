package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description: 文件信息传输对象  )
 */
public class FileDto {

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
	private String deadlineDate;

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

	private String publisher;

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

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

	public String getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(String deadlineDate) {
		this.deadlineDate = deadlineDate;
	}


}
