var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var imageController = require('../controllers/images');
var commentController = require('../controllers/comments');
var authController = require('../controllers/auth');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// image api routes
router.get('/images', imageController.imagesListAll);
router.post('/images', auth, imageController.imagesCreate);
router.get('/images/:imageid', imageController.imagesReadOne);
router.put('/images/:imageid', auth, imageController.imagesUpdateOne);
router.put('/images/:imageid/likes', auth, imageController.imagesUpdateLikes);
router.delete('/images/:imageid', auth, imageController.imagesDeleteOne);

// comment api routes
router.post('/images/:imageid/comments', auth, commentController.commentsCreate);
router.get('/images/:imageid/comments/:commentid', commentController.commentsReadOne);
router.put('/images/:imageid/comments/:commentid', auth, commentController.commentsUpdateOne);
router.delete('/images/:imageid/comments/:commentid', auth, commentController.commentsDeleteOne);

// auth api routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;