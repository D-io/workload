package cn.edu.uestc.ostec.workload.pojo;

/**
 * Description: 用户实体,不涉及数据库表,用于接收CAS响应数据
 */
public class User {

	/**
	 * 用户编号
	 */
	private Integer userId;

	/**
	 * 用户姓名
	 */
	private String name;

	/**
	 * 用户邮箱
	 */
	private String email;

	/**
	 * 用户类型
	 */
	private String userType;

	/**
	 * 创建者
	 */
	private String createBy;

	/**
	 * 创建时间
	 */
	private long createTime;

	/**
	 * 最近登录时间
	 */
	private long currentLogin;

	/**
	 * 上次登录时间
	 */
	private long lastLogin;

	public User() {
	}

	public User(Integer userId, String name, String email, String userType, String createBy,
			long createTime, long currentLogin, long lastLogin) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.userType = userType;
		this.createBy = createBy;
		this.createTime = createTime;
		this.currentLogin = currentLogin;
		this.lastLogin = lastLogin;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}

	public long getCurrentLogin() {
		return currentLogin;
	}

	public void setCurrentLogin(long currentLogin) {
		this.currentLogin = currentLogin;
	}

	public long getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(long lastLogin) {
		this.lastLogin = lastLogin;
	}

	@Override
	public String toString() {
		return "User{" + "userId=" + userId + ", name='" + name + '\'' + ", email='" + email + '\''
				+ ", userType='" + userType + '\'' + ", createBy='" + createBy + '\''
				+ ", createTime=" + createTime + ", currentLogin=" + currentLogin + ", lastLogin="
				+ lastLogin + '}';
	}
}
