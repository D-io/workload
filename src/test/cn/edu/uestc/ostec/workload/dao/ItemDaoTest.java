package cn.edu.uestc.ostec.workload.dao;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.converter.impl.ItemConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.event.UserRoleEvent;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.Teacher;
import cn.edu.uestc.ostec.workload.pojo.TeacherWorkload;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;
import cn.edu.uestc.ostec.workload.service.ItemService;

import static cn.edu.uestc.ostec.workload.type.UserType.TEACHER;
import static org.junit.Assert.*;

/**
 * Version:v1.0 (description:  )
 */
public class ItemDaoTest extends BaseTest {

	private ItemDao itemDao;

	private ItemService itemService;

	private CategoryDao categoryDao;

	private HistoryService historyService;

	private ItemConverter itemConverter;

	private Item item;

	private UserRoleEvent userRoleEvent;

	private TeacherDao teacherDao;

	private TeacherWorkloadDao teacherWorkloadDao;

	{
		itemDao = getBean(ItemDao.class);
		itemConverter = getBean(ItemConverter.class);
		categoryDao = getBean(CategoryDao.class);
		historyService = getBean(HistoryService.class);
		userRoleEvent = getBean(UserRoleEvent.class);
		teacherDao = getBean(TeacherDao.class);
		teacherWorkloadDao = getBean(TeacherWorkloadDao.class);
		itemService = getBean(ItemService.class);
		item = new Item();
		item.setItemId(1);
		item.setCategoryId(1);
		item.setOwnerId(1);
		item.setJsonParameter("asd");
		//item.setWorkload(20);
		item.setGroupManagerId(1);
		item.setApplyDesc("desc");
		item.setJobDesc("asdasd");
		item.setStatus(-1);
		item.setJsonChildWeight("21");

	}

	@Test
	public void insert() throws Exception {
//		item.setItemId(2);
//		System.out.println(itemDao.insert(item));
//		System.out.println(historyService.getHistoriesByType("apply").size());
		List<Teacher> teacherList = teacherDao.findTeachers();
		RoleInfo roleInfo = new RoleInfo();
		roleInfo.setRole(TEACHER.getCode());
		roleInfo.setRoleName(TEACHER.getDesc());
		for(Teacher teacher:teacherList) {
			userRoleEvent.appendRoleInfo(teacher.getTeacherId(),roleInfo);
		}
	}

	@Test
	public void update() throws Exception {
		item.setStatus(0);
		System.out.println(itemDao.update(item));
	}

	@Test
	public void delete() throws Exception {
//		System.out.println(itemDao.delete(1));
//		System.out.println(itemDao.selectAll(null,null,null));
	}

	@Test
	public void test() {
//		List<Category> categoryList = categoryDao.selectAll("2017-2018-1");
//		for(Category category:categoryList) {
//			category.setApplyDeadline(1517414400);
//			category.setReviewDeadline(1517760000);
//			categoryDao.update(category);
//		}
//		System.out.println(categoryDao.selectYears());
//		System.out.println(itemConverter.poToDto(itemDao.select(28)).getDescAndValues());
//		System.out.println(itemService.selectTotalWorkload(5130121,null,"2017-2018-1"));
//		Item item = itemService.findItem(23,"2017-2018-1");
//		System.out.println(itemConverter.poToDto(item).getFileName());
//		List<Teacher> teacherList = teacherDao.findTeachers();
//		for(Teacher teacher:teacherList) {
//			TeacherWorkload teacherWorkload = new TeacherWorkload();
//			teacherWorkload.setTeacherId(teacher.getTeacherId());
//			teacherWorkload.setTeacherName(teacher.getName());
//			teacherWorkload.setProfessionalTitle(teacher.getProfessionalTitle());
//			teacherWorkloadDao.insert(teacherWorkload);
//			teacherWorkloadDao.select(null,"2017-2018-1",null);
//		}
//		System.out.println(itemDao.selectAll("2017-2018-1",null,null,null,3210343,null,0).size());
//		System.out.println(itemService.findAll(null,null,3210343,1,2,"2017-2018-1"));
		System.out.println(itemConverter.generateGroupItem(14,"2017-2018-1"));
	}

}