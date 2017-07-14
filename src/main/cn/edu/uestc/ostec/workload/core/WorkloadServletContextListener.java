package cn.edu.uestc.ostec.workload.core;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import cn.edu.uestc.ostec.workload.WebParametersConstants;
import cn.edu.uestc.ostec.workload.WorkloadObjects;

import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_CAS_SERVER_LOGOUT_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_FILE_UPLOAD_PATH;
import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_ONLINE_USER_COUNT;

/**
 * Description: web应用监听器
 */
public class WorkloadServletContextListener implements ServletContextListener, WorkloadObjects {

	/**
	 * 处理系统启动时初始化参数配置
	 */
	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {

		ServletContext servletContext = servletContextEvent.getServletContext();

		doWebXmlInitParametersAction(servletContext);

		// 设置初始化系统在线人数
		servletContext.setAttribute(APPLICATION_ONLINE_USER_COUNT, ZERO_INT);
	}

	/**
	 * 处理系统关闭时资源释放
	 */
	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {

	}

	/**
	 * 从web.xml中加载配置项至application域
	 */
	private void doWebXmlInitParametersAction(ServletContext servletContext) {

		//1.从web.xml中提取初始化参数 begin
		String fileUploadPath = servletContext.getInitParameter(
				WebParametersConstants.FILE_UPLOAD_PATH);
		String casContextPath = servletContext.getInitParameter(
				WebParametersConstants.CAS_SERVER_CONTEXT_PATH_NAME);
		//1.从web.xml中提取初始化参数 end

		//2.设置参数至application域 begin
		//设置文件上传路径
		servletContext.setAttribute(APPLICATION_FILE_UPLOAD_PATH, fileUploadPath);
		//设置cas登出地址
		servletContext.setAttribute(APPLICATION_CAS_SERVER_LOGOUT_PATH,
				casContextPath + WebParametersConstants.CAS_SERVER_LOGOUT_PREFIX);
		//2.设置参数至application域 end
	}
}
