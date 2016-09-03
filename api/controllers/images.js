var mongoose = require('mongoose');
var Image = require('../models/image');

module.exports.imagesListAll = function (req, res) { 
    Image
        .find({})
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
    console.log(req.body);
    
    var imageToCreate = {
        url: req.body.url,
        creator: req.body.creator,
        title: req.body.title,
        description: req.body.description,
        unlisted: req.body.unlisted
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
            
            console.log('Successfully found image');
            sendJsonResponse(res, 200, image);
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No image id in request"
        });
    }
};

module.exports.imagesUpdateOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
};

module.exports.imagesDeleteOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};