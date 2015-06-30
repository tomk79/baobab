/**
 * API: renderFontList
 */
window.main.apis.renderFontList = new (function(){

	this.run = function(cmd, socket, main){
		// console.log(cmd);
		var fontlist = cmd.fontlist;
		var template = twig({
			data: $('#template-fontlist-listitem').html()
		});

		var $ul = $('.font-list');
		$('.contents').append($ul);
		var sampleText = ''+$('#mainform input[name=sampleText]').val();
		Object.keys(fontlist).forEach(function (idx) {
			var data = fontlist[idx];
			data.sampleText = sampleText;
			if( !data.sampleText.length ){data.sampleText=data.originalData.family;}
			var $output = $(template.render({
				'font': data
			}));
			$output.find('.font-list__family a.font-list__btn-detail').click(function(){
				$(this).parent().parent().parent().find('.font-list__property').toggle('slow');
			});
			$output.find('.font-list__family a.font-list__btn-star').click(function(){
				var $this = $(this);
				var postscriptname = $this.parent().parent().parent().attr('data-postscriptname');
				if( !$this.hasClass('star__active') ){
					main.checkStar( postscriptname );
				}else{
					main.uncheckStar( postscriptname );
				}
			});
			$ul.append($output);
			// console.log(data);
		});

	}

})();