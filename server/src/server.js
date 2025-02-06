const express = require('express');
const session = require('express-session');
const knex = require('./knex');
const app = express();

const Reviews = require('./reviews.model')

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(session({
	secret: process.env.EXPSECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: false}

}));

app.post('/reviews/submit', async (req, res) => {
	const review = req.body;
	const newReview = await Reviews.submit(review);
	res.json(newReview);
})


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});