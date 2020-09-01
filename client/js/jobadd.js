$(async function(){
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    let jobId = $.getUrlParam('id');
    if (jobId) {
        let res = await axios.get("/job/info",
            { params: { jobId } }
        )
        $("input").val(res.data.name)
        $("textarea").val(res.data.desc)
        $.each($("input[type='checkbox']"),(i,v)=>{
            if(res.data.power.includes(v.id)){
                $(`input[type='checkbox']:eq(${i})`).prop("checked","true")
            }
        })
    }
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