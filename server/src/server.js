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
app.use(cors());

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