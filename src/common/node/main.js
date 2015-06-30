/**
 * main.js
 */
module.exports = new (function(){
	var fs = require('fs');
	var desktopUtils = require('desktop-utils');
	var appName = 'baobab';

	/**
	 * データディレクトリを初期化する
	 */
	this.initDataDir = function(){
		var localDataDir = this.getLocalDataDir();
		if( !fs.existsSync(localDataDir) ){
			var res = fs.mkdirSync(localDataDir);
		}
		if( !fs.existsSync(localDataDir) ){
			return false;
		}
		return true;
	}

	/**
	 * データディレクトリのパスを取得する
	 */
	this.getLocalDataDir = function(){
		return desktopUtils.getLocalDataDir(appName);
	}
	this.open = desktopUtils.open;

	/**
	 * フォントDB(JSON)の内容を取得する
	 */
	this.getFontDb = function(cb){
		if(!this.initDataDir()){
			cb(false);
			return this;
		}
		var localDataDir = this.getLocalDataDir();
		var dbPath = localDataDir+'/db.json';
		if( !fs.existsSync(dbPath) ){
			cb({});
			return this;
		}
		var rtn = require(dbPath);
		cb(rtn);
		return this;
	}

})();