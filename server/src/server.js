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

// Get the environment variable to check if it's development or production
const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration for development
if (!isProduction) {
	app.use(cors({
		origin: 'http://localhost:5173',
		credentials: true, // Allow cookies to be sent with requests
	}));
}

// Serve static files in production
if (isProduction) {
	// Serve static files from the 'dist' directory
	app.use(express.static(path.join(__dirname, '../../client/dist')));
  	app.get('*', (req, res) => {
	  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
	});
  }


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