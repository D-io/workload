package cn.edu.uestc.ostec.workload.dao;

import org.junit.Test;

import java.util.Date;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
public class CategoryDaoTest extends BaseTest {

	private CategoryDao categoryDao;

	private Category category;

	{
		categoryDao = getBean(CategoryDao.class);
		category = new Category();
		category.setCategoryId(1);
		category.setName("名字去去去去去去前期");
		category.setDesc("描述去去去前期");
		category.setJsonParameters("1");
		category.setParentId(0);
		category.setIsLeaf("0");
		category.setImportRequired(0);
		category.setFormula("a+b+c");
		category.setVersion("2016-2017-1");
		category.setStatus(0);
		category.setReviewDeadline(DateHelper.getCurrentTimestamp());
		category.setApplyDeadline(DateHelper.getCurrentTimestamp());
	}


	@Test
	public void insert() throws Exception {
		category.setCategoryId(2);
		category.setStatus(-1);
		category.setName("乱码");
		System.out.println(categoryDao.insert(category));
	}

	@Test
	public void update() throws Exception {
		category.setName("阿萨德");
		System.out.println(categoryDao.update(category));
	}

	@Test
	public void delete() throws Exception {
		System.out.println(categoryDao.delete(1));
	}

	@Test
	public void select() throws Exception {
		System.out.print(categoryDao.selectAll());
	}

	@Test
	public void updateStatus() throws Exception {
		System.out.println(categoryDao.updateStatus(1,2));
	}

	@Test
	public void selectChildren() throws Exception {
		System.out.println(categoryDao.selectChildren(0,0));
	}

	@Test
	public void selectDisable() throws Exception {
		System.out.println(categoryDao.selectByStatus(-1));
	}

	@Test
	public void selectByImportRequired() throws Exception {
		System.out.println(categoryDao.selectByImportRequired(0));
	}

}