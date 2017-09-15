/**
 * Created by SBWang on 2017/7/24.
 */
    /*个人工作当量汇总*/
function reviewerSumItem() {
    $.ajaxSetup({
        async: false
    });
    $('.right_hole').empty();

    /*声明一个数组newArray存放所有的条目*/
    var newArray=new Array();
    /*声明一个变量索引数组元素*/
    var sumtocount=0;
    var yearstr=$("#year").val().substring(0,4);
    $.get(pageManageUrl+"?"+'regionName=applicant/selfSummary',{test:12},function (result) {
        $('.right_hole').append(result);
     /*已通过的条目信息*/
        $.get(itemCollection,{"option":"checked"},function (data) {
            if(data.data.teacherWorkload!=null){
                $(".totalWorkload").text(data.data.teacherWorkload.totalWorkload);
                $(".checkedWorkload").text(data.data.teacherWorkload.checkedWorkload);
                $(".uncheckedWorkload").text(data.data.teacherWorkload.uncheckedWorkload);
            }
            else{
                $(".totalWorkload").text("0");
                $(".checkedWorkload").text("0");
                $(".uncheckedWorkload").text("0");
            }
            if(data.data!=null){
                $("#check_passed").text(data.data.applyCount);
                $("#rev_passed").text(data.data.importCount);
            }
            else{
                $("#check_passed").text("0");
                $("#rev_passed").text("0");
            }
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
    /*未通过的条目信息*/
        $.get(itemCollection,{"option":"unchecked"},function (data) {
            if(data.data.teacherWorkload!=null){
                $(".totalWorkload").text(data.data.teacherWorkload.totalWorkload);
                $(".checkedWorkload").text(data.data.teacherWorkload.checkedWorkload);
                $(".uncheckedWorkload").text(data.data.teacherWorkload.uncheckedWorkload);

            }
            else{
                $(".totalWorkload").text("0");
                $(".checkedWorkload").text("0");
                $(".uncheckedWorkload").text("0");
            }
            if(data.data!=null){
                $("#check_no_passed").text(data.data.applyCount);
                $("#rev_no_passed").text(data.data.importCount);
            }
            else{
                $("#check_no_passed").text("0");
                $("#rev_no_passed").text("0");
            }
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
     /* 学期所以工作当量展示*/
        $.get(itemCollection,function (data) {
            if(data.data!=null&&data.data.itemDtoList!=null){
                appendReviewerItem(data.data.itemDtoList,"sumall",sumtocount);
                for(var k=0;k<data.data.itemDtoList.length;k++){
                    sumtocount++;
                    newArray.push(data.data.itemDtoList[k]);
                }
            }
        });
      /*刷新学年数据*/
    /*$.post(refreshInfoUrl+"?teacherId="+userId,function (msg) {

    });*/
     /*学年工作当量展示*/
        $.get(itemCollection+"?year="+yearstr,function (data) {
         if(data.data!=null&&data.data.itemDtoList!=null){
             $(".year_totalWorkload ").text(data.data.teacherWorkload.totalWorkload );
             $(".year_checkedWorkload ").text(data.data.teacherWorkload.checkedWorkload);
             $(".year_uncheckedWorkload  ").text(data.data.teacherWorkload.uncheckedWorkload);
             $(".yearall").show();
         /*appendReviewerItem(data.data.itemDtoList,"year_view",sumtocount);
         for(var p=0;p<data.data.itemDtoList.length;p++){
         sumtocount++;
         newArray.push(data.data.itemDtoList[p]);
         }*/
         }
         else{
             $(".year_totalWorkload ").text("0" );
             $(".year_checkedWorkload ").text("0");
             $(".year_uncheckedWorkload  ").text("0");
         }
         });
      /*本学期饼图展示*/
    var unarry='';
    $.get(teacherAnalyzeUrl+"?teacherId="+userId,function (msg) {
        unarry=msg.data.workload;
    });
    if ($('#echart_pie').length ){
        var echartPie = echarts.init(document.getElementById('echart_pie'));
        echartPie.setOption({

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
                center:["46%","45%"],
                data: [{
                    value: unarry.types[0].checkedWorkload,
                    name: '本科和研究生(含留学生、非全日制研究生)-培养方案规定课程的工作当量-（预计总量: '+unarry.types[0].totalWorkload+' 已通过： '+unarry.types[0].checkedWorkload+' 仍待核： '+unarry.types[0].uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#b6a2de'}
                    }
                }, {
                    value: unarry.types[1].checkedWorkload,
                    name: '培养方案规定课程的实践教学工作当量-（预计总量： '+unarry.types[1].totalWorkload+' 已通过： '+unarry.types[1].checkedWorkload+' 仍待核： '+unarry.types[1].uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#5ab1ef'},
                    }
                }, {
                    value: unarry.types[6].checkedWorkload,
                    name: '其他-（预计总量： '+unarry.types[6].totalWorkload+' 已通过： '+unarry.types[6].checkedWorkload+' 仍待核： '+unarry.types[6].uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#CCFF99'}
                    }
                },
                    {
                        value: unarry.types[2].checkedWorkload,
                        name: '其他教学工作当量-（预计总量： '+unarry.types[2].totalWorkload+' 已通过： '+unarry.types[2].checkedWorkload+' 仍待核： '+unarry.types[2].uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#d87a80'}
                        }
                    },{
                        value: unarry.types[5].checkedWorkload,
                        name: '年度人才培养服务工作当量-（预计总量： '+unarry.types[5].totalWorkload+' 已通过： '+unarry.types[5].checkedWorkload+' 仍待核： '+unarry.types[5].uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#2ec7c9'}
                        }
                    }, {
                        value: unarry.types[4].checkedWorkload,
                        name: '教研教改等教学当量-（预计总量： '+unarry.types[4].totalWorkload+' 已通过： '+unarry.types[4].checkedWorkload+' 仍待核： '+unarry.types[4].uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#ffb980'}
                        }
                    },{
                        value: unarry.types[2].checkedWorkload,
                        name: '学生工程科研能力培养辅助教学工作当量-（预计总量： '+unarry.types[2].totalWorkload+' 已通过： '+unarry.types[2].checkedWorkload+' 仍待核： '+unarry.types[2].uncheckedWorkload+'）',
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
                                fontSize: '13',
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
                }}],
            tooltip: {
                trigger: 'item',
                position:['38%','40%'],
                formatter: function (val) {   //让series 中的文字进行换行
                    return val.name.split("-").join("\n");
                }
            }


        });

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
    /*本学年饼图展示*/
    var allArray='';
     $.get(teacherAnalyzeYearUrl+ "?teacherId="+userId+"&year="+yearstr,function (msg) {
         allArray=msg.data.workload;
     });
    showyearPie(allArray);
    /*获取学年*/
    $.get(commonYearsUrl,function (data) {
        var arry=new Array;
        arry=data.data.info;

        for(var yearLength=0;yearLength<arry.length;yearLength++){
            var yearValue=arry[yearLength].substring(0,4);
            $("#allyear_To_change").append("<option value='"+yearValue+"'>"+yearValue+"</option>")
        }

    });
    /*查看详情*/
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

        $(".name").text("【项目名称】"+newArray[thisId].itemName);
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
    /*全览或分类别查看工作当量的切换*/
    $(document).on("click","#all",function () {
        $(".sort").hide();
        $(".all").show();
    });
    $(document).on("click","#sort",function () {
        $(".all").hide();
        $(".sort").show();
    });
    /*切换学年*/
    $("#allyear_To_change").change(function () {
        var changeArray='';
        $.get(teacherAnalyzeYearUrl+ "?teacherId="+userId+"&year="+$("#allyear_To_change").val(),function (msg) {
            changeArray=msg.data.workload
            showyearPie(changeArray);
        });
        $.get(itemCollection+"?year="+$("#allyear_To_change").val(),function (data) {
            if(data.data!=null&&data.data.itemDtoList!=null){
                $(".year_totalWorkload ").text(data.data.teacherWorkload.totalWorkload );
                $(".year_checkedWorkload ").text(data.data.teacherWorkload.checkedWorkload);
                $(".year_uncheckedWorkload  ").text(data.data.teacherWorkload.uncheckedWorkload);
                $(".yearall").show();

            }
            else{
                $(".year_totalWorkload ").text("0" );
                $(".year_checkedWorkload ").text("0");
                $(".year_uncheckedWorkload  ").text("0");
            }
        });

    })
}
    /*生成表格信息*/
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
            $("."+mystr+" tr:last td:eq(3)").text(Info.itemName);
            $("."+mystr+" tr:last td:eq(4)").text(Info.workload);
            $("."+mystr+" tr:last td:eq(5)").text(statusName);
            var checkAct=" <button class='btn btn-primary viewmydetail' id='viewdetail_"+count+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";
            count++;
            $("."+mystr+" tr:last td:eq(6)").append(checkAct).css("width","200px");
        }
    }
}
    /*生成学年饼图函数*/
