 /**
 * 这里是peizhi 
 */
var express=require("express");
var app=module.exports=express.createServer();
var fs=require("fs");
var __dirname=".";

app.configure(function(){
	app.set("view",__dirname+"/views");
	app.set("view engine","jade");
	//下面什么意思？
	//为什么一定要layout.jade
	//猜测 这个是用layout.jade
	app.use(express.bodyParser());
	//??
	app.use(express.methodOverride());
	//定义静态文件所在位置。
	app.use(express.static(__dirname+"/public"));
	//??
	app.use(app.router);
});
//开发模式？？
app.configure("development",function(){ 
	app.use(express.errorHandler({dumpException:true,showStack:true}));
	console.log("Warning:Server in Development Mode,add NODE_ENV=production",true);
});
//产品模式？？
app.configure("production",function(){
	app.use(express.errorHandler());
	console.log("Production Mode");
});

var info=JSON.parse(fs.readFileSync("content.json","utf-8"));
var routes=JSON.parse(fs.readFileSync("router.json","utf-8"));

var startRouter=function(path){
	app.get(route,function(req,res){
		//console.log("Connect to "+path);
		var page=info[routes[path].data];
		res.render(routes[path].template,page);
	});
};

for(route in routes){
	startRouter(route);
}

app.get("/*",function(req,res){
	res.render('404',{
		status:404,
		title:'404-文件未找到'
	});
});

try{
    //这里的监听和之前的是？Express Server和Http Server
	app.listen(54966);
	console.log("Express server listening on port 54966");
}catch(e){
	console.log("Error:"+e.message,1);
}
