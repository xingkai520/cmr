$(async function () {
    //下拉菜单
    initDeptAndJob()
    async function initDeptAndJob() {
        let departmentData = await queryDepart();
        let jobData = await queryJob();
        if (departmentData.code == 0) {
            departmentData = departmentData.data;
            let str = '';
            departmentData.forEach(item => {
                str += `<option value='${item.id}'>${item.name}</option>`
            })
            $(".userdepartment").html(str)
        }
        if (jobData.code == 0) {
            let str = '';
            jobData.data.forEach(item => {
                str += `<option value='${item.id}'>${item.name}</option>`
            })
            $(".userjob").html(str)
        }
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
        $(".spanuserphone").html("")
    });
    //回显
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    let userId = $.getUrlParam('id');
    if (userId) {
        let res = await axios.get("/user/info",
            { params: { userId } }
        )
        $(".username").val(res.data.name)
        $(`input[type="radio"]:eq(${res.data.sex})`).prop("checked", "ture")
        $(".useremail").val(res.data.email)
        $(".userphone").val(res.data.phone)
        $(".userdepartment option").val(res.data.departmentId)
        $(".userjob option").val(res.data.jobId)
        $("textarea").val(res.data.desc)
    }
    //提交信息
    $(".submit").click(async function () {
        key = 0;
        $.each($("input"), (i, v) => {
            if (!v.value) {
                key = 1
            }
        })
        if (key != 1) {
            let info = {
                userId,
                name: $(".username").val(),
                sex: $("input[type='radio']:eq(0)").prop("checked") * 1 ? 0 : 1,
                email: $(".useremail").val(),
                phone: $(".userphone").val(),
                departmentId: $(".userdepartment option").val(),
                jobId: $(".userjob option").val(),
                desc: $(".userdesc").val()
            } 
            if (userId) {
                let res = await axios.post("/user/update", info)
                if (res.code == 0) {
                    alert("修改成功")
                    window.location.href = "./userlist.html"
                } else {
                    alert("修改失败，请稍后在试")
                }
            } else {
                let res = await axios.post("/user/add", info)
                if (res.code == 0) {
                    alert("添加成功")
                    window.location.href = "./userlist.html"
                } else {
                    alert("添加失败，请稍后在试")
                }
            }
        } else {
            alert("填写的数据不合规则，请检查！！！")
        }
    })
})