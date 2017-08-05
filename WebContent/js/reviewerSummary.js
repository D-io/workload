/**
 * Created by SBWang on 2017/7/24.
 */
function reviewerSumItem() {
    $('.right_hole').empty();
    $.get("/region?"+'regionName=applicant/selfSummary',function (result) {
        $('.right_hole').append(result);
        $.get("/item/info/collection",function (data) {
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
        for(var j=0;j<5;j++)//单元格
        {
            $(".sumItemSort tr:last").append(cellInfo);
        }
        var id=i;
        $(".sumItemSort tr:last td:eq(0)").text(id+1);
        $(".sumItemSort tr:last td:eq(1)").text(Info.categoryName);
        $(".sumItemSort tr:last td:eq(2)").text(Info.itemName);
        $(".sumItemSort tr:last td:eq(3)").text(Info.workload);

        var act="<a href=\"#\" class=\"pass\"style=\"color: blue; \" type=\"button\">查看详情</a> ";
        $(".sumItemSort tr:last td:eq(4)").append(act);
    }

}
