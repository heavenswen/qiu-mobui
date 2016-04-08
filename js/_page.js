;(function($){
	$('.floder').on('click','.floder-t',function(){
		$(this).parent('.floder').toggleClass('active');
	})
})(window.Zepto||window.jQuery)
