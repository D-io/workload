/*
$(document).on("click","#clickToggle1",function () {
    $(".ck1").toggle("slow");

});
$(document).on("click","#clickToggle2",function () {
    $(".ck2").toggle("slow");

});
$(document).on("click","#clickToggle3",function () {
    $(".ck3").toggle("slow");

});
$(document).on("click",".btn-sm",function () {
    $('.hidden-addedText').show();

});

    $('.btn-md').on("click", function () {
        $('.hidden-addedText').hide();

    });
$(document).on("click",".collapse-link",function () {
    $(".x_content").toggle("slow");
    $(".fa-chevron-up").toggleClass("fa-chevron-down");
});

    $(".close-link").on("click", function () {
        $(".x_panel").hide();
    });
    $(".sorting1").on("click", function () {
        $(".sorting1").toggleClass("sorting_asc");

    });
    $(".sorting2").on("click", function () {
        $(".sorting2").toggleClass("sorting_asc");

    });

    $(".sorting_asc").on("click", function () {
        $(".sorting_asc").toggleClass("sorting_desc");
    });
*/
function jumpToSum() {
/*
    var resetStr='regionName=Realmanager/sum';
    $.get(pageManageUrl+"?"+resetStr,function (data) {
        $('#tab_content2').empty();
        $('#tab_content2').append(data);

    });*/
    $.get(categoryInfoListUrl, function (data) {
        $('#tab_content2').empty();
        var showlist = $("<ul></ul>");
        showall(data.data.categoryTree, showlist);
        $('#tab_content2').append(showlist);
       /* $(".panel-body").append(showlist);*/
        function showall(item, parent) {
            for (var menu in item) {
                //如果有子节点，则遍历该子节点
                if (item[menu].children.length > 0) {
                    //创建一个子节点li
                    var li = $("<li class='itemlist'></li>");
                    if(item[menu].formula){
                        $(li).append(item[menu].name).append("<ul></ul>").appendTo(parent);

                    }
                    //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                    else {
                        $(li).append(item[menu].name).append("<ul></ul>").appendTo(parent);
                    }
                    //将空白的ul作为下一个递归遍历的父亲节点传入
                    showall(item[menu].children, $(li).children().eq(0));
                }
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                else {
                    if(item[menu].formula) {
                        var cateShort='';
                        switch (item[menu].importRequired){
                            case 1:cateShort='导入复核类';
                                $("<li class='itemList'></li>").append("<br>["+item[menu].name+"]</br>"+item[menu].desc+ "<table class='table table-striped table-bordered dataTable no-footer' style='float: right;width: 60%; '> <thead> <tr role='row'> <th class='sorting' style='padding: 5px;'>复核截止时间:<span>"+item[menu].applyDeadline+"</span></th><th class='sorting' style='padding: 5px;'>导入截止时间:<span>"+item[menu].reviewDeadline+"</span></th><th class='sorting' style='padding: 5px;background-color:#1ABB9C'><a style='float:right;color:#fff;'>"+cateShort+"</a></th></tr></thread></table><div style='clear:both;'></div>").appendTo(parent);
                                  break;
                            case 0:cateShort='申报审核类';
                                $("<li class='itemList'></li>").append("<br>["+item[menu].name+"]</br>"+item[menu].desc+"<table class='table table-striped table-bordered dataTable no-footer' style='float: right;width: 60%; '> <thead> <tr role='row'> <th class='sorting' style='padding: 5px;'>申请截止时间:<span>"+item[menu].applyDeadline+"</span></th><th class='sorting' style='padding: 5px;'>审核截止时间:<span>"+item[menu].reviewDeadline+"</span></th><th class='sorting' style='padding: 5px;background-color:#3498DB'><a style='float:right;color: #fff;'>"+cateShort+"</a></th></tr></thread></table><div style='clear:both;'></div>").appendTo(parent);
                                break;
                        }

                    }
                    /*else{
                        $("<li class='itemList'></li>").append("["+item[menu].name+"]"+item[menu].desc).appendTo(parent);
                    }*/
                }
            }
        }


    });
}
function jumpToAdd() {

    var resetStr='regionName=manager/Manager-right-col';
    $.get(pageManageUrl+"?"+resetStr,function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);

    });
  ztree();
}
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
            pageSize:5
        }, function (data) {
            $(".totalItem").text(data.data.totalRecords);
            reviewerResetItem(data);
            var str='';
            if(data.data.pageCount<10){
                for(var pageNum=0;pageNum<data.data.pageCount;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="1" tabindex="0">'+pagestore+'</a> </li>';
                }
                $(".pagination").empty();
                $(".pagination").append(str);
            }
        });

    });
    var teachersInfo='';
    $.get(TeacherInfoUrl, {test : 12},function (data) {
        teachersInfo=data.data.teacherList;
    });
    for(var i=0;i<teachersInfo.length;i++){
        $('#teacherName').append('<option value=\"'+teachersInfo[i].teacherId+'\">'+teachersInfo[i].name+teachersInfo[i].teacherId+'</option>');
    }
    var itemAuditorInfo='';
    $.get(itemAuditorUrl, {test : 12},function (data) {
        if(data.data.categoryList){
            itemAuditorInfo=data.data.categoryList;
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
            $(".totalItem").text(data.data.totalRecords);
            $(".pagination").empty();
            $(".ResetItem").empty();
            reviewerResetItem(data);
            var str='';
            if(data.data.pageCount<10){
                for(var pageNum=0;pageNum<data.data.pageCount;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="1" tabindex="0">'+pagestore+'</a> </li>';
                }
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
                $(".totalItem").text(data.data.totalRecords);
                $(".ResetItem").empty();
                reviewerResetItem(data);
                var str='';
                if(data.data.pageCount<10){
                    for(var pageNum=0;pageNum<data.data.pageCount;pageNum++){
                        var pagestore=pageNum+1;
                        str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="1" tabindex="0">'+pagestore+'</a> </li>';
                    }
                    $(".pagination").empty();
                    $(".pagination").append(str);
                }
            });


    });
    $(document).on("click",".Toexcell",function () {
        var option0=$("#ispassed option:selected");
        var option1=$("#itemRequired option:selected");
        var option2=$("#teacherName option:selected");
        // var option3=$("#datatable_length option:selected");
        /*$.get(itemAllUrl+"?"+"categoryId="+option1.val()+"&status="+option0.val()+"&ownerId="+option2.val()+"&isExport=yes",function (data) {

         });*/
        var form = $("<form>");
        form.attr("style","display:none");
        // form.attr("target","");
        form.attr("method","get");
        //  var strZipPath='categoryId="'+option1.val()+'"&status="'+option0.val()+'"&ownerId="'+option2.val()+'"&isExport="yes"';

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
    $(document).on("click", ".reset_reviewer", function () {
        var flag = this.id;
        var item_id = flag.match(/\d+/g);
        var someparamster = "itemId=" + item_id + "&role=reviewer";
        $.post(itemResetUrl+"?" + someparamster,function (data) {
            if (data.status == 200) {
                alert('重置成功！');
                reset();
            }
            else alert('重置失败！');
        });

    });
    $(document).on("click", ".reset_applicant", function () {
        var appflag = this.id;
        var myitemid = appflag.match(/\d+/g);
        var someparamster = "itemId=" + myitemid + "&role=proposer";
        $.post(itemResetUrl+"?" + someparamster,function (data) {
            if (data.status == 200) {
                alert('重置成功！');
                reset();
            }
            else alert('重置失败！');
        });
    });
    $(document).on("click",".activePage",function () {
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
            pageNum:this.val(),
            pageSize:$(".input-sm option:selected").val(),
            categoryId:option1,
            status:option0,
            ownerId:option2
        }, function (data) {
            $(".totalItem").text(data.data.totalRecords);
            $(".ResetItem").empty();
            reviewerResetItem(data);
            var str='';
            if(data.data.pageCount<10){
                for(var pageNum=0;pageNum<data.data.pageCount;pageNum++){
                    var pagestore=pageNum+1;
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="1" tabindex="0">'+pagestore+'</a> </li>';
                }
                $(".pagination").empty();
                $(".pagination").append(str);
            }
        });
    });
}

