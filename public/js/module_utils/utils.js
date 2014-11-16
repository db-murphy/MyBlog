define(function (require,exports,module){
	/**               
	 * 时间戳转换日期.
	 * @param <int> unixTime 待时间戳(秒)
	 */
	function UnixToDate(unixTime) {
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += time.getFullYear() + "-";
		ymdhis += DealNum((time.getMonth()+1)) + "-";
		ymdhis += DealNum(time.getDate());
		ymdhis += " ";
		ymdhis += DealNum(time.getHours()) + ":";
		ymdhis += DealNum(time.getMinutes()) + ":";
		ymdhis += DealNum(time.getSeconds());
		return ymdhis;
	}

	/**
	 * 在小于10的正整数前面加0.
	 * @param <int> num 小于10的正整数.
	 */
	function DealNum(num){
		if(num < 10){
			num = "0" + num;
		}
		return num;
	}

	/**
	 * 将null、undefined等转换为''
	 * @param <string> str 字符串.
	 */
	function NullToStr(str){
		if(null == str || 'undefined' == str || typeof(str) == 'undefined'){
			str = "";
		}
		return str;
	}

	/**
	 * 截取字符串,对较长文本截取前len个字符返回,
	 * @param <string> str 字符串.
	 * @param <number> len 截取长度.默认20字符
	 */
	function SubStr(str,len){
		if(NullToStr(len)==""){
			len=20;
		}
		if(str.length>=len){
			return str.substr(0,len);
		}
		return str;
	}

	/**
	 * 获取文件后缀名
	 * @param <string> str 文件名.
	 */
	function GetFileExt(fileName) {
		var prefix = "";
		if (NullToStr(fileName) != "" || fileName.indexOf(".") > 0){
			prefix = fileName.substr(fileName.lastIndexOf(".")+1);
			prefix = prefix.toUpperCase();
		}
		return prefix;
	}
	/**
	 * 判断是否是URL
	 * @param <string> url URL地址.
	 * @returns <boolean>
	 */
	function IsURL(url){
		var strRegex = "^((https|http)?://)"  
		//+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
		+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
		+ "|" // 允许IP和DOMAIN（域名） 
		+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
	    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
		+ "[a-z]{2,6})" // first level domain- .com or .museum  
		+ "(:[0-9]{1,4})?" // 端口- :80  
		+ "((/?)|" // a slash isn't required if there is no file name  
		+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  
		var re=new RegExp(strRegex);  
		//re.test() 
		if (re.test(url)){ 
			return (true);  
		}else{
			return (false);  
		} 
	}
	/**
	 * 判断是否是可用的版本号
	 * @param v 需要检测的版本号
	 * @param maxV 目前最大版本号
	 * @returns {Boolean}
	 */
	function IsVersion(v, maxV) {
		var maxVArr = maxV.split(".");
		var vArr = v.split(".");
		var maxVArrLen = maxVArr.length;
		var vArrLen = vArr.length;
		// 判断.的位数 超过3个.和少于1个.的都排除
		if (vArrLen > 4 || vArrLen < 2) {
			return false;
		}
		// 判断每一位是否是数字切每一位取值范围
		for (var i = 0; i < vArrLen; i++) {
			var num = vArr[i];
			if (isNaN(num)) {
				return false;
			}
		}
		// 从左到右,判断每一位数字的大小.
		if (maxVArrLen >= vArrLen) {
			for (var i = 0; i < maxVArrLen; i++) {
				if (i < vArrLen && Number(maxVArr[i]) > Number(vArr[i])) {
					return false;
				} else if (i < vArrLen && Number(maxVArr[i]) < Number(vArr[i])) {
					return true;
				} else {
					if (i == (Number(maxVArrLen) - 1) && Number(maxVArr[i]) == Number(vArr[i])) {
						return false;
					}
					continue;
				}

			}
		}
		// 从左到右,判断每一位数字的大小.
		if (maxVArrLen < vArrLen) {
			for (var i = 0; i < vArrLen; i++) {
				if (i < maxVArrLen && Number(maxVArr[i]) > Number(vArr[i])) {
					return false;
				} else if (i < maxVArrLen && Number(maxVArr[i]) < Number(vArr[i])) {
					return true;
				} else {
					if(i >= maxVArrLen){
						return true;
					}
					continue;
				}
			}
		}
		return false;
	}

	/**
	 * 将元素显示效果 改变为 校验成功的样式.
	 * @param elementId <string> 元素ID
	 */
	function SuccessValidate(elementId){
		$("#text").next().remove();
		$("#text").parent().append('<img class="successImg" src="img/valid.png">');
		$("#text").addClass('valid').text('OK!').closest('.form-group').addClass('success').removeClass('error');
	}

	/**
	 * 将元素显示效果 改变为 校验失败的样式.
	 * @param elementId <string> 元素ID
	 */
	function ErrorValidate(elementId){
		ErrorInfo(elementId,"该名称已存在");
	}

	/**
	 * 将元素显示效果 改变为 校验失败的样式.
	 * @param elementId <string> 元素ID
	 * @param errorMsg <string> 错误显示信息
	 */
	function ErrorInfo(elementId,errorMsg){
		$("#text").next().remove();
		$("#text").parent().append('<label for="name" generated="true" class="error">'+errorMsg+'.</label>');
		$("#text").addClass('valid').text('OK!').closest('.form-group').addClass('error').removeClass('success');
	}

	/**
	 * 设置ajax的Loading是否出现
	 * @param bl <boolean> true/false
	 */
	function setLoad(bl){
		$("#loadingModalMes").attr("isShow",bl);
	};


	function cloneJson (json){
		var newJson = {}
			,attr;

		for(attr in json){
			newJson[attr] = json[attr];
		};

		return newJson;
	};
	module.exports = {

		setLoad:setLoad,
		ErrorInfo:ErrorInfo,
		NullToStr:NullToStr,
		cloneJson:cloneJson
		
	};
});





