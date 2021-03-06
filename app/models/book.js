var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
	_id: String,
	isbn10: String,
	title: String,
	author: String,
	description: String,
	image: String,
	reflink: String,
	goodreads_rating: Number,
	amazon_rating: Number,
	references: [String]
});

module.exports = mongoose.model('Book', BookSchema);