<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
function click(){
	var mydate = new Date();
$.ajax({  
            url : "/workload/insertCategory",  
            contentType : "application/json",
            type : "post",
            processData : true,  
            dataType : "json",  
            data : "{
            		 'name':'name',
            		 'desc':'desc',
            		 'parentId':0,
            		 'isLeaf':'0',
            		 'importRequied':'0',
            		 'jsonParameters':'{"人数":"A","当量":"B"}',
            		 'formula':'A*B',
            		 'version':'2016-2017-2',
            		 'status':'0',
            		 'reviewDeadline':mydate,
            		 'applyDeadline':mydate,
            		 'reviewerId':13
            		}",
            success : function(data) {}
})
}
</script>
</head>
<body>
<input type="button" value ="测试" onclick="click()">
</body>
</html>