package cn.edu.uestc.ostec.workload.support.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

	public static double calculate(String formula, List<ParameterValue> values) {

		//循环遍历替换公式中的变量值
		if(null != values) {
			for (ParameterValue parameterValue : values) {
				if (null != parameterValue) {
					formula = formula.replaceAll(parameterValue.getSymbol(),
							String.valueOf(parameterValue.getValue()));
				} else {
					continue;
				}
			}
		}

		double result = ZERO_DOUBLE;

		//若公式中还存在有关参数为字母，相应的将字母设为默认值0.0
		try {
			result = (double) jse.eval(formula);
		} catch (ScriptException e) {
			try {
				result = (double) jse.eval(judgeContainsLetter(formula));
			} catch (ScriptException e1) {
				e1.printStackTrace();
			}
		}

		return result;

	}

	/**
	 * 查看当前字符串中是否包含字母，并设置默认值
	 * @param formula
	 * @return
	 */
	private static String judgeContainsLetter(String formula) {
		String regex = "[a-zA-Z]";
		Matcher m = Pattern.compile(regex).matcher(formula);
		while (m.find()) {
			formula = formula.replaceAll(m.group(), String.valueOf(ZERO_DOUBLE));
		}
		return formula;
	}

	public static void main(String[] args) {

		List<ParameterValue> values = new ArrayList<>();
		values.add(new ParameterValue("A", 20));
		//values.add(new ParameterValue("B",0.5));
		String formula = "10*B+2*A";
		System.out.println(judgeContainsLetter(formula));
		//		double result = calculate(formula,values);
		//		System.out.println(result);
	}

}
