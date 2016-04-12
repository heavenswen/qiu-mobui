;(function($){
	/*下拉列表*/
	$('.floder').on('click','.floder-t',function(){
		$(this).parent('.floder').toggleClass('active');
	})
	/*后退*/
	$('.back').on('click',function(){
		history.go(-1);
	})
	
})(window.Zepto||window.jQuery)
