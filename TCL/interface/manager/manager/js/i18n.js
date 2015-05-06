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
        "phoneEmpty": "电话为空",
		"uploadFileFormat":"上传图片中有目前不支持的格式",
		"clearRow":"清空",
		"guessYouLike":"猜你喜欢",
		"picture":"图片",
		"title":"标题",
		"text":"描述",
		"href":"链接",
		"submit":"提交",
		"addParentMenu":"增加一级菜单",
		"name":"名称",
		"attention":"注：(一级菜单为导航栏上文字)",
		"select":"请选择",
		"firstPage":"首页",
		"lastPage":"尾页",
		"prePage":"上一页",
		"nextPage":"下一页"	
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
        "phoneEmpty": "phone number is empty",
		"uploadFileFormat":"the file format you upload is not supported",
		"clearRow":"ClearRow",
		"guessYouLike":"Guess Those You Like",
		"picture":"Picture",
		"title":"Title",
		"text":"Text",
		"href":"Href",
		"submit":"Submit",
		"addParentMenu":"Add Parent Menu",
		"name":"Name",
		"attention":"Attention : parent menu are those  listed on  navigation bar",
		"select":"please select",
		"firstPage":"first page",
		"lastPage":"last page",
		"prePage":"pre",
		"nextPage":"next"	
    },
	"admins":{
		"selAll":"ALL",
		"edit":"Edit",
		"del":"Delete"
	},
	"support":{
		"del":"Delete",
		"addSubMenu":"Add sub menu"
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
