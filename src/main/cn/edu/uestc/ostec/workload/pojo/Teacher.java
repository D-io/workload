package cn.edu.uestc.ostec.workload.pojo;

/**
 * Version:v1.0 (description: 教师POJO  )
 */
public class Teacher {

	private Integer teacherId;

	private String name;

	private String professionalTitle;

	public String getProfessionalTitle() {
		return professionalTitle;
	}

	public void setProfessionalTitle(String professionalTitle) {
		this.professionalTitle = professionalTitle;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
