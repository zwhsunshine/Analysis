function jsonp(obj){

	return new Promise(function(resolve,reject){
		//默认配置
		let opt = {
			url:'',
			data:{},
			callback:('jQuery'+Date.now()+'_'+Math.random()).replace('.','')
		}

		//有配置走配置，无配置走默认
		Object.assign(opt,obj);

		//回调函数名字设置为随机，以防与全局（window）下其他的函数名重复
		let fn = opt.callback;
		
		//请求超时
		if(window.onOff === undefined) window.onOff = false;
		if(window.onOff === false){
			window.onOff = true;
			opt[fn] = setTimeout(function(){
				reject('请求超时');
			},10000)
		}
		

		//请求数据
		window[fn] = function(data){
			clearTimeout(opt[fn]);
			delete window[fn];
			window.onOff = false;
			resolve(data);
		}


		//在opt上加一个属性为 opt.callback的值，并且将函数名字赋值给它，使得data中有callback的值
		opt.data[opt.callback] = fn;

		//以下有两种方法：用于把对象转成 a=1&b=f&c=g 这种格式的

			//第一种方法：
			/*
				//存放查询信息
				let arr = [];

				//遍历opt.data的时候可以遍历到查询信息和回调函数，得到类似这种效果(aa=123&bb=ff&callback=fn);
				for( let attr of Object.keys(opt.data) ){
					arr.push( attr + '=' + opt.data[attr] );
				}
				opt.data = arr.join('&');
			*/

		//第二种方法：
		opt.data = new URLSearchParams(opt.data).toString();

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