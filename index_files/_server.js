// --------------------------------------
// setup webserver
(function(exports){
	var fs = require('fs');
	var path = require('path');
	var fontManager = require('font-manager');
	var express = require('express'),
		app = express();

	var _port;
	var _pathDocumentRoot;


	function start(port, pathDocumentRoot, cb){
		var server = require('http').Server(app);

		// middleware
		app.use( express.static( pathDocumentRoot ) );

		// {$port}番ポートでLISTEN状態にする
		server.listen( port );

		var io = require('socket.io')(server);
		io.on('connection', function (socket) {
			console.log('Socket Connected.');
			socket.on('command', function (cmd) {
				var rtn = {};
				if( cmd.api == 'getSystemFontList' ){
					rtn = fontManager.getAvailableFontsSync();
				}
				socket.emit('result', rtn);
				return;
			});
		});

		cb();
	}// start();

	/**
	 * URLを取得
	 */
	exports.getUrl = function(){
		return 'http://127.0.0.1:'+_port+'/';
	}

	/**
	 * ポート番号を取得
	 */
	exports.getPort = function(){
		if( !_port ){
			_port = 8081;
		}
		return _port;
	}

	/**
	 * サーバーを起動
	 */
	exports.serverStandby = function( port, pathDocumentRoot, cb ){
		cb = cb||function(){};
		if( _port ){
			cb();
			return this;
		}

		_port = port;
		_pathDocumentRoot = pathDocumentRoot;
		start( this.getPort(), _pathDocumentRoot, cb );

		return this;
	}


})(exports);
