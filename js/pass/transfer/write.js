layui.use(['element', 'form', 'laydate', 'layer', 'table'], function () {
    let element = layui.element,
        form = layui.form,
        laydate = layui.laydate,
        layer = layui.layer,
        table = layui.table;

    let driverId = $.cookie("loginId");
    let goodsBillCode2 = window.location.href.split("=")[1];
    let goodsBillCode = goodsBillCode2.split("&")[0];
    let transferStation = window.location.href.split("=")[2];

//  alert("transferStation"+transferStation);
    
    $.ajax({
        type: 'get',
        url: nginx_url + '/transfer/detail/' + goodsBillCode+'?transferStation='+transferStation,
        dataType: 'json',
        async: false,
        success: function (result) {
            console.log(result);
            $("#transferStation").val(result.city);
            $("#transferCheck").val(driverId);
            $("#transferCompany").val(result.companyName);
            $("#transferAddr").val(result.detailAddress);
            $("#transferStationTel").val(result.linkPhone);
            $("#transferFee").val(1.3);
            $("#afterTransferBill").val(goodsBillCode);

            laydate.render({
                elem: '#checkTime',
                value: new Date()
            });


        }
    });

    form.on('submit(addInfo)', function () {

        $("#transferForm :input").each(function () {
            $(this).removeAttr("disabled");
        });

        $.ajax({
            type: 'post',
            url: nginx_url + '/transfer/addInfo/' + goodsBillCode,
            data: $("#transferForm").serialize(),
            dataType: 'json',
            success: function (result) {
                if (result === 'SUCCESS') {
                    layer.msg('中转信息插入成功', {
                        time: 800,
                        icon: 1
                    }, function () {
                        let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭
                    })
                }
            }
        });

        return false;
    })

});