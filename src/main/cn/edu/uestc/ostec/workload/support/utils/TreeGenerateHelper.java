/*
 * Project: workload（工作量计算系统）
 * File: RegionManagerController.java
 * Author: 张健顺
 * Email: 1224522500@qq.com
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 *
 */

package cn.edu.uestc.ostec.workload.support.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import cn.edu.uestc.ostec.workload.dto.CategoryDto;
import cn.edu.uestc.ostec.workload.pojo.Category;

/**
 * Version:v1.0 (description:  )
 */
public class TreeGenerateHelper {

	private List<CategoryDto> categoryDtoList = new ArrayList<>();

	//根据需要生成树的集合进行初始化
	public TreeGenerateHelper(List<CategoryDto> categoryDtoList) {
		this.categoryDtoList = categoryDtoList;
	}

	//从集合中查找对应ID的category
	public CategoryDto getCategoryDtoById(Integer categoryId) {
		CategoryDto categoryDto = new CategoryDto();
		for(CategoryDto item:categoryDtoList) {
			if(categoryId.equals(item.getCategoryId())) {
				categoryDto = item;
				break;
			}
		}
		return categoryDto;
	}

	//根据根节点编号查找相应的子节点
	public List<CategoryDto> getChildrenById(Integer categoryId) {
		List<CategoryDto> categoryDtoChildren = new ArrayList<>();
		for(CategoryDto categoryDto:categoryDtoList) {
			if(categoryId.equals(categoryDto.getParentId())) {
				categoryDtoChildren.add(categoryDto);
			}
		}
		return sortCategories(categoryDtoChildren);
	}

	//生成树方法
	public CategoryDto generateTree(Integer rootId) {

		//获取根节点
		CategoryDto root = getCategoryDtoById(rootId);
		root.setChildren(new ArrayList<>());

		//获取根节点对应的子节点
		List<CategoryDto> children = getChildrenById(rootId);

		//对于子节点递归地设置子节点
		for(CategoryDto categoryDto:children) {
			CategoryDto leaf = generateTree(categoryDto.getCategoryId());
			root.getChildren().add(leaf);
		}

		return root;
	}

	private List<CategoryDto> sortCategories(List<CategoryDto> categories) {
		Collections.sort(categories,(o1,o2) -> {
			int categoryId1 = o1.getCategoryId();
			int categoryId2 = o2.getCategoryId();
			if (categoryId1 > categoryId2) {
				return 1;
			}

			if (categoryId1 == categoryId2) {
				return 0;
			}

			return -1;
		});
		return categories;
	}
}
