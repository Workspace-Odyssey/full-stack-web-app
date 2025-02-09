const Reviews = require('../models/reviewsModel');

async function getAllReviewsByCoWorkingSpace (req, res) {
    try {
        const { coworking_space_id } = req.params;
        const reviews = await Reviews.filterByCoWorkingId(coworking_space_id );
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function submitReview (req, res) {

    // Check if the user is logged in
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("You must be logged in to submit a review.");
    }
    
    try {
        const user_id = req.session.user.id; // Retrieve the UUID from the session
        const { coworking_id } = req.params;
        const { reviewText, rating, datePosted } = req.body;
        
        await Reviews.submit({ 
            'created_at': datePosted,
            'content': reviewText,
            'stars': rating,
            coworking_id,
            user_id,
        });
        res.json({ message: 'Review submitted successfully'});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { submitReview, getAllReviewsByCoWorkingSpace };