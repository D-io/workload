package cn.edu.uestc.ostec.workload.pojo;

import cn.edu.uestc.ostec.workload.support.utils.DateHelper;

import static cn.edu.uestc.ostec.workload.WorkloadObjects.ZERO_INT;

public class Item implements Cloneable {

	/**
	 * 工作量信息所在表名
	 */
	public static final String TABLE_NAME = "item";

	/**
	 * 工作量编号
	 */
	private Integer itemId;

	/**
	 * 工作量对应的项目名称
	 */
	private String itemName;

	/**
	 * 工作量类目编号，确定工作量所属类目
	 */
	private Integer categoryId;

	/**
	 * 所属人编号，与教师表中工号一致
	 */
	private Integer ownerId;

	/**
	 * 参数以json格式存储，与类目表公式中参数一致，如{A：40}
	 */
	private String jsonParameter;

	/**
	 * 根据参数计算出的当前总的工作量
	 */
	private Double workload;

	/**
	 * 组长编号，默认当前申请人为组长。当前登录人编号与此字段一致时，方可进行工作量的修改操作
	 */
	private Integer groupManagerId;

	/**
	 * 申请描述
	 */
	private String applyDesc = null;

	/**
	 * 工作描述
	 */
	private String jobDesc = null;

	/**
	 * 状态
	 */
	private Integer status;

	/**
	 * Json格式存储组员权重，用于计算个人工作量，存储如：{组员1编号：0.4}
	 */
	private String jsonChildWeight;

	/**
	 * 证明
	 */
	private Integer proof = null;

	/**
	 * 是否为小组
	 */
	private Integer isGroup = ZERO_INT;

	/**
	 * 其他Json字段
	 */
	private String otherJson = null;

	/**
	 * 版本号
	 */
	private String version = DateHelper.getCurrentTerm();

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getOtherJson() {
		return otherJson;
	}

	public void setOtherJson(String otherJson) {
		this.otherJson = otherJson;
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
		this.jsonParameter = jsonParameter == null ? null : jsonParameter.trim();
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
		this.applyDesc = applyDesc == null ? null : applyDesc.trim();
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc == null ? null : jobDesc.trim();
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
		this.jsonChildWeight = jsonChildWeight == null ? null : jsonChildWeight.trim();
	}

	public Integer getProof() {
		return proof;
	}

	public void setProof(Integer proof) {
		this.proof = proof;
	}

	public Integer getIsGroup() {
		return isGroup;
	}

	public void setIsGroup(Integer isGroup) {
		this.isGroup = isGroup;
	}

	@Override
	public String toString() {
		return "Item{" + "itemId=" + itemId + ", itemName='" + itemName + '\'' + ", categoryId="
				+ categoryId + ", ownerId=" + ownerId + ", jsonParameter='" + jsonParameter + '\''
				+ ", workload=" + workload + ", groupManagerId=" + groupManagerId + ", applyDesc='"
				+ applyDesc + '\'' + ", jobDesc='" + jobDesc + '\'' + ", status=" + status
				+ ", jsonChildWeight='" + jsonChildWeight + '\'' + ", proof='" + proof + '\''
				+ ", isGroup=" + isGroup + ", otherJson='" + otherJson + '\'' + '}';
	}

	/**
	 * 重写父类Object的clone()方法用于子类对象的复制
	 *
	 * PS.由于只涉及到基本的包装类型，未涉及到自定义类型，浅复制就足够满
	 *
	 * @return Object
	 */
	@Override
	public Object clone() {

		Item item = null;
		try {
			item = (Item) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}

		return item;
	}
}