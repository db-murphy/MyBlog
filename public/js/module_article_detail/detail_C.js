define(function (require, exports, module){

	/**
	 *引入依赖模块
	 */
	var common = require('module_common/common');
	var M = require('module_msg/Model');
	var V = require('./detail_V');
	var oVariables = require('module_variables/variables');

	//获取文章详情
	function getArticleDetail(){

		//通过url获取参数
		var parameter = window.location.href.split('?')[1];
		var articalId = parameter.split('&')[0];
		var formType = parameter.split('&')[1];

		M.httpActive({
			id:articalId,
			type:formType
		},'POST',oVariables.httpPort.getArticleDetailUrl,'json',function(data){
			V.showArticalDetail(data.msg);
		});
	};

	//回复
	function setAnswer (){
		var parameter = window.location.href.split('?')[1];
		var articalId = parameter.split('&')[0];

		$('#anserForm').submit(function(){
			var nickerName = $('#nickerName').val();
			var answerContent = $('#answerContent').val();

			M.httpActive({
				answerId:articalId,
				title:nickerName,
				content:answerContent
			},'POST',oVariables.httpPort.setAnswerUrl,'json',function(data){
				//V.showArticalDetail(data.msg);
				alert('成功');
			});
			return false;
		});
	};

	//获取回复列表
	function getAnswerList (){
		var parameter = window.location.href.split('?')[1];
		var articalId = parameter.split('&')[0];

		M.httpActive({
			id:articalId
		},'POST',oVariables.httpPort.getAnswerUrl,'json',function(data){
			V.showAnswerList(data.msg);
		});
	};

	module.exports = {
		getArticleDetail:getArticleDetail,
		setAnswer:setAnswer,
		getAnswerList:getAnswerList
	};

});