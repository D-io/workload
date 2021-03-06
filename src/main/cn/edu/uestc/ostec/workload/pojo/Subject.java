package cn.edu.uestc.ostec.workload.pojo;

import sun.misc.Version;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

public class Subject {

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
	 * 发送时间
	 */
	private Integer sendTime;

	/**
	 * 学期号
	 */
	private String version = DateHelper.getCurrentTerm();

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
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
		this.msgContent = msgContent == null ? null : msgContent.trim();
	}

	public Integer getSendTime() {
		return sendTime;
	}

	public void setSendTime(Integer sendTime) {
		this.sendTime = sendTime;
	}

	public Integer getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}

	public Integer getSendFromId() {
		return sendFromId;
	}

	public void setSendFromId(Integer sendFromId) {
		this.sendFromId = sendFromId;
	}

	@Override
	public String toString() {
		return "Subject{" + "subjectId=" + subjectId + ", itemId=" + itemId + ", msgContent='"
				+ msgContent + '\'' + ", sendFromId=" + sendFromId + ", sendTime=" + sendTime + '}';
	}
}