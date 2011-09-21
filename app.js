 /**
 * ������peizhi 
 */
var express=require("express");
var app=module.exports=express.createServer();
var fs=require("fs");
var __dirname=".";

app.configure(function(){
	app.set("view",__dirname+"/views");
	app.set("view engine","jade");
	//����ʲô��˼��
	//Ϊʲôһ��Ҫlayout.jade
	//�²� �������layout.jade
	app.use(express.bodyParser());
	//??
	app.use(express.methodOverride());
	//���徲̬�ļ�����λ�á�
	app.use(express.static(__dirname+"/public"));
	//??
	app.use(app.router);
});
//����ģʽ����
app.configure("development",function(){ 
	app.use(express.errorHandler({dumpException:true,showStack:true}));
	console.log("Warning:Server in Development Mode,add NODE_ENV=production",true);
});
//��Ʒģʽ����
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
		title:'404-�ļ�δ�ҵ�'
	});
});

try{
    //����ļ�����֮ǰ���ǣ�Express Server��Http Server
	app.listen(54966);
	console.log("Express server listening on port 54966");
}catch(e){
	console.log("Error:"+e.message,1);
}
