package cn.edu.uestc.ostec.workload.pojo;

/**
 * Version:v1.0 (description: 输入的参数具体值，用于Json字段的映射 )
 */
public class ParameterValue {

	private String symbol;

	private double value;

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}
}
