$(async function () {
    //回显
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    let departmentId = $.getUrlParam('id');
    if (departmentId) {
        let res = await axios.get("/department/info",
            { params: { departmentId } }
        )
        $("input").val(res.data.name)
        $("textarea").val(res.data.desc)
    }
    $(".submit").click(async function () {
        let key = 0
        let info = {
            departmentId,
            name: $("input").val(),
            desc: $("textarea").val()
        }
        $.each(info, function (i, v) {
            if (!v) {
                key++;
            }
        })
        if (key >= 2) {
            return alert("必填项不能为空!!!")
        }
        if (departmentId) {
            let res = await axios.post("/department/update", info);
            alert("修改成功！！")
        } else {
            let res = await axios.post("/department/add", info);
            alert("添加成功！！")
        }
        window.location.href = "./departmentlist.html"
    })
})