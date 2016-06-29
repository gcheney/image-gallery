var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var imageController = require('../controllers/image');
var accountController = require('../controllers/account')


/* Home */
router.get('/', homeController.homeList);
router.get('/about', homeController.about);
router.get('/contact', homeController.contact);

/* Image */
router.get('/image/view', imageController.view);
router.get('/image/new', imageController.add);

/* Account */
router.get('/account/login', accountController.login);
router.get('/account/signup', accountController.signup);

module.exports = router;
