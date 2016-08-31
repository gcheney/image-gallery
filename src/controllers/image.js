var mongoose = require('mongoose');
var Image = require('../../api/models/image');

/* GET '/images/view' */
module.exports.view = function(req, res) {
    var image = { 
            url: "http://i.imgur.com/qK42fUu.jpg", 
            title: "Golden Gate", 
            description: "A nice picture of the Golden Gate Bridge", 
            likes: 12,
            creator: 'Homer',
            comments: [
                {
                    author: 'Homer',
                    content: 'I liked this!'
                }
            ]
        }
    
        res.render('image/view', { 
            title: 'View Image',
            image: image
        });
};

/* GET '/images/add' */
module.exports.add = function(req, res) {
    res.render('image/new', { title: 'Add a New Image'});
};