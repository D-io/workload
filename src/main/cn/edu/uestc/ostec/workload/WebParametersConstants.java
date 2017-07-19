package cn.edu.uestc.ostec.workload;

/**
 * Description: 系统参数常量（包含：web.xml）
 */
public interface WebParametersConstants {

	/**
	 * CAS服务器路径
	 */
	String CAS_SERVER_CONTEXT_PATH_NAME = "casServerContextPath";

	/**
	 * 统一认证中心登出URL前缀
	 */
	String CAS_SERVER_LOGOUT_PREFIX = "/logout?service=";

	/**
	 * 文件上传路径
	 */
	String FILE_UPLOAD_PATH = "fileUploadPath";

	/**
	 * 页面管理控制器映射路径
	 */
	String PAGE_MANAGER_PATH = "page";

	/**
	 * 用户管理控制器映射路径
	 */
	String USER_MANAGER_PATH = "user";
}
