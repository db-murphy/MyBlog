define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var common = require('module_common/common');
	
	/**
	*登陆请求
	**/
	function httpActive(send_msg,httpType,url,dataFormat,fnScc){
		common.https(send_msg,httpType,url,dataFormat,fnScc);
	};

	module.exports = {
		httpActive:httpActive	
	};
});