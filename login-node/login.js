
//加载（引入）模块
let http = require('http'),
	fs = require('fs'),
	qs = require('querystring');

//数据
let sql = [
	{
		user:'aa',
		pw:1
	},
	{
		user:'bb',
		pw:1
	},
	{
		user:'cc',
		pw:1
	}
];

//后台返回到前端的数据
let info = {
	code:0,
	msg:'success'
}

//创建一个http服务器
http.createServer((req,res)=>{

	//请求的地址
	let url = req.url;

	//接口
	if(url.includes('?')){

		//获取由?切割 得到的 接口信息
		let arr = url.split('?');
		let obj = qs.parse(url.split('?')[1]);

		//登录
		if(arr[0] === '/login'){

			//用户名存在
			if(obj.user && obj.pw && /^[A-Za-z]\w{1,7}/.test(obj.user) ){

				let u = sql.find(e=>e.user == obj.user);

				//有效的用户名
				if(u){
					
					//密码正确
					if(u.pw == obj.pw){

						info.code = 0;
						info.msg = '登录成功';

					}else{  //密码不正确

						info.code = 3;
						info.msg = '密码不正确';

					}

				}else{  //此用户名不存在

					info.code = 2;
					info.msg = '此用户名不存在';

				}

				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});

			}else{  //用户名或密码未输入

				info.code = 1;
				info.msg = '请输入用户名或密码';

				res.writeHead(400,{'Content-Type':'text/html; charset=utf-8'});

			}
			res.write(JSON.stringify(info));
			res.end();
		}

	}else{  //静态文件

		if( url === '/' ) url = '/index.html';   //page/index.html

		//读取页面 page目录下的文件
		fs.readFile('./page'+url,function(err,data){

			//找不到文件，跳转至404页面
			if(err){

				let data = fs.readFileSync('page/error.html');
				res.write(data);

			}else{  //找到文件读取文件

				res.write(data);

			}

			//结束响应
			res.end();

		})

	}

}).listen(80);  //端口号必写




