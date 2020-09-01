$(function () {
    //显示列表
    async function list() {
        let res = await axios("/department/list")
        let arrList = [];
        $.each(res.data, function (i, v) {
            arrList.push(`
            <tr>
            <td class="w10">${v.id}</td>
            <td class="w20">${v.name}</td>
            <td class="w40">${v.desc}</td>
            <td class="w20">
                <a href=""departmentId="${v.id}"class="editor">编辑</a>
                <a href=""departmentId="${v.id}"class="del">删除</a>
            </td>
            </tr>
        `)
            $("tbody").html(arrList.join(''))
        })
    }
    //编辑
    $("tbody").on("click", ".editor", function (e) { 
        e.preventDefault();
        window.location.href = `./departmentadd.html?id=${$(this).attr("departmentId")}`
    })
    //删除
    $("tbody").on("click", ".del", async function (e) {
        e.preventDefault()
        let r = confirm(`确认删除"${$(this).parent().parent().children().eq(1).html()}"吗？`)
        if (r) {
            let res = await axios.get("/department/delete", {
                params: {
                    departmentId: $(this).attr("departmentId")
                }
            })
        }
        list();
    })
    list();
})
