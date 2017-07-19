package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.converter.impl.UserRoleConverter;
import cn.edu.uestc.ostec.workload.dao.UserRoleDao;
import cn.edu.uestc.ostec.workload.dto.User;
import cn.edu.uestc.ostec.workload.pojo.UserRole;
import cn.edu.uestc.ostec.workload.service.UserRoleService;

import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.CREATED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.INVALID;

/**
 * Description:
 * Version:v1.0 (author:刘文哲 update:  )
 */
@Service(UserRoleService.NAME)
public class UserRoleServiceImpl extends BaseServiceImpl implements UserRoleService {

	@Autowired
	private UserRoleDao userRoleDao;

	@Autowired
	private UserRoleConverter userRoleConverter;

	@Override
	public UserRole getUserRole(int userId) {

		return objectResult(userRoleDao.selectList(userId), null);
	}

	@Override
	public User getUserRoleDto(int userId) {
		return userRoleConverter.poToDto(getUserRole(userId));
	}

	@Override
	public List<UserRole> getUserRoles() {

		return listResult(userRoleDao.selectList(null));
	}

	@Override
	public boolean saveUserRole(UserRole userRole) {
		UserRole role = getUserRole(userRole.getUserId());
		if (role == null || role.getStatus() == INVALID) {
			userRole.setStatus(CREATED);
			return userRoleDao.add(userRole);
		}
		return userRoleDao.update(userRole);
	}

	@Override
	public boolean saveUserRole(User user) {
		return saveUserRole(userRoleConverter.dtoToPo(user));
	}

	@Override
	public boolean removeUserRole(Integer userId) {

		return userRoleDao.delete(userId);
	}
}
