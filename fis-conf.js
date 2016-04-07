/*
 * 用于开发用
 */

//hb预览的配置

fis.match('_*.*',{
	release:false
})

fis.match('*.{js,css}',{
	useHash:true
})
fis.media('hb').match('*.*',{
	release:'/trunk/$0'
})