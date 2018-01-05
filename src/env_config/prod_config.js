module.exports = {
	port          :8080,
	domain        :'127.0.0.1/',
	apiServer     :{
		// domain: "http://123.56.177.106",
		domain:"http://api.peapad.com.cn",
		port  :"80",
		prefix:"/api/p"
	},
	OSS           :{
		bucket:"peapad-patriarch",
		region:'oss-cn-beijing'
	},
	"wechat"      :{
		"appid"    :"wxfc91deb9ca8920c5",
		"appdomain":"http://patriarch.peapad.com.cn",
	},
	qiniuUploadUrl:"http://up-z1.qiniu.com",

};
