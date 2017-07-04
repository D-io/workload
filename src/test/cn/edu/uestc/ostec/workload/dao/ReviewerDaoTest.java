package cn.edu.uestc.ostec.workload.dao;


import org.junit.Test;

import cn.edu.uestc.ostec.workload.BaseTest;
import cn.edu.uestc.ostec.workload.pojo.Reviewer;

/**
 * Version:v1.0 (description:  )
 */
public class ReviewerDaoTest extends BaseTest {

	private ReviewerDao reviewerDao;

	private Reviewer reviewer;

	{
		reviewerDao = getBean(ReviewerDao.class);
		reviewer = new Reviewer();
		reviewer.setReviewerId(1);
		reviewer.setCategoryId(2);
	}

	@Test
	public void update() throws Exception {
		reviewer.setReviewerId(3);
		System.out.println(reviewerDao.update(reviewer));
	}

	@Test
	public void delete() throws Exception {
		System.out.println(reviewerDao.delete(2));
	}

	@Test
	public void select() throws Exception {
		System.out.println(reviewerDao.select(2));
	}

	@Test
	public void insert() throws Exception {
		System.out.println(reviewerDao.insert(reviewer));
	}

}