/*
 * 2016-04-12
 * form qiu
 * 手势轮播图
 */
;(function($){
	$.jqz_banner = function(arr){
	
		var obj = this,
			trigger = [],
			mobile = "ontouchend" in document?true:false;//是否支持touch事件
		//对应动作
		if(mobile){
			trigger['start'] = "touchstart";
			trigger['move']  = "touchmove";
			trigger['end']  = "touchend";	
		}else{
			trigger['start'] = "mousedown";
			trigger['move'] = "mousemove";
			trigger['end'] = "mouseup";	
		}
			
		//transform 
		
			var transforms = [
				"-webkit-transform",
				"transform",
				"-o-transform",
				"-moz-transform",
				"-ms-transform",
			],
				transitions = [
				 'webkitTransitionEnd',
    			 'transitionend',
    			 'oTransitionEnd',
    	         'transitionEnd',
    	         'msTransitionEnd',
				]
			for(var i=0;i<transforms.length;i++)
			{
				if(transforms[i] in document.documentElement.style)
				{
					transform =  transforms[i];
					transitionend = transitions[i];
				}
			}

		//获得对应的transition和transfom
		
		var init = {
			obj:'.banner',
			cell:"cell",//cell's class
			loop:true,//循环
			time:3000,//间隔时间
			duration:200,//速度
			distence:'',//触发距离
			nav:'',//生成一个标识的对象
			fun:function(){},//返回一个引索
		};
		//初始化
		if (arr) $.extend(init,arr);
		var $obj = $(init.obj),			
			$cell = $obj.find('.'+init.cell),//图片目标
			$list = $cell.parent(),//获得图集
			start_x = 0,
			start_y = 0,
			move_x = 0,
			old_move_x = 0,//存储上次集的移动距离
			width = $cell.width(),
			distence = init.distence?init.distence:width/2,
			duration = init.duration+'ms',
			size = $cell.size(),
			index = 0,//图片引索
			t = '',//预存循环事件
			translate = 0,//图片集偏移
			fx = '';//播放方向
		//error
		if($obj.size()<1){
			throw new Error("obj is no an object");
		}else if(size == 0){
			throw new Error("cell is no an classname");
		}
		//自动添加dom 无限循环用
		if(init.loop){			
			$list.append("<li class='"+init.cell+"'>"+$cell.eq(0).html()+"</li>");
			$cell.eq(0).before("<li class='"+init.cell+"'>"+$cell.eq(size-1).html()+"</li>");
			//刷新js的dom;
			$cell = $obj.find('.'+init.cell);
			size = $cell.size();
			index = 1; 
		}
		$cell.eq(index).addClass('active');
		gotocell(index);
		//添加结束时的过渡效果
		transfun("transition-property",'all');
		transfun("transition-timing-function","linear");
		transfun("transition-duration",'0ms');
		//0,窗口改变
		var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
		window.addEventListener(resizeEvt, recalc, false);
		
		function recalc(){
			//重新计算宽度
			width = $cell.width();
			if(!init.distence)distence = width/2;
			gotocell(index);
		}
		//1,开始拖动
		$obj[0].addEventListener(trigger['start'],move_start,false);
		function move_start(e){
			start_x = position(e).x;
			start_y = position(e).y;
			move_x = 0;
			old_move_x = 0;
			if(init.time)clearTimeout(t);
			transfun("transition-duration","0ms");			
			 //是否支持touch
			if (!mobile)e.preventDefault();
			document.addEventListener(trigger['move'],move_ing,false);
			$obj[0].addEventListener(trigger['end'],move_end,false);
		}
		//2，拖动中
		function move_ing(e){
				var xy = position(e);
				move_x = xy.x - start_x;
				move_y = xy.y - start_y;
				//获得相对于上次的移动距离
				translate +=(move_x-old_move_x);
				$list.css(transform,"translate3d("+translate+"px,0,0)");
				//进行超出计算,误差4
				var top = $obj.offset().top;
				if(xy.x<=4||xy.x>=$cell.width()-4||xy.y<top+4||xy.y>(top+$obj.height())-4){
					move_end();
					
				};
				//存储上次的位置
				old_move_x = move_x;
				//处理浏览器默认事件
				var mo_x = positive(move_x),
					mo_y = positive(move_y);
				if(mo_y>10&&mo_x<10){
					//mobile 时
					if(mobile)move_end(e);
				}else{
					e.preventDefault();	
					//解决pc的触发问题
					if(!mobile)$list.on('click','a',clickfalse);	
				}			
		}
		//3，结束拖动
		function move_end(e){
				var mo = positive(move_x);
				//判断的触发
				if(mo>distence){
				//判断方向
					if(move_x < 0&&index<size-1)
					{
						index++;
					}else if(move_x > 0&&index!=0){
						index--;
					}		
				}				
				gotocell(index);
				$obj[0].removeEventListener(trigger['end'],move_end,false);
				document.removeEventListener(trigger['move'],move_ing,false);
		}
		//pc取消a触发
		function clickfalse(){
			$list.off('click','a',clickfalse);
			return false;
		}
		//执行轮播
		function timefun(){
			
			if(!init.loop&&fx=='right'){
				index--;
			}else{
				index++;
			}
			gotocell(index);
		}
		//轮播跳转index
		function gotocell(no){
			transfun("transition-duration",duration);
			transitionfun(no);
			if(init.time){
				clearTimeout(t);
				t = setTimeout(timefun,init.time);
			};
			$list[0].addEventListener(transitionend,function(){
				transfun("transition-duration",'0ms');
				//循环
				if(init.loop&&no ==0)
				{
					no = (size-2);
					transitionfun(no);
				}else if(init.loop&&no ==size-1){
					
					no = 1;
					transitionfun(no);
				};
				return add_class(no);
			},false);
		}
		//偏移index
		function transitionfun(no){
			//保护
			if(no<0)
			{
				index = 0;
				return false;
			}else if(no >= size){
				index = size-1;
				return false;
			}
			//转向
			if(!init.loop&&index == size-1){
				fx ='right';  
			}else if(!init.loop&&index == 0)
			{
				fx = false;
			}
			translate = no*width*-1;
			$list.css(transform,"translate3d("+translate+"px,0,0)");
			index = no;	
		}
		//add class
		function add_class(no){
			$cell.eq(no).addClass('active').siblings('.active').removeClass('active');
			if(init.loop)no--;
			if(init.fun)init.fun(no);
			if(init.nav)shownav(no);
		}
		//浏览器判断 css style_name value[string]
		function transfun(str,value){
			var trans = '';
			
			if(transform.match(/webkit/i)){
				trans = '-webkit-'+str;
			}else{
				trans = str;
			}
			return $list.css(trans,value);
		}
		//获得正数
		function positive(num){
			
			return Math.max(num,(num*-1))
		}
		//position page x y
		function position(e) {
			var x = e.pageX,
				y = e.pageY;
			if (e.targetTouches) {
				x = e.targetTouches[0].pageX; //zepto
				y = e.targetTouches[0].pageY;
			} else if (e.originalEvent&&"ontouchend" in document) {
				x = e.originalEvent.touches[0].pageX; //jquery
				y = e.originalEvent.touches[0].pageY; //jquery
			}
			return {'x':x,'y':y};
		}
		//生成简单标识
		if(init.nav){
			var $nav = $(init.nav);
			if(init.loop)var l =  size-2;
			for(var i = 0; i < l;i++)
			{
				if(i ==0){
					$nav.append('<a class=\'active\'></a>');
				}else{
					$nav.append('<a></a>');
				}
				
			};
			function shownav(i){
				
				$nav.find('a').eq(i).addClass('active').siblings('.active').removeClass('active');
			
			}
		}
		
		/*扩展*/	
	  //跳转到i幅图
	  this.goto= function(i){
	  	if(init.loop){
	  		i++;
	  	}
	  	gotocell(i);
	  }
	  //左右轮播‘right’,为逆向
	  this.swipe = function (str){
	  	if(str == 'right'){
	  		index--;
	  		gotocell(index);
	  	}else{
	  		index++;
	  		gotocell(index);
	  	}
	  	return index;
	  }
	  //暂停轮播
	  this.stop = function(){
	  	clearTimeout(t);
	  }
	  //开启轮播
	  this.start = function(time){
	  	if(time)init.time = time;
	  	clearTimeout(t);
	  	t = setTimeout(timefun,init.time);
	  }
	}//banner
})(window.jQuery||window.Zepto)
