/**
 * Created by SBWang on 2017/7/24.
 */
function reviewerSumItem() {
    $('.right_hole').empty();
    var sumtocount=0;
    var newArray=new Array();
    $.get(pageManageUrl+"?"+'regionName=applicant/selfSummary',function (result) {
        $('.right_hole').append(result);
        $.get(itemCollection,{"option":"checked"},function (data) {
            if(data.data.teacherWorkload){
                $(".totalWorkload").text(data.data.teacherWorkload.totalWorkload);
                $(".checkedWorkload").text(data.data.teacherWorkload.checkedWorkload);
                $(".uncheckedWorkload").text(data.data.teacherWorkload.uncheckedWorkload);
            }
            $("#check_passed").text(data.data.applyCount);
            $("#rev_passed").text(data.data.importCount);
            if(data.data.importItemList!=null){
                appendReviewerItem(data.data.importItemList,"sumrevieItem",sumtocount);
                for(var t=0;t<data.data.importItemList.length;t++){
                    sumtocount++;
                    newArray.push(data.data.importItemList[t]);
                }
            }
            if(data.data.applyItemList!=null){
                appendReviewerItem(data.data.applyItemList,"sumCheckedItem",sumtocount);
                for(var z=0;z<data.data.applyItemList.length;z++){
                    sumtocount++;
                    newArray.push(data.data.applyItemList[z]);
                }
            }

        });
    });
        $.get(itemCollection,{"option":"unchecked"},function (data) {
            if(data.data.teacherWorkload){
                $(".totalWorkload").text(data.data.teacherWorkload.totalWorkload);
                $(".checkedWorkload").text(data.data.teacherWorkload.checkedWorkload);
                $(".uncheckedWorkload").text(data.data.teacherWorkload.uncheckedWorkload);

            }
            $("#check_no_passed").text(data.data.applyCount);
            $("#rev_no_passed").text(data.data.importCount);
            if(data.data.importItemList!=null){
                appendReviewerItem(data.data.importItemList,"sumnoItemSort",sumtocount);
                for(var m=0;m<data.data.importItemList.length;m++){
                    sumtocount++;
                    newArray.push(data.data.importItemList[m]);
                }
            }
            if(data.data.applyItemList!=null){
                appendReviewerItem(data.data.applyItemList,"sumnorevieItem",sumtocount);
                for(var n=0;n<data.data.applyItemList.length;n++){
                    sumtocount++;
                    newArray.push(data.data.applyItemList[n]);
                }
            }

        });
        $.get(itemCollection+"?teacherId="+userId,function (data) {
            if(data.data.itemDtoList!=null){
                appendReviewerItem(data.data.itemDtoList,"sumall",sumtocount);
                for(var k=0;k<data.data.itemDtoList.length;k++){
                    sumtocount++;
                    newArray.push(data.data.itemDtoList[k]);
                }
            }
        });
    var unarry='';
    $.get(teacherAnalyzeUrl+"?teacherId="+userId,function (msg) {
        unarry=msg.data.workload;
    });
    if ($('#echart_pie').length ){
        var echartPie = echarts.init(document.getElementById('echart_pie'));
        echartPie.setOption({
            tooltip: {
                trigger: 'item',
                position:['50%','48%'],
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'left',
                y: 'top',
                /*data: ['本科和研究生(含留学生、非全日制研究生)培养方案规定课程的工作当量', '培养方案规定的实践教学工作当量', '年度人才培养服务工作当量', '教研教改等教学当量', '其他工作当量']
                 */   data: ['本科和研究生', '培养方案实践教学', '年度人才培养服务', '教研教改', '其他工作当量']

            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true,
                        title: "刷新"
                    },
                    saveAsImage: {
                        show: true,
                        title: "下载"
                    }
                }
            },
            calculable: true,
            series: [{
                name: '访问来源',
                type: 'pie',
                /*radius: '60%',*/
                radius: [55, 70],
                data: [{
                    value: unarry.typeOne.checkedWorkload,
                    name: '本科和研究生(含留学生、非全日制研究生)-培养方案规定课程的工作当量-（预计总量:'+unarry.typeOne.totalWorkload+'已通过:'+unarry.typeOne.checkedWorkload+'仍待核:'+unarry.typeOne.uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#b6a2de'}
                    }
                }, {
                    value: unarry.typeTwo.checkedWorkload,
                    name: '培养方案规定课程的实践教学工作当量-（预计总量：'+unarry.typeTwo.totalWorkload+'已通过:'+unarry.typeTwo.checkedWorkload+'仍待核:'+unarry.typeTwo.uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#5ab1ef'},
                    }
                }, {
                    value: unarry.typeSeven.checkedWorkload,
                    name: '其他-（预计总量：'+unarry.typeSeven.totalWorkload+'已通过:'+unarry.typeSeven.checkedWorkload+'仍待核:'+unarry.typeSeven.uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#CCFF99'}
                    }
                },
                    {
                        value: unarry.typeFour.checkedWorkload,
                        name: '其他教学工作当量-（预计总量：'+unarry.typeFour.totalWorkload+'已通过:'+unarry.typeFour.checkedWorkload+'仍待核:'+unarry.typeFour.uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#d87a80'}
                        }
                    },{
                        value: unarry.typeSix.checkedWorkload,
                        name: '年度人才培养服务工作当量-（预计总量：'+unarry.typeSix.totalWorkload+'已通过:'+unarry.typeSix.checkedWorkload+'仍待核:'+unarry.typeSix.uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#2ec7c9'}
                        }
                    }, {
                        value: unarry.typeFive.checkedWorkload,
                        name: '教研教改等教学当量-（预计总量：'+unarry.typeFive.totalWorkload+'已通过:'+unarry.typeFive.checkedWorkload+'仍待核:'+unarry.typeFive.uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#ffb980'}
                        }
                    },{
                        value: unarry.typeThree.checkedWorkload,
                        name: '学生工程科研能力培养辅助教学工作当量-（预计总量：'+unarry.typeThree.totalWorkload+'已通过:'+unarry.typeThree.checkedWorkload+'仍待核:'+unarry.typeThree.uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#ffab00'}
                        }
                    }],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (val) {   //让series 中的文字进行换行
                                return val.name.split("-").join("\n");
                            },
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: '14',
                                color:"rgb(115, 135, 156)"
                                /* color:'rgb(0, 0, 0)',
                                 letterspacing:'2px'*/
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'normal'
                                }
                            }
                        }

                    }
                }}]


        });
        /* echartPie.on('click', function (param) {
         // var index = param.dataIndex;
         // alert(index);
         console.log(param);
         });*/
        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: true
                },
                labelLine: {
                    show: true
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
    }
    $(document).on("click",".viewmydetail",function () {
        var thisId=parseInt(this.id.match(/\d+/g));
        var applyStyle='';
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
        if(newArray[thisId].isGroup==1){
            applyStyle="小组形式";
        }
        else {
            applyStyle="个人形式";
        }
        var applystatus='';
        if(newArray[thisId].importRequired==0){
            switch(newArray[thisId].status){
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
            switch(newArray[thisId].status){
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

        $(".name").text(newArray[thisId].itemName);
        $(".message").empty();
        $(".message").append("工作当量："+newArray[thisId].workload+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;形式："+applyStyle+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+applystatus);

        $(".revDetail").empty();
        $(".revDetail").append(rowInfo);

        var paramArray=newArray[thisId].descAndValues;
        var str='';
        for(var paramCount=0;paramCount<paramArray.length;paramCount++){

            str+='<p><span>'+paramArray[paramCount].desc+'</span>：<span>'+paramArray[paramCount].value+'</span></p>';


        }
        var otherparamArray = newArray[thisId].otherJsonParameters;
        var otherstr = '';
        if(otherparamArray&&otherparamArray.length>0){
            for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {

                otherstr +='<p><span  class="otherstr_'+newArray[thisId].itemId+'">'+ otherparamArray[otherparamCount].key + '</span>'+'：'+'<span class="otherParaval otherParaval_'+newArray[thisId].itemId+'" id="otherParaval_'+newArray[thisId].itemId+'">'+ otherparamArray[otherparamCount].value+'</span></p>';


            }
        }
        var paramDesc = newArray[thisId].paramDesc;
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
        $(".revDetail tr:last").css("text-align","center");
        $(".revDetail tr:last td:eq(0)").text(newArray[thisId].formula);

        $(".revDetail tr:last td:eq(1)").append(str);
        /*  $(".ResetItem tr:last td:eq(5)").text(paramDescstr);*/
        $(".revDetail tr:last td:eq(2)").append(otherstr);
    });
    $(document).on("click","#all",function () {
        $(".sort").hide();
        $(".all").show();
    });
    $(document).on("click","#sort",function () {
        $(".all").hide();
        $(".sort").show();
    });
}
function appendReviewerItem(data,mystr,count) {
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

            $("."+mystr+" tr:last td:eq(4)").text(Info.workload);
         //   $("."+mystr+" tr:last td:eq(5)").text(Info.teacherName);
            $("."+mystr+" tr:last td:eq(5)").text(statusName);
            var checkAct=" <button class='btn btn-primary viewmydetail' id='viewdetail_"+count+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";
            count++;
            $("."+mystr+" tr:last td:eq(6)").append(checkAct).css("width","200px");

        }

    }

}
