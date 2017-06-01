package com.ssm.workload.pojo;

import java.util.Date;

public class Category {
    private Integer categoryId;

    private String name;

    private String desc;

    private Integer parentId;
    
    private String isLeaf;

    private String importRequied;

    private String jsonParameters;

    private String formula;

    private String version;

    private String status;

    private Date reviewDeadline;

    private Date applyDeadline;

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
        this.name = name == null ? null : name.trim();
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc == null ? null : desc.trim();
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

    public String getImportRequied() {
        return importRequied;
    }

    public void setImportRequied(String importRequied) {
        this.importRequied = importRequied == null ? null : importRequied.trim();
    }

    public String getParameters() {
        return jsonParameters;
    }

    public void setParameters(String jsonParameters) {
        this.jsonParameters = jsonParameters == null ? null : jsonParameters.trim();
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula == null ? null : formula.trim();
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version == null ? null : version.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public Date getReviewDeadline() {
        return reviewDeadline;
    }

    public void setReviewDeadline(Date reviewDeadline) {
        this.reviewDeadline = reviewDeadline;
    }

    public Date getApplyDeadline() {
        return applyDeadline;
    }

    public void setApplyDeadline(Date applyDeadline) {
        this.applyDeadline = applyDeadline;
    }
}