const express = require('express');
const router = express.Router();
const { getQuestions, checkPseudocode } = require('../controllers/pseudocodeController');

router.get('/questions', getQuestions);
router.post('/check-pseudocode', checkPseudocode);

module.exports = router;
