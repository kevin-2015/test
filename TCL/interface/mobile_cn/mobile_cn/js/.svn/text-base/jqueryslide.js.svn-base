var Msize = $(".touch_page").size(),
	page_n			= 1,			//初始页面位置
	initP			= null,			//初值控制值
	moveP			= null,			//每次获取到的值
	firstP			= null,			//第一次获取的值
	newM			= null,			//重新加载的浮层
	p_b				= null,			//方向控制值
	indexP			= null, 		//控制首页不能直接找转到最后一页
	move			= null,			//触摸能滑动页面
	start			= true, 		//控制动画开始
	startM			= null,			//开始移动
	position		= null,			//方向值
	DNmove			= false,		//其他操作不让页面切换
	mapS			= null,			//地图变量值
	canmove			= false,		//首页返回最后一页
	textNode		= [],			//文本对象
	textInt			= 1;			//文本对象顺序
	mousedown		= null;			//PC鼠标控制鼠标按下获取值
/*
广告盒子高度
*/
var v_h	= null;	
function init_pageH(){	//渲染怪异模式
	var fn_h = function() {
		if(document.compatMode == "BackCompat")		
				var Node = document.body;
			else
				var Node = document.documentElement;
				return Math.max(Node.scrollHeight,Node.clientHeight);
	}
	var page_h = fn_h();
	var m_h = $(".touch_page").height();
	page_h >= m_h ? v_h = page_h : v_h = m_h;		//page_h documentheight
	
	if(document.title == "首页"){
		//v_h -=88;
	}
	//$(".touch_block").height(v_h);
	//$(".touch_page").height(v_h);
};
init_pageH();

/*
大图延迟加载
*/
var lazyNode = $('.bigimg');
lazyNode.each(function(){
	var self = $(this);
	if(self.is('img')){
		self.attr('src','img/lit.jpg');
	}else{
		self.css({
			'background-image'	: 'url(img/loading_large.gif)',
			'background-size'	: '120px 120px'
		})
	}
})

/*
前两个AD加载
*/
setTimeout(function(){
	for(var i=0;i<2;i++){
		var node = $(".touch_page").eq(i);
		if(node.length==0) break;
		if(node.find('.bigimg').length!=0){
			lazy_change(node);
		}else continue;
	}
},200)

/*
加载第三个AD
*/
function lazy_bigP(){
	for(var i=1;i<=2;i++){
		var node = $(".touch_page").eq(page_n+i-1);
		if(node.length==0) break;
		if(node.find('.bigimg').length!=0){
			lazy_change(node);
		}else continue;
	}
}


/*
AD图片替换
*/
function lazy_change(node){
	var lazy = node.find('.bigimg');
	lazy.each(function(){
		var self = $(this),
		srcImg = self.attr('data-img');

		$('<img />').on('load',function(){
			if(self.is('img')){
				self.attr('src',srcImg)
			}else{
				self.css({'background-image'	: 'url('+srcImg+')','background-size'	: 'cover'})
			}

/*
判断下面页面进行加载
*/
for(var i =0;i<$(".touch_page").size();i++){
	var page = $(".touch_page").eq(i);
	if($(".touch_page").find('.bigimg').length==0) continue
	else{
		lazy_change(page);
	}
			}
					}).attr("src",srcImg);
				self.removeClass('bigimg');
			})	
}

//绑定事件
function changeOpen(e){
	$(".touch_page").on('mousedown touchstart',page_touchstart);
	$(".touch_page").on('mousemove touchmove',page_touchmove);
	$(".touch_page").on('mouseup touchend mouseout',page_touchend);
};

//取消绑定事件
function changeClose(e){
	$(".touch_page").off('mousedown touchstart');
	$(".touch_page").off('mousemove touchmove');
	$(".touch_page").off('mouseup touchend mouseout');
};

//开启滑动功能
changeOpen();

//触摸||鼠标按下开始函数
function page_touchstart(e){
	if (e.type == "touchstart") {
		initP = window.event.touches[0].pageY;
	}else{
		initP = e.y || e.pageY;
		mousedown = true;
	}
	firstP = initP;	
};

