var mongoose = require('mongoose');
var Image = require('../models/image');

module.exports.imagesListAll = function (req, res) { 
    Image
        .find({})
        .exec(function(err, images) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, images);
            }
        });
};

module.exports.imagesCreate = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
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
                sendJsonResponse(res, 404, err);
                return;
            } else {
                console.log('Successfully found image');
                sendJsonResponse(res, 200, image);
            }
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