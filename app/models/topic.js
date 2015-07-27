var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TopicSchema   = new Schema({
	_id: Number,
	title: String,
	description: String,
	image: String,
	people: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Topic', TopicSchema);