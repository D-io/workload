package cn.edu.uestc.ostec.workload.dto;

import java.io.Serializable;

/**
 * Description: 角色信息
 */
public class RoleInfo implements Serializable {

	private String role;

	private String roleName;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public RoleInfo() {
	}

	public RoleInfo(String role, String roleName ) {
		this.role = role;
		this.roleName = roleName;
	}


	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Override
	public String toString() {
		return "RoleInfo{" + "role='" + role + '\'' + ", roleName='" + roleName + '\'' + '}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		RoleInfo roleInfo = (RoleInfo) o;

		if (role != null ? !role.equals(roleInfo.role) : roleInfo.role != null)
			return false;
		return roleName != null ? roleName.equals(roleInfo.roleName) : roleInfo.roleName == null;
	}

	@Override
	public int hashCode() {
		int result = role != null ? role.hashCode() : 0;
		result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
		return result;
	}
}
