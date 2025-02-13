const express = require('express');
const router = express.Router();
const coworkingSpacesController = require('../controllers/coworkingSpacesController');

router.get('/nearby', coworkingSpacesController.getNearbyCoworkingSpaces);
router.post('/register', coworkingSpacesController.registerCoworkingSpace);
router.get('/photo', coworkingSpacesController.getPhotoOfCoworkingSpace);
router.get('/random', coworkingSpacesController.getRandomCoworkingSpaces);

module.exports = router;