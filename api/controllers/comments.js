var mongoose = require('mongoose');
var Image = require('../models/image');

module.exports.commentsCreate = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
};

module.exports.commentsReadOne = function (req, res) { 
    sendJsonResponse(res, 200, {"status": "sucess"});
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