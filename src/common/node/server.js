var fs = require('fs');
var path = require('path');
var fontManager = require('font-manager');
var express = require('express'),
	app = express();
var server = require('http').Server(app);

// middleware
app.use( express.static( __dirname+'/../../' ) );

// {$port}番ポートでLISTEN状態にする
server.listen( 8080 );

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



