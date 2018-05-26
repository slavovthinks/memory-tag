const express = require('express');
const router = express.Router();

// Require controller modules.
const uploadController = require('../controllers/uploadController');


router.get('/', uploadController.index);

module.exports = router;
