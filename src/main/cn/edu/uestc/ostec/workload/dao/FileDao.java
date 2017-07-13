/*
 * AEMS（工程认证达成度评价管理系统）
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 17-4-21 下午3:38
 * Copyright: Copyright (c) 2017.
 */

package cn.edu.uestc.ostec.workload.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.File;

/**
 * Version:v1.0 (description:文件增删改查 )
 */
@Component
public interface FileDao extends BaseDao<File> {

	/**
	 * 查询文件
	 *
	 * @param fileId 文件编号
	 * @param userId 作者编号
	 * @return List<File>
	 */
	List<File> select(
			@Param("fileId")
					Integer fileId,
			@Param("userId")
					Integer userId);

	/**
	 * 修改文件
	 *
	 * @param entity 文件
	 * @return Boolean
	 */
	@Override
	Boolean update(File entity);

	/**
	 * 添加文件
	 *
	 * @param entity 文件
	 * @return Boolean
	 */
	@Override
	Boolean insert(File entity);

	/**
	 * 根据文件Id删除文件
	 *
	 * @param id 文件编号
	 * @return Boolean
	 */
	@Override
	Boolean delete(Integer id);

}