package cn.edu.uestc.ostec.workload;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Version:v1.0 (description:  )
 */
public class BaseTest {

	/**
	 * spring配置文件
	 */
	public static final String SPRING_CONTEXT_LOCATION = "spring-mybatis.xml";

	/**
	 * Spring上下文
	 */
	private static ApplicationContext context = new ClassPathXmlApplicationContext(
			SPRING_CONTEXT_LOCATION);

	/**
	 * 获取Spring上下文
	 */
	private static ApplicationContext getContext() {

		return context;
	}

	/**
	 * 获取IOC容器中的实例
	 *
	 * @param className 实例的Class对象
	 * @param <T>       服务类型
	 * @return 返回指定了class类型的实例
	 */
	public static <T> T getBean(Class<T> className) {

		return (T) getContext().getBean(className);
	}

	/**
	 * 获取IOC容器中的实例
	 *
	 * @param serviceName 服务名称
	 * @return 返回指定了服务名称的对象
	 */
	public static Object getBean(String serviceName) {
		return getContext().getBean(serviceName);
	}


}
