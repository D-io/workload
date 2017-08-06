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
import java.util.List;

import cn.edu.uestc.ostec.workload.dto.CategoryDto;

/**
 * Version:v1.0 (description:  )
 */
public class TreeGenerateHelper {

	private List<CategoryDto> categoryDtoList = new ArrayList<>();

	public TreeGenerateHelper(List<CategoryDto> categoryDtoList) {
		this.categoryDtoList = categoryDtoList;
	}

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

	public List<CategoryDto> getChildrenById(Integer categoryId) {
		List<CategoryDto> categoryDtoChildren = new ArrayList<>();
		for(CategoryDto categoryDto:categoryDtoList) {
			if(categoryId.equals(categoryDto.getParentId())) {
				categoryDtoChildren.add(categoryDto);
			}
		}
		return categoryDtoChildren;
	}

	public CategoryDto generateTree(Integer rootId) {

		CategoryDto root = getCategoryDtoById(rootId);
		root.setChildren(new ArrayList<>());
		List<CategoryDto> children = getChildrenById(rootId);

		for(CategoryDto categoryDto:children) {
			CategoryDto leaf = generateTree(categoryDto.getCategoryId());
			root.getChildren().add(leaf);
		}

		return root;
	}
}
