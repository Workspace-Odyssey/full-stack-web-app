const nearbySearch = require('../util/nearbySearch')
const getGeocodingData = require('../util/geocoding')
const getWalkingDistance = require('../util/distance')
const getPhoto = require('../util/photo')
const asyncHandler = require("express-async-handler");
const Coworking = require('../models/coworkingModels');
const Reviews = require('../models/reviewsModel');


const registerCoworkingSpace = asyncHandler(async (req, res) => {
    const coworkingSpace = req.body;

    if(!coworkingSpace.name || !coworkingSpace.location) {
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Check if coworking exist
    const coworkingExist = await Coworking.findOne(coworkingSpace.name);
    if (coworkingExist) {
        res.status(400);
        throw new Error('Coworking already exists');
    }

    // Create new coworking profile
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
        const coworkingSpacesWithDetails = await listOfCoworkingSpaces.map(async (coworkingSpace) => {
            // Get nearby transit stations for the coworking space
            const nearbyStations = await nearbySearch(coworkingSpace.coordinates, 'train_station|subway_station');
            const nearestStation = nearbyStations[0];

            // Extract the station's details
            const nearestStationCoordinates = nearestStation.coordinates;
            const nearestStationName = nearestStation.name

            // Calculate the distance to the nearest station
            const distanceToStation = await getWalkingDistance(coworkingSpace.coordinates, nearestStationCoordinates);

            // Get coworking space ID from the database
            const coworkingSpaceID = await Coworking.findByGooglePlaceID(coworkingSpace.placeID);

            if (coworkingSpaceID) {
                // Fetch reviews data (average rating and number of ratings)
                const averageRating = await Reviews.getAverageRatingByCoWorkingId(coworkingSpaceID.uuid);
                const totalReviews = await Reviews.getNumberOfRatingsByCoWorkingId(coworkingSpaceID.uuid);
                
                return { ...coworkingSpace, nearestStationName, distanceToStation, averageRating, totalReviews };
            }

            // Return coworking space details without review data if no record found
            return { ...coworkingSpace, nearestStationName, distanceToStation };
        });

        // Wait for all promises to resolve and send the result as a JSON response
        Promise.all(coworkingSpacesWithDetails)
            .then((resolvedCoworkingSpaces) => res.json(resolvedCoworkingSpaces))
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

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