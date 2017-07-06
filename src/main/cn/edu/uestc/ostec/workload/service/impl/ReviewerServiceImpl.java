package cn.edu.uestc.ostec.workload.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import cn.edu.uestc.ostec.workload.dao.ReviewerDao;
import cn.edu.uestc.ostec.workload.pojo.Reviewer;
import cn.edu.uestc.ostec.workload.service.ReviewerService;

/**
 * Version:v1.0 (description: 审核人信息增删改查 )
 */
@Service(ReviewerService.NAME)
public class ReviewerServiceImpl extends BaseServiceImpl implements ReviewerService {

	@Autowired
	private ReviewerDao reviewerDao;

	@Override
	public Boolean saveReviewer(Reviewer reviewer) {

		int categoryId = reviewer.getCategoryId();
		Reviewer result = getReviewerByCategory(categoryId);
		if(null != result.getReviewerId()) {
			return reviewerDao.update(reviewer);
		}
		return reviewerDao.insert(reviewer);
	}

	@Override
	public Boolean removeReviewer(int categoryId) {
		return reviewerDao.delete(categoryId);
	}

	@Override
	public List<Reviewer> getCategoryByReviewer(int reviewerId) {
		return listResult(reviewerDao.selectByReviewer(reviewerId));
	}

	@Override
	public Reviewer getReviewerByCategory(int categoryId) {

		return objectResult(reviewerDao.select(categoryId),EMPTY_REVIEWER);
	}
}
