package cn.edu.uestc.ostec.workload.pojo;

import java.util.Date;

public class Subject {

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
	private Integer sendfromId;

	/**
	 * 发送时间
	 */
	private Date sendTime;

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

	public Integer getSendfromId() {
		return sendfromId;
	}

	public void setSendfromId(Integer sendfromId) {
		this.sendfromId = sendfromId;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}
}