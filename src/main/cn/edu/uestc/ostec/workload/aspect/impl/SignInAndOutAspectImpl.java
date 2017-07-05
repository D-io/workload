package cn.edu.uestc.ostec.workload.aspect.impl;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

import cn.edu.uestc.ostec.workload.SessionConstants;
import cn.edu.uestc.ostec.workload.aspect.IAspect;

import static cn.edu.uestc.ostec.workload.ServletContextConstants.APPLICATION_ONLINE_USER_COUNT;
import static cn.edu.uestc.ostec.workload.support.utils.ClientInfoHelper.getClientInfo;

/**
 * Description:用户登入登出切面
 */
@Aspect
@Component
public class SignInAndOutAspectImpl implements IAspect {

	/**
	 * 日志对象
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(SignInAndOutAspectImpl.class);

	/**
	 * 登入信息日志样本信息
	 */
	private static final String SIGN_IN_INFO_LOG_PATTERN = "client info {}, login {} ";

	/**
	 * 登入登出控制器切入点
	 */
	@Pointcut("execution(* cn.edu.uestc.ostec.workload.controller.common.SignInAndOutController.login(..))")
	public void pointCut() {
	}

	@After("pointCut()")
	public void recordSignInCount() {
		//设置当前系统人数
		Integer count = (Integer) getServletContext().getAttribute(APPLICATION_ONLINE_USER_COUNT);
		getServletContext().setAttribute(APPLICATION_ONLINE_USER_COUNT, count + 1);

		//获取客户端信息
		Map<String, String> clientInfo = getClientInfo(getRequestContext());

		//打印登录日志信息
		LOGGER.info(SIGN_IN_INFO_LOG_PATTERN, clientInfo,
				getSessionContext().getAttribute(SessionConstants.SESSION_USER_INFO_ENTITY));
	}

}
