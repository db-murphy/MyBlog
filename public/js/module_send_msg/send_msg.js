define(function (require,exports,module){

	/**
	* 组装登陆请求数据
	**/
	function login_send_msg(){

		var user_name = $('#username').val();
        var pwd = $('#passwords').val();

        return {
        	username: user_name,
			password: pwd
        }

	};

	module.exports = {
		login_send_msg:login_send_msg
	};

});