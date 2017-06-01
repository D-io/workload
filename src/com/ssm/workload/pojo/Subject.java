package com.ssm.workload.pojo;

import java.util.Date;

public class Subject {
    private Integer itemId;

    private String msgContent;

    private Integer sendfromId;

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