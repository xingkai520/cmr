axios.defaults.baseURL = "http://127.0.0.1:8888";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = '';
    for (let attr in data) {//attr是遍历data的键名
        //hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);//substring() 方法用于提取字符串中介于两个指定下标之间的字符。在这里是提取第一个&后的字符串
}
//请求拦截器
// axios.interceptors.request.use(config=>{
//     return config;
// })
//响应拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, reason => {
    if (reason.response) {
        switch (String(reason.response.status)) {
            case "404":
                alert("当前请求的地址不存在!")
                break;
            default:
                break;
        }
    }
    return Promise.reject(reason);
})