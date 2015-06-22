var Schema = {
	people: {
		id: {type: "increments", nullable: false, primary: true},
		name: {type: "string", maxlength: 150, nullable: false, unique: true},
		description: {type: "string", maxlength: 254, nullable: false},
		image: {type: "string", nullable: false},
		booklist: {type: "string", nullable: true}
	},

	categories: {
		id: {type: "increments", nullable: false, primary: true},
		name: {type: "string", maxlength: 150, nullable: false, unique: true}
	},
	
	booklists: {
		id: {type: "increments", nullable: false, primary: true},
		person_id: {type: "integer", nullable: false, unsigned: true},
		category_id: {type: "integer", nullable: false, unsigned: true},
		description: {type: "string", nullable: true},
		title: {type: "string", maxlength: 150, nullable: true},
		source: {type: "string", maxlength: 150, nullable: true},
		created_at: {type: "dateTime", nullable: false},
		updated_at: {type: "dateTime", nullable: true}
	},

	books: {
		id: {type: "increments", nullable: false, unique: true},
		title: {type: "string", nullable: false, unique: true},
		isbn10: {type: "string", nullable: false, unique: true, primary: true},
		author: {type: "string", nullable: false},
		description: {type: "string", nullable: false},
		image: {type: "string", nullable: false, unique: true},
		reflink: {type: "string", nullable: false, unique: true},
		goodreads_rating: {type: "real", nullable: false},
		amazon_rating: {type: "real", nullable: false}
	},
	
	tags: {
		id: {type: "increments", nullable: false, primary: true},
		name: {type: "string", nullable: false, unique: true}
	},

	// A table for many-to-many relation between tags table & posts table
	blists_tags: {
		id: {type: "increments", nullable: false, primary: true},
		post_id: {type: "integer", nullable: false, unsigned: true, references: "blogposts.id"},
		tag_id: {type: "integer", nullable: false, unsigned: true, references: "tags.id"}
	},

	blists_books: {
		id: {type: "increments", nullable: false, primary: true},
		blist_id: {type: "integer", nullable: false, unsigned: true, references: "booklists.id"},
		book_id: {type: "string", nullable: false, unsigned: true, references: "books.isbn10"}
	}
};

module.exports = Schema;