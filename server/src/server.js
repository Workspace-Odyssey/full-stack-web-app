const express = require('express');
const session = require('express-session');
const knex = require('./knex');
const app = express();
const coworkingSpacesRoutes = require('./routes/coworkingspaces.route')

const Reviews = require('./models/reviews.model')

const PORT = process.env.PORT;

app.use(express.json());

app.use(session({
	secret: process.env.EXPSECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: false}

}));

app.post('/reviews/submit', async (req, res) => {
	const review = req.body;
	await Reviews.submit(review);
	res.json(review);
})

app.use('/coworking_spaces', coworkingSpacesRoutes);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});