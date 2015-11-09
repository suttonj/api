var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookListSchema   = new Schema({
	_id: Number,
	person: String,
	listno: Number,
	category: String,
	title: String,
	description: String,
	books: [String],
	source: String
});

module.exports = mongoose.model('BookList', BookListSchema);