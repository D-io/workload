package cn.edu.uestc.ostec.workload.dao;

import org.junit.Test;

import java.util.List;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Admin;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description: AdminDao 测试)
 */
public class AdminDaoTest extends BaseTest{

	private AdminDao adminDao;

	private Admin admin;

	{
		adminDao = getBean(AdminDao.class);
		admin = new Admin();
	}

	@Test
	public void insert() throws Exception {
		admin.setAdminId(104);
		System.out.println(adminDao.insert(admin));
	}

	@Test
	public void delete() throws Exception {
		//System.out.println(adminDao.delete(102));
		System.out.println(DateHelper.getDateTimeStamp("2017年12月20日"));
	}

}