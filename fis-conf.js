/*
 * 2016-04-15
 */
var name ='qiu-mobui',
	css = '/css/*.css',
	js = '/js/*.js';
	

fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
fis.match('**', {
  deploy: [
    fis.plugin('skip-packed'),

    fis.plugin('local-deliver', {
      to: 'lib'
    })
  ]
})
fis.match('*.{less,md,png,gif,jpg,html,htm}',{
	loaderLang: false,
	release:false
})
fis.match('lib/*.*',{
	loaderLang: false,
	release:false
})
fis.match('fonts/*.{css,html}',{
	loaderLang: false,
	release:false
})
fis.match('fonts/*.{ttf,woff,svg,eot}',{
	release:'$0',
	url:'..$0'
})
fis.match(css,{
	packTo:"./css/"+name+".css",
	url:'.$0'
})
fis.match(js,{
	packTo:'./js/'+name+'.js',
	url:'.$0'
})

/*hb ide*/
fis.media('hb').match('*.{css,js}',{
	useHash:true,
})
fis.media('hb').match('*.*',{
	release:'./trunk/$0'
})