var express = require('express');
var router = express.Router();
var answerForm = require('../db_server/answer_server_obj');
var markDown = require('markdown').markdown;

router.post('/get', function (req, res) {

	var getReqJson = req.body
		,id = getReqJson.id;

	answerForm.find({answerId:id}, function (err, newDocs){

		if(err){
			res.status( 200 ).json({
				code: 1,
				msg: 'wrong'
			});
		}else{
			var oRe = /(\<\w+(\s+[a-z]+\=\".*\")?\>|\<\/\w+\>)/g
				,len
				,i;

			for(i=0,len=newDocs.length; i<len; i++){
				newDocs[i] = newDocs[i].toJSON();
				newDocs[i].content = markDown.toHTML(newDocs[i].content);
			};
			res.status( 200 ).json({
				code: 0,
				msg: newDocs
			});
		};
	});
});

router.post('/set', function (req, res) {

	var getReqJson     = req.body
		,answerTitle   = getReqJson.title
		,answerContent = getReqJson.content
		,id            = getReqJson.answerId;

	var answerObj = new answerForm({
		title: answerTitle,
	    content: answerContent,
	    answerId: id
	});

	answerObj.save(function (err, data) {
		if(err){
			res.status( 200 ).json({
				code: 1,
				msg: 'wrong'
			});
		}else{
			res.status( 200 ).json({
				code: 0
			});
		};
	});

});

module.exports = router;
