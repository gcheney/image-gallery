var mongoose = require('mongoose');
var Image = mongoose.model('Image');

module.exports.imagesListAll = function (req, res) { 
    sendJsonResponse(res, 200, {"status", "sucess"});
};

module.exports.imagesCreate = function (req, res) { 
    sendJsonResponse(res, 200, {"status", "sucess"});
};

module.exports.imagesReadOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status", "sucess"});
};

module.exports.imagesUpdateOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status", "sucess"});
};

module.exports.imagesDeleteOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status", "sucess"});
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};