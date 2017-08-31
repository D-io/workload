

package cn.edu.uestc.ostec.workload.event.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.converter.impl.UserRoleConverter;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.dto.User;
import cn.edu.uestc.ostec.workload.event.UserRoleEvent;
import cn.edu.uestc.ostec.workload.service.UserRoleService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Description:
 */
@Service(UserRoleEvent.EVENT_NAME)
public class UserRoleEventImpl implements UserRoleEvent {

	@Autowired
	private UserRoleConverter userRoleConverter;

	@Autowired
	private UserRoleService userRoleService;

	/**
	 * 为指定用户分配角色(前提是user_role的数据表中要存在所有老师的信息)
	 *
	 * @param userId   追加角色的用户
	 * @param roleInfo 指定需要增加的角色
	 * @return boolean
	 */
	@Override
	public boolean appendRoleInfo(int userId, RoleInfo roleInfo) {

		User user = userRoleService.getUserRoleDto(userId);
		user.setUserId(userId);
		user.setDeadline(DateHelper.getDateTime());
		//获取当前用户已有角色
		List<RoleInfo> roleInfoList = user.getRoleInfoList();
		if (roleInfoList == null || roleInfoList.size() == 0) {
			//不存在角色列表，新增角色
			user.setRoleInfoList(roleInfo);
		} else if (!roleInfoList.contains(roleInfo)) {
			//列表中没有此角色，新增一项角色
			roleInfoList.add(roleInfo);
		} else {
			return false;
		}
		return userRoleService.saveUserRole(userRoleConverter.dtoToPo(user));
	}

	/**
	 * 删除指定用户的角色信息
	 *
	 * @param userId   持有特定角色的用户
	 * @param roleInfo 指定需要清理的角色
	 * @return boolean
	 */
	@Override
	public boolean clearRoleInfo(int userId, RoleInfo roleInfo) {
		//修改该组组长的角色信息
		User user = userRoleService.getUserRoleDto(userId);
		if (user.getStatus() == 0) {
			return false;
		}
		List<RoleInfo> roleInfoList = user.getRoleInfoList();
		if (roleInfoList == null || roleInfoList.size() == 0) {
			return false;
		}

		List<RoleInfo> roleInfos = new ArrayList<>();
		for (RoleInfo info : roleInfoList) {
			if (roleInfo.getRole().equals(info.getRole())) {
				roleInfos.add(info);
				break;
			}
		}
		roleInfoList.removeAll(roleInfos);
		user.setRoleInfoList(roleInfoList);

		return userRoleService.saveUserRole(userRoleConverter.dtoToPo(user));
	}

	/**
	 * 转移角色信息
	 *
	 * @param fromUserId 原持有角色的用户
	 * @param toUserId   新分配的用户
	 * @param roleInfo   角色信息
	 * @return boolean
	 */
	@Override
	public boolean transferRoleInfo(int fromUserId, int toUserId, RoleInfo roleInfo) {
		return clearRoleInfo(fromUserId, roleInfo) && appendRoleInfo(toUserId, roleInfo);
	}
}
