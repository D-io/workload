package cn.edu.uestc.ostec.workload.support.utils;

import java.util.ArrayList;
import java.util.List;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import cn.edu.uestc.ostec.workload.dto.ParameterValue;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;

/**
 * Version:v1.0 (description: 公式计算工具类 )
 */
public class FormulaCalculate {

	/**
	 * 通过使用JDK自带的类可以实现调用JS的功能
	 */
	//调用JS
	static ScriptEngine jse = new ScriptEngineManager().getEngineByName("JavaScript");

	public static double calculate(String formula,List<ParameterValue> values) {

		//循环遍历替换公式中的变量值
		for(ParameterValue parameterValue:values) {
			formula = formula.replaceAll(parameterValue.getSymbol(),String.valueOf(parameterValue.getValue()));
		}

		double result = ZERO_DOUBLE;

		try {
			result = (double) jse.eval(formula);
		} catch (ScriptException e) {
			e.printStackTrace();
		}

		return result;

	}

	public static void main(String[] args) {

		List<ParameterValue> values = new ArrayList<>();
		values.add(new ParameterValue("A",20));
		values.add(new ParameterValue("B",0.5));
		String formula = "10*B+2*A";

		double result = calculate(formula,values);
		System.out.println(result);
	}

}
