'use strict';

var express = require('express');
// create our router
var router = express.Router();
var async = require('async');

var Person     = require('./app/models/person');
var BookList   = require('./app/models/booklist');
var Book 	   = require('./app/models/book');
var Topic 	   = require('./app/models/topic');

var utils	   = require('./app/utils');

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /persons
// ----------------------------------------------------
router.route('/persons')

	// create a person (accessed at POST http://localhost:8080/persons)
	.post(function(req, res) {
		
		var person = new Person();		// create a new instance of the Person model
		person.first = req.body.first;  // set the persons name (comes from the request)
		person.last = req.body.last;
		person.description = req.body.description;
		person.image = req.body.image;
		person.booklist = req.body.booklist;

		person.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Person created!' });
		});

		
	})

	// get all the persons (accessed at GET http://localhost:8080/api/persons)
	.get(function(req, res) {
		Person.find(function(err, persons) {
			if (err)
				res.send(err);

			res.json(persons);
		});
	});

// on routes that end in /persons/:person_id
// ----------------------------------------------------
router.route('/persons/:person_id')

	// get the person with that id
	.get(function(req, res) {
		Person.findById(req.params.person_id, function(err, person) {
			if (err)
				res.send(err);
			res.json(person);
		});
	})

	// update the person with this id
	.put(function(req, res) {
		Person.findById(req.params.person_id, function(err, person) {

			if (err)
				res.send(err);

			person.fist = req.body.first;  // set the persons name (comes from the request)
			person.last = req.body.last;
			person.description = req.body.description;
			person.image = req.body.image;
			person.booklist = req.body.booklist;
			person.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Person updated!' });
			});

		});
	})

	// delete the person with this id
	.delete(function(req, res) {
		Person.remove({
			_id: req.params.person_id
		}, function(err, person) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /booklists
// ----------------------------------------------------
router.route('/booklists')

	// create a booklist (accessed at POST http://localhost:8080/booklists)
	.post(function(req, res) {
		
		var booklist = new BookList();	
		var json = req.body;
		console.dir(json);	// create a new instance of the Person model
		booklist.person = json.person;  // set the booklists name (comes from the request)
		booklist.listno = json.listno;
		booklist.category = json.category;
		booklist.description = json.description;
		booklist.books = json.books;
		booklist.source = json.source;

		booklist.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'BookList created!' });
		});

		
	})

	// get all the booklists (accessed at GET http://localhost:8080/api/booklists)
	.get(function(req, res) {
		BookList.find(function(err, booklists) {
			if (err)
				res.send(err);

			res.json(booklists);
		});
	});

