//TODO login ��¼�Ŀ�


//TODO ��������
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

//TODO ת��Ƶ��


//TODO ���춯��Ч�� ������