function showyearPie(allArray) {
    if ($('#year_echart_pie').length ){
        var yearechartPie = echarts.init(document.getElementById('year_echart_pie'));
        yearechartPie.setOption({

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
                center:["46%","45%"],
                data: [{
                    value: allArray.types[0].checkedWorkload,
                    name: '本科和研究生(含留学生、非全日制研究生)-培养方案规定课程的工作当量-（预计总量: '+allArray.types[0].totalWorkload+' 已通过： '+allArray.types[0].checkedWorkload+' 仍待核： '+allArray.types[0].uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#b6a2de'}
                    }
                }, {
                    value: allArray.types[1].checkedWorkload,
                    name: '培养方案规定课程的实践教学工作当量-（预计总量： '+allArray.types[1].totalWorkload+' 已通过： '+allArray.types[1].checkedWorkload+' 仍待核： '+allArray.types[1].uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#5ab1ef'},
                    }
                }, {
                    value: allArray.types[6].checkedWorkload,
                    name: '其他-（预计总量： '+allArray.types[6].totalWorkload+' 已通过： '+allArray.types[6].checkedWorkload+' 仍待核： '+allArray.types[6].uncheckedWorkload+'）',
                    itemStyle:{
                        normal:{color:'#CCFF99'}
                    }
                },
                    {
                        value: allArray.types[3].checkedWorkload,
                        name: '其他教学工作当量-（预计总量： '+allArray.types[3].totalWorkload+' 已通过： '+allArray.types[3].checkedWorkload+' 仍待核： '+allArray.types[3].uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#d87a80'}
                        }
                    },{
                        value: allArray.types[5].checkedWorkload,
                        name: '年度人才培养服务工作当量-（预计总量： '+allArray.types[5].totalWorkload+' 已通过： '+allArray.types[5].checkedWorkload+' 仍待核： '+allArray.types[5].uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#2ec7c9'}
                        }
                    }, {
                        value: allArray.types[4].checkedWorkload,
                        name: '教研教改等教学当量-（预计总量： '+allArray.types[4].totalWorkload+' 已通过： '+allArray.types[4].checkedWorkload+' 仍待核： '+allArray.types[4].uncheckedWorkload+'）',
                        itemStyle:{
                            normal:{color:'#ffb980'}
                        }
                    },{
                        value: allArray.types[2].checkedWorkload,
                        name: '学生工程科研能力培养辅助教学工作当量-（预计总量： '+allArray.types[2].totalWorkload+' 已通过： '+allArray.types[2].checkedWorkload+' 仍待核： '+allArray.types[2].uncheckedWorkload+'）',
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
                                fontSize: '13',
                                color:"rgb(115, 135, 156)"

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
                }}],
            tooltip: {
                trigger: 'item',
                position:['38%','40%'],
                formatter: function (val) {   //让series 中的文字进行换行
                    return val.name.split("-").join("\n");
                }
            }
        });

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

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            if(activeTab=="学年工作当量"){
                yearechartPie.resize();
            }

        })
    }
}