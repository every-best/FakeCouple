//TODO login 登录的框


//TODO 聊天主体
log=function(msg){
	console.log(msg);
};

var url="ws://localhost:8000/";
var ws=new WebSocket(url);
ws.onopen=function(){
	log("open");
	ws.send("");
};
ws.onmessage=function(e){
	log(e.data);
};
ws.onclose=function(e){
	log("closed");
}

//TODO 转换频道


//TODO 聊天动画效果 鲸鱼体