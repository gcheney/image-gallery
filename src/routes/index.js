var express = require('express');
var router = express.Router();
var angularController = require('../controllers/angular');


/* Home */
router.get('/', angularController.index);

module.exports = router;
