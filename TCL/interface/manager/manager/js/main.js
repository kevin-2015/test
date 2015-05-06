//JavaScript Document
var base_url = '/admin/';
//var jQuery = $.noConflict();

var languagename = "somoveLanguage";

function chgLang(){
    var value = jQuery("#ddlSomoveLanguage").children('option:selected').val();
    setCookie(languagename, value);
    window.top.location.reload();
}

//radio单选样式
function checkbox(obj){
    var o = obj.getElementsByTagName("input")[0];
    if (o.checked == "" || !o.checked) {
        o.checked = true;
        o.parentNode.className = "checkbox_checked";
    }
    else {
        o.checked = false;
        o.parentNode.className = "checkbox"
    }
}

function radio(elem, obj){
    var oo = obj.getElementsByTagName("input")[0];
    if (oo.checked) 
        oo.checked = false;
    else 
        oo.checked = true;
    var o = (document.getElementsByName(elem));
    var n = o.length;
    for (var i = 0; i < n; i++) {
        var oo = o[i];
        if (oo.checked == "" || !oo.checked) {
            oo.parentNode.className = "radioButton";
        }
        else {
            oo.parentNode.className = "radioButton_checked";
        }
    }
}

function $$(id){
    return document.getElementById(id);
}

//chekecd复选框样式
function myCheckbox(obj, thisobj){
    var o = document.getElementById(obj);
    if (o.checked) {
        thisobj.className = 'mo_input';
        o.checked = false;
    }
    else {
        thisobj.className = 'zhong_che';
        o.checked = true;
    }
}

//自动获取高度
function height_weight(){
    return;
    //$$('left_boader').style.height=parseInt(document.body.offsetHeight)+'px';
    if (document.body.style.overflow != "hidden" && document.body.scroll != "no" && document.body.scrollHeight > document.body.offsetHeight) {
        if ($$('left_boader').offsetHeight < $$("right_boader").offsetHeight) {
            $$('left_boader').style.height = $$("right_boader").offsetHeight + "px";
        }
        else {
            $$('left_boader').style.height = $$("left_boader").offsetHeight + "px";
        }
    }
    else {
        $$('left_boader').style.height = parseInt(document.body.offsetHeight) + 'px';
    }
}

//获取request中name对应到value值	
function getQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}

//中英文切换
function chain_eng(id){
    var langeth_length = $$('langeth').children.length;
    for (var i = 0; i < langeth_length; i++) {
        if (id == i) {
            $$('chain' + id).className = 'ul_float_right ul_margin_left more_sjss guoxian';
        }
        else {
            $$('chain' + i).className = 'ul_float_right ul_margin_left more_sjss yingxian'
        }
    }
}

function addHover(){
    jQuery("table").hover(function(){
        jQuery(this).addClass("hover");
    }, function(){
        jQuery(this).removeClass("hover");
    });
}

//返回顶部
function myScroll(){
    var x = document.body.scrollTop || document.documentElement.scrollTop;
    var timer = setInterval(function(){
        x = x - 100;
        if (x < 100) {
            x = 0;
            window.scrollTo(x, x);
            clearInterval(timer);
        }
        window.scrollTo(x, x);
    }, "10");
}

function setCookie(name, value){
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) 
        return unescape(arr[2]);
    return null
}
