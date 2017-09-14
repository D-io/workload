function itemSummary() {
    $.ajaxSetup({
        async : false
    });
    $('.right_hole').empty();
    $.get(pageManageUrl+"?"+'regionName=Realmanager/itemSummary', {test : 12},function (result) {
        $('.right_hole').append(result);
        $.get(itemSummaryUrl, {test: 12}, function (data) {
            /* appendAllItem(data);*/
            var rowInfo = "<tr></tr>";
            var cellInfo = "<td></td>";
            /*sumItemPreview*/
            if (data.data.info && data.data.info.length > 0) {
                var analyseList = data.data.info;
                var listLength = data.data.info.length;
                for (var i = 0; i < listLength; i++) {
                    var Info = analyseList[i];
                    $(".sumItemPreview").append(rowInfo);
                    $(".sumItemPreview tr:last").attr("class", "resetNum");
                    $(".sumItemPreview tr:last").attr("style", "text-align:center");
                    for (var j = 0; j < 7; j++)//单元格
                    {
                        $(".sumItemPreview tr:last").append(cellInfo);
                    }
                    var id = i + 1;
                    if (Info.checkedWorkload > 100) {
                        $(".sumItemPreview tr:last").css({"background-color": "#6fcd54", "color": "#fff"});
                    }
                    /*else {
                        $(".sumItemPreview tr:last").css({"background-color": "#ffe746", "color": "rgb(115, 135, 15)"});
                    }*/
                   /* $(".sumItemPreview tr:last td:eq(0)").text(id);*/
                     $(".sumItemPreview tr:last td:eq(0)").append("<span style='cursor:pointer'>"+Info.teacherId+"</span>");
                    $(".sumItemPreview tr:last td:eq(0) span").attr("class", "teacher_Id");
                    $(".sumItemPreview tr:last td:eq(0) span").attr("id", "teacherId_" + id);
                    $(".sumItemPreview tr:last td:eq(0) span").attr("data-toggle", "modal");
                    $(".sumItemPreview tr:last td:eq(0) span").attr("data-target", "#showPieModal");
                    $(".sumItemPreview tr:last td:eq(0)").css("text-align", "center");
                    $(".sumItemPreview tr:last td:eq(1)").append("<span style='cursor:pointer'>"+Info.teacherName+"</span>");
                    $(".sumItemPreview tr:last td:eq(1) span").attr("class","teacher_Id");
                    $(".sumItemPreview tr:last td:eq(1) span").attr("id", "teachersname_" + id);
                    $(".sumItemPreview tr:last td:eq(1) span").attr("data-toggle", "modal");
                    $(".sumItemPreview tr:last td:eq(1) span").attr("data-target", "#showPieModal");
                    $(".sumItemPreview tr:last td:eq(1)").css("text-align", "center");
                    $(".sumItemPreview tr:last td:eq(2)").text(Info.professionalTitle);
                    /* $(".sumItemPreview tr:last td:eq(4)").text(Info.checkedWorkload);*/
                    if (Info.checkedItems < 10) {
                        $(".sumItemPreview tr:last td:eq(3)").append("<span class='checkedCount_"+id+"'>" + Info.checkedWorkload + "</span><span style='cursor:pointer;float: right' class='checkedwork' id='checkedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共00" + Info.checkedItems + "项</span>")

                    }
                    else if (Info.checkedItems < 100) {
                        $(".sumItemPreview tr:last td:eq(3)").append("<span class='checkedCount_"+id+"'>" + Info.checkedWorkload + "</span><span style='cursor:pointer;float: right' class='checkedwork' id='checkedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共0" + Info.checkedItems + "项</span>")

                    }
                    else {
                        $(".sumItemPreview tr:last td:eq(3)").append("<span class='checkedCount_"+id+"'>" + Info.checkedWorkload + "</span><span style='cursor:pointer;float: right' class='checkedwork' id='checkedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共" + Info.checkedItems + "项</span>")

                    }
                    $(".sumItemPreview tr:last td:eq(3)").css("text-align", "center");

                    if (Info.uncheckedItems < 10) {
                        $(".sumItemPreview tr:last td:eq(4)").append("<span class='uncheckedCount_"+id+"'>" + Info.uncheckedWorkload + "</span><span style='cursor:pointer;float: right' class='uncheckedWork' id='uncheckedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共00" + Info.uncheckedItems + "项</span>");

                    }
                    else if (Info.uncheckedItems < 100) {
                        $(".sumItemPreview tr:last td:eq(4)").append("<span class='uncheckedCount_"+id+"'>" + Info.uncheckedWorkload + "</span><span style='cursor:pointer;float: right' class='uncheckedWork' id='uncheckedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共0" + Info.uncheckedItems + "项</span>")

                    }
                    else {
                        $(".sumItemPreview tr:last td:eq(4)").append("<span class='uncheckedCount_"+id+"'>" + Info.uncheckedWorkload + "</span><span style='cursor:pointer;float: right' class='uncheckedWork' id='uncheckedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共" + Info.uncheckedItems + "项</span>")

                    }

                    $(".sumItemPreview tr:last td:eq(4)").css("text-align", "center");
                    $(".sumItemPreview tr:last td:eq(5)").append("<span class='totalCount_"+id+"'>" + Info.totalWorkload + "</span>");
                    $(".sumItemPreview tr:last td:eq(5)").css("text-align", "center");
                    $(".sumItemPreview tr:last td:eq(6)").append('<span class="refresh" id="refresh_'+id+'" style="cursor: pointer"><i class="fa fa-refresh"></i></span>');

                }
                $(".activesort").dataTable({
                    "iDisplayLength": 20,
                    "aLengthMenu": [[20, 40, 60, -1], [20, 40, 60, "全部"]],
                    "oLanguage": { //国际化配置
                        "sProcessing": "正在获取数据，请稍后...",
                        "sLengthMenu": "每页 _MENU_ 条",
                        "sZeroRecords": "没有您要搜索的内容",
                        "sInfo": "共 _TOTAL_ 条数据",
                        /*从 _START_ 到  _END_ 条记录 */
                        "sInfoEmpty": "记录数为0",
                        "sInfoFiltered": "(全部记录数 _MAX_ 条)",
                        "sInfoPostFix": "",
                        "sSearch": "搜索：",
                        "sUrl": "",
                        "oPaginate": {
                            "sFirst": "第一页",
                            "sPrevious": "上一页",
                            "sNext": "下一页",
                            "sLast": "最后一页"
                        }
                    },
                    "columnDefs": [
                        { "orderable": false, "targets": 6 }
                    ]

                });
            };
        });
    })

    // 使用
    $(document).on("click",".Toexcellall",function () {
        var form = $("<form>");
        form.attr("style","display:none");
        // form.attr("target","");
        form.attr("method","get");
        //  var strZipPath='categoryId="'+option1.val()+'"&status="'+option0.val()+'"&ownerId="'+option2.val()+'"&isExport="yes"';

        form.attr("action",itemSummaryUrl);

        var input4 = $("<input>");
        input4.attr("type","hidden");
        input4.attr("name","ifExport");
        input4.attr("value","yes");
        $("body").append(form);

        form.append(input4);
        form.submit();
        form.remove();
    });
    $(document).off("click",".refresh");
    $(document).on("click",".refresh",function () {

        var countId=parseInt(this.id.match(/\d+/g));

        $.post(refreshInfoUrl+"?teacherId="+$("#teacherId_"+countId).text(),function (msg) {
           // parenttr.children('td').eq(3).text(msg.data.teacherWorkloadList[0].professionalTitle);
            $(".checkedCount_"+countId).text(msg.data.teacherWorkloadList[0].checkedWorkload);
            $(".uncheckedCount_"+countId).text(msg.data.teacherWorkloadList[0].uncheckedWorkload);
            $(".totalCount_"+countId).text(msg.data.teacherWorkloadList[0].totalWorkload);
            if(msg.data.teacherWorkloadList[0].checkedItems<10){
                $("#checkedwork_"+countId).text("共00"+msg.data.teacherWorkloadList[0].checkedItems+"项");
            }
            else if(msg.data.teacherWorkloadList[0].checkedItems<100){
                $("#checkedwork_"+countId).text("共0"+msg.data.teacherWorkloadList[0].checkedItems+"项");
            }
            else{
                $("#checkedwork_"+countId).text("共"+msg.data.teacherWorkloadList[0].checkedItems+"项");
            }
            if(msg.data.teacherWorkloadList[0].uncheckedItems<10){
                $("#uncheckedwork_"+countId).text("共00"+msg.data.teacherWorkloadList[0].uncheckedItems+"项");
            }
            else if(msg.data.teacherWorkloadList[0].uncheckedItems<100){
                $("#uncheckedwork_"+countId).text("共0"+msg.data.teacherWorkloadList[0].uncheckedItems+"项");
            }
            else {
                $("#uncheckedwork_"+countId).text("共"+msg.data.teacherWorkloadList[0].uncheckedItems+"项");
            }
        });

    });

    var sumcount=0;
    var checkedArray=new Array();

        $(document).off("click",".checkedwork");
        $(document).on("click",".checkedwork",function () {
            var idCount=parseInt(this.id.match(/\d+/g));
            $(".teach_id").text($("#teacherId_"+idCount).text());
            $(".teach_name").text($("#teachersname_"+idCount).text());
            $(".title_name").text("已通过工作当量");
            var teacherid=$("#teacherId_"+idCount).text();
            var arry='';

            $.get(itemCollection,{
                teacherId:teacherid,
                option:"checked"
            },function (data) {
                var impjsonObject=[];
                var chejsonObject=[];
                sumcount=0;
                checkedArray=[];
                $(".sumItemSort").empty();
                $(".sumuncheckedItemSort").empty();
                if(data.data.importCount){
                    $(".import_Item_Count").text(data.data.importCount);
                }
                else {
                    $(".import_Item_Count").text("0");
                }
                if(data.data.applyCount){
                    $(".checked_Item_Count").text(data.data.applyCount);
                }
                else {
                    $(".checked_Item_Count").text("0");
                }
                if(data.data.importItemList&&data.data.importItemList.length>0){
                    appendAllItem(data.data.importItemList,"sumItemSort",sumcount);
                    for(var t=0;t<data.data.importItemList.length;t++){
                        sumcount++;
                        checkedArray.push(data.data.importItemList[t]);
                    }
                }
                if(data.data.importItemList&&data.data.applyItemList.length>0){
                    appendAllItem(data.data.applyItemList,"sumuncheckedItemSort",sumcount);

                    for(var z=0;z<data.data.applyItemList.length;z++){
                        sumcount++;
                        checkedArray.push(data.data.applyItemList[z]);
                    }
                }

            });

        });
        $(document).off("click",".uncheckedWork");
        $(document).on("click",".uncheckedWork",function () {
            var idCount=parseInt(this.id.match(/\d+/g));
            $(".teach_id").text($("#teacherId_"+idCount).text());
            $(".teach_name").text($("#teachersname_"+idCount).text());
            $(".title_name").text("待核定工作当量");
            var teacherid=$("#teacherId_"+idCount).text();
            var unarry='';
            $.get(itemCollection,{
                teacherId:teacherid,
                option:"unchecked"
            },function (data) {
                var impjsonObject=[];
                var chejsonObject=[];
                sumcount=0;
                checkedArray=[];
                $(".sumItemSort").empty();
                $(".sumuncheckedItemSort").empty();
                if(data.data.importCount){
                    $(".import_Item_Count").text(data.data.importCount);
                }
                else {
                    $(".import_Item_Count").text("0");
                }
                if(data.data.applyCount){
                    $(".checked_Item_Count").text(data.data.applyCount);
                }
                else {
                    $(".checked_Item_Count").text("0");
                }
                if(data.data.importItemList&&data.data.importItemList.length>0){
                    appendAllItem(data.data.importItemList,"sumItemSort",sumcount);
                    for(var m=0;m<data.data.importItemList.length;m++){
                        sumcount++;
                        checkedArray.push(data.data.importItemList[m]);
                    }
                }
                if(data.data.importItemList&&data.data.applyItemList.length>0){
                    appendAllItem(data.data.applyItemList,"sumuncheckedItemSort",sumcount);
                    for(var n=0;n<data.data.applyItemList.length;n++){
                        sumcount++;
                        checkedArray.push(data.data.applyItemList[n]);
                    }
                }

            });

        });
        $(document).on("click",".viewdetail",function () {

        var thisId=parseInt(this.id.match(/\d+/g));
        var applyStyle='';
            var rowInfo="<tr></tr>";
            var cellInfo="<td></td>";
        if(checkedArray[thisId].isGroup==1){
            applyStyle="小组形式";
        }
        else {
            applyStyle="个人形式";
        }
        var applystatus='';
        if(checkedArray[thisId].importRequired==0){
            switch(checkedArray[thisId].status){
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
            switch(checkedArray[thisId].status){
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

        $(".name").text(checkedArray[thisId].itemName);
        $(".message").empty();
        $(".message").append("工作当量："+checkedArray[thisId].workload+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;形式："+applyStyle+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+applystatus);
        $(".revDetail").empty();
        $(".revDetail").append(rowInfo);

        var paramArray=checkedArray[thisId].descAndValues;
        var str='';
        for(var paramCount=0;paramCount<paramArray.length;paramCount++){

            str+='<p style="width: max-content;"><span>'+paramArray[paramCount].desc+'</span>：<span>'+paramArray[paramCount].value+'</span></p>';


        }
        var otherparamArray = checkedArray[thisId].otherJsonParameters;
        var otherstr = '';
        if(otherparamArray&&otherparamArray.length>0){
            for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {

                otherstr +='<p style="width: max-content;"><span  class="otherstr_'+checkedArray[thisId].itemId+'">'+ otherparamArray[otherparamCount].key + '</span>'+'：'+'<span class="otherParaval otherParaval_'+checkedArray[thisId].itemId+'" id="otherParaval_'+checkedArray[thisId].itemId+'">'+ otherparamArray[otherparamCount].value+'</span></p>';


            }
        }
        var paramDesc = checkedArray[thisId].paramDesc;
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
        $(".revDetail tr:last td:eq(0)").text(checkedArray[thisId].formula);

        $(".revDetail tr:last td:eq(1)").append(str);
        /*  $(".ResetItem tr:last td:eq(5)").text(paramDescstr);*/
        $(".revDetail tr:last td:eq(2)").append(otherstr);

    });
        $(document).off("click",".teacher_Id");
        $(document).on("click",".teacher_Id",function () {
            var thisId=parseInt(this.id.match(/\d+/g));
            $(".teachers_name").text($("#teachersname_"+thisId).text());
            $(".teachers_id").text($("#teacherId_"+thisId).text());

            var unarry='';
            $.get(teacherAnalyzeUrl+"?teacherId="+$("#teacherId_"+thisId).text(),function (msg) {
                unarry=msg.data.workload;
            });
            $(".totlaAll").text(unarry.totalWorkload);
            $(".passAll").text(unarry.types[0].checkedWorkload+unarry.types[1].checkedWorkload+unarry.types[2].checkedWorkload+unarry.types[3].checkedWorkload+unarry.types[4].checkedWorkload+unarry.types[5].checkedWorkload+unarry.types[6].checkedWorkload);
            $(".unpassAll").text(unarry.types[0].uncheckedWorkload+unarry.types[1].uncheckedWorkload+unarry.types[2].uncheckedWorkload+unarry.types[3].uncheckedWorkload+unarry.types[4].uncheckedWorkload+unarry.types[5].uncheckedWorkload+unarry.types[6].uncheckedWorkload);

            if ($('#echart_unchecked_pie').length ){
                var echartPie = echarts.init(document.getElementById('echart_unchecked_pie'));
                echartPie.setOption({
                    tooltip: {
                        trigger: 'item',
                        position:['26%','80%'],
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x: 'left',
                        y: 'top',
                        data: ['本科和研究生', '培养方案实践教学', '年度人才培养服务', '教研教改', '其他工作当量']

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
                        center:["45%","50%"],
                        data: [{
                            value: unarry.types[0].checkedWorkload,
                            name: '本科和研究生(含留学生、非全日制研究生)-培养方案规定课程的工作当量-（预计总量： '+unarry.types[0].totalWorkload+' 已通过： '+unarry.types[0].checkedWorkload+' 仍待核： '+unarry.types[0].uncheckedWorkload+'）',
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
                                value: unarry.types[3].checkedWorkload,
                                name: '其他教学工作当量-（预计总量：'+unarry.types[3].totalWorkload+'已通过：'+unarry.types[3].checkedWorkload+'仍待核：'+unarry.types[3].uncheckedWorkload+'）',
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
                                name: '学生工程科研能力培养辅助教学工作当量-（预计总量： '+unarry.types[2].totalWorkload +' 已通过：'+unarry.types[2].checkedWorkload +' 仍待核：'+unarry.types[2].uncheckedWorkload+'）',
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

            $('#showPieModal').on('shown.bs.modal',function(){
                echartPie.resize()
            })

        });

}
function appendAllItem(data,mystr,count) {

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
            var checkAct=" <button class='btn btn-primary viewdetail' id='viewdetail_"+count+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";
            $("."+mystr+" tr:last td:eq(6)").append(checkAct);
            count++;

        }

    }
}
