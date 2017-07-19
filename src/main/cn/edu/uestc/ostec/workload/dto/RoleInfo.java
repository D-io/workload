package cn.edu.uestc.ostec.workload.dto;

/**
 * Description: 角色信息
 */
public class RoleInfo {

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
}
