var mongoose = require('mongoose');
//var seedDB = require('./seed')

var dbURI = '';

if (process.env.NODE_ENV === 'test') {
    dbURI = 'mongodb://localhost/image-gallery-tests';
    console.log('Using test database');
} else if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
    console.log('Using production database');
} else {
    dbURI = 'mongodb://localhost/image-gallery';
    console.log('Using development database');
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
    //seed mock data
    //seedDB();
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});


//Bring in required schemas
require('./image');
require('./user');
