/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: UserRoleEvent.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年7月9日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.event;

import org.springframework.transaction.annotation.Transactional;

import cn.edu.uestc.ostec.workload.dto.RoleInfo;

/**
 * Description:
 * Version:v1.0 (author:刘文哲 update:  )
 */
public interface UserRoleEvent extends IEvent {

	/**
	 * 追加用户角色
	 *
	 * @param userId   追加角色的用户
	 * @param roleInfo 指定需要增加的角色
	 */
	@Transactional
	boolean appendRoleInfo(int userId, RoleInfo roleInfo);

	/**
	 * 清理用户角色
	 *
	 * @param userId   持有特定角色的用户
	 * @param roleInfo 指定需要清理的角色
	 */
	@Transactional
	boolean clearRoleInfo(int userId, RoleInfo roleInfo);

	/**
	 * 转移角色信息至目标用户
	 *
	 * @param fromUserId 原持有角色的用户
	 * @param toUserId   新分配的用户
	 * @param roleInfo   角色信息
	 */
	@Transactional
	boolean transferRoleInfo(int fromUserId, int toUserId, RoleInfo roleInfo);

}
