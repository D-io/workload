package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Subject;

/**
 * Version:v1.0 (description: 交互对象（消息）服务 )
 */
public interface SubjectService extends BaseService {

	String NAME = "subjectService";

	Subject EMPTY_SUBJECT = new Subject();

	/**
	 * 根据Item编号查询对应的交互信息列别
	 * @param itemId item编号
	 * @return List<Subject>
	 */
	List<Subject> getSubjectsByItem(Integer itemId,String version);

	/**
	 * 查询单个Subject信息
	 * @param subjectId 交互对象编号
	 * @return Subject
	 */
	Subject getSubject(Integer subjectId);

	/**
	 * 添加Subject信息
	 * @param subject 交互对象
	 * @return Boolean
	 */
	Boolean addSubject(Subject subject);

}
