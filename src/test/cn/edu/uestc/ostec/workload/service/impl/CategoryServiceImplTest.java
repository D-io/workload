package cn.edu.uestc.ostec.workload.service.impl;

import org.junit.Test;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.service.CategoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

/**
 * Version:v1.0 (description:  )
 */
public class CategoryServiceImplTest extends BaseTest {

	private CategoryService categoryService;

	private ItemService itemService;

	private Category category;

	{
		categoryService = getBean(CategoryService.class);
		itemService = getBean(ItemService.class);
		category = new Category();
		category.setName("格式化");
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
	public void removeCategory() throws Exception {
	}

	@Test
	public void saveCategory() throws Exception {
		System.out.println(categoryService.saveCategory(category));
	}

	@Test
	public void saveCategory1() throws Exception {
		System.out.println(categoryService.saveCategory(-1,5));
	}

	@Test
	public void getCategory() throws Exception {
		System.out.println(categoryService.getCategory(4));
	}

	@Test
	public void getCategoryChildren() throws Exception {
		System.out.println(categoryService.getCategoriesByStatus(-1));
	}

	@Test
	public void getCategoriesByType() throws Exception {
		System.out.println(categoryService.getCategoriesByType(0));
		System.out.println(itemService.findAll(2,2));

	}

}