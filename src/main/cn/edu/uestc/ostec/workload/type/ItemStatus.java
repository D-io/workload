package cn.edu.uestc.ostec.workload.type;

/**
 * Version:v1.0 (description:  )
 */
public enum ItemStatus {

	UNCOMMITTED(0, "未提交"), NON_CHECKED(1, "待审核"), CHECKED(2, "审核通过"), DOUBTED(3,
			"存疑"), DOUBTED_CHECKED(4, "存疑解决"), DENIED(5, "拒绝"), DISABLE(-1, "删除");

	private Integer status;

	private String desc;

	ItemStatus(Integer status, String desc) {
		this.status = status;
		this.desc = desc;
	}

	public Integer getStatus() {
		return status;
	}

	public String getDesc() {
		return desc;
	}

	public static ItemStatus getItemStatus(Integer status) {
		int st = status.intValue();
		switch (st) {
		case 0:
			return UNCOMMITTED;
		case 1:
			return NON_CHECKED;
		case 2:
			return CHECKED;
		case 3:
			return DOUBTED;
		case 4:
			return DOUBTED_CHECKED;
		case 5:
			return DENIED;
		case -1:
			return DISABLE;
		default:
			return null;
		}
	}

}
