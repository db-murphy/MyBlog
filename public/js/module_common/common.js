define(function (require,exports,module){
	/**
	* 依赖模块
	**/
	var variables = require('module_variables/variables.js');
	var utils = require('module_utils/utils.js');

	/**
	 * ajax全局拦截
	 */
	$.ajaxSetup({
		timeout : 3000,
		global : true,
		async: true,
		error : function(xhr, status, e) {
			//showAlert('请求出错','','');
		},
		complete : function(xhr, status) {
			// 隐藏Loading框
			hideLoading();
		},
		beforeSend : function(request) {

			/*var tokenId = window.sessionStorage.getItem('TOKENID');
			if (utils.NullToStr(tokenId) == "") {
				var url = window.location.href;
				if(url.indexOf("login.html")<0){
					window.location.href = "../login.html";
				}			
			}
			request.setRequestHeader('TOKENID', tokenId);
			// 显示Loading框
			var divList = $(".modal-backdrop");
			if(divList.length<=0){
				showLoading();
				var bl = $("#loadingModalMes").attr("isShow");
				if(Boolean(bl) && bl!="false"){
					// 显示Loading框
				}
			};*/
		},
		success : function(data, textStatus, jqXHR) {
			verification(data, textStatus, jqXHR);
		}
	});

	/**
	 * 显示alert提示框
	 * @param content 弹出框显示的内容
	 */
	function showAlert(content,url,event){
		$("#id_windowDiv").remove();
		createWindow(url,event);
		$("#id_window_title").html("提示:");
		$("#id_window_content").html(content);
		$('#id_window').modal('show');
		console.log(url);
	}

	/**
	 * 创建提示框Confirm和Alert的DIV标签,并且追加到页面最下方
	 */
	function createWindow(url, event) {
		var windowDiv = '<div id="id_windowDiv">'+
			'<div class="modal fade" id="id_window" tabindex="-1" role="dialog" aria-hidden="true">'+
				   '<div class="modal-dialog">'+
				      '<div class="modal-content" style="width:400px;margin-left:30%;">'+
				         '<div class="modal-header">'+
				            '<h4 class="modal-title" id="id_window_title" style="font-size:12px;"></h4>'+
				         '</div>'+
				         '<div class="modal-body" id="id_window_content" style="height:30px;font-size:16px;"></div>'+
				         '<div class="modal-footer" id="id_window_footer" style="height:50px;">';
						if(url != '' || event != ''){
							windowDiv += '<button type="button" class="btn" data-dismiss="modal" id="id_window_closeBtn" onclick="returnUrl('+url+',\''+event+'\')" style="margin-top:-10px;">关闭</button>';
						}else{
							windowDiv += '<button type="button" class="btn" data-dismiss="modal" id="id_window_closeBtn" style="margin-top:-10px;">关闭</button>';
						}
				           
						windowDiv += '</div>'+
				      '</div>'+
				   '</div>'+
			'</div></div>';
		$(document.body).append(windowDiv);
	}

	/**
	*封装http请求
	**/
	function https(json,httpType,url,dataFormat,fnScc){
		
		$.ajax({
			type: httpType,
			url: variables.BasePath + url,
			dataType: dataFormat,
			data: json,
			success: function(data){
				fnScc&&fnScc(data);
			}
		});
	};

	/**
	 * 创建Loading的DIV标签,并且追加到页面最下方
	 */
	function createLoadingDiv(){
		$(document.body).append(variables.htmlJson.loddingHtmlArr.join(''));
	};

	/**
	 * 显示Loading
	 */
	function showLoading() {
		$("#loadingModalMes").modal('show');
	}

	/**
	 * 隐藏Loading
	 */
	function hideLoading() {
		$("#loadingModalMes").modal('hide');
	}

	/**
	 * 获取URL参数
	 */
	function getUrlParam(param) {
		var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
		var url = window.location.search.substr(1).match(reg);
		if (url != null)
			return decodeURIComponent(url[2]);
		return null;
	};

	function gotoUrl(id, url) {
		location.href = url + "?mid=" + id;
	};

	/**
	 * 创建顶部导航栏
	**/
	function create_header(bolean){
		var html1 = variables.menuhtmlJson.header1Arr.join('');
		var html2 = createMainList(variables.menuJson,bolean);
		var html3 = variables.menuhtmlJson.header2Arr.join('');
		var html4 = createMainList(variables.userMenu);
		var html5 = variables.menuhtmlJson.header3Arr.join('');
		var new_html = html1 + html2 + html5;

		$('#pageWrap').prepend(new_html);
	};

	/**
	 * 生成导航栏主菜单html
	**/
	function createMainList(arr,bolean){
		var newHtmlArr = [];
		var newHtml = '';

		for(var i=0; i<arr.length; i++){
			if(arr[i].class == 'divider'){
				newHtml = '<li class="'+arr[i].class+'">'+arr[i].text+'</li>';
			}else{
				if(bolean){
					newHtml = '<li class="'+arr[i].class+'"><a href="html/'+arr[i].url+'">'+arr[i].text+'</a></li>';
				}else{
					newHtml = '<li class="'+arr[i].class+'"><a href="'+arr[i].url+'">'+arr[i].text+'</a></li>';
				};
				
			};
			newHtmlArr.push(newHtml);
		};
		return newHtmlArr.join('');
	};

	/**
	 * 根据url的hash值来确定当前处在那个模块
	**/
	function resertMenu(){
		var hashNow = window.location.hash.substring(1);

		for(var i=0; i<variables.menuJson.length; i++){
			variables.menuJson[i].class = '';
			if(variables.menuJson[i].id == hashNow){
				variables.menuJson[i].class = 'active';
			};
		};
	};

	/**
	 * 生成页脚
	**/
	function create_footer(bolean) {
		var html = variables.menuhtmlJson.footerHtml.join('');
		$('#pageWrap').append(html);
		if(bolean){
			$('.bs-footer').addClass('footer-absolute');
		};
	};

	/**
	* 赋值用户名
	**/
	function valuationUsername() {
		var userName = window.sessionStorage.getItem('username');
		if(!userName){
			userName = '暂无';
		};
		$(".user_name").text(userName);
	};

	/**
	 * 校验 登陆,超时 等 其他需要预先处理的事情
	 */
	function verification(data, textStatus, jqXHR) {
		if (data == -999) {
			alert('未登陆或登陆超时');
			window.location.href = '../login.html';
		}
	}

	/**
	* 接口导出
	**/
	module.exports = {

		create_header:create_header,
		create_footer:create_footer,
		showLoading:showLoading,
		createLoadingDiv:createLoadingDiv,
		https:https,
		resertMenu:resertMenu,
		valuationUsername:valuationUsername
		
	};

});