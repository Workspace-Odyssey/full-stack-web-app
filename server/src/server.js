const express = require('express');
const session = require('express-session');
const cors = require("cors");
const knex = require('./knex');
const coworkingSpacesRoutes = require('./routes/coworkingSpaceRoutes');
const authRoutes = require('./routes/authRoutes')
const reviewsRoutes = require('./routes/reviewRoutes');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({
	// origin: '',
	// methods: ['GET', 'POST'],
	// allowedHeaders: ['Content-Type', 'Authorization'], // content-type: for sending JSON and form data. // authorization:  used for passing authentication credentials
	// credentials: true,
}));

app.use(session({
	secret: process.env.EXPSECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production',
	}

}));

app.use('/user', authRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/coworking_spaces', coworkingSpacesRoutes);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});