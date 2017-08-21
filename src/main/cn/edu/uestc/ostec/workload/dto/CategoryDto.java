package cn.edu.uestc.ostec.workload.dto;

import org.junit.Test;

import java.util.List;

import cn.edu.uestc.ostec.workload.pojo.Category;
import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NOT_LEAF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;

/**
 * Version:v1.0 (description: Category包装对象)
 */
public class CategoryDto extends AbstractMultiLevelObjectDto<CategoryDto> {

	@Test
	public void test() {
		CategoryDto category = new CategoryDto();
		category.setCategoryId(1);
		category.setDesc("12");
		CategoryDto category1 = new CategoryDto();
		category1.setCategoryId(2);
		category1.setDesc("123");
		System.out.println(category.contrastObj(category,category1));
	}

	/**
	 * 工作量类目编号
	 */
	private Integer categoryId;

	/**
	 * 工作量类目名称
	 */
	private String name = null;

	/**
	 * 工作量类目简介
	 */
	private String desc = null;

	/**
	 * 上一级工作量类目编号，传入“0”则为第一级工作量类目
	 */
	private Integer parentId = ZERO_INT;

	/**
	 * 是否为叶节点，“Y”则当前类目为叶节点，不可再进行下一级类目添加操作
	 */
	private String isLeaf = NOT_LEAF;

	/**
	 * 工作量类目类型，0：审核类，1：复核类
	 */
	private Integer importRequired = APPLY_SELF;

	/**
	 * 参数以json格式存储如：{人数：A}
	 */
	private String jsonParameters = null;

	/**
	 * 参数描述
	 */
	private List<FormulaParameter> formulaParameterList = null;

	/**
	 * 计算工作量公式，如:A*0.4
	 */
	private String formula = null;

	/**
	 * 工作量类目公式适宜版本，以学期形式表示，如：2016-2017-1
	 */
	private String version = DateHelper.getCurrentTerm();

	/**
	 * 状态，0：未提交，1：已提交，-1：disable（删除）
	 */
	private Integer status = UNCOMMITTED;

	/**
	 * 最终审核时间
	 */
	private String reviewDeadline;

	/**
	 * 审核类最终申请时间，默认为审核时间前48小时。审核人修改申请时间时，与审核时间相差不足48小时给出提示。
	 */
	private String applyDeadline;

	/**
	 * 审核人ID
	 */
	private Integer reviewerId;

	/**
	 * 审核人姓名
	 */
	private String reviewerName;

	/**
	 * 子节点
	 */
	private List<CategoryDto> children = null;

	private String otherJson = null;

	private List<OtherJsonParameter> otherJsonParameters = null;

	public List<OtherJsonParameter> getOtherJsonParameters() {
		return otherJsonParameters;
	}

	public void setOtherJsonParameters(List<OtherJsonParameter> otherJsonParameters) {
		this.otherJsonParameters = otherJsonParameters;
	}

	public String getOtherJson() {
		return otherJson;
	}

	public void setOtherJson(String otherJson) {
		this.otherJson = otherJson;
	}

	public String getReviewerName() {
		return reviewerName;
	}

	public void setReviewerName(String reviewerName) {
		this.reviewerName = reviewerName;
	}

	@Override
	public Integer getParentId() {
		return parentId;
	}

	@Override
	public Integer getObjectId() {
		return categoryId;
	}

	@Override
	public List<CategoryDto> getChildren() {
		return children;
	}

	@Override
	public void setChildren(List<CategoryDto> children) {
		this.children = children;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getIsLeaf() {
		return isLeaf;
	}

	public void setIsLeaf(String isLeaf) {
		this.isLeaf = isLeaf;
	}

	public Integer getImportRequired() {
		return importRequired;
	}

	public void setImportRequired(Integer importRequired) {
		this.importRequired = importRequired;
	}

	public String getJsonParameters() {
		return jsonParameters;
	}

	public void setJsonParameters(String jsonParameters) {
		this.jsonParameters = jsonParameters;
	}

	public String getFormula() {
		return formula;
	}

	public void setFormula(String formula) {
		this.formula = formula;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getReviewDeadline() {
		return reviewDeadline;
	}

	public void setReviewDeadline(String reviewDeadline) {
		this.reviewDeadline = reviewDeadline;
	}

	public String getApplyDeadline() {
		return applyDeadline;
	}

	public void setApplyDeadline(String applyDeadline) {
		this.applyDeadline = applyDeadline;
	}

	public Integer getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(Integer reviewerId) {
		this.reviewerId = reviewerId;
	}

	public List<FormulaParameter> getFormulaParameterList() {
		return formulaParameterList;
	}

	public void setFormulaParameterList(List<FormulaParameter> formulaParameterList) {
		this.formulaParameterList = formulaParameterList;
	}
}
