package com.ssm.workload.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssm.workload.pojo.Category;
import com.ssm.workload.service.CategoryService;

@Controller
@RequestMapping("/workload")   //���÷���·��
public class CategoryController {
	@Autowired
	@Qualifier("categoryService")
    private CategoryService categoryService; 
	JSONObject obj = new JSONObject();
	
	@RequestMapping("/insertCategory")
	/**
	 * ������������Ŀ(����Ա����)
	 * @param name,desc,parentId,isLeaf,importRequied,jsonParameters,formula,version��reviewDeadline
	 * @param status����0��applyDeadline����reviewDeadlineǰ48Сʱ
	 */
    public void insertCategory(@RequestBody Map<String, Object> category,HttpServletRequest request){
    	try{
    		String reviewerId = category.get("reviewerId").toString();
    		category.remove("reviewerId");
    		int insertCategory=categoryService.insertCategory(category);
    		if(insertCategory == -1){
    			obj.put("result",0);
    			obj.put("msg","������������Ŀʧ�ܣ������ֶ��Ƿ�Ϸ�");
    		} else {
    			Map<String, Object> reviewer = new HashMap<String, Object>();
    			reviewer.put("reviewerId",reviewerId);
    			reviewer.put("categoryId",insertCategory);
    			obj.put("result",1);
    			obj.put("msg",insertCategory);
    		}
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/updateCategory")
	/* 
	 * �޸Ĺ�������Ŀ
	 * ����Ա���޸��ֶ�ͬ����
	 * ����˽��޸��ֶ�applyDeadline
	 */
    public void updateCategory(HttpServletRequest request,Category category){
    	try{
    		String updateCategory=categoryService.updateCategory(category);
    		if(updateCategory.equals("�޸ĳɹ�")){
    			obj.put("result",1);
    			obj.put("msg",updateCategory);
    		} else {
    			obj.put("result",0);
    			obj.put("msg",updateCategory);
    		}
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/selectFirst")
	//��ѯ��һ����������Ŀ
    public void selectFirst(HttpServletRequest request){
    	try{
    		//��ѯ��ɾ��״̬�£��Ҹ��ڵ�Ϊ0��������Ŀ
    		String status = "-1";
    		Integer parentId = 0;
    		List<Category> selectCategory=categoryService.selectCategoryChildren(status, parentId);
        	obj.put("result",1);
        	obj.put("msg",selectCategory);
        	request.setCharacterEncoding("utf-8");
        	request.setAttribute("select",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/selectChildren")
	//��ѯĳһ��������Ŀ������Ŀ
    public void selectChildren(HttpServletRequest request, HttpServletResponse response){
    	try{
    		//��ѯ��ɾ��״̬�£��Ҹ��ڵ�Ϊ����id��������Ŀ
    		String status = "-1";
    		Integer parentId = Integer.valueOf(request.getParameter("parentId"));
    		List<Category> selectCategory=categoryService.selectCategoryChildren(status, parentId);
        	obj.put("result",1);
        	obj.put("msg",selectCategory);
        	request.setCharacterEncoding("utf-8");
        	request.setAttribute("select",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/selectDetail")
	//�鿴����
    public void selectDetail(HttpServletRequest request, HttpServletResponse response){
    	try{
    		//���ݴ���id��ѯĳһ������
    		Integer categoryId = Integer.valueOf(request.getParameter("categoryId"));
    		Category selectCategory=categoryService.selectCategoryById(categoryId);
        	obj.put("result",1);
        	obj.put("msg",selectCategory);
        	request.setCharacterEncoding("utf-8");
        	request.setAttribute("select",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/updateToLock")
	//����id����(�ύ)��������Ŀ
    public void updateToLock(HttpServletRequest request, HttpServletResponse response){
    	try{
    		String categoryIds = request.getParameter("id");
    		String[] categoryId = categoryIds.split(",");
    		for (int i=0;i<categoryIds.length();i++){
    			String deleteCategory=categoryService.updateCategoryStatus("1",categoryId[i]);
    			if(deleteCategory.equals("�޸ĳɹ�")){
        			obj.put("result",1);
        			obj.put("msg","�ύ�ɹ�");
        		} else {
        			obj.put("result",0);
        			obj.put("msg","�����ύʧ�ܣ������³��ԣ�");
        			break;
        		}
    		}
    		request.setCharacterEncoding("utf-8");
    		request.setAttribute("update",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/clearStatus")
	//����id������������Ŀ(��Ŀ״̬����δ�ύ)
    public void clearStatus(HttpServletRequest request, HttpServletResponse response){
    	try{
    		String categoryIds = request.getParameter("id");
    		String[] categoryId = categoryIds.split(",");
    		for (int i=0;i<categoryIds.length();i++){
    			String deleteCategory=categoryService.updateCategoryStatus("0",categoryId[i]);
    			if(deleteCategory.equals("�޸ĳɹ�")){
        			obj.put("result",1);
        			obj.put("msg","�����ɹ�");
        		} else {
        			obj.put("result",0);
        			obj.put("msg","���ֽ���ʧ�ܣ������³��ԣ�");
        			break;
        		}
    		}
    		request.setCharacterEncoding("utf-8");
    		request.setAttribute("update",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/updateToDisable")
	//����idɾ����������Ŀ(ҳ�治��ʾ)
    public void updateToDisable(HttpServletRequest request, HttpServletResponse response){
    	try{
    		String categoryIds = request.getParameter("id");
    		String status = request.getParameter("status");
    		String[] categoryId = categoryIds.split(",");
    		String[] statu = status.split(",");
    		for (int i=0;i<categoryIds.length();i++){
    			if(statu[i]!="0"){
    				obj.put("result",0);
        			obj.put("msg","�ǽ�������������ɾ�������Ƚ�����");
        			break;
    			}
    			String deleteCategory=categoryService.updateCategoryStatus("-1",categoryId[i]);
    			if(deleteCategory.equals("�޸ĳɹ�")){
        			obj.put("result",1);
        			obj.put("msg","ɾ���ɹ�");
        		} else {
        			obj.put("result",0);
        			obj.put("msg","����ɾ��ʧ�ܣ������³��ԣ�");
        			break;
        		}
    		}
    		request.setCharacterEncoding("utf-8");
    		request.setAttribute("update",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	@RequestMapping("/delete")
	//����idɾ����������Ŀ (����ɾ��)
    public void delete(HttpServletRequest request, HttpServletResponse response){
    	try{
    		String categoryIds = request.getParameter("id");
    		String[] categoryId = categoryIds.split(",");
    		for (int i=0;i<categoryIds.length();i++){
    			String deleteCategory=categoryService.deleteCategory(categoryId[i]);
    			if(deleteCategory.equals("ɾ���ɹ�")){
        			obj.put("result",1);
        			obj.put("msg",deleteCategory);
        		} else {
        			obj.put("result",0);
        			obj.put("msg","����ɾ��ʧ�ܣ������³��ԣ�");
        			break;
        		}
    		}
    		request.setCharacterEncoding("utf-8");
    		request.setAttribute("delete",obj);
    	}catch (Exception e) {
            e.printStackTrace();
        }
    } 
}
