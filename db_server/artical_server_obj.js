
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CssListSchema = new Schema({
    title: String,
    content: String
});

/**
 *css表
 */
var cssForm = mongoose.model('cssList', CssListSchema);

/**
 *javascript表
 */
var javascriptForm = mongoose.model('javascriptList', CssListSchema);

/**
 *design表
 */
var designForm = mongoose.model('designList', CssListSchema);

/**
 *node表
 */
var nodeForm = mongoose.model('nodeList', CssListSchema);

/**
 *mongo表
 */
var mongoForm = mongoose.model('mongoList', CssListSchema);

/**
 *life表
 */
var lifeForm = mongoose.model('lifeList', CssListSchema);

module.exports = {
	cssForm:cssForm,
	javascriptForm:javascriptForm,
	designForm:designForm,
	nodeForm:nodeForm,
	mongoForm:mongoForm,
	lifeForm:lifeForm
};