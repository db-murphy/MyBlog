define(function (require,exports,module){

	/**
	 *引入依赖模块
	 */
	var common = require('module_common/common');
	var M = require('module_msg/Model');
	var V = require('./blog_css_V');
	var oVariables = require('module_variables/variables');

	function getCssArticleList(){
		M.httpActive({
			page:1,
			type:'cssForm'
		},'POST',oVariables.httpPort.cssGetListUrl,'json',function(data){
			V.showCssArticalList(data.msg);
		});
	};

	module.exports = {
		getCssArticleList:getCssArticleList
	}

});