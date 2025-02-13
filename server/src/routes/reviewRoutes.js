const express = require('express');
const router = express.Router();
const { submitReview, getAllReviewsByCoWorkingSpace, checkExistingReview } = require('../controllers/reviewsController')

router.get('/:coworking_space_id', getAllReviewsByCoWorkingSpace);
router.post('/submit/:coworking_id', submitReview);
router.post('/check', checkExistingReview); // imports duplicate review prevention logic 

module.exports = router;