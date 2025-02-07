const express = require('express');
const router = express.Router();
const { submitReview, getAllReviewsByCoWorkingSpace } = require('../controllers/reviewsController')

router.get('/:coworking_space_id', getAllReviewsByCoWorkingSpace);
router.post('/submit/:coworking_id/:user_id', submitReview);

module.exports = router;