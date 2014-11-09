define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var common = require('module_common/common');
	var C = require('./blog_manage_C');

	/**
	 * 根据url的hash值来确定当前处在那个模块，以此来确定给导航上得按钮添加高亮效果
	**/
	common.resertMenu();

	/**
	* 生成顶部导航栏
	**/
	common.create_header();

	/**
	* 生成页脚
	**/
	common.create_footer();

	/**
	* 生成用户名
	**/
	common.valuationUsername();

	/**
	 *点击提交，发表文章
	 */
	C.formSubmit();

});