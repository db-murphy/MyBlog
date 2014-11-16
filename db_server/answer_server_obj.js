
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var answerSchema = new Schema({
    title: String,
    content: String,
    answerId: String
});


module.exports = mongoose.model('answerList', answerSchema);