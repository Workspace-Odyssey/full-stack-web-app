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
	origin: 'http://localhost:5173',
	credentials: true, // Allow cookies to be sent with requests
}));

app.use(session({
	secret: process.env.EXPSECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // Set the cookie expiration to 1 day
		sameSite: 'lax',
	}
}));

app.use('/user', authRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/coworking_spaces', coworkingSpacesRoutes);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});