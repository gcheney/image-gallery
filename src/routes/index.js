var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var imageController = require('../controllers/image');


/* Home Pages */
router.get('/', homeController.homeList);
router.get('/about', homeController.about);
router.get('/contact', homeController.contact);

/* Image pages */
router.get('/image/view', imageController.view);
router.get('/image/new', imageController.add);

module.exports = router;
