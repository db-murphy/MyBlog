define(function (require, exports, module){

	//获取文章详细内容
	function showArticalDetail(json){
		$('.page-header h1').text(json.title);
		$('.page-body').html(json.content);
	};

	//获取回复列表
	function showAnswerList (arr){

		var arrHtml = []
			,i
			,len
			,innerHtml;

		for(i=0, len = arr.length; i<len; i++){
			arrHtml = arrHtml.concat([
				'<div class="media">',
				  '<a class="media-left" href="#">',
				    '<img data-src="holder.js/64x64" data-holder-rendered="true" src="../img/common/headPhoto.svg">',
				  '</a>',
				  '<div class="media-body">',
				    '<h4 class="media-heading">'+arr[i].title+'</h4>',
				    '<p>'+arr[i].content+'</p>',
				  '</div>',
				'</div>'
			]);
		};

		innerHtml = arrHtml.join('');
		$('#answer .panel-body').html(innerHtml);
	};

	module.exports = {
		showArticalDetail:showArticalDetail,
		showAnswerList:showAnswerList
	};
});