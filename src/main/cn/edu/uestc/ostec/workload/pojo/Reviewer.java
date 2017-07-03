package cn.edu.uestc.ostec.workload.pojo;

public class Reviewer {

	/**
	 * 审核人编号与教师表工号对应，用于控制审核人登录判断
	 */
	private Integer categoryId;

	/**
	 * 工作量类目编号与工作量类目表编号对应，用于标记审核人审核的工作量类目
	 */
	private Integer reviewerId;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(Integer reviewerId) {
		this.reviewerId = reviewerId;
	}
}