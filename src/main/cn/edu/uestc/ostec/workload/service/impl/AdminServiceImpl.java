package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.AdminDao;
import cn.edu.uestc.ostec.workload.pojo.Admin;
import cn.edu.uestc.ostec.workload.service.AdminService;

/**
 * Version:v1.0 (description:  )
 */
@Service(AdminService.NAME)
public class AdminServiceImpl extends BaseServiceImpl implements AdminService{

	@Autowired
	private AdminDao adminDao;

	@Override
	public List<Admin> findAllAdmins() {
		return adminDao.selectAll();
	}

	@Override
	public Boolean saveAdmin(Integer adminId) {
		return adminDao.insert(adminId);
	}

	@Override
	public Boolean removeAdmin(Integer adminId) {
		return adminDao.delete(adminId);
	}
}
