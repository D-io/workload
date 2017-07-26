package cn.edu.uestc.ostec.workload.event.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.event.CategoryEvent;
import cn.edu.uestc.ostec.workload.event.UserRoleEvent;
import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.REVIEWER_ROLE;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;

/**
 * Version:v1.0 (description:  )
 */
@Service(CategoryEvent.EVENT_NAME)
public class CategoryEventImpl implements CategoryEvent {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	@Autowired
	private UserRoleEvent userRoleEvent;

	@Override
	public Map<String,Object> submitCategories(int... categoryIdList) {

		Map<String,Object> data = new HashMap<>();
		List<Category> categoryList = new ArrayList<>();
		for (int categoryId : categoryIdList) {
			Category category = categoryService.getCategory(categoryId);
			int reviewerId = category.getReviewerId();
			if (UNCOMMITTED.equals(category.getStatus())) {
				boolean appendSuccess = userRoleEvent.appendRoleInfo(reviewerId, REVIEWER_ROLE);
				boolean saveSuccess = categoryService.saveCategory(SUBMITTED, categoryId);
				if (!saveSuccess || !appendSuccess) {
					data.put(category.getName(),"保存失败");
				}
				category.setStatus(SUBMITTED);
			}
			categoryList.add(category);
		}
		data.put("categoryList",categoryConverter.poListToDtoList(categoryList));
		return data;
	}

}
