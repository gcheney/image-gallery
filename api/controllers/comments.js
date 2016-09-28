var mongoose = require('mongoose');
var Image = require('../models/image');
var User = mongoose.model('User');

module.exports.commentsCreate = function (req, res) { 
    getAuthor(req, res, function(req, res, userName) {
        var imageid = req.params.imageid;    
        if (imageid) {
            Image
                .findById(imageid)
                .select('comments')
                .exec(function(err, image) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        if (!image) {
                            sendJsonResponse(res, 404, {
                               "message": "image not found" 
                            });
                        } else {
                            addNewComment(req, res, image, userName);
                        }
                    }
            });
        } 
    });
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
    var imageid = req.params.imageid;
    var commentid = req.params.commentid;
    
    if (!imageid || !commentid) {
        sendJsonResponse(res, 404, {
           "message": "Comment not found, image id and comment id are both required" 
        });
        return;
    }
    
    Image
        .findById(imageid)
        .select('comments')
        .exec(function(err, image){
            if (!image) {
                sendJsonResponse(res, 404, {
                   "message": "image not found" 
                });
                return
            } else if (err) {
                console.log('Mongo error: ' + err);
                sendJsonResponse(res, 400, err);
                return;
            }
        
            if (image.comments && image.comments.length > 0) {
                var commentToUpdate = image.comments.id(commentid);
                if (!commentToUpdate) {
                    sendJsonResponse(res, 404, {
                       "message": "comment not found" 
                    });
                } else if (!req.payload && !req.payload.username) { 
                    sendJsonResponse(res, 404, {
                        "message": "Username not found. Cannot add like"
                    });
                } else {
                    if (commentToUpdate.author === req.payload.username) { 
                        commentToUpdate.content = req.body.content;

                        image.save(function(err, image){
                            if (err) {
                                console.log('Mongo error: ' + err);
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 200, commentToUpdate);
                            }
                        });
                    } else {
                        sendJsonResponse(res, 403, {
                            "message": "You do not have permission to edit this comment"
                        });
                    }
                }
            }
    });
};

module.exports.commentsDeleteOne = function (req, res) { 
    var imageid = req.params.imageid;
    var commentid = req.params.commentid;
    
    if (!imageid || !commentid) {
        sendJsonResponse(res, 404, {
           "message": "Comment not found, image id and comment id are both required" 
        });
        return;
    } 
    
    Image
        .findById(imageid)
        .select('comments')
        .exec(function(err, image){
            if (!image) {
                sendJsonResponse(res, 404, {
                   "message": "image not found" 
                });
                return
            } else if (err) {
                console.log('Mongo error: ' + err);
                sendJsonResponse(res, 400, err);
                return;
            }
        
            if (image.comments && image.comments.length > 0) {
                var commentToDelete = image.comments.id(commentid);
                if (!commentToDelete) {
                    sendJsonResponse(res, 404, {
                       "message": "comment not found" 
                    });
                } else if (!req.payload && !req.payload.username) { 
                    sendJsonResponse(res, 404, {
                        "message": "Username not found. Cannot add like"
                    });
                } else {
                    if (commentToDelete.author === req.payload.username) {
                        commentToDelete.remove();
                        console.log('Removed comment ' + commentToDelete);
                        image.save(function(err, image){
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 204, null);
                            }
                        });
                    } else {
                        sendJsonResponse(res, 403, {
                            "message": "You do not have permission to delete this comment"
                        });
                    }
                }
            }
    });
};

var getAuthor = function(req, res, callback) {
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

var addNewComment = function(req, res, image, author) {
    if (!image) {
        sendJSONresponse(res, 404, "image id not found or included");
    } else {
        image.comments.push({
            author: author,
            content: req.body.content
        });
        image.save(function(err, image){
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                var commentPos = image.comments.length - 1;
                var newComment = image.comments[commentPos];
                sendJsonResponse(res, 201, newComment);
            }
        });
    }
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};