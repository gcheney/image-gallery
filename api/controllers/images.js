var mongoose = require('mongoose');
var Image = require('../models/image');
var User = mongoose.model('User');

module.exports.imagesListAll = function (req, res) { 
    var username = req.query.user;
    var query = {};
    
    if (username) {
        query = { creator: username }
    }

    Image
        .find(query)
        .sort({'createdOn': 'desc'})
        .exec(function(err, images) {
            if (err) {
                console.log('Mongoose error: ' + err);
                sendJsonResponse(res, 400, err);
                return;
            }
            
            sendJsonResponse(res, 200, images);
        });
};

module.exports.imagesCreate = function (req, res) { 
    
    getCreator(req, res, function(req, res, username) {
        var imageToCreate = {
            url: req.body.url,
            creator: username,
            title: req.body.title,
            description: req.body.description    
        };

        Image.create(imageToCreate, function(err, image) {
            if (err) {
                console.log(err);
                sendJsonResponse(res, 400, err);
            } else {
                console.log('Created new image: ' + image);
                sendJsonResponse(res, 201, image);
            }
        });
    });
    
};

module.exports.imagesReadOne = function (req, res) { 
    if (req.params && req.params.imageid) {
        Image
            .findById(req.params.imageid)
            .exec(function(err, image){
                if (!image) {
                    console.log('Image not found');
                    sendJsonResponse(res, 404, {
                        "message": "image not found"
                    });
                    return;
                } else if (err) {
                    console.log('Mongoose error: ' + err);
                    sendJsonResponse(res, 400, err);
                    return;
                } 

                sendJsonResponse(res, 200, image);
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No image id in request"
        });
    }
};

module.exports.imagesUpdateOne = function (req, res) { 
    var imageid = req.params.imageid;
    if (!imageid) {
        sendJsonResponse(res, 404, {
            "message": "image not found, the image id is required"
        });
        return;
    }
    
    Image
        .findById(imageid)
        .select('-comments -likes')
        .exec(function(err, image) {    
            if (!image) { 
                sendJsonResponse(res, 404, {
                    "message": "image id not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 400, err);
            } 
        
            if (req.payload && req.payload.username === image.creator) {    
                //update image for verified user
                image.title = req.body.title;
                image.description = req.body.description;

                image.save(function(err, image) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, image);
                    }
                });
            } else {
                sendJsonResponse(res, 403, {
                    "message": "You do not have permission to make that request"
                });
            }
    });
};

module.exports.imagesDeleteOne = function (req, res) { 
        var imageid = req.params.imageid;

        if (imageid) {
            Image
                .findById(imageid)
                .exec(function(err, image) {
                    if (req.payload && req.payload.username === image.creator) {         
                        image.remove(function(err, image){
                           if (err) {                 
                                sendJsonResponse(res, 404, err);
                            } else {
                                console.log('Image removed: ' + image);
                                sendJsonResponse(res, 204, null);
                            } 
                        });
                    } else {
                        sendJsonResponse(res, 403, {
                            "message": "You do not have permission to make that request"
                        });
                    }
                });
        } else {
            sendJsonResponse(res, 404, {
                "message": "No image id"
            });
        }
};

var getCreator = function(req, res, callback) {
    if (req.payload && req.payload.username) {
        User    
            .findOne({ username: req.payload.username })
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "The specified user could not be found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                } else {
                    callback(req, res, user.username);
                }   
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No user data provided"
        });
    }
}; 


var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};