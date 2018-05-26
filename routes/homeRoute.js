const express = require('express');
const router = express.Router();

// Require controller modules.
const homeController = require('../controllers/homeController');

// GET catalog home page.
router.get('/', homeController.index);

module.exports = router;