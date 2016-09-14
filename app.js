// initialize app
require('dotenv').load(); // load environemtn variables
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./src/routes/index');
var api = require('./api/routes/index');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

// bring in db and passport config
require('./api/models/db');
require('./api/config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//uglify js files
var clientFiles = [
    'client/app.js',
    'client/home/home.controller.js',
    'client/about/about.controller.js',
    'client/imageDetail/imageDetail.controller.js',
    'client/commentModal/commentModal.controller.js',
    'client/common/services/imageGalleryData.service.js',
    'client/common/directives/footerBasic/footerBasic.directive.js',
    'client/common/directives/imageHover/imageHover.directive.js',
    'client/common/directives/navigation/navigation.directive.js',
    'client/common/directives/pageHeader/pageHeader.directive.js',
    'client/common/filters/addHtmlLineBreaks.filter.js'
];

var uglifiedFiles = uglifyJs.minify(clientFiles, { compress: false });

// write minified file to system
fs.writeFile('public/angular/imageGalleryApp.min.js', uglifiedFiles.code, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log('Client scripts successfully minified');
    }
});

// set app port
var PORT = process.env.PORT || 3000;

//app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(passport.initialize());

// app routes
//app.use('/', routes);
app.use('/api', api);

app.use(function(req, res){
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
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

app.listen(PORT, function(req, res) {
    console.log("App server is listening on port " + PORT); 
    if (app.get('env') === 'development') {
        console.log("http://127.0.0.1:3000");
    }
});
