package cn.edu.uestc.ostec.workload.dto;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;

/**
 * Version:v1.0 (description: 输入的参数具体值，用于Json字段的映射 )
 */
public class ParameterValue {

	private String symbol;

	private double value = ZERO_DOUBLE;

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

	public ParameterValue(String symbol, double value) {
		this.symbol = symbol;
		this.value = value;
	}

	public ParameterValue() {
	}

	@Override
	public String toString() {
		return "ParameterValue{" + "symbol='" + symbol + '\'' + ", value=" + value + '}';
	}
}
