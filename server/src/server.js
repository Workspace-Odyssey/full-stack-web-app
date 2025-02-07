const express = require('express');
const session = require('express-session');
const knex = require('./knex');
const app = express();
const coworkingSpacesRoutes = require('./routes/coworkingspaces.route');
const authRoutes = require('./routes/authRoutes')
const reviewsRoutes = require('./routes/reviews.route');

const PORT = process.env.PORT;

app.use(express.json());

app.use(session({
	secret: process.env.EXPSECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: true}

}));

app.use('/user', authRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/coworking_spaces', coworkingSpacesRoutes);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});