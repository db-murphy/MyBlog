define(function (require, exports, module){

	function showArticalList(arr){
		if(arr.length){
			var htmlArr = [];

			for(var i=0; i<arr.length; i++){
				var htmlNow = [
					'<div class="panel panel-default">',
					  '<div class="panel-heading"><a href="javascript:;">'+arr[i].title+'</a></div>',
					  '<div class="panel-body">',
					    '<p>'+arr[i].content+'</p>',
					  '</div>',
					'</div>'
				];

				var html = htmlNow.join('');
				htmlArr.push(html);
			};

			$('.articleBox').html(htmlArr.join(''));
		}else{
			$('#alertMsg').removeClass('displayHidden').addClass('displayShow');
		};
	};

	module.exports = {
		showArticalList:showArticalList
	};
});