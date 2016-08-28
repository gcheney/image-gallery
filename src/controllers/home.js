var mongoose = require('mongoose');
var Image = require('../../api/models/image');

/* GET '/' */
module.exports.index = function(req, res) {
    Image.find({}, function(err, images){
        res.render('home', { 
            title: 'Home',
            images: images
        });
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