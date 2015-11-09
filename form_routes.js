'use strict';

var express = require('express');
// create our router
var router = express.Router();
var async = require('async');

var Person     = require('./app/models/person');
var BookList   = require('./app/models/booklist');
var Book 	   = require('./app/models/book');
var utils	   = require('./app/utils');

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Forms are active');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.render('home', {layout: 'main'});
});

// ***** FORMS Routes ********** ///

router.route('/booklist')

	// get the topic with that id
	.get(function(req, res){
		res.render('home', {layout: 'main'});
	})

module.exports = router;