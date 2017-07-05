<%
    final String queryString = request.getQueryString();
    final String url = request.getContextPath() + "/default" + (queryString != null ?
            "?" + queryString :
            "");
    response.sendRedirect(response.encodeURL(url));
%>
