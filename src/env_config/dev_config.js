module.exports = {
	port          :2017,
	domain        :'localhost',
	apiServer     :{
		domain:"http://123.56.177.106",
		port  :"8000",
		//domain:"http://192.168.1.242",
		//
		// domain:"http://localhost",
		// port:"3000",
		prefix:"/api/p"
	},
	OSS           :{
		bucket:"peapad-patriarch",
		region:'oss-cn-beijing'
	},
	"wechat"      :{
		"appid"    :"wxa0830b0addb020f4",
		"appdomain":"http://patriarch2.peapad.cn",
	},
	qiniuUploadUrl:"http://up-z1.qiniu.com",

};
