var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var imageController = require('../controllers/images');


/* Home Pages */
router.get('/', homeController.homeList);
router.get('/about', homeController.about);
router.get('/contact', homeController.contact);

/* Image pages */
router.get('/images/view', imageController.view);
router.get('/images/add', imageController.add);

module.exports = router;
