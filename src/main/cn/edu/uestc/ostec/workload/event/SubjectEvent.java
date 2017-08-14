/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.event;

import javax.transaction.Transactional;

import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.Subject;

/**
 * Version:v1.0 (description:  )
 */
public interface SubjectEvent extends IEvent {

	String EVENT_NAME = "subjectEvent";

	/**
	 * 对条目存疑或者其他状态时发送相应的消息，保存subject和item到数据库
	 * @param item 条目信息
	 * @return boolean
	 */
	@Transactional
	boolean sendMessageAboutItem(Item item,String message,Integer userId);
}
