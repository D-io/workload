package cn.edu.uestc.ostec.workload.context;

import cn.edu.uestc.ostec.workload.adaptor.ServletContextAdapter;

import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_BROWSER;
import static cn.edu.uestc.ostec.workload.RequestConstants.REQUEST_CLIENT_OPERATING_SYSTEM;

/**
 * Description: 标准request域属性上下文
 */
public interface StandardRequestAttributeContext extends ServletContextAdapter {

	/**
	 * 获取项目路径信息
	 *
	 * @return 项目路径信息
	 */
	default String getApplicationUrl() {

		return getRequestContext().getContextPath();
	}

	/**
	 * 获取当前请求的客户端浏览器信息
	 *
	 * @return 客户端浏览器信息
	 */
	default String getClientBrowser() {

		return (String) getRequestContext().getAttribute(REQUEST_CLIENT_BROWSER);
	}

	/**
	 * 获取当前请求的客户端操作系统信息
	 *
	 * @return 客户端操作系统信息
	 */
	default String getClientOperatingSystem() {

		return (String) getRequestContext().getAttribute(REQUEST_CLIENT_OPERATING_SYSTEM);
	}

}
