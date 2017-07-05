package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Admin;

/**
 * Version:v1.0 (description:  )
 */
public interface AdminService extends BaseService {

	/**
	 * AdminService的名称
	 */
	String NAME = "adminService";

	/**
	 * 空的Admin对象
	 */
	Admin EMPTY_ADMIN = new Admin();

	/**
	 * 查询所有的Admin对象
	 * @return List<Admin>
	 */
	List<Admin> findAllAdmins();

	/**
	 * 添加新的Admin信息
	 * @param adminId 管理员编号
	 * @return Boolean
	 */
	Boolean saveAdmin(Integer adminId);

	/**
	 * 删除管理员信息
	 * @param adminId 管理员Id
	 * @return Boolean
	 */
	Boolean removeAdmin(Integer adminId);

}
