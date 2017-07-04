package cn.edu.uestc.ostec.workload.service;

import java.util.ArrayList;
import java.util.List;

/**
 * Version:v1.0 (description:  )
 */
public interface BaseService {

	/**
	 * 如果列表可用则返回true
	 *
	 * @param object 需要被测试是否可用的列表
	 * @return 如果列表可用则返回true
	 */
	default <L> boolean isObjectAvailable(L object) {

		return null != object;
	}

	/**
	 * 如果列表可用则返回true
	 *
	 * @param list 需要被测试是否可用的列表
	 * @param <L>  POJO类型
	 * @return 如果列表可用则返回true
	 */
	default <L> boolean isListAvailable(List<L> list) {

		return null != list && !list.isEmpty();
	}

	/**
	 * 返回mapper层结果对象
	 *
	 * @param object        从mapper获取的列表
	 * @param defaultObject 默认对象
	 * @param <T>           POJO类型
	 * @return 返回mapper层结果对象
	 */
	default <T> T objectResult(T object, T defaultObject) {

		return isObjectAvailable(object) ? object : defaultObject;
	}

	/**
	 * 返回mapper层结果对象列表
	 *
	 * @param list 从mapper获取的列表
	 * @param <T>  POJO类型
	 * @return 返回mapper层结果对象列表
	 */
	default <T> List<T> listResult(List<T> list) {

		return isListAvailable(list) ? list : emptyList();
	}

	/**
	 * 根据实现类所指类型返回空的集合对象
	 *
	 * @return 返回空的集合对象
	 */
	default <T> ArrayList<T> emptyList() {

		return new ArrayList<>();
	}


	/**
	 * 获取入参表名所在表的下一个可用主键序号
	 *
	 * @param tableName 需要获取序号的表名
	 * @return 成功查询则返回下一个可用主键序号，否则返回null
	 */
	Integer getNextKey(String tableName);

	/**
	 * 如果存在ID或ID有效则返回true
	 *
	 * @param objectId 被测试的ID
	 * @return 如果存在ID或ID有效则返回true
	 */
	default boolean hasObjectId(Integer objectId) {

		return null != objectId;
	}

	/**
	 * 如果存在ID或ID有效则返回true
	 *
	 * @param objectId 被测试的ID
	 * @return 如果存在ID或ID有效则返回true
	 */
	default boolean hasObjectId(String objectId) {

		return null != objectId;
	}


}
