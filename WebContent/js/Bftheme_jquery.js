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

    var resetStr='regionName=Realmanager/sum';
    $.get(pageManageUrl+"?"+resetStr,function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);

    });
    $.get(categoryInfoListUrl, function (data) {
        var showlist = $("<ul></ul>");
        showall(data.data.categoryTree, showlist);
        $(".panel-body").append(showlist);
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

                        $("<li class='itemList'></li>").append(item[menu].name+":"+item[menu].desc).appendTo(parent);
                    }
                    else{
                        $("<li class='itemList'></li>").append(item[menu].name+":"+item[menu].desc).appendTo(parent);
                    }
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
    var resetStr = 'regionName=Realmanager/reviewer_reset';
    $.get(pageManageUrl+"?"+resetStr, function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);
        $.get(itemAllUrl+"?"+"status=5", function (data) {
            reviewerResetItem(data);
        });
        $.get(itemAllUrl+"?"+"status=0", function (data) {
            reviewerResetItem(data);
        });

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
}
function itemSummary() {
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=Realmanager/itemSummary',function (result) {
        $('.right_hole').append(result);
        $.get(itemAllUrl+"?"+"status=2",function (data) {
            appendAllItem(data);

        });
    });
    $(document).ready(function () {
        $.get(TeacherInfoUrl,function (data) {
            for(var i=0;i<data.data.teacherList.length;i++){
                $('#teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+data.data.teacherList[i].teacherId+'</option>');
            }
        });

    });
    $(document).ready(function () {
        $.get(itemAuditorUrl,function (data) {
            for(var i=0;i<data.data.categoryList.length;i++){
                $('#itemRequired').append('<option value=\"'+data.data.categoryList[i].categoryId+'\">'+data.data.categoryList[i].categoryName+'</option>');
            }
        });

    });
    $(document).on("click","#sumItemSearch",function () {
        var option0=$("#ispassed option:selected");
        var option1=$("#itemRequired option:selected");
        var option2=$("#teacherName option:selected");
        var option3=$("#datatable_length option:selected");

        $.get(itemAllUrl+"?"+"categoryId="+option1.val()+"&ispassed="+option0.val()+"&ownerId="+option2.val()+"&pageNum=1&pageSize="+option3.val(),function (data) {
            $(".sumItemSort").empty();
            appendAllItem(data);

        });
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
            $(".sumItemSort tr:last").attr("id",Info.itemId);
            for(var j=0;j<8;j++)//单元格
            {
                $(".sumItemSort tr:last").append(cellInfo);
            }
            var id=i;
            $(".sumItemSort tr:last td:eq(0)").text(id+1);
            $(".sumItemSort tr:last td:eq(1)").text(Info.teacherName);
            $(".sumItemSort tr:last td:eq(2)").text(Info.itemName);
            $(".sumItemSort tr:last td:eq(3)").text(Info.workload);
            var paramArray = Info.parameterValues;
            var str = '';
            for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

                str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
            }
            $(".sumItemSort tr:last td:eq(4)").text(str);
            var otherparamArray = Info.otherJsonParameters;
            var otherstr = '';
            if(otherparamArray&&otherparamArray.length>0){
                for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                    otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
                }
            }

            $(".sumItemSort tr:last td:eq(5)").text(otherstr);
            var isGroup='';
            switch(Info.isGroup){
                case 1:isGroup="小组申报";
                    break;
                case 0:isGroup="个人申报";
                    break;
            }
            $(".sumItemSort tr:last td:eq(6)").text(isGroup);
            //  var act="<a href=\"#\" class=\"pass btn btn-primary\" type=\"button\">查看详情</a> ";
            $(".sumItemSort tr:last td:eq(7)").text("确认通过");
        }
    }
}
function reviewerResetItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    if(data.data.itemDtoList&&data.data.itemDtoList.length>0){
        var analyseList= data.data.itemDtoList;
        var listLength= data.data.itemDtoList.length;
        for(var i=0;i<listLength;i++)
        {
            var Info=analyseList[i];
            $(".ResetItem").append(rowInfo);
            $(".ResetItem tr:last").attr("id",Info.itemId);
            for(var j=0;j<8;j++)//单元格
            {
                $(".ResetItem tr:last").append(cellInfo);
            }
            var id=i;
            var paramArray=Info.parameterValues;
            var str='';
            for(var paramCount=0;paramCount<paramArray.length;paramCount++){

                str+=paramArray[paramCount].symbol+':'+paramArray[paramCount].value;
            }
            var otherparamArray = Info.otherJsonParameters;
            var otherstr = '';
            if(otherparamArray&&otherparamArray.length>0){
                for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                    otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
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
            $(".ResetItem tr:last td:eq(1)").text(Info.teacherName);
            $(".ResetItem tr:last td:eq(2)").text(Info.itemName);
            $(".ResetItem tr:last td:eq(3)").text(str);
            $(".ResetItem tr:last td:eq(4)").text(otherstr);
            $(".ResetItem tr:last td:eq(5)").text(Info.workload);
            $(".ResetItem tr:last td:eq(6)").text(statusName);
            var act="<a class=\"btn btn-info btn-xs reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 重置审核人</a> <a class=\"btn btn-info btn-xs reset_applicant\" id=\"applyReset_"+ Info.itemId+"\"><i class=\"fa fa-pencil\"></i> 重置申报人</a>";
            $(".ResetItem tr:last td:eq(7)").append(act);
        }
    }
}
$(document).on("click","#addParameter",function () {
    var addStr="<tr><td><input type='text' class='parameterName' name='parameterName'></td><td><input type='text' class='parameterSymbol' name='parameterSymbol'></td></tr>";
    $('.AddPramter').append(addStr);
});
$(document).ready(function () {
    $.get(TeacherInfoUrl,function (data) {
        for(var i=0;i<data.data.teacherList.length;i++){
            $('#teacherName').append('<option value=\"'+data.data.teacherList[i].teacherId+'\">'+data.data.teacherList[i].name+'</option>');
        }
    });

});
