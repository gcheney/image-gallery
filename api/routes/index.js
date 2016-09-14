var express = require('express');
var router = express.Router();
var imageController = require('../controllers/images');
var commentController = require('../controllers/comments');
var authController = require('../controllers/auth');


// image api routes
router.get('/images', imageController.imagesListAll);
router.post('/images', imageController.imagesCreate);
router.get('/images/:imageid', imageController.imagesReadOne);
router.put('/images/:imageid', imageController.imagesUpdateOne);
router.delete('/images/:imageid', imageController.imagesDeleteOne);

// comment api routes
router.post('/images/:imageid/comments', commentController.commentsCreate);
router.get('/images/:imageid/comments/:commentid', commentController.commentsReadOne);
router.put('/images/:imageid/comments/:commentid', commentController.commentsUpdateOne);
router.delete('/images/:imageid/comments/:commentid', commentController.commentsDeleteOne);

// auth api routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;