//触摸移动（鼠标移动）开始函数
	function page_touchmove(e){
		e.preventDefault();
		e.stopPropagation();	

		//判断是否开始或者在移动中获取值
		if(start||startM){
			startM = true;
			if (e.type == "touchmove") {
				moveP = window.event.touches[0].pageY;
			}else { 
				if(mousedown) moveP = e.y || e.pageY;
			}
			page_n == 1 ? indexP = false : indexP = true ;	//true 为不是第一页 false为第一页
		}
		
		
		//设置一个页面开始移动
		if(moveP&&startM){
			
			//判断方向并让一个页面出现开始移动
			if(!p_b){
				p_b = true;
				position = moveP - initP > 0 ? true : false;	//true 为向下滑动 false 为向上滑动
				
				if(position){
				//向下移动
					if(indexP){						
						newM = page_n - 1 ;
						$(".touch_page").eq(newM-1).addClass("active").css("top",-v_h);
						move = true ;
					}else{
						if(canmove){
							move = true;
							newM = Msize;
							$(".touch_page").eq(newM-1).addClass("active").css("top",-v_h);
						}
						//else move = false;
						else{
							move = true;
							//alert(Msize);
							newM = Msize;
							$(".touch_page").eq(newM-1).addClass("active").css("top",-v_h);
						}
					}
					
				}else{
				//向上移动
					if(page_n != Msize){
						newM = page_n + 1 ;
					}else{
						newM = 1 ;
					}
					$(".touch_page").eq(newM-1).addClass("active").css("top",v_h);
					move = true ;
				} 
			}
			
			//根据移动设置页面的值
			if(!DNmove){
				//滑动带动页面滑动
				if(move){	
					//移动中设置页面的值（top）
					start = false;
					var topV = parseInt($(".touch_page").eq(newM-1).css("top"));
					$(".touch_page").eq(newM-1).css({'top':topV+moveP-initP});
					initP = moveP;
				}else{
					moveP = null;	
				}
			}else{
				console.log('2')
				moveP = null;	
			}
		}
};

	//触摸结束（鼠标起来或者离开元素）开始函数
	function page_touchend(e){	
			
		//结束控制页面
		startM =null;
		p_b = false;
		
		//判断移动的方向
		var move_p;	
		position ? move_p = moveP - firstP > 100 : move_p = firstP - moveP > 100 ;
		if(move){
			//切画页面(移动成功)
			if( move_p && Math.abs(moveP) >5 ){	
				$(".touch_page").eq(newM-1).animate({'top':0},300,"easeOutSine",function(){
					/*
					** 切换成功回调的函数
					*/
					success();
				})
			//返回页面(移动失败)
			}else if (Math.abs(moveP) >=5){	//页面退回去
				position ? $(".touch_page").eq(newM-1).animate({'top':-v_h},100,"easeOutSine") : $(".touch_page").eq(newM-1).animate({'top':v_h},100,"easeOutSine");
				$(".touch_page").eq(newM-1).removeClass("active");
				start = true;
			}
		}
		/* 初始化值 */
		initP		= null,			//初值控制值
		moveP		= null,			//每次获取到的值
		firstP		= null,			//第一次获取的值
		mousedown	= null;			//取消鼠标按下的控制值
	};

/*
** 切换成功的函数
*/
	function success(){
		/*
		** 切换成功回调的函数
		*/							
		//设置页面的出现
		$(".touch_page").eq(page_n-1).removeClass("show active").addClass("hide");
		$(".touch_page").eq(newM-1).removeClass("active hide").addClass("show");
		
		// 滑动成功加载多面的图片
		lazy_bigP();
		
		//重新设置页面移动的控制值
		page_n = newM;
		start = true;
		
		//判断是不是最后一页，出现提示文字
		if(page_n == Msize) {
			canmove = true;
		}else{
			$('.popup-txt').removeClass('txtHide');	
		}
	}

function success(){
	$(".touch_page").eq(page_n-1).removeClass("show active").addClass("hide");
	$(".touch_page").eq(newM-1).removeClass("active hide").addClass("show");
		
	// 滑动成功加载多面的图片
	lazy_bigP();
		
	//重新设置页面移动的控制值
	page_n = newM;
	start = true;
	}






