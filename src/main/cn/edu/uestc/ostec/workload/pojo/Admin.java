package cn.edu.uestc.ostec.workload.pojo;

public class Admin {

	/**
	 * 管理员信息所在表名
	 */
	public static final String TABLE_NAME = "admin";

	/**
	 * 管理员编号
	 */
	private Integer adminId;

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}
}