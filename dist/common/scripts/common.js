window.focus(),window.main=new function(n){function t(){n("#mainform").submit(function(){window.main.showFontList()})}this.showFontList=function(){n(".contents").html('<ul class="font-list">'),socket.emit("command",{api:"getSystemFontList"})},n(window).load(function(){t()})}(jQuery);