package cn.edu.uestc.ostec.workload.adaptor;

import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Description: 获取 application, session, request, response 域对象
 */
public interface ServletContextAdapter {

	/**
	 * 获取application域对象
	 *
	 * @return application域对象
	 */
	default ServletContext getServletContext() {

		return ContextLoader.getCurrentWebApplicationContext().getServletContext();
	}

	/**
	 * 获取request域对象
	 *
	 * @return request域对象
	 */
	default HttpServletRequest getRequestContext() {

		return ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes()))
				.getRequest();
	}

	/**
	 * 获取response域对象
	 *
	 * @return response域对象
	 */
	default HttpServletResponse getResponseContext() {

		return ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes()))
				.getResponse();
	}

	/**
	 * 获取session域对象
	 *
	 * @return session域对象
	 */
	default HttpSession getSessionContext() {

		return getRequestContext().getSession();
	}
}
