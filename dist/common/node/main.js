module.exports=new function(){var t=require("fs"),i=require("desktop-utils"),n="baobab",r={};this.initDataDir=function(){var i=this.getLocalDataDir();return(t.existsSync(i)||t.mkdirSync(i))&&t.existsSync(i)?!0:!1},this.getLocalDataDir=function(){return i.getLocalDataDir(n)},this.open=i.open,this.getFontDb=function(t){return t=t||function(){},t(r),this},this.setFontDb=function(t,i){return i=i||function(){},r=t,i(!0),this},this.loadFontDb=function(i){if(i=i||function(){},!this.initDataDir())return i(!1),this;var n=this.getLocalDataDir(),s=n+"/db.json";return t.existsSync(s)?(r=require(s),i(r),this):(i({}),this)},this.saveFontDb=function(i){if(i=i||function(){},!this.initDataDir())return i(!1),this;var n=this.getLocalDataDir(),s=n+"/db.json";return t.writeFile(s,JSON.stringify(r,null,1),function(t){i(!t)}),this}};