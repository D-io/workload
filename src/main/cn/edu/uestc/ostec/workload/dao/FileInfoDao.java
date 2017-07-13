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

import cn.edu.uestc.ostec.workload.pojo.FileInfo;

/**
 * Version:v1.0 (description:文件信息增删改查 )
 */
@Component
public interface FileInfoDao extends BaseDao<FileInfo> {

	/**
	 * 查询文件信息
	 *
	 * @param fileInfoId 文件信息编号
	 * @param authorId    作者编号
	 * @return List<FileInfo>
	 */
	List<FileInfo> select(
			@Param("fileInfoId")
					Integer fileInfoId,
			@Param("authorId")
					Integer authorId);

	/**
	 * 修改文件信息
	 *
	 * @param entity 文件信息
	 * @return Boolean
	 */
	@Override
	Boolean update(FileInfo entity);

	/**
	 * 添加文件信息
	 *
	 * @param entity 文件信息
	 * @return Boolean
	 */
	@Override
	Boolean insert(FileInfo entity);

	/**
	 * 根据文件信息Id删除文件信息
	 *
	 * @param id 文件信息Id
	 * @return Boolean
	 */
	@Override
	Boolean delete(Integer id);
}
