package cn.edu.uestc.ostec.workload.pojo;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.NOT_LEAF;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.UNCOMMITTED;

public class Category {

	/**
	 * 类目信息所在表名
	 */
	public static final String TABLE_NAME = "category";

	/**
	 * 工作量类目编号
	 */
	private Integer categoryId;

	/**
	 * 工作量类目名称
	 */
	private String name;

	/**
	 * 工作量类目简介
	 */
	private String desc;

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
	private Integer reviewDeadline = null;

	/**
	 * 审核类最终申请时间，默认为审核时间前48小时。审核人修改申请时间时，与审核时间相差不足48小时给出提示。
	 */
	private Integer applyDeadline = null;

	/**
	 * 审核人编号
	 */
	private Integer reviewerId = null;

	/**
	 * 其他json参数
	 */
	private String otherJson = null;

	public Integer getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(Integer reviewerId) {
		this.reviewerId = reviewerId;
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

	public Integer getParentId() {
		return parentId;
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

	public Integer getReviewDeadline() {
		return reviewDeadline;
	}

	public void setReviewDeadline(Integer reviewDeadline) {
		this.reviewDeadline = reviewDeadline;
	}

	public Integer getApplyDeadline() {
		return applyDeadline;
	}

	public void setApplyDeadline(Integer applyDeadline) {
		this.applyDeadline = applyDeadline;
	}

	public String getOtherJson() {
		return otherJson;
	}

	public void setOtherJson(String otherJson) {
		this.otherJson = otherJson;
	}

	@Override
	public String toString() {
		return "Category{" + "categoryId=" + categoryId + ", name='" + name + '\'' + ", desc='"
				+ desc + '\'' + ", parentId=" + parentId + ", isLeaf='" + isLeaf + '\''
				+ ", importRequired='" + importRequired + '\'' + ", jsonParameters='"
				+ jsonParameters + '\'' + ", formula='" + formula + '\'' + ", version='" + version
				+ '\'' + ", status='" + status + '\'' + ", reviewDeadline=" + reviewDeadline
				+ ", applyDeadline=" + applyDeadline + '}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		Category category = (Category) o;

		if (categoryId != null ?
				!categoryId.equals(category.categoryId) :
				category.categoryId != null)
			return false;
		if (name != null ? !name.equals(category.name) : category.name != null)
			return false;
		if (desc != null ? !desc.equals(category.desc) : category.desc != null)
			return false;
		if (parentId != null ? !parentId.equals(category.parentId) : category.parentId != null)
			return false;
		if (isLeaf != null ? !isLeaf.equals(category.isLeaf) : category.isLeaf != null)
			return false;
		if (importRequired != null ?
				!importRequired.equals(category.importRequired) :
				category.importRequired != null)
			return false;
		if (jsonParameters != null ?
				!jsonParameters.equals(category.jsonParameters) :
				category.jsonParameters != null)
			return false;
		if (formula != null ? !formula.equals(category.formula) : category.formula != null)
			return false;
		if (version != null ? !version.equals(category.version) : category.version != null)
			return false;
		if (status != null ? !status.equals(category.status) : category.status != null)
			return false;
		if (reviewDeadline != null ?
				!reviewDeadline.equals(category.reviewDeadline) :
				category.reviewDeadline != null)
			return false;
		if (applyDeadline != null ?
				!applyDeadline.equals(category.applyDeadline) :
				category.applyDeadline != null)
			return false;
		if (reviewerId != null ?
				!reviewerId.equals(category.reviewerId) :
				category.reviewerId != null)
			return false;
		return otherJson != null ?
				otherJson.equals(category.otherJson) :
				category.otherJson == null;
	}

	@Override
	public int hashCode() {
		int result = categoryId != null ? categoryId.hashCode() : 0;
		result = 31 * result + (name != null ? name.hashCode() : 0);
		result = 31 * result + (desc != null ? desc.hashCode() : 0);
		result = 31 * result + (parentId != null ? parentId.hashCode() : 0);
		result = 31 * result + (isLeaf != null ? isLeaf.hashCode() : 0);
		result = 31 * result + (importRequired != null ? importRequired.hashCode() : 0);
		result = 31 * result + (jsonParameters != null ? jsonParameters.hashCode() : 0);
		result = 31 * result + (formula != null ? formula.hashCode() : 0);
		result = 31 * result + (version != null ? version.hashCode() : 0);
		result = 31 * result + (status != null ? status.hashCode() : 0);
		result = 31 * result + (reviewDeadline != null ? reviewDeadline.hashCode() : 0);
		result = 31 * result + (applyDeadline != null ? applyDeadline.hashCode() : 0);
		result = 31 * result + (reviewerId != null ? reviewerId.hashCode() : 0);
		result = 31 * result + (otherJson != null ? otherJson.hashCode() : 0);
		return result;
	}
}