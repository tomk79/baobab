var fs=require("fs"),path=require("path"),express=require("express"),app=express(),server=require("http").Server(app),main=require(__dirname+"/../node/main.js"),options=function(){for(var e={},r=0;process.argv.length>r;r++)process.argv[r].match(new RegExp("^(.*?)=(.*)$"))&&(e[RegExp.$1]=RegExp.$2);return e}(),_port=options.port;_port||(_port=8081),console.log("port number is "+_port),app.use(express["static"](__dirname+"/../../")),server.listen(_port,function(){console.log("message: server-standby")});var io=require("socket.io")(server);io.on("connection",function(e){e.on("command",function(r){r=r||{},r.api=r.api||"";r.api.replace(new RegExp("[^a-zA-Z0-9\\_\\-]+","g"),"");if(fs.existsSync(__dirname+"/apis/"+r.api+".js")){console.log(r);var s=require(__dirname+"/apis/"+r.api+".js");s.run(r,e,main)}})});