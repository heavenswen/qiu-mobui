;
(function($) {
	/*下拉列表*/
	$('.floder').on('click', '.floder-t', function() {
		$(this).parent('.floder').toggleClass('active');
	})


})(window.Zepto || window.jQuery)