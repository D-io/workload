package cn.edu.uestc.ostec.workload.service;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Reviewer;

/**
 * Version:v1.0 (description:审核人和工作量类目的对应)
 */
public interface ReviewerService extends BaseService {

	String NAME = "reviewerService";

	/**
	 * 空的Reviewer对象
	 */
	Reviewer EMPTY_REVIEWER = new Reviewer();

	/**
	 * 保存Reviewer对象
	 * @param reviewer Reviewer对象
	 * @return Boolean
	 */
	Boolean saveReviewer(Reviewer reviewer);

	/**
	 * 删除Reviewer对象
	 * @param categoryId 类目Id
	 * @return Boolean
	 */
	Boolean removeReviewer(int categoryId);

	/**
	 * 根据ReviewerId获取对应的Category信息
	 * @param reviewerId 审核人Id
	 * @return List<Reviewer>
	 */
	List<Reviewer> getCategoryByReviewer(int reviewerId);

	/**
	 * 根据类目Id获取审核人Id
	 * @param categoryId 类目Id
	 * @return Reviewer
	 */
	Reviewer getReviewerByCategory(int categoryId);

}
