<%--
  Created by IntelliJ IDEA.
  User: SBWang
  Date: 2017/8/10
  Time: 14:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript">

    var contextPath="${contextPath}";

    var currentRole="${currentRole}";

    var currentRoleName="${currentRoleName}";

     var roleList=${roleList};

     var currentYearUrl="${currentYear}";

     var currentTermUrl="${currentScheme}";

     var userNameUrl="${userName}";

     var userId="${userId}";

     var imaginUrl="<%=request.getContextPath()%>";

    var currentRoleUrl=contextPath+"/page/sidebar/list";

    var categoryListUrl=contextPath+"/category/info";

    var affectUrl=categoryListUrl+"/affected-items";

    var categoryallListUrl=categoryListUrl+"/parent-brief";

    var categoryAllUrl=categoryListUrl+"/all";

    var categoryInfoListUrl=categoryListUrl+"/list";

    var categoryManageUrl=contextPath+"/category/manage";

    var unlockCateUrl=categoryManageUrl+"/unlock";

    var categoryEditUrl=categoryManageUrl+"/modify";

    var categoryDeleteUrl=categoryManageUrl+"/disable";

    var categorySubmitUrl=categoryManageUrl+"/public-selective";

    var pageManageUrl=contextPath+"/region";

    var auditorManageUrl=contextPath+"/reviewer/info";

    var auditorCheckedUrl=auditorManageUrl+"/item-group";

    var reviewerManagerUrl=contextPath+"/reviewer/manage";

    var reviDoubleCheckUrl=reviewerManagerUrl+"/doubted-check";

    var itemAuditorUrl=contextPath+"/reviewer/info/categories";

    var workloadAuditUrl=contextPath+"/reviewer/info/apply-categories";

    var auditorManageItemUrl=auditorManageUrl+"/items";

    var reviewerCheckUrl=reviewerManagerUrl+"/check";

    var fileInfoUrl=contextPath+"/file";

    var importFileUrl=fileInfoUrl+"/import";

    var downloadInfoUrl=fileInfoUrl+"/template";

    var fileTempUrl=fileInfoUrl+"/import-template";

    var fileSubmitUrl=fileInfoUrl+"/submit";

    var itemManageUrl=contextPath+"/item/manage";

    var calculateUrl=itemManageUrl+"/calculate";

    var itemeditNameUrl=itemManageUrl+"/correct";

    var importProofUrl=itemManageUrl+"/file-proof";

    var itemManaPublicUrl=itemManageUrl+"/public-selective";

    var itemResetUrl=itemManageUrl+"/reset";

    var itemStatusUrl=itemManageUrl+"/status-update";

    var applyAgainUrl=itemManageUrl+"/apply-again";

    var itemInfoUrl=contextPath+"/item/info";

    var teacherAnalyzeUrl=itemInfoUrl+"/teacher-analyze";

    var teacherAnalyzeYearUrl=itemInfoUrl+"/teacher-analyze-year";

    var refreshInfoUrl=itemInfoUrl+"/refresh";

    var itemInfoSubUrl=itemInfoUrl+"/subjectList";

    var itemImportUrl=itemInfoUrl+"/import-categories";

    var itemGroupUrl=itemInfoUrl+"/item-group";

    var itemGroupImportUrl=itemGroupUrl+"/import";

    var itemCollection=itemInfoUrl+"/collection";

    var commonYearsUrl=contextPath+"/common/years";

    var thisTermUrl=contextPath+"/common/scheme";

    var itemTeacherInfo=itemInfoUrl+"/teacher-items";

    var itemAllUrl=itemInfoUrl+"/item-all";

    var itemSummaryUrl=itemInfoUrl+"/total-workload";

    var itemWithPageUrl=itemAllUrl+"/paginate";

    var reviewerModifyUrl=reviewerManagerUrl+"/workload-modify";

    var itemSubmitUrl=itemManageUrl+"/public-selective";

    var TeacherInfoUrl=contextPath+"/common/teachers";

    var currentTeaIdUrl=contextPath+"/common/user-info";

    var historyUrl=contextPath+"/history/info/histories-user";

    var manageHistoryUrl=contextPath+"/history/info/history-category";

    var resetHistoryUrl=contextPath+"/history/info/history-reset";

</script>
