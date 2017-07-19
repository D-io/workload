/*
 * AEMS（工程认证达成度评价管理系统）
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 17-4-21 下午3:38
 * Copyright: Copyright (c) 2017.
 */

package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.UserRole;

/**
 * Version:v1.0 (description:用户角色映射信息增删改查 )
 */
@Component
public interface UserRoleDao extends BaseDao<UserRole> {

	UserRole select(
			@Param("userId")
					Integer userId);

	/**
	 * 查询用户角色映射信息
	 *
	 * @param userId 用户Id
	 * @return List<UserRole>
	 */
	List<UserRole> selectList(
			@Param("userId")
					Integer userId);

	/**
	 * 更新用户角色映射信息 （映射关系不变）
	 *
	 * @param entity 用户角色映射信息
	 * @return Boolean
	 */
	@Override
	Boolean update(UserRole entity);

	/**
	 * 添加用户角色信息
	 *
	 * @param entity 用户角色映射信息
	 * @return Boolean
	 */
	Boolean add(UserRole entity);

	/**
	 * 根据用户Id和角色Id删除用户角色映射信息
	 *
	 * @param userId 用户Id
	 * @return Boolean
	 */
	Boolean delete(
			@Param("userId")
					Integer userId);
}