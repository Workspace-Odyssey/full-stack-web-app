const express = require('express');
const router = express.Router();
const coworkingSpacesController = require('../controllers/coworkingspaces.controller');

router.get('/nearby', coworkingSpacesController.getNearbyCoworkingSpaces);
router.get('/nearby_station', coworkingSpacesController.getNearbyStation);
router.post('/registercoworking', coworkingSpacesController.registerCoworking)

module.exports = router;