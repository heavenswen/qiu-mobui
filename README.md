# qiu-mobui
<p>安卓，ios，手机微信版ui，集成了栅格化布局，按钮，输入框，轮播图等</p>
<p>内置了less样式并分成多模块，更方便敏捷开发，和代码修改</p>
<p>采用了zepto框架兼容jquery框架，减少用户的流量和商家的带宽。</p>


<h5>快捷样式</h5>
<ul>
	<li>文字对齐：.text-{left,right,center}
	<li>浮动：.pul-{left,right}
	<li>去浮动：.row
	<li>字体：.small,.big,.normal，
	<li>显示：.none,.block,.inline,
	<li>定位：.fixed
	<li>内填充：.con
	<li>外跳出：.main
	<li>横排显示：.list-inline
	<li>12格栅格化：.col-xs-{1-12}
	<li>按钮：.btn
</ul>
<h5>容器</h5>
<ul>
	<li>头部:.header
	<li>头部标题：.title
	<li>切换框:.tab
	<li>主内容：.content
	<li>选项框：.lalel-style
	<ul>
		<li>多选：type='chenked'
		<li>单选：type='ridao'
	</ul>	
	<li>滑块：.slider>input,i
	<li>折叠栏：.floder>.floder-t,.floder-c
</ul>
<h5>轮播图</h5>
<li>.banner>ul>.cell</li>
<code>
$(funciton(){
		new $.jqz_banner();
})
</code>
		