var express = require('express'); //A library that handles routing and views.
var ejs = require('ejs'); //A library that allows for templates.
var pgp = require('pg-promise')(); //A library that interacts with a postgresql server.
var bodyParser = require('body-parser');

var listenport = 8080; //port to listen for requests on.

var app = express();
app.use(express.static(__dirname + '/public'));// serve static files from /public
app.set('view engine', 'ejs'); //tells express to use filenames without extensions. Allows 'render("index")' instead of 'render("index.ejs")'
app.set('views', __dirname + '/views');//Tells express to look for views in the given directory.

// Body parser takes raw objects returned from the database and turns them into JSON.
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Tells express to use routes.js to know what to do with requests.
var routes = require('./routes/routes');
app.use('/', routes); //use routes.js for ANY request.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// listen on port 8080
app.listen(listenport, function () {
  console.log('Express app listening on port ' + listenport + '.');
});