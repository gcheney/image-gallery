var mongoose = require('mongoose');
var Image = require('../../api/models/image');

/* GET '/images/view' */
module.exports.view = function(req, res) {
    var query = {'title': 'Golden Gate'};
    
    Image
        .find(query)
        .exec(function(err, image){
            if (err) {
                console.log(err);
            } else {
                console.log(image);
                res.render('image/view', { 
                    title: 'View Image',
                    image: image
                });
            }
        });
    
};

/* GET '/images/add' */
module.exports.add = function(req, res) {
    res.render('image/new', { title: 'Add a New Image'});
};