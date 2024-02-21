const express = require('express');
const { welcome, viewAllResponses, generateResponse } = require('../controllers/geminiController');

const router = express.Router();

router.route('/').get(welcome);

router.route('/prompts').get(viewAllResponses);

router.route('/prompts/generate').post(generateResponse);

module.exports = router;