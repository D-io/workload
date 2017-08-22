package cn.edu.uestc.ostec.workload.dto;

import java.util.List;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.SINGLE;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_DOUBLE;
import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;
import static cn.edu.uestc.ostec.workload.type.OperatingStatusType.APPLY_SELF;

/**
 * Version:v1.0 (description:  )
 */
public class ItemDto implements CompareObjectDifferences<ItemDto> {

	/**
	 * 工作量编号
	 */
	private Integer itemId;

	/**
	 * 工作量对应的项目名称
	 */
	private String itemName = null;

	/**
	 * 工作量类目编号，确定工作量所属类目
	 */
	private Integer categoryId = ZERO_INT;

	/**
	 * 所属人编号，与教师表中工号一致
	 */
	private Integer ownerId = ZERO_INT;

	/**
	 * 参数以json格式存储，与类目表公式中参数一致，如{A：40}
	 */
	private String jsonParameter = null;

	/**
	 * 映射json参数的结果
	 */
	private List<ParameterValue> parameterValues = null;

	/**
	 * 根据参数计算出的当前总的工作量
	 */
	private Double workload = ZERO_DOUBLE;

	/**
	 * 组长编号，默认当前申请人为组长。当前登录人编号与此字段一致时，方可进行工作量的修改操作
	 */
	private Integer groupManagerId = ZERO_INT;

	/**
	 * 申请描述
	 */
	private String applyDesc = null;

	/**
	 * 工作描述
	 */
	private String jobDesc = null;

	/**
	 * 映射Json工作描述的集合
	 */
	private List<JobDesc> jobDescList = null;

	/**
	 * 状态
	 */
	private Integer status = ZERO_INT;

	/**
	 * Json格式存储组员权重，用于计算个人工作量，存储如：{组员1编号：0.4}
	 */
	private String jsonChildWeight = null;

	/**
	 * 映射Json组员权重的集合
	 */
	private List<ChildWeight> childWeightList = null;

	/**
	 * 证明
	 */
	private Integer proof = null;

	/**
	 * 教师姓名
	 */
	private String teacherName = null;

	/**
	 * 审核人编号
	 */
	private Integer reviewerId = ZERO_INT;

	/**
	 * 审核人姓名
	 */
	private String reviewerName = null;

	/**
	 * 组长姓名
	 */
	private String groupManagerName = null;

	/**
	 * 对应的类目姓名
	 */
	private String categoryName = null;

	/**
	 * 申报方式or导入方式
	 */
	private Integer importRequired = APPLY_SELF;

	/**
	 * 是否为小组
	 */
	private Integer isGroup = SINGLE;

	/**
	 * 学期版本号
	 */
	private String version = DateHelper.getCurrentTerm();

	/**
	 * 其他Json字段
	 */
	private String otherJson = null;

	/**
	 * 对应的公式
	 */
	private String formula = null;

	/**
	 * 对应的参数描述
	 */
	private List<FormulaParameter> paramDesc = null;

   	private List<DescAndValue> descAndValues = null;

	public List<DescAndValue> getDescAndValues() {
		return descAndValues;
	}

	public void setDescAndValues(List<DescAndValue> descAndValues) {
		this.descAndValues = descAndValues;
	}

	public String getFormula() {
		return formula;
	}

	public void setFormula(String formula) {
		this.formula = formula;
	}

	public List<FormulaParameter> getParamDesc() {
		return paramDesc;
	}

	public void setParamDesc(List<FormulaParameter> paramDesc) {
		this.paramDesc = paramDesc;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	private List<OtherJsonParameter> otherJsonParameters = null;

	public String getOtherJson() {
		return otherJson;
	}

	public void setOtherJson(String otherJson) {
		this.otherJson = otherJson;
	}

	public List<OtherJsonParameter> getOtherJsonParameters() {
		return otherJsonParameters;
	}

	public void setOtherJsonParameters(List<OtherJsonParameter> otherJsonParameters) {
		this.otherJsonParameters = otherJsonParameters;
	}

	public Integer getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(Integer reviewerId) {
		this.reviewerId = reviewerId;
	}

	public Integer getImportRequired() {
		return importRequired;
	}

	public void setImportRequired(Integer importRequired) {
		this.importRequired = importRequired;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getGroupManagerName() {
		return groupManagerName;
	}

	public void setGroupManagerName(String groupManagerName) {
		this.groupManagerName = groupManagerName;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}

	public String getJsonParameter() {
		return jsonParameter;
	}

	public void setJsonParameter(String jsonParameter) {
		this.jsonParameter = jsonParameter;
	}

	public Double getWorkload() {
		return workload;
	}

	public void setWorkload(Double workload) {
		this.workload = workload;
	}

	public Integer getGroupManagerId() {
		return groupManagerId;
	}

	public void setGroupManagerId(Integer groupManagerId) {
		this.groupManagerId = groupManagerId;
	}

	public String getApplyDesc() {
		return applyDesc;
	}

	public void setApplyDesc(String applyDesc) {
		this.applyDesc = applyDesc;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getJsonChildWeight() {
		return jsonChildWeight;
	}

	public void setJsonChildWeight(String jsonChildWeight) {
		this.jsonChildWeight = jsonChildWeight;
	}

	public Integer getProof() {
		return proof;
	}

	public void setProof(Integer proof) {
		this.proof = proof;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getReviewerName() {
		return reviewerName;
	}

	public void setReviewerName(String reviewerName) {
		this.reviewerName = reviewerName;
	}

	public List<ParameterValue> getParameterValues() {
		return parameterValues;
	}

	public void setParameterValues(List<ParameterValue> parameterValues) {
		this.parameterValues = parameterValues;
	}

	public List<JobDesc> getJobDescList() {
		return jobDescList;
	}

	public void setJobDescList(List<JobDesc> jobDescList) {
		this.jobDescList = jobDescList;
	}

	public List<ChildWeight> getChildWeightList() {
		return childWeightList;
	}

	public void setChildWeightList(List<ChildWeight> childWeightList) {
		this.childWeightList = childWeightList;
	}

	public Integer getIsGroup() {
		return isGroup;
	}

	public void setIsGroup(Integer isGroup) {
		this.isGroup = isGroup;
	}

	@Override
	public String toString() {
		return "ItemDto{" + "itemId=" + itemId + ", itemName='" + itemName + '\'' + ", categoryId="
				+ categoryId + ", ownerId=" + ownerId + ", jsonParameter='" + jsonParameter + '\''
				+ ", parameterValues=" + parameterValues + ", workload=" + workload
				+ ", groupManagerId=" + groupManagerId + ", applyDesc='" + applyDesc + '\''
				+ ", jobDesc='" + jobDesc + '\'' + ", jobDescList=" + jobDescList + ", status="
				+ status + ", jsonChildWeight='" + jsonChildWeight + '\'' + ", childWeightList="
				+ childWeightList + ", proof=" + proof + ", teacherName='" + teacherName + '\''
				+ ", reviewerId=" + reviewerId + ", reviewerName='" + reviewerName + '\''
				+ ", groupManagerName='" + groupManagerName + '\'' + ", categoryName='"
				+ categoryName + '\'' + ", importRequired=" + importRequired + ", isGroup="
				+ isGroup + ", version='" + version + '\'' + ", otherJson='" + otherJson + '\''
				+ ", formula='" + formula + '\'' + ", paramDesc=" + paramDesc + ", descAndValues="
				+ descAndValues + ", otherJsonParameters=" + otherJsonParameters + '}';
	}
}
