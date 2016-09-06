var request = require('request');

var server = "http://localhost:3000";
if (process.env.NODE_ENV === 'production') {
    server = "https://image-gallery1.herokuapp.com/";
}

var renderDetailsPage = function(req, res, image) {
    res.render('image/details', {
        title: image.title,
        image: image,
        error: req.query.err
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


/* GET '/images/:imageid' */
module.exports.details = function(req, res) {
    var path = '/api/images/' + req.params.imageid;
    
    var requestOptions = {
        url: server + path,
        method: "GET",
        json: {}
    };
    
    request(requestOptions, function(err, response, image) {
        if (err) {
            console.log(err);
        }
        if (response.statusCode === 200) {
            renderDetailsPage(req, res, image);
        } else {
            renderErrorPage(req, res, response.statusCode);
        }
    });
};

/* GET '/images/new' */
module.exports.add = function(req, res) {
    res.render('image/new', { title: 'Add a New Image'});
};

/* GET '/images/:imageid/comments/new' */
module.exports.addComment = function(req, res) {
    var imageid = req.params.imageid;
    var path = "/api/images/" + imageid + '/comments';
        
    var commentData = {
        author: req.body.author,
        content: req.body.content    
    };
    var requestOptions = {
        url : server + path,
        method : "POST",
        json : commentData
    };
    
    console.log('New comments data: ' + commentData);
    if (!commentData.author ||  !commentData.content) {
        res.redirect('/images/' + imageid +'/?err=val');
    } else {
        request(requestOptions, function(err, response, body) {
            console.log(body);
            if (response.statusCode === 201) {
                res.redirect('/images/' + imageid);
            } else if (body.name && body.name === "ValidationError" ) {
                console.log('A Mongoose Validation Error occured');
                res.redirect('/images/' + imageid +'/?err=val');
            } else {
                console.log(body);
                renderErrorPage(req, res, response.statusCode);
            }
        });
    }
};