var express = require('express');
var router = express.Router();
var server_obj = require('../db_server/artical_server_obj');
var markDown = require('markdown').markdown;

router.post('/get', function(req, res) {

	var getReqJson = req.body;
	var attr = getReqJson.type;
	var pageCount = getReqJson.page;

	server_obj[attr].find({},function (err, docs){
		if(err){
			res.status( 200 ).json({
				code: 1,
				msg: 'wrong'
			});
		}else{
			var start = (pageCount - 1) * 6 ;
			var end = pageCount * 6;
			var newDocs = docs.slice(start,end);
			var oRe = /(\<\w+(\s+[a-z]+\=\".*\")?\>|\<\/\w+\>)/g
				,len
				,i;

			for(i=0,len=newDocs.length; i<len; i++){
				newDocs[i] = newDocs[i].toJSON();
				newDocs[i].content = markDown.toHTML(newDocs[i].content);
				newDocs[i].content = newDocs[i].content.replace(oRe,'');
				if(newDocs[i].content.length > 400){
					newDocs[i].content = newDocs[i].content.substring(0,400) + '....';
				}else{
					newDocs[i].content = newDocs[i].content.substring(0,400);
				};
				
			};

			res.status(200).json({
				code:0,
				msg:newDocs,
				totalCount:docs.length
			});
		};
		
	});

});

router.post('/getDetail', function(req, res) {

	var getReqJson = req.body;
	var articalId = getReqJson.id;
	var attr = getReqJson.type;

	server_obj[attr].findById(articalId,function(err,json){
		json.content = markDown.toHTML(json.content);
		console.log(json.content);
		res.status(200).json({
			code:0,
			msg:json
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

});

router.post('/delete',function(req,res){
	var getReqJson = req.body;
	var attr = getReqJson.type;
	var oTarget = getReqJson.name;

	server_obj[attr].remove({title:oTarget},function(err,result){
		
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
	})
});

module.exports = router;
