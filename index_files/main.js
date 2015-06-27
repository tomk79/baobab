new (function($, window){
	window.main = this;
	var _this = this;
	window.focus();
	var _utils = require('./index_files/_utils.node.js');
	var _nw_gui = require('nw.gui');
	var php = require('phpjs');
	var path = require('path');
	var $mainFrame;
	var serverProc;
	var __dirname = (function() {
		if (document.currentScript) {
			return document.currentScript.src;
		} else {
			var scripts = document.getElementsByTagName('script'),
			script = scripts[scripts.length-1];
			if (script.src) {
				return script.src;
			}
		}
	})().replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');

	$(window).load(function(){

		(function(){
			// node-webkit の標準的なメニューを出す
			var win = _nw_gui.Window.get();
			var nativeMenuBar = new _nw_gui.Menu({ type: "menubar" });
			try {
				nativeMenuBar.createMacBuiltin( 'Baobab' );
				win.menu = nativeMenuBar;
			} catch (ex) {
				console.log(ex.message);
			}

		})();

		serverStart(30004, function(url){
			console.log('server stanbied!!!!');
			$mainFrame = $('<iframe>')
				.attr({'src':url})
			;
			$('body')
				.html($mainFrame)
			;
			windowResize();
		});

	});

	/**
	 * server start
	 */
	function serverStart(port, cb, retry){
		if(!retry){retry=0;}
		console.log('sever port: '+(port+retry));
		cb = cb || function(){};

		var script_path = './dist/common/node/server.js';
		if(!_utils.isFile(script_path)){
			console.log('ERROR: server script is NOT defined.');
			process.exit();
		}

		serverProc = require('child_process')
			.spawn(
				'node',
				[
					script_path,
					'port='+(port+retry)
				]
			)
		;
		serverProc.stdout.on('data', function(data){
			data = php.trim(data.toString());
			console.log(data);
			var message = '';
			if (data.match(new RegExp('^message\\:\s*(.*)$'))) {
				message = php.trim(RegExp.$1);
				console.log(message);
				switch(message){
					case 'server-standby':
						cb('http://127.0.0.1:'+(port+retry));
						break;
					default:
						console.log('unknown message.');
						break;
				}
			}else{
				console.log('no message.');
			}
		});
		serverProc.stderr.on('data', function(err){
			console.log('--- server error.');
			console.log(err.toString());
		});
		serverProc.on('close', function(code){
			retry ++;
			if(retry>10){
				console.log('ERROR: exit;');
				process.exit();
				return;
			}
			// if(serverProc.pid){
			// 	process.kill( serverProc.pid, 0 );
			// }
			console.log('retry.('+retry+')');
			setTimeout(function(){
				serverStart(port, cb, retry);
			}, 1000);
		});
		return _this;
	}

	function windowResize(){
		$mainFrame
			.css({
				'width':'100%',
				'height':$(window).innerHeight()-4
			})
		;
	}

	$(window).resize(function(){
		windowResize();
	});

	// _nw_gui.Window.get().on('close', function(e){
	// 	if(serverProc.pid){
	// 		process.kill( serverProc.pid, 0 );
	// 	}
	// 	// _nw_gui.Window.get().close();
	// 	// process.exit();
	// 	console.log( 'Window close;' );
	// });
	process.on( 'exit', function(e){
		if(serverProc.pid){
			process.kill( serverProc.pid, 0 );
		}
		console.log( 'Application exit;' );
	});
	process.on( 'uncaughtException', function(e){
		// alert('ERROR: Uncaught Exception');
		// console.log(e);
		// console.log('ERROR: Uncaught Exception');
	} );
	// process.on( 'SIGINT', function(e){
	// 	if(serverProc.pid){
	// 		process.kill( serverProc.pid, 0 );
	// 	}
	// 	console.log( 'SIGINT exit;' );
	// });

	return this;
})(jQuery, window);
