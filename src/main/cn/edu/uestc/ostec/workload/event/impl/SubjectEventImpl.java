/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.event.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.uestc.ostec.workload.event.SubjectEvent;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.Subject;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.service.SubjectService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
@Service(SubjectEvent.EVENT_NAME)
public class SubjectEventImpl implements SubjectEvent {

	@Autowired
	private ItemService itemService;

	@Autowired
	private SubjectService subjectService;

	@Override
	public boolean sendMessageAboutItem(Item item, String message, Integer userId) {

		boolean saveItem = itemService.saveItem(item);

		Subject subject = new Subject();

		subject.setItemId(item.getItemId());
		subject.setSendTime(DateHelper.getCurrentTimestamp());
		subject.setMsgContent(message);
		subject.setSendFromId(userId);

		boolean saveSubject = subjectService.addSubject(subject);
		return saveItem && saveSubject;
	}
}
