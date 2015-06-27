var fs = require('fs');
var path = require('path');
var fontManager = require('font-manager');
var express = require('express'),
	app = express();
var server = require('http').Server(app);

// オプションを整理
var options = (function(){
	var rtn = {};
	for( var idx = 0; process.argv.length > idx; idx ++ ){
		if(process.argv[idx].match(new RegExp('^(.*?)\=(.*)$'))){
			rtn[RegExp.$1] = RegExp.$2;
		}
	}
	return rtn;
})();

// console.log(process.argv);
var _port = options['port'];
if(!_port){_port = 8081}
console.log('port number is '+_port);

// middleware
app.use( express.static( __dirname+'/../../' ) );

// {$port}番ポートでLISTEN状態にする
server.listen( _port );

var io = require('socket.io')(server);
io.on('connection', function (socket) {
	// console.log('Socket Connected.');
	socket.on('command', function (cmd) {
		var rtn = {};
		if( cmd.api == 'getSystemFontList' ){
			rtn = fontManager.getAvailableFontsSync();
		}
		socket.emit('result', rtn);
		return;
	});
});


console.log('message: server-standby');

