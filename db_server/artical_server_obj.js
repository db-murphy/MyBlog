
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CssListSchema = new Schema({
    title: String,
    content: String
});

CssListSchema.methods.shhhhhh = function() {
    var greeting = this.title;
    return greeting;
  	console.log(greeting);
};

/**
 *css表
 */
var cssForm = mongoose.model('cssList', CssListSchema);

/**
 *javascript表
 */
var javascriptForm = mongoose.model('javascript', CssListSchema);

module.exports = {
	cssForm:cssForm,
	javascriptForm:javascriptForm
};