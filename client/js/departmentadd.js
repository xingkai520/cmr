$(function(){
    $(".submit").click(async function(){
        let key = 0
        let info = {
            name:$("input").val(),
            desc:$("textarea").val()
        }
        $.each(info,function(i,v){
            if(!v){
                key = 1;
            }
        })
        if(key == 1){
            return alert("必填项不能为空!!!")
        }
        let res = await axios.post("/department/add",info)
        alert("添加成功！！")
        window.location.href = "./departmentlist.html"
    })
})