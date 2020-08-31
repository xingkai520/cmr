$(function(){
    $(".submit").click(async function(){
        let key = 0
        let info = {
            name:$(".username").val(),
            sex:$("input[type='radio']:eq(0)").prop("checked")*1 ? 0 : 1,
            email:$(".useremail").val(),
            phone:$(".userphone").val(),
            QQ:$(".userqq").val(),
            weixin:$(".userweixin").val(),
            type:$("select")[0].value,
            address:$("textarea").val(),
        }
        $.each($("input"),function(i,v){
            if(!v){
                key = 1;
            }
        })
        if(key == 1){
            return alert("必填项不能为空!!!")
        }
        let res = await axios.post("/customer/add",info)
        window.location.href = "./customerlist.html?id=2"
    })
})