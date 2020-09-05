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
    let key
    //验证信息
    $(".username").blur(function () {
        let val = $(this).val().trim();
        if (val.length == 0) {
            $(".spanusername").html("此为必填项！！")
            key = 1;
            return
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(val)) {
            $(".spanusername").html("名字必须为2-10位汉字")
            key = 1;
            return;
        }
        key = 0
        $(".spanusername").html("名字可以使用")
    })
    $(".useremail").blur(function () {
        let val = $(this).val().trim();
        if (val.length == 0) {
            $(".spanuseremail").html("此为必填项！！")
            key = 1;
            return
        }
        if (!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(val)) {
            $(".spanuseremail").html("邮箱不合法")
            key = 1;
            return;
        }
        key = 0;
        $(".spanuseremail").html("")
    })
    $(".userphone").blur(function () {
        let val = $(this).val().trim();
        if (val.length == 0) {
            $(".spanuserphone").html("此为必填项！！")
            key = 1;
            return
        }
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
            $(".spanuserphone").html("手机号码不合法")
            key = 1;
            return;
        }
        key = 0;
        $(".spanuserphone").html("")
    });
    //提交
    $(".submit").click(async function () {
        let key1 = 0
        let info = {
            customerId,
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
            if (!v.value) {
                key1 = 1;
            }
        })
        console.log(key)
        console.log(key1)
        if (key1 == 1 || key == 1) {
            return alert("按要求填写完整!!!")
        }
        if (customerId) {
            let res = await axios.post("/customer/update", info)
            if (res.code == 0 && customerId) { alert("修改成功") } else { alert("修改失败") }
        } else {
            let res = await axios.post("/customer/add", info)
            if (res.code == 0) { alert("添加成功") } else { alert("添加失败") }
        }
        window.location.href = "./customerlist.html?id=2"
    })
})