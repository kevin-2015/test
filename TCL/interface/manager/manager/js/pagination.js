window._={};
(function(_){
	if (!_) return;
	_.pages = function(os){		//可以使用name来绑定click事件,再取page/li属性使用
	var ps = {
		count:0 						//记录数
		, page:0 						//当前页
		, li:0 								//或当前记录数
		, pre:'jsPage' 				//class,id之类前缀
		, side:5 							//当前页左右数字页个数
		, per:5 							//每页条数
		, first:''							//显示首页(字符)
		, last:''							//显示末页(字符)
		, prev:''							//显示上页(字符)
		, next:''							//显示下页(字符)
		, prevg:''						//前节(字符):足够前移一组,且不是1
		, nextg:''						//后节(字符):足够后移一组,且不是末页
		, url:'javascript：;'			//page的url,放置字符*会替换成页码
		, target:'_self'				//页码打开窗口
		, jump:''						//跳转form的action,*替换成输入页码
		, attrs:''							//附加到a标签上的其它js属性,如data="11" pid="2" aid="3"
	};
	var ma = function(p,t,c,a){
		return '<a ' +(strN0(ops.attrs) ? ops.attrs:'')+ ' href="' +purl(p)+ '" class="' +ops.pre+(c ? c : 'Pages')+ '" target="' +ops.target+ '" page="' +p+ '" li="' +(p*ops.per)+ '" name="' +ops.pre+ 'Pages" title="' +(a ? a : '点击打开第' +p+ '页')+ '">' +(t ? t : p)+ '</a>\n'};          
		var isset = function(v){
			return 'undefined' != typeof v;
		};
		var strN0 = function(v){
			return 'string' == typeof(v) && !/^\s*$/.test(v) ? 1 : 0;
		};//非空字符
		for (var o in os){
			isset(ops[o]) && (ops[o] = os[o]);
		}
		var verp = function(n){
			return n>ops.maxp ? ops.maxp : n;
		};//大于最大页回最大页
		var pages = '';
		var p2l = function(p){
			return p*ops.per;
		};//页转记录数
		var purl = function(p){
			return ops.url.replace('*', p);
		};//返回页码url
		(isNaN(ops.per) || ops.per < 1) && (ops.per = 5);
		if (isNaN(ops.count) || !ops.count || (ops.count <= ops.per) ) return pages;//只有一页
		ops.maxp = Math.floor(ops.count/ops.per) + (ops.count%ops.per ? 1 : 0);//最大页
		if (0 < ops.li){
			ops.li > ops.count && (ops.li = ops.count);
			ops.page = Math.floor(ops.li/ops.per) + (ops.li%ops.per ? 1 :0);//数据位移转换成页,余+1
		}else if(ops.page > 1){
			ops.page > ops.maxp && (ops.page = ops.maxp);
			ops.li = ops.page*ops.per;
		}else{
			ops.li = 0;
			ops.page = 1;
		}
		ops.nums = ops.side*2+1;//总数字页为*2+1
		if (ops.page > ops.side+1) {
			//只有前面出现省略时才需要出现
			if (strN0(ops.first)) pages += ma(1,ops.first,'first');
			if (strN0(ops.prev)) pages += ma(ops.page-1,ops.prev,'prev');
		}
		var prevp = ops.page - ops.nums;
		if (strN0(ops.prevg) && prevp > 1){
			pages += ma(prevp,ops.prevg,'prevg');
		}
		//只有前面出现省略时才需要出现,1已经有首页不必出现
		for(var fi = ops.side, sidel='', sider='', pl='', pr=ops.page; fi >0; fi--){
			if (--pl >= 1)  sidel = ma(pl) + sidel;
			if (++pr <= ops.maxp)  sider += ma(pr);
		}
		pages += sidel + '<a href="javascript：;" target="_self" class="' +ops.pre+ 'Page" title="当前页页码">' +ops.page+ '</a>'+ sider;
		var nextp = ops.page + ops.nums;
		if (strN0(ops.nextg) && ops.maxp > nextp){
			pages += ma(nextp,ops.nextg, 'nextg');
		}//只有后面不显全
		//跳转
		if (strN0(ops.jump) && (ops.page > ops.side || ops.maxp-ops.page >ops.side))
			pages += '<form. target="' +ops.target+ '" class="' +ops.pre+ 'form" method="POST" nsubmit="'
					+ "return (function(t){var i=t.elements[0];i=i.value=i.value.replace(/\\D/g,'');return i>0?t.action='"
					+ops.jump+ "'.replace('*', i):false;})(this);"
					+ '">\n'
					+ '<input class="' +ops.pre+ 'input" title="输入合法的页码,回车确认跳转到输入的页"/>'
					+ '</form>\n';
		if (ops.maxp- ops.page > ops.side){
			//只有后面不显全
			if (strN0(ops.next))pages += ma(ops.page+1,ops.next,'next');
			if (strN0(ops.last)) pages += ma(ops.maxp,ops.last, 'last');
		}
		return pages;
	}
})(window._);
//document.body.innerHTML = _.pages({count:13, page:1, per:1, side:1, first:'f', prev:'p', next:'n', last:'l', nextg:'>>>', prevg:'<<<', jump:'http://local.q/?kkkk=*', target:'_blank'});


//js点击应用示例:
//分页点击
$('#listsBar a[name="jsPagePages"]').click(function(){
	var pid = $(this).attr('pid')*1;
	var page = $(this).attr('page')*1;
	$('#commentBox' +pid+ ' div.atBoxPage' +pid).hide();//其它全部隐藏
	$('#atBoxPage' +pid+ '_' +page).show();//显示当前页
});
//原理分析:
//页面中分页10个,第1页显示,其它页隐藏,每个分页div的class="atBoxPage+pid",且id='atBoxPage+pid_+page',
//在1页点击2页,先用类取得所有的10个分页隐藏,然后用id取得2页显示
