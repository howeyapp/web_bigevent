//设置路径(测试)
var baseUrl = "http://ajax.frontend.itheima.net"
//设置路径(生产)
// var prejURL = ""
//拦截/过滤每一次ajax请求.配置每次请求的参数
$.ajaxPrefilter(function (options) {
    options.url = baseUrl + options.url
    console.log(options);
});