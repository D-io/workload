package cn.edu.uestc.ostec.workload.controller.core;

/**
 * Description: REST 路径映射常量
 */
public interface PathMappingConstants {

	/**
	 * 默认URL路径分隔符
	 */
	String DEFAULT_WEB_URL_SEPARATOR = "/";

	/**
	 * 工作量类目路径
	 */
	String MANAGER_CATEGORY_PATH = "category";

	/**
	 * 工作量审核路径
	 */
	String ITEM_PATH = "item";

	/**
	 * 工作量申报路径
	 */
	String TEACHER_ITEM_APPLY_PATH = "item-apply";

	/**
	 * 文件信息控制器映射路径
	 */
	String FILE_INFO_PATH = "file/info";

	/**
	 * 文件控制器映射路径
	 */
	String FILE_PATH = "file";

	/**
	 * 认证登陆控制器映射路径
	 */
	String AUTH_PATH = "auth";

	/**
	 * 区域分发控制器映射路径
	 */
	String REGION_PATH = "region";

}
