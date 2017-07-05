package cn.edu.uestc.ostec.workload.service.impl;

import org.junit.Test;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Reviewer;
import cn.edu.uestc.ostec.workload.service.ReviewerService;

import static org.junit.Assert.*;

/**
 * Version:v1.0 (description:  )
 */
public class ReviewerServiceImplTest extends BaseTest {

	private ReviewerService reviewerService;

	private Reviewer reviewer;

	{
		reviewerService = getBean(ReviewerService.class);
		reviewer = new Reviewer();
		reviewer.setReviewerId(1);
		reviewer.setCategoryId(2);
	}

	@Test
	public void saveReviewer() throws Exception {
		reviewer.setReviewerId(2);
		System.out.println(reviewerService.saveReviewer(reviewer));
	}

	@Test
	public void removeReviewer() throws Exception {
		System.out.println(reviewerService.removeReviewer(2));
	}

	@Test
	public void getCategoryByReviewer() throws Exception {
		System.out.println(reviewerService.getCategoryByReviewer(2));
	}

	@Test
	public void getReviewerByCategory() throws Exception {
		System.out.println(reviewerService.getReviewerByCategory(2));
	}

}