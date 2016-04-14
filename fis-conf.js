
fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
fis.match('{_,jqz}*.css',{
	optimizer: fis.plugin('clean-css'),
	packTo:'css/qiu-mobui.min.css'
})
fis.match('{_,jqz}*.js',{
	optimizer: fis.plugin('uglify-js'),
	packTo:'js/qiu-mobui.min.js',
})
fis.match('{_,jqz}*.css',{
	release:'css/qiu-mobui.css',
})
fis.match('{_,jqz}*.js',{
	release:'js/qiu-mobui.js',
})

/*过滤*/
fis.match('/fonts/*.css',{
	release:false,
})
fis.match('*.{less,html,md,png,jpg}',{
	release:false
})

fis.media('hb').match('*.{css,js}',{
	useHash:true,
})
fis.media('hb').match('*.*',{
	release:'/trunk/$0'
})