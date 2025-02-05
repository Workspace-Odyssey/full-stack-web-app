const express = require('express');
const knex = require('./knex');
const app = express();

const Reviews = require('./reviews.model')

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.post('/reviews/submit', async (req, res) => {
	const review = req.body;
	const newReview = await Reviews.submit(review);
	res.json(newReview);
})


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});