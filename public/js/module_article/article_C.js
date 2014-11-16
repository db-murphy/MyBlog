define(function (require, exports, module){

	/**
	 *引入依赖模块
	 */
	var common = require('module_common/common');
	var M = require('module_msg/Model');
	var V = require('./article_V');
	var util = require('module_utils/utils');
	var oVariables = require('module_variables/variables');
	var pageType = $('#pageWrap').attr('htmlType');

	//开始获取所有项目列表
	var send_msg = {
		page:1,
		type:pageType
	};

	function getArticleList(){

		M.httpActive(send_msg,'POST',oVariables.httpPort.getArticleListUrl,'json',function(data){
			V.showArticalList(data,function(articalTotalCount){
				//取完列表之后，跟新翻页状态信息
				if(articalTotalCount){
					updateListMsg(send_msg.page,articalTotalCount);
				}else{
					$('.paginationBox').css('display','none');
				};
				
			});
		});

		//点击翻页按钮
		$('#pageWrap').click(function(ev){
			var oTarget = $(ev.target);
			var clickLi = oTarget.closest('li')
		
			//如果按钮不可点击
			if(clickLi.hasClass('disabled')){
				return;
			};

			//clone对象
			var want_msg = util.cloneJson(send_msg);

			if(clickLi.hasClass('backBtn')){
				want_msg.page--;
			}else{
				want_msg.page++;
			};

			M.httpActive(want_msg,'POST',oVariables.httpPort.getArticleListUrl,'json',function(data){
				V.showArticalList(data,function(articalTotalCount){
					//取完列表之后，跟新翻页状态信息
					updateListMsg(want_msg.page,articalTotalCount);
				});
			});

		});
	};

	//创建翻页按钮
	function createPageBtn (){
		var htmlArr
			,html;

		htmlArr = [
			'<div class="paginationBox row-fluid">',
				'<nav align="center">',
				  '<ul class="pagination">',
				    '<li class="backBtn"><a href="#">&laquo;</a></li>',
					'<li class="fowrdBtn"><a href="#">&raquo;</a></li>',
				  '</ul>',
				'</nav>',
				'<div class="row">',
					'<p align="center">第<span class="pageNow">2</span>页</p>',
					'<p align="center">共<span class="pageTotal">2</span>页</p>',
				'</div>',
			'</div>'
		];

		html = htmlArr.join('');
		$('#pageWrap').append(html);
	};

	/**
	 *刷新翻页状态
	 */
	function updateListMsg(page_count,articalTotalCount){

		send_msg.page = page_count;

		if(send_msg.page <= 1){
			$('.backBtn').addClass('disabled');
		}else{
			$('.backBtn').removeClass('disabled');
		};

		var max_page = Math.ceil(articalTotalCount/6);

		$('.pageTotal').text(max_page);
		$('.pageNow').text(page_count);

		if(send_msg.page >= max_page){
			$('.fowrdBtn').addClass('disabled');
		}else{
			$('.fowrdBtn').removeClass('disabled');
		};
	};

	module.exports = {
		getArticleList:getArticleList,
		createPageBtn:createPageBtn
	};

});