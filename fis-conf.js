
fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
fis.match('*.css',{
	packTo:'css/qiu-mobui.css',
	optimizer: fis.plugin('clean-css'),
	release:'./css/qiu-mobui.min.css'
})
fis.match('*.js',{
	release:'js/qiu-mobui.js',
	optimizer: fis.plugin('uglify-js'),
	release:'./js/qiu-mobui.min.js'
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