package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description: 职位描述，用于Json字段的映射 )
 */
public class JobDesc {

	private String userId;

	private String jobDesc;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}
}
