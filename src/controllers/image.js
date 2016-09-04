var request = require('request');

var server = "http://localhost:3000";
if (process.env.NODE_ENV === 'production') {
    server = "https://image-gallery1.herokuapp.com/";
}

var renderDetailsPage = function(req, res, image) {
    res.render('image/details', {
        title: image.title,
        image: image
    });
};


/* GET '/images/details' */
module.exports.details = function(req, res) {
    var path = '/api/images/' + req.params.imageid;
    
    var requestOptions = {
        url: server + path,
        method: "GET",
        json: {}
    };
    
    request(requestOptions, function(err, response, data) {
        if (err) {
            console.log(err);
        }
        renderDetailsPage(req, res, data);
    });
};

/* GET '/images/new' */
module.exports.add = function(req, res) {
    res.render('image/new', { title: 'Add a New Image'});
};