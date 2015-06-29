/**
 * API: renderFontList
 */
window.main.apis.renderFontList = new (function(){

	this.run = function(cmd, socket){
		var fontlist = cmd.fontlist;
		var template = twig({
			data: $('#template-fontlist-listitem').html()
		});

		var $ul = $('.font-list');
		$('.contents').append($ul);
		var sampleText = ''+$('#mainform input[name=sampleText]').val();
		for (var idx in fontlist) {
			var data = fontlist[idx];
			data.sampleText = sampleText;
			if( !data.sampleText.length ){data.sampleText=data.family;}
			var $output = $(template.render({
				'font': data
			}));
			$output.find('.font-list__family a').click(function(){
				$(this).parent().parent().parent().find('.font-list__property').toggle();
			});
			$ul.append($output);
			// console.log(data);
		}

	}

})();