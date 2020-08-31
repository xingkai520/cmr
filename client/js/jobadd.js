$(function(){
    $(".submit").click(async function(){
        let power = ''
        $.each($("input[type=checkbox]"),(i,v)=>{
            if(v.checked){
                power +='|' + v.value 
            }
        })
        power = power.substring(1)
        console.log(power)
        let key = 0
        let info = {
            name:$("input[type='text']").val(),
            desc:$("textarea").val(),
            power,
        }
        $.each(info,function(i,v){
            if(!v){
                key = 1;
            }
        })
        if(key == 1){
            return alert("必填项不能为空!!!")
        }
        let res = await axios.post("/job/add",info)
        alert("添加成功！！")
        window.location.href = "./joblist.html"
    })
})