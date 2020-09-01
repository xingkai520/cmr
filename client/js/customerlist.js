$(function () {
    //获取地址栏中?id=后面的数
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    let id = $.getUrlParam('id');
    let page = 1
    let totalPage
    list();
    //封装函数
    async function listInfo(lx) {
        let limit = 10, search = $(".searchInp").val(), type = $(".selectBox")[0].value
        let res = await axios.get("/customer/list", {
            params: {
                lx,
                type,
                search,
                limit,
                page
            }
        })
        totalPage = res.totalPage
        let arrInfo = [];
        $.each(res.data, function (i, v) {
            if(v.sex == 0)v.sex = "男"
            if(v.sex == 1)v.sex = "女"
            arrInfo.push(`
        <tr>
            <td class="w8">${v.name}</td>
            <td class="w5">${v.sex}</td>
            <td class="w10">${v.email}</td>
            <td class="w10">${v.phone}</td>
            <td class="w10">${v.QQ}</td>
            <td class="w10">${v.weixin}</td>
            <td class="w5">${v.type}</td>
            <td class="w8">${v.userName}</td>
            <td class="w20">${v.address}</td>
            <td class="w14">
                <a href="" class="editor" customerId="${v.id}">编辑</a>
                <a href="" class="del" customerId="${v.id}">删除</a>
                <a href="" class="visit" customerId="${v.id}">回访记录</a>
            </td>
        </tr>
       `)
        })
        $("tbody").html(
            arrInfo.join("")
        )
        //页码
        let arrPage = []
        for (let i = 0; i < res.totalPage; i++) {
            arrPage.push(`<li class="active">${i + 1}</li>`)
        }
        $(".pageBox").html(
            `<a href="javascript:;">上一页</a>
            <ul class="pageNum">
            ${arrPage.join("")}
            </ul>
            <a href="javascript:;">下一页</a> -->`
        )
    }
    function list() {
        if (id == 1) {
            listInfo("my");
        } else if (id == 2) {
            listInfo("all");
        }
    }
    //搜索
    $(".selectBox").change(function () {
        page = 1;
        list();
    })
    $(".searchInp").change(function () {
        page = 1;
        list();
    })
    // 上一页
    $(".pageBox").on("click", "a:eq(0)", function () {
        if (--page <= 0) {
            page = 1;
        }
        list();
    })
    //下一页
    $(".pageBox").on("click", "a:eq(1)", function () {
        if (++page >= totalPage) {
            page = totalPage;
        }
        list();
    })
    //点击页码跳转
    $(".pageBox").on("click", "li", function () {
        page = $(this).html()
        list();
    })
    //编辑
    $("tbody").on("click", ".editor", function (e) { 
        e.preventDefault();
        window.location.href = `./customeradd.html?id=${$(this).attr("customerId")}`
    })
    //删除
    $("tbody").on("click", ".del", async function (e) {
        e.preventDefault()
        let r = confirm(`确认删除"${$(this).parent().parent().children().eq(0).html()}"吗？`)
        if (r) {
            let res = await axios.get("/customer/delete", {
                params: {
                    customerId: $(this).attr("customerId")
                }
            })
        }
        list();
    })
    //回访
    $("tbody").on("click", ".visit", async function (e) {
        e.preventDefault()
        window.location.href = `./visit.html?id=${$(this).attr("customerId")}`
    })
})