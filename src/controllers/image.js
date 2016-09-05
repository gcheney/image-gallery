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

var renderErrorPage = function (req, res, status) {
    var title, message;
    if (status === 404) {
        title = "404: Page Not Found";
        message = "It seems the page you were looking for is not here.";
    } else if (status === 500) {
        title = "500: Internal Server Error";
        message = "The server is experincing an issue at this time.";
    } else {
        title = status + ", something went wrong";
        message = "Something is not quite right.";
    }
    
    res.status(status);
    res.render('error', {
        title : title,
        message : message,
        error: {
            status: status,
            stack: ''
        }
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
        if (response.statusCode === 200) {
            renderDetailsPage(req, res, data);
        } else {
            renderErrorPage(req, res, response.statusCode);
        }
    });
};

/* GET '/images/new' */
module.exports.add = function(req, res) {
    res.render('image/new', { title: 'Add a New Image'});
};