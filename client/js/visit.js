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
    async function list() {
        let res = await axios.get("/visit/list",
            { params: { customerId } }
        )
        if (res.code == 0) {
            let arrInfo = [];
            $.each(res.data, function (i, v) {
                arrInfo.push(`
            <tr>
                <td class="w5">${v.id}</td>
                <td class="w15">${v.visitTime}</td>
                <td class="w70 wrap">${v.visitText}</td>
                <td class="w10">
                    <a class="del" href="javascript:;"visitId="${v.id}">删除</a>
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
        if ($(".visitText").val() && $(".visitTime").val()) {
            let res = await axios.post("/visit/add", {
                customerId,
                visitText: $(".visitText").val(),
                visitTime: $(".visitTime").val(),
            })
            if (res.code == 0) {
                alert("添加成功")
            } else {
                alert("添加失败")
            }
        } else {
            alert("日期和内容都得写")
        }
        list();
    })
    //删除回访
    $("tbody").on("click", ".del", async function () {
        console.log(111)
        let r = confirm("确定要删除" + $(this).attr("visitId") + "吗")
        if (r) {
            let res = await axios.get("/visit/delete", {
                params: {
                    visitId: $(this).attr("visitId")
                }
            })
        }
        list();
    })
})