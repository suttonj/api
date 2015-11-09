// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var cors 	   = require('cors')
var app        = express();
var morgan     = require('morgan');

var hbs 	   = require('express-handlebars');

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(cors()); //use CORS for cross-origin requests

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/topshelfdev'); // connect to our database

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// ROUTES FOR OUR API
// =============================================================================

var router = require('./routes');
var formRouter = require('./form_routes');

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);
app.use('/forms', formRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
