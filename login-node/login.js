
let http = require('http'),
	fs = require('fs'),
	qs = require('querystring');

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

let info = {
	code:0,
	msg:'success'
}

http.createServer((req,res)=>{

	let url = req.url,
		obj = qs.parse(uel.split('?')[0]);

	//接口
	if(url.includes('?')){

		let d = sql.find(e=>e.user == obj.user);

		//用户名存在
		if(d.user){


		}else{  //用户名不存在

			info.code = 1;
			info.msg = '请输入用户名'

		}

	}else{  //静态文件

		fs.readFile('page/index.html',function(err,data){
			if(err){
				let data = fs.readFileSync('page/error.html');
				res.write(data);
			}else{
				res.write(data);
			}
			res.end();
		})

	}

})




