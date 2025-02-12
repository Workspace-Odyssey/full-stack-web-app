require('dotenv').config({ path: './.env.local' });

const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cors = require("cors");
const knex = require('./knex');
const coworkingSpacesRoutes = require('./routes/coworkingSpaceRoutes');
const authRoutes = require('./routes/authRoutes')
const reviewsRoutes = require('./routes/reviewRoutes');
const path = require("path");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

// tells the server whether we're in development (local) or production (live)
const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration for development
if (!isProduction) {
	app.use(cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true, // Allow cookies to be sent with requests
	}));
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
	},
	store: new MemoryStore({
		checkPeriod: 86400000 // prune expired entries every 24h
	}),
}));

// Serve static files in production
if (isProduction) {
	app.use(cors({
      origin: 'https://workspace-odyssey.onrender.com', // Allowing requests from the deployed frontend
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
	}));

	// Serve static files from the 'dist' directory
	app.use(express.static(path.join(__dirname, '../../client/dist')));

	app.use('/user', authRoutes);
	app.use('/reviews', reviewsRoutes);
	app.use('/coworking_spaces', coworkingSpacesRoutes);

  	app.get('*', (req, res) => {
	  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
	});
}

// API routes
app.use('/user', authRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/coworking_spaces', coworkingSpacesRoutes);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});