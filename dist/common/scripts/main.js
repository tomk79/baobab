window.main=new function(t){function n(){window.focus(),i=io.connect("http://"+window.location.host),i.on("command",function(t){t=t||{},t.api=t.api||"",window.main.apis[t.api]&&window.main.apis[t.api].run(t,i,window.main)}),t("#mainform").submit(function(){window.main.showFontList()})}{var i;!function(){var t=function(){if(document.currentScript)return document.currentScript.src;var t=document.getElementsByTagName("script"),n=t[t.length-1];return n.src?n.src:void 0}();return t=t.replace(/\\/g,"/").replace(/\/[^\/]*\/?$/,"")}()}this.apis=new function(){},this.showFontList=function(){t(".contents").html('<ul class="font-list">'),i.emit("command",{api:"getSystemFontList"})},this.checkStar=function(n){t("li[data-postscriptname="+n+"] .font-list__btn-star").removeClass("star__active").addClass("star__active"),i.emit("command",{api:"checkStar",postscriptName:n})},this.uncheckStar=function(n){t("li[data-postscriptname="+n+"] .font-list__btn-star").removeClass("star__active"),i.emit("command",{api:"uncheckStar",postscriptName:n})},t(window).load(function(){n()})}(jQuery),window.main.apis.renderFontList=new function(){this.run=function(t,n,i){var a=t.fontlist,e=twig({data:$("#template-fontlist-listitem").html()}),o=$(".font-list");$(".contents").append(o);var s=""+$("#mainform input[name=sampleText]").val();Object.keys(a).forEach(function(t){var n=a[t];n.sampleText=s,n.sampleText.length||(n.sampleText=n.originalData.family);var c=$(e.render({font:n}));c.find(".font-list__family a.font-list__btn-detail").click(function(){$(this).parent().parent().parent().find(".font-list__property").toggle("slow")}),c.find(".font-list__family a.font-list__btn-star").click(function(){var t=$(this),n=t.parent().parent().parent().attr("data-postscriptname");t.hasClass("star__active")?i.uncheckStar(n):i.checkStar(n)}),o.append(c)})}};