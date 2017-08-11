package cn.edu.uestc.ostec.workload.dao;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.dto.RoleInfo;
import cn.edu.uestc.ostec.workload.event.UserRoleEvent;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.pojo.Teacher;
import cn.edu.uestc.ostec.workload.pojo.User;
import cn.edu.uestc.ostec.workload.service.HistoryService;

import static cn.edu.uestc.ostec.workload.type.UserType.TEACHER;
import static org.junit.Assert.*;

/**
 * Version:v1.0 (description:  )
 */
public class ItemDaoTest extends BaseTest {

	private ItemDao itemDao;

	private HistoryService historyService;

	private Item item;

	private UserRoleEvent userRoleEvent;

	private TeacherDao teacherDao;

	{
		itemDao = getBean(ItemDao.class);
		historyService = getBean(HistoryService.class);
		userRoleEvent = getBean(UserRoleEvent.class);
		teacherDao = getBean(TeacherDao.class);
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

}