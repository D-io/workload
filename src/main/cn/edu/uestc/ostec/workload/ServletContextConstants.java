package cn.edu.uestc.ostec.workload;

/**
 * Description: Application域系统常量
 */
public interface ServletContextConstants extends WebParametersConstants {

	/**
	 * 在线用户总数
	 */
	String APPLICATION_ONLINE_USER_COUNT = "ONLINE_USER_COUNT";

	/**
	 * 统一认证中心登出服务路径
	 */
	String APPLICATION_CAS_SERVER_LOGOUT_PATH = "CAS_SERVER_LOGOUT_PATH";

	/**
	 * 文件上传路径
	 */
	String APPLICATION_FILE_UPLOAD_PATH = "FILE_UPLOAD_PATH";

}
