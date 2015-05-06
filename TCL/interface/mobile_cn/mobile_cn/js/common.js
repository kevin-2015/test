var base_url = '/web_manager_cn/';

var go_page='http://10.118.0.218/';
//var jQuery = jQuery.noConflict();
//获取浏览器内核信息
var browser={    
    versions:function(){            
    var u = navigator.userAgent, app = navigator.appVersion;            
		return {                
			trident: u.indexOf('Trident') > -1, //IE内核                
			presto: u.indexOf('Presto') > -1, //opera内核                
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端                
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
			iPad: u.indexOf('iPad') > -1, //是否iPad                
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
		};
   }()
}
//判断是否用手机 访问 
if (browser.versions.ios == true || browser.versions.android == true || browser.versions.iPhone == true || browser.versions.iPad == true) {
}else{
 	//window.location.href=go_page+'web_cn/index.html';
}
var uexWindow;
var open_new = function(name){
	if(uexWindow)
		uexWindow.open(name,'0',name+'.html', 0, '','', '0');
	else
	window.location.href=name+".html";
}
function $$(id){
	return document.getElementById(id);
}
/**
 * localStorage保存数据
 * @param String key  保存数据的key值
 * @param String value  保存的数据
 */
function setLocVal(key,value){
	window.localStorage[key] = value;
}

/**
 * 根据key取localStorage的值
 * @param Stirng key 保存的key值
 */
function getLocVal(key){
	if(window.localStorage[key])
		return window.localStorage[key];
	else
		return "";
}

/**
 * 清除缓存
 * @param Striong key  保存数据的key，如果不传清空所有缓存数据
 */
function clearLocVal(key){
	if(key)
		window.localStorage.removeItem(key);
	else
		window.localStorage.clear();
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
/*****获取request中name对应到value值*****/	
function getQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}
/******返回前一页*********/
function goback(){
	window.history.go(-1);
}

/********动态修改title meta keywords description*****/
function modifytitleandsoon(a){
	//{cb:$1}
	//a是一个数组，里面的元素依次是要替换的$1 $2 ...
	var title = document.title;
	if(title.indexOf('{cb:$')>-1){
		document.title = title.replace(/\{cb\:\$(\d+)\}/g,function(all,group1){
			return a[group1-1];
		});
	}
	var objs = document.getElementsByTagName("meta");
	var k;
	for(var i=0;i<objs.length;i++){
		if(objs[i].name === 'keywords' || objs[i].name === 'description'){
			k = objs[i].content;
			if(k.indexOf('{cb:$')>-1){
				objs[i].content = k.replace(/\{cb\:\$(\d+)\}/g,function(all,group1){
					return a[group1-1];
				});
			}
		}
	}
}
/*****判断邮箱*****/
function check_Eamil(d){
	var isEamil=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
	if(!isEamil.test(d)){
		return false;	
	}else{
		return true;
	}
}
/*****判断手机号码*****/
function check_Mobile(d){
	var isMobile = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(!isMobile.test(d)){
		return false;
	}else{
		return true;
	}
}
function login_tcl(){
	window.location.href='login.html';
}
/****************搜索产品*********/
function search_product(){
	var product_names = $$('product_names').value;
	if(product_names == ''){
		alert('搜索内容不能为空');
	}else{
		window.location.href='product_list.html?typename='+ encodeURIComponent(encodeURIComponent(product_names));
	}
}
/*****返回顶部*****/
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
jQuery(function(){
	jQuery("#type").click(function(){
		jQuery("#type_show").animate({top: '3.2em'}, "1500");
	})
	jQuery("#hide_type").click(function(){
		jQuery("#type_show").animate({top: '-1000px'}, "1500");
	})
	jQuery("#search").click(function(){
		jQuery("#search_show").animate({top: '3.2em'}, "1500");
	})
	jQuery("#hide_search").click(function(){
		jQuery("#search_show").animate({top: '-1000px'}, "1500");
	})
})

//打开右侧关注我们
function open_leftwin(){
	$$('share_win').className='ub share_win';
}
function colse_leftwin(){
	$$('share_win').className='uhide';
}

 //判断是否登录
 function islogin(){
      if(getCookie('login_username')){
			$$('login_tcl').className= 'uhide';
			$$('login_user').className='ub-f1 tx-c';
			$$('user_name').innerHTML = getCookie('login_username');
		}else{
		$$('login_tcl').className= 'ub-f1 tx-c';
		$$('login_user').className='uhide';
		$$('user_name').innerHTML='';
	}
 }
//判断是否登录，没有登录将进行跳转
function istobelogin(){
	if(!getCookie('login_username')){
		window.location.href='login.html';
	}else{
		
	}
}
//header 分类        
function header_fenlei(){
	var url_data = base_url+'home_ProductParameter';
	jQuery.getJSON(url_data,function(data){
		if(data.status==0){
			if(data.data!=''){
				var template= '';
				for(var i=0;i<data.data.length;i++){
					template+='<li class="" onClick="type_page(\''+data.data[i].id+'\',\''+data.data[i].status+'\',\''+data.data[i].name+'\')">'+data.data[i].name+'</li>'
				}
				$$('headermenu').innerHTML=template;
			}
		}
	});
}
//分类列表
function type_page(category,status,name){
	window.location.href = 'type.html?category='+category+'&status='+status+'&name='+ encodeURIComponent(encodeURIComponent(name)) ;
}

//详情页
function go_detail(id,name){
	window.location.href = 'detail.html?productid='+id+'&productname='+encodeURIComponent(encodeURIComponent(name)) ;;
}
