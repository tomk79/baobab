// common.js
window.focus();

window.main = new (function($){

	function init(){
		$('#mainform').submit(function(){
			window.main.showFontList();
		});
	}

	function windowResized(){
	}

	/**
	 * フォントリストを表示する
	 */
	this.showFontList = function(){
		$('.contents').html('<ul class="font-list">');
		socket.emit('command', {'api':'getSystemFontList'});
	};


	$(window).load(function(){
		init();
	});

})(jQuery);