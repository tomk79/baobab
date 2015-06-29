/**
 * API: getSystemFontList
 */
module.exports = new (function(){

	this.run = function( cmd, socket ){
		var rtn = {};
		rtn.api = 'renderFontList';
		rtn.fontlist = require('font-manager').getAvailableFontsSync();
		socket.emit('command', rtn);
	}

})();
