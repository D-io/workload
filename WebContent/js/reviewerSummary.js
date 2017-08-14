/**
 * Created by SBWang on 2017/7/24.
 */
function reviewerSumItem() {
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=applicant/selfSummary',function (result) {
        $('.right_hole').append(result);
        $.get(itemCollection,function (data) {
            appendReviewerItem(data);
            $('.totalWorkload').text(data.data.totalWorkload);
        });
    });
}
function appendReviewerItem(data) {
    var rowInfo="<tr></tr>";
    var cellInfo="<td></td>";
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
        $(".sumItemSort tr:last td:eq(1)").text(Info.itemName);
        $(".sumItemSort tr:last td:eq(2)").text(Info.categoryName);
        $(".sumItemSort tr:last td:eq(3)").text(Info.workload);
        var paramArray = Info.parameterValues;
        var str = '';
        for (var paramCount = 0; paramCount < paramArray.length; paramCount++) {

            str += paramArray[paramCount].symbol + ':' + paramArray[paramCount].value;
        }
        $(".sumItemSort tr:last td:eq(4)").append(str);
        var otherparamArray = Info.otherJsonParameters;
        var otherstr = '';
        if(otherparamArray!=null&&otherparamArray.length){
            for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                otherstr += otherparamArray[otherparamCount].key + ':' + otherparamArray[otherparamCount].value;
            }

        }

        $(".sumItemSort tr:last td:eq(5)").append(otherstr);
        var isGroup="";
        switch (Info.isGroup){
            case 1:isGroup="小组形式";
            break;
            case 0:isGroup="个人形式";
            break;
        }
        $(".sumItemSort tr:last td:eq(6)").append(isGroup);
        $(".sumItemSort tr:last td:eq(7)").append(Info.version);


    }

}
