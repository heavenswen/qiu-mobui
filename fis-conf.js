/*
 * 用于开发用
 */

//hb预览的配置
fis.match('*.{js,css}',{
	useHash:true
})
fis.match('_*.*',{
	release:false
})
fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
fis.match('_*.css',{
	packTo:'css/qiu-mobiui.css'
})
fis.match('_*.js',{
	packTo:'js/jqz-mobiui.js'
})
fis.media('hb').match('*.*',{
	release:'/trunk/$0'
})