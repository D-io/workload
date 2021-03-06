package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description:  )
 */
public class SubjectDto {

	/**
	 * 交互信息所在表名
	 */
	public static final String TABLE_NAME = "subject";

	/**
	 * 交互编号
	 */
	private Integer subjectId;

	/**
	 * 存疑工作量编号
	 */
	private Integer itemId;

	/**
	 * 交互内容
	 */
	private String msgContent;

	/**
	 * 发送人编号
	 */
	private Integer sendFromId;

	/**
	 * 发送人姓名
	 */
	private String sendFromName;

	/**
	 * 发送时间
	 */
	private String sendTime;

	public Integer getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getMsgContent() {
		return msgContent;
	}

	public void setMsgContent(String msgContent) {
		this.msgContent = msgContent;
	}

	public Integer getSendFromId() {
		return sendFromId;
	}

	public void setSendFromId(Integer sendFromId) {
		this.sendFromId = sendFromId;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}

	public String getSendFromName() {
		return sendFromName;
	}

	public void setSendFromName(String sendFromName) {
		this.sendFromName = sendFromName;
	}
}
