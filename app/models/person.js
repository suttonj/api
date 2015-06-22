var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
	_id: Number,
	name: String,
	description: String,
	image: String,
	booklist: Number
});

module.exports = mongoose.model('Person', PersonSchema);