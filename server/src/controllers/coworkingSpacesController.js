const nearbySearch = require('../util/nearbySearch')
const getGeocodingData = require('../util/geocoding')
const getWalkingDistance = require('../util/distance')
const getPhoto = require('../util/photo')
const asyncHandler = require("express-async-handler");
const Coworking = require('../models/coworkingModels');
const Reviews = require('../models/reviewsModel');

// Register a new coworking space
const registerCoworkingSpace = asyncHandler(async (req, res) => {
    const coworkingSpace = req.body;

    // Ensure required fields are provided
    if(!coworkingSpace.name || !coworkingSpace.location) {
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Check if coworking space already exists
    const coworkingExist = await Coworking.findOne(coworkingSpace.name);
    if (coworkingExist) {
        res.status(400);
        throw new Error('Coworking already exists');
    }

    // Create new coworking space in the database
    const newCoworking = await Coworking.create(coworkingSpace);

    if (newCoworking) {
        res.status(201).json({
            message: 'Coworking space registered successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid data')
    }
})

// Function to get nearby coworking spaces based on location
async function getNearbyCoworkingSpaces (req, res) {
    const { location } = req.query;
    
    // Check if location is provided
    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

	try {
        // Get geocoding data for the provided location
        const locationCoordinates = await getGeocodingData(location);

        // Get nearby coworking spaces based on location coordinates
		const listOfCoworkingSpaces = await nearbySearch(locationCoordinates, 'coworking space');
        
        // Create an array of promises for fetching additional data for each coworking space
        const coworkingSpacesWithDetails = await Promise.all(listOfCoworkingSpaces.map(async (coworkingSpace) => {
            const nearbyStations = await nearbySearch(coworkingSpace.coordinates, 'train_station|subway_station');
            const nearestStation = nearbyStations[0];

            const nearestStationCoordinates = nearestStation.coordinates;
            const nearestStationName = nearestStation.name;

            const distanceToStation = await getWalkingDistance(coworkingSpace.coordinates, nearestStationCoordinates);

            const coworkingSpaceID = await Coworking.findByGooglePlaceID(coworkingSpace.placeID);

            if (coworkingSpaceID) {
                const uuid = coworkingSpaceID.uuid;

                const averageRating = await Reviews.getAverageRatingByCoWorkingId(uuid);
                const totalReviews = await Reviews.getNumberOfRatingsByCoWorkingId(uuid);

                return { ...coworkingSpace, nearestStationName, distanceToStation, averageRating, totalReviews, uuid };
            }

            return { ...coworkingSpace, nearestStationName, distanceToStation };
        }));

        res.json(coworkingSpacesWithDetails);
    } catch (error) {
        console.error('Error fetching nearby coworking spaces:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to get a photo for a coworking space using its photo reference
async function getPhotoOfCoworkingSpace (req, res) {
    const { photo_reference } = req.query;
    
    // Check if photo reference is provided
    if (!photo_reference) {
        return res.status(400).json({ error: 'Photo reference query parameter is required' });
    }

    try {
        // Get the photo using the provided reference
        const photoUrl = await getPhoto(photo_reference);
        res.send(photoUrl);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}        
}

module.exports = { getNearbyCoworkingSpaces, registerCoworkingSpace, getPhotoOfCoworkingSpace };