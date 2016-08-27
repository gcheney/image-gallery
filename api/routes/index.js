var express = require('express');
var router = express.Router();
var imageController = require('../controllers/images');


/* Image API Routes*/
router.get('/images', imageController.imagesListAll);
router.post('/images', imageController.imagesCreate);
router.get('/images/:imageid', imageController.imagesReadOne);
router.put('/images/:imageid', imageController.imagesUpdateOne);
router.delete('/images/:imageid', imageController.imagesDeleteOne);

module.exports = router;