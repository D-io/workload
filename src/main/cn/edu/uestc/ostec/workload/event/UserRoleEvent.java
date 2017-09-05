package cn.edu.uestc.ostec.workload.event;

import org.springframework.transaction.annotation.Transactional;

import cn.edu.uestc.ostec.workload.dto.RoleInfo;

/**
 * Description: 角色管理事件
 */
public interface UserRoleEvent extends IEvent {

	/**
	 * 服务名称
	 */
	String EVENT_NAME = "userRoleEvent";

	/**
	 * 追加用户角色
	 *
	 * @param userId   追加角色的用户
	 * @param roleInfo 指定需要增加的角色
	 */
	@Transactional
	boolean appendRoleInfo(Integer userId, RoleInfo roleInfo);

	/**
	 * 清理用户角色
	 *
	 * @param userId   持有特定角色的用户
	 * @param roleInfo 指定需要清理的角色
	 */
	@Transactional
	boolean clearRoleInfo(Integer userId, RoleInfo roleInfo);

	/**
	 * 转移角色信息至目标用户
	 *
	 * @param fromUserId 原持有角色的用户
	 * @param toUserId   新分配的用户
	 * @param roleInfo   角色信息
	 */
	@Transactional
	boolean transferRoleInfo(Integer fromUserId, Integer toUserId, RoleInfo roleInfo);

}
