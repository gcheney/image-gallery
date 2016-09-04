var request = require('request');

var apiOptions = {
    server : "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "";
}


var renderHomepage = function(req, res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No images found";
        }
    }
    res.render('home', {
        title: 'The Image Gallery',
        pageHeader: {
            title: 'The Image Gallery',
        },
        images: responseBody,
        message: message
    });
};

/* GET '/' */
module.exports.index = function(req, res) {
    var requestOptions, path;
    path = '/api/images';
    
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    
    request(requestOptions, function(err, response, body) {
        renderHomepage(req, res, body);
    });
};

/* GET '/about' */
module.exports.about = function(req, res) {
    res.render('home/about', { title: 'About'});
};

/* GET '/contact' */
module.exports.contact = function(req, res) {
    res.render('home/contact', { title: 'Contact'});
};