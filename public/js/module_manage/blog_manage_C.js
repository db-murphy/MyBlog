define(function (require, exports, module){

	/**
	 *依赖模块
	 */
	var send_msg = require('module_send_msg/send_msg');
	var HTTP = require('module_msg/Model');
	var oVariables = require('module_variables/variables')

	function formSubmit(){

		$('#formBox').submit(function(){

			var send_json = send_msg.push_artical__msg();

			if(!send_json){
				return;
			};

			HTTP.httpActive(send_json,'POST',oVariables.httpPort.setArticleListUrl,'json',function(data){
				if(data.code == 0){
					alert('发表成功');
				}else{
					alert(data.msg);
				};
			});

			return false;
		});
	};

	module.exports = {
		formSubmit:formSubmit
	};
});