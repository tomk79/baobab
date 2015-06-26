new (function($, window){
	window.main = this;
	window.focus();
	var _utils = require('./index_files/_utils.node.js');
	var _nw_gui = require('nw.gui');
	var $mainFrame;

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

		require('child_process').spawn('node',['./dist/common/node/server.js']);

		setTimeout(function(){
			$mainFrame = $('<iframe>')
				.attr({'src':'http://127.0.0.1:8080/'})
			;
			$('body')
				.html($mainFrame)
			;
			windowResize();
		}, 500);

	});

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

	return this;
})(jQuery, window);
