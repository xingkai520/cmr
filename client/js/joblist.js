$(function () {
    //显示列表userhandle|departhandle|jobhandle|customerall
    async function list() {
        let res = await axios("/job/list")
        let arrList = [];
        $.each(res.data, function (i, v) {
            let power = v.power
            let result = ((((power.replace("userhandle", "员工操作权")).replace("departhandle", "部门操作权")).replace("jobhandle", "职务操作权")).replace("customerall","全部客户操作权")).replace("customermy","本人客户操作权")
            arrList.push(`
            <tr>
            <td class="w8">${v.id}</td>
            <td class="w10">${v.name}</td>
            <td class="w20">${v.desc}</td>
            <td class="w50">${result}</td>
            <td class="w12">
                <a href=""jobId="${v.id}"class="editor">编辑</a>
                <a href=""jobId="${v.id}"class="del">删除</a>
            </td>
            </tr>
        `)
            $("tbody").html(arrList.join(''))
        })
    }
    //编辑
    $("tbody").on("click", ".editor", function () { })
    //删除
    $("tbody").on("click", ".del", async function (e) {
        e.preventDefault()
        let r = confirm(`确认删除"${$(this).parent().parent().children().eq(1).html()}"吗？`)
        if (r) {
            let res = await axios.get("/job/delete", {
                params: {
                    jobId: $(this).attr("jobId")
                }
            })
        }
        list();
    })
    list();
})