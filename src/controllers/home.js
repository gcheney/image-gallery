var request = require('request');

var server = "http://localhost:3000";
if (process.env.NODE_ENV === 'production') {
    server = "https://image-gallery1.herokuapp.com/";
}

var renderHomepage = function(req, res){
    res.render('home', {
        title: 'Home',
        pageHeader: {
            title: 'The Image Gallery',
            tagline: 'A collection of beautiful images'
        }
    });
};

/* GET '/' */
module.exports.index = function(req, res) {
    renderHomepage(req, res);
};

/* GET '/about' */
module.exports.about = function(req, res) {
    res.render('home/about', { title: 'About'});
};

/* GET '/contact' */
module.exports.contact = function(req, res) {
    res.render('home/contact', { title: 'Contact'});
};