$(function () {
    initDeptAndJob()
    async function initDeptAndJob() {
        let departmentData = await queryDepart();
        if (departmentData.code == 0) {
            departmentData = departmentData.data;
            let str = '<option value="0">全部</option>';
            departmentData.forEach(item => {
                str += `<option value='${item.id}'>${item.name}</option>`
            })
            $(".selectBox").html(str)
        }
    }
    //显示列表
    async function list() {
        let res = await axios("/user/list", {
            params: {
                departmentId: $(".selectBox")[0].value || 0,
                search: $(".searchInp").val()
            }
        }
        )
        if (res.code == 0) {
            let arrList = [];
            $.each(res.data, function (i, v) {
                if (v.sex == 0) v.sex = "男"
                if (v.sex == 1) v.sex = "女"
                arrList.push(`
        <tr>
            <td class="w3"><input type="checkbox"></td>
            <td class="w10">${v.name}</td>
            <td class="w5">${v.sex}</td>
            <td class="w10">${v.department}</td>
            <td class="w10">${v.job}</td>
            <td class="w15">${v.email}</td>
            <td class="w15">${v.phone}</td>
            <td class="w20">${v.desc}</td>
            <td class="w12">
                <a href=""userId="${v.id}"class="editor">编辑</a>
                <a href=""userId="${v.id}"class="del">删除</a>
                <a href=""userId="${v.id}"class="resetPwd">重置密码</a>
            </td>
        </tr>
        `)
                $("tbody").html(arrList.join(''))
            })
        } else {
            $("tbody").html('')
        }
    }
    //编辑
    $("tbody").on("click", ".editor", function (e) {
        e.preventDefault();
        window.location.href = `./useradd.html?id=${$(this).attr("userId")}`
    })
    //删除
    $("tbody").on("click", ".del", async function (e) {
        e.preventDefault()
        let r = confirm(`确认删除"${$(this).parent().parent().children().eq(1).html()}"吗？`)
        if (r) {
            let res = await axios.get("/user/delete", {
                params: {
                    userId: $(this).attr("userId")
                }
            })
        }
        list();
    })
    list();
    $(".selectBox").change(function () { list() })
    $(".searchInp").change(function () { list() })
    //选中
    $("#checkAll").change(function () {
        if ($("#checkAll").prop("checked")) {
            $("tbody input[type='checkbox']").prop("checked", "true")
        } else {
            $("tbody input[type='checkbox']").prop("checked", "")
        }
    })
    $("tbody").on("click", "input[type='checkbox']", function () {
        let key = 0
        $.each($("tbody input[type='checkbox']"), function (i, v) {
            if (!v.checked) { key++ }
            if (key != 0) {
                $("#checkAll").prop("checked", "")
            } else {
                $("#checkAll").prop("checked", "true")
            }
        })
    })
    //批量删除
    $(".deleteAll").click(function () {
        let r = confirm("确认要批量删除吗？")
        if (r) {
            $.each($("tbody input[type='checkbox']:checked"), async function (i, v) {
                let res = await axios.get("/user/delete", {
                    params: {
                        userId: $(v).parents().siblings().children("a").attr("userId")
                    }
                })
            })
            list();
            list();
        }
    })
    // 重置密码
    $("tbody").on("click", ".resetPwd", async function (e) {
        e.preventDefault();
        let r = confirm(`确认要重置"${$(this).parent().parent().children().eq(1).html()}"的密码吗`)
        if (r) {
            let res = await axios.post("/user/resetpassword", {
                userId: $(this).attr("userId")
            })
            if (res.code == 0) {
                alert(`${$(this).parent().parent().children().eq(1).html()}的密码已重置为1234567890`)
                window.location.href = "userlist.html"
            } else {
                alert("请稍后再试")
            }
        }
    })
})