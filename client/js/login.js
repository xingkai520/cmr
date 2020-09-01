$(function () {
    $(".submit").click(async function (e) {
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();
        if (account === "" || password === "") {
            return alert("账号或密码不能空~");
        }
        let pwd = /^\w{6,12}$/
        if (!pwd.test(password)) {
            return alert("密码必须是6-12位的字母、数字、_")
        }
        password = md5(password)
        let res = await axios.post("/user/login", {
            account, password
        })
        if(parseInt(res.code) === 0){
            alert("登陆成功");
            window.location.href = "index.html";
            return;
        }
        alert("用户名或密码出错")
    })
})