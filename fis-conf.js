var min = false,
	css = '/css/*.css',
	js = '/js/*.js',
	lib ='/lib/';//默认文件夹 



fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
if(min){
	//生成min版
	fis.match(css,{
		packTo:lib+'css/qiu-mobui.min.css',
		optimizer: fis.plugin('clean-css'),
		release:lib+'css/qiu-mobui.min.css',
	})
	fis.match(js,{
		packTo:lib+'js/qiu-mobui.min.js',
		optimizer: fis.plugin('uglify-js'),
		release:lib+'js/qiu-mobui.min.js',
	})
}else{
	//普通版
	fis.match(css,{
		packTo:lib+'css/qiu-mobui.css'
	})
	fis.match(js,{
		packTo:lib+'js/qiu-mobui.js'
	})
}

fis.match('/fonts/*.{ttf,woff,eot,svg}',{
	release:lib+'$0',
})
fis.match('*.{less,html,md,png,jpg}',{
	release:false
})
fis.match(lib+'*.*',{
	release:false
})

fis.media('hb').match('*.{css,js}',{
	useHash:true,
})
fis.media('hb').match('*.*',{
	release:'./trunk/$0'
})