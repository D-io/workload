package cn.edu.uestc.ostec.workload.dao;

import org.springframework.stereotype.Component;
import cn.edu.uestc.ostec.workload.pojo.Admin;

@Component
public interface AdminDao extends BaseDao<Admin> {

	/**
	 * 插入管理员信息
	 *
	 * @param entity 管理员信息
	 * @return Boolean
	 */
	@Override
	Boolean insert(Admin entity);

	/**
	 * 删除管理员
	 *
	 * @param id 管理员编号
	 * @return Boolean
	 */
	@Override
	Boolean delete(Integer id);

}