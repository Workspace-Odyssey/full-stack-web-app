const express = require('express');
const knex = require('./knex');
const app = express();
const { getGeocodingData } = require('./services/geocoding')

const Reviews = require('./reviews/reviews.model')

const PORT = process.env.PORT;

app.use(express.json());

app.post('/reviews/submit', async (req, res) => {
	const review = req.body;
	const newReview = await Reviews.submit(review);
	res.json(newReview);
})

app.get('/co_working_spaces', async(req, res) => {

	const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: "Location query parameter is required" });
    }

	try {
		const coordinates = await getGeocodingData(location);
		res.json({ coordinates });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
})


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});