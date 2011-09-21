/**
 * 这里需要开启两个服务器，一个是HTTP服务器。一个是websocket 服务器
 * websocket 服务器如何和HTTP服务器合作。
 */

var express = require('express');
var offical = require('./app.js');

var site_vhosts=[],vhosts;

/** Virtual Hosts
site_vhosts.push(express.vhost('chat.com',offical));
site_vhosts.push(express.vhost('www.chat.com',offical));

vhost=express.createServer.apply(this,site_vhosts);

vhost.listen(80);
console.log("Express router Listening on port 80");*/

//开启ws服务器
 var sys=require("sys");
 var ws=require("./node_modules/websocket-server/lib/ws/server");
 
 var server=ws.createServer({debug:true});
 
 server.addListener("connection",function(conn){
 	conn.send("Connection:"+conn.id);
 	
 	conn.addListener("message",function(message){
 		conn.broadcast("<"+conn.id+">"+message);
 		
 		if(message == "error"){
 			conn.emit("error","test");
 		}
 	});
 });
 
 server.addListener("error",function(){
 	console.log(Array.prototype.join.call(arguments,","));
 });
 
 server.addListener("disconnected",function(conn){
 	server.broadcast("<"+conn.id+"> disconnected");
 });
 
 server.listen(8000);
 console.log("websocket-server Listening on port 8000");