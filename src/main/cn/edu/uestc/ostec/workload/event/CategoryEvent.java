package cn.edu.uestc.ostec.workload.event;

import org.springframework.transaction.annotation.Transactional;

import java.util.Map;


/**
 * Version:v1.0 (description: 类目信息管理事件 )
 */
public interface CategoryEvent extends IEvent {

	/**
	 * 服务名称
	 */
	String EVENT_NAME = "categoryEvent";

	/**
	 * 提交类目信息
	 *
	 * @param categoryIdList 类目编号 可变参数
	 * @return boolean
	 */
	@Transactional
	Map<String,Object> submitCategories(Integer ...categoryIdList);

}
