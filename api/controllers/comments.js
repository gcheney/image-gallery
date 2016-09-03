var mongoose = require('mongoose');
var Image = require('../models/image');

module.exports.commentsCreate = function (req, res) { 
    var imageid = req.params.imageid;
    
    if (imageid) {
        Image
            .findById(imageid)
            .select('comments')
            .exec(function(err, image){
                if (err) {
                    sendJsonResponse(res, 400, err);
                } else {
                    if (!image) {
                        sendJsonResponse(res, 404, {
                           "message": "image not found" 
                        });
                    } else {
                        image.comments.push({
                            author: req.body.author,
                            content: req.body.content
                        });
                        image.save(function(err, image){
                            if (err) {
                                sendJsonResponse(res, 400, err);
                            } else {
                                var commentPos = image.comments.length - 1;
                                var newComment = image.comments[commentPos];
                                sendJsonResponse(res, 201, newComment);
                            }
                        });
                    }
                }
        });
    }
};

module.exports.commentsReadOne = function (req, res) { 
    var imageId = req.params.imageid;
    var commentId = req.params.commentid;
    
    if (req.params && imageId && commentId) {
        Image
            .findById(imageId)
            .select('name comments')
            .exec(function(err, image){
                var commentResponse, comment;
            
                if (!image) {
                    console.log('Could not locate image with id ' + imageId);
                    sendJsonResponse(res, 404, {
                       "message": "image not found" 
                    });
                    return;
                } else if (err) {
                    console.log('Mongoose error: ' + err);
                    sendJsonResponse(res, 400, err);
                    return;
                }
                
                if (image.comments && image.comments.length > 0) {
                    comment = image.comments.id(commentId);
                    if (!comment) {
                        console.log('Could not locate comment with id ' + commentId);
                        sendJsonResponse(res, 404, {
                           "message": "comment not found" 
                        });
                    } else {
                        commentResponse = {
                            image: {
                                name: image.name,
                                id: imageId
                            },
                            comment: comment
                        };
                        
                        sendJsonResponse(res, 200, commentResponse);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                       "message": "No comments found for this image" 
                    });
                }
        });
    } else {
        sendJsonResponse(res, 404, {
           "message": "Document not found, image id and comment id are required" 
        });
    }
};

module.exports.commentsUpdateOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
};

module.exports.commentsDeleteOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};