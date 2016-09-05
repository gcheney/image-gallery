var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var imageController = require('../controllers/image');
var accountController = require('../controllers/account')


/* Home */
router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/contact', homeController.contact);

/* Image */
router.get('/images/new', imageController.add);
router.get('/images/:imageid', imageController.details);

/* Account */
router.get('/account/login', accountController.login);
router.get('/account/signup', accountController.signup);

module.exports = router;
