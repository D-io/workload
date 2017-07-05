package cn.edu.uestc.ostec.workload.dao;

import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Admin;

@Component
public interface AdminDao extends BaseDao<Admin> {

	/**
	 * 插入管理员信息
	 *
	 * @return Boolean
	 */
	Boolean insert(Integer adminId);

	/**
	 * 删除管理员
	 *
	 * @param id 管理员编号
	 * @return Boolean
	 */
	@Override
	Boolean delete(Integer id);

	/**
	 * 查询所有管理员对应的Id
	 * @return List<Admin>
	 */
	List<Admin> selectAll();

}