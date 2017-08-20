package cn.edu.uestc.ostec.workload.converter.impl;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.dto.User;
import cn.edu.uestc.ostec.workload.pojo.UserRole;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.OBJECT_MAPPER;

/**
 * Description: 用户角色信息和UserDto对象的转换
 */
@Component
public class UserRoleConverter implements Converter<UserRole, User> {

	@Override
	public User poToDto(UserRole po) {
		User user = new User();
		if (po != null) {
			user.setUserId(po.getUserId());
			List<RoleInfo> roleInfoList = readValueFromJson(po.getRole(), RoleInfo.class);

			user.setRoleInfoList(roleInfoList);
			user.setStatus(po.getStatus());
			user.setDeadline(
					isNull(po.getDeadline()) ? null : DateHelper.getDefaultDateTime(po.getDeadline()));
		}

		return user;
	}

	@Override
	public UserRole dtoToPo(User dto) {
		UserRole userRole = new UserRole();
		if (dto != null) {
			userRole.setUserId(dto.getUserId());
			userRole.setDeadline(DateHelper.getDefaultTimeStamp(dto.getDeadline()));
			userRole.setStatus(dto.getStatus());
			String roleInfo = null;
			try {
				if (null != dto.getRoleInfoList()) {
					roleInfo = OBJECT_MAPPER.writeValueAsString(dto.getRoleInfoList());
				} else {
					roleInfo = null;
				}
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			userRole.setRole(roleInfo);
		}

		return userRole;
	}
}
