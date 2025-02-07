const Reviews = require('../models/reviews.model');

async function getAllReviewsByCoWorkingSpace (req, res) {
    try {
        const { coworking_id } = req.params;
        const reviews = await Reviews.filterByCoWorkingId(coworking_id );
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function submitReview (req, res) {
    try {
        const { coworking_id, user_id } = req.params;
        const review = req.body;
        await Reviews.submit({ ...review, coworking_id, user_id });
        res.json({ message: 'Review submitted successfully'});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { submitReview, getAllReviewsByCoWorkingSpace };