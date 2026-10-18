const express = require('express');

const router = express.Router();

const { chatWithAI, searchRideAI } = require('../controllers/aiController');

router.post('/chat', chatWithAI);

router.post('/search-ride', searchRideAI);

module.exports = router;
