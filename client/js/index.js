$(function () {
    init();
    let $plan = $.Callbacks();
    $plan.add((baseInfo) => {
        $(".baseBox>span").html(`你好:${baseInfo.data.name}`)
    })
    $plan.add((power) => {
    })
    async function init() {
        let result = await axios.get("/user/login");
        if (result.code != 0) {
            alert("你还没有登录，请先登录")
            window.location.href = "login.html";
            return;
        }
        let [baseInfo, power] = await axios.all([
            axios.get("/user/info"),
            axios.get("/user/power"),
        ])
        $plan.fire(baseInfo, power)//依次执行计划表中的计划
        let p = `${power.power}`
        //客户权限
        $(".navBox a:eq(0)").click(function () {
            $(".iframeBox").attr("src","")
            if (p.includes('customerall')) {
                $(this).addClass("active").siblings().removeClass("active")
                $(".menuBox").html(`
                <div class="itemBox">
                <h3>客户管理</h3>
                    <div class="item"><a href="javascript:;">我的客户</a></div>
                    <div class="item"><a href="javascript:;">全部客户</a></div>
                    <div class="item"><a href="javascript:;">新增用户</a></div>
                    </div>
                `)
                for (let i = 0; i < 3; i++) {
                    $(`.item:eq(${i})`).click(function () {
                        switch (i) {
                            case 0: $(".iframeBox").attr("src", "./page/customerlist.html?id=1"); break;
                            case 1: $(".iframeBox").attr("src", "./page/customerlist.html?id=2"); break;
                            case 2: $(".iframeBox").attr("src", "./page/customeradd.html"); break;
                        }
                    })
                }
            } else {
                alert("您没有这个权限！！！")
            }
        })
        //组织权限
        $(".navBox a:eq(1)").click(function () {
            $(".iframeBox").attr("src", "")
            if (p.includes('userhandle' || 'departhandle' || 'jobhandle')) {
                if (p.includes('userhandle' && 'departhandle' && 'jobhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox1">
                        <h3>员工管理</h3>
                        <div class="item"><a href="javascript:;">员工列表</a></div>
                        <div class="item"><a href="javascript:;">新增员工</a></div>
                    </div>
                    <div class="itemBox itemBox2">
                        <h3>部门管理</h3>
                        <div class="item"><a href="javascript:;">部门列表</a></div>
                        <div class="item"><a href="javascript:;">新增部门</a></div>
                    </div>
                    <div class="itemBox itemBox3">
                        <h3>职务管理</h3>
                        <div class="item"><a href="javascript:;">职务列表</a></div>
                        <div class="item"><a href="javascript:;">新增职务</a></div>
                    </div>
                    `)
                }
                else if (p.includes('userhandle' && 'departhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox1">
                        <h3>员工管理</h3>
                        <div class="item"><a href="javascript:;">员工列表</a></div>
                        <div class="item"><a href="javascript:;">新增员工</a></div>
                    </div>
                    <div class="itemBox itemBox2">
                        <h3>部门管理</h3>
                        <div class="item"><a href="javascript:;">部门列表</a></div>
                        <div class="item"><a href="javascript:;">新增部门</a></div>
                    </div>
                    `)
                }
                else if (p.includes('userhandle' && 'jobhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox1">
                        <h3>员工管理</h3>
                        <div class="item"><a href="javascript:;">员工列表</a></div>
                        <div class="item"><a href="javascript:;">新增员工</a></div>
                    </div>
                    <div class="itemBox itemBox3>
                        <h3>职务管理</h3>
                        <div class="item"><a href="javascript:;">职务列表</a></div>
                        <div class="item"><a href="javascript:;">新增职务</a></div>
                    </div>
                    `)
                }
                else if (p.includes('departhandle' && 'jobhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox2">
                        <h3>部门管理</h3>
                        <div class="item"><a href="javascript:;">部门列表</a></div>
                        <div class="item"><a href="javascript:;">新增部门</a></div>
                    </div>
                    <div class="itemBox itemBox3">
                        <h3>职务管理</h3>
                        <div class="item"><a href="javascript:;">职务列表</a></div>
                        <div class="item"><a href="javascript:;">新增职务</a></div>
                    </div>
                    `)
                }
                else if (p.includes('userhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox1">
                        <h3>员工管理</h3>
                        <div class="item"><a href="javascript:;">员工列表</a></div>
                        <div class="item"><a href="javascript:;">新增员工</a></div>
                    </div>
                    `)
                }
                else if (p.includes('departhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox2">
                        <h3>部门管理</h3>
                        <div class="item"><a href="javascript:;">部门列表</a></div>
                        <div class="item"><a href="javascript:;">新增部门</a></div>
                    </div>
                    `)
                }
                else if (p.includes('jobhandle')) {
                    $(this).addClass("active").siblings().removeClass("active")
                    $(".menuBox").html(`
                    <div class="itemBox itemBox3">
                        <h3>职务管理</h3>
                        <div class="item"><a href="javascript:;">职务列表</a></div>
                        <div class="item"><a href="javascript:;">新增职务</a></div>
                    </div>
                    `)
                }
                $(".itemBox1 .item:eq(0)").click(function () { $("iframe").attr("src", "./page/userlist.html") })
                $(".itemBox1 .item:eq(1)").click(function () { $("iframe").attr("src", "./page/useradd.html") })
                $(".itemBox2 .item:eq(0)").click(function () { $("iframe").attr("src", "./page/departmentlist.html") })
                $(".itemBox2 .item:eq(1)").click(function () { $("iframe").attr("src", "./page/departmentadd.html") })
                $(".itemBox3 .item:eq(0)").click(function () { $("iframe").attr("src", "./page/joblist.html") })
                $(".itemBox3 .item:eq(1)").click(function () { $("iframe").attr("src", "./page/jobadd.html") })
            } else {
                alert("您没有这个权限！！！")
            }
        })
    }
    //退出登录
    $(".baseBox>a").click(async function () {
        let result = await axios.get("/user/signout")
        if (result.code == 0) {
            window.location.href = "login.html"
            return;
        }
        alert("请稍后再试")
    })
})