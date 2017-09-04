/**
 * Created by SBWang on 2017/7/24.
 */
function reviewerSumItem() {
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=applicant/selfSummary',function (result) {
        $('.right_hole').append(result);
        $.get(itemCollection,{"option":"checked"},function (data) {
            $(".totalWorkload").text(data.data.teacherWorkload.totalWorkload);
            $(".checkedWorkload").text(data.data.teacherWorkload.checkedWorkload);
            $(".uncheckedWorkload").text(data.data.teacherWorkload.uncheckedWorkload);
            appendReviewerItem(data.data.importItemList,"sumCheckedItem");

            appendReviewerItem(data.data.applyItemList,"sumCheckedItem");
        });
    });


        $.get(itemCollection,{"option":"unchecked"},function (data) {

            appendReviewerItem(data.data.importItemList,"sumnoItemSort");
            appendReviewerItem(data.data.applyItemList,"sumnorevieItem");
        });

}
function appendReviewerItem(data,mystr) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
    if(data&&data.length){
        var analyseList= data;
        var listLength= data.length;
        for(var i=0;i<listLength;i++)
        {
            var Info=analyseList[i];
            $("."+mystr).append(rowInfo);
            $("."+mystr+" tr:last").attr("class","resetNum");
            for(var j=0;j<7;j++)//单元格
            {
                $("."+mystr+" tr:last").append(cellInfo);
            }
            var id=i;
            /* var paramArray=Info.descAndValues;
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
             }*/
            var statusName;
            if(Info.importRequired==0) {
                switch (Info.status) {
                    case -1:
                        statusName = '删除状态';
                        break;
                    case 0:
                        statusName = '未提交';
                        break;
                    case 1:
                        statusName = '待审核';
                        break;
                    case 2:
                        statusName = '已通过';
                        break;
                    case 3:
                        statusName = '尚存疑';
                        break;
                    case 4:
                        statusName = '待审核';
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
                        break;
                    case 1:
                        statusName = '待复核';
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
                        statusName = '已拒绝';
                        break;
                }
            }
            $("."+mystr+" tr:last").css("text-align","center");
            $("."+mystr+" tr:last td:eq(0)").text(id+1);
            $("."+mystr+" tr:last td:eq(1)").text(Info.categoryName);
            var itemImport='';
            switch (Info.importRequired){
                case 2:itemImport='无特殊类别';
                    $("."+mystr+" tr:last td:eq(2)").append("<span title='无类别'><img src='"+imaginUrl+"/css/images/img.png'></span>");
                    break;
                case 0:itemImport='申报审核类';
                    $("."+mystr+" tr:last td:eq(2)").append("<span title='申报类'><img src='"+imaginUrl+"/css/images/newChecked.png'></span>");
                    break;
                case 1:itemImport='导入复核类';
                    $("."+mystr+" tr:last td:eq(2)").append("<span title='导入类'><img src='"+imaginUrl+"/css/images/newImport.png'></span>");
                    break;
            }
            //   $("."+mystr+" tr:last td:eq(2)").text(itemImport);
            $("."+mystr+" tr:last td:eq(3)").text(Info.itemName);
            //  $("."+mystr+" tr:last td:eq(4)").text(Info.formula);

            //   $("."+mystr+" tr:last td:eq(5)").append(str);


            /*  $(".ResetItem tr:last td:eq(5)").text(paramDescstr);*/
            //   $("."+mystr+" tr:last td:eq(6)").append(otherstr);

            $("."+mystr+" tr:last td:eq(4)").text(Info.workload);
         //   $("."+mystr+" tr:last td:eq(5)").text(Info.teacherName);
            $("."+mystr+" tr:last td:eq(5)").text(statusName);
            var checkAct=" <button class='btn btn-primary viewdetail' id='viewdetail_"+i+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";

            $("."+mystr+" tr:last td:eq(6)").append(checkAct);
            $(document).on("click",".viewdetail",function () {
                var thisId=parseInt(this.id.match(/\d+/g));

                $(".revDetail").empty();
                $(".revDetail").append(rowInfo);

                var paramArray=analyseList[thisId].descAndValues;
                var str='';
                for(var paramCount=0;paramCount<paramArray.length;paramCount++){

                    str+='<p style="width: max-content;"><span>'+paramArray[paramCount].desc+'</span>：<span>'+paramArray[paramCount].value+'</span></p>';


                }
                var otherparamArray = analyseList[thisId].otherJsonParameters;
                var otherstr = '';
                if(otherparamArray&&otherparamArray.length>0){
                    for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {

                        otherstr +='<p style="width: max-content;"><span  class="otherstr_'+analyseList[thisId].itemId+'">'+ otherparamArray[otherparamCount].key + '</span>'+'：'+'<span class="otherParaval otherParaval_'+analyseList[thisId].itemId+'" id="otherParaval_'+analyseList[thisId].itemId+'">'+ otherparamArray[otherparamCount].value+'</span></p>';


                    }
                }
                var paramDesc = analyseList[thisId].paramDesc;
                var paramDescstr = '';
                if(paramDesc&&paramDesc.length>0){
                    for (var paramDescCount = 0; paramDescCount < paramDesc.length; paramDescCount++) {
                        paramDescstr +='<p>'+ paramDesc[paramDescCount].symbol +'<p>'+ ':' +'<p>'+ paramDesc[paramDescCount].desc+'<p><hr/>';
                    }
                }
                for(var t=0;t<3;t++)//单元格
                {
                    $(".revDetail tr:last").append(cellInfo);
                }
                $(".revDetail tr:last td:eq(0)").text(analyseList[thisId].formula);

                $(".revDetail tr:last td:eq(1)").append(str);
                /*  $(".ResetItem tr:last td:eq(5)").text(paramDescstr);*/
                $(".revDetail tr:last td:eq(2)").append(otherstr);
            })
        }

    }

}
