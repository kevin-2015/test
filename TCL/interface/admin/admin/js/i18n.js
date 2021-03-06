var i18n;
var cn = {
    "server": {
        "Error": "处理异常",
        "usePassNotEmpty": "用户名和密码不能为空",
        "loginFail": "登录失败",
        "logoutSuccess": "注销成功",
        "uploadSuccess": "上传成功",
        "uploadFail": "上传失败",
        "createDirFail": "目录创建失败",
        "addSuccess": "添加成功",
        "updateSuccess": "编辑成功",
        "delSuccess": "删除成功",
        "addFail": "添加失败",
        "updateFail": "编辑失败",
        "delFail": "删除失败",
        "setSuccess": "设置成功",
        "setFail": "设置失败",
        "product": "产品",
        "addrEmpty": "地址不能为空",
        "codeEmpty": "邮编为空",
        "phoneEmpty": "电话为空"
    },
	"admins":{
		"selAll":"全部",
		"edit":"编辑",
		"del":"删除"
	},
	"support":{
		"del":"删除",
		"addSubMenu":"增加二级菜单"
	}
};
var en = {
    "server": {
        "Error": "Error",
        "usePassNotEmpty": "username and password not Empty",
        "loginFail": "login faile",
        "logoutSuccess": "logout success",
        "uploadSuccess": "upload Success",
        "uploadFail": "upload Fail",
        "createDirFail": "createDir Fail",
        "addSuccess": "add Success",
        "updateSuccess": "update Success",
        "delSuccess": "del Success",
        "addFail": "add  Fail",
        "updateFail": "update Fail",
        "delFail": "del  Fail",
        "setSuccess": "set Success",
        "setFail": "set  Fail",
        "product": "product",
        "addrEmpty": "address is empty",
        "codeEmpty": "code is empty",
        "phoneEmpty": "phone number is empty"
    },
	"admins":{
		"selAll":"ALL",
		"edit":"Edit",
		"del":"Delete"
	},
	"support":{
		"del":"Delete",
		"addSubMenu":"Addtwolevelmenu"
	}
};
(function(){
    if (getCookie(languagename) != "") {
        if (getCookie(languagename) == "cn") {
            i18n = cn;
            return;
        }
        if (getCookie(languagename) == "en") {
            i18n = en;
            return;
        }
    }
    var uulanguage = (navigator.language || navigator.browserLanguage || navigator.userLanguage).toLowerCase();
    if (uulanguage == "zh-cn") 
        i18n = cn;
    if (uulanguage == "en") 
        i18n = en;
})();