function itemSummary() {
    $.ajaxSetup({
        async : false
    });
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=Realmanager/itemSummary', {test : 12},function (result) {
        $('.right_hole').append(result);
        $.get(itemSummaryUrl,{test : 12},function (data) {
           /* appendAllItem(data);*/
            var rowInfo="<tr></tr>";
            var cellInfo="<td></td>";
            /*sumItemPreview*/
            if(data.data.info&&data.data.info.length>0){
                var analyseList= data.data.info;
                var listLength= data.data.info.length;
                for(var i=0;i<listLength;i++)
                {
                    var Info=analyseList[i];
                    $(".sumItemPreview").append(rowInfo);
                    $(".sumItemPreview tr:last").attr("class","resetNum");
                    for(var j=0;j<6;j++)//单元格
                    {
                        $(".sumItemPreview tr:last").append(cellInfo);
                    }
                    var id=i+1;

                    $(".sumItemPreview tr:last td:eq(0)").text(id);
                    $(".sumItemPreview tr:last td:eq(1)").text(Info.teacherName);
                    $(".sumItemPreview tr:last td:eq(2)").text(Info.teacherId);
                    $(".sumItemPreview tr:last td:eq(2)").attr("id","teacherId_"+id);
                    $(".sumItemPreview tr:last td:eq(3)").text(Info.checkedWorkload);
                    $(".sumItemPreview tr:last td:eq(4)").text(Info.uncheckedWorkload);
                    var act="<a class=\"btn btn-primary btn-xs previewAll\" id=\"previewAll_"+ id+"\" data-toggle='modal' data-target='#applyModal'>查看详情</a>";
                    $(".sumItemPreview tr:last td:eq(5)").append(act);
                }
            }
        });

    });
    /*var teachersInfo='';
        $.get(TeacherInfoUrl, {test : 12},function (data) {
            teachersInfo=data.data.teacherList;
        });
    for(var i=0;i<teachersInfo.length;i++){
        $('#teacherName').append('<option value=\"'+teachersInfo[i].teacherId+'\">'+teachersInfo[i].name+teachersInfo[i].teacherId+'</option>');
    }
        var itemAuditorInfo='';
        $.get(itemAuditorUrl, {test : 12},function (data) {
            if(data.data.categoryList){
                 itemAuditorInfo=data.data.categoryList;
            }
        });
    if(itemAuditorInfo&&itemAuditorInfo.length>0){
        for(var i=0;i<itemAuditorInfo.length;i++){
            $('#itemRequired').append('<option value=\"'+itemAuditorInfo[i].categoryId+'\">'+itemAuditorInfo[i].categoryName+'</option>');
        }
    }*/

