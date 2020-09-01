$(async function () {
    //回显
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    let customerId = $.getUrlParam('id');
    if (customerId) {
        let res = await axios.get("/customer/info",
            { params: { customerId } }
        )
        $(".username").val(res.data.name)
        $(`input[type="radio"]:eq(${res.data.sex})`).prop("checked", "ture")
        $(".useremail").val(res.data.email)
        $(".userphone").val(res.data.phone)
        $(".userqq").val(res.data.QQ)
        $(".userweixin").val(res.data.weixin)
        $("option").val(res.data.type)
        $("textarea").val(res.data.address)
    }
    $(".submit").click(async function () {
        let key = 0
        let info = {
            name: $(".username").val(),
            sex: $("input[type='radio']:eq(0)").prop("checked") * 1 ? 0 : 1,
            email: $(".useremail").val(),
            phone: $(".userphone").val(),
            QQ: $(".userqq").val(),
            weixin: $(".userweixin").val(),
            type: $("select")[0].value,
            address: $("textarea").val(),
        }
        $.each($("input"), function (i, v) {
            if (!v) {
                key = 1;
            }
        })
        if (key == 1) {
            return alert("必填项不能为空!!!")
        }
        let res = await axios.post("/customer/add", info)
        if(res.code == 0 && customerId){alert("修改成功")}else{alert("修改失败")}
        if(res.code == 0){alert("添加成功")}else{alert("添加失败")}
        window.location.href = "./customerlist.html?id=2"
    })
})