module.exports=new function(){this.run=function(t,n,o){var i={},s=require("font-manager").getAvailableFontsSync();i.api="renderFontList",o.loadFontDb(function(t){i.fontlist=t||{};for(var a in s){var e=s[a];i.fontlist[e.postscriptName]=i.fontlist[e.postscriptName]?i.fontlist[e.postscriptName]:{},i.fontlist[e.postscriptName].originalData=e}o.setFontDb(i.fontlist,function(){o.saveFontDb(function(){n.emit("command",i)})})})}};