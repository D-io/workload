/**
 * Created by SBWang on 2017/9/12.
 */
/*退回教师项目*/
function reset() {
    $.ajaxSetup({
        async : false
    });
    var resetStr = 'regionName=Realmanager/reviewer_reset';
    $.get(pageManageUrl+"?"+resetStr, {test : 12}, function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);
        $.get(itemWithPageUrl,{
            pageNum:1,
            pageSize:20
        }, function (data) {
            if(data.data==null){
                $(".totalItem").text("0");
            }
            else {
                $(".totalItem").text(data.data.totalLines);
            }
            $(".pagination").empty();
            reviewerResetItem(data);
            var str='';
            var totalPage=data.data.totalLines;
            var pageCountNum=Math.ceil(totalPage/20);
            if(pageCountNum<10){
                for(var pageNum=0;pageNum<pageCountNum;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';
                }
                //  $(".pagination").empty();
                $(".pagination").append(str);
            }
            else{
                str="共<span>"+pageCountNum+"页</span>"
                for(var pageNum=0;pageNum<10;pageNum++){
                    var pagestore=pageNum+1;

                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';


                }
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="10" tabindex="0">下一页</a></li>'
                $(".pagination").empty();
                $(".pagination").append(str);
            }
        });

    });
    var teachersInfo='';
    $.get(TeacherInfoUrl, {test : 12},function (data) {
        window.teachersInfo=data.data.teacherList;
    });
    for(var i=0;i<window.teachersInfo.length;i++){
        $('#teacherName').append('<option value=\"'+window.teachersInfo[i].teacherId+'\">'+window.teachersInfo[i].teacherId+window.teachersInfo[i].name+'</option>');
    }
    var itemAuditorInfo='';
    $.get(categoryallListUrl, {test : 12},function (data) {
        if(data.data.categoryBriefs){
            itemAuditorInfo=data.data.categoryBriefs;
            /* appendCategory(itemAuditorInfo);*/
        }
    });
    if(itemAuditorInfo&&itemAuditorInfo.length>0){
        for(var i=0;i<itemAuditorInfo.length;i++){

            $('#itemRequired').append('<option value=\"'+itemAuditorInfo[i].categoryId+'\">'+itemAuditorInfo[i].categoryName+'</option>');
        }
    }
    $(document).on("click","#sumItemSearch",function () {
        var option0=$("#ispassed option:selected").val();
        var option1=$("#itemRequired option:selected").val();
        var option2=$("#teacherName option:selected").val();
        //  var option3=$("#datatable_length option:selected").val();
        if(option0==0){
            option0=null;
        }
        if(option1==0){
            option1=null;
        }
        if(option2==0){
            option2=null;
        }

        $.get(itemWithPageUrl,{
            categoryId:option1,
            status:option0,
            ownerId:option2,
            pageSize:$(".input-sm option:selected").val()
        },function (data) {
            $(".ResetItem").empty();
            if(data.data==null){
                $(".totalItem").text("0");
            }
            else {
                $(".totalItem").text(data.data.totalLines);
            }
            $(".pagination").empty();

            reviewerResetItem(data);
            var str='';
            var totalPage=data.data.totalLines;
            var $pageSize=$(".input-sm option:selected").val();
            var pageCountNum=Math.ceil(totalPage/$pageSize);
            if(pageCountNum<10){
                for(var pageNum=0;pageNum<pageCountNum;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';
                }
                $(".pagination").append(str);
            }
            else{
                str="共<span>"+pageCountNum+"页</span>"
                for(var pageNum=0;pageNum<10;pageNum++){
                    var pagestore=pageNum+1;

                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';


                }
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="10" tabindex="0">下一页</a></li>'
                $(".pagination").empty();
                $(".pagination").append(str);
            }
        });
    });
    $(".input-sm").change(function () {

        var option0=$("#ispassed option:selected").val();
        var option1=$("#itemRequired option:selected").val();
        var option2=$("#teacherName option:selected").val();
        //  var option3=$("#datatable_length option:selected").val();
        if(option0==0){
            option0=null;
        }
        if(option1==0){
            option1=null;
        }
        if(option2==0){
            option2=null;
        }
        $.get(itemWithPageUrl,{
            categoryId:option1,
            status:option0,
            ownerId:option2,
            pageNum:1,
            pageSize:$(".input-sm option:selected").val(),
        }, function (data) {
            $(".totalItem").text(data.data.totalLines);
            var totalPage=data.data.totalLines;
            $(".ResetItem").empty();
            reviewerResetItem(data);
            var str='';
            if(data.data==null){
                $(".totalItem").text("0");
            }
            else {
                $(".totalItem").text(data.data.totalLines);
            }
            var $pageSize=$(".input-sm option:selected").val();
            var pageCountNum=Math.ceil(totalPage/$pageSize);
            if(pageCountNum<10){
                for(var pageNum=0;pageNum<pageCountNum;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'"tabindex="0">'+pagestore+'</a> </li>';
                }
                $(".pagination").empty();
                $(".pagination").append(str);
            }
            else{
                str="共<span>"+pageCountNum+"页</span>"
                for(var pageNum=0;pageNum<10;pageNum++){
                    var pagestore=pageNum+1;

                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';


                }
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="10" tabindex="0">下一页</a></li>'
            }
        });


    });
    $(document).on("click",".Toexcell",function () {
        var option0=$("#ispassed option:selected");
        var option1=$("#itemRequired option:selected");
        var option2=$("#teacherName option:selected");
        var form = $("<form>");
        form.attr("style","display:none");
        // form.attr("target","");
        form.attr("method","get");
        form.attr("action",itemWithPageUrl);
        if(option1.val()!=0){
            var input1 = $("<input>");
            input1.attr("type","hidden");
            input1.attr("name","categoryId");
            input1.attr("value",option1.val());
            form.append(input1);
        }
        if(option0.val()!=0){
            var input2 = $("<input>");
            input2.attr("type","hidden");
            input2.attr("name","status");
            input2.attr("value",option0.val());
            form.append(input2);
        }
        if(option2.val()!=0){
            var input3 = $("<input>");
            input3.attr("type","hidden");
            input3.attr("name","ownerId");
            input3.attr("value",option2.val());
            form.append(input3);
        }
        var input4 = $("<input>");
        input4.attr("type","hidden");
        input4.attr("name","ifExport");
        input4.attr("value","yes");
        $("body").append(form);

        form.append(input4);
        form.submit();
        form.remove();
    });
    $(document).off("click",".reset_reviewer");
    $(document).on("click", ".reset_reviewer", function () {
        var flag = this.id;
        var item_id = flag.match(/\d+/g);
        var someparamster = "itemId=" + item_id + "&role=reviewer";
        if(confirm("确定退回该项目？")){
            $.post(itemResetUrl+"?" + someparamster,function (data) {
                if (data.status == 200) {
                    alert('退回成功！');

                }
                else alert('退回失败！');
                reset();
            });
        };


    });
    $(document).off("click",".reset_applicant");
    $(document).on("click", ".reset_applicant", function () {
        var appflag = this.id;
        var myitemid = appflag.match(/\d+/g);
        var someparamster = "itemId=" + myitemid + "&role=proposer";
        if(confirm("确定退回该项目？")){
            $.post(itemResetUrl+"?" + someparamster,function (data) {
                if (data.status == 200) {
                    alert('退回成功！');

                }
                else alert('退回失败！');
                reset();
            });
        };

    });
    $(document).on("click",".activePage",function () {
        var thispagesize=parseInt($(this).attr("data-dt-idx"))+1;
        var option0=$("#ispassed option:selected").val();
        var option1=$("#itemRequired option:selected").val();
        var option2=$("#teacherName option:selected").val();
        //  var option3=$("#datatable_length option:selected").val();
        if(option0==0){
            option0=null;
        }
        if(option1==0){
            option1=null;
        }
        if(option2==0){
            option2=null;
        }
        $.get(itemWithPageUrl,{
            pageNum:thispagesize,
            pageSize:$(".input-sm option:selected").val(),
            categoryId:option1,
            status:option0,
            ownerId:option2
        }, function (data) {
            if(data.data==null){
                $(".totalItem").text("0");
            }
            else {
                $(".totalItem").text(data.data.totalLines);
            }
            $(".ResetItem").empty();
            reviewerResetItem(data);
            var str='';
            var totalPage=data.data.totalLines;
            var $pageSize=$(".input-sm option:selected").val();
            var pageCountNum=Math.ceil(totalPage/$pageSize);
            if(pageCountNum<10){
                for(var pageNum=0;pageNum<pageCountNum;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';
                }
                $(".pagination").empty();
                $(".pagination").append(str);
            }
            else{
                str="共<span>"+pageCountNum+"页</span>"
                for(var pageNum=0;pageNum<10;pageNum++){
                    var pagestore=pageNum+1;

                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pageNum+'" tabindex="0">'+pagestore+'</a> </li>';


                }
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="10" tabindex="0">下一页</a></li>'
                $(".pagination").empty();
                $(".pagination").append(str);
            }
        });
    });
    /*$(document).on("click",".itemName",*/
    $(".itemName").click(function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        if(!$(this).is('.input')){
            $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
                $(this).parent().removeClass('input').html($(this).val() || 0);
                $.post(itemeditNameUrl,{
                    itemId:thisId,
                    itemName:$("#itemName_"+thisId).text()
                },function () {

                });
            }).keydown(function(e){if(e.keyCode==13){
                $(this).parent().removeClass('input').html($(this).val() || 0);
                $.post(itemeditNameUrl,{
                    itemId:thisId,
                    itemName:$("#itemName_"+thisId).text()
                },function () {

                });
            }})
        }
    });
    $(document).on("click",".otherParaval",function () {
        var thisId=parseInt(this.id.match(/\d+/g));

        if(!$(this).is('.input')){
            var $otherstr=$(".otherstr_"+thisId);
            var strArr=new Array();
            for(var t=0;t<$otherstr.length;t++){
                strArr.push({key:$otherstr.eq(t).text(),value:$(".otherParaval_"+thisId).eq(t).text()});
            }
            strArr=JSON.stringify(strArr);
            $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
                $(this).parent().removeClass('input').html($(this).val() || 0);
                $.post(itemeditNameUrl,{
                    itemId:thisId,
                    otherParams:strArr
                },function () {

                })
            }).keydown(function(e){if(e.keyCode==13){
                $(this).parent().removeClass('input').html($(this).val() || 0);
                $.post(itemeditNameUrl,{
                    itemId:thisId,
                    otherParams:strArr
                },function () {

                });
            }});;
        }
    });
    $(document).on("click","#next",function(){
        var pageNum=parseInt($(this).attr("data-dt-idx"));
        pageNum++;
        $(this).attr("data-dt-idx",pageNum);
        var option0=$("#ispassed option:selected").val();
        var option1=$("#itemRequired option:selected").val();
        var option2=$("#teacherName option:selected").val();
        //  var option3=$("#datatable_length option:selected").val();
        if(option0==0){
            option0=null;
        }
        if(option1==0){
            option1=null;
        }
        if(option2==0){
            option2=null;
        }
        $.get(itemWithPageUrl,{
            pageNum:pageNum,
            pageSize:$(".input-sm option:selected").val(),
            categoryId:option1,
            status:option0,
            ownerId:option2
        }, function (data) {
            $(".ResetItem").empty();
            if(data.data==null){
                $(".totalItem").text("0");
            }
            else {
                reviewerResetItem(data);
                $(".totalItem").text(data.data.totalLines);
            }

        });


    })
    $("#teacherName").select2({
        placeholder:"",
        allowClear: true,
        width:"100%"
    });
    $("#itemRequired").select2({
        placeholder:"",
        allowClear: true,
        width:"100%"
    });
    $(".select2-selection").attr("class","form-control");
    $(".select2-selection__clear").css("float","right");
    $(".activePage").css("cursor","pointer");
}
/*生成表格信息*/
function reviewerResetItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";

    if(data.data.itemList&&data.data.itemList.length>0){
        var analyseList= data.data.itemList;
        var listLength= data.data.itemList.length;
        for(var i=0;i<listLength;i++)
        {
            var Info=analyseList[i];
            $(".ResetItem").append(rowInfo);
            $(".ResetItem tr:last").attr("class","resetNum");
            for(var j=0;j<9;j++)//单元格
            {
                $(".ResetItem tr:last").append(cellInfo);
                $(".ResetItem tr:last").attr("style","text-align:center");
            }
            var id=i;


            $(".ResetItem tr:last td:eq(0)").text(id+1);

            $(".ResetItem tr:last td:eq(1)").text(Info.categoryName);
            var itemImport='';
            switch (Info.importRequired){
                case 2:itemImport='无特殊类别';
                    $(".ResetItem tr:last td:eq(2)").append("<span><img src='"+imaginUrl+"/css/images/img.png'></span>");
                    break;
                case 0:itemImport='申报审核类';
                    $(".ResetItem tr:last td:eq(2)").append("<span title='申报类'><img src='"+imaginUrl+"/css/images/newChecked.png'></span>");
                    break;
                case 1:itemImport='导入复核类';
                    $(".ResetItem tr:last td:eq(2)").append("<span title='导入类'><img src='"+imaginUrl+"/css/images/newImport.png'></span>");
                    break;
            }

            $(".ResetItem tr:last td:eq(3)").text(Info.itemName);
            $(".ResetItem tr:last td:eq(3)").attr("class","itemName");
            $(".ResetItem tr:last td:eq(3)").attr("id","itemName_"+Info.itemId);
            /*isGroup*/
            var groupStyle='';
            switch (Info.isGroup){
                case 0:groupStyle="个人申报";
                    break;
                case 1:groupStyle="小组形式";
                    break;
            }
            $(".ResetItem tr:last td:eq(4)").text(groupStyle);
            $(".ResetItem tr:last td:eq(5)").text(Info.workload);
            $(".ResetItem tr:last td:eq(6)").text(Info.teacherName);

            var checkAct="<button type='button' class=\"btn btn-new reset_applicant\" id=\"applyReset_"+ Info.itemId+"\">退回申请</button><button type='button' class=\"btn btn-success reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\" style=''>退回审核</button><button class='btn btn-primary view_detail' id='viewdetail_"+i+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";
            var importAct="<button type='button' class=\"btn btn-danger reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\">退回导入</button><button type='button' class=\"btn btn-warning reset_applicant\" id=\"applyReset_"+ Info.itemId+"\">退回复核</button><button class='btn btn-primary view_detail' id='viewdetail_"+i+"'  data-toggle='modal' data-target='#showdetail'>查看详情</button>";

            if(Info.importRequired==0){
                $(".ResetItem tr:last td:eq(8)").append(checkAct);
            }
            else
                $(".ResetItem tr:last td:eq(8)").append(importAct);
            var statusName;
            if(Info.importRequired==0) {
                switch (Info.status) {
                    case -1:
                        statusName = '删除状态';
                        break;
                    case 0:
                        statusName = '未提交';
                        $("#reviReset_"+Info.itemId).attr("disabled","disabled");
                        break;
                    case 1:
                        statusName = '待审核';
                        $("#reviReset_"+Info.itemId).attr("disabled","disabled");
                        break;
                    case 2:
                        statusName = '已通过';
                        break;
                    case 3:
                        statusName = '存疑提交';
                        break;
                    case 4:
                        statusName = '存疑已解决';
                        break;
                    case 5:
                        statusName = '已拒绝';
                        break;
                }
            }
            else {
                switch (Info.status) {
                    case -1:
                        statusName = '删除状态';
                        break;
                    case 0:
                        statusName = '未提交';
                        $("#applyReset_"+Info.itemId).attr("disabled","disabled");
                        break;
                    case 1:
                        statusName = '待复核';
                        $("#applyReset_"+Info.itemId).attr("disabled","disabled");
                        break;
                    case 2:
                        statusName = '已通过';
                        break;
                    case 3:
                        statusName = '尚存疑';
                        break;
                    case 4:
                        statusName = '待复核';
                        break;
                    case 5:
                        statusName = '审核拒绝';
                        break;
                }
            }
            $(".ResetItem tr:last td:eq(7)").text(statusName);

            $(document).off("click",".view_detail");
            $(document).on("click",".view_detail",function () {
                var thisId=parseInt(this.id.match(/\d+/g));

                $(".revDetail").empty();
                $(".revDetail").append(rowInfo);

                var str='';
                if(analyseList[thisId].descAndValues!=null){
                    var paramArray=analyseList[thisId].descAndValues;
                    for(var paramCount=0;paramCount<paramArray.length;paramCount++){
                        str+='<p style="width: max-content;margin-left: 30px;"><span>'+paramArray[paramCount].desc+'</span>：<span>'+paramArray[paramCount].value+'</span></p>';

                    }
                }
                var otherstr = '';
                if(analyseList[thisId].otherJsonParameters!=null){
                    var otherparamArray = analyseList[thisId].otherJsonParameters;
                    if(otherparamArray&&otherparamArray.length>0){
                        for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {

                            otherstr +='<p style="width: max-content;margin-left: 30px;"><span  class="otherstr_'+analyseList[thisId].itemId+'">'+ otherparamArray[otherparamCount].key + '</span>'+'：'+'<span class="otherParaval otherParaval_'+analyseList[thisId].itemId+'" id="otherParaval_'+analyseList[thisId].itemId+'">'+ otherparamArray[otherparamCount].value+'</span></p>';


                        }
                    }
                }

                for(var t=0;t<5;t++)//单元格
                {
                    $(".revDetail tr:last").append(cellInfo);
                }
                $(".revDetail tr:last").css("text-align","center");
                $(".revDetail tr:last td:eq(0)").text(analyseList[thisId].formula);

                $(".revDetail tr:last td:eq(1)").append(str);

                $(".revDetail tr:last td:eq(2)").append(otherstr);
                var applyStyle='';
                if(analyseList[thisId].isGroup==1){
                    applyStyle="小组形式";
                    $(".groupChildDesc").show();
                    $(".groupChildWeight").show();
                    $('.resetDetail tr').find('td:eq(4)').show();
                    $('.resetDetail tr').find('td:eq(5)').show();
                    /*groupMessage*/
                    var countArray=new Array();
                    if(analyseList[thisId].childWeightList!=null){
                        for(var p=0;p<analyseList[thisId].childWeightList.length;p++){
                            for(var q=0;q<window.teachersInfo.length;q++){
                                if(analyseList[thisId].childWeightList[p].userId==window.teachersInfo[q].teacherId){
                                    countArray.push(window.teachersInfo[q].name);
                                }
                            }
                        }
                    }
                    var childWeight='';
                    if( analyseList[thisId].childWeightList!=null && analyseList[thisId].childWeightList.length ){
                        for( var m = 0; m < analyseList[thisId].childWeightList.length; m++ ){
                            childWeight = countArray[m]+ "：" + analyseList[thisId].childWeightList[m].weight;
                            $(".revDetail tr:last td:eq(3)").append( childWeight + "<br>");
                        }
                    }
                    /* 职责描述 */
                    var jobdesc='';
                    if( analyseList[thisId].jobDescList!=null && analyseList[thisId].jobDescList.length ){
                        for( var z = 0; z < analyseList[thisId].jobDescList.length; z++ ){
                            jobdesc = analyseList[thisId].jobDescList[z].jobDesc;
                            $(".revDetail tr:last td:eq(4)").append( jobdesc + "<br>");
                        }
                    }

                }
                else {
                    applyStyle="个人形式";
                    $(".groupChildDesc").hide();
                    $(".groupChildWeight").hide();
                    $('.resetDetail tr').find('td:eq(3)').hide();
                    $('.resetDetail tr').find('td:eq(4)').hide();
                }
                var applystatus='';

                if(analyseList[thisId].importRequired==0){
                    switch(analyseList[thisId].status){
                        case 0:applystatus="审核状态：未提交";
                            break;
                        case 1:applystatus="审核状态：待审核";
                            break;
                        case 2:applystatus="审核状态：已通过";
                            break;
                        case 5:applystatus="审核状态：已拒绝";
                            break;
                    }
                }
                else {
                    switch(analyseList[thisId].status){
                        case 0:applystatus="复核状态：未提交";
                            break;
                        case 1:applystatus="复核状态：待复核";
                            break;
                        case 2:applystatus="复核状态：已通过";
                            break;
                        case 3:applystatus="复核状态：尚存疑";
                            break;
                        case 4:applystatus="复核状态：已解决";
                            break;
                    }
                }

                $(".name").text(analyseList[thisId].itemName);
                $(".message").empty();
                $(".message").append("工作当量："+analyseList[thisId].workload+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;形式："+applyStyle+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+applystatus);


            })
        }
    }
}
/*退回操作记录*/
function resetHistory() {
    $.get(resetHistoryUrl,function (data) {
        showhistory(data);
    });
}