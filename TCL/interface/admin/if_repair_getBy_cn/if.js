var MEAP = require("meap");
//require("md5.js");

Date.prototype.Format = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) 
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function run(Param, Robot, Request, Response, IF){
    var app_key = "";
    var timestamp = new Date().Format("yyyy-MM-dd hh:mm");
    var method = "hawkeye.eai.case.queryByMobileNo";
    var data = {
        "mobileNo": ""
    };
    
    var sign = "a".toUpperCase();
    
    var option = {
        method: "POST",
        url: "",
        Cookie: "true"
    };
    
    MEAP.AJAX.Runner(option, function(err, res, data){
        if (!err) {
            //Add your normal handling code
        }
        else {
            //Add your exception handling code 
        }
    }, Robot);
}

exports.Runner = run;



