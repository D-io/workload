/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: UserRoleService.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月14日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dto.User;
import cn.edu.uestc.ostec.workload.pojo.UserRole;

/**
 * Description:
 * Version:v1.0 (author:刘文哲 update:  )
 */
public interface UserRoleService extends BaseService {

	/**
	 * 空的用户角色映射对象
	 */
	UserRole EMPTY_USER_ROLE = new UserRole();

	String NAME = "userRoleService";

	/**
	 * 根据用户编号获取角色信息
	 *
	 * @param userId 用户编号
	 * @return UserRole
	 */
	UserRole getUserRole(int userId);

	/**
	 * 根据用户编号获取User对象（DTO对象）
	 *
	 * @param userId 用户编号
	 * @return User
	 */
	User getUserRoleDto(int userId);

	/**
	 * 获取全部用户角色信息
	 *
	 * @return List<UserRole>
	 */
	List<UserRole> getUserRoles();

	/**
	 * 保存用户角色信息
	 *
	 * @param userRole 用户角色信息
	 * @return boolean
	 */
	boolean saveUserRole(UserRole userRole);

	/**
	 * 保存用户角色信息
	 *
	 * @param user User DTO对象
	 * @return boolean
	 */
	boolean saveUserRole(User user);

	/**
	 * 删除用户角色信息
	 *
	 * @param userId 用户编号
	 * @return boolean
	 */
	boolean removeUserRole(Integer userId);

}
