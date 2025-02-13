const Reviews = require('../models/reviewsModel');

// Function to get all reviews for a specific coworking space
async function getAllReviewsByCoWorkingSpace(req, res) {
  try {
    const { coworking_space_id } = req.params;
    const reviews = await Reviews.filterByCoWorkingId(coworking_space_id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to submit a review for a coworking space
async function submitReview(req, res) {
  // Check if the user is logged in
  console.log(req.session.userId, req.session.username);
  if (!req.session.userId || !req.session.username) {
    return res.status(401).send('You must be logged in to submit a review.');
  }

  try {
    const user_id = req.session.userId; // Retrieve the UUID from the session
    const { coworking_id } = req.params;
    const {
      reviewText,
      rating,
      datePosted,
      netRating,
      comfortRating,
      noiseRating,
      costRating,
    } = req.body;

    console.log('BODY', req.body);

    // Submit the review data to the database
    await Reviews.submit({
      created_at: datePosted,
      content: reviewText,
      stars: rating,
      coworking_id,
      user_id,
      net_rating: netRating,
      comfort_rating: comfortRating,
      noise_rating: noiseRating,
      cost_rating: costRating,
    });
    res.json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to check if the current user already has a review on the current location
const checkExistingReview = async (req, res) => {
  console.log('Check review request received:', req.body);
  const { userId, coworkingId } = req.body;

  try {
    console.log('Querying with:', { userId, coworkingId });
    
    // changed to a direct db query using checkExisting
    const result = await Reviews.checkExisting(userId, coworkingId);

    console.log('Query result:', result);

    res.json({
      hasReviewed: result.length > 0
    });
  } catch (error) {
    console.error('Full error details:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
};

module.exports = { submitReview, getAllReviewsByCoWorkingSpace, checkExistingReview };
