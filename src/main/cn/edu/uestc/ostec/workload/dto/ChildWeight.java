package cn.edu.uestc.ostec.workload.dto;

/**
 * Version:v1.0 (description: 成员权重，用于Json字段的映射 )
 */
public class ChildWeight {

	private Integer userId;

	private double weight;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public ChildWeight(Integer userId, double weight) {
		this.userId = userId;
		this.weight = weight;
	}

	public ChildWeight() {
	}

	@Override
	public String toString() {
		return "ChildWeight{" + "userId='" + userId + '\'' + ", weight=" + weight + '}';
	}
}
