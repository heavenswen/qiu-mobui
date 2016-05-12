/*
 * 2016-04-15
 */
var name = 'qiu-mobui',
	css = '/css/*.css',
	js = '/js/*.js',
	re = false;

fis.match('::packager', {
	postpackager: fis.plugin('loader', {
		allInOne: true
	})
});

fis.match('*.{less,md}', {
	loaderLang: false,
	release: false
})

fis.match('fonts/*.{css,html}', {
	release: false
})

fis.match('fonts/*.{ttf,woff,svg,eot}', {
	release: '$0',
	url: '..$0'
}) 
fis.match('./dist/*', {
	release: false
})
/*合并*/
fis.match(css, {
	packTo: "/css/" + name + ".css",
})
fis.match(js, {
	packTo: '/js/' + name + '.js',
})
/*生成应用版*/
fis.media('dist').match('**', {
	deploy: [
		fis.plugin('skip-packed'),
		fis.plugin('local-deliver', {
			to: './dist/'
		})
	]
})
fis.media('dist').match('*.{png,gif,jpg,html,htm}', {
	release:false
})
fis.media('dist').match(js,{
	 optimizer: fis.plugin('uglify-js'),
	 release:'./js/'+name+'.min.js'
})
fis.media('dist').match(css,{
	 optimizer: fis.plugin('clean-css'),
	 release:'./css/'+name+'.min.css'
})
