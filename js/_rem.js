//用js处理rem字
;
(function() {
	//当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
	//注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
	//总来的来就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的值
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var docEl = document.documentElement;
			//设置根字体大小
			docEl.style.fontSize = 10 * (docEl.clientWidth / 320) + 'px';
		};
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);

	window.rem_clean = function() {
		window.removeEventListener(resizeEvt, recalc, false);
		document.removeEventListener('DOMContentLoaded', recalc, false);
	}
})(window)