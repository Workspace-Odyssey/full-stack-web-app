const express = require('express');
const router = express.Router();
const coworkingSpacesController = require('../controllers/coworkingspaces.controller');

router.get('/nearby', coworkingSpacesController.getNearbyCoworkingSpaces);

module.exports = router;