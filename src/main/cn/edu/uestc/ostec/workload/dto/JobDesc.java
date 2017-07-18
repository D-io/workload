package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description: 职位描述，用于Json字段的映射 )
 */
public class JobDesc {

	private Integer userId;

	private String jobDesc;

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getUserId() {
		return userId;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public JobDesc(Integer userId, String jobDesc) {
		this.userId = userId;
		this.jobDesc = jobDesc;
	}

	public JobDesc() {
	}

	@Override
	public String toString() {
		return "JobDesc{" + "userId='" + userId + '\'' + ", jobDesc='" + jobDesc + '\'' + '}';
	}
}
