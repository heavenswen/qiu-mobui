
fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
fis.match('{_,jqz}*.css',{
	packTo:'css/qiu-mobui.css'
})
fis.match('{_,jqz}*.js',{
	packTo:'js/jqz-mobui.js'
})

fis.match("_.*",{
	release:false
})
fis.match("*.html",{
	release:false
})//默认不产出
/*release*/
fis.match('./fonts/*',{
	release:'./font/$0'
})
fis.match('jqz-mobui.js',{
	release:'./jqz-mobui.js'
})
fis.match('qiu-mobui.css',{
	release:'./qiu-mobui.css'
})
fis.match('jqz-mobui.js',{
	optimizer: fis.plugin('uglify-js'),
	release:'./jqz-mobui.min.js'
})
fis.match('qiu-mobui.css',{
	optimizer: fis.plugin('clean-css'),
	release:'./qiu-mobui.min.css'
})
fis.media('hb').match('*.{css,js}',{
	useHash:true,
})
fis.media('hb').match('*.*',{
	release:'/trunk/$0'
})