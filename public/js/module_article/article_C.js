define(function (require, exports, module){

	/**
	 *引入依赖模块
	 */
	var common = require('module_common/common');
	var M = require('module_msg/Model');
	var V = require('./article_V');
	var oVariables = require('module_variables/variables');
	var pageType = $('#pageWrap').attr('htmlType');

	function getArticleList(){

		M.httpActive({
			page:1,
			type:pageType
		},'POST',oVariables.httpPort.getArticleListUrl,'json',function(data){
			V.showArticalList(data.msg);
		});
	};

	module.exports = {
		getArticleList:getArticleList
	};

});