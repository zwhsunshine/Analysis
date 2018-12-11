function ajax(json){

	//默认配置
	let opt = {
		url:'',
		data:{},
		method:'get',
		type:'json',
		setTime:8000,
		success(){},
		error(){},
		timeout(){}
	}

	//有配置走配置，没配置走默认
	Object.assign(opt,json);

	//创建ajax对象
	let xhr = new XMLHttpRequest;

	//请求方式为get
	if( opt.method === 'get' ){

		//请求
		xhr.open('get',opt.url + '?' + queryString(opt.data,true));
		
		//等待响应
		xhr.onreadystatechange = ready;

		//发送
		xhr.send();
		
	}

	//请求方式为post
	if( opt.method === 'post' ){

		//请求
		xhr.open('post',opt.url);

		//等待响应
		xhr.onreadystatechange = ready;
		
		//请求头
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		//发送
		xhr.send(queryString(opt.data));

	}

	//请求后，等待响应
	function ready(){
		
		//请求已完成，且响应已就绪
		if( xhr.readyState === 4 ){

			//请求完成并不代表成功：状态码为200-307为请求数据成功
			if( xhr.status >= 200 && xhr.status <=307 ){
				
				//不同数据格式
				switch(opt.type){
					case 'json':
						opt.success(eval( '(' + xhr.responseText + ')' ));
						break;
					case 'xml':
						opt.success( xhr.responseXML );
						break;
					default:
						opt.success( xhr.responseText );
						break;
				}

			}

			//请求数据失败
			else{
				opt.error({code:xhr.status});
			}
		}
	}

	//请求超时
	xhr.timeout = opt.setTime;
	xhr.ontimeout = function(){
		console.log('请求超时');
	}

}


//ajax中的data含有我们请求时要查询的信息，所以要把data中的数据改为 key=val&key=val 格式，放到url上使用
function queryString(data,onOff){
	
	//参数data为对象，格式为 {a:12,b:23}

	//循环data之后，在arr中push数据，格式为 ['a=1','b=2']
	let arr = [];
	for(let attr in data){
		arr.push( attr + '=' + ( onOff ? encodeURI(data[attr]) : data[attr] ) );
	}

	//返回数据，格式为 a=12&b=23
	return arr.join('&');

}


