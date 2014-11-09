define(function (require,exports,module){

	/**
	* 组装发表文章参数
	**/
	function push_artical__msg(){

		var sTitle = $('#articleTitle').val();
		var sContent = $('#textareaInput').val();
		var oSelect = $('#arcicleType').get(0);
		var sType = oSelect.options[oSelect.selectedIndex].getAttribute('type');

		if(!sTitle || !sContent){
			alert('必填信息不能为空');
			return false;
		};

        return {
        	title: sTitle,
			content: sContent,
			type:sType
        }

	};

	module.exports = {
		push_artical__msg:push_artical__msg
	};

});