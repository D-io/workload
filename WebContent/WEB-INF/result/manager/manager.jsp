<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/7/5 0005
  Time: 16:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <h1>Hello manager!!</h1>
    <a href="/category/all">获取类目信息</a>

    <form action="/item" method="POST">
    <input type="text" name="itemName" value="工作量">
    <input type="text" name="categoryId" value="2">
    <input type="text" name="ownerId" value="3210343">
    <input type="text" name="jsonParameter" value="asd">
    <input type="text" name="workload" value="200">
    <input type="text" name="groupManagerId" value="5130121">
    <input type="text" name="applyDesc" value="申请描述">
    <input type="text" name="jsonChildWeight" value="12">
    <input type="submit" value="submit">
    </form>

</head>
<body>

</body>
</html>
