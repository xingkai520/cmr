$(async function () {
    //显示回访列表
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    let customerId = $.getUrlParam('id');
    let res = await axios.get("/visit/list",
        { params: { customerId } }
    )
    function list() {
        if (res.code == 0) {
            let arrInfo = [];
            $.each(res.data, function (i, v) {
                arrInfo.push(`
            <tr>
                <td class="w5">${v.id}</td>
                <td class="w15">${v.visitTime}</td>
                <td class="w70 wrap">${v.visitText}</td>
                <td class="w10">
                    <a href="javascript:;">删除</a>
                </td>
            </tr>
            `)
            })
            $("tbody").html(arrInfo.join(''))
        } else {
            $("tbody").html('无')
        }
    }
    list();
    //添加回访
    $(".submit").click(async function () {
        let res = await axios.post("/visit/add", {
            customerId,
            visitText: $(".visitText").val(),
            visitTime: $(".visitTime").val(),
        })
        list();
        console.log(res)
    })
})