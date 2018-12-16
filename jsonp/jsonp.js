function jsonp(obj){

	return new Promise(function(resolve,reject){
		//默认配置
		let opt = {
			url:'',
			data:{},
			callback:'callback'
		}

		//有配置走配置，无配置走默认
		Object.assign(opt,obj);

		//回调函数名字设置为随机，以防与全局（window）下其他的函数名重复
		let fn = 'jQuery' + '_' + Date.now() + '_' + Math.random();
		
		fn = fn.replace('.',''); //去小数点

		//请求超时
		opt[fn] = setTimeout(function(){
			reject('请求超时');
		},20000)

		//请求数据
		window[fn] = function(data){
			clearTimeout(opt[fn]);
			resolve(data);
		}

		//存放查询信息
		let arr = [];

		//在opt上加一个属性为 opt.callback的值，并且将函数名字赋值给它，使得data中有callback的值
		opt.data[opt.callback] = fn;

		//遍历opt.data的时候可以遍历到查询信息和回调函数，得到类似这种效果(aa=123&bb=ff&callback=fn);
		for( let attr of Object.keys(opt.data) ){
			arr.push( attr + '=' + opt.data[attr] );
		}
		opt.data = arr.join('&');

		//创建script
		let scri = document.createElement('script');

		//src赋值
		scri.src = opt.url + '?' + opt.data;

		//添加到head中
		document.getElementsByTagName('head')[0].appendChild(scri);

		//删除script。如果不删除，则每次点击都会创建一个script标签，页面中引入的script会越来越多
		scri.remove();
	
	})

}