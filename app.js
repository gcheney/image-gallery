// *********** INITIALIZE APP ********************** //
var express = require("express");
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// *********** ROUTES ********************** //

//Mock image data

var images = [
    { url: "http://i.imgur.com/qK42fUu.jpg"},
    { url: "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966"},
    { url: "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4"},
    { url: "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg"},
    { url: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e"},
    { url: "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d"},
    { url: "https://images.unsplash.com/photo-1436262513933-a0b06755c784"},
    { url: "https://images.unsplash.com/photo-1439396087961-98bc12c21176"},
    { url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9"}
];

// GET: /
app.get("/", function(req, res){
    res.render("home", { 
        title: "The Image Link Gallery",
        images: images
    });
});



// *********** ERROR HANDLERS ********************** //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// *********** LISTEN ********************** //

app.listen(3000, function(req, res){
    console.log("App server is listening on port 3000"); 
    if (app.get('env') === 'development') {
        console.log("http://127.0.0.1:3000");
    }
});