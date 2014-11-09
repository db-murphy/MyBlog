var express = require('express');
var router = express.Router();
var server_obj = require('../db_server/artical_server_obj');

router.post('/get', function(req, res) {

	var getReqJson = req.body;
	var attr = getReqJson.type;

	server_obj[attr].find(function(err,arr){
		console.log('list total count:'+arr.length);
		res.status(200).json({
			code:0,
			msg:arr
		});
	});

});

router.post('/set', function(req, res) {

	var getReqJson = req.body;
	var attr = getReqJson.type;
	var articalType = server_obj[attr];
	var articalBset = new articalType({
		title:getReqJson.title,
		content:getReqJson.content
	});

	console.log(438498494948948);

	articalBset.save(function(err,data){

		if(err){
			res.status(200).json({
				code:1,
				msg:'wrong'
			});
		}else{
			res.status(200).json({
				code:0
			});
		};
	});

	/*res.status(200).json({
		code:0
	});*/

});

module.exports = router;