// on routes that end in /booklists/:booklist_id
// ----------------------------------------------------
router.route('/booklists/:booklist_id')

	// get the booklist with that id
	.get(function(req, res) {
		BookList.findOne({ '_id': req.params.booklist_id }, function(err, booklist) {
			if (err)
				res.send(err);
			
			var calls = [];
			var people = [];

		    //calls.push(function(callback) {
		    	Person.findOne({ name: booklist.person }).lean().exec(function(err, person) {
					if (err)
						return callback(err);
					Person.findOne({ '_id': person._id }, function(err, result) {
						console.log(JSON.stringify(result));
						//people.push(person);
						booklist.person = JSON.stringify(result).trim();

						Book.find().where('_id').in(booklist.books).lean().exec(function(err, books) {
							console.log(books);
							booklist.books = JSON.stringify(books).trim();

							res.json(booklist);
						} );
				        //callback(null, person);
					});
				});
		    //});

			// async.parallel(calls, function(err, result) {
			//      this code will run after all calls finished the job or
			//        when any of the calls passes an error 
			//     if (err)
			//         return console.log(err);
			//     console.log(result);
			//     booklist.person = result[0];
			// 	res.json(booklist);

			// });
		});
	})

	// update the booklist with this id
	.put(function(req, res) {
		BookList.findById(req.params.booklist_id, function(err, booklist) {

			if (err)
				res.send(err);

			//var books = [];
			// for (var i = 0; i < booklist.books.length; i++) {
			// 	Book.findById(booklist.books[i], function(err, book) {
			// 		if (err)
			// 			console.log(err);
			// 		console.log(book);
			// 		books.push(book);
			// 		if (i == booklist.books.length - 1) {
			// 			booklist.save(function(err) {
			// 				if (err)
			// 					res.send(err);

			// 				res.json({ message: 'BookList updated!' });
			// 			});
			// 		}
			// 	});
			// }

      		//utils.updateDocument(booklist, BookList, req.body);
			// booklist.topics = req.body.topics;
			// booklist.description = req.body.description;
			// booklist.books = req.body.books;
			booklist.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'BookList updated!' });
			});

		});
	})

	// delete the booklist with this id
	.delete(function(req, res) {
		BookList.remove({
			_id: req.params.booklist_id
		}, function(err, booklist) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /books
// ----------------------------------------------------
router.route('/books')

	// create a book (accessed at POST http://localhost:8080/books)
	.post(function(req, res) {
		
		var book = new Book();		// create a new instance of the Book model
		book._id = req.body.isbn;
		book.title = req.body.title;  // set the books name (comes from the request)
		book.author = req.body.author;
		book.description = req.body.description;
		book.image = req.body.image;
		book.reflink = req.body.reflink;
		book.amazon_rating = req.body.amazon_rating;
		book.goodreads_rating = req.body.goodreads_rating;
		book.isbn10 = req.body.isbn;
		book.references = new Array();

		BookList.find({ 'books': req.body.isbn }).exec(function(err, booklists) {
			if (booklists.length) {
				console.log(booklists[0].person);
				for (var i = 0; i < booklists.length; i++) {
					book.references.push(booklists[i].person);
				}
				console.dir(book.references);
			}

			book.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Book created!' });
			});
				
		});

	})

	// get all the books (accessed at GET http://localhost:8080/api/books)
	.get(function(req, res) {
		Book.find(function(err, books) {
			if (err)
				res.send(err);

			res.json(books);
		});
	});

// on routes that end in /books/:book_id
// ----------------------------------------------------
router.route('/books/:book_id')

	// get the book with that id
	.get(function(req, res) {
		Book.findById(req.params.book_id, function(err, book) {
			if (err)
				res.send(err);
			res.json(book);
		});
	})

	// update the book with this id
	.put(function(req, res) {
		Book.findById(req.params.book_id, function(err, book) {

			if (err)
				res.send(err);

			utils.updateDocument(book, Book, req.body);
			book.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Book updated!' });
			});

		});
	})

	// delete the book with this id
	.delete(function(req, res) {
		Book.remove({
			_id: req.params.book_id
		}, function(err, book) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /booklists
// ----------------------------------------------------
router.route('/topics')

	// create a topics (accessed at POST http://localhost:8080/topics)
	.post(function(req, res) {
		
		var topic = new Topic();	
		var json = req.body;
		console.dir(json);	// create a new instance of the Person model
		topic._id = json._id;
		topic.title = json.title;  // set the topics name (comes from the request)
		topic.description = json.description;
		topic.people = json.people;
		topic.image = json.image;

		topic.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Topic created!' });
		});

		
	})

	// get all the topics (accessed at GET http://localhost:8080/api/topics)
	.get(function(req, res) {
		Topic.find(function(err, topics) {
			if (err)
				res.send(err);


			res.json(topics);
		});
	});

// on routes that end in /topics/:topic_id
// ----------------------------------------------------
router.route('/topics/:topic_id')

	// get the topic with that id
	.get(function(req, res) {
		Topic.findById(req.params.topic_id, function(err, topic) {
			if (err)
				res.send(err);

			var calls = [];
			var people = [];

			topic.people.forEach(function(person){
			    calls.push(function(callback) {
			    	Person.findById(person.id, function(err, person) {
						if (err)
							return callback(err);
						console.log(person);
						//people.push(person);
				        callback(null, person);
					});
			    });
			});

			async.parallel(calls, function(err, result) {
			    /* this code will run after all calls finished the job or
			       when any of the calls passes an error */
			    if (err)
			        return console.log(err);
			    console.log(result);
			    topic.people = result;
				res.json(topic);

			});
		});
	})

	// update the topic with this id
	.put(function(req, res) {
		Topic.findById(req.params.topic_id, function(err, topic) {

			if (err)
				res.send(err);

			//var books = [];
			// for (var i = 0; i < topic.books.length; i++) {
			// 	Book.findById(topic.books[i], function(err, book) {
			// 		if (err)
			// 			console.log(err);
			// 		console.log(book);
			// 		books.push(book);
			// 		if (i == topic.books.length - 1) {
			// 			topic.save(function(err) {
			// 				if (err)
			// 					res.send(err);

			// 				res.json({ message: 'Topic updated!' });
			// 			});
			// 		}
			// 	});
			// }

      		utils.updateDocument(topic, Topic, req.body);
			// topic.topics = req.body.topics;
			// topic.description = req.body.description;
			// topic.books = req.body.books;
			topic.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Topic updated!' });
			});

		});
	})

// ***** FORMS Routes ********** ///

router.route('/forms/booklist')

	// get the topic with that id
	.get(function(req, res){
		res.render('index', { name: 'Jeremy' });
	})

module.exports = router;