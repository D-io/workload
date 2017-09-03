/*$(document).on("click","#clickToggle1",function () {
    $(".ck1").toggle("slow");

});*/
/*$(document).on("click","#clickToggle2",function () {
    $(".ck2").toggle("slow");

});
$(document).on("click","#clickToggle3",function () {
    $(".ck3").toggle("slow");

});*/
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

   /* $(".close-link").on("click", function () {
        $(".x_panel").hide();
    });*/
    $(".sorting1").on("click", function () {
        $(".sorting1").toggleClass("sorting_asc");

    });
    $(".sorting2").on("click", function () {
        $(".sorting2").toggleClass("sorting_asc");

    });

    $(".sorting_asc").on("click", function () {
        $(".sorting_asc").toggleClass("sorting_desc");
    });
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
                                $("<li class='itemList'></li>").append("【"+item[menu].name+"】"+"<table class='table table-striped table-bordered dataTable no-footer' style='float: right;width: 545px '> <thead> <tr role='row'> <th class='sorting' style='font-weight: normal'>复核截止时间:<span>"+item[menu].applyDeadline+"</span></th><th class='sorting' style='font-weight: normal'>导入截止时间:<span>"+item[menu].reviewDeadline+"</span></th><th class='sorting' style='font-weight: normal;background-color:#1ABB9C'><a style='float:right;color:#fff;'>"+cateShort+"</a></th></tr></thread></table><div style='clear:both;'></div>"+item[menu].desc).appendTo(parent);
                                  break;
                            case 0:cateShort='申报审核类';
                                $("<li class='itemList'></li>").append("【"+item[menu].name+"】"+"<table class='table table-striped table-bordered dataTable no-footer' style='float: right;width: 545px '> <thead> <tr role='row'> <th class='sorting' style='font-weight: normal'>申请截止时间:<span>"+item[menu].applyDeadline+"</span></th><th class='sorting' style='font-weight: normal'>审核截止时间:<span>"+item[menu].reviewDeadline+"</span></th><th class='sorting' style='font-weight: normal;background-color:#3498DB'><a style='float:right;color: #fff;'>"+cateShort+"</a></th></tr></thread></table><div style='clear:both;'></div>"+item[menu].desc).appendTo(parent);
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
    $.ajaxSetup({
        async : false
    });
    var resetStr='regionName=manager/Manager-right-col';
    $.get(pageManageUrl+"?"+resetStr,{test:12},function (data) {
        $('.right_hole').empty();
        $('.right_hole').append(data);

    });
    var teacherInfo='';
    $.get(TeacherInfoUrl,{test : 12},function (data) {
        teacherInfo=data.data.teacherList;
        var selectdata=new Array();
        for(var i=0;i<teacherInfo.length;i++){
            $('#teacherName').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');
            /* $('#firstteacherName').append('<option value=\"'+teacherInfo[i].teacherId+'\">'+teacherInfo[i].name+'</option>');

             */       }
    });
    $("#teacherName").select2({
        placeholder:"",
        allowClear: true,
        width:"100%"
    });
  ztree();
}
function reset() {
    $.ajaxSetup({
        async : false
 });
 /*
     function format( info ) {

        var paramArray=info.descAndValues;
        var str='';
        for(var paramCount=0;paramCount<paramArray.length;paramCount++){
            if(paramCount!=paramArray.length-1){
                str+='<p style="width: max-content;">'+paramArray[paramCount].desc+':'+paramArray[paramCount].value+'</p><hr/>';

            }
            else
                str+='<p style="width: max-content;">'+paramArray[paramCount].desc+':'+paramArray[paramCount].value+'</p>';
        }
        var otherparamArray = info.otherJsonParameters;
        var otherstr = '';
        if(otherparamArray&&otherparamArray.length>0){
            for (var otherparamCount = 0; otherparamCount < otherparamArray.length; otherparamCount++) {
                if(otherparamCount!=otherparamArray.length-1){
                    otherstr +='<p style="width: max-content;"><span  class="otherstr_'+info+'">'+ otherparamArray[otherparamCount].key + '</span>:<span class="otherParaval otherParaval_'+info+'" id="otherParaval_'+info+'">'+ otherparamArray[otherparamCount].value+'</span></p><hr/>';

                }
                else
                    otherstr +='<p style="width: max-content;"><span  class="otherstr_'+info+'">'+ otherparamArray[otherparamCount].key + '</span>:<span class="otherParaval otherParaval_'+info+'" id="otherParaval_'+info+'">'+ otherparamArray[otherparamCount].value+'</span></p>';

            }
        }
        var paramDesc = info.paramDesc;
        var paramDescstr = '';
        if(paramDesc&&paramDesc.length>0){
            for (var paramDescCount = 0; paramDescCount < paramDesc.length; paramDescCount++) {
                paramDescstr +='<p>'+ paramDesc[paramDescCount].symbol +'<p>'+ ':' +'<p>'+ paramDesc[paramDescCount].desc+'<p><hr/>';
            }
        }
        return [
            '<table class="table mb-none">',
            '<tr class="b-top-none">',
            '<td><label class="mb-none">公式参数:</label></td>',
            '<td>' + info.formula+ '</td>',
            '</tr>',
            '<tr>',
            '<td><label class="mb-none">参数描述:</label></td>',
            '<td>'+str+'</td>',
            '</tr>',
            '<tr>',
            '<td><label class="mb-none">附加属性</label></td>',
            '<td>'+otherstr+'</td>',
            '</tr>',
            '</div>'
        ].join('');};

    $(document).ready(function() {
        var table = $('#datatable-details').DataTable( {
            "ajax": pageManageUrl,
            "columns": [
                {
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ''
                },
                { "data": "序号" },
                { "data": "规则名称" },
                { "data": "类别" },
                { "data": "项目名称" },
                { "data": "工作当量" },
                { "data": "教师姓名" },
                { "data": "项目状态" },
                { "data": "操作" }
            ],
            "order": [[1, 'asc']]
        } );

        // Add event listener for opening and closing details
        $('#datatable-details tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( format(row.data()) ).show();
                tr.addClass('shown');
            }
        } );
    } );*/

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
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="11" tabindex="0">下一页</a></li>'
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
        $('#teacherName').append('<option value=\"'+teachersInfo[i].teacherId+'\">'+teachersInfo[i].teacherId+teachersInfo[i].name+'</option>');
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
      /*  if(option0==6){
            option0=1
        }
        if(option0==7){
            option0=2;
        }*/
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
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="11" tabindex="0">下一页</a></li>'
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
                    str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="11" tabindex="0">下一页</a></li>'
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
                    str+='<li class="paginate_button"> <a class="activePage" aria-controls="datatable-checkbox" data-dt-idx="'+pagestore+'" tabindex="0">'+pagestore+'</a> </li>';
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
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="11" tabindex="0">下一页</a></li>'
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
              //  alert("确定保存修改？");
                $.post(itemeditNameUrl,{
                    itemId:thisId,
                    itemName:$("#itemName_"+thisId).text()
                },function () {
                   /* alert("修改成功!");*/
                });
            });
        }
    });
    $(document).on("click",".otherParaval",function () {
        var thisId=parseInt(this.id.match(/\d+/g));

        if(!$(this).is('.input')){
            $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
                $(this).parent().removeClass('input').html($(this).val() || 0);
                var $otherstr=$(".otherstr_"+thisId);
                var strArr=new Array();
                for(var t=0;t<$otherstr.length;t++){
                    strArr.push({key:$otherstr.eq(t).text(),value:$(".otherParaval_"+thisId).eq(t).text()});
                }
                strArr=JSON.stringify(strArr);
             //   alert("确定保存修改？");
                $.post(itemeditNameUrl,{
                    itemId:thisId,
                    otherParams:strArr
                },function () {
                  /*  alert("修改成功!");*/
                });
            });
        }
    });
    $(document).on("click","#next",function(){
        var pageNum=parseInt($(this).attr("data-dt-idx"))+1;
        pageNum++;
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
                str+='<li class="paginate_button next" id="datatable-checkbox_next"><a id="next" aria-controls="datatable-checkbox" data-dt-idx="11" tabindex="0">下一页</a></li>'
                $(".pagination").empty();
                $(".pagination").append(str);
            }
        });
        this.attr("data-dt-idx",pageNum);

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
                   $(".sumItemPreview tr:last td:eq(0)").append('<span class="refresh" id="refresh_'+id+'"><i class="fa fa-refresh"></i></span>')
                    $(".sumItemPreview tr:last td:eq(1)").text(Info.teacherId);

                    $(".sumItemPreview tr:last td:eq(1)").attr("id", "teacherId_" + id);
                    $(".sumItemPreview tr:last td:eq(2)").text(Info.teacherName);
                    $(".sumItemPreview tr:last td:eq(3)").text(Info.professionalTitle);
                    /* $(".sumItemPreview tr:last td:eq(4)").text(Info.checkedWorkload);*/
                    if (Info.checkedItems < 10) {
                        $(".sumItemPreview tr:last td:eq(4)").append("<span class='checkedCount_"+id+"'>" + Info.checkedWorkload + "</span><span style='cursor:pointer;float: right' class='checkedwork' id='checkedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共00" + Info.checkedItems + "项</span>")

                    }
                    else if (Info.checkedItems < 100) {
                        $(".sumItemPreview tr:last td:eq(4)").append("<span class='checkedCount_"+id+"'>" + Info.checkedWorkload + "</span><span style='cursor:pointer;float: right' class='checkedwork' id='checkedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共0" + Info.checkedItems + "项</span>")

                    }
                    else {
                        $(".sumItemPreview tr:last td:eq(4)").append("<span class='checkedCount_"+id+"'>" + Info.checkedWorkload + "</span><span style='cursor:pointer;float: right' class='checkedwork' id='checkedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共" + Info.checkedItems + "项</span>")

                    }
                    $(".sumItemPreview tr:last td:eq(4)").css("text-align", "center");

                    /*$(".sumItemPreview tr:last td:eq(4)").attr("class","checkedwork");
                     $(".sumItemPreview tr:last td:eq(4)").attr("id","checkedwork_"+id);*/
                    /*$(".sumItemPreview tr:last td:eq(4)").attr("data-toggle","modal");
                     $(".sumItemPreview tr:last td:eq(4)").attr("data-target","#applyModal");*/
                    if (Info.uncheckedItems < 10) {
                        $(".sumItemPreview tr:last td:eq(5)").append("<span class='uncheckedCount_"+id+"'>" + Info.uncheckedWorkload + "</span><span style='cursor:pointer;float: right' class='uncheckedWork' id='uncheckedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共00" + Info.uncheckedItems + "项</span>");

                    }
                    else if (Info.uncheckedItems < 100) {
                        $(".sumItemPreview tr:last td:eq(5)").append("<span class='uncheckedCount_"+id+"'>" + Info.uncheckedWorkload + "</span><span style='cursor:pointer;float: right' class='uncheckedWork' id='uncheckedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共0" + Info.uncheckedItems + "项</span>")

                    }
                    else {
                        $(".sumItemPreview tr:last td:eq(5)").append("<span class='uncheckedCount_"+id+"'>" + Info.uncheckedWorkload + "</span><span style='cursor:pointer;float: right' class='uncheckedWork' id='uncheckedwork_" + id + "' data-toggle='modal' data-target='#applyModal'>共" + Info.uncheckedItems + "项</span>")

                    }
                    /*   $(".sumItemPreview tr:last td:eq(5)").attr("class","uncheckedWork");
                     $(".sumItemPreview tr:last td:eq(5)").attr("id","uncheckedwork_"+id);
                     $(".sumItemPreview tr:last td:eq(5)").attr("data-toggle","modal");
                     $(".sumItemPreview tr:last td:eq(5)").attr("data-target","#applyModal");*/
                    $(".sumItemPreview tr:last td:eq(5)").css("text-align", "center");
                    $(".sumItemPreview tr:last td:eq(6)").append("<span class='totalCount_"+id+"'>" + Info.totalWorkload + "</span>");
                    $(".sumItemPreview tr:last td:eq(6)").css("text-align", "center");
                    /* var act="<a class=\"btn btn-primary btn-xs previewAll\" id=\"previewAll_"+ id+"\" data-toggle='modal' data-target='#applyModal'>查看详情</a>";
                     $(".sumItemPreview tr:last td:eq(5)").append(act);*/
                }
                $(".activesort").dataTable({
                    "iDisplayLength": 20,
                    "aLengthMenu": [[2, 4, 6, -1], [20, 40, 60, "全部"]],
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
                    }

                })

            }
            ;

        });
    })
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
    /*$(document).on("click",".previewAll",function () {
       var idCount=parseInt(this.id.match(/\d+/g));
       var teacherid=$("#teacherId_"+idCount).text();
       $.get(itemCollection,{
            teacherId:teacherid,
            option:"checked"
        },function (data) {
            appendAllItem(data,"sumItemSort");
        });
        $.get(itemCollection,{
            teacherId:teacherid,
            option:"unchecked"
        },function (data) {
            appendAllItem(data,"sumuncheckedItemSort");
        })
    });*/
    $(".paginate_button ").css("cursor","pointer");

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
            $(".totalCount_"+countId).text(msg.data.teacherWorkloadList.totalWorkload);
            if(msg.data.teacherWorkloadList.checkedItems<10){
                $("#checkedwork_"+countId).text("共00"+msg.data.teacherWorkloadList[0].checkedItems+"项");
            }
            else if(msg.data.teacherWorkloadList.checkedItems<100){
                $("#checkedwork_"+countId).text("共0"+msg.data.teacherWorkloadList[0].checkedItems+"项");
            }
            else{
                $("#checkedwork_"+countId).text("共"+msg.data.teacherWorkloadList[0].checkedItems+"项");
            }
            if(msg.data.teacherWorkloadList.uncheckedItems<10){
                $("#uncheckedwork_"+countId).text("共00"+msg.data.teacherWorkloadList[0].uncheckedItems+"项");
            }
            else if(msg.data.teacherWorkloadList.uncheckedItems<100){
                $("#uncheckedwork_"+countId).text("共0"+msg.data.teacherWorkloadList[0].uncheckedItems+"项");
            }
            else {
                $("#uncheckedwork_"+countId).text("共"+msg.data.teacherWorkloadList[0].uncheckedItems+"项");
            }
        });

    });
    $(document).off("click",".checkedwork");
    $(document).on("click",".checkedwork",function () {
        var idCount=parseInt(this.id.match(/\d+/g));
        var teacherid=$("#teacherId_"+idCount).text();
        $.get(itemCollection,{
            teacherId:teacherid,
            option:"checked"
        },function (data) {
            var impjsonObject=[];
            var chejsonObject=[];
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
            appendAllItem(data.data.importItemList,"sumItemSort");
            appendAllItem(data.data.applyItemList,"sumuncheckedItemSort");
           /* if(data.data.itemDtoList){
                for(var key in data.data.itemDtoList){
                    if(data.data.itemDtoList[key].importRequired==1){
                        impjsonObject.push(data.data.itemDtoList[key]);
                    }
                }
                $(".import_Item_Count").text(impjsonObject.length);
                JSON.stringify(impjsonObject);

                appendAllItem(impjsonObject,"sumItemSort");
                for(var anotherkey in data.data.itemDtoList){
                    if(data.data.itemDtoList[anotherkey].importRequired==0){
                        chejsonObject.push(data.data.itemDtoList[anotherkey]);
                    }
                }
                $(".checked_Item_Count").text(impjsonObject.length);
                JSON.stringify(chejsonObject);

                appendAllItem(chejsonObject,"sumuncheckedItemSort");
            }*/

        });
       /* $.get(itemCollection,{
            teacherId:teacherid,
            option:"unchecked"
        },function (data) {
            appendAllItem(data,"sumuncheckedItemSort");
        })*/
    });
    $(document).off("click",".uncheckedWork");
    $(document).on("click",".uncheckedWork",function () {
        var idCount=parseInt(this.id.match(/\d+/g));
        var teacherid=$("#teacherId_"+idCount).text();

        $.get(itemCollection,{
            teacherId:teacherid,
            option:"unchecked"
        },function (data) {
            var impjsonObject=[];
            var chejsonObject=[];
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
            appendAllItem(data.data.importItemList,"sumItemSort");
            appendAllItem(data.data.applyItemList,"sumuncheckedItemSort");

           /* if(data.data.itemDtoList){
                for(var key in data.data.itemDtoList){
                    if(data.data.itemDtoList[key].importRequired==1){
                        impjsonObject.push(data.data.itemDtoList[key]);
                    }
                }
                $(".import_Item_Count").text(impjsonObject.length);
                JSON.stringify(impjsonObject);

                appendAllItem(impjsonObject,"sumItemSort");
                for(var anotherkey in data.data.itemDtoList){
                    if(data.data.itemDtoList[anotherkey].importRequired==0){
                        chejsonObject.push(chejsonObject.length);
                    }
                }
                $(".checked_Item_Count").text(data.data.applyCount);
                JSON.stringify(chejsonObject);

                appendAllItem(chejsonObject,"sumuncheckedItemSort");
            }*/
        });
        });

}
function appendAllItem(data,mystr) {
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
            for(var j=0;j<8;j++)//单元格
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
            $("."+mystr+" tr:last td:eq(5)").text(Info.teacherName);
            $("."+mystr+" tr:last td:eq(6)").text(statusName);
            var checkAct=" <button class='btn btn-primary viewdetail' id='viewdetail_"+i+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";

            $("."+mystr+" tr:last td:eq(7)").append(checkAct);
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
function reviewerResetItem(data) {
        var rowInfo="<tr></tr>";
        var cellInfo="<td></td>";
    /*if($(".resetNum").length>0){
        $(".ResetItem tr:last td:eq(0)").text();
    }*/
        if(data.data.itemList&&data.data.itemList.length>0){
            var analyseList= data.data.itemList;
            var listLength= data.data.itemList.length;
            for(var i=0;i<listLength;i++)
            {
                var Info=analyseList[i];
                $(".ResetItem").append(rowInfo);
                $(".ResetItem tr:last").attr("class","resetNum");
                for(var j=0;j<8;j++)//单元格
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
                $(".ResetItem tr:last td:eq(4)").text(Info.workload);
                $(".ResetItem tr:last td:eq(5)").text(Info.teacherName);

                var checkAct="<button type='button' class=\"btn btn-info reset_applicant\" id=\"applyReset_"+ Info.itemId+"\" '> 退回申请</button><button type='button' class=\"btn btn-success reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\" style=''>退回审核</button> <button class='btn btn-primary viewdetail' id='viewdetail_"+i+"' data-toggle='modal' data-target='#showdetail'>查看详情</button> ";
                var importAct="<button type='button' class=\"btn btn-default reset_reviewer\" id=\"reviReset_"+ Info.itemId+"\" style='background-color:rgba(231,76,60,.88);color: #fff'>退回导入</button> <button class=\"btn btn-default reset_applicant\" id=\"applyReset_"+ Info.itemId+"\" style='background-color:rgba(243,156,18,.88);color: #fff' '>退回复核</button><button class='btn btn-primary viewdetail' id='viewdetail_"+i+"'  data-toggle='modal' data-target='#showdetail'>查看详情</button>";
               /*background-color:rgb(155, 89, 182);color: #fff*/
                if(Info.importRequired==0){
                    $(".ResetItem tr:last td:eq(7)").append(checkAct);
                }
                else
                    $(".ResetItem tr:last td:eq(7)").append(importAct);
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
                $(".ResetItem tr:last td:eq(6)").text(statusName);
               /* if(statusName==0){
                    $("#reviReset_"+Info.itemId).attr("disabled","disabled");
                }*/

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
function manageHistory() {
    $.get(manageHistoryUrl,function (data) {
        showhistory(data);
    });
}
function resetHistory() {
    $.get(resetHistoryUrl,function (data) {
        showhistory(data);
    });
}
$(document).ready(function () {
    var Count=0;
   // var newCount=0;
    $(document).on("click","#addParameter",function () {
        Count++;
    var addStr="<tr class='trCount_"+Count+"'><td><input type='text' class='form-control parameterName' name='para'  onblur='reminder(this)'></td><td style='position:relative'><input type='text' class='form-control para' name='parameterSymbol' onblur='reminder(this)'><button type='button' class='btn btn-danger removeParaRow' id='removeParaRow_"+Count+"' style='position: absolute;top:10px;right: -24px;'><i class='fa fa-trash'></i></button></td></tr>";
    $('.AddPramter').append(addStr);
});
  /*  $(document).on("click","#firstaddParameter",function () {
        newCount++;
        var addStr="<tr class='firsttrCount_"+newCount+"'><td><input type='text' class='form-control firstparameterName' name='firstparameterName'></td><td><input type='text' class='form-control firstparameterSymbol' name='parameterSymbol'><a class='btn btn-danger firstremoveParaRow' id='firstremoveParaRow_"+newCount+"' style='float: right;'><i class='fa fa-trash'></i></a></td></tr>";
        $('.firstAddPramter').append(addStr);
    });*/
$(document).on("click","#addOtherParameter",function () {
    Count++;
    var addStr="<tr class='otherCount_"+Count+"'><td style='position:relative'><input type='text' class='form-control otherParameterName' name='parameterName' ><button type='button' class='btn btn-danger removeOtherRow' id='removeOtherRow_"+Count+"' style='position: absolute;top:10px;right: -24px;'><i class='fa fa-trash'></i></button></td></tr>";
    $('.addOtherPramter').append(addStr);
});
/*    $(document).on("click","#firstaddOtherParameter",function () {
        newCount++;
        var addStr="<tr class='firstotherCount_"+newCount+"'><td><input type='text' class='form-control firstotherParameterName' name='parameterName'><a class='btn btn-danger firstremoveOtherRow' id='firstremoveOtherRow_"+newCount+"' style='float:right;'><i class='fa fa-trash'></i></a></td></tr>";
        $('.firstaddOtherPramter').append(addStr);
    });*/

$(document).on("click",".removeParaRow",function () {
    var trId=this.id.match(/\d+/g);
    $(".trCount_"+trId).remove();
});
    $(document).on("click",".removeOtherRow",function () {
        var trId=this.id.match(/\d+/g);
        $(".otherCount_"+trId).remove();
    });
/*    $(document).on("click",".firstremoveParaRow",function () {
        var trId=this.id.match(/\d+/g);
        $(".firsttrCount_"+trId).remove();
    });
    $(document).on("click",".firstremoveOtherRow",function () {
        var trId=this.id.match(/\d+/g);
        $(".firstotherCount_"+trId).remove();
    });*/

    $(document).on("click",".editOtherRow",function () {
        var trId=this.id.match(/\d+/g);
        $(".editOtherCount_"+trId).remove();
    });
    $(document).on("click",".editParaRow",function () {
        var trId=this.id.match(/\d+/g);
        $(".editParaCount_"+trId).remove();
    });
    $(".showcalendar").hover(function () {
      $(".calendar-bar").css("display","block");
    },function () {
        $(".calendar-bar").css("display","none");
    })


});