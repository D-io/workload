package cn.edu.uestc.ostec.workload.controller;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.adaptor.MultiLevelObjectAdaptor;
import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.CategoryConverter;
import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.service.AdminService;
import cn.edu.uestc.ostec.workload.service.CategoryService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.CATEGORY_PATH;
import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.INFO_PATH;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.DELETED;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.ROOT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.SUBMITTED;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Version:v1.0 (description: 工作量类目信息展示控制器 )
 */
@RestController
@RequestMapping(CATEGORY_PATH + INFO_PATH)
public class CategoryInfoListController extends ApplicationController
		implements MultiLevelObjectAdaptor<CategoryDto> {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryConverter categoryConverter;

	@Autowired
	private AdminService adminService;

	@RequestMapping(value = "list", method = GET)
	public RestResponse getSubmittedCategories() {

		Map<String, Object> data = getData();

		//获取已经提交的类目信息
		data.put("categoryTree", getCategoryDto(SUBMITTED, ROOT));
		return successResponse(data);
	}

	/**
	 * 查询单个Category信息
	 *
	 * @param categoryId Category编号
	 * @return RestResponse
	 */
	@RequestMapping(value = "single", method = GET)
	public RestResponse getCategory(
			@RequestParam("categoryId")
					Integer categoryId) {

		CategoryDto categoryDto = categoryConverter
				.poToDto(categoryService.getCategory(categoryId));

		Map<String, Object> data = getData();
		data.put("categoryDto", categoryDto);

		return successResponse(data);
	}

	/**
	 * 管理员查看未提交的和已提交的工作量类目树结构
	 *
	 * @return RestResponse
	 */
	@RequestMapping(value = "all", method = GET)
	public RestResponse getCategories(Integer status) {

		//验证管理员身份
		int userId = getUserId();
		System.out.println(userId);
		if (!adminService.findAllAdmins().contains(userId)) {
			return systemErrResponse("Illegal visit");
		}

		Map<String, Object> data = getData();

		//获取已经提交的类目信息
		if (!DELETED.equals(status)) {
			data.put("categoryTree", getCategoryDto(null, ROOT));
		} else {
			//获取状态为Disable的工作量类目信息
			data.put("categoryList", categoryService.getCategoriesByStatus(DELETED));
		}

		return successResponse(data);
	}

	/**
	 * 获取对应状态下的CategoryDto对象,构建树结构
	 */
	public List<CategoryDto> getCategoryDto(Integer status, Integer parentId) {

		List<CategoryDto> categoryDtoList;

		if (null == status) {
			//由父节点获取状态有效的子节点对应的dto对象
			categoryDtoList = categoryService.getDtoObjects(parentId);
		} else {
			//由父节点和状态值查询对应的子节点dto对象
			categoryDtoList = categoryService.getDtoObjects(status, parentId);
		}

		if (categoryDtoList.size() < 0) {
			return null;
		}

		//遍历子节点，分别构建树结构
		try {
			for (Iterator<CategoryDto> iterator = categoryDtoList.iterator(); iterator
					.hasNext(); ) {
				CategoryDto categoryDto = iterator.next();
				if (null == status) {
					buildValidObjectStructure(categoryDto, categoryService);
				} else {
					buildObjectStructure(categoryDto, categoryService);
				}
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		//返回形成的树结构
		return categoryDtoList;
	}

	//TODO 工作量统计汇总 -> ItemInfoController下
}
