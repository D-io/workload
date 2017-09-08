package cn.edu.uestc.ostec.workload.type;

/**
 * Version:v1.0 (description:  )
 */
public enum UserType {

	ADMINISTRATOR("ADMIN", 1, "工作量计算规则配置管理员"), REVIEWER("RE", 3, "工作量审核人"), TEACHER("TE", 4,
			"复核人(普通教师)"),LEADER("LEADER",2,"全院统计与查看");

	private String code;

	private int order;

	private String desc;

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	UserType() {
	}

	UserType(String code, int order, String desc) {
		this.code = code;
		this.order = order;
		this.desc = desc;
	}

	public static UserType getUserType(String code) {
		for (UserType userType : UserType.values()) {
			if (userType.code.equalsIgnoreCase(code)) {
				return userType;
			}
		}
		return null;
	}

	public static UserType getUserType(int order) {
		for (UserType userType : UserType.values()) {
			if (userType.order == order) {
				return userType;
			}
		}
		return null;
	}

	@Override
	public String toString() {
		return "UserType{" + "code='" + code + '\'' + ", desc='" + desc + '\'' + '}';
	}

}
