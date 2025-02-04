const express = require('express');
const knex = require('./knex');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});