var express = require('express');
var router = express.Router();

// Require controller modules.
var upload_controller = require('../controllers/uploadController');


router.get('/', upload_controller.index);

module.exports = router;
