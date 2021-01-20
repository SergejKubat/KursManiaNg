const express = require('express');
const autorController = require('../controllers/autorController');

const router = express.Router();

router.get('/autori', autorController.getAll);

module.exports = router;