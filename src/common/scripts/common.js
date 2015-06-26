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
console.log('get fontlist.');
		$('.contents').html('<ul class="font-list">');
console.log('before emit()');
		socket.emit('command', {'api':'getSystemFontList'});
	};


	$(window).load(function(){
		init();
	});

})(jQuery);