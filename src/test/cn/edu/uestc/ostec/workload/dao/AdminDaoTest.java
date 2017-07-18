package cn.edu.uestc.ostec.workload.dao;

import org.junit.Test;

import java.util.List;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Admin;
import cn.edu.uestc.ostec.workload.pojo.Item;

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
		Item item = new Item();
		item.setItemId(1);
		item.setWorkload(12.0);
		item.setJsonChildWeight("asd");
		System.out.println(item);
		Item item1 = (Item) item.clone();
		System.out.println(item1);
		item.setJsonChildWeight("as");
		item.setWorkload(12.1);
		item.setItemId(2);
		System.out.println(item);
		System.out.println(item1);
	}

}