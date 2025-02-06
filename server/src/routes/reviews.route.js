const express = require('express');
const router = express.Router();
const { submitReview, getAllReviewsByCoWorkingSpace } = require('../controllers/reviews.controller')

router.get('/:coworking_id', getAllReviewsByCoWorkingSpace);

router.post('/submit/:coworking_id/:user_id', submitReview);

module.exports = router;