/*    $(document).on("click","#sumItemSearch",function () {
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

        $.get(itemAllUrl,{
            categoryId:option1,
            status:option0,
            ownerId:option2
        },function (data) {
            $(".sumItemSort").empty();
            appendAllItem(data);

        });
    });

    $(document).on("click",".Toexcell",function () {
        var option0=$("#ispassed option:selected");
        var option1=$("#itemRequired option:selected");
        var option2=$("#teacherName option:selected");
        // var option3=$("#datatable_length option:selected");
        /!*$.get(itemAllUrl+"?"+"categoryId="+option1.val()+"&status="+option0.val()+"&ownerId="+option2.val()+"&isExport=yes",function (data) {

         });*!/
        var form = $("<form>");
        form.attr("style","display:none");
        // form.attr("target","");
        form.attr("method","get");
        //  var strZipPath='categoryId="'+option1.val()+'"&status="'+option0.val()+'"&ownerId="'+option2.val()+'"&isExport="yes"';

        form.attr("action",itemAllUrl);
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
    })*/
    $(document).on("click",".previewAll",function () {
       var idCount=parseInt(this.id.match(/\d+/g));
       var teacherid=$("#teacherId_"+idCount).text();
       $.get(itemCollection,{
           teacherId:teacherid
       },function (data) {
           appendAllItem(data);
       })
    });

}
function appendAllItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    if(data.data.itemDtoList&&data.data.itemDtoList.length){
        var analyseList= data.data.itemDtoList;
        var listLength= data.data.itemDtoList.length;
        for(var i=0;i<listLength;i++)
        {
            var Info=analyseList[i];
            $(".sumItemSort").append(rowInfo);
            $(".sumItemSort tr:last").attr("class","resetNum");
            for(var j=0;j<10;j++)//单元格
            {
                $(".sumItemSort tr:last").append(cellInfo);
            }
            var id=i;
            var paramArray=Info.descAndValues;
            var str='';
            for(var paramCount=0;paramCount<paramArray.length;paramCount++){
                if(paramCount!=paramArray.length-1){
                    str+='<p style="width: max-content;">'+paramArray[paramCount].desc+':'+paramArray[paramCount].value+'</p><hr/>';

                }
                else
                    str+='<p style="width: max-content;">'+paramArray[paramCount].desc+':'+paramArray[paramCount].value+'</p>';
            }
            var otherparamArray = Info.otherJsonParameters;
            var otherstr = '';
            if(otherparamArray&&otherparamArray.length>0){
                for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                    if(otherparamCount!=otherparamArray.length-1){
                        otherstr +='<p style="width: max-content;">'+ otherparamArray[otherparamCount].key + ':'+ otherparamArray[otherparamCount].value+'</p><hr/>';

                    }
                    else
                        otherstr +='<p style="width: max-content;">'+ otherparamArray[otherparamCount].key + ':'+ otherparamArray[otherparamCount].value+'</p>';

                }
            }
            var paramDesc = Info.paramDesc;
            var paramDescstr = '';
            if(paramDesc&&paramDesc.length>0){
                for (var paramDescCount = 0; paramDescCount < paramDesc.length; paramDescCount++) {
                    paramDescstr +='<p>'+ paramDesc[paramDescCount].symbol +'<p>'+ ':' +'<p>'+ paramDesc[paramDescCount].desc+'<p><hr/>';
                }
            }
            var statusName;
            if(Info.importRequired==0) {
                switch (Info.status) {
                    case -1:
                        statusName = '删除状态';
                        break;
                    case 0:
                        statusName = '未提交状态';
                        break;
                    case 1:
                        statusName = '待审核';
                        break;
                    case 2:
                        statusName = '审核通过';
                        break;
                    case 3:
                        statusName = '存疑提交';
                        break;
                    case 4:
                        statusName = '存疑已解决';
                        break;
                    case 5:
                        statusName = '审核拒绝';
                        break;
                }
            }
            else {
                switch (Info.status) {
                    case -1:
                        statusName = '删除状态';
                        break;
                    case 0:
                        statusName = '未提交状态';
                        break;
                    case 1:
                        statusName = '待复核';
                        break;
                    case 2:
                        statusName = '复核通过';
                        break;
                    case 3:
                        statusName = '存疑提交';
                        break;
                    case 4:
                        statusName = '存疑已解决';
                        break;
                    case 5:
                        statusName = '审核拒绝';
                        break;
                }
            }
            $(".sumItemSort tr:last td:eq(0)").text(id+1);
            $(".sumItemSort tr:last td:eq(1)").text(Info.categoryName);
            var itemImport='';
            switch (Info.importRequired){
                case 2:itemImport='无特殊类别';
                    break;
                case 1:itemImport='申报审核类';
                    break;
                case 0:itemImport='导入复核类';
                    break;
            }
            $(".sumItemSort tr:last td:eq(2)").text(itemImport);
            $(".sumItemSort tr:last td:eq(3)").text(Info.itemName);
            $(".sumItemSort tr:last td:eq(4)").text(Info.formula);

            $(".sumItemSort tr:last td:eq(5)").append(str);


            /*  $(".ResetItem tr:last td:eq(5)").text(paramDescstr);*/
            $(".sumItemSort tr:last td:eq(6)").append(otherstr);

            $(".sumItemSort tr:last td:eq(7)").text(Info.workload);
            $(".sumItemSort tr:last td:eq(8)").text(Info.teacherName);
            $(".sumItemSort tr:last td:eq(9)").text(statusName);


        }
    }
}
function reviewerResetItem(data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
    /*if($(".resetNum").length>0){
        $(".ResetItem tr:last td:eq(0)").text();
    }*/
        if(data.data.itemDtoList&&data.data.itemDtoList.length>0){
            var analyseList= data.data.itemDtoList;
            var listLength= data.data.itemDtoList.length;
            for(var i=0;i<listLength;i++)
            {
                var Info=analyseList[i];
                $(".ResetItem").append(rowInfo);
                $(".ResetItem tr:last").attr("class","resetNum");
                for(var j=0;j<11;j++)//单元格
                {
                    $(".ResetItem tr:last").append(cellInfo);
                }
                var id=i;
                var paramArray=Info.descAndValues;
                var str='';
                for(var paramCount=0;paramCount<paramArray.length;paramCount++){
                    if(paramCount!=paramArray.length-1){
                        str+='<p style="width: max-content;">'+paramArray[paramCount].desc+':'+paramArray[paramCount].value+'</p><hr/>';

                    }
                    else
                        str+='<p style="width: max-content;">'+paramArray[paramCount].desc+':'+paramArray[paramCount].value+'</p>';
                }
                var otherparamArray = Info.otherJsonParameters;
                var otherstr = '';
                if(otherparamArray&&otherparamArray.length>0){
                    for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                        if(otherparamCount!=otherparamArray.length-1){
                            otherstr +='<p style="width: max-content;">'+ otherparamArray[otherparamCount].key + ':'+ otherparamArray[otherparamCount].value+'</p><hr/>';

                        }
                        else
                            otherstr +='<p style="width: max-content;">'+ otherparamArray[otherparamCount].key + ':'+ otherparamArray[otherparamCount].value+'</p>';

                    }
                }
                var paramDesc = Info.paramDesc;
                var paramDescstr = '';
                if(paramDesc&&paramDesc.length>0){
                    for (var paramDescCount = 0; paramDescCount < paramDesc.length; paramDescCount++) {
                        paramDescstr +='<p>'+ paramDesc[paramDescCount].symbol +'<p>'+ ':' +'<p>'+ paramDesc[paramDescCount].desc+'<p><hr/>';
                    }
                }
                var statusName;
                if(Info.importRequired==0) {
                    switch (Info.status) {
                        case -1:
                            statusName = '删除状态';
                            break;
                        case 0:
                            statusName = '未提交状态';
                            break;
                        case 1:
                            statusName = '待审核';
                            break;
                        case 2:
                            statusName = '审核通过';
                            break;
                        case 3:
                            statusName = '存疑提交';
                            break;
                        case 4:
                            statusName = '存疑已解决';
                            break;
                        case 5:
                            statusName = '审核拒绝';
                            break;
                    }
                }
                else {
                    switch (Info.status) {
                        case -1:
                            statusName = '删除状态';
                            break;
                        case 0:
                            statusName = '未提交状态';
                            break;
                        case 1:
                            statusName = '待复核';
                            break;
                        case 2:
                            statusName = '复核通过';
                            break;
                        case 3:
                            statusName = '存疑提交';
                            break;
                        case 4:
                            statusName = '存疑已解决';
                            break;
                        case 5:
                            statusName = '审核拒绝';
                            break;
                    }
                }
                $(".ResetItem tr:last td:eq(0)").text(id+1);
                $(".ResetItem tr:last td:eq(1)").text(Info.categoryName);
                var itemImport='';
                switch (Info.importRequired){
                    case 2:itemImport='无特殊类别';
                    break;
                    case 1:itemImport='申报审核类';
                    break;
                    case 0:itemImport='导入复核类';
                    break;
                }
                $(".ResetItem tr:last td:eq(2)").text(itemImport);
                $(".ResetItem tr:last td:eq(3)").text(Info.itemName);
                $(".ResetItem tr:last td:eq(4)").text(Info.formula);

                $(".ResetItem tr:last td:eq(5)").append(str);


              /*  $(".ResetItem tr:last td:eq(5)").text(paramDescstr);*/
                $(".ResetItem tr:last td:eq(6)").append(otherstr);

                $(".ResetItem tr:last td:eq(7)").text(Info.workload);
                $(".ResetItem tr:last td:eq(8)").text(Info.teacherName);
                $(".ResetItem tr:last td:eq(9)").text(statusName);
                var checkAct="<a class=\"btn btn-info btn-xs reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 退回审核人</a> <a class=\"btn btn-info btn-xs reset_applicant\" id=\"applyReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 退回申报人</a>";
                var importAct="<a class=\"btn btn-info btn-xs reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 退回审核人</a> <a class=\"btn btn-info btn-xs reset_applicant\" id=\"applyReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 退回复核人</a>";
                if(Info.importRequired==0){
                    $(".ResetItem tr:last td:eq(10)").append(checkAct);
                }
                else
                    $(".ResetItem tr:last td:eq(10)").append(importAct);

            }
        }
    }
function manageHistory() {
    $.get(manageHistoryUrl,function (data) {
        showhistory(data);
    });
}
$(document).on("click","#addParameter",function () {
    var addStr="<tr><td><input type='text' class='form-control parameterName' name='parameterName'></td><td><input type='text' class='form-control parameterSymbol' name='parameterSymbol'></td></tr>";
    $('.AddPramter').append(addStr);
});
$(document).on("click","#addOtherParameter",function () {
    var addStr="<tr><td><input type='text' class='form-control otherParameterName' name='parameterName'></td></tr>";
    $('.addOtherPramter').append(addStr);
});
