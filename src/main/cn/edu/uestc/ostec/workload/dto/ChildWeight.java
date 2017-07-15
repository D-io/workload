package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description: 成员权重，用于Json字段的映射 )
 */
public class ChildWeight {

	private String userId;

	private double weight;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}
}
