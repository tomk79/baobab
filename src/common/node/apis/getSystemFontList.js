/**
 * API: getSystemFontList
 */
module.exports = new (function(){

	this.run = function( cmd, socket, main ){
		var rtn = {};
		var fontlist = require('font-manager').getAvailableFontsSync();
		rtn.api = 'renderFontList';
		main.getFontDb(function(db){
			rtn.fontlist = db||{};
			for(var idx in fontlist){
				var font = fontlist[idx];
				// console.log(rtn);
				rtn.fontlist[font.postscriptName] = (rtn.fontlist[font.postscriptName]?rtn.fontlist[font.postscriptName]:{});
				rtn.fontlist[font.postscriptName].originalData = font;
			}
			socket.emit('command', rtn);
		});
	}

})();
