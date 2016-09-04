var request = require('request');

var server = "http://localhost:3000";
if (process.env.NODE_ENV === 'production') {
    server = "https://image-gallery1.herokuapp.com/";
}

var renderHomepage = function(req, res, images){
    var message;
    if (!(images instanceof Array)) {
        message = "API lookup error";
        images = [];
    } else {
        if (!images.length) {
            message = "No images found";
        }
    }
    res.render('home', {
        title: 'Home',
        pageHeader: {
            title: 'The Image Gallery',
            tagline: 'A collection of beautiful images'
        },
        images: images,
        message: message
    });
};

/* GET '/' */
module.exports.index = function(req, res) {
    var path = '/api/images';
    
    var requestOptions = {
        url : server + path,
        method : "GET",
        json : {}
    };
    
    request(requestOptions, function(err, response, data) {
        if (err) {
            console.log(err);
        }
        renderHomepage(req, res, data);
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